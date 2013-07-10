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
			var currentImageWidth = ($(window).width() - 20) / 2;

			$.getJSON("data/sample.json", function (data) {
				self.$el.html(Template({
					currentImageWidth: currentImageWidth,
					data: data
				}));

				self.$el.find(".col-sm-6").eq(0).preloader({
					delay: 50,
					ondone: function() {
						$(".pinHolder").removeAttr("style");
					}
				});
				self.$el.find(".col-sm-6").eq(1).preloader({
					delay: 50,
					ondone: function() {
						$(".pinHolder").removeAttr("style");
					}
				});

				self.isFirst = false;
			});

			return this.$el;
		}
	});
});