;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === "function" && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Scrollspy = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    return Backbone && Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.scrollspy(methodName);
            } else {
                this.$el.scrollspy(this.options);
            }
            return this;
        }
    });
}));