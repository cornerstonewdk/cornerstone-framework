
define( [ 'backbone', 'template!view/detail' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page-detail',

		initialize: function() {

		},

		render: function() {
			this.$el.html( template( { collection: this.collection.toJSON(), model: this.model.toJSON() } ) );
			this.$( '[data-id=' + this.model.id + ']' ).addClass( 'active' );
			return this;
		}
	} );
} );
