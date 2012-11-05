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
		
		vocList: null,

		initialize: function() {
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			
			this.vocList = DummyDataUtil.makeRandomVocData(0, 5);
			this.redrawVocList(this.vocList);
			
			this.vocListUpdateTimer = setInterval(function() {
				self.updateVocList();
			}, 2000);
			
			$('div#vocWidget').parent().spinner('hide');
		},
		
		redrawVocList: function(list) {
			this.$el.find('#vocWidgetList').children().remove();
			
			for(i = 0; i < list.length; i++) {
				var vocData = list[i];
				this.$el.find('#vocWidgetList').append(cellTemplate(vocData));	
			}
		},
		
		updateVocList: function() {
			if($(this.el).length == 0) {
				clearInterval(this.vocInfoUpdateTimer);
				this.vocInfoUpdateTimer = null;
				return;
			}
			
			var tempVocList = DummyDataUtil.makeRandomVocData(0, 1);
			this.vocList.unshift(tempVocList[0]);
			this.vocList.pop();
			this.redrawVocList(this.vocList);
		},
		
	});
	
	return VocWidget;
});