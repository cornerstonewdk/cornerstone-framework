define(['backbone', 'handlebars'], function (Backbone) {
    return Backbone.View.extend({
        el:"#page-transition-section",
        template:Handlebars.compile($('#page-transition-chlid-template').html()),
        events:{

        },
        initialize:function () {

        },
        prepareActions:function () {

        },
        render:function (type) {
            this.el = "#page-transition-" + type + "-section";
            $(this.el).html(this.template());
            return this;
        }
    });
});
