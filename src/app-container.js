
/**
 * app-container.js
 * 애플리케이션의 메인 모듈을 로드해서, 모듈의 launch 메소드를 실행한다.
 * 메인 모듈을 로드하기 전에 모듈간의 의존성과 내용에 대한 디폴트 설정을 수행한다.
 */

requirejs.config( {
	baseUrl: Cornerstone.App.baseUrl,
	// 긴 경로명 대신 사용할 수 있는 alias를 지정한다.
	paths: {
		'jquery': Cornerstone.PATH_LIB + 'jquery-1.8.1.min',
		'underscore': Cornerstone.PATH_LIB + 'underscore-min',
		'backbone': Cornerstone.PATH_LIB + 'backbone-min',
		'handlebars': Cornerstone.PATH_LIB + 'handlebars-1.0.0.beta.6',

//      Widget Plugin에 포함
//		'bootstrap': Cornerstone.PATH_LIB + 'bootstrap/js/bootstrap.min',

		'lawnchair': Cornerstone.PATH_LIB + 'lawnchair-0.6.1.min',
		'hammer': Cornerstone.PATH_LIB + 'hammer',
		'jquery.hammer': Cornerstone.PATH_LIB + 'jquery.hammer',
		'enquire': Cornerstone.PATH_LIB + 'enquire.min',
		'template': Cornerstone.PATH + 'loader/template',
		'style': Cornerstone.PATH + 'loader/style',
		'sync': Cornerstone.PATH + 'mvc/model/sync',
		'form-view': Cornerstone.PATH + 'mvc/view/form',
		'validation-view': Cornerstone.PATH + 'mvc/view/validation',
		'gesture-view': Cornerstone.PATH + 'mvc/view/gesture',

        // Widget Alias 추가
        'widget-plugins' : Cornerstone.PATH + 'ui/widget-plugins',
        'widget-chart' : Cornerstone.PATH + 'ui/widget-chart',
        'widget-datatable' : Cornerstone.PATH + 'ui/widget-datatable',
        'widget-editor' : Cornerstone.PATH + 'ui/widget-editor',
        'widget-listview' : Cornerstone.PATH + 'ui/widget-listview',
        'widget-media' : Cornerstone.PATH + 'ui/widget-media',
        'widget-scrollview' : Cornerstone.PATH + 'ui/widget-scrollview'
	},
	// 의존성 및 모듈의 value를 정의한다.
	// 기본적으로 주요 라이브러리들도 전역변수로는 사용하지 않는 것으로 한다.
	shim: {
		'jquery': {
			exports: function() {
				return this.$.noConflict( true );
			}
		},
		'underscore': {
			exports: function() {
				return this._.noConflict();
			}
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: function() {
				return this.Backbone.noConflict();
			}
		},
//		'bootstrap': {
//			deps: ['jquery']
//		},
		'lawnchair': {
			exports: function() {
				// 전역변수에 선언된 Lawnchair를 삭제하면 제대로 동작하지 않는다.
				return this.Lawnchair;
			}
		},
		'handlebars': {
			exports: function() {
				return this.Handlebars;
			}
		},
		'jquery.hammer': {
			deps: ['hammer', 'jquery']
		},
		'enquire': {
			exports: function() {
				return this.enquire;
			}
		},
        'widget-plugins' : {
            deps: ['jquery']
        },
        'widget-chart' : {
            deps: ['jquery']
        },
        'widget-datatable' : {
            deps: ['jquery']
        },
        'widget-editor' : {
            deps: ['jquery']
        },
        'widget-listview' : {
            deps: ['jquery']
        },
        'widget-media' : {
            deps: ['jquery']
        },
        'widget-scrollview' : {
            deps: ['jquery']
        }
	}
} );

// 메인 모듈을 로드하고 실행한다.
require( [ Cornerstone.App.mainModule ], function( main ) {
	main.launch();
} );
