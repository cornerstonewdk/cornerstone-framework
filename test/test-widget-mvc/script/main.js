//추가 모듈 및 의존성 정의
requirejs.config({
    baseUrl:"script/",
	paths: {
        // My App
		"transit": "../lib/jquery.transit",
        "isotope": "../lib/jquery.isotope"
	},
	
	shim: {
        "isotope": {
        	deps:["jquery"]
        }
	}
});

define(['router', 'bootstrap'], function(Router) {
	return {
		launch: function() {
			// 애플리게이션의 시작점
			
		}
	}
});