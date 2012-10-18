define([
		'gesture-view',
		'jquery', 
		'backbone', 
		'template!/template/youtube/youtube'
], function(
		GestureView,
		$, 
		Backbone, 
		template
){
	var YoutubeView = Backbone.View.extend({
		el : $('#contentsView'),
		
		initialize: function() {
			
		},
		
		render: function() {
			this.$el.html(template());
			
			$('.nav:not(.nav-list) > li').removeClass('active');
			$('#youtube_menu').addClass('active');
		},
		
	});
	
	return new YoutubeView;
});