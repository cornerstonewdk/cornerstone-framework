define([
    'backbone',
    'template!view/page1',
    'widget-chart',
    'style!view/page1'
], function (Backbone, template, Chart) {

    return Backbone.View.extend({

        el: 'section#page1',
        sampleDataUrl: "data/sample-bar.json",
        sampleLineDataUrl: "data/sample-line.json",
        iChangeCount: 1,
        chartOption: {
            animate: false,
            showControls: true,
            showLegend: true,
            tooltips: true,
            controlData: {
                active: 'grouped',
                groupedName: '그룹',
                stackedName: '스택'
            }
        },

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
                if(options[1]) {
                    var $chart = this.$el.find(".widget-chart");
                    $chart.prop("class", "widget-chart");
                    $chart.addClass(options[1].value);
                }

                // Grouped 이름 옵션
                if(options[4]) {
                    this.chartOption.control.groupedName = options[4].value;
                }

                // Stacked 이름 옵션
                if(options[5]) {
                    this.chartOption.control.stackedName = options[5].value;
                }

                // Control 사용 여부
                if(options[0]) {
                    this.chartOption.showControls = parseInt(options[0].value) ? true : false;
                }

                // 범례 사용 여부
                if(options[6]) {
                    this.chartOption.showLegend = parseInt(options[6].value) ? true : false;
                }

                // 툴팁 사용 여부
                if(options[7]) {
                    this.chartOption.tooltips = parseInt(options[7].value) ? true : false;
                }

                $('#bar1, #bar2, #horizontalBar1, #horizontalBar2').html('');

                this.updateChart();
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

                    self.$el.find("#bar1").featuredChart({
                        chartType: "bar",
                        data: data
                    });

                    self.$el.find("#horizontalBar1").featuredChart({
                        chartType: "horizontalBar",
                        data: data
                    });
                }
            });
            $.ajax(self.sampleLineDataUrl, {
                dataType: "json",
                success: function (data) {
                    self.$el.find("#line1").featuredChart({
                        chartType: "line",
                        data: data
                    });
                }
            });
        },

        activeChartView: function () {
            var self = this;

            // Backbone View 방식 적용
            var Model = Backbone.Model.extend({
                url: this.sampleDataUrl
            });

            var barChart = new Chart({
                el: "#bar2",
                model: new Model(),
                chartOptions: $.extend({}, self.chartOption, {chartType: "bar"})
            });

            var horizontalBarChart = new Chart({
                el: "#horizontalBar2",
                model: new Model(),
                chartOptions: $.extend({}, self.chartOption, {chartType: "horizontalBar"})
            });

            barChart.render();
            horizontalBarChart.render();

            // Backbone View 방식 적용
            var LineModel = Backbone.Model.extend({
                url: this.sampleLineDataUrl
            });
            var lineChart = new Chart({
                el: "#line2",
                model: new LineModel(),
                chartOptions: $.extend({}, self.chartOption, {chartType: "line"})
            });
            lineChart.render();
        }
    });
});