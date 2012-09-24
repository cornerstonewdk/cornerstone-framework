/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : widget.js
 *  Description: widget.js은 각종 플러그인들의 wrapping, 커스텀 플러그인, 전후 처리를 통한 최적화 및 공통적인 터치 기능 등과 같은 작업을 처리한다.
 *  Author: 김우섭
 *  License :
 */

// 세미콜론은 패키징 작업시 앞쪽 스크립트가 닫지 않은 경우 오류를 사전에 막기 위함
;(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([ "jquery" ], function ($) {
            factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function (jQuery, window, document, undefined) {
    /**
     Provides more functionality for the widget module..

     @module widget
     @submodule widget-foo
     @main widget
     **/
    var defaultOptions = {
        min:0,
        max:100,
        step:'any',
        steps:0,
        value:0,
        precision:undefined,
        vertical:0,
        keyboard:false,
        progress:false,
        speed:100,
        inputShow:false,
        css:{
            input:'range',
            slider:'slider',
            progress:'progress',
            handle:'handle'
        }
    };

    function round(value, precision) {
        var n = Math.pow(10, precision);
        return Math.round(value * n) / n;
    }

    function dim(el, key) {
        var v = parseInt(el.css(key), 10);
        if (v) {
            return v;
        }
        var s = el[0].currentStyle;
        return s && s.width && parseInt(s.width, 10);
    }

    function hasEvent(el) {
        var e = el.data("events");
        return e && e.onSlide;
    }

    function RangeInput(input, conf) {
        var self = this,
            css = conf.css,
            root = $("<div><div/><a href='#'/></div>").data("rangeinput", self),
            vertical,
            value, // current value
            origo, // handle's start point
            len, // length of the range
            pos;				// current position of the handle

        // UI 엘리먼트 생성
        input.before(root);

        var handle = root.addClass(css.slider).find("a").addClass(css.handle),
            progress = root.find("div").addClass(css.progress);

        $.each("min,max,step,value".split(","), function (i, key) {
            var val = input.attr(key);
            if (parseFloat(val)) {
                conf[key] = parseFloat(val, 10);
            }
        });

        var range = conf.max - conf.min,
            step = conf.step == 'any' ? 0 : conf.step,
            precision = conf.precision;

        if (precision === undefined) {
            precision = step.toString().split(".");
            precision = precision.length === 2 ? precision[1].length : 0;
        }

        // Replace built-in range input (type attribute cannot be changed)
        if (input.attr("type") == 'range') {
            var def = input.clone().wrap("<div/>").parent().html(),
                clone = $(def.replace(/type/i, "type=tel data-orig-type"));

            clone.val(conf.value);
            input.replaceWith(clone);
            input = clone;
        }

        input.addClass(css.input);

        // input UI를 노출시키고 싶지 않은 경우 처리
        if (!conf.inputShow) {
            input.css({
                position:"absolute",
                left:"-10000em"
            });
        }

        var fire = $(self).add(input), fireOnSlide = true;

        /**
         * @param evt types include: click, keydown, blur and api (setValue call)
         * @param isSetValue when called trough setValue() call (keydown, blur, api)
         * range 슬라이드 함수
         * 수직 슬라이드 구현예정
         */
        function slide(evt, x, val, isSetValue) {

            // calculate value based on slide position
            if (val === undefined) {
                val = x / len * range;

                // x is calculated based on val. we need to strip off min during calculation
            } else if (isSetValue) {
                val -= conf.min;
            }

            // increment in steps
            if (step) {
                val = Math.round(val / step) * step;
            }

            // count x based on value or tweak x if stepping is done
            if (x === undefined || step) {
                x = val * len / range;
            }

            // crazy value?
            if (isNaN(val)) {
                return self;
            }

            // stay within range
            x = Math.max(0, Math.min(x, len));
            val = x / len * range;

            if (isSetValue || !vertical) {
                val += conf.min;
            }

            // in vertical ranges value rises upwards
            if (vertical) {
                if (isSetValue) {
                    x = len - x;
                } else {
                    val = conf.max - val;
                }
            }

            // precision
            val = round(val, precision);

            // onSlide
            var isClick = evt.type == "click";
            if (fireOnSlide && value !== undefined && !isClick) {
                evt.type = "onSlide";
                fire.trigger(evt, [val, x]);
                if (evt.isDefaultPrevented()) {
                    return self;
                }
            }

            // speed & callback
            // 터치 거리에 따른 가속도값 필요
            var speed = isClick ? conf.speed : 0,
                callback = isClick ? function () {
                    evt.type = "change";
                    fire.trigger(evt, [val]);
                } : null;

            if (vertical) {
                this.progressHeight = len - x + handle.height() / 2;
                if ($.browser.os === "IOS" && $.browser.version > 4) {
                    handle.animate({
                        top:x
                    }, speed, callback);
                } else {
                    handle.transition({
                        y:x
                    }, speed, callback);
                }
                if (false && conf.progress) {
                    progress.css({
                        height:this.progressHeight
                    });
                }
            } else {
                this.progressWidth = x + handle.width() / 2;
                if ($.browser.os === "IOS" && $.browser.version > 4) {
                    handle.animate({
                        left:x
                    }, speed, callback);
                } else {
                    handle.transition({
                            x:x
                        }, speed, callback);
                }
                if (conf.progress) {
                    progress.css({
                        width:this.progressWidth
                    });
                }
            }

            // 현재값과 좌표 저장
            value = val;
            pos = x;

            if(!this.insertingValue && input[0].value != val) {
                this.insertingValue = true;
                input[0].value = val;
                this.insertingValue = false;
            }

            return self;
        }


        $.extend(self, {

            getValue:function () {
                return value;
            },

            setValue:function (val, e) {
                init();
                return slide(e || $.Event("api"), undefined, val, true);
            },

            getConf:function () {
                return conf;
            },

            getProgress:function () {
                return progress;
            },

            getHandle:function () {
                return handle;
            },

            getInput:function () {
                return input;
            },

            step:function (am, e) {
                e = e || $.Event();
                var step = conf.step == 'any' ? 1 : conf.step;
                self.setValue(value + step * (am || 1), e);
            },

            // HTML5 compatible name
            stepUp:function (am) {
                return self.step(am || 1);
            },

            // HTML5 compatible name
            stepDown:function (am) {
                return self.step(-am || -1);
            }

        });

        // callbacks
        $.each("onSlide,change".split(","), function (i, name) {

            // from configuration
            if ($.isFunction(conf[name])) {
                $(self).on(name, conf[name]);
            }

            // API methods
            self[name] = function (fn) {
                if (fn) {
                    $(self).on(name, fn);
                }
                return self;
            };
        });


        // dragging
        handle.drag({drag:false}).on("dragStart",function () {
            /* do some pre- calculations for seek() function. improves performance */
            init();

            // avoid redundant event triggering (= heavy stuff)
            fireOnSlide = hasEvent($(self)) || hasEvent(input);


        }).on("drag",function (e, y, x) {
                if (input.is(":disabled")) {
                    return false;
                }
                slide(e, vertical ? y : x);

            }).on("dragEnd",function (e) {
                if (!e.isDefaultPrevented()) {
                    e.type = "change";
                    fire.trigger(e, [value]);
                }

            }).click(function (e) {
                return e.preventDefault();
            });

        // clicking
        root.click(function (e) {
            if (input.is(":disabled") || e.target == handle[0]) {
                return e.preventDefault();
            }
            init();
            var fix = vertical ? handle.height() / 2 : handle.width() / 2;
            slide(e, vertical ? len - origo - fix + e.pageY : e.pageX - origo - fix);
        });

        if (conf.keyboard) {

            input.keydown(function (e) {

                if (input.attr("readonly")) {
                    return;
                }

                var key = e.keyCode,
                    up = $([75, 76, 38, 33, 39]).index(key) != -1,
                    down = $([74, 72, 40, 34, 37]).index(key) != -1;

                if ((up || down) && !(e.shiftKey || e.altKey || e.ctrlKey)) {

                    // UP: 	k=75, l=76, up=38, pageup=33, right=39
                    if (up) {
                        self.step(key == 33 ? 10 : 1, e);

                        // DOWN:	j=74, h=72, down=40, pagedown=34, left=37
                    } else if (down) {
                        self.step(key == 34 ? -10 : -1, e);
                    }
                    return e.preventDefault();
                }
            });
        }


        input.blur(function (e) {
            var val = $(this).val();
            if (val !== value) {
                self.setValue(val, e);
            }
        });


        // HTML5 DOM methods
        $.extend(input[0], { stepUp:self.stepUp, stepDown:self.stepDown});


        // calculate all dimension related stuff
        function init() {
            vertical = conf.vertical || dim(root, "height") > dim(root, "width");

            if (vertical) {
                len = dim(root, "height") - dim(handle, "height");
                origo = root.offset().top + len;

            } else {
                len = dim(root, "width") - dim(handle, "width");
                origo = root.offset().left;
            }
        }

        function begin() {
            init();
            self.setValue(conf.value !== undefined ? conf.value : conf.min);
        }

        begin();

        // some browsers cannot get dimensions upon initialization
        if (!len) {
            $(window).load(begin);
        }
    }

    $.expr[':'].range = function (el) {
        var type = el.getAttribute("type");
        return type && type == 'range' || !!$(el).filter("input").data("rangeinput");
    };

    // jQuery plugin implementation
    $.fn.rangeinput = function (conf) {

        // already installed
        if (this.data("rangeinput")) {
            return this;
        }

        // extend configuration with globals
        conf = $.extend(true, {}, defaultOptions, conf);

        var els;

        this.each(function () {
            var el = new RangeInput($(this), $.extend(true, {}, conf));
            var input = el.getInput().data("rangeinput", el);
            els = els ? els.add(input) : input;
        });

        return els ? els : this;
    };

}));