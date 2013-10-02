
var express = require( 'express' );
var app = express();

const PATH = '/smart-bill';
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

app.get( PATH, function( req, res ) {
	res.redirect( PATH + '/' );
} );
app.get( PATH + '/hello', function( req, res ) {
	res.send( 'Hello' );
} );

app.listen( PORT );
console.log( 'Listening on port ' + PORT );
