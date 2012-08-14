/**
 * 2012-07-30 : 전종현
 * 터치 이벤트를 처리하여 결과를 알려주는 Touch Util
 * 터치 이벤트는 다른곳에서 바인드하며 이 객체의 메소드로 바인드 하면 된다.
 * on Method를 이용하여 이벤트 결과를 받을 리스너들을 등록할 수 있다.
 */
var TouchUtil = Class.create({
	
	//상수
	tapTime: 500,	//탭인지 여부 가리기 위한 기준 시간 ms
	tapDistance: 5,	//이 상수값 이하로 움직여도 tap 이벤트 처리
	tapMaxWaitTime: 1000,	//거리가 짧을때는 이 시간까지는 탭으로 처리
	
	listeners: null,		//터치가 발생했을때 전달받을 리스너들
	
	touchTracke: null,	//터치 궤적
	
	//터치 시간
	touchStartTime: null,
	touchEndTime: null,
	
	//한 블럭의 가로 세로 길이 (이것 가지고 스와이프 도중 이벤트 발생)
	blockWidth: null,	//블럭의 가로 길이
	blockHeight: null,
	
	//스와이프가 끝나지 않았을때도 데이터를 분석하여 이벤트 발생 여부 (지금은 항상 당근 true)
	movingAnalysisUse: true,		//이동중 추적 사용 여부
	movingAnalysisStartXIndex: 0,	//이동중 일때 분석할 경우 기존것 삭제하기 그러니 x시작점을 지정해줌
	movingAnalysisStartYIndex: 0,	//이동중 일때 분석할 경우 기존것 삭제하기 그러니 y시작점을 지정해줌
	
	//생성자
	initialize: function(blockWidth, blockHeight) {
		this.listeners = new Array();	//리스너 배열 생성
		this.blockWidth = blockWidth;
		this.blockHeight = blockHeight;
	},
	
	//리스너 등록
	on: function(targetObject, targetMethod) {
		this.listeners.push({'targetObject': targetObject, 'targetMethod': targetMethod});
	},
	
	//리스너 삭제
	off: function(targetObject, targetMehtod) {
		for(var i = 0; i < this.listeners.length; i++) {
			if(this.listeners[i].targetObject == targetObject && this.listeners[i].targetMethod == targetMehtod) {
				this.listeners.splice(i, 1);
			}
		}
	},
	
	//터치 시작되었을때 초기화 할것 여기서 작업
	touchStartInit: function() {
		this.movingAnalysisStartXIndex = 0;
		this.movingAnalysisStartYIndex = 0;
		this.touchTracke = new Array();
	},
	
	//터치 시작
	touchStart: function(event) {
		this.touchStartInit();	//터치 시작시 초기화 작업
		
		var touch = event.touches[0];
		
		var touchInfo = {
			x: touch.pageX,
			y: touch.pageY
		};
		this.touchTracke.push(touchInfo);
		
		this.touchStartTime = new Date();
	},
	
	//터치중
	touchMove: function(event) {
		var touch = event.touches[0];
		
		var touchInfo = {
			x: touch.pageX,
			y: touch.pageY
		};
		this.touchTracke.push(touchInfo);
		
		this.movingAnalysis();
	},
	
	//터치 끝
	touchEnd: function(event) {
		this.touchEndTime = new Date();
		
		this.analysis();
	},
	
	//이동중 분석
	movingAnalysis: function() {
		var first = this.touchTracke[this.movingAnalysisStartXIndex];
		var last = this.touchTracke[this.touchTracke.length - 1];
		
		var deltaX = last.x - first.x;
		
		//x좌표 절대 이동거리가 블럭의 길이보다 길어지면 리스너에 이벤트 호출
		if(Math.abs(deltaX) > this.blockWidth) {
			if(deltaX < 0) {
				for (var i = 0; i < this.listeners.length; i++) {
					var obj = this.listeners[i];
					obj.targetObject[obj.targetMethod]({touchEvent: 'leftSwipe'});
				}
			} else {
				for (var i = 0; i < this.listeners.length; i++) {
					var obj = this.listeners[i];
					obj.targetObject[obj.targetMethod]({touchEvent: 'rightSwipe'});
				}
			}
			
			this.movingAnalysisStartXIndex = this.touchTracke.length - 1;	//다음부터는 여기서부터 체크하게 기준 인덱스 수정
		}
		
		first = this.touchTracke[this.movingAnalysisStartYIndex];
		
		//y 좌표 이동거리가 블럭의 높이보다 크고 그 크기가 0보다 크면 (블럭이 위로 이동하면 안되니깐) down 이벤트를 날림
		var deltaY = last.y - first.y;
		
		if(deltaY > this.blockHeight) {
			for (var i = 0; i < this.listeners.length; i++) {
				var obj = this.listeners[i];
				obj.targetObject[obj.targetMethod]({touchEvent: 'downSwipe'});
			}
			
			this.movingAnalysisStartYIndex = this.touchTracke.length - 1;	//다음부터는 여기서부터 체크하게 기준 인덱스 수정
		}
	},
	
	//터치 분석 (여기서는 탭체크 뿐이 안함 테트리스 전용이라...)
	analysis: function() {
		var touchedTime = this.touchEndTime - this.touchStartTime;

		//터치 총 길이 가져오기
		var distance = 0;
		
		for(var i = 1; i < this.touchTracke.length; i++) {
			distance += this.distance(this.touchTracke[i - 1], this.touchTracke[i]);
		}
		
		distance = Math.round(distance);
		
		//탭 체크
		if(touchedTime < this.tapTime && distance < this.tapDistance) {
			this.isTap();
			return;
		}
	},
	
	//탭 이벤트 발견되엇을때 처리
	isTap: function() {
		// console.log('is tap');
		for (var i = 0; i < this.listeners.length; i++) {
			var obj = this.listeners[i];
			
			obj.targetObject[obj.targetMethod]({touchEvent: 'tap'});
		}
	},
	
	//두 좌표간의 거리 구하는 메서도
	distance: function(p1, p2) {	
		return Math.sqrt(Math.pow(Math.abs(p2.x - p1.x), 2) + Math.pow(Math.abs(p2.y - p1.y), 2));
	},
});
