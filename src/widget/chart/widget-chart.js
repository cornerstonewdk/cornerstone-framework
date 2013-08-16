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

        },
        render: function (options) {
            var self = this,
                target = this.util.getTarget(d3.select(this.el));

            nv.addGraph((function (self, target, options) {
                var colorLength = options.color.length;

                self.beforeRender(target, options);

                chart = self[options.chartType + 'Chart'](target, options);

                chart.tooltips(options.tooltips)
                    .color(function (d, i) {
                        return options.color[i % colorLength];
                    });

                if('line' === options.chartType) {
                    chart.lines.color(options.data.map(function(d,i) {
                        console.log(i);
                        return d.color || options.color[i % colorLength];
                    }));
                }

                if('pie' === options.chartType ) {

                } else {
                    if('linePlusBar' === options.chartType ) {
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

                target.attr('width', options.width)
                    .attr('height', options.height)
                    .datum(options.data)
                    .transition()
                    .duration(500)
                    .each('end', function () {
                        $(target).trigger('shown');
                    })
                    .call(chart);

                typeof chart.afterRender === 'function' && chart.afterRender('render');

                chart.multibar && chart.multibar.dispatch.on('animated', function (d) {
                    $(self.el).trigger('animationEnd', d);
                });

                chart.multibar && chart.multibar.dispatch.on('lastAnimated', function (d) {
                    $(self.el).trigger('complete', d);
                });

                self.afterRender(target, options, chart);
            })(self, target, options));
        },

        barChart: function (target, options) {
            var self = this;
            chart = nv.models.multiBarChart();

            chart.showLegend(options.showLegend)
                .showControls(options.showControls)
                .controlsData(options.controlsData);

            chart.afterRender = function (eventType) {
                if (!options.showValues) {
                    return false;
                }

                target.select('.nv-showValuesWrap').remove();

                if (chart.multibar && chart.multibar.stacked()) {
                    target.select('.nv-showValuesWrap').remove();
                    return false;
                }

                var groups = target.select('.nv-barsWrap .nv-groups');
                var showValuesWrap = groups.append('svg:g').attr('class', 'nv-showValuesWrap');
                groups[0][0].parentNode.setAttribute('clip-path', '');

                showValuesWrap.style({
                    opacity: 1
                });

                var animateEnd = function (e, d) {
                    var rect = d3.select(d.target);
                    var text = showValuesWrap.append('svg:text').attr('class', 'nv-value');

                    var x = parseInt(rect.attr('x')) + parseInt(rect.attr('width')) / 2;
                    var y = rect.attr('y') - 1;
                    var width = rect.attr('width');
                    var height = rect.attr('height');

                    if (!(text.attr('x') == x
                        && text.attr('y') == y
                        && text.attr('width') == width
                        && text.attr('height') == height) || status === 'update') {
                        text.attr({
                            'opacity': 0,
                            'x': x,
                            'y': y,
                            'width': width,
                            'height': height,
                            'text-anchor': 'middle',
                            'transform': rect.attr('transform')
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

                $(self.el).off('animationEnd._barChart').on('animationEnd._barChart', animateEnd);
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
                chart = nv.models.lineWithFocusChart();

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
        var defaultOptions = {
            chartType: 'bar',
            lineType: 'basis',
            width: 500,
            height: 500,
            xAxisLabel: 'X축',
            yAxisLabel: 'Y축',
            format: ".0f",
            data: {},
            showMaxMin: true,
            showValues: true,
            showControls: true,
            showLegend: true,
            tooltips: true,
            color: ['#2c3e50', '#e74c3c', '#3498db', '#f5a503', '#7c569f', '#75483e', '#bf64a3', '#6b6b6b'],
            controlsData: {
                groupedName: '그룹',
                stackedName: '스택'
            },
            autoResize: true
        };

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
                    format: $(self).data('chartFormat'),
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