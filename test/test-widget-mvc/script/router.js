define(function(require) {
    var _ = require("underscore");
    var Backbone = require("backbone");

	var MainRouter = Backbone.Router.extend({
		routes: {
			'': 'index',
			'index': 'index',
			'second': 'second',
			'pricePolicy': 'pricePolicyRoute',
			
			'*actions': 'defaultAction'
		},

        initialize: function() {
            $(".dropdown-menu").hide();
            window.Widget = {
                chart:function ($el, options1, options2) {
                    if (typeof $el === "object" && $el.length > 0) {
                        var Featured = require("../../dist/ui/widget-chart.js");
                        var featured = new Featured($el[0], options1, options2);
                        var style = require('style!../../../dist/ui/widget-chart');
                    }
                    return $el;
                },
                listView :function ($el, options1, options2) {
                    if (typeof $el === "object" && $el.length > 0) {
                        var Featured = require("../../dist/ui/widget-listview.js");
                        var featured = new Featured($el[0], options1, options2);
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

		dashboardRoute: function() {
            var indexView = require("view/indexView");
		},
		
		pricePolicyRoute: function() {
            var indexView = require("view/indexView");
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
