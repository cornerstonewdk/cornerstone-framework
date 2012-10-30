define([
		'jquery', 
		'backbone', 
		'util/dummyDataUtil', 
		'template!../../../template/pricePlan/pricePlan', 
		'style!../../../style/pricePlan/pricePlanStyle'
], function(
		$, 
		Backbone, 
		DummyDataUtil, 
		template
){
	var PricePolicyView = Backbone.View.extend({
		el : 'div#contentsView',
		
		pricePlanList: null,
		
		selectedPricePlan: null,
		
		initialize: function() {
			
		},
		
		//이벤트 정의
		events: {
			'click button#makePricePlan': 'onClickedMakePricePlan',
			'click a[data-plan]': 'planSelect'
		},
		
		planSelect: function(e) {
			this.planSelectProc($(e.target));
		},
		
		planSelectProc: function($selectedObj) {
			var pricePlanId = $selectedObj.attr('data-plan');
			this.selectedPricePlan = pricePlanId;
			
			$('ul#pricePlanList > li').removeClass('active');
			$selectedObj.parent().addClass('active');
			
			var data = this.pricePlanList[this.selectedPricePlan];
			document.location = '#makePricePlan/' + encodeURIComponent(JSON.stringify(data));
		},
		
		onClickedMakePricePlan: function(e) {
			document.location = '#makePricePlan/new';
		},
		
		render: function() {
			$(this.el).html(template());
			
			var pricePlanList = DummyDataUtil.getPricePlan();
			this.pricePlanList = pricePlanList;
			
			for(var pricePlanId in pricePlanList) {
				var pricePlan = pricePlanList[pricePlanId];
				$('ul#pricePlanList').append('<li><a data-plan="' + pricePlan['pricePlanId'] + '">' + pricePlan['pricePlanName'] + '</a></li>');
			}
			
			var $firstObj = $('ul#pricePlanList > li:nth-child(1) > a[data-plan]');
			
			if($firstObj.length == 0) return;
			// this.planSelectProc($firstObj);
		},
		
	});
	
	return new PricePolicyView;
});