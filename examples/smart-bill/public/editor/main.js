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
define( [ 'jquery', 'backbone', 'multipage-router', 'model/templates', 'model/template', 'model/bills', 'model/bill', 'view/list', 'view/edit', 'bootstrap', 'jquery-ui' ], function( $, Backbone, MultipageRouter, Templates, Template, Bills, Bill, ListView, EditView ) {
	return {
		launch: function() {

			var templates = new Templates();
			var bills = new Bills();

			templates.on( 'sync', function() {
				// 모든 데이터를 다 받아오고 나면
				bills.on( 'sync', function() {

					var listView = new ListView( { templates: templates, bills: bills } );
					var editView = new EditView( { collection: templates } );

					function syncWidth() {
						// margin(15+15) 포함
						$( '.editor-grid' ).width( $( '.editor-content:visible' ).width() + 30 );
					};

					$( window ).resize( syncWidth );

					$( '#section-list' ).on( 'render', function() {
						listView.render();
					} );

					$( '#section-edit' ).on( 'render', function() {
						editView.render();
					} ).on( 'active', function() {
						syncWidth();
					} );

					// Router
					new ( MultipageRouter.extend( { useDataAttributes: true } ) );
					Backbone.history.start();
				} );

				bills.fetch();
			} );

			templates.fetch();
		}	
	};
} );
