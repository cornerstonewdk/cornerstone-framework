define( [ 'underscore', 'jquery', 'backbone', 'template!templates/edit', 'model/template', 'view/grid' ], function ( _, $, Backbone, template, Template, GridView ) {

	return Backbone.View.extend( {

		el: '#section-edit',

		events: {
			'click #btn-save-template': 'save'
		},

		initialize: function () {
		},

		render: function () {

			var self = this;

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
			this.model.set( 'content', [] );

			// 상세페이지 랜더링
			this.$el.html( template() );
			this.phoneView = new GridView( { el: '#tab-phone', model: this.model, parent: this, phone: true } );
			this.tabletView = new GridView( { el: '#tab-tablet', model: this.model, parent: this, phone: false } );
			this.renderGrid();
			// Draggable
			$( '.list-group-item' ).draggable( { opacity: 0.7, helper: 'clone' } );
			// 휴지통
			$( '#dropzone-trash' ).droppable( {
				accept: '.editor-content .content-box, .editor-content hr, .editor-content button',
				tolerance: 'touch',
				drop: function( event, ui ) {
					// 현재 Phone, Tablet tab 중에 어느쪽이 활성화되어 있는지 검사
					if ( $( '#tab-phone' ).hasClass( 'active' ) )
						self.phoneView.dropOnTrash( event, ui );
					else
						self.tabletView.dropOnTrash( event, ui );
				}
			} );

			return this;
		},

		renderGrid: function() {
			this.phoneView.render();
			this.tabletView.render();
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
