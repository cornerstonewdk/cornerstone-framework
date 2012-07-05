
require.config( {
	// 긴 경로명 대신 사용할 수 있는 alias를 지정한다.
	paths: {
		'jquery': 'lib/jquery-1.7.2.min',
		'underscore': 'lib/underscore-min',
		'backbone': 'lib/backbone-min',
		'text': 'lib/text',
		'handlebars': 'lib/handlebars-1.0.0.beta.6',
		'bootstrap': '../bootstrap/js/bootstrap.min'
	},
	// 의존성 및 모듈의 value를 정의한다.
	// TODO 모든 모듈을 파라미터로 받아야 할까? 일부는 전역변수를 허용해야 할까?
	shim: {
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

require( [ 'app' ], function( app ) {
	app.initialize();
} );
