define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!templates/joinRoom.html'
	],
	function(
		$,
		_,
		Backbone,
		joinRoomTpl
	) {
		JoinRoomView = Backbone.View.extend({
			el: $('#contents'),
			
			render: function() {
				console.log('WaitingRoomView render...');
				
				$(this.el).html(joinRoomTpl);
			},
			
			viewDidAppear: function() {
				this.bindEvents();
			},
			
			viewDidDisappear: function() {
				this.unbindEvents();
			},
			
			//새로 생성된 하면의 이벤트들 연결
			bindEvents: function() {
				var obj = this;
				
				//방만들기 버튼 이벤트 연결
				$(document).on('click', '#createRoomBtn', function(){
					obj.onClickedCreateRoomBtn();
				});
				
				//들어가기 버튼 이벤트 연결
				$(document).on('keyup', '#roomNumber', function(key) {
					obj.onKeyUp(key);
				});
			},
			
			//화면이 끝나거나 이동하기전 여기서 사용했던 이벤트 리스너들 제거
			unbindEvents: function() {
				//방만들기 이벤트 제거
				$(document).off('click', '#createRoomBtn');
				
				//들어가기 이벤트 제거
				$(document).off('keyup', '#roomNumber');
				
				//소켓 리스너 제거
				socket.removeAllListeners('resultJoinGameRoom');
				socket.removeAllListeners('resultMakeGameRoomAndJoin');
			},
			
			//방만들기 눌렸을때
			onClickedCreateRoomBtn: function() {
				var obj = this;
				
				//로직이 변경되었기 때문에 여기서 만들고 조인하게 수정
				socket.emit('makeGameRoomAndJoin');
				socket.on('resultMakeGameRoomAndJoin', function(data) {
					obj.receiveResultMakeGameRoomAndJoin(data);
				});
			},
			
			//방만들기 결과
			receiveResultMakeGameRoomAndJoin: function(data) {
				console.log(data);
				if(data.result) {
					document.location='#makeRoom';	
				} else {
					alert('방생성을 실패 하였습니다.');	
				}
			},
			
			//방번호가 입력될때
			onKeyUp: function(key) {
				var roomNumberInputField = document.getElementById('roomNumber');
				
				if(roomNumberInputField.value.length < 4) return;
				
				var obj = this;
				var roomNum = document.getElementById('roomNumber').value;
				
				document.getElementById('roomNumber').value = '';
				
				//방 들어가기 요청
				socket.emit('joinGameRoom', roomNum);
				
				//방 들어가기 결과 리스너 등록
				socket.on('resultJoinGameRoom', function(data) {
					obj.receiveJoinGameRoom(data);
				});
			},
			
			//서버로부터 대기실 들어가기 요청 결과 처리
			receiveJoinGameRoom: function(data) {
				console.log('receive join game room result...');
				socket.removeAllListeners('resultJoinGameRoom');
				console.log(data);
				
				if(data.result) {
					document.location='#waitingRoom';
				} else {
					alert(data.message);
					return;
				}
			},

		});
		
		return JoinRoomView;
	}
);
