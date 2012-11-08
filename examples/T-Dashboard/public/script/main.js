//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"transition": Cornerstone.PATH + "util/transition",
		"navigation":"../lib/navigation",
		"isotope": "../lib/jquery.isotope",
		"observer": "util/resizeObserver",
		"jsonp": Cornerstone.PATH + "util/jsonp",
		"yql": "../lib/jquery.query-yql.min",
	},
	
	shim: {
        "transition":{
            deps:["jquery"],
            exports: "Transition"
        },
        
        "navigation": {
        	deps:["transition"]
        },
        
        "isotope": {
        	deps:["jquery"]
        },
        
        "observer": {
        	deps:["enquire"]
        },
        
        "yql": {
        	deps:["jquery"]
        },
	}
});

define(['router', 'widget-plugins'], function(Router) {
	return {
		launch: function() {
			// 애플리게이션의 시작점
		}
	}
});