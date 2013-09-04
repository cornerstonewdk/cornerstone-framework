/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-chart.js
 *  Description: D3 chart를 jQuery 플러그인 형태로 사용 할 수 있고, 반응형 웹에 맞는 화면을 보여주도록 구현함.
 *  Author: 김우섭
 *  License :
 */
(function () {
    "use strict";
    var root = this,
        pluginName = "featuredChart",
        HAS_TOUCH = ('ontouchstart' in window),
        isDebug = true,
        chart,
        self;

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
            this.$el.data("currentChartControl", options.control);
            this.util.removeClip(target);
            this.util.applyBindEvent(target, options, chart);
        },
        render: function (options) {
            var self = this,
                target = this.util.getTarget(d3.select(this.el), options);
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

                    if ("pie" === options.chartType) {

                    } else {
                        if ("linePlusBar" === options.chartType) {
                            chart.xAxis
                                .showMaxMin(options.showMaxMin)
                                .tickFormat(d3.format(options.format));

                            chart.y1Axis.tickFormat(d3.format(options.format));
                            chart.y2Axis.tickFormat(d3.format(options.format));
                        } else {
                            chart.xAxis.tickFormat(d3.format(options.format)).axisLabel(options.xAxisLabel);
                            chart.yAxis.tickFormat(d3.format(options.format)).axisLabel(options.yAxisLabel);
                        }
                    }

                    var customChart = options.beforeRender(target, options, chart);
                    chart = typeof customChart === "function" ? customChart : chart;

                    target.attr("width", options.width)
                        .attr("height", options.height)
                        .datum(options.data)
                        .transition()
                        .duration(500)
                        .each("end", function () {
                            $(self.el).trigger("shown");

                            isDebug && isDebug && console.log("shown");
                        })
                        .call(chart);

                    typeof chart.afterRender === "function" && chart.afterRender("render");

                    chart.multibar && chart.multibar.dispatch.on("animated", function (d) {
                        $(self.el).trigger("animationEnd", d);
                    });

                    chart.multibar && chart.multibar.dispatch.on("lastAnimated", function (d) {
                        $(self.el).trigger("complete", d);
                        isDebug && console.log("complete", d);

                        target.$parent.hasClass("overlay") && target.$parent.removeClass("overlay");
                    });

                    self.afterRender(target, options, chart);

                })(self, target, options));
            }

            return this;
        },
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
            self = this;
            nv.addGraph(function () {
                chart = nv.models.multiBarChart()
                    .showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips);

                chart.stacked(true);

                target.datum(options.data)
                    .transition().duration(500).call(chart);

                self.util.applyBindEvent(target, options, chart, self.$el);

                return chart;
            });
        },
        groupedBarChart: function (target, options) {
            self = this;
            nv.addGraph(function () {
                chart = nv.models.multiBarChart()
                    .showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips);

                chart.stacked(false);

                target.datum(options.data)
                    .transition().duration(500).call(chart);

                self.util.applyBindEvent(target, options, chart, self.$el);

                return chart;
            });
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
        horizontalBarChart: function (target, options) {
            chart = nv.models.multiBarHorizontalChart()
                .showValues(options.showValues)
                .showLegend(options.showLegend)
                .valueFormat(d3.format(options.format))
                .tooltips(options.tooltips)
                .controlsData(options.controlsData);

            return chart;

        },
        linePlusBarChart: function () {
            chart = nv.models.linePlusBarChart();
            chart.bars.forceY([0]);
            return chart;
        },
        lineFocusChart: function (target, options) {
            var self = this;
            target.$parent.swipe();
            chart = nv.models.lineWithFocusChart();

            chart.xAxis.tickFormat(d3.format(options.format));
            chart.yAxis.tickFormat(d3.format(options.format));
            chart.y2Axis.tickFormat(d3.format(options.format));
            chart.afterRender = function () {
                function onBrush(extent) {
                    extent = extent ? extent : [0, 99];//chart.x2Axis.scale().domain();
                    var brush = d3.svg.brush();
                    var lines = chart.lines;

                    // The brush extent cannot be less than one.  If it is, don't update the line chart.
                    if (Math.abs(extent[0] - extent[1]) <= 1) {
                        return;
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
                };

                target.$parent.off("swipe._chart").on("swipe._chart", changeDomain);

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
            var barGroupWidth = barInnerWidth * dataLength + data[0].values.length * 12;
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
                // Get heading data from table caption
                chartHeading: function () {
                    return options.title;
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
                    return Math.ceil(Math.max.apply(Math, this.chartData()) / 1000) * 1000;
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

            // Add heading to graph
            var chartHeading = dataObject.chartHeading();
            var heading = $('<h4>' + chartHeading + '</h4>');
            heading.appendTo(figureContainer);

            // Add legend to graph
            var chartLegend = dataObject.chartLegend();
            var legendList = $('<ul class="legend"></ul>');
            $.each(chartLegend, function (i) {
                $('<li><span class="icon fig' + i + '"><div class="face front"></div><div class="face back"></div><div class="face left"></div><div class="face right"></div><div class="face top"></div><div class="face bottom"></div></span>' + this + '</li>')
                    .appendTo(legendList);
            });
            legendList.appendTo(figureContainer);

            // Add x-axis to graph
            var xLegend = dataObject.xLegend();

            var xAxisList = $('<ul class="x-axis"></ul>').css({
                width: xLegend.length * barGroupWidth
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
                width: xLegend.length * barGroupWidth
            });
            $.each(yLegend, function () {
                $('<li><span>' + this + '</span></li>').appendTo(yAxisList);
            });
            yAxisList.appendTo(graphContainer);

            // Add bars to graph
            barContainer.css({
                width: xLegend.length * barGroupWidth
            }).appendTo(graphContainer);

            //
            target.css({
                width: xLegend.length * barGroupWidth
            });
            target.$parent.css({
                width: xLegend.length * barGroupWidth - 100
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
                        $(self.el).trigger("animationEnd");

                        if (bars.length === i + 1) {
                            $(self.el).trigger("complete");
                        }
                    }, 100);
                }
            }

            // Reset graph settings and prepare for display
            function resetGraph() {
                $(self.el).trigger("shown");
                self.util.applyBindEvent(target, options);
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

            // Finally, display graph via reset function
            resetGraph();
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
                    $(this).parent().attr("clip-path", "");
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

            applyBindEvent: function (target, options, chart) {
                var self = this;

                if (options.chartType.match(/.*bar3d/gi)) {
                    var resizeChart = function () {
                        var $target = target.closest(".widget-chart3d");
                        var rate = window.innerWidth / target.width();

                        rate = rate > 1 ? target.$parent.parent().width() / target.width() : rate;

                        if (rate < 1) {
                            $target.css({
                                marginBottom: -target.height() * (1 - rate) * 1.2,
                                webkitTransform: "scale(" + rate + ")"
                            });

                            if ("horizontalBar3d" === options.chartType) {
                                $target.find(".wrapper").css({
                                    webkitTransform: "scale(0.75) rotateZ(90deg) translateY(" + target.width() * 0.15 + "px)"
                                });
                            } else {
                                $target.find(".wrapper").css({
                                    marginLeft: -target.width() * 0.1
                                });
                            }

                            $target.css({
                                width: target.width() * 0.9
                            });
                        } else {
                            $target.removeAttr("style");
                            $target.find(".wrapper").removeAttr("style");

                            $target.css({
                                width: target.width()
                            });
                        }
                    };

                    resizeChart();
                    $(window).off("resize._chart").on("resize._chart", function () {
                        resizeChart();
                    });
                } else {
                    var stateChange = function (e) {
                        isDebug && console.log("New State:", JSON.stringify(e));
                        // 애니매이션 중 이벤트 방지
                        !target.$parent.hasClass("overlay") && target.$parent.addClass("overlay");
                        setTimeout(function () {
                            typeof chart.afterRender === "function" && chart.afterRender("stateChange");

                            // 바차트외의 경우 complete 이벤트가 발생하지 않아 afterRender 후 이벤트 방지 overlay 제거
                            typeof chart.multibar !== "function" && target.$parent.hasClass("overlay")
                            && target.$parent.removeClass("overlay");

                        }, 10);
                    };

                    chart.dispatch["stateChange"] && chart.dispatch.on("stateChange", stateChange);

                    !options.autoResize || nv.utils.windowResize(function () {
                        chart.update();
                        setTimeout(function () {
                            typeof chart.afterRender === "function" && chart.afterRender("resize");
                        }, 10);
                    });
                }
            }
        }
    };

    $.fn.featuredChart = function (options) {
        var defaultOptions = {
            chartType: "bar",
            lineType: "basis",
            width: 500,
            height: 500,
            xAxisLabel: "X축",
            yAxisLabel: "Y축",
            format: ".0f",
            data: {},
            showMaxMin: true,
            showValues: true,
            showControls: true,
            showLegend: true,
            tooltips: true,
            title: "",
            color: ["#2c3e50", "#e74c3c", "#3498db", "#f5a503", "#7c569f", "#75483e", "#bf64a3", "#6b6b6b"],
            controlsData: {
                groupedName: "그룹",
                stackedName: "스택"
            },
            autoResize: true,
            beforeRender: function (target, options, chart) {
                return chart;
            }
        };

        options = $.extend(true, defaultOptions, options);

        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);

            // 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
            if (typeof options === "string") {
                data[options](data.options);
            } else if (typeof options === "object" && typeof data === "object") {
                data.render(options);
            } else {
                data = new FeaturedChart(this, options);
                $this.data(pluginName, data);
            }
        });
    };

    $.fn.featuredChart.Constructor = FeaturedChart;

    root.Cornerstone = root.Cornerstone || {};
    root.Cornerstone.widget = root.Cornerstone.widget || {};
    root.Cornerstone.widget.activeDataApi = function ($el) {
        $el = $el && $el.length ? $el.find("[data-featured=chart]") : $("[data-featured=chart]");
        // DATA API (HTML5 Data Attribute)
        $el.each(function () {
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
    };

    $(function () {
        root.Cornerstone.widget.activeDataApi();
    });

    // 코너스톤 MVC 프레임워크인 경우 이 위젯을 모듈화 한다.
    if (typeof root.define === "function" && root.define.amd) {
        var define = root.define;
        // AMD. Register as an anonymous module.
        define([ "jquery", "underscore", "backbone", "d3", "nv"], function ($, _, Backbone) {
            return Backbone.View.extend({
                model: new Backbone.Model(),
                initialize: function () {
                    _.bindAll(this, "render");
                },
                updateChart: function (view) {
                    view.model.clear();
                    view.model.fetch({
                        success: function (model) {
                            var data = [];
                            $.each(model.toJSON(), function (i, obj) {
                                data.push(obj);
                            });
                            view.options.chartOptions = $.extend({}, view.options.chartOptions, {data: data});

                            view.$el.featuredChart(view.options.chartOptions);
                        }
                    });
                },
                render: function () {
                    this.updateChart(this);
                    return this;
                }
            });
        });
    }
}).call(this);