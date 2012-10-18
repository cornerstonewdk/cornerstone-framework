define(['backbone',
		'util/breadcrumb', 
		'view/pricePolicy/pricePolicyView',
		'view/dashboard/dashboardView',
		'view/lteReport/lteReportView',
		'view/youtube/youtubeView',
		'view/voc/vocView',
		'view/sns/snsView',
		'view/facebook/faceBookView',
		], 
function(
		Backbone,
		BreadCrumb, 
		PricePolicyView,
		DashboardView,
		LteReportView,
		YoutubeView,
		VocView,
		SnsView,
		FacebookView
) {
	var MainRouter = Backbone.Router.extend({
		routes: {
			'': 'dashboardRoute',
			'index': 'dashboardRoute',
			'pricePolicy': 'pricePolicyRoute',
			'lteReport': 'lteReportRoute',
			'youtube': 'youtubeRoute',
			'voc': 'vocRoute',
			'sns': 'snsRoute',
			'facebook': 'facebookRoute',
			
			'*actions': 'defaultAction'
		},

		dashboardRoute: function() {
			BreadCrumb.manager.route('index', 'T-Dashboard');
			DashboardView.render();
		},
		
		lteReportRoute: function() {
			BreadCrumb.manager.route('lteReport', 'LTE 개통 통계');
			LteReportView.render();
		},
		
		pricePolicyRoute: function() {
			PricePolicyView.render();
		},
		
		youtubeRoute: function() {
			YoutubeView.render();
		},
		
		vocRoute: function() {
			VocView.render();
		},
		
		snsRoute: function() {
			SnsView.render();
		},
		
		facebookRoute: function() {
			FacebookView.render();
		},
		
		defaultAction: function(actions) {
			console.log('default route : ' + actions);
		},
	});
	
	new MainRouter();
	
	Backbone.history.start();
});
