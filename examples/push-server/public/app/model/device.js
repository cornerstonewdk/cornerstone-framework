
define( [ 'backbone' ], function( Backbone ) {
	
	return Backbone.Model.extend( {

		validate: function( attrs ) {
			if ( !attrs.name ) return { attribute: 'name', message: '이름을 입력하세요.' };
			if ( attrs.name.length > 50 ) return { attribute: 'name', message: '이름이 너무 깁니다.' };
			if ( !attrs.type ) return { attribute: 'type', message: '종류를 선택하세요.' };
			if ( attrs.type != 'iphone' && attrs.type != 'android' ) return { attribute: 'type', message: '종류는 iphone/android 중에서만 선택할 수 있습니다.' };
			if ( !attrs.token ) return { attribute: 'token', message: '토큰을 입력하세요.' };
		}
	} );
} );
