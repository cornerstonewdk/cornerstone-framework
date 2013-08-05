define([
    'backbone',
    'template!view/page1',
    'widget-chart'
], function (Backbone, template, Chart) {

    return Backbone.View.extend({

        el: 'section#page1',

        render: function () {
            console.log(Chart);
            this.$el.html(template());
            return this;
        },

        events: {
            'click button.next': 'nextPage'
        },

        nextPage: function () {
            location.href = '#page2';
        }
    });
});
