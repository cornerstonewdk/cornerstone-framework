
define( [ 'backbone', 'template!view/home' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page-home',

		render: function() {
			this.$el.html( template( this.collection.toJSON() ) );
			return this;
		}
	} );
} );
