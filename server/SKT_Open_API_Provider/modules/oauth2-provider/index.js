/**
 * index.js
 * OAuth 2.0 provider
 *
 * @author Amir Malik
 * 이것은 위에 써있는 사람이 만든것이지만 SKT에서 조금 변경해야 할 부분이 있어서 끌어다가 씀 어차피 MIT 라이센스라 문제 없을듯
 * 원래을 참고 하고 싶다면 package.json에  'oauth2-provider': '>=1.0.0 <2.0.0' 을 추가 하고, 'cd . && npm install' 명령어를 실행하여 모듈을 설치하자
 */

var EventEmitter = require('events').EventEmitter
	, querystring = require('querystring')
	, serializer = require('serializer')
	, connect = require('connect');

function OAuth2Provider(crypt_key, sign_key, time) {
	this.serializer = serializer.createSecureSerializer(crypt_key, sign_key);
	this.expireTime = time || 600; //만료 시간
}

OAuth2Provider.prototype = new EventEmitter();

OAuth2Provider.prototype.generateAccessToken = function(user_id, client_id, extra_data) {
	var out = {
		access_token: this.serializer.stringify([user_id, client_id, +new Date, extra_data]),
//		refresh_token: null,
		expires: this.expireTime
	};

	return out;
};

OAuth2Provider.prototype.login = function() {
	var self = this;

	return function(req, res, next) {
		var data, atok, user_id, client_id, grant_date, extra_data;
		
		var uri = ~req.url.indexOf('?') ? req.url.substr(0, req.url.indexOf('?')) : req.url;

		//request parameter 중에 access_token 이 있는지 확인한다. (req.query[] : 이것은 리퀘스트 중 파라메터 찾는방법중 하나)
		if(req.query['access_token']) {
			atok = req.query['access_token'];
		} else if((req.headers['authorization'] || '').indexOf('Bearer ') == 0) {
			atok = req.headers['authorization'].replace('Bearer', '').trim();
		} else {
			return next();
		}

		try {			
			data = self.serializer.parse(atok);
			
			user_id = data[0];
			client_id = data[1];
			grant_date = new Date(data[2]);
			extra_data = data[3];
		} catch(e) {
			//엑세스 토큰 값 파싱하다 실패 했을시 오류 표시 (이것 추후에 오류페이지로 변경)
			// res.writeHead(400);
			// return res.end(e.message);
			//res.writeHead(403);
			//return res.end('{result: "fail", message: "not valid access_token"}');
			
			var resultMsg = {};
			resultMsg.result = 'fail';
			resultMsg.resultCode = '1';
			resultMsg.message = 'not valid access_token';
			
			res.writeHead(200);
			if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
				return res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
			} else {
				return res.end(JSON.stringify(resultMsg));
			}
		}
		
		//console.log('emmit access_token');
		self.emit('access_token', req, {
			user_id: user_id,
			client_id: client_id,
			extra_data: extra_data,
			grant_date: grant_date,
			uri: uri
		}, next);
	};
};

