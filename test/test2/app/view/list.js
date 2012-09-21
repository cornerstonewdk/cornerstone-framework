
define( [ 'backbone', 'template!view/list' ], function( Backbone, template ) {

	return Backbone.View.extend( {

		el: $( 'section#list-section' ),

		initialize: function() {
			// collection에 변동이 있으면 다시 렌더링한다.
			this.collection.on( 'all', this.render, this );
		},

		render: function() {
			this.$el.html( template( { users: this.collection.toJSON() } ) );
			return this;
		}
	} );
} );
