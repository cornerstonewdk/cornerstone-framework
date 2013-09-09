define([
	'backbone',
	'template!view/page1',
	'widget-chart'
], function (Backbone, template, Chart) {

	return Backbone.View.extend({

		el: 'section#page1',
		sampleDataUrl: "data/sample-bar.json",
		chartOptions: {
			chartType: "horizontalBar",
			showControls: true,
			showLegend: true,
			tooltips: true,
			controlsData: {
				active: 'grouped',
				groupedName: '그룹',
				stackedName: '스택'
			}
		},

		render: function () {
			this.$el.html(template());

			this.activeChartPlugin();

			return this;
		},

		// Data-API 방식 적용
		activeChartDataApi: function () {
			window.Cornerstone.widget.activeDataApi();
		},

		// Plugin 방식
		activeChartPlugin: function () {
			var self = this;
			$.ajax({
				url: self.sampleDataUrl,
				dataType: "json",
				success: function (data) {
					self.chartOptions.data = data;
					self.$el.find("#horizontalBar").featuredChart(self.chartOptions);
				}
			});
		},

		// Backbone View 방식
		activeChartView: function () {
			var self = this;

			// Backbone View 방식 적용
			var Model = Backbone.Model.extend({
				url: this.sampleDataUrl
			});

			var horizontalBarChart = new Chart({
				el: "#horizontalBar",
				model: new Model(),
				chartOptionss: $.extend({}, self.chartOptions, {chartType: "horizontalBar"})
			});

			horizontalBarChart.render();
		},

		events: {
			'click button.next': 'nextPage',
			'click #controlSubmit': 'controlSubmit',
			'click .js-change-data': 'changeData'
		},

		nextPage: function () {
			location.href = '#page2';
		},

		controlSubmit: function (e) {
			e.preventDefault();
			var $form = this.$el.find("form");
			var options = $form.serializeArray();

			if (options.length) {
				var type = $form.find("#type").val();
				var controlGrouped = $form.find("#controlGrouped").val();
				var controlStacked = $form.find("#controlStacked").val();
				var xAxisName = $form.find("#xAxisName").val();
				var yAxisName = $form.find("#yAxisName").val();
				var useControl = $form.find("#useControl").val();
				var useLegend = $form.find("#useLegend").val();
				var useTooltip = $form.find("#useTooltip").val();
				var changeData = $form.find("#changeData").val();

				this.chartOptions.controlsData.groupedName = controlGrouped;
				this.chartOptions.controlsData.stackedName = controlStacked;

				this.chartOptions.xAxisLabel = xAxisName;
				this.chartOptions.yAxisLabel = yAxisName;

				this.chartOptions.showControls = parseInt(useControl) ? true : false;
				this.chartOptions.showLegend = parseInt(useLegend) ? true : false;
				this.chartOptions.tooltips = parseInt(useTooltip) ? true : false;

				if(this.sampleDataUrl === "data/" + changeData) {
					this[type]();
				} else {
					this.sampleDataUrl = "data/" + changeData;

				}
			}
		}
	});
});