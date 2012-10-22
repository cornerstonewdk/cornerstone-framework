define(function(require) {
	var $ = require("jquery");
	var Backbone = require("backbone");
	var BreadCrumb = require("util/breadcrumb");
	var PageTransition = require("util/pageTransition");

	var MainRouter = Backbone.Router.extend({
		
		DashboardView : null, 
		
		PricePolicyView : null,
		
		LteReportView : null,
		
		VocView : null,
		
		routes : {
			'' : 'dashboardRoute',
			'index' : 'dashboardRoute',
			'pricePolicy' : 'pricePolicyRoute',
			'lteReport' : 'lteReportRoute',
			'voc' : 'vocRoute',

			'*actions' : 'defaultAction'
		},
		
		dashboardRoute : function() {
			if(this.DashboardView == null) {
				this.DashboardView = require("view/dashboard/dashboardView");
			}
			
			var direction = BreadCrumb.manager.route('index', 'T-Dashboard');
			PageTransition.page.transition(direction, this.DashboardView);
		},

		lteReportRoute : function() {
			if(this.LteReportView == null) {
				this.LteReportView = require("view/lteReport/lteReportView");
			}
			
			var direction = BreadCrumb.manager.route('lteReport', 'LTE 개통 통계');
			PageTransition.page.transition(direction, this.LteReportView);
		},

		pricePolicyRoute : function() {
			if(this.PricePolicyView == null) {
				this.PricePolicyView = require("view/pricePolicy/pricePolicyView");
			}
			
			var direction = BreadCrumb.manager.route('pricePolicy', '정책');
			PageTransition.page.transition(direction, this.PricePolicyView);
		},

		vocRoute : function() {
			if(this.VocView == null) {
				this.VocView = require("view/voc/vocView");
			}
			
			var direction = BreadCrumb.manager.route('voc', 'VOC');
			PageTransition.page.transition(direction, this.VocView);
		},

		defaultAction : function(actions) {
			console.log('default route : ' + actions);
		},
	});

	new MainRouter();

	Backbone.history.start();
}); 