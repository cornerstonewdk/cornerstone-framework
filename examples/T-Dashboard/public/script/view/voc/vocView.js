define([
		'gesture-view',
		'jquery', 
		'backbone', 
		'template!/template/voc/voc'
], function(
		GestureView,
		$, 
		Backbone, 
		template
){
	var VocView = Backbone.View.extend({
		el : $('#contentsView'),
		
		initialize: function() {
			
		},
		
		render: function() {
			this.$el.html(template());
			
			$('.nav:not(.nav-list) > li').removeClass('active');
			$('#voc_menu').addClass('active');
		},
		
	});
	
	return new VocView;
});