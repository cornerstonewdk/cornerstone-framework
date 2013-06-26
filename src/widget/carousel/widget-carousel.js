(function () {

	/*
     Carousel 스와이프 기능 추가
     스와이프 기능을 사용할 Carousel 영역에 data-slide="swipe" 를 선언하므로 작동
     */
    this.Carousel = (function () {
        var Carousel;

        function Carousel() {
        }

        Carousel = $.fn.carousel.Constructor;

        Carousel.prototype.activeSwipe = function () {
            var self;
            self = this;
            this.$element.swipe().live("swipeLeft",function (e, swipeEventObj) {
                if (!self.isActive) {
                    self.pause();
                    self.slide("next");
                    self.isActive = true;
                }
            }).live("swipeRight", function (e, swipeEventObj) {
                    if (!self.isActive) {
                        self.pause();
                        self.slide("prev");
                        self.isActive = true;
                    }
                });
            this.$element.live("slide",function (e) {
                return self.isActive = true;
            }).live("slid", function (e) {
                    self.isActive = false;
                });
        };

        $.fn.carousel.Constructor = Carousel;

        /**
         * 터치기반인 경우 Swipe 활성화
         */
        $(function () {
            $('[data-slide="swipe"]').carousel("activeSwipe");
        });

        return Carousel;

    })();
}).call(this);