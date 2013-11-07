define( [ 'model/person' ], function ( Person ) {
	return {
		check: function () {
			return Person.name;
		}
	}
} );