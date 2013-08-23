define([
	'jquery',
	'underscore',
	'backbone',
	'template!view/page1',
	'style!view/page1'
], function ($, _, Backbone, template) {
	return Backbone.View.extend({

		el: 'section#page1',

		render: function (id) {
			var self = this;

			require(['template!../app/template/' + id], function (example) {
				var title = $.trim(id).replace('cs-','').replace(/-/gi,' ');
				self.$el.html(
					template({
						pageTitle: title,
						exampleHtml: example()
					})
				);
				require(['../app/lib/holder']);
				require(['widget-rangeinput']);
				require(['widget-sign'], function() {
					$("#signature").length && $("#signature").sign();
				});
				require(['widget-spinner']);
				require(['widget-datepicker'], function() {
					$("#date-picker1, #date-picker2").datetimepicker({
						firstDisable: true,
						changeDisplay: true
					});
				});
			});
			return this;
		},

		events: {
			'click button.next': 'nextPage'
		},

		nextPage: function () {
			location.href = '#page2';
		}
	});
});
