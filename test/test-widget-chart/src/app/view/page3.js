define([
    'backbone',
    'widget-chart',
    'template!view/page3'
], function (Backbone, Chart, template) {

    return Backbone.View.extend({

        el: 'section#page3',
        sampleDataUrl: "data/sample-bar.json",

        render: function () {
            var self = this;
            require(['style!view/page3'], function () {
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
            location.href = '#page2';
        },

        nextPage: function () {
            location.href = '#page4';
        },

        active3DChart: function () {
            var self = this;

            $.ajax({
                url: self.sampleDataUrl,
                dataType: "json",
                success: function (data) {
                    self.$el.find("#bar3d").featuredChart({
                        chartType: "bar3d",
                        format: '.2f',
                        data: data,
                        beforeRender: function(target, options, chart) {
                            console.log(chart);
                            return chart;
                        }
                    });
                    self.$el.find("#horizontalBar3d").featuredChart({
                        chartType: "horizontalBar3d",
                        format: '.2f',
                        data: data,
                        beforeRender: function(target, options, chart) {
                            console.log(chart);
                            return chart;
                        }
                    });



                }
            });
        }
    });
});
