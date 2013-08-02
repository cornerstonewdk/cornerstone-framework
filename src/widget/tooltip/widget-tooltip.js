;
( function ( root, doc, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery' ], function ( Backbone, _, $ ) {
            factory( $, root, doc );
            return Backbone.view.extend( {
            	render: function () {
            		this.$el.tooltip( this.options );
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
     Tooltip : DATA-API 방식을 추가함.
     */
	
	this.Tooltip = (function () {
        var Tooltip;

        function Tooltip() {
        }

        Tooltip = $.fn.tooltip.Constructor;

        /* 확장 코딩 */
        $.fn.tooltip.Constructor = Tooltip;

        /*
         DATA API 기능 추가 예정
         */
        $(function () {
            $('[data-toggle=tooltip]').each(function () {
                $(this).tooltip();
            });
        });
    })();
} ) );