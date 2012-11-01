define(function(require) {
    var _ = require("underscore");
    var Backbone = require("backbone");

	var MainRouter = Backbone.Router.extend({
		routes: {
			'': 'index',
			'index': 'index',
			'*actions': 'defaultAction'
		},

        initialize: function() {
            $(".dropdown-menu").hide();
            var Plugin = require("widget-plugins");
            window.Widget = {
                chart:function ($el, options1, options2) {
                    if (typeof $el === "object" && $el.length > 0) {
                        var Featured = require("widget-chart");
                        $el.featuredChart(options1, options2);
                    }
                    return $el;
                },
                listView :function ($el, options1, options2) {
                    if (typeof $el === "object" && $el.length > 0) {
                        var Featured = require("widget-listview");
                        $el.featuredListView(options1, options2);
                    }
                    return $el;
                }
            };
            console.log("route init");
        },

        index: function() {
            var View = require("view/indexView");
            this.indexView = new View();
            this.indexView.render();
		},

		defaultAction: function(actions) {
            console.log('default route : ' + actions);
		},

        activePage : function() {

        }
	});

	new MainRouter();

	Backbone.history.start();
});
