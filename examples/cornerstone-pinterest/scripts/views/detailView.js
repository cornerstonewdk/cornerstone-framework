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
	"template!templates/detail"
], function ($, Backbone, Template) {
	"use strict";

	return Backbone.View.extend({
		initialize: function () {

		},

		render: function (index) {
			var self = this;
			var currentImageWidth = $(".container").width() - 20;
			$.getJSON("data/sample.json", function (data) {
				data.body[index].imageLarge = data.body[index].src;
				data.body[index].height = data.body[index].height * (currentImageWidth / 236);
				self.$el.html(Template(data.body[index]));

				if (index != self.previousIndex) {
					self.$el.preloader({
						delay: 50,
						ondone: function () {
							$(".imageWrapper").removeAttr("style");
						}
					});
				}

				$(".imageWrapper").removeAttr("style");
				self.previousIndex = index;
			});
			return this;
		},

		cleanup: function () {
			this.remove();
		}
	});
});