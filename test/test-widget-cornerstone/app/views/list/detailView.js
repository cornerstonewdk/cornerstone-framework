/**
 * Created with JetBrains WebStorm.
 * User: azamara
 * Date: 12. 10. 24.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
define([
    "backbone",
    "template!tmpl/list/detailView"
],function (Backbone, Template) {
    return Backbone.View.extend({
        events: "",
        el: "div.new-page",
        template: null,
        headerView: null,
        footerView: null,
        initialize: function() {

        },

        render: function() {
            this.$el.html(Template);
            var ItemList = Backbone.Collection.extend({
                model: Backbone.Model.extend(),
                url:"data/sample-list.json"
            });
            // 렌더링
            this.$el.html(Template(this.model.toJSON()));
            return this;
        }
    });
});