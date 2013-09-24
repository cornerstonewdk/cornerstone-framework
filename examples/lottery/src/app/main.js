
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'backbone', 'multipage-router', 'template!msg', 'bootstrap', 'style!main' ], function( Backbone, MultipageRouter, msgTemplate ) {
	return {
		launch: function() {

			// 추첨 대상
			var phones = [
				"01042540552",
				"01029338375",
				"01072987300",
				"01042540552"
			];

			// 중복을 제거한다.
			phones = _.uniq( phones );

			// 응모자, 당첨자 수
			var entryCount = phones.length, winCount = 0;

			// 응모자 수를 업데이트하는 함수를 리턴한다.
			function updateCount( el, count ) {
				return function() {
					$( el ).text( count );
				};
			}

			// HOME 화면
			$( '#section-home' ).on( 'active', function( event ) {

				$( '#p-msg' ).html( msgTemplate( { entryCount: entryCount, winCount: winCount, targetCount: phones.length } ) );

				for ( var i = 0; i < 10; i++ )
					setTimeout( updateCount( '#entry-count', Math.floor( entryCount * i / 9 ) ), i * 100 );
				
				for ( var i = 0; i < 10; i++ )
					setTimeout( updateCount( '#win-count', Math.floor( winCount * i / 9 ) ), i * 100 );

			} ).on( 'inactive', function() {
				updateCount( '#entry-count', 0 )();
				updateCount( '#win-count', 0 )();
			} );

			// 추첨 화면
			$( '#section-pick' ).on( 'active', function( event ) {
			} ).on( 'inactive', function() {
				$( '#modal-done' ).modal( 'hide' );
			} );

			// 슬롯머신 레버
			$( '#arm' ).click( function( event ) {
				var arm = $( this ).addClass( 'clicked' );

				setTimeout( function() { arm.removeClass( 'clicked' ); }, 500 );

				event.preventDefault();

				// 슬롯머신을 돌리고 일정 시간 후에 멈춘다.
				var equation = $( '#equation' ).removeClass( 'done' ).addClass( 'three' );
				setTimeout( function() { equation.addClass( 'done' ); }, 3000 );

				setTimeout( function() {

					// 당첨자를 선정한다.
					var index = Math.floor( Math.random() * phones.length );
					$( '#btn-call' ).attr( 'href', 'tel:' + phones[ index ] );
					winCount++;

					// 당첨자는 추첨 목록에서 제외한다.
					phones = _.without( phones, phones[ index ] );

					$( '#modal-done' ).modal( 'show' );
				}, 5000 );
			} );

			// Router
			new ( MultipageRouter.extend( { useDataAttributes: true } ) );
			Backbone.history.start();
		}	
	};
} );
