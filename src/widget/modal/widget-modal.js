;
(function(root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(['backbone', 'underscore', 'jquery', 'bootstrap'], function(Backbone, _, $) {
            factory($, root, doc);
            return Backbone.View.extend({
                render: function() {
                    this.$el.modal(this.options);
                    return this;
                }
            });
        });
    } else {
        // None AMD
        factory(root.jQuery, root, doc);
    }
}(window, document, function($, window, document) {}));
