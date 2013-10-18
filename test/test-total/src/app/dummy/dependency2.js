define( [ 'logging' ], function ( Logging ) {
	Logging.debug( '[ 6 ] dependency2 loaed.' );
	var dependency2 = { 'data': 2 }
	window.dependency2 = dependency2;
	return dependency2;
} );