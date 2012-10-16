define(['jquery', 'backbone', 'template!/template/pricePolicy', 'view/pricePolicy/gesture-area', 'style!/style/pricePolicy/pricePolicyStyle'], function($, Backbone, template, GestureAreaView){
	var PricePolicyView = Backbone.View.extend({
		el : $('#contentsView'),
		
		initialize: function() {
			
		},
		
		render: function() {
			this.$el.html(template());
			
			$('ul.nav > li').removeClass('active');
			$('#price_policy_menu').addClass('active');
			
			new GestureAreaView();
		},
		
	});
	
	return PricePolicyView;
});