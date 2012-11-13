var SktDataCenter = require('../modules/skt-data-center').SktDataCenter;
var dc = new SktDataCenter();

var soap = require('../modules/soap/');

/*
 * 현재 상태 확인용
 */
exports.index = function(req, res) {
	console.log(req.session.user);
	res.render('index', { title: 'Current State', logged_state: !!req.session.user});
};

/*
 * 로그인 폼
 */
exports.login = function(req, res, next) {
	if(req.session.user) {
		res.writeHead(303, {Location: '/'});
		return res.end();
	}

    var next_url = req.query.next ? req.query.next : '/';
    
    res.render('login', { title: 'Login', nextUrl: next_url });
};

/*
 * 로그인 진행
 */
exports.loginProc = function(req, res, next) {
	var username = req.param('username');
	var password = req.param('password');
	
	var username = req.param('username');
	var password = req.param('password');
	
	if(dc.getUserInfo(username, password)) {
		req.session.user = username;
		res.redirect(req.body.next || '/');
	} else {
		//로그인 실패면 다시 로그인 화면 띄우기
		var next_url = req.param('next') ? req.param('next') : '/';
		res.render('login', { title: 'Login', nextUrl: next_url });
		//res.redirect('/login');		<--이것은 기존것으로 그냥 처리 (next를 가져올수 없기 때문에 로그인창에서 정상로그인 하면 아무 동작을 하지 않는다) 
	}
};

/*
 * 로그아웃 진행
 */
exports.logout = function(req, res, next) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
};

/*
 * 시크릿 데이터 가져오기 테스트 뒤에 access_token 붙여줘야 한다.
 */
exports.secret = function(req, res, next) {
	if(req.session.user) {
		console.log(req.session);
		res.end('proceed to secret lair, extra data: ' + JSON.stringify(req.session.data));
		req.session.destroy();
	} else {
		res.writeHead(200);
		res.end('access denied!');
	}
};

/*
 * SMS
 */
