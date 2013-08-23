/**
 * main.js
 * 애플리케이션 메인
 */
define([ 'view/page1', 'view/page2', 'backbone', 'bootstrap', 'style!main' ], function (Page1View, Page2View, Backbone) {
	return {
		launch: function () {

			// Router
			var MainRouter = Backbone.Router.extend({
				routes: {
					'': "page1",
					':id': "page2"
				},
				page1: function() {
					console.log(1);
					var view = new Page1View();
					view.render();
				},
				page2: function(id) {
					console.log(id);
					var view = new Page2View();
					view.render(id);
				}
			});

			$(document).on("click", ".navbar:not(body > .navbar)", function(e) {
				e.preventDefault();
			});

			new MainRouter();
			Backbone.history.start();
		}
	};
});
