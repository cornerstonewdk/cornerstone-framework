
var fs = require( 'fs' );
var express = require( 'express' );
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
	console.log( req.body );
	res.end();
} );

app.listen( PORT );
console.log( 'Listening on port ' + PORT );
