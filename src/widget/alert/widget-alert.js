;
( function ( root, doc, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery' ], function ( Backbone, _, $ ) {
            factory( $, root, doc );
            return Backbone.View.extend( {
                tagName: 'div',
                className: 'alert',
                render: function () {
                    this.$el.append( $( 'button' ).addClass( 'close' ).attr( 'data-dismiss', 'alert' ).text( 'x' ) );
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
// (function () {
//     /*
//      Alert 기능 확장 : Close할때 마크업 삭제가 아닌 display none/block 처리 추가
//      */
//     this.Alert = (function () {
//         var Alert;

//         function Alert() {
//         }

//         Alert = $.fn.alert.Constructor;

//         Alert.prototype.hide = function (type, next) {
// //            console.log("alert hello world");
//         };

//         $.fn.alert.Constructor = Alert;

//     })();
// }).call( this );