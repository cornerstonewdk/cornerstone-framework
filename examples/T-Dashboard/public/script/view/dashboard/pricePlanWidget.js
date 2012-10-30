define(
	[
		'jquery', 
		'backbone', 
		'util/dummyDataUtil', 
		'template!../../../template/dashboard/pricePlanWidget',
		'template!../../../template/dashboard/pricePlanCell',
		'widget-scrollview'
	], function(
		$, 
		Backbone, 
		DummyDataUtil, 
		template,
		cellTemplate
	){
	var PricePlanWidget = Backbone.View.extend({
		el : '#planWidget',
		
		pricePlanList: null,
		
		initialize: function() {
			this.pricePlanList = DummyDataUtil.getPricePlan();
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			
			this.drawList(this.pricePlanList);
		},
		
		drawList: function(data) {
			var ulTag = $('#planlist');
			
			for(var id in data) {
				var planData = data[id];
				ulTag.append(cellTemplate(planData));
			}
			
			$('div[data-featured="scrollView2"]').featuredScrollView();
		},
		
	});
	
	return PricePlanWidget;
});