define( [ 'person', 'logging' ], function ( Person, Logging ) {
	return {
		check: function () {
			Logging.debug( '[ 7 ] 전달된 Person name값을 확인 : ' +  Person.name );
		}
	}
} );