
define( [ 'jquery' ], function( $ ) {

	return {
		load: function( name, req, load, config ) {
			$.ajax( {
				url: req.toUrl( name + '.css' ),
				success: function( data ) {
				
					$( 'head' ).append( '<style></style>' );
					$( 'head style:last' ).text( data );
					
					load( data );
				},
				error: function( xhr, status, err ) {
					load.error( err );
				}
			} );
		}	
	};
} );
