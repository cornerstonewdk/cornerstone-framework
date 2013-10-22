
var fs = require( 'fs' );
var express = require( 'express' );
var app = express();

const PATH = '/smart-bill';
const PORT = 5050;
const FILE_NAME = __dirname + '/public/data/bills.json';

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

app.get( PATH, function( req, res ) {
	res.redirect( PATH + '/' );
} );
app.post( PATH + '/bills', function( req, res ) {

	// 파일을 읽어온다.
	var bills = JSON.parse( fs.readFileSync( FILE_NAME, { encoding: 'utf8' } ) );
	var bill = req.body;

	// 마지막 id에 1을 더해서 새 id를 만든다.
	if ( bills && bills.length && bills.length > 0 )
		bill.id = bills[ bills.length - 1 ].id + 1;
	else
		bill.id = 1;

	// 배열에 추가
	bills.push( bill );

	// 다시 파일에 저장한다.
	fs.writeFileSync( FILE_NAME, JSON.stringify( bills ), { encoding: 'utf8' } );

	res.json( bill );
} );
app.delete( PATH + '/bills/:id', function( req, res ) {

	// 파일을 읽어온다.
	var bills = JSON.parse( fs.readFileSync( FILE_NAME, { encoding: 'utf8' } ) );
	var bill;

	// id가 일치하는 항목을 삭제한다.
	var toDelete = -1;
	for ( var i = 0; i < bills.length; i++ )
		if ( bills[ i ].id == req.params.id ) {
			toDelete = i;
			break;
		}
	if ( toDelete > -1 ) {
		bill = bills[ toDelete ];
		bills.splice( toDelete, 1 );
	}

	// 다시 파일에 저장한다.
	fs.writeFileSync( FILE_NAME, JSON.stringify( bills ), { encoding: 'utf8' } );

	// 빈 응답을 보내면 클라이언트에서 삭제 성공하지 않은 것으로 판단한다.
	res.json( bill );
} );

app.listen( PORT );
console.log( 'Listening on port ' + PORT );
