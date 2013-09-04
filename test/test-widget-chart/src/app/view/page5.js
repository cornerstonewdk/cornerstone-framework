define([
    "backbone",
    "widget-chart",
    "template!view/page5",
    "jquery.hammer"
], function (Backbone, Chart, template) {

    return Backbone.View.extend({

        el: "section#page5",
        sampleDataUrl: "data/sample-line.json",

        render: function () {
            var self = this;
            self.$el.html(template());
            self.activeChart();
            return this;
        },

        events: {
            "click button.prev": "prevPage",
            "click button.next": "nextPage"
        },

        prevPage: function () {
            location.href = "#page4";
        },

        nextPage: function () {
            location.href = "#page6";
        },

        activeChart: function () {
            var self = this;

            MBP.preventZoom();
            MBP.preventScrolling();
            $.ajax({
                url: self.sampleDataUrl,
                dataType: "json",
                success: function (data) {
                    self.$el.find("#lineFocus").featuredChart({
                        tooltips: false,
                        chartType: "lineFocus",
                        format: ".2f",
                        data: data
                    });

                    require([
                        "vendor/hammer.fakemultitouch",
                        "vendor/hammer.showtouches"
                    ], function() {
                        Hammer.plugins.fakeMultitouch();
                        Hammer.plugins.showTouches();
                    });
                }
            });
        }
    });
});
