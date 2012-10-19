define(
	[
		'jquery', 
		'backbone', 
		'template!/template/dashboard/vocSatisfactionWidget',
		'style!/style/dashboard/vocSatisfactionWidgetStyle',
	], function(
		$, 
		Backbone, 
		template
	){
	var YoutubeWiget = Backbone.View.extend({
		el : '#youtubeWedget',
		
		vocSatisfactionInfo: {
			'vocCnt': 35678,
			'vocSatisfaction': 90,
		},
		
		
		initialize: function() {
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template(this.vocSatisfactionInfo));
		},
		
		//랜덤 숫자 생성
		randomNumber: function(n1, n2) {
			return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
		},
		
	});
	
	return YoutubeWiget;
});