define(function (require) {
    var _ = require("underscore");
    var Backbone = require("backbone");
    var $ = require("jquery");
    var template = require("template!../../tmpl/index");
    var ChartView = require("./index/chartView");
    var ListView = require("./index/listView");

    return Backbone.View.extend({
        el:"#contentsView",

        initialize:function () {

        },

        render:function () {
            // 인덱스페이지 템플릿을 랜더링한다.
            this.$el.html(template());

            // 차트와 리스트 뷰 객체를 생성한다.
            var chartView = new ChartView();
            var listView = new ListView();

            // 생성된 각 뷰들을 랜더링한다.
            chartView.render();
            listView.render();
        }
    });
});