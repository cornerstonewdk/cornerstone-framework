define([
		'jquery', 
		'backbone', 
		'util/dummyDataUtil', 
		'template!../../../template/pricePlan/pricePlan',
		'template!../../../template/pricePlan/pricePlanContent',  
		'style!../../../style/pricePlan/pricePlanStyle'
], function(
		$, 
		Backbone, 
		DummyDataUtil, 
		template,
		contentsTemplate
){
	var PricePolicyView = Backbone.View.extend({
		el : 'div#contentsView',
		
		pricePlanList: null,
		
		selectedPricePlan: null,
		
		initialize: function() {
			
		},
		
		//이벤트 정의
		events: {
			'click button#makePricePlan': 'onClickedMakePricePlan',
			'click a[data-plan]': 'planSelect',
			'click button#modifyButton': 'onClickedModifyButton',
		},
		
		planSelect: function(e) {
			this.planSelectProc($(e.target));
		},
		
		planSelectProc: function($selectedObj) {
			var pricePlanId = $selectedObj.attr('data-plan');
			this.selectedPricePlan = pricePlanId;
			
			$('ul#pricePlanList > li').removeClass('active');
			$selectedObj.parent().addClass('active');
			
			var data = this.pricePlanList[pricePlanId];
			
			$('#pricePlanContents').html(contentsTemplate(data));
			
			var customerTypeList =data['customertype'];
			for(var i = 0; i < customerTypeList.length; i++) {
				var ctype = customerTypeList[i];
				$('div[data-customertype="' + ctype['value'] + '"]').show();
			}
			
			var producTypeList = data['producttype'];
			for(var i = 0; i < producTypeList.length; i++) {
				var ptype = producTypeList[i];
				$('div[data-producttype="' + ptype['value'] + '"]').show();
				switch(ptype['value']) {
					case 'voice':
						$('div[data-producttype="' + ptype['value'] + '"] > p').html('(' + ptype['extraData'] + ' 분)');
						break;
					case 'data':
						$('div[data-producttype="' + ptype['value'] + '"] > p').html('(' + ptype['extraData'] + ' GB)');
						break;
					case 'message':
						$('div[data-producttype="' + ptype['value'] + '"] > p').html('(' + ptype['extraData'] + ' 건)');
						break;
					case 'roaming':
						$('div[data-producttype="' + ptype['value'] + '"] > p').html('(' + ptype['extraData'] + ' 분)');
						break;
				}
			}
			
			var commTypeList = data['commtype'];
			for(var i = 0; i < commTypeList.length; i++) {
				var ctype = commTypeList[i];
				$('div[data-commtype="' + ctype['value'] + '"]').show();
			}
			
			var discountTypeList = data['discounttype'];
			for(var i = 0; i < discountTypeList.length; i++) {
				var dtype = discountTypeList[i];
				$('div[data-discounttype="' + dtype['value'] + '"]').show();
			}
		},
		
		onClickedModifyButton: function(e) {
			var data = this.pricePlanList[this.selectedPricePlan];
			document.location = '#makePricePlan/' + encodeURIComponent(JSON.stringify(data));
		},
		
		onClickedMakePricePlan: function(e) {
			document.location = '#makePricePlan/new';
		},
		
		render: function() {
			$(this.el).html(template());
			
			var pricePlanList = DummyDataUtil.getPricePlan();
			this.pricePlanList = pricePlanList;
			
			for(var pricePlanId in pricePlanList) {
				var pricePlan = pricePlanList[pricePlanId];
				$('ul#pricePlanList').append('<li><a data-plan="' + pricePlan['pricePlanId'] + '">' + pricePlan['pricePlanName'] + '</a></li>');
			}
			
			var $firstObj = $('ul#pricePlanList > li:nth-child(1) > a[data-plan]');
			
			if($firstObj.length == 0) return;
			this.planSelectProc($firstObj);
		},
		
	});
	
	return new PricePolicyView;
});