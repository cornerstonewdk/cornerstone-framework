/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-chart.js
 *  Description: D3 chart를 jQuery 플러그인 형태로 사용 할 수 있고, 반응형 웹에 맞는 화면을 보여주도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    // 코너스톤 MVC 프레임워크인 경우 이 위젯을 모듈화 한다.
    if (typeof Cornerstone === "object" && typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([ "jquery", "style!" + Cornerstone.PATH +  "ui/widget-chart"], function ($) {
            return factory($, root, doc, d3);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc, root.d3);
    }
}(this, document, function ($, window, document, d3, undefined) {
    var pluginName = "featuredChart",
        featuredChart,
        defaultOptions;

    FeaturedChart.name = 'FeaturedChart';

    function FeaturedChart(element, options) {
        var self = this;
        var target = d3.select(element);

        // 배열로 넘어온 색상을 d3 색상 카테고리로 변환
        if (typeof options === "object" && typeof options.color === "object" && options.color.length > 0) {
            options.color = d3.scale.ordinal().range(options.color);
        }

        this.options = options;

        this.$el = $(element);

        nv.dev = false;
        this[options.chartType + "Chart"](target, options);
    }

    FeaturedChart.prototype.barChart = function (target, options) {
        nv.addGraph(function () {
            var chart = nv.models.multiBarChart();

            chart.xAxis
                .axisLabel(options.xAxisLabel)
                .tickFormat(d3.format(',f'));

            chart.yAxis
                .axisLabel(options.yAxisLabel)
                .tickFormat(d3.format(',.1f'));

            chart.color(options.color.range());

            if(target.select("svg").length > 0 && target.select("svg")[0][0] === null) {
                target = target.append("svg:svg")
            } else {
                target = target.select("svg");
            }

            target.datum(options.data)
                .transition().duration(500).call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
    };

    FeaturedChart.prototype.lineChart = function (target, options) {
        // Wrapping in nv.addGraph allows for '0 timeout render', stors rendered charts in nv.graphs, and may do more in the future... it's NOT required
        nv.addGraph(function () {
            var chart = nv.models.lineChart();

            chart.xAxis
                .axisLabel(options.xAxisLabel)
                .tickFormat(d3.format(',f'));

            chart.yAxis
                .axisLabel(options.yAxisLabel)
                .tickFormat(d3.format(',.1f'));

            chart.color(options.color.range());

            if(target.select("svg").length > 0 && target.select("svg")[0][0] === null) {
                target = target.append("svg:svg")
            } else {
                target = target.select("svg");
            }

            target.datum(options.data)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            return chart;
        });
    };

    /**
     * TODO 실시간 데이터 바인딩할 경우 차트 드로우 업데이트 구현 필요
     * @param target
     * @param options
     */
    FeaturedChart.prototype.cumulativeLineChart = function(target, options) {
        var data = [{
            "key": "Long",
            "values": getData()
        }];
        var chart;

        function redraw(target) {
            nv.addGraph(function () {
                chart = nv.models.cumulativeLineChart()
                    .x(function (d) { return d.x })
                    .y(function (d) { return d.y / 100 })
                    .color(options.color.range());


                chart.xAxis
                    .axisLabel(options.xAxisLabel)
                    .tickFormat(function (d) {
                        return d3.time.format('%x')(new Date(d))
                    });

                chart.yAxis
                    .axisLabel(options.yAxisLabel)
                    .tickFormat(d3.format(',.1%'));


                if(target.select("svg").length > 0 && target.select("svg")[0][0] === null) {
                    target = target.append("svg:svg")
                } else {
                    target = target.select("svg");
                }

                target.datum(data)
                    .transition().duration(500)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                return chart;
            });


        }

        function getData() {
            var arr = [];
            var theDate = new Date(2012, 01, 01, 0, 0, 0, 0);
            for (var x = 0; x < 30; x++) {
                arr.push({x: new Date(theDate.getTime()), y: Math.random() * 100});
                theDate.setDate(theDate.getDate() + 1);
            }
            return arr;
        }

        var isOver = false;
        this.$el.on("mouseover", function() {
           isOver = true;
        }).on("mouseout", function() {
                isOver = false;
            });
        setInterval(function () {
            var long = data[0].values;
            var next = new Date(long[long.length - 1].x);
            next.setDate(next.getDate() + 1)
            long.shift();
            long.push({x:next.getTime(), y:Math.random() * 100});
            if(!isOver) {
                redraw(target);
            }
        }, 1500);
    };

    FeaturedChart.prototype.pieChart = function (target, options) {
        var self = this;
        nv.addGraph(function () {
            var width = 500;
            var height = 500;
            var fitScreen = false;
            var zoom = 1;

            var chart = nv.models.pieChart()
                .x(function (d) {
                    return d.label
                })
                .y(function (d) {
                    return d.value
                })
                .color(options.color.range())
                .width(width)
                .height(height);
            if(target.select("svg").length > 0 && target.select("svg")[0][0] === null) {
                target = target.append("svg:svg")
            } else {
                target = target.select("svg");
            }
            target.datum(options.data)
                .transition().duration(1200)
                .attr('width', width)
                .attr('height', height)
                .call(chart);

            self.setChartViewBox(target, chart, width, height, zoom);
            self.resizeChart(target, chart, fitScreen, width, height);
            nv.utils.windowResize(this.resizeChart);

            return chart;
        });
    };

    /**
     * TODO 분산 차트 다른 차트와 같이 사용할 경우 X, Y축 값 표시 팝업 오류발생.
     * @param target
     * @param options
     */
    FeaturedChart.prototype.scatterChart = function (target, options) {
        nv.addGraph(function () {
            var chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .color(d3.scale.category10().range());

            chart.xAxis
                .axisLabel(options.xAxisLabel)
                .tickFormat(d3.format(',f'));

            chart.yAxis
                .axisLabel(options.yAxisLabel)
                .tickFormat(d3.format(',.1f'));

            target.append("svg:svg")
                .datum(options.data)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
    };

    FeaturedChart.prototype.resizeChart = function (target, chart, fitScreen, width, height) {
        var svg = target.select('svg');

        if (fitScreen) {
            // resize based on container's width AND HEIGHT
            var windowSize = nv.utils.windowSize();
            svg.attr("width", windowSize.width);
            svg.attr("height", windowSize.height);
        } else {
            // resize based on container's width
            var aspect = chart.width() / chart.height();
            var targetWidth = parseInt(target.style('width'));
            svg.attr("width", targetWidth);
            svg.attr("height", Math.round(targetWidth / aspect));
        }
    };

    FeaturedChart.prototype.setChartViewBox = function (target, chart, width, height, zoom) {
        var w = width * zoom,
            h = height * zoom;

        chart
            .width(w)
            .height(h);

        target.select('svg')
            .attr('viewBox', '0 0 ' + w + ' ' + h)
            .transition().duration(500)
            .call(chart);
    };


    $.fn.featuredChart = function (options, methodOptions) {
        defaultOptions = {
            chartType:"bar",
            lineType:"basis",
            xAxisLabel: null,
            yAxisLabel: null,
            width:960,
            height:600,
            margin:[0, 0, 0, 0],
            padding:[0, 0, 0, 0],
            data:{},
            animate:false,
            color:d3.scale.category10()
        };

        options = $.extend(true, defaultOptions, options);

        return this.each(function (i) {
            var $this = $(this);
            var data = $this.data(pluginName);
            // 초기 실행된 경우 플러그인을 해당 엘리먼트에 data 등록
//            if (!data) {
//
//            }

            // 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
            if (typeof options == 'string') {
                data[options](data.options);
            } else {
                $this.data(pluginName, (data = new FeaturedChart(this, options)));
            }
        });
    };

    $.fn.featuredChart.Constructor = FeaturedChart;

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=chart]").each(function (i) {
        var self = this,
            dataUrl = $(this).data("chartBind");

        $.getJSON(dataUrl).success(function (json) {
            $(self)[pluginName]({
                chartType:$(self).data("chartType"),
                data:json
            });
        }).error(function (jqXHR, textStatus, errorThrown) {
                console.log("getJSON Error", jqXHR, textStatus, errorThrown);
            });
    });

    return FeaturedChart;
}));