(function () {
     /**
     * Collapse
     */
    var HAS_TOUCH = ('ontouchstart' in window);
    var Collapse = $.fn.collapse.Constructor;

    // 터치기반에 최적화된 Show 함수
    if(HAS_TOUCH) {
        Collapse.prototype.toggle =  function () {
            this.$element[0].style["WebkitTransition"] = "none";
            this[this.$element.hasClass('in') ? 'hide' : 'show']()
//            console.log("in");
//            this.$element.hasClass('in') ? this.$element.removeClass('in') : this.$element.addClass('in');
        };

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
// Duration
//            $.support.transition && this.$element.hasClass('collapse') ?
//                this.$element.one($.support.transition.end, complete) :
            complete()
        };
    }
    $.fn.collapse.Constructor = Collapse;

    if(HAS_TOUCH) {
        $(function() {
            $(".dropdown-menu li").on("touchstart", function (e) {
                $(this).find("a").trigger("click");
                return false;
            });
        });
    }

}).call(this);