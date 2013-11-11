define( [ 'underscore', 'jquery', 'backbone', 'template!templates/devices', 'template!templates/device', 'form-view', 'model/device' ], function ( _, $, Backbone, template, rowTemplate, FormView, Device ) {

	return Backbone.View.extend( {

		events: {
			'dblclick .list-group-item': 'modifyForm',
			'click #btn-register': 'registerForm',
			'submit #form-device': 'save',
			'click #btn-cancel': 'cancel',
			'click button.delete': 'delete'
		},

		initialize: function () {
			this.listenTo( this.collection, 'sync', this.render );
			this.listenTo( this.collection, 'add', this.render );
			this.listenTo( this.collection, 'remove', this.render );
			this.listenTo( this.collection, 'change', this.render );
		},

		render: function () {
			this.$el.html( template( this.collection.toJSON() ) );
			return this;
		},

		modifyForm: function( event ) {
			var id = $( event.currentTarget ).attr( 'data-id' );
			$( event.currentTarget ).replaceWith( rowTemplate( { id: id } ) );
			this.$( '#btn-register' ).prop( 'disabled', true );
			this.formView = new FormView( { el: '#form-device', model: this.collection.get( id ) } );
		},

		registerForm: function() {
			this.$( '.list-group' ).append( rowTemplate( {} ) );
			this.$( '#btn-register' ).prop( 'disabled', true );
			this.formView = new FormView( { el: '#form-device', model: new Device() } );
		},

		save: function() {
			var device = this.formView.toModel();
			if ( device.isValid() ) {
				device.save();
				this.collection.add( device );
			}
			return false;
		},

		cancel: function() {
			this.$( ':input' ).tooltip( 'hide' );
			this.render();
		},

		delete: function( event ) {
			if ( confirm( '정말 삭제하시겠습니까?' ) ) {
				var id = $( event.target ).parent().attr( 'data-id' );
				this.collection.get( id ).destroy();
			}
		}
	} );
} );
