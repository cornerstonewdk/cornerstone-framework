/**
 * main.js
 * 애플리케이션 메인
 */
define([
	'view/page1',
	'view/page2',
	'view/page3',
	'view/page4',
	'view/page5',
	'view/page6',
	'view/page7',
	'view/page8',
	'backbone',
	'multipage-router',
	'bootstrap',
	'vendor/helper',
	'style!main' ], function (Page1View, Page2View, Page3View, Page4View, Page5View, Page6View, Page7View, Page8View, Backbone, MultipageRouter) {
	return {
		launch: function () {

			// Router
			var MainRouter = MultipageRouter.extend({

				pages: {
					'page1': {
						fragment: [ '', 'page1' ],
						el: '#page1',
						render: function () {
							new Page1View().render();
						},
						active: function () {
							this.releasePage('#page1');
						}
					},
					'page2': {
						fragment: 'page2',
						el: '#page2',
						render: function () {
							new Page2View().render();
						},
						active: function () {
							this.releasePage('#page2');
						}
					},
					'page3': {
						fragment: 'page3',
						el: '#page3',
						render: function () {
							new Page3View().render();
						},
						active: function () {
							this.releasePage('#page3');
							$('#page3').hide().show();
						}
					},
					'page4': {
						fragment: 'page4',
						el: '#page4',
						render: function () {
							new Page4View().render();
						},
						active: function () {
							this.releasePage('#page4');
						}
					},
					'page5': {
						fragment: 'page5',
						el: '#page5',
						render: function () {
							new Page5View().render();
						},
						active: function () {
							this.releasePage('#page5');
						}
					},
					'page6': {
						fragment: 'page6',
						el: '#page6',
						render: function () {
							new Page6View().render();
						},
						active: function () {
							this.releasePage('#page6');
						}
					},
					'page7': {
						fragment: 'page7',
						el: '#page7',
						render: function () {
							new Page7View().render();
						},
						active: function () {
							this.releasePage('#page7');
						}
					},
					'page8': {
						fragment: 'page8',
						el: '#page8',
						render: function () {
							new Page8View().render();
						},
						active: function () {
							this.releasePage('#page8');
						}
					},
					'default': {
						active: function (path) {
							alert('Page not found');
							history.back();
						}
					}
				},

				transitions: {
					'page1:page2': 'slide',
					'page2:page3': 'slide',
					'page3:page4': 'slide',
					'page4:page5': 'slide',
					'page5:page6': 'slide',
					'page6:page7': 'slide',
					'page7:page8': 'slide'
				},

				releasePage: function (currentPage) {
					return $('.container > section:not(' + currentPage + ')').html('');
				}
			});

			new MainRouter();
			Backbone.history.start();
		}
	};
});
