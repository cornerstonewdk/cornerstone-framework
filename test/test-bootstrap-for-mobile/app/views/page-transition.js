define(['backbone', 'handlebars'], function (Backbone) {
    return Backbone.View.extend({
        el:"#page-transition-section",
        template:Handlebars.compile($('#page-transition-template').html()),
        events:{

        },
        initialize:function () {

        },
        prepareActions:function () {

        },
        render:function () {
            console.log('start pageTransitionView');
            this.$el.html(this.template());
            return this;
        }
    });
});
