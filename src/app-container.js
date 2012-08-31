
/**
 * app-container.js
 * 애플리케이션의 메인 모듈을 로드해서, 모듈의 launch 메소드를 실행한다.
 * 메인 모듈을 로드하기 전에 모듈간의 의존성과 내용에 대한 디폴트 설정을 수행한다.
 */

requirejs.config( {
	baseUrl: Cornerstone.App.baseUrl,
	// 긴 경로명 대신 사용할 수 있는 alias를 지정한다.
	paths: {
		'jquery': Cornerstone.PATH_LIB + 'jquery-1.7.2.min',
		'underscore': Cornerstone.PATH_LIB + 'underscore-min',
		'backbone': Cornerstone.PATH_LIB + 'backbone-min',
		'handlebars': Cornerstone.PATH_LIB + 'handlebars-1.0.0.beta.6',
		'bootstrap': Cornerstone.PATH_LIB + 'bootstrap/js/bootstrap.min',
		'lawnchair': Cornerstone.PATH_LIB + 'lawnchair-0.6.1.min',
		'form-view': Cornerstone.PATH + 'mvc/view/form',
		'validation-view': Cornerstone.PATH + 'mvc/view/validation'
	},
	// 의존성 및 모듈의 value를 정의한다.
	// 기본적으로 주요 라이브러리들도 전역변수로는 사용하지 않는 것으로 한다.
	shim: {
		jquery: {
			exports: function() {
				return this.$.noConflict( true );
			}
		},
		underscore: {
			exports: function() {
				return this._.noConflict();
			}
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: function() {
				return this.Backbone.noConflict();
			}
		},
		bootstrap: {
			deps: ['jquery']
		},
		lawnchair: {
			exports: function() {
				// 전역변수에 선언된 Lawnchair를 삭제하면 제대로 동작하지 않는다.
				return this.Lawnchair;
			}
		}
	}
} );

// 메인 모듈을 로드하고 실행한다.
require( [ Cornerstone.App.mainModule ], function( main ) {
	main.launch();
} );
