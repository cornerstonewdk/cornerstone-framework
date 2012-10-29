define(function(require) {
	var $ = require("jquery");

	var DummyDataUtil = function(){
		this.pricePlanList = {};	//요금상품 리스트
	};
	
	//랜덤 숫자 생성
	DummyDataUtil.prototype.randomNumber = function(n1, n2) {
		return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
	};
	
	//UUID 생성
	DummyDataUtil.prototype.makeUuid = function() {
		var chars = '0123456789abcdef'.split('');
	
		var uuid = [], rnd = Math.random, r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4'; // version 4
	
		for (var i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | rnd()*16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
			}
		}
	
		return uuid.join('');
	};
	
	DummyDataUtil.prototype.getPricePlan = function() {
		return this.pricePlanList;
	};
	
	DummyDataUtil.prototype.addPricePlan = function(obj) {
		this.pricePlanList[obj['pricePlanId']] = obj;
	};
	
	//지점 정보 생성
	DummyDataUtil.prototype.makeBranchData = function() {
		var branchList = {
			'1': {'name': '강남지점(신)'},
			'2': {'name': '강북지점(신)'},
			'3': {'name': '보라매지점(신)'},
			'4': {'name': '테크노마트지점(신)'},
			'5': {'name': '부산지점'},
			'6': {'name': '대구지점'},
			'7': {'name': '목포지점'},
			'8': {'name': '대전지점'},
			'9': {'name': '속초점'},
		};
		
		//각 지점들 현재까지 개통수 임시 생성
		for(var branchCode in branchList) {
			var branchInfo = branchList[branchCode];
			
			branchInfo['result'] = this.randomNumber(100, 500);
		}
		
		var currentHour = new Date().getHours();
		currentHour = Math.min(currentHour, 17);
		
		//각 지점들 차트용 임시 데이터 생성
		for(var branchCode in branchList) {
			var branchInfo = branchList[branchCode];
			
			var values = new Array();
			for(var i = 9; i < currentHour; i++) {
				values.push({
					'x': i,
					'y': this.randomNumber(10, 50)
				});
			}
			
			var timeData = new Array();
			timeData.push({
				'key': '개통수',
				'values': values
			});
			
			branchInfo['timeData'] = timeData;
		}
		
		//각 지점들 차트용 임시 데이터 생성
		for(var branchCode in branchList) {
			var branchInfo = branchList[branchCode];
			
			var values = new Array();
				values.push({
					'label': '겔럭시S3',
					'value': this.randomNumber(50, 200)
				});
				values.push({
					'label': '겔럭시노트2',
					'value': this.randomNumber(50, 200)
				});
				values.push({
					'label': '아이폰5',
					'value': this.randomNumber(50, 200)
				});
				values.push({
					'label': '옵티머스G',
					'value': this.randomNumber(50, 200)
				});
				values.push({
					'label': '기타',
					'value': this.randomNumber(50, 200)
				});
			
			var pieData = new Array();
			pieData.push({
				'key': '개통단말기',
				'values': values
			});
			
			branchInfo['deviceData'] = pieData;
		}
		
		return branchList;
	};
	
	//가상 VOC Data 생성
	DummyDataUtil.prototype.makeRandomVocData = function(idx, size) {
		var userInfoDB = {
			'1': {
				'customerId': 'aaaaa',
				'customerName': '전종현',
				'customerLevel': 'VIP',
				'customerDevice': 'iPhone4S',
				'customerPricePlan': 'LTE95',
				'customerSatisfaction': '만족'
			},
			'2': {
				'customerId': 'bbbbb',
				'customerName': '김우섭',
				'customerLevel': 'Royal',
				'customerDevice': 'GalaxyS3',
				'customerPricePlan': 'LTE75',
				'customerSatisfaction': '만족'
			},
			'3': {
				'customerId': 'ccccc',
				'customerName': '홍길동',
				'customerLevel': 'Platinum',
				'customerDevice': 'Galaxy Note2',
				'customerPricePlan': 'LTE45',
				'customerSatisfaction': '만족'
			},
			'4': {
				'customerId': 'ddddd',
				'customerName': '김영수',
				'customerLevel': 'Red',
				'customerDevice': 'GalaxyS2',
				'customerPricePlan': 'LTE45',
				'customerSatisfaction': '만족'
			},
			'5': {
				'customerId': 'eeeee',
				'customerName': '박순이',
				'customerLevel': 'Black',
				'customerDevice': 'Galaxy Note2',
				'customerPricePlan': 'LTE65',
				'customerSatisfaction': '만족'
			},
		};
		
		var vocDB = {
			'1': {
				'vocId': '1',
				'vocRequest': '핸드폰 전원이 안켜져요',
				'vocResponse': '배터리를 충전하세요',
				'vocState': 'C',
			},
			'2': {
				'vocId': '1',
				'vocRequest': '자꾸 다운되요',
				'vocResponse': '왜 그럴까요?',
				'vocState': 'C',
			},
			'3': {
				'vocId': '1',
				'vocRequest': '활불 되나요?',
				'vocResponse': '안됩니다.',
				'vocState': 'C',
			},
			'4': {
				'vocId': '1',
				'vocRequest': '너무 느려요 어떻게 빨라지게 하나요?',
				'vocResponse': '그런거 없어요~ 그냥 참고 쓰세요',
				'vocState': 'C',
			},
		};
		
		var tempVocArray = new Array();
		for(var i = idx; i < size; i++) {
			var tempVoc = {};
			
			var tempUserInfo = userInfoDB[this.randomNumber(1, 5)];
			var tempVocData = vocDB[this.randomNumber(1, 4)];
			
			tempVoc['customerId'] = tempUserInfo['customerId'];
			tempVoc['customerName'] = tempUserInfo['customerName'];
			tempVoc['customerLevel'] = tempUserInfo['customerLevel'];
			tempVoc['customerDevice'] = tempUserInfo['customerDevice'];
			tempVoc['customerPricePlan'] = tempUserInfo['customerPricePlan'];
			tempVoc['customerSatisfaction'] = tempUserInfo['customerSatisfaction'];
			tempVoc['vocId'] = i;
			tempVoc['vocRequest'] = tempVocData['vocRequest'];
			tempVoc['vocResponse'] = tempVocData['vocResponse'];
			tempVoc['vocState'] = tempVocData['vocState'];
			
			tempVocArray.push(tempVoc);
		}
		
		return tempVocArray;
	};
	
	return new DummyDataUtil();
}); 