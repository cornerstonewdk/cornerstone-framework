/**
 * Created with JetBrains WebStorm.
 * User: azamara
 * Date: 12. 10. 24.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
define([
    "backbone",
    "widget-datatable",
    "template!tmpl/datatables/indexView",
    "style!css/datatable"
], function (Backbone, DataTableView, Template) {
    return Backbone.View.extend({
        events: {
        },

        el:"div.new-page",
        template:null,
        headerView:null,
        footerView:null,


        initialize:function () {

        },

        updateData:function (view, url) {
            view.model.url = url;
            view.render();
        },


        render:function () {
            var self = this;

            // 렌더링
            this.$el.html(Template);

            var Model = Backbone.Model.extend({
                url:"data/sample-datatable.json"
            });

            this.dataTableView = new DataTableView({
                el:"#datatable",
                model:new Model
            });

            this.dataTableView.render();

            this.$el.find("#control-btn button").click(function(e) {
                self.updateData(self.dataTableView, $(this).data("optionsUrl"));
            });

            return this;
        }
    });
});