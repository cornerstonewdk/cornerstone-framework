
define( [ 'backbone', 'handlebars' ], function() {

	return Backbone.View.extend( {

		el: $( 'section#list-section' ),

		template: Handlebars.compile( $( '#list-template' ).html() ),

		initialize: function() {},

		render: function() {
			this.$el.html( this.template( { users: [] } ) );
		}
	} );
} );
