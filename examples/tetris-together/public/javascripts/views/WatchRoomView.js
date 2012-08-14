define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!templates/watchRoom.html'
	],
	function(
		$,
		_,
		Backbone,
		watchRoomTpl
	) {
		WatchRoomView = Backbone.View.extend({
			el: $('#contents'),
			
			//constant
			COLS: 10,	//가로
			ROWS: 20,	//세로
			
			roomList: null,	//방번호
			userList: null,	//방 안에 잇는 유저의 리스트
			
			//유저의 정보가 동적으로 변경되기에 아래의 정보 추가 및 변경
			userMsgDiv: null,
			userContext: null,
			userViewDiv: null,
			userCanvas: null,
			userLampDiv: null,
			
			roomInWatcher: null,
			
			blockImages: null,
			
			currentRoomTimer: null,
			currentRoomTime: null,
			
			roomTimer: null,
			gameInfo: null,
			roomTimeTag: null,
			
			render: function() {
				console.log('WatchRoomView render...');
				
				$(this.el).html(watchRoomTpl);
			},
			
			//룸 타임을정리 한다.
			roomTimeSetting: function() {
				if(this.roomList == null || this.gameInfo == null) return;
				
				for(var i = 0; i < this.roomList.length; i++) {
					var roomNum = this.roomList[i];
					if(typeof(this.gameInfo[roomNum]) != 'undefined' && this.gameInfo[roomNum] != null) {
						var gInfo = this.gameInfo[roomNum];
						
						if(gInfo.isRunning != 'Y') {
							if(typeof(this.roomTimeTag[roomNum]) != 'undefined' && this.roomTimeTag[roomNum] != null) {
								this.roomTimeTag[roomNum].innerHTML = '게임끝';
							}
							continue;
						}
						
						var startDate = new Date(gInfo.startTime);
						var currentDate = new Date();
						
						if(typeof(this.roomTimeTag[roomNum]) != 'undefined' && this.roomTimeTag[roomNum] != null) {
							var gap = Math.floor((currentDate - startDate) / 1000) - 5;
							var gapString = this.timeFormater(gap);
							this.roomTimeTag[roomNum].innerHTML = gapString.replace(':', '분') + '초전 시작';
						}
					} else {
						if(typeof(this.roomTimeTag[roomNum]) != 'undefined' && this.roomTimeTag[roomNum] != null) {
							this.roomTimeTag[roomNum].innerHTML = '대기중';
						}
					}
				}
			},
			
			viewDidAppear: function() {
				var obj = this;
				
				this.blockImages = new Array();
				//블럭 로딩
				for(var i = 0; i < 7; i++) {
					var img = new Image();
					switch(i){
						case 0:
							img.src = '/images/block_b.png';
							break;
						case 1:
							img.src = '/images/block_g.png';
							break;
						case 2:
							img.src = '/images/block_o.png';
							break;
						case 3:
							img.src = '/images/block_r.png';
							break;
						case 4:
							img.src = '/images/block_sb.png';
							break;
						case 5:
							img.src = '/images/block_y.png';
							break;
						case 6:
							img.src = '/images/block_b.png';
							break;
					}
					
					this.blockImages.push(img);					
				}
				
				this.bindEvents();
				
				//관전 룸에 입장 요청
				socket.emit('requestJoinToWatchRoom');
				
				//서버에 룸 리스트 요청
				socket.emit('requestRoomList');
				
				//룸 리스트 받기 리스너 등록
				socket.on('responseRoomList', function(data) {
					obj.receiveRoomList(data);
				});
				
				//새로운 게임 데이터를 받아온다.
				socket.on('eventOccured', function(data) {
					obj.responseEvent(data);
				});
				
				//유저 리스트 가져오리 리스너 등록
				socket.on('responseUserListinRoom', function(data) {
					obj.receiveUserListInRoom(data);
				});
				
				this.roomTimer = setInterval(function() {
					obj.roomTimeSetting();
				}, 1000);
				
				socket.on('resultGameINfo', function(data) {
					console.log(data);
					obj.gameInfo = data;
				});
			},
			
			viewDidDisappear: function() {
				socket.emit('requestLeaveToWatchRoom');
				
				this.unbindEvents();
				
				socket.removeAllListeners('responseRoomList');
				socket.removeAllListeners('responseUserListinRoom');
				socket.removeAllListeners('eventOccured');
				socket.removeAllListeners('resultGameINfo');
				
				clearInterval(this.roomTimer);
			},
			
			//새로 생성된 하면의 이벤트들 연결
			bindEvents: function() {
			},
			
			//화면이 끝나거나 이동하기전 여기서 사용했던 이벤트 리스너들 제거
			unbindEvents: function() {
			},
			
			//소켓으로부터 방 리스트를 제공 받음
			receiveRoomList: function(data) {
				// console.log(data);
				var roomList = data.roomList;
				this.gameInfo = data.gameInfo;
				
				var obj = this;
				
				this.roomTimeTag = null;
				this.roomTimeTag = {};
				
				//기존에 버튼이 있다면 기존 버튼 지우기
				if(this.roomList != null && this.roomList.length != 0) {
					//기존 이벤트 제거
					//이벤트 연결
					for(var i = 0; i < this.roomList.length; i++) {
						$(document).off('click', '#' + this.roomList[i]);
					}
					
					document.getElementById('rooms').innerHTML = '';
				}
				
				this.roomList = roomList;
				var buttons = new Array();
				
				//버튼 만들어서 넣기
				for(var i = 0; i < roomList.length; i++) {
					var roomButton = '<li class="current"><a id="' + roomList[i] + '"><p class="room-num">' + roomList[i] + '</p><p class="room-time" id="roomTimeTag' + i + '"></p></a></li>';
					buttons.push(roomButton);
					// var button = '<input type="button" id="' + roomList[i] + '" value="' + roomList[i] + '" />'
					// buttons.push(button);
				}
				
				document.getElementById('rooms').innerHTML = buttons.join('');
				
				//이벤트 연결
				for(var i = 0; i < roomList.length; i++) {
					this.roomTimeTag[roomList[i]] = document.getElementById('roomTimeTag' + i);
					
					$(document).on('click', '#' + roomList[i], function(event) {
						obj.onClickedRoomButton(event);
					})
				}
			},
			
			//방번호를 클릭 하였을때
			onClickedRoomButton: function(event) {
				clearInterval(this.currentRoomTimer);
				this.currentRoomTimer = null;
				
				var roomNum = event.currentTarget.id;
				this.roomInWatcher = roomNum;
				var obj = this;
				
				document.getElementById('roomNumTag').innerHTML = this.roomInWatcher;
				
				console.log('enter room number : ' + this.roomInWatcher + '!');
				this.clearAllCanvas();
				
				socket.emit('requestUserListInRoom', this.roomInWatcher);
			},
			
			//방안에 유저들 정보 가져오기
			receiveUserListInRoom: function(result) {
				clearInterval(this.currentRoomTimer);
				this.currentRoomTimer = null;
				
				var obj = this;
				
				var userList = result.userInfo;
				
				var mapper = {};
				
				var tagArray = new Array();
				
				userViewDiv = {};
				userMsgDiv = {};
				userCanvas = {};
				userContext = {};
				userLampDiv = {};
				
				switch(userList.length) {
					case 2:
						document.getElementById('palyerCntSettingTag').className = 'game-view play-room2'
						break;
					case 3:
						document.getElementById('palyerCntSettingTag').className = 'game-view play-room3'; 
						break;
					case 4:
						document.getElementById('palyerCntSettingTag').className = 'game-view play-room4'; 
						break;
					default:
						document.getElementById('palyerCntSettingTag').className = 'game-view'; 
						break;
				}
				
				for(var i = 0; i < 6; i++) {
					document.getElementById('lamp' + i + 'DivTag').style.display = 'none';
				}
				
				//태그 구성해서 유저 룸 만들어 주기
				for(var i = 0; i < userList.length; i++) {
					if(i == 0) {
						var htmlCode = '<li><div id="user' + i + '"><canvas id=user' + i + 'Canvas">Your browser is not support html5 canvas</canvas><div class="lank" style="display:none;" id="user' + i + 'MsgDiv"></div><div class="onner"><img src="../images/ico/ico_onner.png" alt="" /></div></div></li>';
					} else {
						var htmlCode = '<li><div id="user' + i + '"><canvas id=user' + i + 'Canvas">Your browser is not support html5 canvas</canvas><div class="lank" style="display:none;" id="user' + i + 'MsgDiv"></div></div></li>';
					}
					
					tagArray.push(htmlCode);
				}
				
				document.getElementById('roomListTag').innerHTML = tagArray.join('');
				
				for(var i = 0; i < userList.length; i++) {
					var userId = userList[i].userId;
					
					userViewDiv[userId] = document.getElementById('user' + i);
					userViewDiv[userId].className = 'player' + (i + 2);
					userMsgDiv[userId] = document.getElementById('user' + i + 'MsgDiv');
					userLampDiv[userId] = document.getElementById('lamp' + i + 'DivTag');
					
					userLampDiv[userId].style.display = 'block';
					
					/*
					 * 왜 그런지 모르겠지만  getElementById 로 canvas가 안찾아져서 자식 노드 뒤지는걸로 변경
					 */
					for (var j = 0; j < userViewDiv[userId].childNodes.length; j++) {
						if(userViewDiv[userId].childNodes[j].nodeName.toUpperCase() == 'CANVAS') {
							userCanvas[userId] = userViewDiv[userId].childNodes[j];
							break;
						}
					}
					
					userCanvas[userId].width = userViewDiv[userId].offsetWidth * 0.975;
					userCanvas[userId].height = userViewDiv[userId].offsetHeight * 0.975;
					
					userContext[userId] = userCanvas[userId].getContext('2d');
				}
								
				this.userViewDiv = userViewDiv;
				this.userMsgDiv = userMsgDiv;
				this.userCanvas = userCanvas;
				this.userContext = userContext;
				this.userLampDiv = userLampDiv;
				
				//현재 게임이 진행중이라면
				if(result.gameInfo != null) {
					// currentRoomTimer: null,
					// currentRoomTime: null,
					
					if(result.gameInfo.isRunning == 'Y') {
						this.currentRoomTime = Math.floor((new Date() - new Date(result.gameInfo.startTime)) / 1000);
						this.currentRoomTime = this.currentRoomTime - 5;
						
						document.getElementById('roomRunningTimeTag').innerHTML = this.timeFormater(this.currentRoomTime);
						
						this.currentRoomTimer = setInterval(function() {
							document.getElementById('roomRunningTimeTag').innerHTML = obj.timeFormater(++obj.currentRoomTime);
						}, 1000);
					} else {
						document.getElementById('roomRunningTimeTag').innerHTML = '게임끝';
						for(var i = 0; i < 6; i++) {
							document.getElementById('lamp' + i + 'DivTag').style.display = 'none';
						}
					}
					
					for(var i = 0; i < userList.length; i++) {
						if(typeof(userList[i].boardData) == 'undefeind' || userList[i].boardData == null) continue;
						this.drawGamerBlock(userList[i]);
					}
					
					var gInfo = result.gameInfo;
					// console.log(gInfo);
					
					for(var i = 0; i < gInfo.gameOverPlayerList.length; i++) {
						var goPlayerId = gInfo.gameOverPlayerList[i];
						var userRank = gInfo.playerCnt - i;
						
						this.userMsgDiv[goPlayerId].style.display = 'block';
						if(userRank == 1) {
							this.userMsgDiv[goPlayerId].innerHTML = '<p class="end-time">' + this.timeFormater(gInfo.gameOverPlayerTime[i]) + '</p><p>WIN</p>';
						} else {
							this.userMsgDiv[goPlayerId].innerHTML = '<p class="end-time">' + this.timeFormater(gInfo.gameOverPlayerTime[i]) + '</p><p>'+ userRank + '등</p>';
						}
						this.userLampDiv[goPlayerId].style.display = 'none';
					}
					
				} else {	//현재 게임이 진행중이지 않다면
					document.getElementById('roomRunningTimeTag').innerHTML = "대기중";
					for(var i = 0; i < 6; i++) {
						document.getElementById('lamp' + i + 'DivTag').style.display = 'none';
					}
				}
			},
			
			timeFormater: function(time) {
				if(time < 0) return '00:00';
				
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
			
			//게이머의 블럭 그려주기
			drawGamerBlock: function(event) {				
				var canvas = this.userCanvas[event.userId];
				var context = this.userContext[event.userId];
				
				var blockWidth = canvas.width / this.COLS;
				var blockHeight = canvas.height / this.ROWS;
				
				context.clearRect(0, 0, canvas.width, canvas.height);
				
				var boardData = event.boardData;
				
				for(var x = 0; x < this.COLS; x++) {
					for(var y = 0; y < this.ROWS; y++) {
						if(boardData[y][x]) {
							var blockImageIdx = boardData[y][x] - 1;
							context.drawImage(this.blockImages[blockImageIdx], blockWidth * x, blockHeight * y, blockWidth, blockHeight);
						}
					}
				}
			},
			
			//모든 켄버스 초기화
			clearAllCanvas: function() {
				userMsgDiv = null;
				userContext = null;
				userViewDiv = null;
				userCanvas = null;
				userLampDiv = null;
			},
			
			//게임 정보가 변경되었을 때 처리
			responseEvent: function(event) {
				switch(event.type) {
					case 'changeBlockState':
						if(this.userMsgDiv == null || typeof(this.userMsgDiv[event.userId]) == 'undefined') break;	//id 체크 후 현재 내가 보는 방의 유저가 아니면 패스
						this.drawGamerBlock(event);
						break;
					case 'gameOver':
						socket.emit('getGameInfo');
					
						// console.log(event);
						if(this.userMsgDiv == null || typeof(this.userMsgDiv[event.userId]) == 'undefined') break;	//id 체크 후 현재 내가 보는 방의 유저가 아니면 패스
						this.drawGamerBlock(event);
						
						this.userMsgDiv[event.userId].style.display = 'block';
						
						if(event.userRank == 1) {
							this.userMsgDiv[event.userId].innerHTML = '<p class="end-time">' + this.timeFormater(event.playTime) + '</p><p>WIN</p>';
							clearInterval(this.currentRoomTimer);
							this.currentRoomTimer = null;
						} else {
							this.userMsgDiv[event.userId].innerHTML = '<p class="end-time">' + this.timeFormater(event.playTime) + '</p><p>'+ event.userRank + '등</p>';
						}
						
						// console.log(this.userLampDiv);
						this.userLampDiv[event.userId].style.display = 'none';
						
						break;
					case 'removeRoom':
						if(event.roomNum == this.roomInWatcher) {
							clearInterval(this.currentRoomTimer);
							this.currentRoomTimer = null;
							this.userList = null;
							this.clearAllCanvas();
						}	//현재 관람중인 방이 없어졌다면
						socket.emit('requestRoomList');
						break;
					case 'changeRoomList':
						socket.emit('requestRoomList');
						break;
					case 'changeUserList':
						if(this.roomInWatcher == event.roomNum) {
							clearInterval(this.currentRoomTimer);
							this.currentRoomTimer = null;
							socket.emit('requestUserListInRoom', this.roomInWatcher);	
						}
						break;
					case 'roomInfoChange':
						socket.emit('getGameInfo');
						
						if(this.roomInWatcher == event.roomNum) {
							clearInterval(this.currentRoomTimer);
							this.currentRoomTimer = null;
							socket.emit('requestUserListInRoom', this.roomInWatcher);
						}
						break;
				}

			},
			
		});
		
		return WatchRoomView;
	}
);
