define( [ 'backbone', 'template!templates/list', 'model/bill' ], function ( Backbone, template, Bill ) {

	return Backbone.View.extend( {

		el: '#section-list',

		events: {
			'click #refresh': 'refresh',
			'click button#btn-save-bill': 'saveBill',
			'click button.delete-template': 'deleteTemplate',
			'click button.delete-bill': 'deleteBill'
		},

		initialize: function () {
			this.templates = this.options.templates;
			this.bills = this.options.bills;
		},

		render: function () {
			// 목록페이지 랜더링
			this.$el.html( template( { templates: this.templates.toJSON(), bills: this.bills.toJSON() } ) );
			return this;
		},

		refresh: function() {
			location.reload();
		},

		saveBill: function() {

			var self = this;
			var bill = new Bill();

			bill.set( 'year', parseInt( $( '#select-year' ).val() ) );
			bill.set( 'month', parseInt( $( '#select-month' ).val() ) );
			bill.set( 'template', this.templates.get( $( '#select-template' ).val() ).toJSON() );
			bill.on( 'sync', function() {
				self.bills.add( bill );
				$( '#modal-save-bill' ).on( 'hidden.bs.modal', function() {
					self.render();
				} );
			} );
			bill.save();
		},

		deleteTemplate: function( event ) {

			if ( confirm( '정말 삭제하시겠습니까?' ) ) {
				var template = this.templates.get( $( event.target ).attr( 'data-id' ) );
				template.destroy();
				this.render();
			}
		},

		deleteBill: function( event ) {

			if ( confirm( '정말 삭제하시겠습니까?' ) ) {
				var bill = this.bills.get( $( event.target ).attr( 'data-id' ) );
				bill.destroy();
				this.render();
			}
		}
	} );
} );
