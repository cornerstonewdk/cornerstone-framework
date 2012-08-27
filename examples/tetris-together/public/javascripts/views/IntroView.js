define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!templates/intro.html'
	],
	function(
		$,
		_,
		Backbone,
		introTpl
	) {
		IntroView = Backbone.View.extend({
			el: $('#contents'),
			
			render: function() {
				console.log('IntroView render...');
				
				$(this.el).html(introTpl);
			},
			
			viewDidAppear: function() {
				this.bindEvents();
			},
			
			viewDidDisappear: function() {
				this.unbindEvents();
			},
			
			bindEvents: function() {
				var obj = this;
				
				//시작 버튼 이벤트 연결
				$(document).on('keydown', '#nickname', function(key) {
					obj.onKeyDown(key);
				});
			},
			
			//화면이 끝나거나 이동하기전 여기서 사용했던 이벤트 리스너들 제거
			unbindEvents: function() {
				$(document).off('keydown', '#nickname');
				
				//소켓 리스너 제거
				socket.removeAllListeners('resultNickname');
			},
			
			//시작 버튼 눌렸을때 처리 내용
			onKeyDown: function(key) {
				if(key.keyCode != 13) {
					return;	//엔터키가 올때까지 무시
				}
				
				document.getElementById('commonAudio').load();
				
				var obj = this;
				
				var nickname = document.getElementById('nickname').value;
				
				//별명 입력 체크
				if(!nickname) {
					alert('별명을 입력해 주세요!');
					return;
				}
				
				socket.emit('setNickname', nickname);
				
				//이벤트 한번 받고 이벤트 리스터 제거 위해 once 사용
				socket.once('resultNickname', function(data) {
					if(data) {
						console.log('별명이 성공적으로 등록되었습니다.');
						obj.gotoJoinRoom();
					} else {
						alert('별명 등록이 실패 하였습니다.');
						nickname.value = '';
					}
				});
			},
			
			//방들어가기 화면으로 이동
			gotoJoinRoom: function() {
				document.location='#joinRoom';
			},
			
			clickedTestBtn: function() {
				this.unbindEvents();
				document.location='#playTetris';
			},
			
		});
		
		return IntroView;
	}
);
