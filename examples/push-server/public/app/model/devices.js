
define( [ 'backbone', 'model/device' ], function( Backbone, Device ) {
	
	return Backbone.Collection.extend( {
		model: Device,
		url: './data/devices.json'
	} );
} );
