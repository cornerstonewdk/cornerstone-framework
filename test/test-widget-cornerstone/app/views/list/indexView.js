/**
 * Created with JetBrains WebStorm.
 * User: azamara
 * Date: 12. 10. 24.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
define([
    "jquery",
    "backbone",
    "template!tmpl/list/indexView",
    "widget-listview",
    "views/list/itemView",
    "style!css/list"
], function ($, Backbone, Template, ListView, ItemView) {
    return Backbone.View.extend({
        events:"",
        el:"div.new-page",
        template:null,
        headerView:null,
        footerView:null,
        initialize:function () {

        },

        render:function () {
            var self = this;
            this.$el.html(Template);

            var ItemList = Backbone.Collection.extend({
                model:Backbone.Model.extend(),
                url:"data/sample-list.json"
            });

            this.listView = new ListView({
                el:'#listView',
                collection:new ItemList(),
                itemView:ItemView,
                optimization:false,
                spinner:"#endless-loader",
                scrollEndAction: function() {
                    self.listView.render();
                }
            });

            this.listView.render();

            return this;
        }
    });
});