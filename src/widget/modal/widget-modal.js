;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Modal = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    return Backbone && Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.modal(methodName);
            } else {
                this.$el.modal(this.options);
            }
            return this;
        }
    });
}));
