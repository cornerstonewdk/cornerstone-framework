/**
 * Created with JetBrains WebStorm.
 * User: azamara
 * Date: 12. 10. 24.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
define([
    "backbone",
    "template!tmpl/layout/footerView"
], function (Backbone, Template) {
    return Backbone.View.extend({
        el:"footer",

        initialize:function () {

        },

        render: function() {
            this.$el.html(Template);
        },

        fixBodyHeight: function() {
        }
    });
});