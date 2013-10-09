define([
    "expect",
    "jquery",
    "widget-chart",
    "template!test/test-coverage/templates/chart",
    "logging"
], function (expect, $, Chart, Template, Logging) {
    $("body").append(Template());

    describe("widget-chart", function () {
        var barChart, lineChart, pieChart, horizontalBarChart, linePlusBarChart, bar3dChart, horizontal3dBarChart, lineFocusChart;
        describe("barChart", function () {
            it("barChart가 보여질 때 shown 이벤트가 발생하여야 한다.", function (done) {
                var Model = Backbone.Model.extend({
                    url: "base/test/test-coverage/data/sample-bar.json"
                });

                barChart = new Chart({
                    el: "div.barChart",
                    chartOptions: {
                        chartType: "bar"
                    },
                    model: new Model
                });

                barChart.$el.on("shown.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("barChart shown.cs.chart", e);
                    done();
                });
                barChart.model.fetch();
                expect(barChart).to.be.an.instanceof(Backbone.View);
            });

            it("각각의 바에 에니메이션이 끝날때 마다 animationEnd가 발생하고 모두 완료된 후 complete 이벤트가 발생되어야 한다.", function (done) {
                barChart.$el.on("animationEnd.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("barChart animationEnd.cs.chart", e);
                });
                barChart.$el.on("complete.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("barChart complete.cs.chart", e);
                    done();
                });
            });
        });

        describe("horizontalBarChart", function () {
            this.timeout(1000);
            it("horizontalBarChart가 보여질 때 shown, complete 이벤트가 발생하여야 한다.", function (done) {
                var Model = Backbone.Model.extend({
                    url: "base/test/test-coverage/data/sample-bar.json"
                });

                horizontalBarChart = new Chart({
                    el: "div.horizontalBarChart",
                    chartOptions: {
                        chartType: "horizontalBar"
                    },
                    model: new Model
                });

                horizontalBarChart.$el.on("shown.cs.chart",function (e) {
                    e.stopPropagation();
                    Logging.info("horizontalBarChart shown.cs.chart", e);
                }).on("complete.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("horizontalBarChart complete.cs.chart", e);
                    done();
                });
                horizontalBarChart.model.fetch();
                expect(horizontalBarChart).to.be.an.instanceof(Backbone.View);
            });
        });

        describe("linePlusBarChart", function () {
            this.timeout(1000);
            it("linePlusBarChart가 보여질 때 shown, complete 이벤트가 발생하여야 한다.", function (done) {
                var Model = Backbone.Model.extend({
                    url: "base/test/test-coverage/data/sample-line1.json"
                });

                linePlusBarChart = new Chart({
                    el: "div.linePlusBarChart",
                    chartOptions: {
                        chartType: "linePlusBar",
                        format: ".2f"
                    },
                    model: new Model
                });

                linePlusBarChart.$el.on("shown.cs.chart",function (e) {
                    e.stopPropagation();
                    Logging.info("linePlusBarChart shown.cs.chart", e);
                }).on("complete.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("linePlusBarChart complete.cs.chart", e);
                    done();
                });
                linePlusBarChart.model.fetch();
                expect(linePlusBarChart).to.be.an.instanceof(Backbone.View);
            });
        });

        describe("lineChart", function () {
            this.timeout(1000);
            it("lineChart가 보여질 때 shown, complete 이벤트가 발생하여야 한다.", function (done) {
                var Model = Backbone.Model.extend({
                    url: "base/test/test-coverage/data/sample-line.json"
                });

                lineChart = new Chart({
                    el: "div.lineChart",
                    chartOptions: {
                        chartType: "line"
                    },
                    model: new Model
                });

                lineChart.$el.on("shown.cs.chart",function (e) {
                    e.stopPropagation();
                    Logging.info("lineChart shown.cs.chart", e);
                }).on("complete.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("lineChart complete.cs.chart", e);
                    done();
                });
                lineChart.model.fetch();
                expect(lineChart).to.be.an.instanceof(Backbone.View);
            });
        });

        describe("pieChart", function () {
            this.timeout(1000);
            it("pieChart가 보여질 때 shown, complete 이벤트가 발생하여야 한다.", function (done) {
                var Model = Backbone.Model.extend({
                    url: "base/test/test-coverage/data/sample-pie.json"
                });

                pieChart = new Chart({
                    el: "div.pieChart",
                    chartOptions: {
                        chartType: "pie"
                    },
                    model: new Model
                });

                pieChart.$el.on("shown.cs.chart",function (e) {
                    e.stopPropagation();
                    Logging.info("pieChart shown.cs.chart", e);
                }).on("complete.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("pieChart complete.cs.chart", e);
                    done();
                });
                pieChart.model.fetch();
                expect(pieChart).to.be.an.instanceof(Backbone.View);
            });
        });

        describe("bar3dChart", function () {
            this.timeout(2000);
            it("bar3dChart가 보여질 때 shown, complete 이벤트가 발생하여야 한다.", function (done) {
                var Model = Backbone.Model.extend({
                    url: "base/test/test-coverage/data/sample-bar.json"
                });

                bar3dChart = new Chart({
                    el: "div.bar3dChart",
                    chartOptions: {
                        chartType: "bar3d",
                        format: ".2f"
                    },
                    model: new Model
                });

                bar3dChart.$el.on("shown.cs.chart",function (e) {
                    e.stopPropagation();
                    Logging.info("bar3dChart shown.cs.chart", e);
                }).on("complete.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("bar3dChart complete.cs.chart", e);
                    done();
                });
                bar3dChart.model.fetch();
                expect(bar3dChart).to.be.an.instanceof(Backbone.View);
            });
        });

        describe("horizontal3dBarChart", function () {
            this.timeout(2000);
            it("horizontal3dBarChart가 보여질 때 shown, complete 이벤트가 발생하여야 한다.", function (done) {
                var Model = Backbone.Model.extend({
                    url: "base/test/test-coverage/data/sample-bar.json"
                });

                horizontal3dBarChart = new Chart({
                    el: "div.horizontal3dBarChart",
                    chartOptions: {
                        chartType: "horizontalBar3d",
                        format: ".2f"
                    },
                    model: new Model
                });

                horizontal3dBarChart.$el.on("shown.cs.chart",function (e) {
                    e.stopPropagation();
                    Logging.info("horizontal3dBarChart shown.cs.chart", e);
                }).on("complete.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("horizontal3dBarChart complete.cs.chart", e);
                    done();
                });
                horizontal3dBarChart.model.fetch();
                expect(horizontal3dBarChart).to.be.an.instanceof(Backbone.View);
            });
        });

        describe("lineFocusChart", function () {
            it("lineFocusChart가 보여질 때 shown, complete 이벤트가 발생하여야 한다.", function (done) {
                var Model = Backbone.Model.extend({
                    url: "base/test/test-coverage/data/sample-line.json"
                });

                lineFocusChart = new Chart({
                    el: "div.lineFocusChart",
                    chartOptions: {
                        chartType: "lineFocus",
                        format: ".2f"
                    },
                    model: new Model
                });

                lineFocusChart.$el.on("shown.cs.chart",function (e) {
                    e.stopPropagation();
                    Logging.info("lineFocusChart shown.cs.chart", e);
                }).on("complete.cs.chart", function (e) {
                    e.stopPropagation();
                    Logging.info("lineFocusChart complete.cs.chart", e);
                    done();
                });

                lineFocusChart.model.fetch();
                expect(lineFocusChart).to.be.an.instanceof(Backbone.View);
            });
        });
    });
});