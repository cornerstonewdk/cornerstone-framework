require.config( {
	packages: [
		{
			name: 'impress',
			location: '../lib/impress',
			main: 'impress.js'
		}
	],

	shim: {
		impress: {
			exports: 'impress'
		}
	}
} );

/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'jquery', 'backbone', 'impress', 'model/documents', 'template!templates/main', 'template!templates/menu', 'template!templates/slide', 'bootstrap', 'style!main' ], function( $, Backbone, impress, Documents, mainTemplate, menuTemplate, slideTemplate ) {
	return {
		launch: function() {

			var docs = new Documents();

			function renderDocuments( documents, y ) {

				// 슬라이드 사이의 각도
				var step = 360 / documents.length;
				// 중심축으로부터의 거리
				var radius = documents.length * 170;

				documents.each( function( doc, i ) {

					// 슬라이드의 기울어진 각도
					var angle = i * step;

					// 슬라이드의 좌표 계산
					var x = Math.round( radius * Math.sin( angle / 180 * Math.PI ) );
					var z = Math.round( radius * Math.cos( angle / 180 * Math.PI ) );

					$( '#impress' ).append( slideTemplate( { x: x, y: y, z: z, angle: angle, doc: doc.toJSON() } ) );
				} );
			}

			// 모든 데이터를 다 받아오고 나면
			docs.on( 'sync', function() {

				// order 속성 순으로 정렬
				docs.comparator = function( doc ) {
					return doc.get( 'order' );
				};
				docs.sort();

				// 기본 마크업들을 렌더링한다.
				$( '#navbar-top' ).after( mainTemplate() );

				// 터치 기기에서는 메시지를 바꾼다.
				if ( 'ontouchstart' in document.documentElement )
					$( '.hint p' ).html( '화면 왼쪽, 오른쪽을 탭해서 이동하세요.' );

				// 그룹별로 분류
				var docs1 = new Documents( docs.where( { group: 1 } ) );	// Framework
				var docs2 = new Documents( docs.where( { group: 2 } ) );	// Runtime
				var docs3 = new Documents( docs.where( { group: 3 } ) );	// Development Environment

				// 메뉴 그리기
				$( '.navbar-nav' ).html( menuTemplate( { docs1: docs1.toJSON(), docs2: docs2.toJSON(), docs3: docs3.toJSON() } ) );

				// 각 그룹을 층별로 렌더링
				renderDocuments( docs1, 0 );
				renderDocuments( docs2, 1000 );
				renderDocuments( docs3, 2000 );

				impress().init();

				$( '#radio-on' ).click( function() {
					$( document ).on( 'mousemove', function( event ) {
						if ( event.clientY > 50 ) {
							$( '#impress' ).css( 'margin-top', 0 );
							$( '#navbar-top' ).hide();
						}
						else {
							$( '#impress' ).css( 'margin-top', 25 );
							$( '#navbar-top' ).show();
						}
					} );
				} );

				$( '#radio-off' ).click( function() {
					$( document ).off( 'mousemove' );
				} );

				$( 'ul.dropdown-menu' ).on( 'mousemove', function( event ) {
					event.stopPropagation();
				} );
			} );

			docs.fetch();
		}	
	};
} );
