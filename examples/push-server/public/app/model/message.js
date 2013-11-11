
define( [ 'backbone' ], function( Backbone ) {
	
	return Backbone.Model.extend( {

		validate: function( attrs ) {
			if ( !attrs.subject ) return { attribute: 'subject', message: '회의 제목을 입력하세요.' };
			if ( attrs.subject.length > 50 ) return { attribute: 'subject', message: '회의 제목이 너무 깁니다.' };
			if ( !attrs.date ) return { attribute: 'date', message: '회의 시간을 입력하세요.' };
			if ( !attrs.message ) return { attribute: 'message', message: '메시지를 입력하세요.' };
			if ( !attrs.to ) return { attribute: 'to', message: '디바이스를 선택하세요.' };
		}
	} );
} );
