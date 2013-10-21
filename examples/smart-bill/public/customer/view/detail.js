define( [ 'underscore', 'jquery', 'backbone', 'template!templates/detail', 'widget-chart' ], function ( _, $, Backbone, template ) {

	return Backbone.View.extend( {

		el: '#section-detail',

		initialize: function () {
			var items = this.model.get( 'tableItems' );
			var data = this.data = {
				items1: [],
				items2: [],
				items1Sum: 0,
				items2Sum: 0,
				items3Sum: 0,
				total: 0
			};

			function createRandomAmount( negative ) {

				// 1000~50000 사이의 100원 단위 랜덤 가격 생성
				var amount = ( Math.floor( Math.random() * 490 ) + 10 ) * 100;

				return negative ? -amount : amount;
			}

			// 금액 데이터를 랜덤으로 생성하고 합계를 구한다.
			_.each( items.items1, function( item ) {
				var amount = createRandomAmount( item.negative );
				data.items1.push( amount );
				data.items1Sum += amount;
			} );
			_.each( items.items2, function( item ) {
				var amount = createRandomAmount( item.negative );
				data.items2.push( amount );
				data.items2Sum += amount;
			} );

			data.items3Sum = createRandomAmount( false );
			data.total = data.items1Sum + data.items2Sum + data.items3Sum;
		},

		render: function () {
			// 상세페이지 랜더링
			this.$el.html( template( { bill: this.model.toJSON(), data: this.data } ) );

			// 구글 지도 렌더링
			function initGoogleMap( id ) {
				var el = document.getElementById( id );
				if ( el ) {
					var options = {
						center: new google.maps.LatLng( 37.566434, 126.985053 ),
						zoom: 17,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					new google.maps.Map( el, options );
				}
			}
			initGoogleMap( 'map-canvas' );
			$( '#modal-map' ).on( 'shown.bs.modal', function() {
				initGoogleMap( 'map-canvas-modal' );
			} );

			var chartOptions = {
				chartType: 'horizontalBar3d',
				data: [
					{
						key: "통신서비스 금액",
						values: [
							{ x: 0, y: this.data.items1Sum }
						]
					},
					{
						key: "부가사용 금액",
						values: [
							{ x: 0, y: this.data.items2Sum }
						]
					},
					{
						key: "단말기 할부금",
						values: [
							{ x: 0, y: this.data.items3Sum }
						]
					}
				]
			};

			// 그래프 렌더링
			$( '#chart-canvas' ).featuredChart( chartOptions );
			$( '#modal-graph' ).on( 'shown.bs.modal', function() {
				$( '#chart-canvas-modal' ).featuredChart( chartOptions );
			} );
			return this;
		}
	} );
} );
