define([
		'gesture-view',
		'jquery', 
		'backbone', 
		'template!/template/sns/sns'
], function(
		GestureView,
		$, 
		Backbone, 
		template
){
	var SnsView = Backbone.View.extend({
		el : $('#contentsView'),
		
		initialize: function() {
			
		},
		
		render: function() {
			this.$el.html(template());
			
			$('.nav:not(.nav-list) > li').removeClass('active');
			$('#sns_menu').addClass('active');
		},
		
	});
	
	return new SnsView;
});