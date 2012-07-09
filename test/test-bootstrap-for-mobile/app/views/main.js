define(['backbone', 'handlebars'], function (Backbone) {
    return Backbone.View.extend({
        el:"#main-section",
        template:Handlebars.compile($('#main-template').html()),
        events:{

        },
        initialize:function () {

        },
        prepareActions:function () {

        },
        render:function () {
            console.log('start mainView');
            this.$el.html(this.template());
            return this;
        }
    });
});
