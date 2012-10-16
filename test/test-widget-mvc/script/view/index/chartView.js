define(function (require) {
    var _ = require("underscore");
    var Backbone = require("backbone");
    var $ = require("jquery");

    return Backbone.View.extend({
        el:"#contentsView",

        initialize:function () {

        },

        render:function () {

            var self = this;
            $.getJSON("data/line.json", function (json) {
                Widget.chart(self.$el.find("#lineChart"), {
                    margin:[50, 50, 50, 50],
                    chartType:"line",
                    data:json,
                    color:["lightpink", "darkgray", "lightblue"]
                });
            });


            $.getJSON("data/bar.json", function (json) {
                Widget.chart(self.$el.find("#barChart"), {
                    data:json
                });
            });
        }
    });
});