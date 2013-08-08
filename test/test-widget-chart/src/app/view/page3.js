define([ 'backbone', 'template!view/page3' ], function (Backbone, template) {

    return Backbone.View.extend({

        el: 'section#page3',

        render: function () {
            var self = this;
            this.$el.html(template());
            window.activeDataApi(self.$el);
            return this;
        },

        events: {
            'click button.prev': 'prevPage',
            'click button.next': 'nextPage'
        },

        prevPage: function () {
            location.href = '#page2';
        },

        nextPage: function () {
            location.href = '#page4';
        }
    });
});
