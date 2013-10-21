define( [ 'underscore', 'jquery', 'backbone', 'template!templates/tablet' ], function ( _, $, Backbone, template ) {

	return Backbone.View.extend( {

		el: '#tab-tablet',

		initialize: function () {
		},

		render: function () {
			this.$el.html( template( this.model.toJSON() ) );
			return this;
		}
	} );
} );
