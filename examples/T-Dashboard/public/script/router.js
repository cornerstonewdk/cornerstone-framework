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
			'pricePlan/:id' : 'pricePlanRoute',
			'lteReport' : 'lteReportRoute',
			'voc' : 'vocRoute',
			'makePricePlan': 'makePricePlanRoute',
			'makePricePlan/:data': 'makePricePlanRoute',

			'*actions' : 'defaultAction'
		},
		
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

		pricePlanRoute : function(id) {
			require(["view/pricePlan/pricePlanView"], function(PricePlanView) {
				var direction = BreadCrumb.manager.route('pricePlan', '정책');
				PricePlanView['selectedPricePlanId'] = id || null;
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
				var direction = BreadCrumb.manager.route('makePricePlan', '새로운 정책');
				MakePricePlanView.selectPlanData = data || null;
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