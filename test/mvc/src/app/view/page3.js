
define( [ 'backbone', 'template!view/page3' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page3',

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
