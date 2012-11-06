define( [ 'person' ], function ( Person ) {
	return {
		check: function () {
			console.log( '[ 7 ] 전달된 Person name값을 확인 : ' +  Person.name );
		}
	}
} );