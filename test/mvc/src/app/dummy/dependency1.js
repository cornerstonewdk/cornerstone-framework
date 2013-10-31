define( [ 'logging' ], function ( Logging ) {
	Logging.debug( '[ 6 ] dependency1 loaed.' );
	var dependency1 = { 'data': 1 }
	window.dependency1 = dependency1;
	return dependency1;
} );