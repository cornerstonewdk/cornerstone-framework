
/**
 * Model을 fetch, save, destroy 할 때, Collection을 fetch 할 때 Model과 저장소를 동기화한다.
 * 저장소는 경우에 따라 달라질 수 있다. (LocalStorage, RESTful Server, ...)
 */
define( [ 'backbone', 'lawnchair' ], function( Backbone, Lawnchair ) {

	var sync = {};
	
	// Model/Collection 인지에 따라, method 에 따라 적절한 함수가 실행되는 sync 함수를 만든다.
	sync.createSync = function( funcs ) {
	
		// funcs 객체는 readAll, read, create, update, delete 함수를 가져야 한다.
		return function( method, model, options ) {
		
			switch ( method ) {
				case 'read':
					if ( model instanceof Backbone.Collection )
						funcs.readAll && funcs.readAll( model, options );
					else
						funcs.read && funcs.read( model, options );
					
					break;
				case 'create':
					funcs.create && funcs.create( model, options );
					break;
				case 'update':
					funcs.update && funcs.update( model, options );
					break;
				case 'delete':
					funcs[ 'delete' ] && funcs[ 'delete' ]( model, options );
					break;
			}
		};
	}
	
	sync.local = sync.createSync( {
	
		'readAll': function( collection, options ) {
		
			// 해당 Collection에 속해있던 Model인지 판별하기 위해 Collection의 url이 일치하는지를 확인한다.
			new Lawnchair( function() {
				this.all( function( obj ) {

					var models = [];

					for ( var i = 0; i < obj.length; i++ )
						if ( obj[ i ].model.collectionUrl === collection.url ) models.push( obj[ i ].model );

					options.success( models );
				} );
			} );
		},
		
		'read': function( model, options ) {
			new Lawnchair( function() {
				this.get( model.id, function( obj ) {

					if ( obj ) options.success( obj.model );
					// TODO 오류 발생 부분을 공통화
					else options.error( 'Record not found' );
				} );
			} );
		},
		
		'create': function( model, options ) {
			new Lawnchair( function() {
			
				// id가 지정되어 있지 않으면 cid를 id로 사용한다.
				if ( !model.id ) model.set( { id: model.cid } );
				
				// Model이 Collection에 속해 있다면, Model에 collectionUrl 속성을 추가한다.
				if ( model.collection ) model.set( { collectionUrl: model.collection.url } );
				
				this.save( { key: model.id, model: model.toJSON() }, function( obj ) {
					options.success( model );
				} );
			} );
		},
		
		'update': function( model, options ) {
			new Lawnchair( function() {
				this.save( { key: model.id, model: model.toJSON() }, function( obj ) {
					options.success( model );
				} );
			} );
		},
		
		'delete': function( model, options ) {
			new Lawnchair( function() {
				this.remove( model.id, function() {
					options.success();
				} );
			} );
		}
	} );

	return sync;
} );
