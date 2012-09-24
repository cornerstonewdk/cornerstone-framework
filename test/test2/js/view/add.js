
define( [ 'model/user', 'backbone', 'jquery', 'form-view', 'view/alert-validation', 'handlebars' ], function( User, Backbone, $, FormView, AlertValidationView ) {

	// TODO 입력 폼을 위한 View를 따로 만들어야 할까?
	// TODO Class를 넘기는 경우(AlertValidation, User)와 인스턴스를 넘기는 경우(new AlertValidation())의 명칭을 구분해야 할 듯
	return Backbone.View.extend( {

		el: $( 'section#add-section' ),

		template: Handlebars.compile( $( '#add-template' ).html() ),

		initialize: function() {
			this.model = new User( { name: '홍길동', email: 'default@gmail.com' } );
		},

		render: function() {
			this.$el.html( this.template() );
			this.formView = new FormView( { el: this.$( '#add-form' ), model: this.model } );
			return this;
		},

		events: {
			'submit #add-form': 'addUser'
		},

		addUser: function() {
		
			var user = this.formView.toModel();

			if ( user.isValid() ) {
				this.collection.add( user );
				user.save();

				// 추가하고 나서는 목록으로 이동
				location.href = '#list';
			}

			return false;
		}
	} );
} );
