/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : plugin-rangeinput.js
 *  Description: 범위 입력상자는 HTML5 요소이지만 webkit 기반외의 브라우저에서 작동하지 않으므로 다른 브라우저에서도 정상적으로 작동하도록 구현한 플러그인이다.
 *  Author: 김우섭
 *  License :
 */
;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === "function" && define.amd)
        define([ "jquery", "underscore", "backbone", "widget-touch" ], factory);
    else
        root.RangeInput = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
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

        root = $("<div><div></div><button></button></div>").data("rangeinput", self),
        vertical,
        value, // current value
        origo, // handle's start point
        len, // length of the range
        pos; // current position of the handle

        // UI 엘리먼트 생성
        input.before(root);

        var handle = root.addClass(css.slider).find("button").addClass(css.handle),
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
            input.addClass("figure inline form-control").val(conf.value).attr('type', 'tel').attr('data-orig-type', 'range');
        }

        input.addClass(css.input);

        // input UI를 노출시키고 싶지 않은 경우 처리
        if (!conf.showInput) {
            input.css({
                display: "none"
            });
        } else {
            input.addClass(css.inputGrid);
            root.addClass(css.sliderGrid);
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
                self.$input.trigger(e = $.Event('end.cs.rangeInput'));
            } : null;

            if (vertical) {
                handle.animate({top: x}, speed, callback);
                if (conf.progress) {
                    progress.animate({height: len - x + handle.height() / 2}, speed);
                }

            } else {
                if (navigator.userAgent.match("Android|iPhone")) {
                    handle[0].style["WebkitTransform"] = "translate3d(" + x + "px,0,0)";
                } else {
                    handle.animate({left: x}, speed, callback);
                    if (conf.progress) {
                        progress.animate({width: x + handle.width() / 2}, speed);
                    }

                }
            }

            // 현재값과 좌표 저장
            value = val;
            pos = x;

            if (!navigator.userAgent.match("Android") && !this.insertingValue && input[0].value != val) {
                this.insertingValue = true;
                input[0].value = val;
                this.insertingValue = false;
            }
            self.$input = input;
            self.inputValue = value;
            self.$input.trigger(e = $.Event('move.cs.rangeInput'));
            return self;
        }

        $.extend(self, {

            getValue: function () {
                return value;
            },

            setValue: function (val, e) {
                init();
                return slide(e || $.Event("api"), undefined, val, true);
            },

            getConf: function () {
                return conf;
            },

            getProgress: function () {
                return progress;
            },

            getHandle: function () {
                return handle;
            },

            getInput: function () {
                return input;
            },

            step: function (am, e) {
                e = e || $.Event();
                var step = conf.step == 'any' ? 1 : conf.step;
                self.setValue(value + step * (am || 1), e);
            },

            // HTML5 compatible name
            stepUp: function (am) {
                return self.step(am || 1);
            },

            // HTML5 compatible name
            stepDown: function (am) {
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
        handle.drag({drag: false}).on("dragStart",function () {
            /* do some pre- calculations for seek() function. improves performance */
            init();

            // avoid redundant event triggering (= heavy stuff)
            fireOnSlide = hasEvent($(self)) || hasEvent(input);
            self.$input.trigger(e = $.Event('start.cs.rangeInput'));


        }).on("drag",function (e, y, x) {

            var distance = 0;
            if (input.is(":disabled")) {
                return false;
            }

            distance = isNaN(this.prevX) ? x : (x > this.prevX ? x - this.prevX : this.prevX - x);

            if (navigator.userAgent.match("Android") && distance < 10) {
                slide(e, vertical ? y : x);
            } else {
                slide(e, vertical ? y : x);
            }

            this.prevX = x;

        }).on("dragEnd",function (e) {
            self.$input.val(self.inputValue);
            if (!e.isDefaultPrevented()) {
                e.type = "change";
                fire.trigger(e, [value]);
            }
            self.$input.trigger(e = $.Event('end.cs.rangeInput'));
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
            self.$input.trigger($.Event('start.cs.rangeInput'));
            slide(e, vertical ? len - origo - fix + e.pageY : e.pageX - origo - fix);
            self.$input.val(self.inputValue);
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

                    // UP:  k=75, l=76, up=38, pageup=33, right=39
                    if (up) {
                        self.step(key == 33 ? 10 : 1, e);

                        // DOWN:    j=74, h=72, down=40, pagedown=34, left=37
                    } else if (down) {
                        self.step(key == 34 ? -10 : -1, e);
                    }
                    return e.preventDefault();
                }
            });
        }


        input.on("change", function (e) {
            if ($(this).css("display") === 'none') {
                return false;
            }
            var val = $(this).val();
            if (val !== value) {
                self.setValue(val, e);
            }
        });
        $(window).on("resize._rangeinput", function() {
            self.setValue(input.val());
        });


        // HTML5 DOM methods
        $.extend(input[0], { stepUp: self.stepUp, stepDown: self.stepDown});


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
        var defaultOptions = {
            min: 0,
            max: 100,
            step: 'any',
            steps: 0,
            value: 0,
            precision: undefined,
            vertical: 0,
            keyboard: false,
            progress: false,
            speed: 100,
            showInput: false,
            css: {
                input: 'range',
                inputGrid: 'col-xs-3',
                slider: 'slider',
                sliderGrid: 'col-xs-9',
                progress: 'slider-bar',
                handle: 'slide-handle'
            }
        };

        if (this.data("rangeinput")) {
            return this;
        }

        conf = $.extend(true, {}, defaultOptions, conf);

        var els;

        this.each(function () {
            var el = new RangeInput($(this), $.extend(true, {}, conf));
            var input = el.getInput().data("rangeinput", el);
            els = els ? els.add(input) : input;
        });

        return els ? els : this;
    };

    $(function () {
        $("[data-plugin^='rangeinput']").each(function (i) {
            var options = $(this).data("rangeOptions");
            $(this).rangeinput(options);
        });
    });

    return Backbone && Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.rangeinput(methodName);
            } else {
                this.$el.rangeinput(this.options);
            }
            return this;
        }
    });
}));
