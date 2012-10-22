define(
	[
		'jquery', 
		'backbone', 
		'template!/template/dashboard/youtubeWidget',
		'style!/style/dashboard/youtubeWidgetStyle',
		'jsonp',
		'widget-media'
	], function(
		$, 
		Backbone, 
		template
	){
	var YoutubeWiget = Backbone.View.extend({
		el : '#youtubeWedget',
		
		initialize: function() {
			
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			
			$('audio,video').featuredMedia({
				alwaysShowControls : true,
				success : function(player, node) {
					$('#' + node.id + '-mode').html('mode: ' + player.pluginType);
					$(".pluginType").text("(" + player.pluginType.toUpperCase() + ")");
				}
			}); 

			
			// Jsonp.get({
				// url: 'http://search.twitter.com/search.json',
				// data: {
					// q: 'SKtelecom'
				// },
				// success: function(data) {
					// self.drawList(data.results);
				// },
				// error: function() {
					// alert('오류가 발생하였습니다.');
				// },
				// callback: 'jsonFlickrFeed',
				// timeout: 5000
			// });
		},
		
	});
	
	return YoutubeWiget;
});