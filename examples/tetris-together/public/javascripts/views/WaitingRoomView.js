define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!templates/waitingRoom.html',
		'text!templates/waitingRoomManageMenu.html',
		'text!templates/waitingRoomPlayerBottom.html',
	],
	function(
		$,
		_,
		Backbone,
		waitingRoomTpl,
		manageMenuTpl,
		playerBottomTpl
	) {
		WaitingRoomView = Backbone.View.extend({
			el: $('#contents'),
			
			myInfo: null,
			
			userInfo: null,
			
			render: function() {
				console.log('WaintingRoomView render...');
				
				$(this.el).html(waitingRoomTpl);
				
				this.getInformation();
			},
			
			viewDidAppear: function() {
				this.bindEvents();
			},
			
			viewDidDisappear: function(direction) {
				//뒤로 이동한 것이라면 방에서 나가기
				// console.log(direction);
				
				if(direction == '<') {
					// console.log('123');
					socket.emit('leaveGameRoom');
				}
				
				this.unbindEvents();
			},
			
			bindEvents: function() {
				var obj = this;
				
				//시작 메시지 받기
				socket.on('startTetris', function() {
					obj.startTetrisGame();
				});
			},
			
			unbindEvents: function() {
				//게임시작 버튼 이벤트 리스너 제거
				$(document).off('click', '#startGameBtn');
				
				//내 정보 받는 이벤트 리스너 제거
				socket.removeAllListeners('resultMyInfo');
				
				//유저 정보 갱신 이벤트 리스너 제거
				socket.removeAllListeners('changeUserInfo');
				
				//테트리스 시작 이벤트 리스터 제거
				socket.removeAllListeners('startTetris');
			},
			
			//현재 게임방의 정보를 가져온다.
			getInformation: function() {
				var obj = this;
				
				//서버에 내 정보 달라고 요청
				socket.emit('getMyInfo');
				
				//다른 유저 정보 달라고 요청
				socket.emit('getUserInfo');
				
				//내 정보 받을 리스너 등록
				socket.on('resultMyInfo', function(data) {
					obj.receiveMyInfo(data);
				});
				
				//유저 정보 결과 받을 리스너 등록 (이건 계속 변하기에 중간에 이벤트 제거하지 않는다.)
				socket.on('changeUserInfo', function(data) {
					obj.receiveNewUserInfo(data);
				});
			},
			
			drawUserList: function() {
				if(this.userInfo == null) return;
				
				for(var i = 0; i < 6; i++) {
					if(i < this.userInfo.length) {
						var user = this.userInfo[i];
						
						if(user.userClass == 'manager') {
							document.getElementById('plyer' +  (i + 1) +  'EntryStatus').className = 'master';
						} else {
							document.getElementById('plyer' +  (i + 1) +  'EntryStatus').className = '';
						}
					
						document.getElementById('player' + (i + 1) + 'Nickname').innerHTML = user.nickname;
						document.getElementById('player' + (i + 1) + 'Status').innerHTML = '접속완료';
						document.getElementById('player' + (i + 1) + 'Status').className = '';
					} else {
						document.getElementById('plyer' +  (i + 1) +  'EntryStatus').className = 'awaiter';
						
						document.getElementById('player' + (i + 1) + 'Nickname').innerHTML = '----------------';
						document.getElementById('player' + (i + 1) + 'Status').innerHTML = '접속대기중';
						document.getElementById('player' + (i + 1) + 'Status').className = 'awaiter';
					}
				}
			},
			
			//룸 정보를 서버로부터 받았을때 처리
			receiveNewUserInfo: function(data) {
				this.userInfo = data;
				socket.emit('getMyInfo');
				this.drawUserList();
			},
			
			//내 정보 받기
			receiveMyInfo: function(data) {
				// console.log('receive my info!');
				// console.log(data);
				var obj = this;
				
				this.myInfo = data;
				
				//방장이면 시작 버튼 생성 및 이벤트 연결
				if(this.myInfo.myClass == 'manager') {
					$(this.el).html(waitingRoomTpl + manageMenuTpl);

					//게임 시작 버튼 이벤트 연결
					$(document).on('click', '#startGameBtn', function(){
						obj.onClickedStartGameBtn();
					});
					
					this.drawUserList();
				} else {
					$(this.el).html(waitingRoomTpl + playerBottomTpl);
					this.drawUserList();
				}
				
				//룸넘버 설정
				document.getElementById('roomNumberLabel').innerHTML = this.myInfo.roomNum; 
			},
			
			//게임 시작 버튼이 눌렸을때
			onClickedStartGameBtn: function() {
				socket.emit('requestStartGame');
			},
			
			//서버로부터 시작 메시지 받으면 처리 할 메서드
			startTetrisGame: function() {
				document.location = '#playTetris';
			},
			
		});
		
		return WaitingRoomView;
	}
);
