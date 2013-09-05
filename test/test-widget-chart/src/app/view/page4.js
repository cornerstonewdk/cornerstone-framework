define([
    'backbone',
    'widget-chart',
    'template!view/page4'
], function (Backbone, Chart, template) {

    return Backbone.View.extend({

        el: 'section#page4',
        sampleDataUrl: "data/sample-bar.json",

        render: function () {
            this.$el.html(template());
            this.active3DChart();
            return this;
        },

        events: {
            'click button.prev': 'prevPage',
            'click button.next': 'nextPage'
        },

        prevPage: function () {
            location.href = '#page3';
        },

        nextPage: function () {
            location.href = '#page5';
        },

        active3DChart: function () {
            var self = this;

            $.ajax({
                url: self.sampleDataUrl,
                dataType: "json",
                success: function (data) {
                    self.$el.find("#horizontalBar3d").featuredChart({
                        chartType: "horizontalBar3d",
                        format: '.2f',
                        data: data,
                        beforeRender: function (target, options, chart) {
                            console.log(chart);
                            return chart;
                        }
                    });
                }
            });
        }
    });
});