OAuth2Provider.prototype.oauth = function() {
	var self = this;

	return function(req, res, next) {
		var uri = ~req.url.indexOf('?') ? req.url.substr(0, req.url.indexOf('?')) : req.url;
		//console.log('uri : ' + uri);
		
		if(req.method == 'GET' && '/oauth/authorize' == uri) {
			var client_id = req.query.client_id;
			var redirect_uri = req.query.redirect_uri;

			if(!client_id || !redirect_uri) {
				res.writeHead(400);
				return res.end('client_id and redirect_uri required');
			}

			// authorization form will be POSTed to same URL, so we'll have all params
			var authorize_url = req.url;

			self.emit('enforce_login', req, res, authorize_url, function(user_id) {
				// store user_id in an HMAC-protected encrypted query param
				authorize_url += '&' + querystring.stringify({x_user_id: self.serializer.stringify(user_id)});
				// user is logged in, render approval page
				self.emit('authorize_form', req, res, client_id, authorize_url);
			});
		} else if(req.method == 'POST' && '/oauth/authorize' == uri) {
			var client_id = req.query.client_id;
			var redirect_uri = req.query.redirect_uri;
			var response_type = req.query.response_type || 'code';
			var state = req.query.state;
			var x_user_id = req.query.x_user_id;

			var url = redirect_uri;
			
			switch(response_type) {
				case 'code': url += '?'; break;
				case 'token': url += '#'; break;
				default:
					res.writeHead(400);
					return res.end('invalid response_type requested');
			}

			if('allow' in req.body) {
				//토큰 요청일 때
				if('token' == response_type) {
					var user_id;
					
					try {
						user_id = self.serializer.parse(x_user_id);
					} catch(e) {
						console.error('allow/token error', e.stack);

						res.writeHead(500);
						return res.end(e.message);
					}
					
					//기존 코드--
					//기존 코드에서는 클라이언트 아이디와 리다이렉트 Uri를 확인하지 않고 그냥 엑세스 토큰을 만드는것을 발견하여 아래와 같이 수정함
					// self.emit('create_access_token', user_id, client_id, function(extra_data) {
						// var atok = self.generateAccessToken(user_id, client_id, extra_data);
// 
						// if(self.listeners('save_access_token').length > 0) {
							// self.emit('save_access_token', user_id, client_id, atok);
						// }
// 
						// url += querystring.stringify(atok);
						// //console.log('***' + url);
						// res.writeHead(303, {Location: url});
						// res.end();
					// });
					
					self.emit('lookup_grant_user_agent', client_id, redirect_uri, function(err) {
						if(err) {
							var resultMsg = {};
							resultMsg.result = 'fail';
							resultMsg.resultCode = '1';
							resultMsg.message = err.message;
							
							res.writeHead(200);
							if (typeof(req.param('callback')) != 'undefined' && req.param('callback') != null && req.param('callback').length > 0) {
								return res.end(req.param('callback') + '(' + JSON.stringify(resultMsg) + ');');	
							} else {
								return res.end(JSON.stringify(resultMsg));
							}
						}
						
						self.emit('create_access_token', user_id, client_id, function(extra_data) {
							var atok = self.generateAccessToken(user_id, client_id, extra_data);
	
							if(self.listeners('save_access_token').length > 0) {
								self.emit('save_access_token', user_id, client_id, atok);
							}
	
							url += querystring.stringify(atok);
							//console.log('***' + url);
							res.writeHead(303, {Location: url});
							res.end();
						});
						
					});
				} else {	//코드 요청일 때
					var code = serializer.randomString(128);

					self.emit('save_grant', req, client_id, code, function() {
						var extras = {
							code: code,
						};

						// pass back anti-CSRF opaque value
						if(state) {
							extras['state'] = state;
						}

						url += querystring.stringify(extras);

						res.writeHead(303, {Location: url});
						res.end();
					});
				}
			} else {
				url += querystring.stringify({error: 'access_denied'});

				res.writeHead(303, {Location: url});
				res.end();
			}

		} else if(req.method == 'POST' && '/oauth/access_token' == uri) {
			var client_id = req.body.client_id;
			var client_secret = req.body.client_secret;
			var redirect_uri = req.body.redirect_uri;
			var code = req.body.code;
			
			//jonghyun add - 기존것은 redirect_uri 체크 안하지만 체크 하도록 수정
			self.emit('lookup_grant', client_id, client_secret, redirect_uri, code, function(err, user_id) {
				if(err) {
					res.writeHead(400);
					return res.end(err.message);
				}

				res.writeHead(200, {'Content-type': 'application/json'});

				self.emit('create_access_token', user_id, client_id, function(extra_data) {
					var atok = self.generateAccessToken(user_id, client_id, extra_data);

					if(self.listeners('save_access_token').length > 0) {
						self.emit('save_access_token', user_id, client_id, atok);
					}

					res.end(JSON.stringify(self.generateAccessToken(user_id, client_id, extra_data)));
				});

				self.emit('remove_grant', user_id, client_id, code);
			});

		} else {
			return next();
		}
	};
};

exports.OAuth2Provider = OAuth2Provider;
