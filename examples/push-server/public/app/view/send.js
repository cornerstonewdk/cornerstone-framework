define( [ 'backbone', 'template!templates/send' ], function ( Backbone, template ) {

	return Backbone.View.extend( {

		events: {
			'submit #form-send': 'send'
		},

		initialize: function () {
			this.listenTo( this.collection, 'sync', this.render );
		},

		render: function () {
			this.$el.html( template( this.collection.toJSON() ) );
			return this;
		},

		send: function() {
			alert( 'send' );
			return false;
		}
	} );
} );
