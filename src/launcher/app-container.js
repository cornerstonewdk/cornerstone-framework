
/**
 * app-container.js
 * 애플리케이션의 메인 모듈을 로드해서, 모듈의 launch 메소드를 실행한다.
 * 메인 모듈을 로드하기 전에 디폴트 설정을 수행한다.
 */

requirejs.config( {
	baseUrl: Cornerstone.App.baseUrl
} );

// 메인 모듈을 로드하고 실행한다.
require( [ Cornerstone.App.mainModule ], function( main ) {
	main.launch();
} );
