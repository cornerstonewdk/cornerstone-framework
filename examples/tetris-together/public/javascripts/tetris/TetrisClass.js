var TetrisClass = Class.create({
	
	//constant
	COLS: 10,	//가로
	ROWS: 20,	//세로
	
	imageBlockYn: false,	//블럭을 이미지를 사용할것인지 여부
	
	lineWidth: 2,
	nextLineWidth: 1,
	
	MAX_SPEED: 300,
	
	W: null,		//켄버스 가로길이
	H: null,		//켄버스 세로길이
	
	BLOCK_W: null,	//블럭구성 박스의 가로
	BLOCK_H: null,	//블럭구성 박스의 세로
	
	mNextBlockWidht: null,
	mNextBlockHeight: null,
	
	mNextNextBlockWidht: null,
	mNextNextBlockHeight: null,
	
	board: null,	//배경
	
	current: null,	//현재 블럭
	currnetBlockId: null,
	currentX: null,	//현재 블럭의 좌표 X
	currentY: null,	//현재 블럭의 좌표 Y
	
	canvas: null,		//켄버스 객체
	context: null,		//켄버스의 컨텍스트 객체
	
	nextBlockCanvas: null,
	nextBlockContext: null,
	nextNextBlocksCanvas: null,
	nextNextBlocksContext: null,
	
	tickTimer: null,	//블럭 움직이게 하는 타이머
	playTimer: null,	//플레이 시간 타이머
	renderTimer: null,	//그려주기 타이머
	
	isNormalBack: false,
	isGameOver: false,
	
	sendServerYn: false,	//이것이 true면 서버에 정보 보내기
	
	bgAudio: null,		//백그라운드 음악
	
	gameSpeed: 1000,
	
	shapes: [
		[1, 1, 1, 1],
		[ 1, 1, 1, 0,
	      1 ],
	    [ 1, 1, 1, 0,
	      0, 0, 1 ],
	    [ 1, 1, 0, 0,
	      1, 1 ],
	    [ 1, 1, 0, 0,
	      0, 1, 1 ],
	    [ 0, 1, 1, 0,
	      1, 1 ],
	    [ 0, 1, 0, 0,
	      1, 1, 1 ]
	],
	
	colors: ['cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'],
	
	blockImages: null,
	
	//다음 내려올 블럭 리스트
	blockQueue: null,
	
	tickCnt: 0,
	playTime: 0,
	
	//생성자
	initialize: function(canvas, nextBlockCanvas, nextNextBlocksCanvas) {
		this.canvas = canvas;
		
		this.W = canvas.width;
		this.H = canvas.height;
		
		this.nextBlockCanvas = nextBlockCanvas;
		this.nextNextBlocksCanvas = nextNextBlocksCanvas;
		
		this.mNextBlockWidht = nextBlockCanvas.width / 4;
		this.mNextBlockHeight = nextBlockCanvas.height / 4;
		
		this.mNextNextBlockWidht = nextNextBlocksCanvas.width / 4;
		this.mNextNextBlockHeight = nextNextBlocksCanvas.height / 8;
		
		this.context = this.canvas.getContext('2d');
		this.context.lineWidth = this.lineWidth;
		this.context.strokeStyle = '#000000';
		
		this.nextBlockContext = this.nextBlockCanvas.getContext('2d');
		this.nextNextBlocksContext = this.nextNextBlocksCanvas.getContext('2d');
		
		this.nextBlockContext.lineWidth = this.nextLineWidth;
		this.nextNextBlocksContext.lineWidth = this.nextLineWidth;
		this.nextBlockContext.strokeStyle = '#000000';
		this.nextNextBlocksContext.strokeStyle = '#000000';
		
		this.blockQueue = new Array();
		for (var i = 0; i < 3; i++) {
			this.blockQueue.push(Math.floor(Math.random() * this.shapes.length));
		}
		
		this.init();
	},
	
	//배경 매트릭스 초기화
	init: function() {
		this.BLOCK_W = this.W / this.COLS;
		this.BLOCK_H = this.H / this.ROWS;
		
		this.board = new Array();
		
		for(var y = 0; y < this.ROWS; y++) {
			this.board[y] = new Array();
			
			for(var x = 0; x < this.COLS; x++) {
				this.board[y][x] = 0;
			}
		}
		
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
		
		this.bgAudio = new Audio('/audio/bg.mp3');
		this.bgAudio.loop = true;
		
		
	},
	
	//새로운 블럭 생성
	newShape: function() {
		// var id = Math.floor(Math.random() * this.shapes.length);
		//다음 블럭을 한개 생성한 후에 (그러니깐 여기서는 4개) 맨 앞에꺼 꺼내기
		this.blockQueue.push(Math.floor(Math.random() * this.shapes.length));
		var id = this.blockQueue.shift();
		this.currnetBlockId = id;
		
		//블럭 그림 생성
		var shape = this.shapes[id];
		
		this.current = new Array();
		
		for (var y = 0; y < 4; y++) {
			this.current[y] = new Array();
			
			for( var x = 0; x < 4; x++) {
				var i = 4 * y + x;
				
				if(typeof(shape[i]) != 'undefined' && shape[i]) {
					this.current[y][x] = id + 1;
				} else {
					this.current[y][x] = 0;
				}
			}
		}
		
		this.drawNextBlocks();	//무식한 방법이지만 귀찮음으로 패스 나중에 이것만 타임 변경하던지 적절한 위치로 이동하여 이넘들은 자주 안그려지게 수정하자
		
		this.currentX = 5;
		this.currentY = 0;
	},
	
	//이동해도 좋은지 여부 체크
	valid: function(offsetX, offsetY, newCurrent) {
		offsetX = offsetX || 0;
		offsetY = offsetY || 0;
		offsetX = this.currentX + offsetX;
		offsetY = this.currentY + offsetY;
		newCurrent = newCurrent || this.current;
		
		for(var y = 0; y < 4; y++) {
			for(var x = 0; x < 4; x++) {
				if(newCurrent[y][x]) {	            	
					if(typeof(this.board[y + offsetY]) == 'undefined' 
							|| typeof(this.board[y + offsetY][x + offsetX]) == 'undefined'
							|| this.board[y + offsetY][x + offsetX]
							|| x + offsetX < 0
							|| y + offsetY >= this.ROWS
							|| x + offsetX >= this.COLS) {
						return false;							
					}
				}
			}
		}
		
		return true;
	},
	
	//블럭이 더 이상 이동할 수 있는지 여부 체크 후 정지 시키기 또한 맨 위까지 채울경우 게임 오버 시키기
	freeze: function() {
		var isGameOver = false;
		
		for(var y = 0; y < 4; y++) {
			for( var x = 0; x < 4; x++) {			
				if(this.current[y][x]) {
					this.board[y + this.currentY][x + this.currentX] = this.current[y][x];
					this.sendServerYn = true;
					
					if(y + this.currentY == 0) {
						isGameOver = true;
					}
				}
			}
		}
		
		if(isGameOver) {
			this.gameOver();
		}
	},
	
	//한줄 다 채웠으면 한줄 지우기
	clearLines: function() {
		var clearLineCnt = 0;
		for(var y = this.ROWS - 1; y >= 0; y--) {
			var row = true;
			
			for(var x = 0; x < this.COLS; x++) {
				if(this.board[y][x] == 0) {
					row = false;
					break;
				}
			}
			
			if(row) {
				for(var yy = y; yy > 0; yy--) {
					for(var x = 0; x < this.COLS; x++) {
						this.board[yy][x] = this.board[yy - 1][x];
						this.sendServerYn = true;
					}
				}
				y++;
				clearLineCnt++;
			}
		}
		
		if (clearLineCnt > 0) {
			var eventMsg = {};
			eventMsg.type = 'clearLine';
			eventMsg.lineCnt = clearLineCnt;
			socket.emit('tetrisEventOccur', eventMsg);
		}
		
	},
	
	//일정시간마다 블럭 이동시키기
	tick: function() {
		if(this.valid(0, 1)) {
			this.currentY++;
		} else {
			this.freeze();
			this.clearLines();
			this.newShape();
		}
		
		if(this.sendServerYn) {
			this.sendBoardStateToServer();
			this.sendServerYn = false;
		}
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
	
	//블럭 가상 회전
	rotate: function() {
		var newCurrent = new Array();
		
		for(var y = 0; y < 4; y++) {
			newCurrent[y] = new Array();
			for(var x = 0; x < 4; x++) {
				newCurrent[y][x] = this.current[3 - x][y];
			}
		}
		
		// console.log('before---------------------------');
		// for(var y = 0; y < 4; y++) {
			// console.log(newCurrent[y][0] + ', ' + newCurrent[y][1] + ', ' + newCurrent[y][2] + ', ' + newCurrent[y][3]);
		// }
				
		//위 공백 없애기
		for (;;) {
			if(typeof(newCurrent[0]) != 'undefined' && newCurrent[0][0] == 0 && newCurrent[0][1] == 0 && newCurrent[0][2] == 0 && newCurrent[0][3] == 0) {
				console.log('change---------------------------');
				var tempArray = newCurrent.shift();
				newCurrent.push(tempArray);
			} else {
				break;
			}
		}
		
		//좌측 공백 없애기
		for(;;) {
			if(newCurrent[0][0] == 0 && newCurrent[1][0] == 0 && newCurrent[2][0] == 0 && newCurrent[3][0] == 0) {
			 	for(var i = 0; i < 4; i++) {
			 		var tempVal = newCurrent[i].shift();
			 		newCurrent[i].push(tempVal); 
			 	}	
			} else {
				break;
			}
		}
		
		// console.log('after---------------------------');
		// for(var y = 0; y < 4; y++) {
			// console.log(newCurrent[y][0] + ', ' + newCurrent[y][1] + ', ' + newCurrent[y][2] + ', ' + newCurrent[y][3]);
		// }
		
		//외쪽 공백 없애기
		
		return newCurrent;
	},
	
	//블럭 회전 (가상으로 돌려보고 문제 없으면 적용)
	rotateBlock: function() {
		var rotated = this.rotate();
		if(this.valid(0, 0, rotated)) {
			this.current = rotated;
			document.getElementById('commonAudio').src = '/audio/blockChange.wav';
			document.getElementById('commonAudio').load();
			document.getElementById('commonAudio').play();
			
			this.render();
		}
	},
	
	//좌측 이동
	moveLeft: function(offset) {
		for(var i = 0; i < offset; i++) {
			if(this.valid(-1)) {
				this.currentX--;
				
				this.render();
			}	
		}
		
		this.render();
	},
	
	//우측 이동
	moveRight: function(offset) {
		for(var i = 0; i < offset; i++) {
			if(this.valid(1)) {
				this.currentX++;
				
				this.render();
			}
		}
	},
	
	//아래로 빠르게 이동
	moveDown: function(offset) {
		for(var i = 0; i < offset; i++) {
			if(this.valid(0, 1)) {
				this.currentY++;
				
				this.render();
			}
		}
	},
	
	//게임 시작
	startTetris: function() {
		var obj = this;
		
		this.newShape();
		
		this.tickCnt = 0;
		this.playTime = 0;
		this.gameSpeed = 1000;
		
		this.tickTimer = setInterval(function() {
			obj.tick();
			obj.render();
		}, this.gameSpeed);
		
		
		/*
		this.renderTimer = setInterval(function() {
			obj.render();
		}, 40);
		*/
		
		this.playTimer = setInterval(function() {
			obj.oneSecondProc();
		}, 1000);
		
	},
	
	oneSecondProc: function() {
		var obj = this;
		this.playTime++;
		document.getElementById('timeTag').innerHTML = this.timeFormater(this.playTime);
		
		if(this.playTime % 10 == 0 && this.gameSpeed > this.MAX_SPEED) {
			console.log('Speed UP!');
			this.gameSpeed = this.gameSpeed - 100;
			clearInterval(this.tickTimer);
			this.tickTimer = setInterval(function() {
				obj.tick();
				obj.render();
			}, this.gameSpeed);
		}
	},
	
	//게임이 종료 되었을때 호출됨
	gameOver: function() {
		console.log('game over....');
		clearInterval(this.tickTimer);
		clearInterval(this.renderTimer);
		clearInterval(this.playTimer);
		
		this.isGameOver = true;
		
		this.tickTimer = null;
		this.renderTimer = null;
		this.playTimer = null,
		
		this.sendServerYn = false;
		
		var data = {};
		data.type = 'gameOver';
		data.playTime = this.playTime;
		data.boardData = this.board;
		socket.emit('tetrisEventOccur', data);
		
		this.bgAudio.pause();
	},
	
	//정상적이지 않은 종료
	retire: function() {
		clearInterval(this.tickTimer);
		clearInterval(this.renderTimer);
		clearInterval(this.playTimer);
		
		this.tickTimer = null;
		this.renderTimer = null;
		this.playTimer = null;
		
		this.bgAudio.pause();
			
		if(!this.isNormalBack && !this.isGameOver) {
			this.sendServerYn = false;
			
			var data = {};
			data.type = 'gameOver';
			data.playTime = this.playTime;
			data.boardData = this.board;
			socket.emit('tetrisEventOccur', data);
		}
	},
	
	//블럭 그리기
	drawBlock: function(x, y, idx) {
		
		//아래 주석처리한건 기존의 네모 그리고 색칠하는방식
		if (this.imageBlockYn) {
			this.context.drawImage(this.blockImages[idx], this.BLOCK_W * x, this.BLOCK_H * y, this.BLOCK_W, this.BLOCK_H);
		} else {
			//socket.emit('print', this.context.fillStyle);
			this.context.fillRect(this.BLOCK_W * x + this.lineWidth, this.BLOCK_H * y + this.lineWidth, this.BLOCK_W - this.lineWidth, this.BLOCK_H - this.lineWidth);
			//this.context.strokeRect(this.BLOCK_W * x, this.BLOCK_H * y, this.BLOCK_W, this.BLOCK_H);
		}
	},
	
	//다음 블럭들 그리기
	drawNextBlocks: function() {
		
		//바로 다음 블럭 그리기
		this.nextBlockContext.clearRect(0, 0, this.nextBlockCanvas.width, this.nextBlockCanvas.height);
		var shape = this.shapes[this.blockQueue[0]];
		this.nextBlockContext.fillStyle = this.colors[this.blockQueue[0]];
		
		for(var y = 0; y < 4; y++) {
			for(var x = 0; x < 4; x++) {
				var i = 4 * y + x;
				if(typeof(shape[i]) != 'undefined' && shape[i]) {
					if (this.imageBlockYn) {
						this.nextBlockContext.drawImage(this.blockImages[this.blockQueue[0]], this.mNextBlockWidht * x, this.mNextBlockHeight * y, this.mNextBlockWidht, this.mNextBlockHeight);
					} else{
						this.nextBlockContext.fillRect(this.mNextBlockWidht * x + this.nextLineWidth, this.mNextBlockHeight * y + this.nextLineWidth, this.mNextBlockWidht - (this.nextLineWidth * 2), this.mNextBlockHeight - (this.nextLineWidth * 2));
						//this.nextBlockContext.strokeRect(this.mNextBlockWidht * x, this.mNextBlockHeight * y, this.mNextBlockWidht, this.mNextBlockHeight);
					};
				}
			}
		}
		
		//다다음 애들 그리기
		this.nextNextBlocksContext.clearRect(0, 0, this.nextNextBlocksCanvas.width, this.nextNextBlocksCanvas.height);
		for(var z = 0; z < 2; z++) {
			shape = this.shapes[this.blockQueue[z + 1]];
			this.nextNextBlocksContext.fillStyle = this.colors[this.blockQueue[z + 1]];
			
			for(var y = 0; y < 4; y++) {
				for(var x = 0; x < 4; x++) {
					var i = 4 * y + x;
					if(typeof(shape[i]) != 'undefined' && shape[i]) {
						if (this.imageBlockYn) {
							this.nextNextBlocksContext.drawImage(this.blockImages[this.blockQueue[z + 1]], this.mNextNextBlockWidht * x, this.mNextNextBlockHeight * y + (this.mNextNextBlockHeight * z * 4), this.mNextNextBlockWidht, this.mNextNextBlockHeight);
						} else {
							this.nextNextBlocksContext.fillRect(this.mNextNextBlockWidht * x + this.nextLineWidth, this.mNextNextBlockHeight * y + (this.mNextNextBlockHeight * z * 4) + this.nextLineWidth, this.mNextNextBlockWidht - (this.nextLineWidth * 2), this.mNextNextBlockHeight - (this.nextLineWidth * 2));
							//this.nextNextBlocksContext.strokeRect(this.mNextNextBlockWidht * x, this.mNextNextBlockHeight * y + (this.mNextNextBlockHeight * z * 4), this.mNextNextBlockWidht, this.mNextNextBlockHeight);
						}
					}
				}
			}
		}
	},
	
	//화면 갱신
	render: function() {
		this.context.clearRect(0, 0, this.W, this.H);
		/*
		var matrix = '-----------------\n';
		for(var y = 0; y < 20; y++) {
			matrix += this.board[y][0] + ', ' + this.board[y][1] + ', ' + this.board[y][2] + ', ' + this.board[y][3] + ', ' + this.board[y][4] + ', ' + this.board[y][5] + ', ' + this.board[y][6] + ', ' + this.board[y][7] + ', ' + this.board[y][8] + ', ' + this.board[y][9] + '\n';
		}
		matrix += '-----------------';
		socket.emit('print', matrix);
		*/
		
		for(var x = 0; x < this.COLS; x++) {
			for(var y = 0; y < this.ROWS; y++) {
				if(typeof(this.board[y][x]) != 'undefined' && this.board[y][x] != 0) {
					this.context.fillStyle = this.colors[this.board[y][x] - 1];
					this.drawBlock(x, y, this.board[y][x] - 1);
				}
			}
		}
		
		
		/*
		var matrix = '-----------------\n';
		for(var y = 0; y < 4; y++) {
			matrix += this.current[y][0] + ', ' + this.current[y][1] + ', ' + this.current[y][2] + ', ' + this.current[y][3] + '\n';
		}
		matrix += '-----------------';
		socket.emit('print', matrix);
		*/
		
		//socket.emit('print', '-------------------');
		for(var y = 0; y < 4; y++) {
			for(var x = 0; x < 4; x++) {
				if(typeof(this.current[y][x]) != 'undefined' && this.current[y][x] != 0) {
					this.context.fillStyle = this.colors[this.current[y][x] - 1];
					this.drawBlock(this.currentX + x, this.currentY + y, this.current[y][x] - 1);
				}
			}
		}
		
		
	},
	
	//현 블럭 상황을 서버에 전송
	sendBoardStateToServer: function() {
		var data = {};
		data.type = 'changeBlockState';
		data.boardData = this.board;
		socket.emit('tetrisEventOccur', data);
	},
	
	//다른 유저가 한줄 없앴을때 패널티 추가
	addPenalty: function(lineCnt) {
		console.log('add penalty : ' + lineCnt);
		
		//상대방이 없앤 수만큼 돌면서 현재 상태 추가
		for(var i = 0; i < lineCnt; i++) {
			for(var y = 0; y < this.ROWS - 1; y++) {
				for(var x = 0; x < this.COLS; x++) {
					this.board[y][x] = this.board[y + 1][x];
				}
			}
			for(var x = 0; x < this.COLS; x++) {
				this.board[this.ROWS - 1][x] = Math.floor(Math.random() * 2);
			}
		}
		
		this.render();
		this.sendBoardStateToServer();
	},
});
