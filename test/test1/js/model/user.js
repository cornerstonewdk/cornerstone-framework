
define( [ 'backbone' ], function( Backbone ) {

	return Backbone.Model.extend( {

		validate: function( attrs ) {
			if ( !attrs.name ) return '이름을 입력하세요.';
			if ( attrs.name.length > 50 ) return '이름이 너무 깁니다.';
			if ( !attrs.email ) return '이메일을 입력하세요.';
			if ( attrs.email.length > 50 ) return '이메일이 너무 깁니다.';
			if ( !attrs.password ) return '비밀번호를 입력하세요.';
			if ( attrs.password.length > 50 ) return '비밀번호가 너무 깁니다.';
		}
	} );
} );
