
define( [ 'model/user', 'backbone' ], function( User, Backbone ) {

	return Backbone.Collection.extend( {
		model: User,
		url: '/user'
	} );
} );
