;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === "function" && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Tooltip = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    var Tooltip = $.fn.tooltip.Constructor;

    /* 확장 코딩 */
    $.fn.tooltip.Constructor = Tooltip;

    /*
     DATA API 기능 추가 예정
     */
    $(function () {
        $('[data-toggle=tooltip]').each(function () {
            $(this).tooltip();
        });
    });

    return Backbone && Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.tooltip(methodName);
            } else {
                this.$el.tooltip(this.options);
            }
            return this;
        }
    });
}));