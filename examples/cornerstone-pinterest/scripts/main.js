require.config({
	paths: {
		bootstrap: "vendor/bootstrap",
		jqueryPlugins: "vendor/plugins",

		transition: "vendor/transition"
	},

	shim: {
		bootstrap: {
			deps: ["jquery", "jqueryPlugins"],
			exports: "jquery"
		},
		jqueryPlugins: ["jquery"]
	}
});

define(["router", "handlebars", "bootstrap"], function (Router, Handlebars) {
	"use strict";

	var width = 236;
	var isEach = false;
	var isEachReverse = false;

	Handlebars.registerHelper('each', function (context, options) {
		var result = "";
		var body = context.data.body;

		for (var i = 0; i < body.length; i++) {
			if (!body[i].index) {
				body[i].index = i;
			}

			if (!isEachReverse) {
				body[i].height = body[i].height * (context.currentImageWidth / width);
			}

			result = result + options.fn(body[i]);
		}

		isEach = true;

		return result;
	});

	Handlebars.registerHelper('eachReverse', function (context, options) {
		var result = "";
		var body = context.data.body;

		for (var i = body.length - 1; i >= 0; i--) {
			if (!body[i].index) {
				body[i].index = i;
			}

			if (!isEach) {
				body[i].height = body[i].height * (context.currentImageWidth / width);
			}

			isEachReverse = true;
			result = result + options.fn(body[i]);
		}

		return result;
	});

	return {
		launch: function () {
			console.log("Start application!");
		}
	}
});