define( [ 'underscore', 'jquery', 'backbone', 'template!templates/edit', 'model/template', 'view/phone', 'view/tablet' ], function ( _, $, Backbone, template, Template, PhoneView, TabletView ) {

	return Backbone.View.extend( {

		el: '#section-edit',

		events: {
			'click #btn-save-template': 'save'
		},

		initialize: function () {
		},

		render: function () {

			this.model = new Template();
			this.model.set( 'tableItems', {
				'items1': [
					{ 'name': '월정액', 'negative': false },
					{ 'name': '요금할인', 'negative': true }
				],
				'items2': [
					{ 'name': '부가서비스이용료', 'negative': false },
					{ 'name': '소액결제', 'negative': false },
					{ 'name': '기타금액', 'negative': false }
				]
			} );
			this.model.set( 'content', [
				{
					"phoneWidth": 12,
					"tabletWidth": 12,
					"box": true,
					"table": true
				},
				{
					"phoneWidth": 12,
					"tabletWidth": 12,
					"divider": true
				},
				{
					"phoneWidth": 7,
					"tabletWidth": 5,
					"box": true,
					"total": true
				},
				{
					"phoneWidth": 5,
					"tabletWidth": 7,
					"box": true,
					"text": "안녕하세요."
				}
			] );

			// 상세페이지 랜더링
			this.$el.html( template() );
			var phoneView = new PhoneView( { model: this.model } );
			var tabletView = new TabletView( { model: this.model } );
			phoneView.render();
			tabletView.render();
			// Draggable
			$( '.list-group-item' ).draggable( { opacity: 0.7, helper: 'clone' } );
			// 휴지통
			$( '#dropzone-trash' ).droppable( {
				accept: '.editor-content .content-box, .editor-content hr, .editor-content button',
				tolerance: 'touch',
				drop: function( event, ui ) {
					// 현재 Phone, Tablet tab 중에 어느쪽이 활성화되어 있는지 검사
					if ( $( '#tab-phone' ).hasClass( 'active' ) )
						phoneView.dropOnTrash( event, ui );
					else
						tabletView.dropOnTrash( event, ui );
				}
			} );

			return this;
		},

		save: function() {

			var self = this;

			this.model.set( 'name', $( '#template-name' ).val() );
			this.model.on( 'sync', function() {
				self.collection.add( self.model );
				location.href = '#list';
			} );
			this.model.save();
		}
	} );
} );
