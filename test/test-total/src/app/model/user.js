define( [ 'backbone', 'logging' ], function( Backbone, Logging ) {
    return Backbone.Model.extend( {
    	//urlRoot: '/users',
        defaults: {
            name: '홍길동',
            age: 40,
            gender: 'male',
            male: true,
            job: '불효자',
            init: false
        },
        initialize: function() {
            this.set( 'init', true );
        },
        validate: function( attrs ) {
        if ( !attrs.name )
            return { attribute: 'name', message: '이름을 입력하세요.' };
        if ( attrs.name.length > 50 )
            return { attribute: 'name', message: '이름이 너무 깁니다. 50자 이하로 입력 해주세요.' };
    	if ( !attrs.age )
    		return { attribute: 'age', message: '나이를 입력하세요.' };
    	if ( !attrs.job )
    		return { attribute: 'job', message: '성별을 입력하세요.' };
    	}
    } );
} );