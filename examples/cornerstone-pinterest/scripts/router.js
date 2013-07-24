/**
 * Created with IntelliJ IDEA.
 * User: azamara
 * Date: 13. 6. 14.
 * Time: 오후 5:30
 * To change this template use File | Settings | File Templates.
 */
define([
	"jquery",
	"backbone",
	"multipage-router",
	"views/layout/gnbView",
	"views/layout/footerView",
	"views/indexView",
	"views/detailView"
], function ($, Backbone, MultipageRouter, GnbView, FooterView, IndexView, DetailView) {
	"use strict";

	var layout = {
		page: "#page",
		header: "#page > header",
		index: "#page-index",
		detail: "#page-detail",
		footer: "#page > footer"
	}

	var MainRouter = MultipageRouter.extend({
		pages: {
			"index": {
				fragment: ["", "index"],
				el: layout.index,
				render: "index"
			},
			"detail": {
				fragment: "detail/:id",
				el: layout.detail,
				render: "detail",
				inactive: "releaseDetail"
			}
		},

		initialize: function () {
			var gnbView = new GnbView({
				el: layout.header
			});
			gnbView.render();


			var footerView = new FooterView({
				el: layout.footer
			});
			footerView.render();

		},

		index: function () {
			$(layout.header).find(".back").removeClass("enabled");
			this.indexView = this.indexView || new IndexView({
				el: layout.index
			});
			this.indexView.render();
		},

		detail: function (index) {
			this.detailView = this.detailView || new DetailView({
				el: layout.detail
			});
			this.detailView.render(index);
			$(layout.header).find(".back").addClass("enabled");
		},

		releaseDetail: function() {
			$(layout.detail).html("");
		},

		transitions: {
			"index:detail": {
				type: "slide"
			},
			"detail:index": {
				type: "slide"
			}
		}
	});
	new MainRouter();

	Backbone.history.start();
});