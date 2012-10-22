;define([
		'jquery', 
		'backbone',
		'template!/template/dashboard/facebookFeedWidget'
], function(
		$, 
		Backbone, 
		template
){
	var FacebookFeedWidget = Backbone.View.extend({
		el : 'div#faceFeedWidget',

		initialize: function() {
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id))
					return;
				js = d.createElement(s);
				js.id = id;
				js.src = "//connect.facebook.net/ko_KR/all.js#xfbml=1&appId=180654228726611";
				fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk')
			); 
		
		},

	});
	
	return FacebookFeedWidget;
});