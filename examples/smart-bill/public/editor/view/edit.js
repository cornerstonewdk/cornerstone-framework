define( [ 'underscore', 'jquery', 'backbone', 'template!templates/edit', 'view/phone', 'view/tablet' ], function ( _, $, Backbone, template, PhoneView, TabletView ) {

	return Backbone.View.extend( {

		el: '#section-edit',

		events: {
			'click #btn-save-template': 'save'
		},

		initialize: function () {
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
				[
					{
						"phoneWidth": 12,
						"tabletWidth": 12,
						"box": true,
						"table": true
					}
				],
				[
					{
						"phoneWidth": 12,
						"tabletWidth": 12,
						"divider": true
					}
				],
				[
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
				]
			] );
		},

		render: function () {
			// 상세페이지 랜더링
			this.$el.html( template() );
			new PhoneView( { model: this.model } ).render();
			new TabletView( { model: this.model } ).render();
			// Draggable
			$( '.list-group-item' ).draggable( { opacity: 0.7, helper: 'clone' } );
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
