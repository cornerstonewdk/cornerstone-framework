define(['backbone', 'handlebars'], function (Backbone) {
    return Backbone.View.extend({
        el:"#fastbutton-test-section",
        template:Handlebars.compile($('#fastbutton-test-template').html()),
        events:{

        },
        initialize:function () {

        },
        prepareActions:function () {

        },
        render:function () {
            console.log('start fastbuttonTestView');
            this.$el.html( this.template() );
            return this;
        }
    });
});
