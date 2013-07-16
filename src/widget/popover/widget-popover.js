;
( function ( root, doc, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery', 'bootstrap' ], function ( Backbone, _, $ ) {
            factory( $, root, doc );
            return Backbone.view.extend( {
            	render: function () {
            		this.$el.popover( this.options );
            		return this;
            	}
            } );
        } );
    } else {
        // None AMD
        factory( root.jQuery, root, doc );
    }
} ( window, document, function ( $, window, document ) {
	/*
	 Popover : DATA-API 방식을 추가함.
	 */
	this.Popover = (function () {
		var Popover;

		function Popover() {
		}

		Popover = $.fn.popover.Constructor;

		/* 확장 코딩 */
		$.fn.popover.Constructor = Popover;

		/*
		 DATA API 기능 추가 예정
		 */
		$(function () {
			$('[data-toggle=popover]').each(function () {
				$(this).popover();
			});
		});
	})();
} ) );