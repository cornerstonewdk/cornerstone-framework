
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var socketio = require('socket.io');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);    
  app.use(express.static(__dirname + '/public'));
  
  app.use(function(req, res, next){ 
    res.render('400', { status: 400, url: req.url }); 
  }); 
  app.use(function(req, res, next){ 
    res.render('401', { status: 401, url: req.url }); 
  }); 
  app.use(function(req, res, next){ 
    res.render('403', { status: 403, url: req.url }); 
  }); 
  app.use(function(req, res, next){ 
    res.render('404', { status: 404, url: req.url }); 
  }); 
  
  app.use(function(err, req, res, next){ 
    res.render('500', { 
      status: err.status || 500 
      , error: err 
    }); 
  }); 

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/watchRoom', routes.watchRoom);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var gameInfo = {};

//소켓 io 연결 및 통신 정의
var io = socketio.listen(server);
io.set('log level', 1);
io.sockets.on('connection', function(socket) {
	// console.log('connection...');
	
	socket.on('print', function(data) {
		console.log(data);
	});
	
	//별명 설정 소켓 이벤트
	socket.on('setNickname', function(data) {
		//클라이언트 소켓에 별명 저장
		socket.set('nickname', data);
		socket.set('class', 'normal');
		socket.set('gameStatus', 'n');
		
		//클라이언트 소켓에서 별명 꺼내서 비교 확인 후 결과 리턴
		var nickname = socket.get('nickname', function(err, nickname) {
			if(err) {
				console.log('error occured from setnickname socketio! error : ' + err);
				socket.emit('resultNickname', false);
			} else {
				// console.log(nickname);
				// console.log(data);
				if(nickname == data) {
					socket.emit('resultNickname', true);	
				} else {
					socket.emit('resultNickname', false);
				}
			}
		});
	});
	
	//내 별명 가져오기
	socket.on('getNickname', function(data) {
		
	});
	
	//방만들기 요청
	//방을 여기서 만들고 조인시킨다.
	socket.on('makeGameRoomAndJoin', function() {
		var result = {};
		
		//기존에 만들어진 방들의 리스트를 가져온다.
		var rooms = io.sockets.manager.rooms;
		// console.log(rooms);
		
		//랜덤 4자리 숫자를 만들어서 기존 방번호들과 비교한다.
		var isSameRoomNumber = false;
		var roomNumber = 0;
		
		do {
			roomNumber = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);
			// console.log(typeof(rooms['/' + roomNumber]));
			if(typeof(rooms['/' + roomNumber]) != 'undefined') {
				isSameRoomNumber = true;
			} else {
				isSameRoomNumber = false;
			}
		} while (isSameRoomNumber);
		
		//룸을 만들고 현재 신청한사람을 방장으로 변경 및 생성된 방번호 전송
		try {
			socket.join(roomNumber);
			socket.set('room', roomNumber);
			socket.set('class', 'manager');
			
			result.result = true;
			result.room = roomNumber;
		} catch (err) {
			console.log('error occured in makGameRoomAndJoin Event! error is : ' + err);
			result.result = false;
		}
		
		socket.set('gameStatus', 'w');
		
		socket.emit('resultMakeGameRoomAndJoin', result);
		
		var eventMsg = {};
		eventMsg.type = 'changeRoomList';
		io.sockets.in('watchroom').emit('eventOccured', eventMsg);
	});
	
	//일반인 방 들어가기 요청
	socket.on('joinGameRoom', function(data) {
		var result = {};
		
		var rooms = io.sockets.manager.rooms;
		var checkRoom = false;
		// console.log(rooms);
		// console.log('/' + data);
		// console.log(typeof(rooms['/' + data] != 'undefined'));

		if(typeof(rooms['/' + data]) != 'undefined') checkRoom = true;
		
		//생성된 방이 아니면
		if(!checkRoom) {
			result.result = false;
			result.message = data + '는 존재하는 방의 번호가 아닙니다. 다시 확인해 보세요';
			result.room = data;
		} else {
			try {
				socket.join(data);
				socket.set('room', data);
				socket.set('class', 'normal');
				
				result.result = true;
				result.room = data;
			} catch(err) {
				result.result = false;
				result.message = '방에 들어가는것을 실패 하였습니다.';
				result.room = data;
			}
		}
		
		socket.set('gameStatus', 'w');
		
		socket.emit('resultJoinGameRoom', result);
		
		var eventMsg = {};
		eventMsg.type = 'changeUserList';
		eventMsg.roomNum = data;
		io.sockets.in('watchroom').emit('eventOccured', eventMsg);
	}),
	
	//방에서 나가기 요청 (뒤로가기 등)
	socket.on('leaveGameRoom', function() {
		// console.log('leaveGameRoom...')
		try {
			var roomNum = null;
			var userClass = null;
			
			socket.get('room', function(err, room) {
				if(err) {
					throw err;
				} else {
					roomNum = room;
				}
			});
			
			var clientCnt = io.sockets.clients(roomNum).length;
			
			socket.get('class', function(err, uclass) {
				userClass = uclass;
			});
			
			socket.leave(roomNum);
			socket.set('room', '');
			socket.set('class', 'normal');	//방장일 수 도 있으니 처리
			
			//다른 유저에게 정보 전달
			var clients = io.sockets.clients(roomNum);
			var userInfo = new Array();
			
			if(clients == 1) {
				var watchEventMsg = {};
				watchEventMsg.type = 'changeRoomList';
				io.sockets.in('watchroom').emit('eventOccured', watchEventMsg);
			}
			
			for(var i = 0; i < clients.length; i++) {
				var client = clients[i];
				
				//나간사람이 방장이면 방장 권한 2등에게 이양 
				if(i == 0 && userClass == 'manager') {
					client.set('class', 'manager');
				}
				
				var nickname = null;
				var userClass = null;
				 
				client.get('nickname', function(err, data) {
					nickname = data;
				});
				
				client.get('class', function(err, data) {
					userClass = data;
				});
				
				userInfo.push({'nickname': nickname, 'userClass': userClass});
			}
			
			socket.set('gameStatus', 'n');
			
			//1명이었을때 나간거니 관전실에서 알림
			if(clientCnt == 1) {
				var eventMsg = {};
				eventMsg.type = 'removeRoom';
				eventMsg.roomNum = roomNum;
				io.sockets.in('watchroom').emit('eventOccured', eventMsg);
			}
			
		}catch(err) {
			
		}
		
		io.sockets.in(roomNum).emit('changeUserInfo', userInfo);
	});
	
	//내 정보 요청
	socket.on('getMyInfo', function() {
		var result = {};
		
		try {
			var roomNum = null;
			
			socket.get('room', function(err, room) {
				if(err) {
					throw err;
				} else {
					roomNum = room;
					result.roomNum = room;
				}
			});
			
			socket.get('class', function(err, myClass) {
				result.myClass = myClass;	
			});
			
			socket.get('nickname', function(err, data) {
				result.nickname = data;
			});
			
			result.userId = socket.id;
			
			result.result = true;
		} catch(err) {
			
		}
		
		socket.emit('resultMyInfo', result);
	}),
	
	//유저 정보 달라고 요청
	socket.on('getUserInfo', function() {
		// console.log('getRoomInfo request receved...');
		
		var result = {};
		
		try {
			var roomNum = null;
			
			socket.get('room', function(err, room) {
				if(err) {
					throw err;
				} else {
					roomNum = room;
					result.roomNum = room;
				}
			});
			
			socket.get('class', function(err, myClass) {
				result.myClass = myClass;	
			});
			
			// var sockets = io.sockets.in(roomNum);
			var clients = io.sockets.clients(roomNum);
			
			var userInfo = new Array();
			
			for(var i = 0; i < clients.length; i++) {
				var client = clients[i];
				
				var nickname = null;
				var userClass = null;
				 
				client.get('nickname', function(err, data) {
					nickname = data;
				});
				
				client.get('class', function(err, data) {
					userClass = data;
				});
				
				userInfo.push({'nickname': nickname, 'userClass': userClass});
			}
		} catch (err) {
			
		}
		
		//새로 갱신되었으니 다른 유저에게도 데이터 뿌림
		io.sockets.in(roomNum).emit('changeUserInfo', userInfo);
	});
	
	//게임 시작 요청
	socket.on('requestStartGame', function() {
		var roomNum = null;
			
		socket.get('room', function(err, room) {
			if(err) {
				throw err;
			} else {
				roomNum = room;
			}
		});
		
		var clients = io.sockets.clients(roomNum);
		for(var i = 0; i < clients.length; i++) {
			var client = clients[i];
			socket.set('gameStatus', 'n');
		}
		
		var gInfo = {};
		gInfo.roomNum = roomNum;
		gInfo.playerCnt = clients.length;
		gInfo.gameOverPlayerCnt = 0;
		gInfo.gameOverPlayerList = new Array();
		gInfo.gameOverPlayerTime = new Array();
		gInfo.startTime = new Date();
		gInfo.isRunning = 'Y';
		
		gameInfo[roomNum] = gInfo;
			
		io.sockets.in(roomNum).emit('startTetris');
		
		var watchRoomMsg = {};
		watchRoomMsg.type = 'roomInfoChange';
		watchRoomMsg.roomNum = roomNum;
		io.sockets.in('watchroom').emit('eventOccured', watchRoomMsg);
	});
	
	//현재 개설되어 있는 게임방의 리스트 요청
	socket.on('requestRoomList', function(){
		var rooms = io.sockets.manager.rooms;
		
		var msg = {};
		
		// console.log(rooms);
		
		var roomsArray = new Array();
		
		for(var room in rooms) {
			if(room == '' || room == '/watchroom') continue;
			
			roomsArray.push(room.replace(/\//g, ''));
		}
		
		msg.roomList = roomsArray;
		msg.gameInfo = gameInfo;
		
		
		socket.emit('responseRoomList', msg);
	});
	
	//룸넘버로 안의 유저 리스트 요청
	socket.on('requestUserListInRoom', function(data) {
		var clients = io.sockets.clients(data);
		var result = {};
		var roomNum = data;
		var userInfo = new Array();
		
		if(typeof(gameInfo[roomNum]) != 'undefined' || gameInfo[roomNum] != null) {
			result.gameInfo = gameInfo[roomNum];
		} else {
			result.gameInfo = null;
		}
		
		for(var i = 0; i < clients.length; i++) {
			var client = clients[i];
			
			var nickname = null;
			var userClass = null;
			var boardData = null;
			 
			client.get('nickname', function(err, data) {
				nickname = data;
			});
			
			client.get('class', function(err, data) {
				userClass = data;
			});
			
			client.get('boardData', function(err, data) {
				if(err) {
					boardData = null;
				} else {
					boardData = data;
				}
			});
			
			userInfo.push({'nickname': nickname, 'userClass': userClass, 'userId': client.id, 'boardData': boardData});
		}
		
		result.userInfo = userInfo;
		
		socket.emit('responseUserListinRoom', result);
	});
	
	//관전룸에 입장 요청
	socket.on('requestJoinToWatchRoom', function() {
		socket.set('room', 'watchroom');
		socket.set('class', 'watcher');
		socket.join('watchroom');
	});
	
	//관전룸 나가기 요청
	socket.on('requestLeaveToWatchRoom', function() {
		socket.set('room', '');
		socket.set('class', 'normal');
		socket.leave('watchroom');
	});
	
	socket.on('getGameInfo', function(){
		socket.emit('resultGameINfo', gameInfo);
	});
	
	//게이머의 테트리스 정보 변경이벤트 수신
	socket.on('tetrisEventOccur', function(event) {
		var userId = socket.id;
		var eventMsg = {};
		
		var roomNum = null;
		socket.get('room', function(err, data) {
			if(err) {
				console.log(err);
				return;
			}
			
			roomNum = data;
		})
		
		var playerNickname = null;
		socket.get('nickname', function(err, data) {
			if(err) {
				console.log(err);
				return;
			}
			playerNickname = data;
		});
		
		// console.log(event.type);
		// console.log(roomNum);
		// console.log(playerNickname);

		switch(event.type) {
			case 'changeBlockState':
				socket.set('boardData', event.boardData);
				eventMsg.type = 'changeBlockState';
				eventMsg.userId = userId;
				eventMsg.boardData = event.boardData;
				io.sockets.in('watchroom').emit('eventOccured', eventMsg);
				break;
			case 'gameOver':
				socket.set('boardData', event.boardData);
				eventMsg.type = 'gameOver';
				eventMsg.userId = userId;
				eventMsg.boardData = event.boardData;
				eventMsg.playTime = event.playTime;
				
				//현재 순위 판별
				var gInfo = gameInfo[roomNum];
				
				if (typeof(gInfo) == 'undefined') {
					return;
				}
				
				// console.log(gInfo);
				
				gInfo.gameOverPlayerCnt++;
				gInfo.gameOverPlayerList.push(userId);		//게임 오버된 User의 ID 전송
				gInfo.gameOverPlayerTime.push(event.playTime);
				
				var rank = gInfo.playerCnt - gInfo.gameOverPlayerCnt + 1;
				var msg = {};
				msg.type = 'gameOver';
				msg.playerRank = rank;
				msg.playerNickname = playerNickname;
				msg.playerId = userId;
				msg.playTime = event.playTime;
				
				// console.log(msg);
				
				var message = new Array();
				message.push(playerNickname);
				message.push('님이 ');
				message.push(rank);
				message.push('등으로<br>');
				message.push(rank == 1 ? '승리하였습니다.' : '탈락하엿습니다.');
				// msg.message = playerNickname + ' is game over!';
				msg.message = message.join('');
				
				io.sockets.in(roomNum).emit('tetrisEvent', msg);
				
				if(rank == 1) {
					gInfo.isRunning = 'N';
				}
				
				// if(gInfo.playerCnt - gInfo.gameOverPlayerCnt < 1) {
					// var winMsg = {};
					// msg.type = 'gameWin';
// 					
					// var players = io.sockets.clients(roomNum);
// 					
					// for(var i = 0; i < players.length; i++) {
						// var player = players[i];
						// if(typeof(gInfo[player.id]) == 'undefined') {
							// var winPlayerNickname = player.get('nickname', function(err, data) {
								// msg.playerNickname = data;
							// });
						// }
					// }
// 					
					// io.sockets.in(roomNum).emit('tetrisEvent', msg);
				// }
				
				eventMsg.userRank = rank;	//관전실에도 보냄
				eventMsg.message = message.join('');
				
				io.sockets.in('watchroom').emit('eventOccured', eventMsg);
				break;
			case 'goWaittingRoom':
				var msg = {};
				msg.type = 'goWaittingRoom';
				io.sockets.in(roomNum).emit('tetrisEvent', msg);
				
				var clients = io.sockets.clients(roomNum);
				for (var i = 0; i < clients.length; i++) {
					clients[i].set('boardData', null);
				}
				
				//여기서 게임정보 없애기
				if(typeof(gameInfo[roomNum]) != 'undefined') {
					gameInfo[roomNum] = null;	
				}
				
				var watchRoomMsg = {};
				watchRoomMsg.type = 'roomInfoChange';
				watchRoomMsg.roomNum = roomNum;
				io.sockets.in('watchroom').emit('eventOccured', watchRoomMsg);
				
				break;
			case 'clearLine':  	//라인 삭제를 했을때 보내기
				var tEventMsg = {};
				tEventMsg.type = 'clearLine';
				tEventMsg.userId = userId;
				tEventMsg.lineCnt = event.lineCnt;
				io.sockets.in(roomNum).emit('tetrisEvent', tEventMsg);
				break;
			default:
				console.log('Unknown event : ');
				console.log(event);
				break;
		}
		
	});
	
});