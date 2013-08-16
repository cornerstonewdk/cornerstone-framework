define([
    'backbone',
    'template!view/page2',
    'widget-chart'
], function (Backbone, template, Chart) {

    return Backbone.View.extend({

        el: 'section#page2',
        sampleDataUrl: "data/sample-line.json",

        render: function () {
            var self = this;
            self.$el.html(template());

            this.activeChartDataApi();
            this.activeChartPlugin();
            this.activeChartView();

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

        updateChart: function () {
            this.activeChartPlugin();
            this.activeChartView();
        },

        activeChartDataApi: function () {
            // Data-API 방식 적용
            window.Cornerstone.widget.activeDataApi();
        },

        activeChartPlugin: function () {
            var self = this;
            // jQuery Plugin 방식 적용
            $.ajax({
                url: self.sampleDataUrl,
                dataType: "json",
                success: function (data) {
                    self.$el.find("#linePlusBar1").featuredChart({
                        chartType: "linePlusBar",
                        format: '.2f',
                        data: data,
                        beforeRender: function(target, options, chart) {
                            chart.xAxis.tickFormat(d3.format('d'));
                            return chart;
                        }
                    });
                }
            });
        },

        activeChartView: function () {
            var self = this;

            // Backbone View 방식 적용
            var Model = Backbone.Model.extend({
                url: this.sampleDataUrl
            });

            var chart = new Chart({
                el: "#linePlusBar2",
                model: new Model(),
                chartOptions: {
                    chartType: "linePlusBar",
                    format: '.2f'
                }
            });

            chart.render();
        }
    });
});
