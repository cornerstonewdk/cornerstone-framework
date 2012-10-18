define([
		'gesture-view',
		'jquery', 
		'backbone', 
		'template!/template/facebook/facebook'
], function(
		GestureView,
		$, 
		Backbone, 
		template
){
	var FacebookView = Backbone.View.extend({
		el : $('#contentsView'),
		
		initialize: function() {
			
		},
		
		render: function() {
			this.$el.html(template());
			
			$('.nav:not(.nav-list) > li').removeClass('active');
			$('#facebook_menu').addClass('active');
		},
		
	});
	
	return new FacebookView;
});