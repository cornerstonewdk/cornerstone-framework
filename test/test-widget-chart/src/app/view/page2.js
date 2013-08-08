define([
    'backbone',
    'template!view/page2'
], function (Backbone, template) {

    return Backbone.View.extend({

        el: 'section#page2',

        render: function () {
            var self = this;
            require(['style!view/page2'], function () {
                self.$el.html(template());
                self.active3DChart();
            });
            return this;
        },

        events: {
            'click button.prev': 'prevPage',
            'click button.next': 'nextPage'
        },

        prevPage: function () {
            location.href = '#page1';
        },

        nextPage: function () {
            location.href = '#page3';
        },

        active3DChart: function () {
            "use strict";
            /**
             *    Animated Graph Tutorial for Smashing Magazine
             *    July 2011
             *
             *    Author:    Derek Mack
             *            derekmack.com
             *            @derek_mack
             *
             *    Example 5 - 3D Animated Bar Chart via CSS Transforms (WebKit Only)
             */

            $(document).ready(function () {

                // Create our graph from the data table and specify a container to put the graph in
                createGraph('#data-table', '.chart');

                // Here be graphs
                function createGraph(data, container) {
                    // Declare some common variables and container elements
                    var bars = [];
                    var figureContainer = $('<div id="figure"></div>');
                    var graphContainer = $('<div class="graph"></div>');
                    var barContainer = $('<div class="bars"></div>');
                    var data = $(data);
                    var container = $(container);
                    var chartData;
                    var chartYMax;
                    var columnGroups;

                    // Timer variables
                    var barTimer;
                    var graphTimer;

                    // 3D setup
                    var graphTransform;
                    var keyToggled = true;
                    var xRotation = 0;
                    var yRotation = 0;
                    var initXRotation = 15;
                    var initYRotation = 25;
                    var endXRotation = -20;
                    var endYRotation = -15;
                    var rotationAmount = 45;

                    // Create table data object
                    var tableData = {
                        // Get numerical data from table cells
                        chartData: function () {
                            var chartData = [];
                            data.find('tbody td').each(function () {
                                chartData.push($(this).text());
                            });
                            return chartData;
                        },
                        // Get heading data from table caption
                        chartHeading: function () {
                            var chartHeading = data.find('caption').text();
                            return chartHeading;
                        },
                        // Get legend data from table body
                        chartLegend: function () {
                            var chartLegend = [];
                            // Find th elements in table body - that will tell us what items go in the main legend
                            data.find('tbody th').each(function () {
                                chartLegend.push($(this).text());
                            });
                            return chartLegend;
                        },
                        // Get highest value for y-axis scale
                        chartYMax: function () {
                            var chartData = this.chartData();
                            // Round off the value
                            var chartYMax = Math.ceil(Math.max.apply(Math, chartData) / 1000) * 1000;
                            return chartYMax;
                        },
                        // Get y-axis data from table cells
                        yLegend: function () {
                            var chartYMax = this.chartYMax();
                            var yLegend = [];
                            // Number of divisions on the y-axis
                            var yAxisMarkings = 5;
                            // Add required number of y-axis markings in order from 0 - max
                            for (var i = 0; i < yAxisMarkings; i++) {
                                yLegend.unshift(((chartYMax * i) / (yAxisMarkings - 1)) / 1000);
                            }
                            return yLegend;
                        },
                        // Get x-axis data from table header
                        xLegend: function () {
                            var xLegend = [];
                            // Find th elements in table header - that will tell us what items go in the x-axis legend
                            data.find('thead th').each(function () {
                                xLegend.push($(this).text());
                            });
                            return xLegend;
                        },
                        // Sort data into groups based on number of columns
                        columnGroups: function () {
                            var columnGroups = [];
                            // Get number of columns from first row of table body
                            var columns = data.find('tbody tr:eq(0) td').length;
                            for (var i = 0; i < columns; i++) {
                                columnGroups[i] = [];
                                data.find('tbody tr').each(function () {
                                    columnGroups[i].push($(this).find('td').eq(i).text());
                                });
                            }
                            return columnGroups;
                        }
                    }

                    // Useful variables for accessing table data
                    chartData = tableData.chartData();
                    chartYMax = tableData.chartYMax();
                    columnGroups = tableData.columnGroups();

                    // Construct the graph

                    // Loop through column groups, adding bars as we go
                    $.each(columnGroups, function (i) {
                        // Create bar group container
                        var barGroup = $('<div class="bar-group"></div>');
                        // Add bars inside each column
                        for (var j = 0, k = columnGroups[i].length; j < k; j++) {
                            // Create bar object to store properties (label, height, code etc.) and add it to array
                            // Set the height later in displayGraph() to allow for left-to-right sequential display
                            var barObj = {};
                            barObj.label = this[j];
                            barObj.height = Math.floor(barObj.label / chartYMax * 100) + '%';
                            barObj.bar = $('<div class="bar fig' + j + '"><div class="face front"></div><div class="face back"></div><div class="face left"></div><div class="face right"></div><div class="face top"></div><div class="face bottom"></div><span>' + barObj.label + '</span></div>')
                                .appendTo(barGroup);
                            bars.push(barObj);
                        }
                        // Add bar groups to graph
                        barGroup.appendTo(barContainer);
                    });

                    // Add heading to graph
                    var chartHeading = tableData.chartHeading();
                    var heading = $('<h4>' + chartHeading + '</h4>');
                    heading.appendTo(figureContainer);

                    // Add legend to graph
                    var chartLegend = tableData.chartLegend();
                    var legendList = $('<ul class="legend"></ul>');
                    $.each(chartLegend, function (i) {
                        var listItem = $('<li><span class="icon fig' + i + '"><div class="face front"></div><div class="face back"></div><div class="face left"></div><div class="face right"></div><div class="face top"></div><div class="face bottom"></div></span>' + this + '</li>')
                            .appendTo(legendList);
                    });
                    legendList.appendTo(figureContainer);

                    // Add x-axis to graph
                    var xLegend = tableData.xLegend();
                    var xAxisList = $('<ul class="x-axis"></ul>');
                    $.each(xLegend, function (i) {
                        var listItem = $('<li><span>' + this + '</span></li>')
                            .appendTo(xAxisList);
                    });
                    xAxisList.appendTo(graphContainer);

                    // Add y-axis to graph
                    var yLegend = tableData.yLegend();
                    var yAxisList = $('<ul class="y-axis"></ul>');
                    $.each(yLegend, function (i) {
                        var listItem = $('<li><span>' + this + '</span></li>')
                            .appendTo(yAxisList);
                    });
                    yAxisList.appendTo(graphContainer);

                    // Add bars to graph
                    barContainer.appendTo(graphContainer);

                    // Add graph to graph container
                    graphContainer.appendTo(figureContainer);

                    // Add graph container to main container
                    figureContainer.appendTo(container);

                    // Set individual height of bars
                    function displayGraph(bars, i) {
                        // Changed the way we loop because of issues with $.each not resetting properly
                        if (i < bars.length) {
                            // Add transition property for automatic animation
                            $(bars[i].bar).css({'height': bars[i].height, '-webkit-transition': 'all 0.8s ease-out'});
                            // Wait the specified time then run the displayGraph() function again for the next bar
                            barTimer = setTimeout(function () {
                                i++;
                                displayGraph(bars, i);
                            }, 100);
                        }
                    }

                    // Reset graph settings and prepare for display
                    function resetGraph() {
                        // Turn off transitions for instant reset
                        $.each(bars, function (i) {
                            $(bars[i].bar).stop().css({'height': 0, '-webkit-transition': 'none'});
                        });
                        graphTransform = 'rotateX(' + initXRotation + 'deg) rotateY(' + initYRotation + 'deg)';
                        container.css({'-webkit-transition': 'none', '-webkit-transform': graphTransform});

                        // Clear timers
                        clearTimeout(barTimer);
                        clearTimeout(graphTimer);

                        // Restart timer
                        graphTimer = setTimeout(function () {
                            // Apply webkit transitions for property changes
                            graphTransform = 'rotateX(' + endXRotation + 'deg) rotateY(' + endYRotation + 'deg)';
                            container.css({'-webkit-transform': graphTransform, '-webkit-transition': 'all 2.8s ease-out'});
                            displayGraph(bars, 0);
                        }, 500);
                    }

                    // Helper functions

                    // Call resetGraph() when button is clicked to start graph over
                    $('#reset-graph-button').click(function () {
                        resetGraph();
                        return false;
                    });

                    // Toggle keyboard rotation
                    $('#toggle-keys-button').click(function () {
                        if (keyToggled) {
                            keyToggled = false;
                            $(this).text('Keyboard OFF');
                        } else {
                            keyToggled = true;
                            $(this).text('Keyboard ON');
                        }
                        return false;
                    });

                    // Handle arrow key rotation
                    $(document).keydown(function () {
                        if (keyToggled) {
                            switch (event.keyCode) {
                                case 37: // Left
                                    yRotation -= rotationAmount;
                                    break;
                                case 38: // Up
                                    xRotation += rotationAmount;
                                    break;
                                case 39: // Right
                                    yRotation += rotationAmount;
                                    break;
                                case 40: // Down
                                    xRotation -= rotationAmount;
                                    break;
                            }
                            ;
                            graphTransform = 'rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
                            container.css('-webkit-transform', graphTransform);
                        }
                    });

                    // Finally, display graph via reset function
                    resetGraph();
                }
            });
        }
    });
});
