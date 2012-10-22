define([
		'jquery', 
		'backbone', 
		'template!/template/policy/pricePolicy', 
		'view/pricePolicy/gesture-area', 
		'style!/style/pricePolicy/pricePolicyStyle'
], function(
		$, 
		Backbone, 
		template, 
		GestureAreaView
){
	var PricePolicyView = Backbone.View.extend({
		el : 'div#contentsView',
		
		initialize: function() {
			
		},
		
		//이벤트 정의
		events: {
			'click div#pricePolicy a[data-plan]': 'planSelect',
		},
		
		planSelect: function(e) {
			alert(e);
		},
		
		render: function() {
			$(this.el).html(template());
			
			new GestureAreaView();
		},
		
	});
	
	return new PricePolicyView;
});