
define( [ 'backbone', 'widget-scrollview', 'template!view/detail' ], function( Backbone, ScrollView, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page-detail',

		initialize: function() {

		},

		render: function() {
			this.$el.html( template( { collection: this.collection.toJSON(), model: this.model.toJSON() } ) );
			this.$( '[data-id=' + this.model.id + ']' ).addClass( 'active' );

			this.$el.find("#scrollView").featuredScrollView();

			return this;
		}
	} );
} );
