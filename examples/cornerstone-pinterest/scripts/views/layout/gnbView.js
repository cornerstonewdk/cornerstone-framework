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
	"template!templates/layout/gnb"
], function ($, Backbone, Template) {
	"use strict";

	return Backbone.View.extend({
		render: function() {
			this.$el.html(Template);
		}
	});
});