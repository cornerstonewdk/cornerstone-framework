//필요 모듈 여기에 추가

/**
 * 
 */
function SktDataCenter() {
	/*
	 * 임시로 하드코딩한것 앞에가 클라이언트 아이디 뒤에가 클라이언트 시크릿 추후 MySQL 등으로 대체
	 * ** client_id : {client_secret, redirect_uri} 형태의 데이터 입력 및 수정 **
	 */
	this.myClients = {
		'1': {'client_secret': '1secret', 'redirect_uri': 'http://localhost:3000/callback'},
		'2': {'client_secret': '2secret', 'redirect_uri': 'http://localhost:3000/userAgent'},
		'3': {'client_secret': '3secret', 'redirect_uri': 'http://61.250.22.139/api/client_redirect.html'},
		'4': {'client_secret': '4secret', 'redirect_uri': 'http://cornerstone.sktelecom.com/cornertest/test-skt-api-client/api-with-conerstone-css/client_redirect.html'},
		'5': {'client_secret': '5secret', 'redirect_uri': 'http://127.0.0.1:8080/html5/cornerstone-framework/test/test-skt-api-client/api-with-conerstone-css/client_redirect.html'},
		'6': {'client_secret': '5secret', 'redirect_uri': 'http://61.250.22.139/cornertest/test-skt-api-client/api-with-conerstone-css/'},
		'7': {'client_secret': '7secret', 'redirect_uri': 'http://cornerstone.sktelecom.com/2/test/util/client_redirect.html'}
	};
	
	/*
	 * 임시로 SKT 가입자들 하드코딩 추후 디비로직으로 변경
	 */
	this.myUsers = {
		'nmj21c': {'password': '1111', 'name': '전종현'},
		'yhshin': {'password': '1111', 'name': '신용후'},
		'test': {'password': '1111', 'name': '테스트'},
	};
	
};

SktDataCenter.prototype = new SktDataCenter();

//클라이언트 체크
SktDataCenter.prototype.checkClient = function(client_id, client_secret, redirect_uri) {
	//임시로 하드코딩한것에서 처리 (하드 코딩 데이터는 위에 있음) 추후 DB 또는 서버에 확인 요청
	//클라이언트 id 확인 클라이언트 secret 확인 리다이렉트 uri 확인
	if(client_id in this.myClients 
		&& this.myClients[client_id]['client_secret'] == client_secret
		&& redirect_uri.indexOf(this.myClients[client_id]['redirect_uri']) == 0) {
		return true;
	}
	
	return false;
};
SktDataCenter.prototype.checkClientUserAgent = function(client_id, redirect_uri) {
	//임시로 하드코딩한것에서 처리 (하드 코딩 데이터는 위에 있음) 추후 DB 또는 서버에 확인 요청
	//클라이언트 id 확인 클라이언트 secret 확인 리다이렉트 uri 확인
	if(client_id in this.myClients 
		&& redirect_uri.indexOf(this.myClients[client_id]['redirect_uri']) == 0) {
		return true;
	}
	
	return false;
};



//가입자 체크
SktDataCenter.prototype.getUserInfo = function(user_id, password) {
	if(user_id in this.myUsers && this.myUsers[user_id]['password'] == password) {
		return true;
	}
	
	return false;
};

exports.SktDataCenter = SktDataCenter;