define( [ 'backbone', 'widget-scrollview', 'template!view/detail-lnb' ], function ( Backbone, ScrollView, template ) {

	return Backbone.View.extend( {

		el: '#detail-lnb',

		initialize: function () {
			var self = this;

			this.render();

			$( window ).on("resize", function () {
				if (window.innerWidth >= 768)
					self.$el.find( '#scrollView' ).css( {
						height: window.innerHeight - 70
					} );
				else
					self.$el.find( '#scrollView' ).css( {
						height: window.innerHeight / 2
					} );
			})
		},

		render: function () {
			this.$el.html( template( { collection: this.collection.toJSON(), model: this.model.toJSON() } ) );

			if (window.innerWidth >= 768)
				this.scrollView = this.$el.find( '#scrollView' ).css( {
					height: window.innerHeight - 70
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
			if ( this.scrollView.$el.find( ' > div:last-child' ).css( 'position' ) === 'absolute' ) {
				var currentScrollY = ($currentItem.index() - 1) * -Math.abs( $currentItem.height() );

				currentScrollY = currentScrollY > this.scrollView.iscroll.maxScrollY
					? currentScrollY
					: this.scrollView.iscroll.maxScrollY;

				this.scrollView.iscroll.scrollTo( 0, currentScrollY, 350 );
			}
		},
	} );
} );
