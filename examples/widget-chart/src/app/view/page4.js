define([
	"backbone",
	"widget-chart",
	"template!view/page4"
], function (Backbone, Chart, template) {

	return Backbone.View.extend({

		el: "section#page4",
		sampleDataUrl: "data/sample-bar2.json",
		chartOptions: {
			chartType: "horizontalBar3d",
			showLegend: true
		},

		render: function () {
			this.$el.html(template());
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
			location.href = "#page3";
		},

		nextPage: function () {
			location.href = "#page5";
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
				var useLegend = $form.find("#useLegend").val();

				this.chartOptions.showLegend = parseInt(useLegend) ? true : false;

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
			console.log(this.sampleDataUrl);
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
					self.$el.find("#horizontalBar3d").featuredChart(self.chartOptions);
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
				el: "#horizontalBar3d",
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
