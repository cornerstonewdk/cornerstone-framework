/**
 * main.js
 * 애플리케이션 메인
 */
define([ 'view/page1', 'backbone', 'bootstrap', 'style!main' ], function (Page1View, Backbone) {
	return {
		launch: function () {

			// Router
			var MainRouter = Backbone.Router.extend({
				routes: {
					':id': "index"
				},
				index: function(id) {
					console.log(id);
					var view = new Page1View();
					view.render(id);
				}
			});

			new MainRouter();
			Backbone.history.start();
		}
	};
});
