define([
    'backbone',
    'template!view/page1',
    'widget-chart',
    'style!view/page1'
], function (Backbone, template, Chart) {

    return Backbone.View.extend({

        el: 'section#page1',

        render: function () {
            this.$el.html(template());
            window.activeDataApi();
            return this;
        },

        events: {
            'click button.next': 'nextPage',
            'click #control-chart .js-submit': 'controlSubmit',
            'click .js-change-data': 'changeData'
        },

        nextPage: function () {
            location.href = '#page2';
        },

        controlSubmit: function(e) {
            e.preventDefault();
            var $target = $(e.target);
            var $form = $target.closest("form");
            var options = $form.serializeArray();
            console.log(options);
        },

        changeData: function(e) {
            e.preventDefault();
            console.log(e);
        }
    });
});
