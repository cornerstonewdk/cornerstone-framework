
define( [ 'backbone', 'template!view/index' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page-index',

		render: function() {
			this.$el.html( template() );
			return this;
		},

		events: {
			'click button.prev': 'prevPage',
			'click button.next': 'nextPage'
		},

		prevPage: function() {
			location.href = '#page1';
		},

		nextPage: function() {
			location.href = '#page3';
		}
	} );
} );
