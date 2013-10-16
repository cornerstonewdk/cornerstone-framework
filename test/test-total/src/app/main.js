
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'view/page1', 'view/page2', 'view/page3', 'backbone', 'multipage-router', 'bootstrap', 'style!main', 'mocha', 'chai' ], function( Page1View, Page2View, Page3View, Backbone, MultipageRouter ) {
	return {
		launch: function() {

			mocha.setup('bdd');
		    mocha.reporter('html');
		    mocha.setup({
		        ignoreLeaks: true
		    });
		    var expect = chai.expect;
			
			// Router
			var MainRouter = MultipageRouter.extend( {
			
				pages: {
					'page1': {
						fragment: [ '', 'page1' ],
						el: '#page1',
						render: function() {
							new Page1View().render();
						}
					},
					'page2': {
						fragment: 'page2',
						el: '#page2',
						render: function() {
							new Page2View().render();
						}
					},
					'page3': {
						fragment: 'page3',
						el: '#page3',
						render: function() {
							new Page3View().render();
						}
					},
					'default': {
						active: function( path ) {
							alert( 'Page not found' );
							history.back();
						}
					}
				},
				
				transitions: {
					'page1:page2': 'slide',
					'page2:page3': { type: 'slide', duration: 3000 }
				},
			} );

			new MainRouter();
			Backbone.history.start();
		}	
	};
} );
