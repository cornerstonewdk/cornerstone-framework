/**
 * Created with JetBrains WebStorm.
 * User: azamara
 * Date: 12. 10. 24.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
define([
    "backbone",
    "dummyDataUtil",
    "widget-chart",
    "template!tmpl/chart/indexView",
    "style!css/chart"
], function (Backbone, DummyData, Chart, Template) {
    return Backbone.View.extend({
        events:"",
        el:"div.new-page",
        template:null,
        headerView:null,
        footerView:null,
        initialize:function () {
            this.chart = new Chart();
            this.dummyData = DummyData;
        },

        drawBarChart:function () {
            var Model = Backbone.Model.extend({
                url:"data/bar.json"
            });

            this.barChart = new Chart({
                el:"#chart1",
                chartType:"stackedBar",
                model:new Model
            });

            this.barChart.render();

            return this.barChart;
        },

        drawLineChart:function () {
            var Model = Backbone.Model.extend({
                url:"data/line.json"
            });

            this.lineChart = new Chart({
                el:"#chart2",
                chartType:"line",
                model:new Model()
            });

            this.lineChart.render();
            return this.lineChart;
        },

        drawPieChart:function () {
            var Model = Backbone.Model.extend({
                url:"data/pie.json"
            });

            this.pieChart = new Chart({
                el:"#chart3",
                chartType:"pie",
                model:new Model
            });

            this.pieChart.render();
            return this.pieChart;
        },

        updateChart:function (charts) {
            var self = this;
            console.log(charts);
            $(charts).each(function(i) {
                if (typeof charts[i].model.url !== "string") {

                } else if(charts[i].model.url.match(".*2.json")) {
                    charts[i].model.url = charts[i].model.url.replace("2.json", ".json");
                } else {
                    charts[i].model.url = charts[i].model.url.replace(".json", "2.json");
                }

                charts[i].render();
            });
        },

        render:function () {
            var self = this;
            // 렌더링
            this.$el.html(Template);

            var barChart = this.drawBarChart();
            var lineChart = this.drawLineChart();
            var pieChart = this.drawPieChart();

            this.$el.find("#control-btn button").click(function(e) {
                self.updateChart([barChart, lineChart, pieChart]);
            });

            return this;
        }
    });
});