;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === "function" && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Scrollspy = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    return Backbone && Backbone.View.extend({
        render: function() {
            this.$el.scrollspy(this.options);
            return this;
        }
    });
}));