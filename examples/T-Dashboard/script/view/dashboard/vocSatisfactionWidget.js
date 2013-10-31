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
			
			$('div#vocSatisfactionWidget').parent().spinner('hide');
		},
		
		/*
		 * 만족도를 실시간 업데이트 처럼 보이게 일정시간마다 정보 업데이트
		 */
		updateVocSatisfactionInfo: function() {
			if($('div#vocSatisfactionWidget').length == 0) {
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