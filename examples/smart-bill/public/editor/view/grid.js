define( [ 'underscore', 'jquery', 'backbone', 'template!templates/phone', 'template!templates/tablet', 'template!templates/modal' ], function ( _, $, Backbone, phoneTemplate, tabletTemplate, modalTemplate ) {

	return Backbone.View.extend( {

		initialize: function () {
		},

		render: function () {

			var self = this;
			var template = this.options.phone ? phoneTemplate : tabletTemplate;

			this.$el.html( template( this.model.toJSON() ) );
			this.$( 'div[data-index]' ).dblclick( function() {

				var index = parseInt( $( this ).attr( 'data-index' ) );
				var item = self.model.get( 'content' )[ index ];

				// modal의 내용을 만든 후 실행한다.
				$( '#modal-edit .modal-content' ).html( modalTemplate( item ) );
				$( '#modal-edit select' ).val( self.options.phone ? item.phoneWidth : item.tabletWidth );
				$( '#modal-edit #btn-modal-save' ).click( function() {

					if ( item.table ) {

					}
					else if ( item.text ) {
						item.text = $( '#modal-edit input' ).val();
					}
					else if ( item.image ) {
						item.image = $( '#modal-edit img' ).attr( 'src' );
					}
					else if ( item.video ) {
						item.text = $( '#modal-edit input' ).val();
					}

					if ( self.options.phone )
						item.phoneWidth = parseInt( $( '#modal-edit select' ).val() );
					else
						item.tabletWidth = parseInt( $( '#modal-edit select' ).val() );

					self.options.parent.renderGrid();
				} );
				// 드래그 앤 드랍으로 이미지 업로드
				$( '#dropzone' ).on( 'dragover', function( event ) {
					event.preventDefault();
					event.stopPropagation();
				} ).on( 'dragenter', function( event ) {
					event.preventDefault();
					event.stopPropagation();
				} ).on( 'drop', function( event ) {
					if ( event.originalEvent.dataTransfer ) {
						var files = event.originalEvent.dataTransfer.files;
						if ( files.length ) {
							event.preventDefault();
							event.stopPropagation();

							var fr = new FileReader();
							fr.onload = function( e ) {
								$( '#dropzone' ).prev().attr( 'src', e.target.result );
							};
							fr.readAsDataURL( files[ 0 ] );
						}
					}
				} );
				$( '#modal-edit' ).modal();
			} );
			// 내용요소를 드래그 앤 드랍할 경우: 항목의 내용 타입이 결정된다.
			this.$( '.content-box, button' ).droppable( {
				accept: '.list-group-item:not(.view-item)',
				drop: function( event, ui ) {

					var type = ui.draggable.attr( 'data-type' );
					var index = parseInt( $( this ).parent().attr( 'data-index' ) );

					var item = self.model.get( 'content' )[ index ];
					delete item.table;
					delete item.total;
					delete item.sum1;
					delete item.sum2;
					delete item.sum3;
					delete item.text;
					delete item.image;
					delete item.map;
					delete item.video;
					delete item.graph;

					if ( type == 'text' )
						item[ type ] = 'Text';
					else if ( type == 'image' )
						item[ type ] = './images/logo_sktelecom.png';
					else if ( type == 'video' )
						item[ type ] = 'http://www.youtube.com/embed/bACAT8BH3E4';
					else
						item[ type ] = true;

					self.options.parent.renderGrid();
				}
			} );
			// 화면요소를 드래그 앤 드랍할 경우: 새로운 항목을 추가한다.
			this.$( '.editor-grid' ).droppable( {
				accept: '.list-group-item.view-item',
				drop: function( event, ui ) {

					var type = ui.draggable.attr( 'data-type' );
					var item = {
						phoneWidth: 12,
						tabletWidth: 12
					};

					item[ type ] = true;

					self.model.get( 'content' ).push( item );
					self.options.parent.renderGrid();
				}
			} );
			// 추가된 항목은 휴지통으로 끌어놓을 수 있도록 한다.
			$( '.editor-content .content-box, .editor-content hr, .editor-content button' ).draggable( { cancel: false, opacity: 0.7, helper: 'clone' } );
			return this;
		},

		dropOnTrash: function( event, ui ) {

			var self = this;
			var index = parseInt( ui.draggable.parent().attr( 'data-index' ) );

			// 항목 삭제
			this.model.get( 'content' ).splice( index, 1 );

			// drop 이벤트 핸들러 안에서 ui.draggable 요소가 없어지면 오류 발생
			setTimeout( function() {
				self.options.parent.renderGrid();
			}, 0 );
		}
	} );
} );