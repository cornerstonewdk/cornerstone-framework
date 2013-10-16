require.config( {
	packages: [
		{
			name: 'jquery-ui',
			location: '../lib/jquery-ui-1.10.3.custom/js',
			main: 'jquery-ui-1.10.3.custom.min.js'
		}
	],

	shim: {
		'jquery-ui': {
			deps: [ 'jquery' ]
		}
	}
} );

/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'view/page1', 'view/page2', 'view/page3', 'jquery', 'backbone', 'multipage-router', 'model/bills', 'bootstrap', 'jquery-ui' ], function( Page1View, Page2View, Page3View, $, Backbone, MultipageRouter, Bills ) {
	return {
		launch: function() {

			var bills = new Bills();

			bills.on( 'all', function( eventName ) {
				console.log( 'event: ' + eventName );
			} );

			// 모든 데이터를 다 받아오고 나면
			bills.on( 'sync', function() {

				$( window ).resize( function( event ) {
					// margin(15+15) 포함
					$( '.editor-grid' ).width( $( '.editor-content' ).width() + 30 );
				} );

				// Draggable
				$( '.list-group-item' ).draggable( { opacity: 0.7, helper: 'clone' } );
			} );

			$( '#refresh' ).click( function() {
				bills.fetch();
			} );

			bills.fetch();

			// Router
			new ( MultipageRouter.extend( { useDataAttributes: true } ) );
			Backbone.history.start();
		}	
	};
} );
