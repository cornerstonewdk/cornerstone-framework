;
( function ( root, doc, factory ) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery', 'bootstrap' ], function ( Backbone, _, $ ) {
            factory( $, root, doc );
            return Backbone.view.extend( {
                render: function () {
                    this.$el.carousel( this.options );
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
     Carousel 스와이프 기능 추가
     스와이프 기능을 사용할 Carousel 영역에 data-slide="swipe" 를 선언하므로 작동
     */
    var HAS_TOUCH = ('ontouchstart' in window);

    this.Carousel = (function () {
        var Carousel;

        function Carousel() {
        }

        Carousel = $.fn.carousel.Constructor;

        Carousel.prototype.activeSwipe = function () {
            var self;
            self = this;
            this.$element.swipe();
            $(document).on("swipeLeft", this.$element, function () {
                if (!self.isActive) {
                    self.pause();
                    self.slide("next");
                    self.isActive = true;
                }
            }).on("swipeRight", this.$element, function () {
                if (!self.isActive) {
                    self.pause();
                    self.slide("prev");
                    self.isActive = true;
                }
            }).on("slide", this.$element, function () {
                return self.isActive = true;
            }).on("slid", this.$element, function () {
                self.isActive = false;
            });
        };

        Carousel.prototype.pause = function (e) {
            e || (this.paused = true);

            if (this.$element.find('.next, .prev').length && $.support.transition.end) {
                this.$element.trigger($.support.transition.end);
                this.cycle(true);
            }

            this.interval = clearInterval(this.interval);
            this.$element.trigger( $.Event('pause.cs.carousel') );
            return this;
        }

        Carousel.prototype.cycle =  function (e) {
            e || (this.paused = false)

            this.interval && clearInterval(this.interval)

            this.options.interval
            && !this.paused
            && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
            && this.$element.trigger( $.Event('play.cs.carousel') );

            return this
        }

        $.fn.carousel.Constructor = Carousel;

        /**
         * 터치기반인 경우 Swipe 활성화
         */
        HAS_TOUCH 
        && $(function () {
            $('[data-slide="swipe"]').carousel("activeSwipe");
        });

        return Carousel;

    })();
} ) );