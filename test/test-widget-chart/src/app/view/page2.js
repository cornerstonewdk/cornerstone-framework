define([
	"backbone",
	"template!view/page2",
	"widget-chart"
], function (Backbone, template, Chart) {

	return Backbone.View.extend({

		el: "section#page2",
		sampleDataUrl: "data/sample-line.json",
		chartOptions: {
			chartType: "linePlusBar",
			showControls: true,
			showLegend: true,
			tooltips: true
		},

		render: function () {
			var self = this;
			self.$el.html(template());

			this.activeChartPlugin();

			return this;
		},

		events: {
			"click button.prev": "prevPage",
			"click button.next": "nextPage",
            "change #type": "changeType",
			"click #controlSubmit": "controlSubmit",
			"click #changeData button": "changeData"
		},

		prevPage: function () {
			location.href = "#page1";
		},

		nextPage: function () {
			location.href = "#page3";
		},

		changeType: function (e) {
			var type = this.$el.find("#type").val();
			this[type]();

			e.preventDefault();
			e.stopPropagation();
		},

		controlSubmit: function (e) {
			e.preventDefault();
			var $form = this.$el.find("form");
			var options = $form.serializeArray();

			if (options.length) {
				var type = $form.find("#type").val();
				var xAxisName = $form.find("#xAxisName").val();
				var yAxisName = $form.find("#yAxisName").val();
				var y2AxisName = $form.find("#y2AxisName").val();
				var useControl = $form.find("#useControl").val();
				var useLegend = $form.find("#useLegend").val();
				var useTooltip = $form.find("#useTooltip").val();

				this.chartOptions.xAxisLabel = xAxisName;
				this.chartOptions.yAxisLabel = yAxisName;
				this.chartOptions.y2AxisLabel = y2AxisName;

				this.chartOptions.showControls = parseInt(useControl) ? true : false;
				this.chartOptions.showLegend = parseInt(useLegend) ? true : false;
				this.chartOptions.tooltips = parseInt(useTooltip) ? true : false;

				this[type]();
			}

			e.preventDefault();
			e.stopPropagation();
		},

		changeData: function (e) {
			var $target = $(e.target);
			var type = this.$el.find("#type").val();
			var chartUrl = $target.data("chartUrl");

			this.sampleDataUrl = chartUrl;
			if ("activeChartView" === type) {
				type = type.replace("active", "update");
			}
			this[type]();
			e.preventDefault();
			e.stopPropagation();
		},

		// Plugin 방식
		activeChartPlugin: function () {
			var self = this;
			$.ajax({
				url: self.sampleDataUrl,
				dataType: "json",
				success: function (data) {
					this.serverData = data;
				},
				complete: function () {
					self.chartOptions.data = this.serverData;
					self.$el.find("#linePlusBar1").featuredChart(self.chartOptions);
				}
			});
		},

		// Backbone View 방식
		activeChartView: function () {
			// Backbone View 방식 적용
			var Model = Backbone.Model.extend({
				url: this.sampleDataUrl
			});

			this.chartModel = new Model();

			this.chart = new Chart({
				el: "#linePlusBar1",
				model: this.chartModel,
				chartOptions: this.chartOptions
			});

			this.chartModel.clear();
			this.chartModel.fetch();
		},
		updateChartView: function () {
			this.chartModel.url = this.sampleDataUrl;
			this.chartModel.clear();
			this.chartModel.fetch();
		}
	});
});
