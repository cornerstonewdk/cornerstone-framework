define(
	[
		'jquery', 
		'backbone', 
		'template!../../../template/dashboard/youtubeWidget',
		'style!../../../style/dashboard/youtubeWidgetStyle',
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
			
			$('#youtubeWedget').parent().spinner('hide');
		}
		
	});
	
	return YoutubeWiget;
});