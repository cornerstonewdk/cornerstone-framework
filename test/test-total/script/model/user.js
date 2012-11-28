define( [ 'backbone', 'logging' ], function( Backbone, Logging ) {
    return Backbone.Model.extend( {
    	//urlRoot: '/users',
        defaults: {
            name: '홍길동',
            age: 40,
            gender: 'male'
        },
        initialize: function() {
            Logging.debug( '[ 8, 9 ] user created' );
        },
        validate: function( attrs ) {
        if ( !attrs.name )
            return { attribute: 'name', message: '[ 24 ] 이름을 입력하세요.' };
        if ( attrs.name.length > 50 )
            return { attribute: 'name', message: '[ 24 ] 이름이 너무 깁니다.' };
    	if ( !attrs.age )
    		return { attribute: 'age', message: '[ 24 ] 나이를 입력하세요.' };
    	if ( !attrs.gender )
    		return { attribute: 'gender', message: '[ 24 ] 성별을 입력하세요.' };
    	}
    } );
} );