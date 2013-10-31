define([
		'jquery', 
		'backbone', 
		'util/dummyDataUtil', 
		'template!../template/pricePlan/pricePlan',
		'template!../template/pricePlan/pricePlanContent',  
		'style!../style/pricePlan/pricePlanStyle'
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
		
		selectedPricePlanId: null,
		
		initialize: function() {
			
		},
		
		//이벤트 정의
		events: {
			'click button#makePricePlan': 'onClickedMakePricePlan',
			'click a[data-plan]': 'planSelect',
			'click #pricePlanList > li': 'planSelect',
			'click button#modifyButton': 'onClickedModifyButton',
		},
		
		planSelect: function(e) {
			var target = e.target.tagName === 'A' ? $(e.target) : $(e.target).find('a');
			this.planSelectProc(target);
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
				$('div[data-customertype="' + ctype['value'] + '"]').attr('data-show', 'true');
				$('div[data-customertype="' + ctype['value'] + '"]').addClass('span' + Math.ceil(12 / customerTypeList.length));
			}
			$('div#dropCustomerTypeZone > div[data-show="false"]').remove();
			
			var producTypeList = data['producttype'];

			for(var i = 0; i < producTypeList.length; i++) {
				var ptype = producTypeList[i];
				$('[data-producttype="' + ptype['value'] + '"]').attr('data-show', 'true');
				// $('div[data-producttype="' + ptype['value'] + '"]').addClass('span' + Math.ceil(12 / producTypeList.length));
				switch(ptype['value']) {
					case 'voice':
						$('div[data-producttype="' + ptype['value'] + '"] ').find('p.typo-number').html('(' + ptype['extraData'] + ' 분)');
						break;
					case 'data':
						$('div[data-producttype="' + ptype['value'] + '"]').find('p.typo-number').html('(' + ptype['extraData'] + ' GB)');
						break;
					case 'message':
						$('div[data-producttype="' + ptype['value'] + '"]').find('p.typo-number').html('(' + ptype['extraData'] + ' 건)');
						break;
					case 'roaming':
						$('div[data-producttype="' + ptype['value'] + '"]').find('p.typo-number').html('(' + ptype['extraData'] + ' 분)');
						break;
				}
			}
			$('#dropProductTypeZone li > a[data-show="false"]').closest('li').remove();
			
			var commTypeList = data['commtype'];
			for(var i = 0; i < commTypeList.length; i++) {
				var ctype = commTypeList[i];
				$('div[data-commtype="' + ctype['value'] + '"]').attr('data-show', 'true');
				$('div[data-commtype="' + ctype['value'] + '"]').addClass('span' + Math.ceil(12 / commTypeList.length));
			}
			$('div#dropCommTypeZone > div[data-show="false"]').remove();
			
			var discountTypeList = data['discounttype'];
			for(var i = 0; i < discountTypeList.length; i++) {
				var dtype = discountTypeList[i];
				$('div[data-discounttype="' + dtype['value'] + '"]').attr('data-show', 'true');
				$('div[data-discounttype="' + dtype['value'] + '"]').addClass('span' + Math.ceil(12 / discountTypeList.length));
			}
			$('div#dropDiscountTypeZone > div[data-show="false"]').remove();

			$('button[data-toggle="popover"]').each(function(){
				$( this ).popover('show');
			});
		},
		
		onClickedModifyButton: function(e) {
			var data = this.pricePlanList[this.selectedPricePlan];
			document.location = '#makePricePlan/' + encodeURIComponent(JSON.stringify(data));
		},
		
		onClickedMakePricePlan: function(e) {
			document.location = '#makePricePlan';
		},
		
		render: function() {
			$(this.el).html(template());
			
			var pricePlanList = DummyDataUtil.getPricePlan();
			this.pricePlanList = pricePlanList;
			
			for(var pricePlanId in pricePlanList) {
				var pricePlan = pricePlanList[pricePlanId];
				$('ul#pricePlanList').append('<li class="list-group-item"><a data-plan="' + pricePlan['pricePlanId'] + '">' + pricePlan['pricePlanName'] + '</a></li>');
			}
			
			if(!this.selectedPricePlanId) {
				var $firstObj = $('ul#pricePlanList > li:nth-child(1) > a[data-plan]');
			
				if($firstObj.length == 0) return;
				this.planSelectProc($firstObj);
			} else {
				this.planSelectProc($('[data-plan="' + this.selectedPricePlanId + '"]'));
			}
		},
		
		viewDidAppear: function() {
			
		},
		
	});
	
	return new PricePolicyView;
});