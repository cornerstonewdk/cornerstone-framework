define(['backbone', 'handlebars'], function (Backbone) {
    return Backbone.View.extend({
        el:"#hover-test-section",
        template:Handlebars.compile($('#hover-test-template').html()),
        events:{

        },
        initialize:function () {

        },
        prepareActions:function () {

        },
        render:function () {
            console.log('start hoverTestView');
            this.$el.html( this.template() );
            for(var i = 0; i < 20; i++) {
                this.$el.append('<table class="table table-bordered table-striped">' + $("table", this.$el).html() + '</table>');
            }
            return this;
        }
    });
});
