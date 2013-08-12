;
( function ( root, doc, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery', 'bootstrap' ], function ( Backbone, _, $ ) {
            factory( $, root, doc );
            return Backbone.View.extend( {
                className: 'alert',
                render: function () {
                    this.$el.alert(this.options);
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
     Alert 기능 확장 : Close할때 마크업 삭제가 아닌 display none/block 처리 추가
     */
    this.Alert = ( function () {
    
        var Alert;

        function Alert() {};

        Alert = $.fn.alert.Constructor;

        Alert.prototype.hide = function ( type, next ) {};

        $.fn.alert.Constructor = Alert;

    } )();
} ) );