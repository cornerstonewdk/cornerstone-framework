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
define( [ 'jquery', 'backbone', 'multipage-router', 'model/bills', 'model/bill', 'view/list', 'view/edit', 'bootstrap', 'jquery-ui' ], function( $, Backbone, MultipageRouter, Bills, Bill, ListView, EditView ) {
	return {
		launch: function() {

			var bills = new Bills();

			// 모든 데이터를 다 받아오고 나면
			bills.on( 'sync', function() {

				$( window ).resize( function( event ) {
					// margin(15+15) 포함
					$( '.editor-grid' ).width( $( '.editor-content' ).width() + 30 );
				} );

				$( '#section-list' ).on( 'render', function() {
					new ListView( { collection: bills } ).render();
				} );

				$( '#section-edit' ).on( 'render', function() {
					new EditView( { collection: bills, model: new Bill() } ).render();
				} );

				// Router
				new ( MultipageRouter.extend( { useDataAttributes: true } ) );
				Backbone.history.start();
			} );

			bills.fetch();
		}	
	};
} );
