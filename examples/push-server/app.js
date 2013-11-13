
var fs = require( 'fs' );
var express = require( 'express' );
var gcm = require( 'node-gcm' );
var apn = require( 'apn' );
var key = require( './keystore/key.json' );
var app = express();

const PATH = '/2/push-server';
const PORT = 5060;

// Express 설정
app.enable( 'strict routing' );

// Middleware 설정
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( app.router );
app.use( PATH, express.static( __dirname + '/public' ) );
app.use( function( err, req, res, next ) {
	// Error Handling
	res.send( err );
} );

function loadDevices() {
	return JSON.parse( fs.readFileSync( __dirname + '/public/data/devices.json', { encoding: 'utf8' } ) );
}

function saveDevices( devices ) {
	fs.writeFileSync( __dirname + '/public/data/devices.json', JSON.stringify( devices ), { encoding: 'utf8' } );
}

function getDevice( id ) {

	var devices = loadDevices();

	for ( var i = 0; i < devices.length; i++ )
		if ( devices[ i ].id == id ) return devices[ i ];

	return null;
}

app.get( PATH, function( req, res ) {
	res.redirect( PATH + '/' );
} );

app.post( PATH + '/devices', function( req, res ) {

	var devices = loadDevices();
	var newDevice = req.body;

	// 마지막 id에 1을 더해서 새 id를 만든다.
	if ( devices && devices.length && devices.length > 0 )
		newDevice.id = devices[ devices.length - 1 ].id + 1;
	else
		newDevice.id = 1;

	// 배열에 추가
	devices.push( newDevice );

	saveDevices( devices );

	res.json( newDevice );
} );

app.put( PATH + '/devices/:id', function( req, res ) {

	var devices = loadDevices();
	var device = req.body;

	// id가 일치하는 항목을 수정한다.
	for ( var i = 0; i < devices.length; i++ )
		if ( devices[ i ].id == req.params.id ) {
			devices[ i ] = device;
			break;
		}

	saveDevices( devices );

	res.json( device );
} );

app.delete( PATH + '/devices/:id', function( req, res ) {

	var devices = loadDevices();

	// id가 일치하는 항목을 삭제한다.
	for ( var i = 0; i < devices.length; i++ )
		if ( devices[ i ].id == req.params.id ) {
			devices.splice( i, 1 );
			break;
		}

	saveDevices( devices );

	// 빈 응답을 보내면 클라이언트에서 삭제 성공하지 않은 것으로 판단한다.
	res.json( {} );
} );

app.post( PATH + '/send', function( req, res ) {

	// 배열로 변환
	var toArray = req.body.to instanceof Array ? req.body.to : [ req.body.to ];

	for ( var i = 0; i < toArray.length; i++ ) {

		var device = getDevice( toArray[ i ] );

		// 아이폰인 경우 APNS 사용
		if ( device.type == 'iphone' ) {
			var apnConnection = new apn.Connection( {
				pfx: __dirname + '/keystore/SKT_Runtime_APNS_Cert.p12',
				passphrase: key.certificatePassword,
				gateway: 'gateway.sandbox.push.apple.com'
			} );
			var note = new apn.Notification();

			note.badge = 0;
			note.sound = 'default';
			note.alert = req.body.message;
			note.payload = { loadurl: 'index.html', query: 'arg1=push&arg2=' + req.body.subject + '&arg3=' + req.body.date };

			apnConnection.on( 'error', function() { console.log( '[Device ' + device.id + '] ERROR' ); } );
			apnConnection.on( 'socketError', function() { console.log( '[Device ' + device.id + '] SocketError' ); } );
			apnConnection.on( 'timeout', function() { console.log( '[Device ' + device.id + '] Timeout' ); } );
			apnConnection.on( 'transmitted', function() { console.log( '[Device ' + device.id + '] Transmitted' ); } );
			apnConnection.on( 'connected', function() { console.log( '[Device ' + device.id + '] Connected' ); } );
			apnConnection.on( 'disconnected', function() { console.log( '[Device ' + device.id + '] Disconnected' ); } );
			apnConnection.on( 'transmissionError', function() { console.log( '[Device ' + device.id + '] TransmissionError' ); } );
			
			console.log( '[Device ' + device.id + '] Sending...' );

			apnConnection.pushNotification( note, new apn.Device( device.token ) );
		}
		// 안드로이드인 경우 GCM 사용
		else {

			var message = new gcm.Message( {
				delayWhileIdle: false,
				timeToLive: 1800,
				data: {
					title: '회의록',
					message: req.body.message,
					getURL: 'index.html?arg1=push&arg2=' + req.body.subject + '&arg3=' + req.body.date
				}
			} );

			var sender = new gcm.Sender( key.apiKey );
			
			console.log( '[Device ' + device.id + '] Sending...' );

			sender.send( message, [ device.token ], 3, function( err, result ) {
				if ( err ) {
					console.log( '[Device ' + device.id + '] ERROR ' + JSON.stringify( err ) );
					return;
				}

				console.log( '[Device ' + device.id + '] ' + JSON.stringify( result ) );
			} );
		}
	}

	res.end();
} );

app.listen( PORT );
console.log( 'Listening on port ' + PORT );
