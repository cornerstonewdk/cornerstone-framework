define(function(require) {
	var $ = require("jquery");
	var Backbone = require("backbone");
	var BreadCrumb = require("util/breadcrumb");
	var PageTransition = require("util/pageTransition");

	var MainRouter = Backbone.Router.extend({
		routes : {
			'' : 'dashboardRoute',
			'index' : 'dashboardRoute',
			'pricePlan' : 'pricePlanRoute',
			'lteReport' : 'lteReportRoute',
			'voc' : 'vocRoute',
			'makePricePlan/:data': 'makePricePlanRoute',

			'*actions' : 'defaultAction'
		},
		
		//이놈은 처음부터 떠있으니깐 무조건 불른다. 다른놈들은 이벤트 일어난 후에 로딩하도록 코딩 (안그러면 왜 그런진 모르겠지만 로드 순서가 자주 꼬인다.)
		dashboardRoute : function() {
			var DashboardView = require("view/dashboard/dashboardView");
			
			var direction = BreadCrumb.manager.route('index', 'T-Dashboard');
			PageTransition.page.transition(direction, DashboardView);
		},
		
		lteReportRoute : function() {
			require(["view/lteReport/lteReportView"], function(LteReportView) {
				var direction = BreadCrumb.manager.route('lteReport', 'LTE 개통 통계');
				PageTransition.page.transition(direction, LteReportView);
			});
		},

		pricePlanRoute : function() {
			require(["view/pricePlan/pricePlanView"], function(PricePlanView) {
				var direction = BreadCrumb.manager.route('pricePlan', '정책');
				PageTransition.page.transition(direction, PricePlanView);
			});
		},

		vocRoute : function() {
			require(["view/voc/vocView"], function(VocView) {
				var direction = BreadCrumb.manager.route('voc', 'VOC');
				PageTransition.page.transition(direction, VocView);
			});
		},
		
		makePricePlanRoute: function(data) {
			require(["view/pricePlan/makePricePlanView"], function(MakePricePlanView) {
				if(data == 'new') {
					MakePricePlanView.selectPlanData = null;
				} else {
					MakePricePlanView.selectPlanData = data;
				}
				
				var direction = BreadCrumb.manager.route('makePricePlan', '새로운 정책');
				PageTransition.page.transition(direction, MakePricePlanView);
			});
		},

		defaultAction : function(actions) {
			console.log('default route : ' + actions);
		},
	});

	new MainRouter();

	Backbone.history.start();
}); 