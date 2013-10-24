
var fs = require( 'fs' );
var express = require( 'express' );
var app = express();

const PATH = '/2/smart-bill';
const PORT = 5050;

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

function loadTemplates() {
	return JSON.parse( fs.readFileSync( __dirname + '/public/data/templates.json', { encoding: 'utf8' } ) );
}

function saveTemplates( templates ) {
	fs.writeFileSync( __dirname + '/public/data/templates.json', JSON.stringify( templates ), { encoding: 'utf8' } );
}

function loadBills() {
	return JSON.parse( fs.readFileSync( __dirname + '/public/data/bills.json', { encoding: 'utf8' } ) );
}

function saveBills( bills ) {
	fs.writeFileSync( __dirname + '/public/data/bills.json', JSON.stringify( bills ), { encoding: 'utf8' } );
}

app.get( PATH, function( req, res ) {
	res.redirect( PATH + '/' );
} );

app.post( PATH + '/templates', function( req, res ) {

	var templates = loadTemplates();
	var newTemplate = req.body;

	// 마지막 id에 1을 더해서 새 id를 만든다.
	if ( templates && templates.length && templates.length > 0 )
		newTemplate.id = templates[ templates.length - 1 ].id + 1;
	else
		newTemplate.id = 1;

	// 배열에 추가
	templates.push( newTemplate );

	saveTemplates( templates );

	res.json( newTemplate );
} );

app.delete( PATH + '/templates/:id', function( req, res ) {

	var templates = loadTemplates();
	var templateToDelete;

	// id가 일치하는 항목을 삭제한다.
	for ( var i = 0; i < templates.length; i++ )
		if ( templates[ i ].id == req.params.id ) {
			templateToDelete = templates[ i ];
			templates.splice( i, 1 );
			break;
		}

	saveTemplates( templates );

	// 빈 응답을 보내면 클라이언트에서 삭제 성공하지 않은 것으로 판단한다.
	res.json( {} );
} );

app.post( PATH + '/bills', function( req, res ) {

	var bills = loadBills();
	var newBill = req.body;

	// 마지막 id에 1을 더해서 새 id를 만든다.
	if ( bills && bills.length && bills.length > 0 )
		newBill.id = bills[ bills.length - 1 ].id + 1;
	else
		newBill.id = 1;

	// 배열에 추가
	bills.push( newBill );

	saveBills( bills );

	res.json( newBill );
} );

app.delete( PATH + '/bills/:id', function( req, res ) {

	var bills = loadBills();
	var billToDelete;

	// id가 일치하는 항목을 삭제한다.
	for ( var i = 0; i < bills.length; i++ )
		if ( bills[ i ].id == req.params.id ) {
			billToDelete = bills[ i ];
			bills.splice( i, 1 );
			break;
		}

	saveBills( bills );

	// 빈 응답을 보내면 클라이언트에서 삭제 성공하지 않은 것으로 판단한다.
	res.json( billToDelete );
} );

app.listen( PORT );
console.log( 'Listening on port ' + PORT );
