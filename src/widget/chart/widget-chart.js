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
    var root = this;
    var pluginName = "featuredChart",
        defaultOptions = {
            chartType: "bar",
            lineType: "basis",
            xAxisLabel: null,
            yAxisLabel: null,
            width: 960,
            height: 600,
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0],
            data: {},
            animate: false,
            showControls: false,
            showLegend: false,
            tooltips: false,
            control: {
                active: 'grouped',
                groupedName: '그룹',
                stackedName: '스택'
            },
            autoResize: false
        },
        chart,
        self;

    var FeaturedChart = function (element, options) {
        this.el = element;
        this.$el = $(element);

        nv.dev = false;

        this.render(options);
    };

    FeaturedChart.prototype = {
        beforeRender: function (target, options) {
            if (this.isNotFirst) {
                options.control = $.extend({}, options.control, {
                    active: $(this.el).find('.nv-controlsWrap .nv-series:not(.disabled)').data('control')
                });
            }
        },
        afterRender: function (target, options) {
            this.util.customControl(target, options);

            this.$el.data('currentChart', chart);
            this.$el.data('currentChartControl', options.control);

            this.util.applyBindEvent(target, options, chart, this.$el);
            this.util.removeLegendStyleAttr(target);

            target.select('.nv-controlsWrap').style('display', [options.showControls ? "block" : "none"]);
            target.select('.nv-legendWrap').style('display', [options.showLegend ? "block" : "none"]);

            this.isNotFirst = true;
        },
        render: function (options) {
            var target = this.util.getTarget(d3.select(this.el));
            this.beforeRender(target, options);

            chart = this[options.chartType + "Chart"](target, options);

            this.afterRender(target, options);
        },
        // TODO Bar 그래프의 트랜지션이 완료될 때 event trigger 발생 필요
        barChart: function (target, options) {
            var self = this,
                chart = nv.models.multiBarChart()
                    .showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips);

            chart.stacked(options.control.active !== 'grouped');
            chart.yAxis.tickFormat(d3.format('.0f'));

            target.datum(options.data)
                .transition()
                .duration(500)
                .each('end', function () {
                    $(target).trigger("shown");
                })
                .call(chart);

            return chart;
        },

        stackedBarChart: function (target, options) {
            self = this;
            nv.addGraph(function () {
                var chart = nv.models.multiBarChart()
                    .showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips);

                chart.stacked(true);

//                chart.xAxis
//                    .axisLabel(options.xAxisLabel)
//                    .tickFormat(d3.format(',f'));
//
//                chart.yAxis
//                    .axisLabel(options.yAxisLabel)
//                    .tickFormat(d3.format(',.1f'));

                target.datum(options.data)
                    .transition().duration(500).call(chart);

                self.util.applyBindEvent(target, options, chart, self.$el);
                self.util.removeLegendStyleAttr(target);

                return chart;
            });
        },
        groupedBarChart: function (target, options) {
            self = this;
            nv.addGraph(function () {
                var chart = nv.models.multiBarChart()
                    .showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips);

                chart.stacked(false);

                target.datum(options.data)
                    .transition().duration(500).call(chart);

                self.util.applyBindEvent(target, options, chart, self.$el);
                self.util.removeLegendStyleAttr(target);

                return chart;
            });
        },
        lineChart: function (target, options) {
            self = this;
            // Wrapping in nv.addGraph allows for '0 timeout render', stors rendered charts in nv.graphs, and may do more in the future... it's NOT required
            nv.addGraph(function () {
                var chart = nv.models.lineChart()
                    .showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips);

                target.datum(options.data)
                    .transition().duration(500)
                    .call(chart);

                self.util.applyBindEvent(target, options, chart, self.$el);
                self.util.removeLegendStyleAttr(target);

                return chart;
            });
        },
        pieChart: function (target, options) {
            self = this;
            var width = 500,
                height = 500;

            nv.addGraph(function () {
                var chart = nv.models.pieChart()
                    .showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips);

                target.datum([options.data])
                    .transition().duration(1200)
                    .attr('width', width)
                    .attr('height', height)
                    .call(chart);

                // inline Style로 추가되는 스타일 제거
                $.each(target.selectAll(".nv-slice > .nv-label > text")[0], function (index, item) {
                    $(item).removeAttr("style");
                });

                self.util.applyBindEvent(target, options, chart, self.$el);
                self.util.removeLegendStyleAttr(target);

                return chart;
            });
        },
        horizontalBarChart: function (target, options) {
            var chart = nv.models.multiBarHorizontalChart()
                    .showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips);

            chart.stacked(options.control.active !== 'grouped');
            chart.yAxis.tickFormat(d3.format('.0f'));

            target.datum(options.data)
                .transition()
                .duration(500)
                .each('end', function () {
                    $(target).trigger("shown");
                })
                .call(chart);

            return chart;

        },
        linePlusBarChart: function (target, options) {
            self = this;
            var data = [
                {
                    "key": "Quantity",
                    "bar": true,
                    "values": [
                        [ 1136005200000 , 1271000.0] ,
                        [ 1138683600000 , 1271000.0] ,
                        [ 1141102800000 , 1271000.0] ,
                        [ 1143781200000 , 0] ,
                        [ 1146369600000 , 310] ,

                        [ 1149048000000 , 123410] ,
                        [ 1151640000000 , 53340] ,
                        [ 1154318400000 , 4320] ,
                        [ 1156996800000 , 0] ,
                        [ 1159588800000 , 3899486.0] ,

                        [ 1162270800000 , 3899486.0] ,
                        [ 1164862800000 , 3899486.0] ,
                        [ 1167541200000 , 3564700.0] ,
                        [ 1170219600000 , 3564700.0] ,
                        [ 1172638800000 , 3564700.0] ,

                        [ 1175313600000 , 2648493.0] ,
                        [ 1177905600000 , 2648493.0] ,
                        [ 1180584000000 , 2648493.0] ,
                        [ 1183176000000 , 2522993.0] ,
                        [ 1185854400000 , 2522993.0]
                    ]
                },
                {
                    "key": "Price",
                    "values": [
                        [ 1136005200000 , 71.89] ,
                        [ 1138683600000 , 75.51] ,
                        [ 1141102800000 , 68.49] ,
                        [ 1143781200000 , 62.72] ,
                        [ 1146369600000 , 70.39] ,

                        [ 1149048000000 , 59.77] ,
                        [ 1151640000000 , 57.27] ,
                        [ 1154318400000 , 67.96] ,
                        [ 1156996800000 , 67.85] ,
                        [ 1159588800000 , 76.98] ,

                        [ 1162270800000 , 81.08] ,
                        [ 1164862800000 , 91.66] ,
                        [ 1167541200000 , 84.84] ,
                        [ 1170219600000 , 85.73] ,
                        [ 1172638800000 , 84.61] ,

                        [ 1175313600000 , 92.91] ,
                        [ 1177905600000 , 99.8] ,
                        [ 1180584000000 , 121.191] ,
                        [ 1183176000000 , 122.04] ,
                        [ 1185854400000 , 131.76] ,

                        [ 1188532800000 , 138.48] ,
                        [ 1191124800000 , 153.47] ,
                        [ 1193803200000 , 189.95] ,
                        [ 1196398800000 , 182.22] ,
                        [ 1199077200000 , 198.08]
                    ]
                }
            ];

            nv.addGraph(function () {
                var chart = nv.models.linePlusBarChart()
                    .x(function (d, i) {
                        return i
                    })
                    .y(function (d) {
                        return d[1]
                    })
                    .color(d3.scale.category10().range());

                chart.xAxis
                    .showMaxMin(false)
                    .tickFormat(function (d) {
                        var dx = data[0].values[d] && data[0].values[d][0] || 0;
                        return d3.time.format('%x')(new Date(dx))
                    });

                chart.y1Axis
                    .tickFormat(d3.format(',f'));

                chart.y2Axis
                    .tickFormat(function (d) {
                        return '$' + d3.format(',f')(d)
                    });

                chart.bars.forceY([0]);

                if (target.select("svg").length > 0 && target.select("svg")[0][0] === null) {
                    target = target.append("svg:svg")
                } else {
                    target = target.select("svg");
                }

                return chart;
            });
        },
        lineFocusChart: function (target, options) {
            self = this;
            function data() {
                return stream_layers(3, 10 + Math.random() * 200, .1).map(function (data, i) {
                    return {
                        key: 'Stream' + i,
                        values: data
                    };
                });
            }

            /* Inspired by Lee Byron's test data generator. */
            function stream_layers(n, m, o) {
                if (arguments.length < 3) o = 0;
                function bump(a) {
                    var x = 1 / (.1 + Math.random()),
                        y = 2 * Math.random() - .5,
                        z = 10 / (.1 + Math.random());
                    for (var i = 0; i < m; i++) {
                        var w = (i / m - y) * z;
                        a[i] += x * Math.exp(-w * w);
                    }
                }

                return d3.range(n).map(function () {
                    var a = [], i;
                    for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                    for (i = 0; i < 5; i++) bump(a);
                    return a.map(stream_index);
                });
            }

            /* Another layer generator using gamma distributions. */
            function stream_waves(n, m) {
                return d3.range(n).map(function (i) {
                    return d3.range(m).map(function (j) {
                        var x = 20 * j / m - i / 3;
                        return 2 * x * Math.exp(-.5 * x);
                    }).map(stream_index);
                });
            }

            function stream_index(d, i) {
                return {x: i, y: Math.max(0, d)};
            }

            nv.addGraph(function () {
                var chart = nv.models.lineWithFocusChart();

                chart.xAxis
                    .tickFormat(d3.format(',f'));

                chart.yAxis
                    .tickFormat(d3.format(',.2f'));

                chart.y2Axis
                    .tickFormat(d3.format(',.2f'));

                target = self.util.getTarget(target);

                target.datum(data())
                    .transition().duration(500)
                    .call(chart);

                return chart;
            });
        },

        util: {
            customControl: function (target, options) {
                target.selectAll('.nv-controlsWrap .nv-series').each(function (item, i) {
                    var _parent = d3.select(this);
                    if (i === 0) {
                        _parent.attr('data-control', 'grouped').select('text').text(options.control.groupedName);
                    } else {
                        _parent.attr('data-control', 'stacked').select('text').text(options.control.stackedName);
                    }
                });
            },

            getTarget: function (target) {
                if (target.select("svg").length > 0 && target.select("svg")[0][0] === null) {
                    target = target.append("svg:svg")
                } else {
                    target = target.select("svg");
                }
                return target;
            },

            // TODO legend 클릭으로 필터링시 수직 차트에서 Bar 그래프가 겹치는 문제
            // TODO Group/Stacked 클릭 후 데이터 변경시 Group으로만 초기화되는 문제
            applyBindEvent: function (target, options, chart, $el) {
                var self = this;

                target.selectAll(".nv-legend .nv-series").each(function () {
                    $(this).off("click.cs-chart").on("click.cs-chart", function () {
                        self.customControl(target, options);
                        self.removeLegendStyleAttr(target);
                    });
                });

                !options.autoResize || nv.utils.windowResize(function () {
                    chart.update();
                    self.customControl(target, options);
                    self.removeLegendStyleAttr(target);
                });
            },

            removeLegendStyleAttr: function (target) {
                $(target.selectAll(".nv-group rect")).each(function () {
                    $(this).removeAttr("style");
                });
                $(target.selectAll(".nv-line .nv-group")).each(function () {
                    $(this).removeAttr("style");
                });
                var $circle = target.selectAll(".nv-legendWrap circle");
                $circle.length && $($circle).each(function () {
                    $(this).removeAttr("style");
                });
            }
        }
    };

    $.fn.featuredChart = function (options) {
        options = $.extend(true, defaultOptions, options);
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);

            // 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
            if (typeof options === 'string') {
                data[options](data.options);
            } else if (typeof options === 'object' && typeof data === 'object') {
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
                    data: json
                });
            });
        });
    };

    $(function () {
        root.Cornerstone.widget.activeDataApi();
    });

    // 코너스톤 MVC 프레임워크인 경우 이 위젯을 모듈화 한다.
    if (typeof root.define === "function" && root.define.amd && typeof root.Cornerstone === "object") {
        var define = root.define;
        // AMD. Register as an anonymous module.
        define([ "jquery", "underscore", "backbone"], function ($, _, Backbone) {
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