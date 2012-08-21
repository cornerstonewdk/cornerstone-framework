
/**
 * launcher.js
 * 애플리케이션을 실행한다. script 태그의 data-target 속성으로 실행될 애플리케이션 메인의 모듈명을 지정한다.
 */
( function( global ) {

	/**
	 * URL에서 경로 부분과 파일 부분을 분리한다.
	 */
	function parseUrl( url ) {
		return {
			path: url.substring( 0, url.lastIndexOf( '/' ) + 1 ),	// /로 끝나는 경로명
			file: url.substring( url.lastIndexOf( '/' ) + 1 )		// 파일명
		};
	}
	
	/**
	 * Cornerstone Root Path로 Library Path를 구한다.
	 * 현재는 Library가 Cornerstone Root Path 밖에 관리되고 있으나 추후에는 포함되어야 한다.
	 */
	function getLibPath( path ) {
		return path + '../lib/';
	}

	// script 태그들을 검색하고, data-target 속성을 추출한다.
	var scripts = document.getElementsByTagName( 'script' );
	var container, src, dataTarget;
	
	// 거꾸로 탐색한다. 가장 마지막 script 태그가 가장 우선된다.
	for ( var i = scripts.length - 1; i > -1; i-- ) {
	
		container = scripts[ i ].parentNode;
		src = scripts[ i ].getAttribute( 'src' );
		dataTarget = scripts[ i ].getAttribute( 'data-target' );
		
		if ( dataTarget ) {
		
			// launcher.js 파일의 경로를 기반으로 require.js 파일의 경로를 계산한다.
			var path =  parseUrl( src ).path;
			var pathLib = getLibPath( path );
			var app = parseUrl( dataTarget );
			var loc = parseUrl( location.href );
			
			// Cornerstone 전역 객체를 만든다.
			global.Cornerstone = global.CS = {
				VERSION: '1.0',
				PATH: loc.path + path,
				PATH_LIB: loc.path + pathLib,
				App: {
					baseUrl: app.path,
					mainModule: app.file
				}
			};
			
			// script 태그를 만들어 container에 추가한다.
			var node = document.createElement( 'script' );
			node.type = 'text/javascript';
			node.charset = 'utf-8';
			node.async = true;
			node.src = pathLib + 'require.js';
			
			node.setAttribute( 'data-main', path + 'app-container' );
			
			container.appendChild( node );
			
			break;
		}
	}
	
} )( this );
