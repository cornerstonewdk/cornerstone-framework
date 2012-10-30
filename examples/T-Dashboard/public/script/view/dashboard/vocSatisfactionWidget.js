define(
	[
		'jquery', 
		'backbone', 
		'util/dummyDataUtil', 
		'template!../../../template/dashboard/vocSatisfactionWidget',
		'style!../../../style/dashboard/vocSatisfactionWidgetStyle',
	], function(
		$, 
		Backbone, 
		DummyDataUtil, 
		template
	){
	var VocSatisfactionWidget = Backbone.View.extend({
		el : 'div#vocSatisfactionWidget',
		
		vocInfoUpdateTimer: null,
		
		vocSatisfactionInfo: {
			'vocCnt': 35678,
			'vocSatisfaction': 90,
		},
		
		
		initialize: function() {
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template(this.vocSatisfactionInfo));
			
			this.vocInfoUpdateTimer = setInterval(function() {
				self.updateVocSatisfactionInfo();
			}, 1000);
		},
		
		updateVocSatisfactionInfo: function() {
			if($(this.el).length == 0) {
				clearInterval(this.vocInfoUpdateTimer);
				this.vocInfoUpdateTimer = null;
				return;
			}
			
			this.vocSatisfactionInfo['vocCnt'] = this.vocSatisfactionInfo['vocCnt'] + DummyDataUtil.randomNumber(10, 30);
			this.vocSatisfactionInfo['vocSatisfaction'] = DummyDataUtil.randomNumber(85, 99);
			
			$(this.el).html(template(this.vocSatisfactionInfo));
		},
		
	});
	
	return VocSatisfactionWidget;
});