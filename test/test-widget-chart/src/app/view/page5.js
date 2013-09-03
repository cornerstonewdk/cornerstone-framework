define([
    "backbone",
    "widget-chart",
    "template!view/page5",
    "widget-touch"
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

            $.ajax({
                url: self.sampleDataUrl,
                dataType: "json",
                success: function (data) {
                    self.$el.find("#lineFocus").featuredChart({
                        chartType: "lineFocus",
                        format: ".2f",
                        data: data
                    });
                }
            });
        }
    });
});
