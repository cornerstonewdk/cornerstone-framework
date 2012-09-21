
define( [ 'backbone' ], function( Backbone ) {

	return Backbone.Model.extend( {

		validate: function( attrs ) {
			if ( !attrs.name ) return { attribute: 'name', message: '이름을 입력하세요.' };
			if ( attrs.name.length > 50 ) return { attribute: 'name', message: '이름이 너무 깁니다.' };
			if ( !attrs.email ) return { attribute: 'email', message: '이메일을 입력하세요.' };
			if ( attrs.email.length > 50 ) return { attribute: 'email', message: '이메일이 너무 깁니다.' };
			if ( !attrs.password ) return { attribute: 'password', message: '비밀번호를 입력하세요.' };
			if ( attrs.password.length > 50 ) return { attribute: 'password', message: '비밀번호가 너무 깁니다.' };
			if ( !attrs.interest ) return { attribute: 'interest', message: '관심분야를 선택하세요.' };
			if ( attrs.interest.length > 3 ) return { attribute: 'interest', message: '최대 3개까지만 선택할 수 있습니다.' };
		}
	} );
} );
