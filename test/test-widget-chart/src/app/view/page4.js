
define( [ 'backbone', 'template!view/page4' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page4',

		render: function() {
			this.$el.html( template() );
            window.activeDataApi(this.$el);
			return this;
		},

        events: {
            'click button.prev': 'prevPage',
            'click button.next': 'nextPage'
        },

        prevPage: function() {
            location.href = '#page3';
        },

        nextPage: function() {
            location.href = '#page5';
        }
	} );
} );
