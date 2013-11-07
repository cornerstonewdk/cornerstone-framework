
define( [ 'backbone', 'template!view/index' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page-index',

		render: function() {
			this.$el.html( template( this.collection.toJSON() ) );
			return this;
		}
	} );
} );
