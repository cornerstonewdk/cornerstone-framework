define([
		'jquery', 
		'backbone', 
		'util/dummyDataUtil', 
		'template!../template/pricePlan/makePricePlan', 
		'template!../template/pricePlan/modal', 
		'template!../template/pricePlan/modalBody', 
		'widget-datepicker',
		'style!../style/pricePlan/makePricePlanStyle',
		'widget-plugins',
		
], function(
		$, 
		Backbone, 
		DummyDataUtil, 
		template,
		modalTemplate,
		modalBodyTemplate
){
	var MakePricePolicyView = Backbone.View.extend({
		
		//선택된 상품 데이터
		selectPlanData: null,
		isNew: false,
		
		el : 'div#contentsView',
		
		//드랍존들 객체 (이 안에 있는것들이 곧 선택한 놈들)
		$dropCustomerTypeZone: null,
		$dropProductTypeZone: null,
		$dropCommTypeZone: null,
		$dropDiscountTypeZone: null,
		
		initialize: function() {
		},

		/*
		 * el 이 가르키는 위치에 html을 만들어 준다.
		 */
		render: function() {
			var self = this;
			
			var handleBarParams = {};	//html template 에 초기에 정의도어 있어야 할 파라메터 객체 생성 
			
			//오늘 날짜 구하기
			var today = new Date();
			today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			
			//template 에 전달할 데이터 수집
			if(this.selectPlanData != null) {	//기존에 만든 정책 수정일때 기존데이터 수집 처리 부분
				this.isNew = false;
				this.selectPlanData = JSON.parse(decodeURIComponent(this.selectPlanData));
				
				handleBarParams['pricePlanName'] = this.selectPlanData['pricePlanName']
				handleBarParams['applyDate'] = this.selectPlanData['applyDate'];
				handleBarParams['makeData'] = this.selectPlanData['makeDate'];
				
				//설정되지 않은 객체들도 있으므로 일단 다 0으로 설정한다.
				handleBarParams['voiceData'] = 0;
				handleBarParams['dataData'] = 0;
				handleBarParams['messageData'] = 0;
				handleBarParams['roamingData'] = 0;
				
				//기존 설정값들 불러와 위에서 0으로 설정한 부분에 덮어 씌운다.
				var producTypeList = this.selectPlanData['producttype'];
				for(var i = 0; i < producTypeList.length; i++) {
					var ptype = producTypeList[i];
					handleBarParams[ptype['value'] + 'Data'] = ptype['extraData'];
				}
			} else {	//새로 만드는 정책일때 기본값 설정 부분
				this.isNew = true;
				
				handleBarParams['pricePlanName'] = '';
				handleBarParams['applyDate'] = today;
				handleBarParams['makeData'] = today;
				
				handleBarParams['voiceData'] = 0;
				handleBarParams['dataData'] = 0;
				handleBarParams['messageData'] = 0;
				handleBarParams['roamingData'] = 0;
			}
			
			//화면 그려주기
			$(this.el).html(template(handleBarParams));
		},
		
		/*
		 * 화면이 표시된 후에 처리해줄 작업 정의
		 * render() 에서 처리하지 않고 여기서 하는 이유는 render() 이 처리되고 있을시에는 아직 이전 화면 html tag가 사라지지 않기 때문에
		 * 여기서 처리해주면 이전 화면 html 은 모두 사라져 있고 화면이 표시된 이후에 싸이즈 잡는 작업은 이때 해주면 좋다.
		 * 이 메서드는 pageNavigation.js 에서 호출해주기 때문에 이것을 사용하지 않을때는 아무 의미 없다.
		 */
		viewDidAppear: function() {
			var self = this;
			
			//드래그앤 드롭 설정
			this.$dropCustomerTypeZone = $('div#dropCustomerTypeZone');		//고객조건 드랍존
			this.$dropProductTypeZone = $('div#dropProductTypeZone');		//상품조건 드랍존
			this.$dropDiscountTypeZone = $('div#dropDiscountTypeZone');		//할인조건 드랍존
			this.$dropCommTypeZone = $('div#dropCommTypeZone');				//회선조건 드랍존

			// TODO rangeinput과 충돌
			$('div[data-dragObject]').each( function () {
				$( this ).drag({drag:false}).on("drag",function (e, y, x) {
					$(this).css( {
						top: y,
						left: x
					} );
				} ).on("dragEnd", function(e){	//드레그 오브젝트 설정
					self.dropEvent(e);
				} );
			} )
			
			//조건에 따라 새로 만들던지 기존것 재현하여 편집할 수 있도록 처리
			if(this.selectPlanData != null) {	//수정일때 데이터서 로딩
				$('#makeDate').show();
				
				var customerTypeList = this.selectPlanData['customertype'];
				for(var i = 0; i < customerTypeList.length; i++) {
					var ctype = customerTypeList[i];
					this.moveToDropZone($('div[data-customertype="' + ctype['value'] + '"]'), this.$dropCustomerTypeZone);
				}
				
				var producTypeList = this.selectPlanData['producttype'];
				for(var i = 0; i < producTypeList.length; i++) {
					var ptype = producTypeList[i];
					this.moveToDropZone($('div[data-producttype="' + ptype['value'] + '"]'), this.$dropProductTypeZone);
					$('div[data-producttype="' + ptype['value'] + '"]').attr('data-extradata', ptype['extraData']);
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
				
				var commTypeList = this.selectPlanData['commtype'];
				for(var i = 0; i < commTypeList.length; i++) {
					var ctype = commTypeList[i];
					this.moveToDropZone($('div[data-commtype="' + ctype['value'] + '"]'), this.$dropCommTypeZone);
				}
				
				var discountTypeList = this.selectPlanData['discounttype'];
				for(var i = 0; i < discountTypeList.length; i++) {
					var dtype = discountTypeList[i];
					this.moveToDropZone($('div[data-discounttype="' + dtype['value'] + '"]'), this.$dropDiscountTypeZone);
				}
				
			} else {	//새로 만들기일때 기본 셋팅
				$('#makeDate').hide();
				
				//일반을 기본적으로 선택되게 이동
				this.moveToDropZone($('div[data-customertype="basic"]'), this.$dropCustomerTypeZone);
				this.moveToDropZone($('div[data-producttype="voice"]'), this.$dropProductTypeZone);
			}
			
			
			// $('.datepicker').datepicker({language: "ko"});
			$("#date-picker1").datetimepicker({
	            firstDisable: true,
	            changeDisplay: true,
	            pickTime: false,
	            format: 'yyyy-mm-dd'
        	});
		},
		
		//이벤트 정의
		events: {
			'click button#saveButton': 'clickedSaveButton',
			'click button.removeButton': 'clickedRemoveButton',
			'click button#makePlan-backButton': 'onClickedBackButton',
			'click button.js-edit-producttype': 'editProductType',
			'click button.js-modal-save': 'saveExtraData'
		},

		/* 이벤트 editProductType,saveExtraData 로 통합
		'click button#voiceModalCancel': 'onClickedVoiceModalCancel',
		'click button#voiceModalOK': 'onClickedVoiceModalOK',
		'click button#dataModalCancel': 'onClickedDataModalCancel',
		'click button#dataModalOK': 'onClickedDataModalOK',
		'click button#messageModalCancel': 'onClickedMessageModalCancel',
		'click button#messageModalOK': 'onClickedMessageModalOK',
		'click button#roamingModalCancel': 'onClickedRoamingModalCancel',
		'click button#roamingModalOK': 'onClickedRoamingModalOK',
		*/

		editProductType: function( e ) {
			var data = {
				voice: {
					title: '상품조건 > 음성',
					value: 0,
					min: 0,
					max: 1000,
					step: 10,
					alert: false
				},
				data: {
					title: '상품조건 > 데이터',
					value: 0,
					min: 0.0,
					max: 10.0,
					step: 0.1,
					alert: false
				},
				message: {
					title: '상품조건 > 메세징',
					value: 0,
					min: 0,
					max: 1000,
					step: 100,
					alert: false
				},
				roaming: {
					title: '상품조건 > 로밍',
					value: 0,
					min: 0,
					max: 1000,
					step: 100,
					alert: false
				}
			};
			
			// js-edit-producttype 클래스를 지닌 버튼을 클릭 시 해당 모달을 보여준다.
			var product = $( e.target ).closest('[data-dragobject="producttype"]');
			var productType = product.data('producttype');
			data[productType].value = product.data('extradata');
			data[productType].type = productType;
			
			// 1. 모달 형태를 셋팅하고
			// 2. data의 종류에 따라 body template을 불러와서 .modal-body > p 의 html영역에 넣어준다.

			var $modal = $('#modal');
			$modal.html($(modalTemplate(data[productType]))).find('.modal-body > p').html(modalBodyTemplate(data[productType]));

			var $inputRange = $modal.find('input');
			$inputRange.hide();
			$modal.modal();
			$modal.on("shown.bs.modal", function(e) {
				$inputRange.show();
				var $range = $('#modal').find('.widget-range');
				$range.rangeinput({inputShow: true, progress: true});
			});
		},

		saveExtraData: function ( e ) {
			var productType = $( e.target ).data('type');
			var typeStr;

			switch( productType ) {
				case 'voice':
					typeStr = '분';
					break;
				case 'data':
					typeStr = 'GB';
					break;
				case 'message':
					typeStr = '건';
					break;
				default:
					typeStr = '분';
			}

			$('div[data-producttype="' + productType + '"]').data('extradata', $('#modal input').val());
			$('div[data-producttype="' + productType + '"] > p').html('(' + $('#modal input').val() + ' ' + typeStr + ')');
		},
		
		/*
		 * 폰싸이즈 화면에서 뒤로 버튼 눌렸을때 이벤트 처리
		 * history.bakc() 해준다.
		 */
		onClickedBackButton: function(e) {
			history.back();
		},
		
		/*
		 * 저장 버튼 눌렸을때 이벤트 처리
		 * 설정된 객체들의 벨리데이션 처리 및 데이터 취합 후 서버기능은 없기 때문에 임시 메모리배열에 저장
		 */
		clickedSaveButton: function(e) {
			var self = this;

			//상품명 체크
			var pricePlanName = $('input#pricePlanName').prop('value');
			if(pricePlanName == null || pricePlanName.length < 1) {
				alert('상품명을 입력해 주세요!');
				 $('input#pricePlanName').focus();
				return;
			}
			
			//고객조건 체크
			var customerList = this.getSelectObjectList(this.$dropCustomerTypeZone);
			if(customerList.length < 1) {
				alert('고객조건은 1개 이상 선택해주세요!');
				return;
			}
			
			//상품조건 체크
			var productList = this.getSelectObjectList(this.$dropProductTypeZone);
			if(productList.length < 1) {
				alert('상품조건은 1개 이상 선택해주세요!');
				return;
			}
			
			//데이터 취합
			var data = {};
			
			//아이디 생성 및 상품명 취합
			if(this.isNew) {
				data['pricePlanId'] = DummyDataUtil.makeUuid();
				
				var today = new Date();
				data['makeDate'] = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
				data['applyDate'] = $('#applyDate').val();
			} else {
				data['pricePlanId'] = this.selectPlanData['pricePlanId'];
				data['makeDate'] = this.selectPlanData['makeDate'];
				data['applyDate'] = this.selectPlanData['applyDate'] = $('#applyDate').val();
			}
			
			data['pricePlanName'] = pricePlanName;
			
			//고객 조건 취합
			var customerType = new Array();
			for(var i = 0; i < customerList.length; i++) {
				var $cdata = $(customerList[i]);
				var ctype = $cdata.attr('data-customertype');
				customerType.push({
					'value': ctype,
				});
			}
			data['customertype'] = customerType;
			
			//상품 조건 취합
			var productType = new Array();
			for(var i = 0; i < productList.length; i++) {
				var $pdata = $(productList[i]);
				var ptype = $pdata.attr('data-producttype');
				var pdata = $pdata.data('extradata');
				productType.push({
					'value': ptype,
					'extraData': pdata,
				});
			}
			data['producttype'] = productType;
			
			//회선 조건 취합
			var commType = new Array();
			var commList = this.getSelectObjectList(this.$dropCommTypeZone);
			for(var i = 0; i < commList.length; i++) {
				var $cdata = $(commList[i]);
				var ctype = $cdata.attr('data-commtype');
				commType.push({
					'value': ctype,
				});
			}
			data['commtype'] = commType;
			
			//할인 조건 취합
			var discountType = new Array();
			var discountList = this.getSelectObjectList(this.$dropDiscountTypeZone);
			for(var i = 0; i < discountList.length; i++) {
				var $ddata = $(discountList[i]);
				var dtype = $ddata.attr('data-discounttype');
				discountType.push({
					'value': dtype,
				});
			}
			data['discounttype'] = discountType;
			
			DummyDataUtil.addPricePlan(data);
			
			history.back();
		},
		
		//삭제 버튼 눌렷을때 처리
		clickedRemoveButton: function(e) {
			var $obj = $(e.target).parent();
			var objType = $obj.attr('data-dragObject');
			
			var $menu;
			
			switch(objType) {
				case 'customertype':
					var typeName = $obj.attr('data-customertype');
					$menu = $('li[data-menu-customertype="' + typeName + '"]');
					break;
				case 'producttype':
					var typeName = $obj.attr('data-producttype');
					$menu = $('li[data-menu-producttype="' + typeName + '"]');
					break;
				case 'commtype':
					var typeName = $obj.attr('data-commtype');
					$menu = $('li[data-menu-commtype="' + typeName + '"]');
					break;
				case 'discounttype':
					var typeName = $obj.attr('data-discounttype');
					$menu = $('li[data-menu-discounttype="' + typeName + '"]');
					break;
			}
			
			//수정 과 삭제 버튼 지우기 (재사용하기 위하여)
			var $children = $obj.children();
			for(var i = $children.length - 1; i >= 0; i--) {
				if($($children[i]).prop('tagName') == 'BUTTON') $($children[i]).remove();
			}
			
			//기본 위치로 설정
			$obj.css({
				top: 0,
				left: -12
			});
			
			//객체 이동
			$obj.appendTo($menu);
		},
		
		//내용 수정 버튼 눌렷을때 처리
		clickedModifyButton: function(e) {
			var $obj = $(e.target).parent();
		},
		
		//드롭 이벤트 처리
		dropEvent: function(e) {
			var self = this;
			
			//드래그된 객체를 가져온다.
			var $dragObj = $(e.target);
			
			//부모의 태그를 검사하여 시작 위치가 아니면 리턴하여 처리 하지 않는다.
			if($dragObj.parent().prop('tagName') != 'LI') {
				return;
			}
			
			var dragObjType = $dragObj.attr('data-dragObject');		//타입을 가져온다.
			
			//해당 오브젝트가 드랍되어야만 하는 드랍존을 가져온다.
			var $dropZone = this.$dropCustomerTypeZone;				
			switch(dragObjType) {
				case 'customertype':
					$dropZone = this.$dropCustomerTypeZone;
					break;
				case 'producttype':
					$dropZone = this.$dropProductTypeZone;
					break;
				case 'commtype':
					$dropZone = this.$dropCommTypeZone;
					break;
				case 'discounttype':
					$dropZone = this.$dropDiscountTypeZone;
					break;
			}
			
			//offset().left, top은 좌상단 이 기준점이므로 가운데를 기준으로 하게 각 가로와 길이를 2로 나누어서 변수 생성한다.
			var pointX = $dragObj.width() / 2 + $dragObj.offset().left;
			var pointY = $dragObj.height() / 2 + $dragObj.offset().top;
			
			//드레근한 객체와 해당 객체가 드랍되어야 하는 영역과의 거리를 계산
			var deltaX = pointX - $dropZone.offset().left;
			var deltaY = pointY - $dropZone.offset().top;
			
			//드랍되어야 하는 위치의 상대적 가로와 세로 길이 좌표
			var deltaWidth = $dropZone.offset().left + $dropZone.width();
			var deltaHeight = $dropZone.offset().top + $dropZone.height();
			
			//해당 오브젝트의 중앙이 드랍존안에 들어간것이 확인되었는지 체크
			if(deltaX > 0 && deltaY > 0 &&  pointX < deltaWidth && pointY < deltaHeight) {
				//조검 체크
				switch(dragObjType) {
					case 'customertype':
						var ctype = $dragObj.attr('data-customertype');
						if(ctype == 'basic') {	//일반의 경우 나머지 3개와 같이 할 수 없다.
							if(self.getSelectObjectList(self.$dropCustomerTypeZone).length > 0){
								var obj = {
									title: '경고',
									body: '일반의 경우 다른 고객 조건과 겹칠 수 없습니다. 다른 조건을 삭제 후 다시 시도하여 주세요!',
									alert: true
								};
								$('#modal').html($(modalTemplate(obj))).find('.modal-body > p').html(modalBodyTemplate(obj));
								$('#modal').modal();
								self.reverseObject($dragObj);
								return;	
							}
						} else {	//다른 경우 일반이 이미 선택되어있는지 체크
							var list = self.getSelectObjectList(self.$dropCustomerTypeZone);
							for(var i = 0; i < list.length; i++) {
								if($(list[i]).attr('data-customertype') == 'basic') {
									var obj = {
										title: '경고',
										body: '일반의 경우 다른 고객 조건과 겹칠 수 없습니다. 다른 조건을 삭제 후 다시 시도하여 주세요!',
										alert: true
									};
									$('#modal').html($(modalTemplate(obj))).find('.modal-body > p').html(modalBodyTemplate(obj));
									$('#modal').modal();
									self.reverseObject($dragObj);
									return;	
								}
							}
						}
						break;
					case 'producttype':
						break;
					case 'commtype':
						break;
					case 'discounttype':
						break;
				}
				self.moveToDropZone($dragObj, $dropZone);
			} else {
				self.reverseObject($dragObj);
			}
		},
		
		//현재 선택된 애들의 객체 리스트 가져오기
		getSelectObjectList: function($dropZone) {
			return $dropZone.children();
		},
		
		//드레그중인 오브젝트 되돌리기
		reverseObject: function($dragObj) {
			$dragObj.animate({
				top:0,
				left:-12,
			}, function () {
			});	
		},
		
		//드랍존으로 객체 이동메서드 (다른 이벤트로도 이동시키기 위하여)
		moveToDropZone: function($obj, $dropZone) {
			$obj.appendTo($dropZone);
			
			var dragObjType = $obj.attr('data-dragObject');		//타입을 가져온다.
				
			//내용 추가는 선택적이기 때문에 스위치로 분기처리
			switch(dragObjType) {
				case 'customertype':
					break;
				case 'producttype':
					//상품 타입 검사하여 적절한 내용추가 버튼 달아주기
					var productType = $obj.attr('data-producttype');
					switch(productType) {
						case 'voice':
							$obj.append('<button type="button" class="modifyButton js-edit-producttype">내용편집</button>');
							break;
						case 'data':
							$obj.append('<button type="button" class="modifyButton js-edit-producttype">내용편집</button>');
							break;
						case 'message':
							$obj.append('<button type="button" class="modifyButton js-edit-producttype">내용편집</button>');
							break;
						case 'roaming':
							$obj.append('<button type="button" class="modifyButton js-edit-producttype">내용편집</button>');
							break;
					}
					break;
				case 'commtype':
					break;
				case 'discounttype':
					break;
			}
		
			$obj.append('<button class="removeButton">x</button>');
		}
		
	});
	
	return new MakePricePolicyView;
});