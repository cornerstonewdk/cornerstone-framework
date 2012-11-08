
define( [ 'backbone', 'jquery', 'template!view/detail' ], function( Backbone, $, template ) {

	return Backbone.View.extend( {
	
		el: 'section#detail-section',

		initialize: function() {
		},

		render: function() {
			this.$el.html( template( { user: this.model.toJSON() } ) );
			return this;
		},

		events: {
			'click button#delete-button': 'delete'
		},

		'delete': function() {
			this.model.destroy();
			location.href = '#list';
		}
	} );
} );
