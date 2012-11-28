define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!templates/makeRoom.html'
	],
	function(
		$,
		_,
		Backbone,
		makeRoomTpl
	) {
		MakeRoomView = Backbone.View.extend({
			el: $('#contents'),
			
			roomNum: null,
			
			render: function() {
				console.log('MakeRoomView render...');
				
				$(this.el).html(makeRoomTpl);
			},
			
			viewDidAppear: function() {
				var obj = this;
				
				this.bindEvents();
				
				//서버에 내 정보 달라고 요청
				socket.emit('getMyInfo');
				
				//내 정보 받을 리스너 등록
				socket.on('resultMyInfo', function(data) {
					obj.receiveMyInfo(data);
				});
			},
			
			viewDidDisappear: function(direction) {
				if(direction == '<') {
					socket.emit('leaveGameRoom');
				}
				
				this.unbindEvents();
			},
			
			receiveMyInfo: function(data) {
				if(data.result) {
					document.getElementById('roomNumber').value = data.roomNum;	
				}
			},
			
			bindEvents: function() {
				var obj = this;
				
				//대기방 입장 이벤트 연결
				$(document).on('click', '#enterRoomBtn', function() {
					obj.onClickedEnterRoomBtn();
				});
			},
			
			unbindEvents: function() {
				//대기방 입장 이벤트 제거
				$(document).off('click', '#enterRoomBtn');
				
				socket.removeAllListeners('resultMyInfo');
			},
			
			//대기방 입장 버튼 클릭시 처리 내용
			onClickedEnterRoomBtn: function() {
				document.location='#waitingRoom';

			},
			
		});
		
		return MakeRoomView;
	}
);