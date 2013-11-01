define([ 'backbone', 'template!view/detail' ], function (Backbone, template) {

    return Backbone.View.extend({

        el: '#detail-content',

        initialize: function () {

        },

        render: function () {
            var self = this;

            // 상세페이지 랜더링
            this.$el.html(template({ model: this.model.toJSON() }));
            this.customMarkdown();

            return this;
        },

        customMarkdown: function () {
            var $docContent = this.$el.find('.doc-content');
            $docContent.find('table').addClass('table table-bordered table-hover table-striped')
            .wrap($('<div/>', {'class': 'table-responsive'}))
            .find('a').attr('target', '_blank');
        }
    });
});
