define( [ 'backbone', 'template!templates/list' ], function ( Backbone, template ) {

	return Backbone.View.extend( {

		el: '#section-list',

		events: {
			'click #refresh': 'refresh',
			'click button.close': 'delete'
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
		},

		delete: function( event ) {

			var self = this;

			if ( confirm( '정말 삭제하시겠습니까?' ) ) {
				var bill = this.collection.get( $( event.target ).attr( 'data-id' ) );
				bill.on( 'sync', function() {
					self.render();
				} );
				bill.destroy();
			}
		}
	} );
} );
