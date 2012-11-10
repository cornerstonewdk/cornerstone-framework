/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : plugin-cornerstone.js
 *  Description: 이 플러그인은 부트스트랩 플러그인들 중 코너스톤에 필요한 기능들을 추가한 플러그인이다.
 *  Author: 김우섭
 *  License :
 */

(function () {
    var _has_touch = ('ontouchstart' in window);

    /*
     Alert 기능 확장 : Close할때 마크업 삭제가 아닌 display none/block 처리 추가
     */
    this.Alert = (function () {
        var Alert;

        function Alert() {
        }

        Alert = $.fn.alert.Constructor;

        Alert.prototype.hide = function (type, next) {
//            console.log("alert hello world");
        };

        $.fn.alert.Constructor = Alert;

    })();

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
            $('[data-toggle=popover]').each(function (i) {
                $(this).popover().live("click", function (e) {
                    e.preventDefault();
                });
            });
        });
    })();

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
            $('[data-toggle="tooltip"]').tooltip({
                selector:"[rel=tooltip]"
            });
        });
    })();


//    console.log("collapse1");
    /**
     * Collapse 최적화
     */
    this.Collapse = (function () {
        var Collapse;
//        console.log("collapse2");
        function Collapse() {
        }

        Collapse = $.fn.collapse.Constructor;

        Collapse.prototype.transition = function (method, startEvent, completeEvent) {
            var that = this
                , complete = function () {
                    if (startEvent.type == 'show') that.reset()
                    that.transitioning = 0
                    that.$element.trigger(completeEvent)
                }

            this.$element.trigger(startEvent)

            if (startEvent.isDefaultPrevented()) return

            this.transitioning = 1

            this.$element[method]('in')

            $.support.transition && this.$element.hasClass('collapse') ?
                this.$element.one($.support.transition.end, complete) :
                complete()
        };

        Collapse.prototype.show = function () {
            var dimension
                , scroll
                , actives
                , hasData

            if (this.transitioning) return

            dimension = this.dimension()
            scroll = $.camelCase(['scroll', dimension].join('-'))
            actives = this.$parent && this.$parent.find('> .accordion-group > .in')

            if (actives && actives.length) {
                hasData = actives.data('collapse')
                if (hasData && hasData.transitioning) return
                actives.collapse('hide')
                hasData || actives.data('collapse', null)
            }

            this.$element[dimension](0)
            this.transition('addClass', $.Event('show'), 'shown')
            $.support.transition && this.$element[dimension](this.$element[0][scroll])
        };

        Collapse.prototype.hide = function () {
//            console.log("hide");
            var dimension
            if (this.transitioning) return
            dimension = this.dimension()
            this.reset(this.$element[dimension]())
            this.transition('removeClass', $.Event('hide'), 'hidden')
            this.$element[dimension](0)
        };

        $.fn.collapse.Constructor = Collapse;

        /* COLLAPSIBLE DATA-API
         * ==================== */

        $(function () {
//            console.log("event on");
            $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
                var $this = $(this), href
                    , target = $this.attr('data-target')
                        || e.preventDefault()
                        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
                    , option = $(target).data('collapse') ? 'toggle' : $this.data()
                $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
                $(target).collapse(option)
            })
        })

    })();

}).call(this);



