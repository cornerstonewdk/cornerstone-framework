
define( [ 'backbone', 'model/document' ], function( Backbone, Document ) {
	
	return Backbone.Collection.extend( {
		model: Document,
		url: 'data/documents.json'
	} );
} );
