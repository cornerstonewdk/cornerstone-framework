
define( [ 'backbone', 'lawnchair' ], function( Backbone, Lawnchair ) {

	new Lawnchair( function() {

		var newId = 1;
		var lc = this;

		lc.all( function( obj ) {

			var maxId;

			for ( var i = 0; i < obj.length; i++ )
				if ( !maxId || maxId < obj[ i ].model.id ) maxId = obj[ i ].model.id;

			if ( maxId ) newId = maxId + 1;
		} );

		// fetch, save, destroy 시에 데이터를 저장한다.
		Backbone.sync = function( method, model, options ) {

			switch ( method ) {
				case 'read':
					if ( model.id )
						lc.get( model.id, function( obj ) {

							if ( obj ) options.success( obj.model );
							// TODO 오류 발생 부분을 공통화
							else options.error( 'Record not found' );
						} );
					else
						lc.all( function( obj ) {

							var models = [];

							for ( var i = 0; i < obj.length; i++ )
								models.push( obj[ i ].model );

							options.success( models );
						} );
					break;
				case 'create':
					model.set( { id: newId++ } );
					lc.save( { key: model.id, model: model }, function( obj ) {
						options.success( model );
					} );
					break;
				case 'update':
					break;
				case 'delete':
					lc.remove( model.id, function() {
						options.success();
					} );
					break;
			}
		};
	} );
} );
