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
			
			$(this.el).html(template());
			
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
				var timeline = data[i];
				
				timeline['created_at'] = this.timeAgoInWords(timeline['created_at']);
				
				ulTag.append(timelineTemplate(timeline));
			}
			
			$('div[data-featured="scrollView"]').featuredScrollView();
		},
		
		timeAgoInWords: function(date) {
			try {
		        var now = Math.ceil(Number(new Date()) / 1000),
		            dateTime = Math.ceil(Number(new Date(date)) / 1000),
		            diff = now - dateTime,
		            str;
		
		        if (diff < 60) {
		            return String(diff) + ' 초 전';
		        } else if (diff < 3600) {
		            str = String(Math.ceil(diff / (60)));
		            return str + (str == "1" ? ' 분' : ' 분') + ' 전';
		        } else if (diff < 86400) {
		            str = String(Math.ceil(diff / (3600)));
		            return str + (str == "1" ? ' 시간' : ' 시간') + ' 전';
		        } else if (diff < 60 * 60 * 24 * 365) {
		            str = String(Math.ceil(diff / (60 * 60 * 24)));
		            return str + (str == "1" ? ' 일' : ' 일') + ' 전';
		        } else {
		            return Ext.Date.format(new Date(date), 'jS M \'y');
		        }
		    } catch (e) {
		        return '';
		    }
		},
		
	});
	
	return DashboardView;
});