/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-chart.js
 *  Description: D3 chart를 jQuery 플러그인 형태로 사용 할 수 있고, 반응형 웹에 맞는 화면을 보여주도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define("FeaturedChart", [ "jquery", "d3" ], function ($, d3) {
            return factory($, root, doc, d3);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc, root.d3);
    }
}(this, document, function ($, window, document, d3, undefined) {
    var pluginName = "featuredChart",
        featuredChart,
        defaultOptions = {
            chartType:"bar",
            lineType:"basis",
            width:960,
            height:600,
            margin:[0, 0, 0, 0],
            padding:[0, 0, 0, 0],
            data:{},
            animate:false,
            color:d3.scale.category10()
        };

    FeaturedChart.name = 'FeaturedChart';

    function FeaturedChart(element, options) {
        var self = this;
        var target = d3.select(element);
        this.options = options = $.extend(true, defaultOptions, options);
        this.$el = $(element);

        this[options.chartType + "Chart"](target, options);

        // 배열로 넘어온 색상을 d3 색상 카테고리로 변환
        if (typeof options.color === "object" && options.color.length > 0) {
            options.color = d3.scale.ordinal().range(options.color);
        }
    }

    FeaturedChart.prototype.barChart = function (target, options) {
        nv.addGraph(function () {
            var chart = nv.models.multiBarChart();

            chart.xAxis
                .tickFormat(d3.format(',f'));

            chart.yAxis
                .tickFormat(d3.format(',.1f'));

            target.append("svg:svg")
                .datum(options.data)
                .transition().duration(500).call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
    };

    FeaturedChart.prototype.lineChart = function (target, options) {
        // Wrapping in nv.addGraph allows for '0 timeout render', stors rendered charts in nv.graphs, and may do more in the future... it's NOT required
        nv.addGraph(function () {
            var chart = nv.models.lineChart();

            chart.xAxis// chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the partent chart, so need to chain separately
                .tickFormat(d3.format(',r'));

            chart.yAxis
                .axisLabel('Voltage (v)')
                .tickFormat(d3.format(',.2f'));

            target.append("svg:svg")
                .datum(options.data)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            return chart;
        });
    };

    FeaturedChart.prototype.pieChart = function (target, options) {
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
                //.showLabels(false)
                .color(d3.scale.category10().range())
                .width(width)
                .height(height);

            target.append("svg:svg")
                .datum(options.data)
                .transition().duration(1200)
                .attr('width', width)
                .attr('height', height)
                .call(chart);

            setChartViewBox();
            resizeChart(target);
            nv.utils.windowResize(resizeChart);

            function resizeChart(target) {
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
            }

            function setChartViewBox() {
                var w = width * zoom,
                    h = height * zoom;

                chart
                    .width(w)
                    .height(h);

                target.select('svg')
                    .attr('viewBox', '0 0 ' + w + ' ' + h)
                    .transition().duration(500)
                    .call(chart);
            }

            return chart;
        });
    };

    FeaturedChart.prototype.scatterChart = function (target, options) {
        nv.addGraph(function () {
            var chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .color(d3.scale.category10().range());

            chart.xAxis.tickFormat(d3.format('.02f'))
            chart.yAxis.tickFormat(d3.format('.02f'))

            target.append("svg:svg")
                .datum(options.data)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
    };

    $.fn.featuredChart = function (options) {
        return this.each(function (i) {
            var $this = $(this);
            var data = $this.data(pluginName);

            // 초기 실행된 경우 플러그인을 해당 엘리먼트에 data 등록
            if (!data) {
                $this.data(pluginName, (data = new FeaturedChart(this, options)))
            }

            // 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
            if (typeof options == 'string') {
                data[options](data.options);
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
            var featuredChart = new FeaturedChart();
            featuredChart[$(self).data("chartType") + "Chart"](d3.select(self), {
                data:json
            });
        }).error(function (jqXHR, textStatus, errorThrown) {
                console.log("getJSON Error", jqXHR, textStatus, errorThrown);
            });
    });

    return FeaturedChart;
}));