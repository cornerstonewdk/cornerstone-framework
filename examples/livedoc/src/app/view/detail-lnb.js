define( [ 'backbone', 'widget-scrollview', 'template!view/detail-lnb' ], function ( Backbone, ScrollView, template ) {

	return Backbone.View.extend( {

		el: '#detail-lnb',
		events: {
			"click #page-nav-next": "clickNavNext",
			"click #page-nav-top": "clickNavTop",
			"click #page-nav-prev": "clickNavPrev"
		},

		initialize: function () {
			var self = this;

			this.render();

			$( window ).on("resize", function () {
				if (window.innerWidth >= 768)
					self.$el.find( '#scrollView' ).css( {
						height: window.innerHeight * 0.847
					} );
				else
					self.$el.find( '#scrollView' ).css( {
						height: window.innerHeight / 2
					} );
			});
		},

		render: function () {
			this.$el.html( template( { collection: this.collection.toJSON(), model: this.model.toJSON() } ) );

			if (window.innerWidth >= 768)
				this.scrollView = this.$el.find( '#scrollView' ).css( {
					height: window.innerHeight * 0.847
				} ).featuredScrollView().data( 'featuredScrollView' );
			else
				this.scrollView = this.$el.find( '#scrollView' ).css( {
					height: window.innerHeight / 2
				} ).featuredScrollView().data( 'featuredScrollView' );

			return this;
		},

		update: function () {
			// 초기화
			this.$el.find( '.list-group-item ' ).removeClass( 'active' );

			// 현재 메뉴 액티브
			var $currentItem = this.$( '[data-id=' + this.model.id + ']' );
			$currentItem.addClass( 'active' );

			// 현재 메뉴로 스크롤 위치 변경
			var currentScrollY = ($currentItem.index() - 1) * -Math.abs( $currentItem.height() );

			currentScrollY = currentScrollY > this.scrollView.iscroll.maxScrollY
				? currentScrollY
				: this.scrollView.iscroll.maxScrollY;

			currentScrollY = 0;
			this.scrollView.iscroll.scrollTo( 0, currentScrollY, 350 );

			// Comment by JHC, 20131101
			// 첫 번째 문서인 경우 page-nav-prev (이전문서로 이동하는) 버튼이 보이지 않게 한다.
			if ( this.$el.find( 'a.list-group-item:first' ).hasClass("active") ) {
				this.$el.find( '#floating-menu-hidden-region' ).append( this.$el.find( '#page-nav-prev' ) );
			}
			// 마지막 문서인 경우 page-nav-next (다음문서로 이동하는) 버튼이 보이지 않게 한다.
			else if ( this.$el.find( 'a.list-group-item:last' ).hasClass("active") ) {
				this.$el.find( '#floating-menu-hidden-region' ).append( this.$el.find( '#page-nav-next' ) );		
			}
			else {
				this.$el.find( '#page-nav-top' ).before( this.$el.find( '#page-nav-prev' ) );
				this.$el.find( '#page-nav-top' ).after( this.$el.find( '#page-nav-next' ) );
			}
		},

		clickNavNext: function (e) {
			e.preventDefault();
			// Comment by JHC, 20131031
			// 목차메뉴의 문서링크를 모두 구한다.
			var lnbList;
			lnbList = $( "a.list-group-item" );
			// 문서링크 중에서 현재 문서의 링크를 찾는다.
			for (var i=0; i<lnbList.length; i++) {

				if ( $( lnbList[i] ).hasClass("active") )
					break;
			}
			// 목차가 정렬되어 있으므로 현재 문서링크의 바로 다음 것이 다음 문서링크가 된다.
			// 마지막 문서인 경우 페이지 상에서 'NEXT'버튼을 Disable 하는 것으로 처리 !
			// 따라서 다음 문서가 없는 경우에 대한 예외처리 코드도 넣지 않음. 
			location.href = $( lnbList[i+1] ).attr("href");
		},
		clickNavPrev: function (e) {
			// Comment by JHC, 20131031
			// clickNavNext 와 동일 로직이므로 clickNavNext: 를 참고할 것.
			e.preventDefault();
			var lnbList;
			lnbList = $( "a.list-group-item" );
			for (var i=0; i<lnbList.length; i++) {

				if ( $( lnbList[i] ).hasClass("active") )
					break;
			}
			// 현재 문서링크의 바로 앞의 것이 이전 문서링크가 된다.
			// 맨 첫 번째 문서인 경우 페이지 상에서 'PREVIOUS'버튼을 Disable 하는 것으로 처리 !
			// 따라서 이전 문서가 없는 경우에 대한 예외처리 코드도 넣지 않음. 
			location.href = $( lnbList[i-1] ).attr("href"); 
		},
		clickNavTop: function (e) {
			e.preventDefault();
			// Top버튼 클릭 시 문서상단으로 이동 
			$('html, body').scrollTop(0);
		}
	} );
} );
