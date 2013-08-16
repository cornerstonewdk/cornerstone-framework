/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-chart.js
 *  Description: D3 chart를 jQuery 플러그인 형태로 사용 할 수 있고, 반응형 웹에 맞는 화면을 보여주도록 구현함.
 *  Author: 김우섭
 *  License :
 */
(function () {
    'use strict';
    var root = this;
    var pluginName = 'featuredChart',
        defaultOptions = {
            chartType: 'bar',
            lineType: 'basis',
            xAxisLabel: null,
            yAxisLabel: null,
            format: ".0f",
            data: {},
            showValues: true,
            showControls: true,
            showLegend: false,
            tooltips: false,
            color: ['#2c3e50', '#e74c3c', '#3498db', '#f5a503', '#2980b9'],
            controlsData: {
                groupedName: '그룹',
                stackedName: '스택'
            },
            autoResize: true
        },
        chart,
        self;

    // TODO animation 중에 control, legend 이벤트를 막는다.
    var FeaturedChart = function (element, options) {
        this.el = element;
        this.$el = $(element);
        this.options = options;

        nv.dev = false;

        this.render(options);
    };

    FeaturedChart.prototype = {
        beforeRender: function (target, options) {

        },
        afterRender: function (target, options, chart) {
            this.$el.data('currentChart', chart);
            this.$el.data('currentChartControl', options.control);

            this.util.applyBindEvent(target, options, chart, this.$el);

            target.on("stateChange", function (d) {
                console.log(d);
            });

            this.isNotFirst = true;
        },
        render: function (options) {
            var self = this,
                target = this.util.getTarget(d3.select(this.el));

            nv.addGraph((function (self, target, options) {
                var colorLength = options.color.length;

                self.beforeRender(target, options);

                chart = self[options.chartType + 'Chart'](target, options);

                chart.showControls(options.showControls)
                    .showLegend(options.showLegend)
                    .tooltips(options.tooltips)
                    .color(function (d, i) {
                        return options.color[i % colorLength];
                    })
                    .tooltips(options.tooltips)
                    .controlsData(options.controlsData);

                // Draw chart
                target.datum(options.data)
                    .transition()
                    .duration(500)
                    .each('end', function () {
                        $(target).trigger('shown');
                    })
                    .call(chart);

                typeof chart.afterRender === 'function' && chart.afterRender('render');

                chart.multibar.dispatch.on('animated', function (d) {
                    $(self.el).trigger('animationEnd', d);
                });

                chart.multibar.dispatch.on('lastAnimated', function (d) {
                    $(self.el).trigger('complete', d);
                });

                self.afterRender(target, options, chart);
            })(self, target, options));
        },

        barChart: function (target, options) {
            var self = this;
            var chart = nv.models.multiBarChart();

            chart.yAxis.tickFormat(d3.format(options.format));

            chart.afterRender = function (eventType) {
                if (!options.showValues) {
                    return false;
                }

                var xAxis = target.select('.nv-x.nv-axis');
                var yAxis = target.select('.nv-y.nv-axis');
                var barsWrap = target.select('.nv-barsWrap');
                var xAxisTranslate = self.util.getTranslateJson(xAxis);

                xAxis.attr('transform', 'translate(0, ' + (xAxisTranslate.y + ('resize' === eventType ? 10 : 20)) + ')');
                yAxis.attr('transform', 'translate(0, 20)');
                barsWrap.attr('transform', 'translate(0, 20)');

                target.select('.nv-showValuesWrap').remove();

                if (chart.multibar.stacked()) {
                    target.select('.nv-showValuesWrap').remove();
                    return false;
                }

                var groups = target.select(".nv-barsWrap .nv-groups");
                var showValuesWrap = groups.append('svg:g').attr('class', 'nv-showValuesWrap');
                groups[0][0].parentNode.setAttribute("clip-path", "");

                showValuesWrap.style({
                    opacity: 1
                });

                var animateEnd = function (e, d) {
                    var rect = d3.select(d.target);
                    var text = showValuesWrap.append("svg:text").attr("class", "nv-value");

                    var x = parseInt(rect.attr("x")) + parseInt(rect.attr("width")) / 2;
                    var y = rect.attr("y") - 7;
                    var width = rect.attr("width");
                    var height = rect.attr("height");

                    if (!(text.attr("x") == x
                        && text.attr("y") == y
                        && text.attr("width") == width
                        && text.attr("height") == height) || status === "update") {
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

                    e.stopPropagation();
                    return e;
                };

                $(self.el).off('animationEnd._barChart').on('animationEnd._barChart', animateEnd);
                return eventType;
            };

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
                $.each(target.selectAll('.nv-slice > .nv-label > text')[0], function (index, item) {
                    $(item).removeAttr('style');
                });

                self.util.applyBindEvent(target, options, chart, self.$el);

                return chart;
            });
        },
        horizontalBarChart: function (target, options) {
            var chart = nv.models.multiBarHorizontalChart()
                .showValues(options.showValues)
                .showControls(options.showControls)
                .showLegend(options.showLegend)
                .color(function () {
                })
                .valueFormat(function (d) {
                    var format = d3.format('.0f');
                    return format(d);
                })
                .tooltips(options.tooltips);

            chart.yAxis.tickFormat(d3.format('.0f'));

            target.datum(options.data)
                .transition()
                .duration(500)
                .each('end', function () {
                    $(target).trigger('shown');
                })
                .call(chart);

            return chart;

        },
        linePlusBarChart: function (target) {
            self = this;
            var data = [
                {
                    'key': 'Quantity',
                    'bar': true,
                    'values': [
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
                    'key': 'Price',
                    'values': [
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

                if (target.select('svg').length > 0 && target.select('svg')[0][0] === null) {
                    target = target.append('svg:svg')
                } else {
                    target = target.select('svg');
                }

                return chart;
            });
        },
        lineFocusChart: function (target) {
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
            getTranslateJson: function (target) {
                try {
                    return JSON.parse(target.attr('transform').replace('translate(', '{"x":')
                        .replace(',', ',"y":')
                        .replace(')', '}'))
                } catch (e) {
                    return {x: 0, y: 0};
                }
            },
            getTarget: function (target) {
                if (target.select('svg').length > 0 && target.select('svg')[0][0] === null) {
                    target = target.append('svg:svg')
                } else {
                    target = target.select('svg');
                }
                return target;
            },

            applyBindEvent: function (target, options, chart) {
                chart.dispatch.on('stateChange', function () {
                    setTimeout(function () {
                        typeof chart.afterRender === 'function' && chart.afterRender('stateChange');
                    }, 0);
                });

                !options.autoResize || nv.utils.windowResize(function () {
                    chart.update();
                    setTimeout(function () {
                        typeof chart.afterRender === 'function' && chart.afterRender('resize');
                    }, 0);
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
        $el = $el && $el.length ? $el.find('[data-featured=chart]') : $('[data-featured=chart]');
        // DATA API (HTML5 Data Attribute)
        $el.each(function () {
            var self = this,
                dataUrl = $(this).data('chartBind');

            dataUrl && $.getJSON(dataUrl).success(function (json) {
                $(self)[pluginName]({
                    chartType: $(self).data('chartType'),
                    data: json
                });
            });
        });
    };

    $(function () {
        root.Cornerstone.widget.activeDataApi();
    });

    // 코너스톤 MVC 프레임워크인 경우 이 위젯을 모듈화 한다.
    if (typeof root.define === 'function' && root.define.amd && typeof root.Cornerstone === 'object') {
        var define = root.define;
        // AMD. Register as an anonymous module.
        define([ 'jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
            return Backbone.View.extend({
                model: new Backbone.Model(),
                initialize: function () {
                    _.bindAll(this, 'render');
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