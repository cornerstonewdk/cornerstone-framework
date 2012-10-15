//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"jquery-transit": "../lib/jquery.transit",
		"transition":"../lib/transition",
		"navigation":"../lib/navigation",
		"gridster": "../lib/gridster/jquery.gridster",
		"chart": "../lib/featured-chart",
		"isotope": "../lib/jquery.isotope",
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
        
        "gridster": {
        	deps:["jquery"]
        },
        
        "chart": {
        	deps:["jquery"]
        },
        
        "isotope": {
        	deps:["jquery"]
        },
	}
});

define(['router', 'bootstrap'], function(Router) {
	return {
		launch: function() {
			// 애플리게이션의 시작점
			
		}
	}
});