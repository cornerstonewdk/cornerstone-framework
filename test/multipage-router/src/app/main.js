requirejs.config( {
    paths: {
        'mocha': 'js/mocha',
        'chai' : 'js/chai',
        'spec' : 'js/spec'
    },
    shim: {
    	'mocha': {
    		deps: [ 'style!css/mocha' ]
    	}
    }
} );
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'backbone', 'multipage-router', 'bootstrap', 'style!main', 'mocha' ], function( Backbone, MultipageRouter ) {
	return {
		launch: function() {

			// Router
			var MainRouter = MultipageRouter.extend( { useDataAttributes: true } );

			new MainRouter();
			Backbone.history.start();

			mocha.setup('bdd');
			mocha.setup({
		        ignoreLeaks: true
		    });

    		require( [ 'spec' ], function () {
    			if (navigator.userAgent.indexOf('PhantomJS') < 0) {
			        mocha.run();
			    }
    		} );
		}	
	};
} );
