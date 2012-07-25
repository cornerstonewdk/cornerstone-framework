define(['backbone', 'handlebars'], function (Backbone) {
    return Backbone.View.extend({
        el:"#hover-test-section",
        template:Handlebars.compile($('#hover-test-template').html()),
        events:{

        },
        initialize:function () {

        },
        prepareActions:function () {
            var self = this;
            window.addEventListener('touchstart', function(e){
                this.timeStart = e.timeStamp;
            }, false);

            window.addEventListener('click', function(e){
                var time = 'Delay: ' + (e.timeStamp-this.timeStart) + 'ms';
                $(".result", self.$el).html(time);
            }, false);
        },
        render:function () {
            this.prepareActions();
            console.log('start hoverTestView');
            this.$el.html( this.template() );
            for(var i = 0; i < 10; i++) {
                this.$el.append($('form', this.template()));
                console.log($('form', this.template()));
            }

            for(var i = 0; i < 10; i++) {
                this.$el.append($('form', this.template()));
            }

            console.log(this.$el);
            return this;
        }
    });
});
