
/**
 * Middlewares
 */

var config = require( '../config');
var constants = require( './constants' );
var ValidationError = require( './error' ).ValidationError;
var FieldError = require( './error' ).FieldError;
var ProcessError = require( './error' ).ProcessError;
var LoginNeededError = require( './error' ).LoginNeededError;
var PermissionDeniedError = require( './error' ).PermissionDeniedError;

// 로그인한 사용자만 사용 가능
exports.userOnly = function( req, res, next ) {
	if ( req.session.user ) {
		res.local( 'user', req.session.user );
		next();
	}
	else
		next( new LoginNeededError() );
};

// 광고관리자만 사용 가능
exports.adAdminOnly = function( req, res, next ) {
	if ( req.session.user ) {
		if ( req.session.level == 'adAdmin' || req.session.level == 'admin' ) {
			res.local( 'user', req.session.user );
			res.local( 'level', req.session.level );
			next();
		}
		else
			next( new PermissionDeniedError() );
	}
	else
		next( new LoginNeededError() );
};

// 관리자만 사용 가능
exports.adminOnly = function( req, res, next ) {
	if ( req.session.user ) {
		if ( req.session.level == 'admin' ) {
			res.local( 'user', req.session.user );
			res.local( 'level', req.session.level );
			next();
		}
		else
			next( new PermissionDeniedError() );
	}
	else
		next( new LoginNeededError() );
};

// AJAX 요청시에 오류가 발생할 경우 오류 내용을 JSON으로 응답한다.
exports.ajaxErrorHandler = function( err, req, res, next ) {
	
	// Ajax 요청시에 오류가 발생할 경우
	if ( req.isXMLHttpRequest ) {

		if ( err instanceof ValidationError ) {
			var errData = err.fieldErrors;
			console.log( constants.foregroundColor.YELLOW + '[ValidationError]' + constants.color.RESET + ' %j', errData );
			res.json( { _fieldError: errData } );
		}
		else if ( err instanceof FieldError ) {
			var errData = { field: err.field, index: err.index, message: err.message };
			console.log( constants.foregroundColor.YELLOW + '[FieldError]' + constants.color.RESET + ' %j', errData );
			res.json( { _fieldError: [ errData ] } );
		}
		else {
			console.error( constants.foregroundColor.RED + err.stack + constants.color.RESET );
			res.json( { _exception: { type: err.type, message: err.message || err.toString() } } );
		}
	}
	else
		next( err );
};

exports.oldBrowserHandler = function( req, res, next ) {

	if ( req.url == config.network.namespace + '/html5' ) {
		next();
		return;
	}

	// 메일 인증 주소도 구형 브라우저에서 사용 가능
	if ( req.url.substring( 0, config.network.namespace.length + 15 ) == config.network.namespace + '/user/authMail/' ) {
		next();
		return;
	}

	// IE7: MSIE 7.0
	// IE8: MSIE 8.0; Trident/4.0
	// IE9: MSIE 9.0; Trident/5.0
	// IE9 Compatible Mode: MSIE 7.0; Trident/5.0

	// User-Agent가 없는 경우
	var agent = req.header( 'User-Agent' );
	if ( !agent ) {
		next();
		return;
	}

	// User-Agent가 IE인지 검사
	var result = agent.match( /MSIE (\d+)\.(\d+)/ );
	// User-Agent가 Trident인지 검사
	var tResult = agent.match( /Trident\/(\d+)\.(\d+)/ );

	// IE가 아닌 경우
	if ( !result ) {
		next();
		return;
	}

	// IE8 이상인 경우
	if ( parseInt( result[ 1 ] ) >= 8 ) {
		next();
		return;
	}

	// IE8 이상이나 호환성 모드를 사용해서 IE7로 인식되는 경우
	if ( tResult && parseInt( tResult[ 1 ] ) >= 4 ) {
		res.header( 'X-UA-Compatible', 'IE=edge' );
		next();
		return;
	}

	res.redirect( config.network.namespace + '/html5' );
};

exports.favicon = function( req, res, next ) {
	if ( req.url == '/favicon.ico' ) {
		res.send( 404 );
		return;
	}

	next();
};

exports.noCache = function( req, res, next ) {

	res.header( 'Cache-Control', 'no-cache, no-store, private, must-revalidate, max-stale=0, post-check=0, pre-check=0' );
	res.header( 'Pragma', 'no-cache' );
	res.header( 'Expires', new Date().toGMTString() );

	next();
};

// config에서 namespace 정보를 넘겨받아 
exports.useNamespace = function ( req, res, next ) {
	res.local( 'namespace', config.network.namespace );
	next();
};
