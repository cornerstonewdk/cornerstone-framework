/**
 * Created with JetBrains WebStorm.
 * User: azamara
 * Date: 12. 10. 24.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
define([
    "backbone",
    "template!tmpl/list/itemView"
],function (Backbone, Template) {
    return Backbone.View.extend({
        tagName:  'div',
        headerView: null,
        footerView: null,
        data:null,
        initialize: function() {

        },

        render: function() {
            this.$el.html( Template(this.model.toJSON()) );
            return this;
        }
    });
});