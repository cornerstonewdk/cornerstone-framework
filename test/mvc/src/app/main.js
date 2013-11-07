
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'logging',
		  'view/page1', 
		  'view/page2', 
		  'view/page3', 
		  'backbone', 
		  'multipage-router', 
		  'js/mocha', 
		  'bootstrap',
		  'style!css/mocha'
		   ], function( Logging, Page1View, Page2View, Page3View, Backbone, MultipageRouter ) {
	return {
		launch: function() {

			Logging.config( {
                defaultLevel: 'debug',
                debug: 'screen',
                info: 'screen',
                warn: 'screen',
                error: 'screen',
                time: 'screen'
            } );

            window.Logging = Logging;

			mocha.setup('bdd');
		    mocha.reporter('html');
		    mocha.setup({
		        ignoreLeaks: true
		    });

			// Router
			var MainRouter = MultipageRouter.extend( {
			
				pages: {
					'default': {
						active: function( path ) {
							history.back();
						}
					},
					'page1': {
						fragment: [ '', 'page1' ],
						el: '#page1',
						render: function() {
							if( $( '#page1' ).html().length > 0 ){
								$( '#page1' ).css( { "display": "block"} );
							} else {
								new Page1View().render();	
							}
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
						fragment: 'page3/:id',
						el: '#page3',
						render: function() {
							new Page3View().render();
						},
						active: function ( id ) {
							$( '#page3 p.js-active' ).text( id );
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
			
			require(['spec/spec','style!main'], function () {
				if (navigator.userAgent.indexOf('PhantomJS') < 0) {
			        mocha.run();
			    }
			} );
		}	
	};
} );
