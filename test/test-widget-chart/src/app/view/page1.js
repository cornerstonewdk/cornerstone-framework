define([
    'backbone',
    'template!view/page1',
    'widget-chart',
    'style!view/page1'
], function (Backbone, template, Chart) {

    return Backbone.View.extend({

        el: 'section#page1',
        sampleDataUrl: "data/sample-bar.json",
        iChangeCount: 1,

        render: function () {
            this.$el.html(template());

            this.activeChartDataApi();
            this.activeChartPlugin();
            this.activeChartView();

            return this;
        },

        events: {
            'click button.next': 'nextPage',
            'click #control-chart .js-submit': 'controlSubmit',
            'click .js-change-data': 'changeData'
        },

        nextPage: function () {
            location.href = '#page2';
        },

        controlSubmit: function (e) {
            e.preventDefault();
            var $target = $(e.target);
            var $form = $target.closest("form");
            var options = $form.serializeArray();
            if(options.length) {
                if(options[0]) {
                    var $chart = this.$el.find(".widget-chart");
                    $chart.prop("class", "widget-chart");
                    $chart.addClass(options[0].value);
                }
            }
        },

        changeData: function (e) {
            e.preventDefault();
            var aSampleDataUrl = [
                "data/sample-bar.json",
                "data/sample-bar2.json",
                "data/sample-bar3.json"
            ];
            this.sampleDataUrl = aSampleDataUrl[this.iChangeCount % 3];
            this.updateChart();
            this.iChangeCount++;
        },

        updateChart: function () {
            this.activeChartDataApi();
            this.activeChartPlugin();
            this.activeChartView();
        },

        activeChartDataApi: function () {
            // Data-API 방식 적용
            window.Cornerstone.widget.activeDataApi();
        },

        activeChartPlugin: function () {
            var self = this;
            // jQuery Plugin 방식 적용
            $.ajax({
                url: self.sampleDataUrl,
                dataType: "json",
                success: function (data) {
                    self.$el.find("#horizontalBar1").featuredChart({
                        chartType: "horizontalBar",
                        data: data
                    });
                    self.$el.find("#bar1").featuredChart({
                        chartType: "bar",
                        data: data
                    });
                }
            });
        },

        activeChartView: function () {
            // Backbone View 방식 적용
            var Model = Backbone.Model.extend({
                url: this.sampleDataUrl
            });

            var barChart = new Chart({
                el: this.$el.find("#bar2"),
                chartType: "bar",
                model: new Model()
            });
            var horizontalBarChart = new Chart({
                el: this.$el.find("#horizontalBar2"),
                chartType: "horizontalBar",
                model: new Model()
            });

            barChart.render();
            horizontalBarChart.render();
        }
    });
});