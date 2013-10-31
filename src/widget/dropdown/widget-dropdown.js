;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Dropdown = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    return Backbone && Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.dropdown(methodName);
            } else {
                if (!this.$el.data('toggle')) this.$el.attr('data-toggle', 'dropdown');
                this.$el.dropdown(this.options);
                return this;
            }
            return this;
        }
    });
}));