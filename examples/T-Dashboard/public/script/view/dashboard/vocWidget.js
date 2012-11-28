;define([
		'jquery', 
		'backbone',
		'util/dummyDataUtil',  
		'template!../../../template/dashboard/vocWidget',
		'template!../../../template/voc/vocListCell'
], function(
		$, 
		Backbone, 
		DummyDataUtil, 
		template,
		cellTemplate
){
	var VocWidget = Backbone.View.extend({
		el : 'div#vocWidget',
		
		vocListUpdateTimer: null,

		initialize: function() {
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			
			this.redrawVocList(DummyDataUtil.getNewlyVocData(5));
			
			//매 5초마다 업데이트 하여 실시간으로 데이터가 들어오는것처럼 한다.
			this.vocListUpdateTimer = setInterval(function() {
				self.updateVocList();
			}, 5000);

			//스피너 숨김
			$('div#vocWidget').parent().spinner('hide');
		},
		
		/*
		 * 최신 데이터를 상위에 올리려고 역순으로 출력한다.
		 */
		redrawVocList: function(list) {
			this.$el.find('#vocWidgetList').children().remove();
			
			for(i = list.length - 1; i >= 0; i--) {
				var vocData = list[i];
				this.$el.find('#vocWidgetList').append(cellTemplate(vocData));	
			}
		},
		
		/*
		 * 새로운 데이터를 생성하여 가져온다.
		 */
		updateVocList: function() {
			//이 화면이 없어졌을때 타이머가 계속 돌고 있으면 종료 시켜버린다.
			if($('div#vocWidget').length == 0) {
				clearInterval(this.vocInfoUpdateTimer);
				this.vocInfoUpdateTimer = null;
				return;
			}
			
			//새로운 랜덤데이터 추가
			DummyDataUtil.addRandomeVocData(DummyDataUtil.randomNumber(1, 3));
			
			//데이터를 새로 가져와서 표시해줌
			this.redrawVocList(DummyDataUtil.getNewlyVocData(5));
		},
		
	});
	
	return VocWidget;
});