/**
 * Created with IntelliJ IDEA.
 * User: azamara
 * Date: 13. 6. 14.
 * Time: 오후 5:19
 * To change this template use File | Settings | File Templates.
 */
define([
	"jquery",
	"backbone",
	"template!templates/index"
], function ($, Backbone, Template) {
	"use strict";

	return Backbone.View.extend({
		isFirst: true,
		initialize: function () {

		},
		render: function () {

			if (!this.isFirst) {
				return this.$el;
			}

			var self = this;
			var $container = $(".container");
			var currentImageWidth = 728 > $container.width()
				? $container.width()/2 - 17
				: $container.width()/2 + 5;

			$.getJSON("data/sample.json", function (data) {
				self.$el.html(Template({
					currentImageWidth: currentImageWidth,
					data: data
				}));

				self.$el.find(".col-6").each(function() {
					$(this).preloader({
						delay: 10,
						ondone: function() {
							$(".imageWrapper").removeAttr("style");
						}
					});
				});
				self.isFirst = false;
			});

			return this.$el;
		}
	});
});