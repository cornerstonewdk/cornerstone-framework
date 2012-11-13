;define([
		'gesture-view',
		'jquery', 
		'backbone',
		'util/dummyDataUtil',  
		'template!../../../template/voc/voc',
		'template!../../../template/voc/vocListCell',
		'template!../../../template/voc/vocInfo', 
		'widget-scrollview', 
		'style!../../../style/voc/vocStyle'
], function(
		GestureView,
		$, 
		Backbone, 
		DummyDataUtil, 
		template,
		cellTemplate,
		vocInfoTemplate
){
	var VocView = Backbone.View.extend({
		el : 'div#contentsView',

		vocData: null,
		
		pageSize: 20,
		currentPage: 0,
		
		vocList: null,
		
		selectedVocId: null,
		
		initialize: function() {
			this.vocData = new Array;
		},
		
		events: {
			'click div#voc li[data-voclist]': 'onClickedVocList',
		},
		
		render: function() {
			$(this.el).html(template());
		},
		
		//이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
		viewDidAppear: function() {
			this.currentPage = 0;
			this.loadNextVocList();
		},
		
		loadNextVocList: function() {
			// var result = DummyDataUtil.makeRandomVocData((this.currentPage++) * this.pageSize, this.pageSize);
			this.currentPage++;
			var result = DummyDataUtil.getVocData();
			this.vocList = result;
			this.drawVocList(result);
		},
		
		drawVocList: function(list) {
			for(i = list.length - 1; i >= 0 ; i--) {
				var vocData = list[i];
				this.$el.find('#vocList').append(cellTemplate(vocData));	
			}
			
			this.$el.find('#vocScrollView').featuredScrollView('refresh');
			
			if(this.currentPage == 1 && this.selectedVocId == null) {
				this.$el.find('ul#vocList > li:first-child').addClass('active');
				this.loadVocDetailData(this.$el.find('ul#vocList > li:first-child').attr('data-voclist'));
			} else if(this.currentPage == 1 && this.selectedVocId != null) {
				this.$el.find('ul#vocList > li[data-voclist="' + this.selectedVocId + '"]').addClass('active');
				this.loadVocDetailData(this.selectedVocId);
			}
		},
		
		loadVocDetailData: function(vocId) {
			var selectVocData;
			
			for(var i = 0; i < this.vocList.length; i++) {
				if(this.vocList[i]['vocId'] == vocId) {
					selectVocData = this.vocList[i];
					break;
				} 
			}
			
			//사이드 메뉴 스크롤바 스크롤 영역 잡아주기
			this.$el.find('#vocData').html(vocInfoTemplate(selectVocData));
			
			var historyList = this.$el.find('#vocHistory');
			for(var i = 0; i < this.vocList.length; i++) {
				if(this.vocList[i]['customerId'] == selectVocData['customerId'] && this.vocList[i]['vocId'] != selectVocData['vocId']) {
					if (this.vocList[i]['customerSatisfaction'] === '만족') {
						historyList.append('<li>' + '<span class="label label-success">' + this.vocList[i]['customerSatisfaction'] + '</span>' + ' ' + this.vocList[i]['vocRequest'] + '</li>');
					} else {
						historyList.append('<li>' + '<span class="label label-warning">' + this.vocList[i]['customerSatisfaction'] + '</span>' + ' ' + this.vocList[i]['vocRequest'] + '</li>');
					}
				}
			}
		},
		
		onClickedVocList: function(event) {
			//자식 태그가 인식되었을시 상위 태그 찾기
			var selectedVocId;
			if(typeof($(event.target).attr('data-voclist')) == 'undefined') {
				selectedVocId = $(event.target).parents('li[data-voclist]').attr('data-voclist');
			} else {
				selectedVocId = $(event.target).attr('data-voclist');
			}
			
			$('li.active[data-voclist]').removeClass('active');
			$('li[data-voclist="' + selectedVocId + '"]').addClass('active');
			
			this.loadVocDetailData(selectedVocId);
		},
		
	});
	
	return new VocView;
});