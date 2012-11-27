
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var expireTime = 3600; //access token 폐지 시간 (단위 초)

var app = express();

var OAuth2Provider = require('./modules/oauth2-provider').OAuth2Provider;
var MemoryStore = express.session.MemoryStore;

var SktDataCenter = require('./modules/skt-data-center').SktDataCenter;
var dc = new SktDataCenter();

//임시 승인 저장소
var myGrants = {};

var myOAP = new OAuth2Provider('encryption secret', 'signing secret', expireTime);

//승인 페이지를 표시하기 전에 사용자가 로그인되어 있는지 확인
myOAP.on('enforce_login', function(req, res, authorize_rul, next) {
	if(req.session.user) {
		next(req.session.user);
	} else {
		res.writeHead(303, {Location: '/login?next=' + encodeURIComponent(authorize_rul)});
		res.end();
	}
});

/*
 * 유저가 허용해줄껀지 여부 확인양식 출력
 */
myOAP.on('authorize_form', function(req, res, client_id, authorize_url) {
	routes.authorize(req, res, client_id, authorize_url);
//	res.end('<html>this app wants to access your account... <form method="post" action="' + authorize_url + '"><button name="allow">Allow</button><button name="deny">Deny</button></form>');
});

myOAP.on('save_grant', function(req, client_id, code, next) {
	if(!(req.session.user in myGrants)) {
		myGrants[req.session.user] = {};
	}
	
	myGrants[req.session.user][client_id] = code;
	next();
});

myOAP.on('remove_grant', function(user_id, client_id, code){
	if(myGrants[user_id] && myGrants[user_id][client_id]) {
		delete myGrants[user_id][client_id];
	}
});

myOAP.on('lookup_grant_user_agent', function(client_id, redirect_uri, next){
	var consumerCheck = dc.checkClientUserAgent(client_id, redirect_uri);
	if(consumerCheck) {
		return next(null);
	}
	
	next(new Error('no such grant found'));
});

myOAP.on('lookup_grant', function(client_id, client_secret, redirect_uri, code, next){
	//if(client_id in myClients && myClients[client_id] == client_secret) {
	var consumerCheck = dc.checkClient(client_id, client_secret, redirect_uri);
	if(consumerCheck) {
		for(var user in myGrants) {
			var clients = myGrants[user];
			
			if(clients[client_id] && clients[client_id] == code) {
				return next(null, user);
			}
		}
	}
	
	next(new Error('no such grant found'));
});

//access token 만들때 더 넣을 데이터 있으면 여기서 넣는다.
myOAP.on('create_access_token', function(user_id, client_id, next){
	var data = 'blah';	// <-- 여기에 넣으면 나중에 꺼낼때 이 데이터터 꺼내올 수 있다. 현재 user_id 만 있으면 되기 땜시 아무거나 넣어놓음
	next(data);
});

//access token이 만들어 졌을때 오는 메시지 필요한 작업이 있음ㄴ 여기서 하자 현재는 걍 로그만 남김
myOAP.on('save_access_token', function(user_id, client_id, access_token){
	console.log('saving access token %s for user_id=%s client_id=%s', access_token, user_id, client_id);
});

//엑세스 토큰을 가지고 요청 했을시 엑세스 토큰을 확인 하여 만료 사용자 데이터 표시해줌
myOAP.on('access_token', function(req, token, next){
	console.log('access_token emitted...');
	var TOKEN_TTL = expireTime * 1000;
	
	if(token.grant_date.getTime() + TOKEN_TTL > Date.now()){
		req.session.user = token.user_id;
		req.session.authUri = token.uri;
//		req.session.data = token.extra_data;
	} else {
		console.warn('access token for user %s has expired', token.user_id);
	}
	
	next();
});

//express 설정
app.configure(function(){
  app.set('port', process.env.PORT || 8088);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  
  //추가 하거나 수정
  app.use(express.session({store: new MemoryStore({reapInterval: 5 * 60 * 1000}), secret: 'abracadabra'}));
  app.use(myOAP.oauth());
  app.use(myOAP.login());
  app.use(express.query());
  //--------------
  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//라우트 설정
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProc);
app.get('/logout', routes.logout);
app.get('/secret', routes.secret);
app.get('/sms', routes.sms);
app.post('/sms', routes.sms);
app.get('/payment', routes.payment);
app.post('/payment', routes.payment);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

function escape_entities(s) {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
