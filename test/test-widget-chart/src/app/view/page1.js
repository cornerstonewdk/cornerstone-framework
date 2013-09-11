define([
	"backbone",
	"template!view/page1",
	"widget-chart"
], function (Backbone, template, Chart) {

	return Backbone.View.extend({

		el: "section#page1",
		sampleDataUrl: "data/sample-bar.json",
		chartOptions: {
			chartType: "horizontalBar",
			showControls: true,
			showLegend: true,
			tooltips: true,
			controlsData: {
				active: "grouped",
				groupedName: "그룹",
				stackedName: "스택"
			}
		},

		render: function () {
			this.$el.html(template());

			this.activeChartPlugin();
			window.Cornerstone.widget.activeDataApi();

			return this;
		},

		events: {
			"click button.next": "nextPage",
			"change #type": "changeType",
			"click #controlSubmit": "controlSubmit",
			"click #changeData button": "changeData"
		},

		nextPage: function () {
			location.href = "#page2";
		},

		changeType: function(e) {
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
				var controlGrouped = $form.find("#controlGrouped").val();
				var controlStacked = $form.find("#controlStacked").val();
				var xAxisName = $form.find("#xAxisName").val();
				var yAxisName = $form.find("#yAxisName").val();
				var useControl = $form.find("#useControl").val();
				var useLegend = $form.find("#useLegend").val();
				var useTooltip = $form.find("#useTooltip").val();

				this.chartOptions.controlsData.groupedName = controlGrouped;
				this.chartOptions.controlsData.stackedName = controlStacked;

				this.chartOptions.xAxisLabel = xAxisName;
				this.chartOptions.yAxisLabel = yAxisName;

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
				complete: function() {
					self.chartOptions.data = this.serverData;
					self.$el.find("#horizontalBar").featuredChart(self.chartOptions);
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
				el: "#horizontalBar",
				model: this.chartModel,
				chartOptions: this.chartOptions
			});

			this.chartModel.clear();
			this.chartModel.fetch();
		},
		updateChartView: function() {
			this.chartModel.url = this.sampleDataUrl;
			this.chartModel.clear();
			this.chartModel.fetch();
		}
	});
});