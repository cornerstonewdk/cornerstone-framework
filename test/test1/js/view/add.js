
define( [ 'model/user', 'backbone', 'jquery', 'handlebars' ], function( User, Backbone, $ ) {

	// TODO 입력 폼을 위한 View를 따로 만들어야 할까?
	// TODO Validation
	return Backbone.View.extend( {

		el: $( 'section#add-section' ),

		template: Handlebars.compile( $( '#add-template' ).html() ),

		initialize: function() {
			this.form = $( '#add-form' );
		},

		render: function() {
			this.$el.html( this.template() );
			return this;
		},

		events: {
			'submit #add-form': 'addUser'
		},

		addUser: function() {

			var user = new User();

			// Model의 validate는 set, save 시에만 동작한다.
			// TODO Form의 elements들을 JSON으로 변환하는 방법, ValidationError
			user.set( {
				name: this.$( ':input#name' ).val(),
				email: this.$( ':input#email' ).val(),
				password: this.$( ':input#password' ).val()
			}, {
				error: function( model, err ) {
					alert( err );
				}
			} );

			if ( user.isValid() ) {
				this.collection.add( user );

				// 추가하고 나서는 목록으로 이동
				location.href = '#list';
			}

			return false;
		}
	} );
} );
