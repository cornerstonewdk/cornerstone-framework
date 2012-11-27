define(['backbone', 'handlebars'], function (Backbone) {
    return Backbone.View.extend({
        el:"#option-section",
        template:Handlebars.compile($('#option-template').html()),
        events:{

        },
        initialize:function () {

        },
        prepareActions:function () {

        },
        render:function () {
            console.log('start optionView');
            this.$el.html(this.template());
            return this;
        }
    });
});
