//require.js 가 시작할때 하는일 정의
require.config({
	//긴 경로명 대신 사용할수 있는 alias를 지정한다.
	paths: {
		'jquery': './libs/jquery/jquery-1.7.2',
		'underscore': './libs/underscore/underscore',
		'backbone': './libs/backbone/backbone',
		'socketio': '/socket.io/socket.io',
		
		'text': './libs/require/plugins/text',
	},
	
	// 의존성 및 모듈의 value를 정의한다. (브라우저에서 this는 window)
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
	}
});

require(
	//필요한것 정의
	[
		'app'
	],
	function(App) {
		App.initialize();	
	}
);
