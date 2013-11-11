define( [ 'underscore', 'jquery', 'backbone', 'template!templates/devices' ], function ( _, $, Backbone, template ) {

	return Backbone.View.extend( {

		events: {
			'dblclick tr': 'modifyForm'
		},

		initialize: function () {
			this.listenTo( this.collection, 'sync', this.render );
		},

		render: function () {
			this.$el.html( template( this.collection.toJSON() ) );
			return this;
		},

		modifyForm: function( event ) {

		}
	} );
} );
