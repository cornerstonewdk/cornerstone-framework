
define( [ 'backbone', 'template!view/page5' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page5',

		render: function() {
			this.$el.html( template() );
            window.activeDataApi(this.$el);
			return this;
		},

		events: {
			'click button.prev': 'prevPage'
		},

		prevPage: function() {
			location.href = '#page4';
		}
	} );
} );
