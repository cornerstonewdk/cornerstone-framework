define( [ 'backbone', 'widget-scrollview', 'template!view/detail' ], function ( Backbone, ScrollView, template ) {

	return Backbone.View.extend( {

		el: 'section#page-detail',

		initialize: function () {

		},

		render: function () {
			this.$el.html( template( { collection: this.collection.toJSON(), model: this.model.toJSON() } ) );
			this.$( '[data-id=' + this.model.id + ']' ).addClass( 'active' );

			this.$el.find( "#scrollView" ).featuredScrollView();

			this.customMarkdown();
			return this;
		},

		customMarkdown: function () {
			var $docContent = this.$el.find( ".doc-content" );
			$docContent.find( "table" ).addClass( "table table-bordered table-hover table-striped" )
				.wrap( $( '<div/>', {'class': 'table-responsive'} ) );
		}
	} );
} );
