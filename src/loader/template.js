
define( [ 'jquery', 'handlebars' ], function( $, Handlebars ) {

	return {
		load: function( name, req, load, config ) {
			$.ajax( {
				url: req.toUrl( name + '.template' ),
				success: function( data ) {
					load( Handlebars.compile( data ) );
				},
				error: function( xhr, status, err ) {
					load.error( err );
				}
			} );
		}	
	};
} );
