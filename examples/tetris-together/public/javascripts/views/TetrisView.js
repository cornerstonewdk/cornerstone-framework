define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!templates/tetris.html',
		'tetris/TetrisClass',
		'tetris/TouchUtil',
	],
	function(
		$,
		_,
		Backbone,
		tetrisTpl
	) {
		TetrisView = Backbone.View.extend({
			el: $('#contents'),
			
			tetris: null,
			
			canvas: null,
			nextBlockCanvas: null,
			nextNextBlocksCanvas: null,
			
			touchUtil: null,
			
			//카운트 타이머
			countTimer: null,
			count: 0,
			
			myInfo: null,

			render: function() {
				console.log('tetrisview render...');
				
				$(this.el).html(tetrisTpl);
				
				this.canvas = document.getElementById('canvasView');
				this.nextBlockCanvas = document.getElementById('nextBlockCanvasView');
				this.nextNextBlocksCanvas = document.getElementById('nextNextBlocksCanvasView');

				//캔버스 크기 정하기
				var tetrisDiv = document.getElementById('tetrisBackDiv');
				// this.canvas.width = tetrisDiv.offsetWidth;
				this.canvas.height = tetrisDiv.offsetHeight;
				
				var tetrisNextDiv = document.getElementById('tetrisNextBackDiv');
				// this.nextBlockCanvas.width = tetrisNextDiv.offsetWidth;
				this.nextBlockCanvas.height = tetrisNextDiv.offsetHeight;
				
				var tetrisNextNextDiv = document.getElementById('tetrisNextNextBackDiv');
				// this.nextNextBlocksCanvas.width = tetrisNextNextDiv.offsetWidth;
				this.nextNextBlocksCanvas.height = tetrisNextNextDiv.offsetHeight;
				
				this.tetris = new TetrisClass(this.canvas, this.nextBlockCanvas, this.nextNextBlocksCanvas);
				this.touchUtil = new TouchUtil(this.tetris.BLOCK_W, this.tetris.BLOCK_H);
			},
			
			viewDidAppear: function() {
				var obj = this;
				
				//내정보 받아옴
				socket.emit('getMyInfo');
				socket.on('resultMyInfo', function(data) {
					obj.myInfo = data;
					document.getElementById('roomNumTag').innerHTML = data.roomNum;
					document.getElementById('palyerNickname').innerHTML = data.nickname;
				});
				
				this.bindEvents();
				this.startTetris();
				
				if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
					window.scrollTo(0, 30);
				}
			},
			
			viewDidDisappear: function() {
				this.tetris.retire();
				this.unbindEvents();
			},
			
			bindEvents: function() {
				var obj = this;
				
				//키보드 이벤트 연결
				$(document).on('keydown', 'body', function(key){
					obj.pressedKey(key);
				});
				
				$(document).on('touchstart', 'body', function(event) {
					obj.touchUtil.touchStart(event.originalEvent);
				});
				$(document).on('touchmove', 'body', function(event) {
					event.preventDefault();
					obj.touchUtil.touchMove(event.originalEvent);
				});
				$(document).on('touchend', 'body', function(event) {
					obj.touchUtil.touchEnd(event.originalEvent);
				});

				this.touchUtil.on(this, 'receiveTouchEvent');
				
				//테트리스 게임 이벤트 메시지 리스너 등록
				socket.on('tetrisEvent', function(event) {
					obj.receiveTetrisEvent(event);
				});
			},
			
			unbindEvents: function() {
				//키보드 이벤트 해제
				$(document).off('keydown', 'body');
				
				$(document).off('click', '#newGameButton1');
				$(document).off('click', '#newGameButton2');
				
				//터치 이벤트 해제
				this.touchUtil.off(this, 'receiveTouchEvent');
				
				//테트리스 이벤트 리스너 해제
				socket.removeAllListeners('tetrisEvent');
				
				socket.removeAllListeners('resultMyInfo');
				
				$(document).off('touchstart', 'body');
				$(document).off('touchmove', 'body');
				$(document).off('touchend', 'body');
			},
			
			//터치 이벤트 왔을시 처리 메서드
			receiveTouchEvent: function(touch) {
				switch(touch.touchEvent) {
					case 'tap':
						this.tetris.rotateBlock();
						break;
					case 'leftSwipe':
						this.tetris.moveLeft(1);
						break;
					case 'rightSwipe':
						this.tetris.moveRight(1);
						break;
					case 'downSwipe':
						//this.tetris.moveDown(1);
						this.tetris.moveBottom();
						break;
				};
			},
			
			//테트리스 시작
			startTetris: function() {
				var obj = this;
				this.count = 0;
				
				this.countTimer = setInterval(function() {
					obj.counterFn();
				}, 1000);
				
				
			},
			
			counterFn: function() {
				var dountDiv1 = document.getElementById('countdown1');
				var dountDiv2 = document.getElementById('countdown2');
				
				this.count++;
				
				switch(this.count) {
					case 1:
						dountDiv1.style.display = 'block';
						dountDiv1.innerHTML = '3';
						document.getElementById('commonAudio').play();
						break;
					case 2:
						dountDiv1.innerHTML = '2';
						document.getElementById('commonAudio').src = '/audio/2.wav';
						document.getElementById('commonAudio').load();
						document.getElementById('commonAudio').play();
						break;
					case 3:
						dountDiv1.innerHTML = '1';
						document.getElementById('commonAudio').src = '/audio/1.wav';
						document.getElementById('commonAudio').load();
						document.getElementById('commonAudio').play();
						break;
					case 4:
						dountDiv1.style.display = 'none';
						dountDiv2.style.display = 'block';
						document.getElementById('commonAudio').src = '/audio/go.mp3';
						document.getElementById('commonAudio').load();
						document.getElementById('commonAudio').play();
						break;
					case 5:
						dountDiv2.style.display = 'none';
						this.tetris.startTetris();
						this.tetris.bgAudio.play();
						clearInterval(this.countTimer);
						this.countTimer = null;
						break;
				}
			},
			
			//키 이벤트 수신시 처리 메서드
			pressedKey: function(key) {
				switch(key.keyCode) {
					case 37:
						if(this.tetris != null){
							event.preventDefault();
							this.tetris.moveLeft(1);
						}
						break;
					case 39:
						if(this.tetris != null){
							event.preventDefault();
							this.tetris.moveRight(1);
						}
						break;
					case 40:
						if(this.tetris != null){
							event.preventDefault();
							this.tetris.moveDown(2);
						}
						break;
					case 38:
						if(this.tetris != null){
							event.preventDefault();
							this.tetris.rotateBlock();
						}
						break;
					case 32:
						if(this.tetris != null) {
							event.preventDefault();
							this.tetris.moveBottom();
						}
						break;
				}
			},
			
			//서버로부터 이벤트 받은거 처리 메서드
			receiveTetrisEvent: function(event) {
				var obj = this;
				
				switch(event.type) {
					case 'gameOver':
						//내꺼인지 체크
						if(this.myInfo.userId == event.playerId) {
							if (event.playerRank == 1) {
								document.getElementById('gameResultWinner').style.display = 'block';
								document.getElementById('gameResultWinnerTime').innerHTML = this.timeFormater(event.playTime);
							} else{
								document.getElementById('gameResultNotWinner').style.display = 'block';
								document.getElementById('gameResultNotWinnerRank').innerHTML = event.playerRank + '등';
								document.getElementById('gameResultNotWinnerTime').innerHTML = this.timeFormater(event.playTime);
							}
						} else {
							//내꺼가 아니면 화면에 표시만 잠깐 해줌
							this.gameOverNoti(event);
							
							//만약 게임오버 된놈이 2등이라면 내꺼 종료
							if(event.playerRank == 2) {
								obj.tetris.gameOver();
							}
						}
						
						//게임이 끝났으면
						if(this.myInfo.myClass == 'manager' && event.playerRank == 1) {
							if(this.myInfo.userId == event.playerId) {
								document.getElementById('newGameButton1').style.visibility = 'visible';
								$(document).on('click', '#newGameButton1', function(){
									obj.goToWaitRoom();
								});
							} else {
								document.getElementById('newGameButton2').style.visibility = 'visible';
								$(document).on('click', '#newGameButton2', function(){
									obj.goToWaitRoom();
								});
							}
						}
						
						break;
					case 'goWaittingRoom':
						this.tetris.isNormalBack = true;
						history.back();
						break;
					case 'clearLine':
						if(this.myInfo.userId != event.userId && !this.tetris.isGameOver) {	//내가 아니고 현재 게임중이면
							this.tetris.addPenalty(event.lineCnt);
						}
						break;
				}
			},
			
			goToWaitRoom: function() {
				var data = {};
				data.type = 'goWaittingRoom';
				socket.emit('tetrisEventOccur', data);
			},
			
			timeFormater: function(time) {
				var min = 0;
				var sec = 0;
				var formattedTime = new Array();
				
				min = Math.floor(time / 60);
				sec = time % 60;
				
				if(min < 10) formattedTime.push('0');
				formattedTime.push(min);
				formattedTime.push(':');
				if(sec < 10) formattedTime.push('0');
				formattedTime.push(sec);
				
				return formattedTime.join(''); 
			},
			
			gameOverNoti: function(event) {
				var timeouter = null;
				
				/*
				 * 현재 죽어서 어떤 메시지를 뿌리고 있다면 원복시켜줘야 하기 때문에 상태값 체크
				 * 0 : 안죽고 게임 상태
				 * 1 : 1등이라고 표시중일때
				 * 2 : 1등이 아니라고 표시중일때
				 */
				// var currentStatus = 0;
// 				
				// if(document.getElementById('gameResultWinner').style.display == 'block') {
					// document.getElementById('gameResultWinner').style.display = 'none'
					// currentStatus = 1;
				// } else if(document.getElementById('gameResultNotWinner').style.display == 'block') {
					// document.getElementById('gameResultNotWinner').style.display = 'none'
					// currentStatus = 2;
				// } else {
					// currentStatus = 0;
				// }
				
				var notiDiv = document.getElementById('dropOut');
				
				document.getElementById('dropTime').innerHTML = this.timeFormater(event.playTime);
				document.getElementById('dropMsg').innerHTML = event.message;
				notiDiv.style.display = 'block';
				
				timeouter = setTimeout(function(){
					notiDiv.style.display = 'none';
					
					// if(currentStatus == 1) {
						// document.getElementById('gameResultWinner').style.display = 'block';
					// } else if(currentStatus == 2) {
						// document.getElementById('gameResultNotWinner').style.display = 'block';
					// }
				}, 1500);
			},
					
		});
		
		return TetrisView;
	}
);
