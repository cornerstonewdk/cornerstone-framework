
define( [ 'backbone', 'model/template' ], function( Backbone, Template ) {
	
	return Backbone.Collection.extend( {
		model: Template,
		url: './data/templates.json'
	} );
} );
