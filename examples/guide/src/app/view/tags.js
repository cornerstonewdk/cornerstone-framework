
define( [ 'backbone', 'template!view/tags' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page-tags',

		render: function() {
			this.$el.html( template() );
			return this;
		},

		events: {
			'click button.prev': 'prevPage'
		},

		prevPage: function() {
			location.href = '#page2';
		}
	} );
} );
