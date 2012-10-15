define(['backbone', 
		'view/secondView', 
		'view/pricePolicy/pricePolicyView',
		'view/dashboard/dashboardView'
		], 
function(
		Backbone, 
		SecondView, 
		PricePolicyView,
		DashboardView
		) {
	
	var MainRouter = Backbone.Router.extend({
		routes: {
			'': 'dashboardRoute',
			'index': 'dashboardRoute',
			'second': 'second',
			'pricePolicy': 'pricePolicyRoute',
			
			'*actions': 'defaultAction'
		},

		second: function() {
			var sv = new SecondView();
			sv.render();
		},

		dashboardRoute: function() {
			var view = new DashboardView();
			view.render();
		},
		
		pricePolicyRoute: function() {
			var view = new PricePolicyView();
			view.render();
		},
		
		defaultAction: function(actions) {
			console.log('default route : ' + actions);
		},
	});
	
	new MainRouter();
	
	Backbone.history.start();
});
