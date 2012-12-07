
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'jquery', 'form-view', 'model/user', 'view/alert-validation' ], function( $, FormView, User, AlertValidation ) {
	return {
		launch: function() {
		
			// FormView를 생성하면서 넘겨주는 model의 값이 form과 동기화되므로 form의 기본값이 된다.
			var formView = new FormView( {
				el: '#add-form',
				model: new User( { name: '홍길동', email: 'default@gmail.com' } ),
				validationViewClass: AlertValidation
			} );
		
			$( '#add-form' ).submit( function() {
			
				var user = formView.toModel();
	
				if ( user.isValid() ) {
					$( this ).prepend( '<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a>정상적으로 추가되었습니다.</div>' );
				}
	
				return false;
			} );
		}	
	};
} );
