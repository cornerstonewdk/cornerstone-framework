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
			'voc/:id' : 'vocRoute',
			'makePricePlan': 'makePricePlanRoute',
			'makePricePlan/:data': 'makePricePlanRoute',

			'*actions' : 'defaultAction'
		},
		
		dashboardRoute : function() {
			require(["dashboardView"], function(DashboardView) {
				var direction = BreadCrumb.manager.route('index', 'T-Dashboard');
				PageTransition.page.transition(direction, DashboardView);
			});
		},
		
		lteReportRoute : function() {
			require(["lteReportView"], function(LteReportView) {
				var direction = BreadCrumb.manager.route('lteReport', 'LTE 개통 통계');
				PageTransition.page.transition(direction, LteReportView);
			});
		},

		pricePlanRoute : function(id) {
			require(["pricePlanView"], function(PricePlanView) {
				var direction = BreadCrumb.manager.route('pricePlan', '정책');
				PricePlanView['selectedPricePlanId'] = id || null;
				PageTransition.page.transition(direction, PricePlanView);
			});
		},

		vocRoute : function(id) {
			require(["vocView"], function(VocView) {
				var direction = BreadCrumb.manager.route('voc', 'VOC');
				VocView['selectedVocId'] = id || null;
				PageTransition.page.transition(direction, VocView);
			});
		},
		
		makePricePlanRoute: function(data) {
			require(["makePricePlanView"], function(MakePricePlanView) {
				var title = (typeof(data) == 'undefined') ? '새로운 정책' : '정책 수정';
				var direction = BreadCrumb.manager.route('makePricePlan', title);
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