define(
	[
		'jquery', 
		'backbone', 
		'template!/template/dashboard/twitterWidget',
		'template!/template/dashboard/twitterTimeline',
		'widget-scrollview',
		'style!/style/dashboard/twitterWidgetStyle',
		'jsonp'
	], function(
		$, 
		Backbone, 
		template,
		timelineTemplate
	){
	var DashboardView = Backbone.View.extend({
		el : '#twitterWedget',
		
		initialize: function() {
			
		},
		
		render: function() {
			var self = this;
			
			this.$el.html(template());
			
			Jsonp.get({
				url: 'http://search.twitter.com/search.json',
				data: {
					q: 'SKtelecom'
				},
				success: function(data) {
					self.drawList(data.results);
				},
				error: function() {
					alert('오류가 발생하였습니다.');
				},
				callback: 'jsonFlickrFeed',
				timeout: 5000
			});
		},
		
		drawList: function(data) {
			var ulTag = $('#thelist');
			
			for(var i = 0; i < data.length; i++) {
				ulTag.append(timelineTemplate(data[i]));
			}
			
			$('div[data-featured="scrollView"]').featuredScrollView();
		},
		
	});
	
	return DashboardView;
});