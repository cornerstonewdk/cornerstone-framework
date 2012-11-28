/**
 * Created with JetBrains WebStorm.
 * User: azamara
 * Date: 12. 10. 24.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
define([
    "backbone",
    "views/layout/headerView",
    "views/layout/footerView",
    "template!tmpl/layout/layoutView"
],function (Backbone, HeaderView, FooterView, Template) {
    return Backbone.View.extend({
        events: "",
        el: "#page",
        template: null,
        headerView: null,
        footerView: null,
        initialize: function() {

        },

        render: function() {
            // 레이아웃 렌더링
            this.$el.html(Template);

            // 헤더뷰 랜더링
            this.headerView = new HeaderView();
            this.headerView.render();

            // 푸터뷰 랜더링
            this.footerView = new FooterView();
            this.footerView.render();

            return this;
        }
    });
});