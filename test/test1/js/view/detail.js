
define( [ 'backbone', 'jquery', 'handlebars' ], function( Backbone, $ ) {

	return Backbone.View.extend( {

		// Bootstrap modal
		tagName: 'div',

		template: Handlebars.compile( $( '#detail-template' ).html() ),

		initialize: function() {

			$( document ).append( this.render().el );

			var self = this;

			// TODO 여기에 대한 공통 메커니즘이 필요하다. modal 관리를 전역적으로 해야 하나?
			this.$el.modal().on( 'hidden', function() {
				self.remove();
				// TODO list, add 페이지가 뜨면서 modal을 닫는 경우는 제외해야 한다.
				if ( !self.disposed ) history.back();
			} );
		},

		render: function() {

			if ( this.model ) {
				this.$el.addClass( 'modal fade' );
				this.$el.html( this.template( { user: this.model.toJSON() } ) );
			}

			return this;
		},

		events: {
			'click button#delete-button': 'delete'
		},

		delete: function() {
			this.collection.remove( this.model );
			location.href = '#list';
		},

		dispose: function() {
			this.$el.modal( 'hide' );
			this.disposed = true;
		}
	} );
} );
