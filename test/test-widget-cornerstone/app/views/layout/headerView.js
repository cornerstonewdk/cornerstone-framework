/**
 * Created with JetBrains WebStorm.
 * User: azamara
 * Date: 12. 10. 24.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
define([
    "backbone",
    "template!tmpl/layout/headerView"
], function (Backbone, Template) {
    return Backbone.View.extend({
        el:"header",

        initialize:function () {

        },

        render:function () {
            this.$el.html(Template);

            return this;
        },

        headerMenuActivate: function() {
            var self = this;
            this.fragment = Backbone.history.fragment;

            this.$menus = this.$el.find("nav ul > li > a");

            this.$menus.parent().removeClass("active");
            this.$menus.each(function () {
                if(self.fragment !== "" && self.fragment === $(this).attr("href").replace("#", "")) {
                    $(this).parent().addClass("active");
                }
            });
        }
    });
});