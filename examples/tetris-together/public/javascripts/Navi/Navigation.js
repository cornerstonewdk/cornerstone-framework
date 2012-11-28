var Navigation = Class.create({
	
	naviStack: null,	//네비게이션 스택
	
	//예외 상황 (여기에 해당되는 라우팅이 뒤로 가는 중이라면 그 뒤로 이동)
	backwardExceptionRoute: {
		'makeRoom': 1,
		'playTetris': 1,
	},
	
	//첫페이지 허용 목록 여기에 없으면 '' 이 라우트로 강제 이동
	firstPageAllow: {
		'': 1,
		'watchRoom': 1,
	},
	
	//생성자
	initialize: function() {
		console.log('navigation class initialize...');
		this.naviStack = new Array();
	},
	
	//새로운 화면 요청
	push: function(routeToken, ViewClass) { 
		var prevView = this.getPreviousView();
		
		//첫화면이 '' 이것이 아니라면
		if(this.naviStack.length == 0 && typeof(this.firstPageAllow[routeToken]) == 'undefined') {
			document.location = '';
		}
		
		//이전 화면이 없거나 이전라우팅이 아니면 새로운것으로 생각하고 등록
		if(prevView == null || prevView.routeToken != routeToken) {
			//현재 화면이 있을경우 앞으로 가는것이므로 현재 화면에게 화면이 없어진다는것을 알림
			if(this.naviStack.length != 0) {
				var currentView = this.getCurrentView();
				currentView.viewDidDisappear('>');
			}
			
			//새로운 화면을 생성하여 화면 뿌려줌
			var nv = new View(routeToken, ViewClass);
			this.naviStack.push(nv);
			nv.drawView();
		} else {		//뒤로 가는것
			var currentView = this.getCurrentView();
			currentView.viewDidDisappear('<');
			
			this.naviStack.pop();
			
			//뒤로 가는것인데 예외적인 상황이라면
			if(typeof(this.backwardExceptionRoute[prevView.routeToken]) != 'undefined') {
				history.back();
			} else {
				prevView.restore();	
			}
		}
	},
	
	//현재 이넘의 객체는 전역이 아니므로 따로 호출할 방법이 없으므로 구현하지 않음	
	pop: function() {
		
	},
	
	//이번 뷰 가져오기
	getPreviousView: function() {
		if(this.naviStack.length < 2) {
			return null;
		}
		
		return this.naviStack[this.naviStack.length - 2];
	},
	
	//현재 뷰 가져오기
	getCurrentView: function() {
		return this.naviStack[this.naviStack.length - 1];
	},
	
});
