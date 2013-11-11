define( [ 'jquery', 'backbone', 'form-view', 'template!templates/send', 'model/message' ], function ( $, Backbone, FormView, template, Message ) {

	return Backbone.View.extend( {

		events: {
			'submit #form-send': 'send'
		},

		initialize: function () {
			this.listenTo( this.collection, 'sync', this.render );
		},

		render: function () {
			this.$el.html( template( this.collection.toJSON() ) );
			this.formView = new FormView( { el: '#form-send', model: new Message() } );
			return this;
		},

		send: function() {

			var message = this.formView.toModel();

			if ( message.isValid() )
				$.post( 'send', message.toJSON(), function() {
					$( '#modal-send p' ).html( '메시지가 성공적으로 전송되었습니다.' );
					$( '#modal-send' ).modal();
				} );

			return false;
		}
	} );
} );
