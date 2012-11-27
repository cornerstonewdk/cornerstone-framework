
require.config( {
	// 긴 경로명 대신 사용할 수 있는 alias를 지정한다.
	paths: {
		'jquery': 'lib/jquery-1.7.2.min',
		'underscore': 'lib/underscore-min',
		'backbone': 'lib/backbone-min',
		'text': 'lib/text',
		'handlebars': 'lib/handlebars-1.0.0.beta',	// 잘못된 표기
		'bootstrap': '../bootstrap/js/bootstrap.min'
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
		}
	}
} );

// config를 나눠서 해도 문제없다.
// 그렇다면, Framework에서 기본 config를 제공하고 개발자에게 Override할 수 있도록 하자.
require.config( {
	paths: {
		'handlebars': 'lib/handlebars-1.0.0.beta.6'	// 앞에서의 설정을 Override
	}
} );

require( [ 'app' ], function( app ) {
	app.initialize();
} );
