define(['backbone',
		'util/breadcrumb', 
		'util/pageTransition',
		'view/pricePolicy/pricePolicyView',
		'view/dashboard/dashboardView',
		'view/lteReport/lteReportView',
		'view/voc/vocView',
		], 
function(
		Backbone,
		BreadCrumb, 
		PageTransition, 
		PricePolicyView,
		DashboardView,
		LteReportView,
		VocView
) {
	var MainRouter = Backbone.Router.extend({
		routes: {
			'': 'dashboardRoute',
			'index': 'dashboardRoute',
			'pricePolicy': 'pricePolicyRoute',
			'lteReport': 'lteReportRoute',
			'voc': 'vocRoute',
			
			'*actions': 'defaultAction'
		},

		dashboardRoute: function() {
			var direction = BreadCrumb.manager.route('index', 'T-Dashboard');
			PageTransition.page.transition(direction, DashboardView);
		},
		
		lteReportRoute: function() {
			var direction = BreadCrumb.manager.route('lteReport', 'LTE 개통 통계');
			PageTransition.page.transition(direction, LteReportView);
		},
		
		pricePolicyRoute: function() {
			var direction = BreadCrumb.manager.route('pricePolicy', '정책');
			PageTransition.page.transition(direction, PricePolicyView);
		},
		
		vocRoute: function() {
			var direction = BreadCrumb.manager.route('voc', 'VOC');
			PageTransition.page.transition(direction, VocView);
		},
		
		defaultAction: function(actions) {
			console.log('default route : ' + actions);
		},
	});
	
	new MainRouter();
	
	Backbone.history.start();
});
