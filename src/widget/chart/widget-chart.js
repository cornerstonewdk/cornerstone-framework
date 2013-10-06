/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-chart.js
 *  Description: D3 chart를 jQuery 플러그인 형태로 사용 할 수 있고, 반응형 웹에 맞는 화면을 보여주도록 구현함.
 *  Author: 김우섭
 *  License :
 */
(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "d3", "nv", "widget-touch" ], factory);
    else
        root.MultipageRouter = factory(root.$, root._, root.Backbone,  root.d3, root.nv);

})(window, function ($, _, Backbone, d3, nv) {
    "use strict";

    var chart;
    var root = this;
    var pluginName = "featuredChart";
    var HAS_TOUCH = ('ontouchstart' in window);
    var eventName = {
        shown: "shown.cs.chart",
        animationEnd: "animationEnd.cs.chart",
        complete: "complete.cs.chart"
    };
    var isDebug = false;


    var FeaturedChart = function (element, options) {
        this.el = element;
        this.$el = $(element);
        this.options = options;

        nv.dev = false;

        this.render(options);
    };

    FeaturedChart.prototype = {
        afterRender: function (target, options, chart) {
            this.$el.data("currentChart", chart);
            this.$el.data("currentChartControlsData", options.controlsData);

            var controlsWrap = target.select('.nv-controlsWrap');
            controlsWrap.attr("transform", "translate(-55," + this.util.getTranslateJson(controlsWrap).y + ")");

            this.util.removeClip(target);
            this.util.applyBindEvent(target, options, chart, this);
        },
        render: function (options) {
            if (!navigator.userAgent.toLowerCase().match(/webkit/gi)
                && options.chartType.match(/.*bar3d.*/gi)) {
                options.chartType = options.chartType.replace("3d", "");
            }

            var self = this;
            var target = this.util.getTarget(d3.select(this.el), options);
            target.$parent = this.$el;

            if (options.chartType.match(/.*bar3d.*/gi)) {
                self[options.chartType + "Chart"](target, options);
            } else {
                nv.addGraph((function (self, target, options) {
                    var colorLength = options.color.length;

                    chart = self[options.chartType + "Chart"](target, options);

                    chart.tooltips(options.tooltips)
                        .color(function (d, i) {
                            return options.color[i % colorLength];
                        });

                    if ("line" === options.chartType) {
                        isDebug && console.log(options);
                    }

                    self.util.activeAxisLabel(target, options, chart);

                    var customChart = options.beforeRender(target, options, chart);
                    chart = typeof customChart === "function" ? customChart : chart;

                    target.attr("width", options.width)
                        .attr("height", options.height)
                        .datum(options.data)
                        .transition()
                        .duration(500)
                        .each("end", function () {
                            $(self.el).trigger(eventName.shown);

                            isDebug && isDebug && console.log(eventName.shown);

                            if (options.chartType.match(/line/gi) || !options.chartType.match(/bar.*|horizontalBar.*/gi)) {
                                $(self.el).trigger(eventName.complete);

                                isDebug && isDebug && console.log(eventName.complete);
                            }
                        })
                        .call(chart);

                    typeof chart.afterRender === "function" && chart.afterRender("render");

                    chart.multibar && chart.multibar.dispatch.on("animated", function (d) {
                        $(self.el).trigger(eventName.animationEnd, {target: d.target, data: d.data});

                        isDebug && console.log(eventName.animationEnd);
                    });

                    chart.multibar && chart.multibar.dispatch.on("lastAnimated", function () {
                        $(self.el).trigger(eventName.complete);
                        isDebug && console.log(eventName.complete);

                        target.$parent.hasClass("overlay") && target.$parent.removeClass("overlay");
                    });

                    self.afterRender(target, options, chart);

                })(self, target, options));
            }

            return this;
        },

        // Cornerstone 1.0
        barChart: function (target, options) {
            var self = this;
            chart = nv.models.multiBarChart();

            chart.showLegend(options.showLegend)
                .showControls(options.showControls)
                .controlsData(options.controlsData);

            chart.afterRender = function (eventType) {
                var chart = this;

                if (!options.showValues) {
                    return false;
                }

                target.select(".nv-showValuesWrap").remove();

                if (chart.multibar && chart.multibar.stacked()) {
                    target.select(".nv-showValuesWrap").remove();
                    $(self.el).off("animationEnd._barChart");
                    return false;
                }

                var groups = target.select(".nv-barsWrap .nv-groups");
                var showValuesWrap = groups.append("svg:g").attr("class", "nv-showValuesWrap");

                showValuesWrap.style({
                    opacity: 1
                });

                var animateEnd = function (e, d) {

                    var rect = d3.select(d.target);
                    var text = showValuesWrap.append("svg:text").attr("class", "nv-value");

                    var x = parseInt(rect.attr("x")) + parseInt(rect.attr("width")) / 2;
                    var y = rect.attr("y") - 2;
                    var width = rect.attr("width");
                    var height = rect.attr("height");

                    if (!(text.attr("x") == x
                        && text.attr("y") == y
                        && text.attr("width") == width
                        && text.attr("height") == height)) {
                        text.attr({
                            "opacity": 0,
                            "x": x,
                            "y": y,
                            "width": width,
                            "height": height,
                            "text-anchor": "middle",
                            "transform": rect.attr("transform")
                        }).transition().attr({
                                opacity: 1
                            })
                            .text(d3.format(options.format)(rect.data()[0].y));
                    } else {
                        text.attr({
                            opacity: 1
                        });
                    }

                    return e;
                };

                self.util.removeClip(target);
                $(self.el).off("animationEnd._barChart").on("animationEnd._barChart", animateEnd);
                return eventType;
            };

            return chart;
        },
        stackedBarChart: function (target, options) {
            options.controlsData.active = "stacked";
            var chart = this.barChart(target, options);
            chart.showControls(false);
            chart.stacked(true);
            return chart;
        },
        groupedBarChart: function (target, options) {
            options.controlsData.active = "grouped";
            var chart = this.barChart(target, options);
            chart.showControls(false);
            return chart;
        },
        lineChart: function (target, options) {
            chart = nv.models.lineChart()
                .showLegend(options.showLegend);

            return chart;
        },
        pieChart: function (target, options) {
            chart = nv.models.pieChart()
                .showLegend(options.showLegend)
                .tooltips(options.tooltips);

            return chart;
        },

        // Cornerstone 2.0
        horizontalBarChart: function (target, options) {
            chart = nv.models.multiBarHorizontalChart()
                .showValues(options.showValues)
                .showLegend(options.showLegend)
                .showControls(options.showControls)
                .valueFormat(d3.format(options.format))
                .tooltips(options.tooltips)
                .controlsData(options.controlsData);

            return chart;
        },
        stackedHorizontalBarChart: function (target, options) {
            options.controlsData.active = "stacked";
            var chart = this.horizontalBarChart(target, options);
            chart.showControls(false);
            chart.stacked(true);
            return chart;
        },
        groupedHorizontalBarChart: function (target, options) {
            options.controlsData.active = "grouped";
            var chart = this.horizontalBarChart(target, options);
            chart.showControls(false);
            return chart;
        },
        linePlusBarChart: function (target, options) {
            chart = nv.models.linePlusBarChart();
            chart.bars.forceY([0]);
            chart.showLegend(options.showLegend);
            chart.xAxis.showMaxMin(options.showMaxMin).tickFormat(d3.format(options.format));
            chart.y1Axis.tickFormat(d3.format(options.format));
            chart.y2Axis.tickFormat(d3.format(options.format));

            return chart;
        },
        lineFocusChart: function (target, options) {
            var self = this;
            chart = nv.models.lineWithFocusChart();

            chart.xAxis.tickFormat(d3.format(options.format));
            chart.yAxis.tickFormat(d3.format(options.format));
            chart.y2Axis.tickFormat(d3.format(options.format));
            chart.showLegend(options.showLegend);

            chart.brushExtent = 100;
            chart.afterRender = function () {
                target.$parent.swipe();

                function onBrush(extent) {
                    extent = extent ? extent : chart.x2Axis.scale().domain();
                    var brush = d3.svg.brush();
                    var lines = chart.lines;

                    if (Math.abs(extent[0] - extent[1]) <= 1) {
                        return extent;
                    }

                    chart.dispatch.brush({extent: extent, brush: brush});

                    // Update Main (Focus)
                    var focusLinesWrap = target.select('.nv-focus .nv-linesWrap')
                        .datum(options.data.filter(function (d) {
                            return !d.disabled
                        }).map(function (d) {
                                return {
                                    key: d.key,
                                    values: d.values.filter(function (d, i) {
                                        return lines.x()(d, i) >= extent[0] && lines.x()(d, i) <= extent[1];
                                    })
                                }
                            })
                        );
                    focusLinesWrap.transition().call(lines);

                    // Update Main (Focus) Axes
                    target.select('.nv-focus .nv-x.nv-axis').transition().call(chart.xAxis);
                    target.select('.nv-focus .nv-y.nv-axis').transition().call(chart.yAxis);

                    return extent
                }

                if(chart.x2Axis) {
                    var xDomain = chart.x2Axis.scale().domain();
                    var unit = xDomain[1] * 0.1;
                    var extent = [xDomain[0], xDomain[0] + unit];
                    var changeDomain = function (e, obj) {
                        var minDomain, maxDomain;
                        var direction = obj.direction;
                        if (!direction.match(/left|right/gi)) {
                            return false;
                        }

                        if ("left" === direction) {
                            minDomain = extent[1];
                            maxDomain = extent[1] + unit;
                        } else if ("right" === direction) {
                            minDomain = extent[0] - unit;
                            maxDomain = extent[0];
                        }

                        minDomain = xDomain[0] >= minDomain ? xDomain[0] : minDomain;
                        maxDomain = xDomain[1] <= maxDomain ? xDomain[1] : maxDomain;
                        maxDomain = minDomain > maxDomain ? minDomain + unit : maxDomain;

                        extent = [minDomain, maxDomain];

                        extent = onBrush(extent);

                        if (typeof extent === "undefined") {
                            extent = direction === "left"
                                ? [xDomain[1] - unit, xDomain[1]]
                                : [xDomain[0], xDomain[0] + unit];
                        }

                        e.preventDefault();
                        e.stopPropagation();

                        return extent;
                    };

                    target.$parent.off("swipe._chart").on("swipe._chart", changeDomain);
                }

                self.util.removeClip(target);
            };

            return chart;
        },
        bar3dChart: function (target, options) {
            var self = this;
            var bars = [];
            var figureContainer = $('<div class="figure"></div>');
            var graphContainer = $('<div class="graph"></div>');
            var barContainer = $('<div class="bars"></div>');
            var data = $(options.data);
            var dataLength = data.length;
            var container = target;
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
            var endYRotation = $.isNumeric(options.endYRotation) ? options.endYRotation : -15;
            var rotationAmount = 45;
            var barInnerWidth = 52;
            var barGroupInnerWidth = barInnerWidth * dataLength;

            var dataObject = {
                // Get numerical data from table cells
                chartData: function () {
                    var chartData = [];
                    data.each(function () {
                        $(this["values"]).each(function () {
                            chartData.push(d3.format(options.format)(this.y));
                        });
                    });
                    return chartData;
                },
                // Get legend data from table body
                chartLegend: function () {
                    var chartLegend = [];
                    data.each(function () {
                        chartLegend.push(this["key"]);
                    });
                    return chartLegend;
                },
                // Get highest value for y-axis scale
                chartYMax: function () {
                    var max = Math.max.apply(Math, this.chartData());
                    var length = Math.pow(10, max.toString().replace(/\..*/gi, "").length - 1);
                    return Math.ceil(Math.max.apply(Math, this.chartData()) / length) * length;
                },
                // Get y-axis data from table cells
                yLegend: function () {
                    var chartYMax = this.chartYMax();
                    var yLegend = [];
                    // Number of divisions on the y-axis
                    var yAxisMarkings = 5;
                    // Add required number of y-axis markings in order from 0 - max
                    for (var i = 0; i < yAxisMarkings; i++) {
                        yLegend.unshift(d3.format(options.format)(((chartYMax * i) / (yAxisMarkings - 1))));
                    }
                    return yLegend;
                },
                // Get x-axis data from table header
                xLegend: function () {
                    var xLegend = [];
                    var prevLength = 0;
                    // Find th elements in table header - that will tell us what items go in the x-axis legend
                    data.each(function () {
                        var values = this["values"];
                        var valuesLength = this["values"].length;
                        if (prevLength < valuesLength) {
                            $(this["values"]).each(function () {
                                xLegend.push(d3.format(options.format)(this["x"]));
                            });
                        }

                        prevLength = valuesLength;
                    });
                    return xLegend;
                },
                // Sort data into groups based on number of columns
                columnGroups: function () {
                    var columnGroups = [];

                    data.each(function (i) {
                        columnGroups[i] = $.map(this.values, function (val) {
                            return d3.format(options.format)(val.y);
                        });
                    });

                    columnGroups = self.util.transpose(columnGroups);

                    return columnGroups;
                }
            };
            chartYMax = dataObject.chartYMax();
            columnGroups = dataObject.columnGroups();

            // Construct the graph

            // Loop through column groups, adding bars as we go
            $.each(columnGroups, function (i) {
                // Create bar group container
                var barGroup = $('<div class="bar-group"></div>').css({
                    width: barGroupInnerWidth
                });
                // Add bars inside each column
                for (var j = 0, k = columnGroups[i].length; j < k; j++) {
                    // Create bar object to store properties (label, height, code etc.) and add it to array
                    // Set the height later in displayGraph() to allow for left-to-right sequential display
                    var barObj = {};
                    barObj.label = this[j];
                    barObj.height = Math.floor(barObj.label / chartYMax * 100) + '%';
                    barObj.bar = $('<div class="bar fig' + j + '"><div class="face front"></div><div class="face back"></div><div class="face left"></div><div class="face right"></div><div class="face top"></div><div class="face bottom"></div><span>' + barObj.label + '</span></div>')
                        .css({
                            left: (barInnerWidth * j) + "px"
                        })
                        .appendTo(barGroup);
                    bars.push(barObj);
                }
                // Add bar groups to graph
                barGroup.appendTo(barContainer);
            });

            // Add legend to graph
            if (options.showLegend) {
                var chartLegend = dataObject.chartLegend();
                var legendList = $('<ul class="legend"></ul>');
                $.each(chartLegend, function (i) {
                    $('<li><span class="icon fig' + i + '"><div class="face front"></div><div class="face back"></div><div class="face left"></div><div class="face right"></div><div class="face top"></div><div class="face bottom"></div></span>' + this + '</li>')
                        .appendTo(legendList);
                });
                legendList.appendTo(figureContainer);
            }

            // Add x-axis to graph
            var xLegend = dataObject.xLegend();
            var barContainerWidth = xLegend.length * barGroupInnerWidth + (xLegend.length * 30);

            var xAxisList = $('<ul class="x-axis"></ul>').css({
                width: barContainerWidth
            });
            $.each(xLegend, function () {
                $('<li><span>' + this + '</span></li>').css({
                    width: barGroupInnerWidth
                }).appendTo(xAxisList);
            });
            xAxisList.appendTo(graphContainer);

            // Add y-axis to graph
            var yLegend = dataObject.yLegend();
            var yAxisList = $('<ul class="y-axis"></ul>').css({
                width: barContainerWidth
            });
            $.each(yLegend, function () {
                $('<li><span>' + this + '</span></li>').appendTo(yAxisList);
            });
            yAxisList.appendTo(graphContainer);

            // Add bars to graph
            barContainer.css({
                width: barContainerWidth
            }).appendTo(graphContainer);

            //
            target.css({
                width: barContainerWidth
            });
            target.$parent.css({
                width: barContainerWidth
            });

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
                        $(self.el).trigger(eventName.animationEnd);

                        isDebug && isDebug && console.log(eventName.animationEnd);

                        if (bars.length === i) {
                            $(self.el).trigger(eventName.complete);

                            isDebug && isDebug && console.log(eventName.complete);
                        }
                    }, 100);
                }
            }

            // Reset graph settings and prepare for display
            function resetGraph() {
                isDebug && isDebug && console.log(eventName.shown);
                self.util.applyBindEvent3dChart(target, options);
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
                }, 100);
            }

            // Handle arrow key rotation
            $(document).keydown(function () {
                if (keyToggled) {
                    switch (event.keyCode) {
                        case 37: // Left
                            if ("bar3d" === options.chartType) {
                                yRotation -= rotationAmount;
                            } else {
                                xRotation -= rotationAmount;
                            }
                            break;
                        case 38: // Up
                            if ("bar3d" === options.chartType) {
                                xRotation += rotationAmount;
                            } else {
                                yRotation -= rotationAmount;
                            }
                            break;
                        case 39: // Right
                            if ("bar3d" === options.chartType) {
                                yRotation += rotationAmount;
                            } else {
                                xRotation += rotationAmount;
                            }
                            break;
                        case 40: // Down
                            if ("bar3d" === options.chartType) {
                                xRotation -= rotationAmount;
                            } else {
                                yRotation += rotationAmount;
                            }
                            break;
                    }
                    graphTransform = 'rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
                    container.css('-webkit-transform', graphTransform);
                }
            });

            $(self.el).trigger(eventName.shown);

            // Finally, display graph via reset function
            resetGraph();

            if (typeof $.fn.swipe === "function") {
                target.$parent.swipe();
                var changeView = function (e, obj) {
                    switch (obj.direction) {
                        case "left": // Left
                            if ("bar3d" === options.chartType) {
                                yRotation -= rotationAmount;
                            } else {
                                xRotation -= rotationAmount;
                            }
                            break;
                        case "up": // Up
                            if ("bar3d" === options.chartType) {
                                xRotation += rotationAmount;
                            } else {
                                yRotation -= rotationAmount;
                            }
                            break;
                        case "right": // Right
                            if ("bar3d" === options.chartType) {
                                yRotation += rotationAmount;
                            } else {
                                xRotation += rotationAmount;
                            }
                            break;
                        case "down": // Down
                            if ("bar3d" === options.chartType) {
                                xRotation -= rotationAmount;
                            } else {
                                yRotation += rotationAmount;
                            }
                            break;
                    }
                    graphTransform = 'rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
                    container.css('-webkit-transform', graphTransform);

                    e.preventDefault();
                    e.stopPropagation();
                };
                target.$parent.off("swipe._chart").on("swipe._chart", changeView);
            }

            if (typeof $.fn.doubletap === "function") {
                target.$parent.doubletap(function () {
                    resetGraph();
                });
            }
        },
        horizontalBar3dChart: function (target, options) {
            var $parent = target.closest(".widget-chart3d");
            !$parent.hasClass("widget-chart3d-hbar") && $parent.addClass("widget-chart3d-hbar");
            options.endYRotation = 0;
            this.bar3dChart(target, options);
        },

        util: {
            transpose: function (array) {
                var w = array.length ? array.length : 0,
                    h = array[0] instanceof Array ? array[0].length : 0;

                if (h === 0 || w === 0) {
                    return [];
                }

                var i, j, t = [];

                for (i = 0; i < h; i++) {
                    t[i] = [];
                    for (j = 0; j < w; j++) {
                        t[i][j] = array[j][i];
                    }
                }

                return t;
            },
            removeClip: function (target) {
                var groups = target.selectAll(".nv-groups");
                $(groups[0]).each(function () {
                    $(this).parent().removeAttr("clip-path");
                });
            },
            getTranslateJson: function (target) {
                try {
                    return JSON.parse(target.attr("transform").replace("translate(", '{"x":')
                        .replace(",", ',"y":')
                        .replace(")", '}'))
                } catch (e) {
                    return {x: 0, y: 0};
                }
            },
            getTarget: function (target, options) {
                var $parent;
                if (options.chartType.match(/bar3d.*/gi)) {
                    // 3D 차트용 타겟 셀렉터
                    if ($(target[0][0]).find(".bar3d").length === 0) {
                        $(target[0][0]).html($("<div/>", {"class": "wrapper"}).html($("<div/>", {"class": "bar3d"})));
                    }
                    target = $(target[0][0]).find(".bar3d");
                    !target.hasClass("chart") && target.addClass("chart");

                    $parent = target.closest(".widget-chart");
                    !$parent.hasClass("widget-chart3d") && $parent.addClass("widget-chart3d");
                } else {
                    // SVG용 타겟 셀럭터
                    if (target.select("svg").length > 0 && target.select("svg")[0][0] === null) {
                        target = target.append("svg:svg");
                    } else {
                        target = target.select("svg");
                    }
                }
                return target;
            },
            activeAxisLabel: function (target, options, chart) {
                var left = 0;
                var right = 0;

                if ("bar" === options.chartType) {
                    chart.xAxis.tickFormat(d3.format(options.format)).axisLabel(options.xAxisLabel);
                    chart.yAxis.tickFormat(d3.format(options.format)).axisLabel(options.yAxisLabel);

                    left = $.trim(options.yAxisLabel).length > 0 ? 75 : 50;
                    chart.margin({top: 30, right: 10, bottom: 50, left: left});
                } else if ("horizontalBar" === options.chartType) {
                    chart.xAxis.tickFormat(d3.format(options.format)).axisLabel(options.yAxisLabel);
                    chart.yAxis.tickFormat(d3.format(options.format)).axisLabel(options.xAxisLabel);

                    left = $.trim(options.yAxisLabel).length > 0 ? 75 : 50;
                    chart.margin({top: 30, right: 10, bottom: 50, left: left});
                } else if ("linePlusBar" === options.chartType) {
                    chart.xAxis.tickFormat(d3.format(options.format)).axisLabel(options.xAxisLabel);
                    chart.y1Axis.tickFormat(d3.format(options.format)).axisLabel(options.yAxisLabel);
                    chart.y2Axis.tickFormat(d3.format(options.format)).axisLabel(options.y2AxisLabel);

                    left = $.trim(options.yAxisLabel).length > 0 ? 75 : 35;
                    right = $.trim(options.y2AxisLabel).length > 0 ? 85 : 50;
                    chart.margin({top: 30, right: right, bottom: 50, left: left});
                } else if ("lineFocus" === options.chartType || "line" === options.chartType) {
                    chart.xAxis.tickFormat(d3.format(options.format)).axisLabel(options.xAxisLabel);
                    chart.yAxis.tickFormat(d3.format(options.format)).axisLabel(options.yAxisLabel);

                    left = $.trim(options.yAxisLabel).length > 0 ? 75 : 50;
                    chart.margin({top: 30, right: 30, bottom: 50, left: left});
                } else {
                    if ("pie" !== options.chartType) {
                        chart.xAxis.tickFormat(d3.format(options.format)).axisLabel(options.xAxisLabel);
                        chart.yAxis.tickFormat(d3.format(options.format)).axisLabel(options.yAxisLabel);
                    }
                }
            },
            applyBindEvent: function (target, options, chart, object) {
                var stateChange = function (e) {
                    isDebug && console.log("상태:", JSON.stringify(e));
                    // 애니매이션 중 이벤트 방지
                    !target.$parent.hasClass("overlay") && target.$parent.addClass("overlay");

                    setTimeout(function () {
                        typeof chart.afterRender === "function" && chart.afterRender("stateChange");

                        // 바차트외의 경우 complete 이벤트가 발생하지 않아 afterRender 후 이벤트 방지 overlay 제거
                        typeof chart.multibar !== "function" && target.$parent.hasClass("overlay")
                        && target.$parent.removeClass("overlay");

                        object.afterRender(target, options, chart);
                    }, 10);
                };

                var resize = function (e) {
                    chart.update();
                    setTimeout(function () {
                        typeof chart.afterRender === "function" && chart.afterRender("resize");
                        object.afterRender(target, options, chart);
                    }, 10);
                    e.preventDefault();
                    e.stopPropagation();
                };

                chart.dispatch["stateChange"] && chart.dispatch.on("stateChange", stateChange);

                if (HAS_TOUCH) {
                    window.onorientationchange = function (e) {
                        !options.autoResize || resize(e);
                    };
                } else {
                    // window resize가 완료될 때 차트 resize 함수 실행
                    $(window).on("resizeEnd._chart", function (e) {
                        !options.autoResize || resize(e);
                    });
                }

                // Window Resize Trigger
                $(window).on("resize._chart", function (e) {
                    if (e.target.resizeTO) clearTimeout(e.target.resizeTO);
                    e.target.resizeTO = setTimeout(function () {
                        $(this).trigger('resizeEnd');
                    }, 500);
                });
            },
            applyBindEvent3dChart: function (target, options) {
                var resizeChart = function () {
                    var $target = target.closest(".widget-chart3d");
                    var rate;

                    if ("bar3d" === options.chartType) {
                        rate = window.innerWidth / target.width();
                    } else {
                        rate = window.innerWidth / (target.height() + target.find(".x-axis").height());
                    }

                    $target.removeAttr("style");

                    rate = rate > 1 ? target.$parent.parent().width() / target.width() : rate;

                    $target.find(".wrapper").css({
                        webkitPerspective: target.width() * 20
                    });

                    if (rate < 1) {
                        if ("bar3d" === options.chartType) {
                            $target.css({
                                width: target.width(),
                                height: target.height() + target.find(".x-axis").height(),
                                marginLeft: -target.width() * 0.1 * rate * 1.2,
                                marginBottom: -target.height() * (1 - rate) * 1.2,
                                webkitTransform: "scale(" + rate + ")"
                            });
                        } else {
                            $target.css({
                                width: target.height() * 1.1,
                                height: target.width(),
                                marginBottom: -target.width() * (1 - rate),
                                webkitTransform: "scale(" + rate + ")"
                            });
                        }
                    } else {
                        if ("bar3d" === options.chartType) {
                            $target.css({
                                height: target.height() + target.find(".x-axis").height(),
                                marginLeft: -target.width() * 0.1
                            });
                        } else {
                            $target.css({
                                height: target.width() + target.find(".x-axis").height()
                            });
                        }
                    }
                };

                resizeChart();
                if (HAS_TOUCH) {
                    window.onorientationchange = function () {
                        !options.autoResize || resizeChart();
                    };
                } else {
                    // window resize가 완료될 때 차트 resize 함수 실행
                    $(window).on("resizeEnd._chart", function () {
                        !options.autoResize || resizeChart();
                    });
                }

                // Window Resize Trigger
                $(window).on("resize._chart", function (e) {
                    if (e.target.resizeTO) clearTimeout(e.target.resizeTO);
                    e.target.resizeTO = setTimeout(function () {
                        $(this).trigger('resizeEnd');
                    }, 500);
                });
            }
        }
    };

    $.fn.featuredChart = function (options) {
        var defaultOptions = {
            chartType: "bar",
            xAxisLabel: "",
            yAxisLabel: "",
            y2AxisLabel: "",
            format: ".1f",
            data: [],
            showMaxMin: true,
            showValues: true,
            showControls: true,
            showLegend: true,
            tooltips: true,
            color: ["#2c3e50", "#e74c3c", "#3498db", "#f5a503", "#7c569f", "#75483e", "#bf64a3", "#6b6b6b"],
            controlsData: {
                active: "grouped",
                groupedName: "그룹",
                stackedName: "스택"
            },
            autoResize: true,
            beforeRender: function (target, options, chart) {
                return chart;
            }
        };

        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);

            if (!data) {
                // 최초 플러그인 생성
                options = $.extend(true, defaultOptions, options);

                if (!options.data.length) {
                    isDebug && console.log("데이터가 없습니다");
                }

                data = new FeaturedChart(this, options);
                $this.data(pluginName, data);
            } else {
                // 플러그인이 생성된 상태에서 데이터 업데이트
                options = $.extend(true, defaultOptions, options);

                $this.html("");
                data.options = options;
                data.render(data.options);
            }
        });
    };

    $.fn.featuredChart.Constructor = FeaturedChart;

    $(function () {
        $("[data-featured=chart]").each(function () {
            var self = this,
                dataUrl = $(this).data("chartBind");

            dataUrl && $.getJSON(dataUrl).success(function (json) {
                $(self)[pluginName]({
                    chartType: $(self).data("chartType"),
                    format: $(self).data("chartFormat"),
                    data: json
                });
            });
        });
    });

    return Backbone.View.extend({
        model: new Backbone.Model(),
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "reset", this.render);
        },
        render: function () {
            var data = [];
            $.each(this.model.toJSON(), function (i, obj) {
                data.push(obj);
            });
            this.options.chartOptions.data = data;

            this.$el.featuredChart(this.options.chartOptions);

            return this;
        }
    });
});