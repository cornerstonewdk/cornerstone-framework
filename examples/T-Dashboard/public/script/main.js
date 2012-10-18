//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"jquery-transit": "../lib/jquery.transit",
		"transition":"../lib/transition",
		"navigation":"../lib/navigation",
		"isotope": "../lib/jquery.isotope",
		"observer": "util/resizeObserver",
		"jsonp": Cornerstone.PATH + "util/jsonp"
	},
	
	shim: {
		"jquery-transit":{
            deps:["jquery"]
        },
        
        "transition":{
            deps:["jquery-transit"],
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
	}
});

define(['router', 'observer', 'widget-plugins'], function(Router, Observer) {
	return {
		launch: function() {
			// 애플리게이션의 시작점
			Observer.resize.listen();
		}
	}
});