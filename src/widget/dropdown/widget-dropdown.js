;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Dropdown = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    return Backbone.View.extend({
        render: function () {
            if (!this.$el.data('toggle')) this.$el.attr('data-toggle', 'dropdown');
            this.$el.dropdown(this.options);
            return this;
        }
    });
}));