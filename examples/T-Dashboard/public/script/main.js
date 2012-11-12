//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"transition": Cornerstone.PATH + "util/transition",
		"navigation":"../lib/navigation",
		"isotope": "../lib/jquery.isotope",
		"observer": "util/resizeObserver",
		"jsonp": Cornerstone.PATH + "util/jsonp",
		"yql": "../lib/jquery.query-yql.min",
		"dashboardView": "view/dashboard/dashboardView",
		"lteReportView": "view/lteReport/lteReportView",
		"pricePlanView": "view/pricePlan/pricePlanView",
		"vocView": "view/voc/vocView",
		"makePricePlanView": "view/pricePlan/makePricePlanView",
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
        
        "dashboardView": {
        	deps:["app-container"]
        },
        
        "lteReportView": {
        	deps:["app-container"]
        },
        
        "pricePlanView": {
        	deps:["app-container"]
        },
        
        "vocView": {
        	deps:["app-container"]
        },
        
        "makePricePlanView": {
        	deps:["app-container"]
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