define(['backbone', 'handlebars', 'iscroll'], function (Backbone) {
    return Backbone.View.extend({
        el:"#scroll-view-section",
        template:Handlebars.compile($('#scroll-view-template').html()),
        events:{

        },
        initialize:function () {

        },
        prepareActions:function () {

        },
        render:function () {
            console.log('start scrollView');
            this.$el.html(this.template());

             console.log('end scrollView');
            return this;
        },
        afterRender:function () {
//            new iScroll('standard', { useTransition:true });

            $("#transition").css("height", $(window).height() - $("footer").height() * 2);

            new iScroll('transition', { useTransition:true,
                onBeforeScrollStart:function (e) {
                    var target = e.target;
                    while (target.nodeType != 1) target = target.parentNode;
                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'&& target.tagName != 'OPTION')
                        e.preventDefault();
                }});

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        }
    });
});
