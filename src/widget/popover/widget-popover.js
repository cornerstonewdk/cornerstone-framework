;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Popover = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    var Popover = $.fn.popover.Constructor;

    /* 확장 코딩 */
    $.fn.popover.Constructor = Popover;

    /*
     DATA API 기능 추가 예정
     */
    $(function () {
        $('[data-toggle=popover]').each(function () {
            $(this).popover();
        });
    });

    return Backbone ? Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.popover(methodName);
            } else {
                this.$el.popover(this.options);
            }
            return this;
        }
    }) : Popover;
}));