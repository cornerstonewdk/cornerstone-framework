define(function(require) {
	var $ = require("jquery");

	/**
	 * 서버 필요없이 모든 데이터가 동작할 수 있도록 랜덤 또는 미리 입력한 데이터를 모아놓고 관리 하는 클레스
	 */
	var DummyDataUtil = function(){
		//가격 정책 리스트 (기존에 있던 몇몇개만 미리 입력)
		this.pricePlanList = {
			"1": {
				"pricePlanId": "1",
				"makeDate": "2011-05-01",
				"applyDate": "2011-06-01",
				"pricePlanName": "LTE34",
				"customertype": [
					{
						"value": "basic"
					}
				],
				"producttype": [
					{
						"value": "voice",
						"extraData": "120"
					},
					{
						"value": "data",
						"extraData": "0.55"
					},
					{
						"value": "message",
						"extraData": "200"
					}
				],
				"commtype": [
					{
						"value": "lte"
					}
				],
				"discounttype": [
					{
						"value": "lteplus"
					}
				]
			},
			"2": {
				"pricePlanId": "2",
				"makeDate": "2011-07-01",
				"applyDate": "2011-08-01",
				"pricePlanName": "LTE42",
				"customertype": [
					{
						"value": "basic"
					}
				],
				"producttype": [
					{
						"value": "voice",
						"extraData": "180"
					},
					{
						"value": "data",
						"extraData": "1.1"
					},
					{
						"value": "message",
						"extraData": "200"
					}
				],
				"commtype": [
					{
						"value": "lte"
					}
				],
				"discounttype": [
					{
						"value": "lteplus"
					}
				]
			}
		};	//요금상품 리스트
		
		this.vocList = new Array();
	};
	
	/*
	 * 랜덤 숫자 생성
	 */
	DummyDataUtil.prototype.randomNumber = function(n1, n2) {
		return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
	};
	
	/*
	 * UUID 생성
	 */
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
	
	/*
	 * 요금정책 가져오기
	 */
	DummyDataUtil.prototype.getPricePlan = function() {
		return this.pricePlanList;
	};
	
	/*
	 * 요금정책 만든것의 데이터를 추가
	 */
	DummyDataUtil.prototype.addPricePlan = function(obj) {
		this.pricePlanList[obj['pricePlanId']] = obj;
	};
	
	/*
	 * 지점 정보 생성
	 */
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
	
	/*
	 * 가장 최신 데이터 가져오기
	 * S : 원하는 갯수
	 */
	DummyDataUtil.prototype.getNewlyVocData = function(s) {
		if(this.vocList.length == 0) {
			this.vocList = this.makeRandomVocData(1, 10);
		}
		
		return this.vocList.slice(this.vocList.length - s, this.vocList.length);
	};
	
	/*
	 * 파라메터로 넘겨진 범위만큼만 voclist의 배열을 가져옴
	 */
	DummyDataUtil.prototype.getVocDataWithRange = function(s, e) {
		if(this.vocList.length == 0) {
			this.vocList = this.makeRandomVocData(1, 10);
		}
		
		return this.vocList.slice(s, e);
	};
	
	/*
	 * vocList 의 배열을 가져옴
	 */
	DummyDataUtil.prototype.getVocData = function() {
		if(this.vocList.length == 0) {
			this.vocList = this.makeRandomVocData(1, 10);
		}
		
		return this.vocList;
	};
	
	/*
	 * 추가로 새로운 램덤데이터를 생성하여 vocList에 데이터 추가
	 */
	DummyDataUtil.prototype.addRandomeVocData = function(size) {
		var temp = this.makeRandomVocData(this.vocList.length + 1, size);
		
		this.vocList = this.vocList.concat(temp);
		delete temp;
	};
	
	/*
	 * 가상 VOC Data 생성
	 * 더 많은 변수를 넣으면 더 많은 형태의 렌덤데이터가 생성됨
	 */
	DummyDataUtil.prototype.makeRandomVocData = function(idx, size) {
		var userInfoDB = {
			'1': {
				'customerId': 'aaaaa',
				'customerName': '홍길동',
				'customerLevel': 'VIP',
				'customerDevice': 'iPhone4S',
				'customerPricePlan': 'LTE95',
				'customerSatisfaction': '만족'
			},
			'2': {
				'customerId': 'bbbbb',
				'customerName': '김인혜',
				'customerLevel': 'Royal',
				'customerDevice': 'GalaxyS3',
				'customerPricePlan': 'LTE75',
				'customerSatisfaction': '만족'
			},
			'3': {
				'customerId': 'ccccc',
				'customerName': '박순이',
				'customerLevel': 'Platinum',
				'customerDevice': 'Galaxy Note2',
				'customerPricePlan': 'LTE45',
				'customerSatisfaction': '만족'
			},
			'4': {
				'customerId': 'ddddd',
				'customerName': '최미자',
				'customerLevel': 'Red',
				'customerDevice': 'GalaxyS2',
				'customerPricePlan': 'LTE45',
				'customerSatisfaction': '만족'
			},
			'5': {
				'customerId': 'eeeee',
				'customerName': '김영수',
				'customerLevel': 'Black',
				'customerDevice': 'Galaxy Note2',
				'customerPricePlan': 'LTE65',
				'customerSatisfaction': '만족'
			}
		};
		
		var vocDB = {
			'1': {
				'vocId': '1',
				'vocRequest': 'LTEA 전송속도가 생각보다 더 빨리나오는데요?',
				'vocResponse': '해당 속도가 평균적인 속도입니다 ^^.',
				'vocState': 'C'
			},
			'2': {
				'vocId': '1',
				'vocRequest': '타 통신사에서 SKT로 번호이동을 하고싶은데요.',
				'vocResponse': '전문 상담직원이 고객님께 즉시 연락드리겠습니다.',
				'vocState': 'C'
			},
			'3': {
				'vocId': '1',
				'vocRequest': '고객센터 직원을 칭찬하고 싶은데 어떻게 해야하나요?',
				'vocResponse': '홈페이지에 직원추천하기 메뉴에서 칭찬해주실 수 있습니다.',
				'vocState': 'C'
			},
			'4': {
				'vocId': '1',
				'vocRequest': '독도에서 살고있는데 SKT 핸드폰이 터질까요?',
				'vocResponse': '물론이죠. 독도 및 국내 대부분의 섬에서 만족스러운 통화 품질을 기대하실 수 있습니다.',
				'vocState': 'C'
			},
			'5': {
				'vocId': '1',
				'vocRequest': 'SKT 통신사에는 어떤 혜택이 주어지나요?',
				'vocResponse': 'T맴버쉽 뿐만 아니라 대한민국 최고의 서비스를 추가로 제공받으실 수 있습니다.',
				'vocState': 'C'
			},
			'6': {
				'vocId': '1',
				'vocRequest': '통화가 간혈적으로 끊깁니다.',
				'vocResponse': '고객님께서 통화하신 지역에서 통화품질 점검을 해보았으나 이상이 발견되지 않았습니다. 기기의 문제로 사료되오니 제조사에 AS를 신청해봐주세요.',
				'vocState': 'C'
			},
		};
		
		var tempVocArray = new Array();
		for(var i = 0; i < size; i++) {
			var tempVoc = {};
			
			var tempUserInfo = userInfoDB[this.randomNumber(1, 5)];
			var tempVocData = vocDB[this.randomNumber(1, 4)];
			
			tempVoc['customerId'] = tempUserInfo['customerId'];
			tempVoc['customerName'] = tempUserInfo['customerName'];
			tempVoc['customerLevel'] = tempUserInfo['customerLevel'];
			tempVoc['customerDevice'] = tempUserInfo['customerDevice'];
			tempVoc['customerPricePlan'] = tempUserInfo['customerPricePlan'];
			tempVoc['customerSatisfaction'] = tempUserInfo['customerSatisfaction'];
			tempVoc['vocId'] = idx + i + 1;
			tempVoc['vocRequest'] = tempVocData['vocRequest'];
			tempVoc['vocResponse'] = tempVocData['vocResponse'];
			tempVoc['vocState'] = tempVocData['vocState'];
			
			tempVocArray.push(tempVoc);
		}
		
		return tempVocArray;
	};
	
	return new DummyDataUtil();
}); 