exports.sms = function(req, res, next) {
	if(req.session.user) {
		if(req.session.authUri != '/sms') {
			//res.writeHead(403);
			//res.end('{result: "fail", message="정상적인 접근이 아닙니다."}');
			
			var resultMsg = {};
			resultMsg.result = 'fail';
			resultMsg.resultCode = '1';
			resultMsg.message = '정상적인 접근이 아닙니다.';
			
			res.writeHead(200);
			if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
				res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
			} else {
				res.end(JSON.stringify(resultMsg));
			}
		}
		
		var from = req.param('from');
		var to = req.param('to');
		var message = req.param('message');
		
		//validation
		from = from.split('-').join('');
		to = to.split('-').join('');
		message = decodeURIComponent(message);
		
		if(message.length < 1) {
			var resultMsg = {};
			resultMsg.result = 'fail';
			resultMsg.resultCode = '1';
			resultMsg.message = '메시지가 비어있습니다.';
			
			res.writeHead(200);
			if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
				res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
			} else {
				res.end(JSON.stringify(resultMsg));
			}
			req.session.destroy();
			return;
		}
				
		if(from.length > 12 || from.length < 10 || isNaN(parseInt(from))) {
			var resultMsg = {};
			resultMsg.result = 'fail';
			resultMsg.resultCode = '1';
			resultMsg.message = 'From 번호 입력이 잘못되었습니다. - 제외 10~12자리 숫자만 입력하여야 합니다.';
			
			res.writeHead(200);
			if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
				res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
			} else {
				res.end(JSON.stringify(resultMsg));
			}
			req.session.destroy();
			return;
		}
		
		if(to.length > 12 || to.length < 10 || isNaN(parseInt(from))) {
			var resultMsg = {};
			resultMsg.result = 'fail';
			resultMsg.resultCode = '1';
			resultMsg.message = 'TO 번호 입력이 잘못되었습니다. - 제외 10~12자리 숫자만 입력하여야 합니다.';
			
			res.writeHead(200);
			if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
				res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
			} else {
				res.end(JSON.stringify(resultMsg));
			}
			req.session.destroy();
			return;
		}
		
		console.log(from + '->' + to + ' : ' + message);
		
		//SMS 보내기
		// var wsdlUrl = 'http://220.103.249.69:8080/SMSService?WSDL';	//-- test
		var wsdlUrl = 'http://esb.sktelecom.com:80/SMSService?WSDL';	//-- live
		var args = {
				"CONSUMER_ID": 'cornerstone_websvr',
	            "RPLY_PHON_NUM": from,
	            "TITLE": message,
	            "PHONE": to
	            //,
	            // "URL": '',
				// "START_DT_HMS": '',
				// "END_DT_HMS":''
	           };
		
		var resultMsg = {};
		res.writeHead(200);
		
		soap.createClient(wsdlUrl, function(err, client) {
			if (err) {
				resultMsg.result = 'fail';
				resultMsg.resultCode = '1';
				resultMsg.message = 'WSDL 서버와 연결을 실패하였습니다.';
				
				if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
					res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
				} else {
					res.end(JSON.stringify(resultMsg));
				}
				req.session.destroy();
			} else {
				client.send(args, function(err, result, raw) {
					if(err) {
						resultMsg.result = 'fail';
						resultMsg.resultCode = '1';
						resultMsg.message = err;
						
						if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
							res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
						} else {
							res.end(JSON.stringify(resultMsg));
						}
						req.session.destroy();
					} else {						
						resultMsg.result = 'success';
						resultMsg.resultCode = '0';
						resultMsg.message = result.return;
						
						if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
							res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
						} else {
							res.end(JSON.stringify(resultMsg));
						}
						req.session.destroy();
					}
				});
			}
		});
	} else {
		var resultMsg = {};
		resultMsg.result = 'fail';
		resultMsg.resultCode = '1';
		resultMsg.message = 'unknown error';
		
		res.writeHead(200);
		if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
			res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
		} else {
			res.end(JSON.stringify(resultMsg));
		}
		req.session.destroy();
	}
};

/*
 * Billing
 */
exports.payment = function(req, res, next) {
	if(req.session.user) {
		if(req.session.authUri != '/payment') {
			//res.writeHead(403);
			//res.end('{result: "fail", message="정상적인 접근이 아닙니다."}');
			
			var resultMsg = {};
			resultMsg.result = 'fail';
			resultMsg.resultCode = '1';
			resultMsg.message = '정상적인 접근이 아닙니다.';
			
			res.writeHead(200);
			if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
				res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
			} else {
				res.end(JSON.stringify(resultMsg));
			}
		}
		
		var type = req.param('type');
		var payment_date = req.param('payment_date');
		var amount = req.param('amount');
		
		msg = "type : " + type + ", amount : " + amount;
		
		var resultMsg = {};
		resultMsg.result = 'success';
		resultMsg.resultCode = '0';
		resultMsg.message = msg;
		
		res.writeHead(200);
		
		if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
			res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
		} else {
			res.end(JSON.stringify(resultMsg));
		}
		
		req.session.destroy();
		
		//res.writeHead(200);
		//res.end('{result: "success", message: "' + msg + '"}');
	} else {
		//res.writeHead(403);
		//res.end('{result: "fail", message: "unknown error"}');
		var resultMsg = {};
		resultMsg.result = 'fail';
		resultMsg.resultCode = '1';
		resultMsg.message = 'unknown error';
		
		res.writeHead(200);
		if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
			res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
		} else {
			res.end(JSON.stringify(resultMsg));
		}
	}
};

/*
 * 유저에게 허용 할것인지 여부 체크
 */
exports.authorize = function(req, res, client_id, authorize_url) {
	res.render('authorize', { title: 'Authorize', authorizeUrl: authorize_url });
};
