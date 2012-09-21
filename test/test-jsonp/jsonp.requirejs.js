define( function ( window ) {

	// 기본값 정의
	var defaults = {
		callback: undefined,
		success: function ( data ) {
			alert( 'data : ' + JSON.stringify( data ) );
		},
		error: function ( err ) {
			var errStr = '';
		
			if( err.requireType ) {
				errStr += 'requireType : ' + err.requireType + '\n';	
			}

			if( err.requireModules ){
				err.requireModules.forEach( function ( item, index, array ){
					errStr += 'requireModules[ ' + index + ' ] : ' + item + '\n';
				} );
			}
			alert( errStr );
		}
	};

	// requirejs.onError 재정의
	// 이렇게 되면 전역 requirejs의 error handler가 재정의 되서 다른애들도 이렇게 되는건가? 
	// 이녀석 용으로 따로 만들수는 없나..? get 함수 내부에 넣어도 전역이라 차이점이 없을 듯 한데..
	requirejs.onError = function ( err ){
		defaults.error( err );
		throw err;
	}

	// get 함수
	function get( options ){
		
		// options 내용 defaults로 복사
		defaults.callback = options.callback || 'define';
		defaults.success = options.success || defaults.success;
		defaults.error = options.error || defaults.error;

		// queryString 작성
		var queryStr = options.url + '?callback=' + defaults.callback;

		for( var i in options.data ){
			queryStr += '&' + i + '=' + options.data[ i ];
		}

		// cache를 방지하기 위해 의미 없는 새로운 값을 추가로 붙여줌
		queryStr += '&_=' + Math.floor( Math.random() * 100000000 ) + 1;

		require( [ queryStr ], function ( data ) {
			// jsonp 요청 후 결과 값을 전달
			defaults.success( data );
		} );
	};

	return { get: get };
} );
