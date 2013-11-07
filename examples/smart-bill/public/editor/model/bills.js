
define( [ 'backbone', 'model/bill' ], function( Backbone, Bill ) {
	
	return Backbone.Collection.extend( {
		model: Bill,
		url: './data/bills.json'
	} );
} );
