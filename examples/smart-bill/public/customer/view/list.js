define( [ 'backbone', 'template!templates/list' ], function ( Backbone, template ) {

	return Backbone.View.extend( {

		el: '#section-list',

		events: {
			'click #refresh': 'refresh'
		},

		initialize: function () {
		},

		render: function () {
			// 목록페이지 랜더링
			this.$el.html( template( this.collection.toJSON() ) );
			return this;
		},

		refresh: function() {
			location.reload();
		}
	} );
} );
