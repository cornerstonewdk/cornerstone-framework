;
( function ( root, doc, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery', 'bootstrap' ], function ( Backbone, _, $ ) {
            factory( $, root, doc );
        } );
    } else {
        // None AMD
        factory( root.jQuery, root, doc );
    }
} ( window, document, function ( $, window, document ) {
    /*
     토글 버튼 이벤트 확장 : 토글시 이벤트 발생;
     */
    var Button = function () {};

    Button = $.fn.button.Constructor;

    Button.prototype.toggle = function () {

        var $parent = this.$element.closest('[data-toggle="buttons"]')

        if ($parent.length) {
            var $input = this.$element.find('input').prop('checked', !this.$element.hasClass('active'))
            if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
        }

        this.$element.toggleClass('active');
        // $parent.trigger( 'toggleOn.cs.button', this.$element );
        

        // var self = this;
        // var $radio = self.$element.closest('[data-toggle="buttons-radio"]');
        // var $checkbox = self.$element.closest('[data-toggle="buttons-checkbox"]');   

        // if ( $radio.length ) {
        //     $radio.find('.active').removeClass('active');

        //     if ( self.$element[0].tagName === 'INPUT' ) {
                   
        //     } else {
        //         var active = $radio.find('.active');
        //         active && active[0] != self.$element[0] && active.trigger( e = $.Event('toggleOff.cs.button') );
        //         self.$element.trigger( e = $.Event('toggleOn.cs.button') );
        //     }
            

        //     self.$element.off( 'click' ).on( 'click', function () {

                
        //     } );
        // }

        //  // self.$element.find( 'input' ).off( 'click' ).on( 'click', function () {
        //  //                self.$element.trigger( e = $.Event('toggleOn.cs.button') );
        //  //            } );

        // if ( $checkbox.length ) {
        //     self.$element.find( 'button' ).off( 'click' ).on( 'click', function () {
        //         if ( !$( this ).hasClass( 'active' ) ) {
        //             self.$element.trigger( e = $.Event('toggleOn.cs.button') );       
        //         } else {
        //             self.$element.trigger( e = $.Event('toggleOff.cs.button') );                
        //         }
        //     } );
        // }

        // if ( !$radio.length && !$checkbox.length ) {
        //     if ( self.$element.hasClass( 'active' ) ) {
        //         self.$element.trigger( e = $.Event('toggleOff.cs.button') );
        //     } else {
        //         self.$element.trigger( e = $.Event('toggleOn.cs.button') );
        //     }
        // }

        // self.$element.toggleClass('active');
    };

    $.fn.button.Constructor = Button;
} ) );