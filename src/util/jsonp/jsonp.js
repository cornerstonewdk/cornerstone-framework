/**
 * jsonp.js
 */
;( function ( root, doc, factory ) {
	// root 는 window 객체이다.
    if ( typeof define === "function" && define.amd ) {
        // AMD 방식 로딩
		define( [ "jquery" ], function ( $ ) {
			return factory( $, root, doc );
		} );
    } else {
    	// CommonJS 방식 로딩
    	factory( root.jQuery, root, doc );
    }
}( this, document, function ( $, window, document, undefined ) {

	// 전역객체로 jsonp 선언
	var Jsonp = window.Jsonp = {};
	
	// get 함수 정의
	Jsonp.get = function ( options ) {

		// 기본설정
		var defaults = {
			cache: false,
			data: undefined,
			dataType: 'jsonp',
			jsonp: 'callback',
			url: undefined,
			timeout: 1000 * 3,
			success: function ( data ) {
				alert( 'result data : ' + data );
			},
			error: function ( jqXHR, textStatus, errorThrown ) {
	      		alert( 'error : ' + errorThrown.statusText );
			}
		}

		// 사용자가 넘겨준 options를 defaults와 병합하여 opt를 생성한다.
		var opt = $.extend( defaults, options );

		// options.callback 이 존재할 경우 jquery 형식으로 응답받을 callback
		// 함수명을 설정해준다.
		if( options.callback )
			opt.jsonpCallback = options.callback;

		// 새로 생성한 opt을 가지고 ajax 요청을 수행한다.
		$.ajax( opt );
	};

	return Jsonp;
} ) );