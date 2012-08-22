/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : widget.js
 *  Description: widget.js은 각종 플러그인들의 wrapping, 커스텀 플러그인, 전후 처리를 통한 최적화 및 공통적인 터치 기능 등과 같은 작업을 처리한다.
 *  Author: 김우섭
 *  License :
 */

// 세미콜론은 패키징 작업시 앞쪽 스크립트가 닫지 않은 경우 오류를 사전에 막기 위함
;
(function (root, doc, factory) {
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
    (function ($, window, undefined) {
        var pluginPrefix = "",
            isDebug = true,
            pluginCollection = {
                // Bootstrap
                "alert":true, "button":true, "carousel":true, "collapse":true, "dropdown":true,
                "modal":true, "popover":true, "scrollspy":true, "tab":true, "tooltip":true,
                "typeahead":true,
                // Custom
                "sign":true, "motioncapcha":true, "loading":false, "fixedbar":false, "rangeinput":false
            },
            featuredpluginCollection = {
                "media":true, "editor":true, "datatables":true, "datapicker":true, "listview":true,
                "scrollview":true, "chart":true
            };

        /**
         * Widget 은 폼, 컴포넌트, 플러그인, 피처드플러그인, 제스처로 구성되어 있다.
         * @name Widget
         * @class Widget
         * @constructor
         */
        var Widget = function () {
        };

        Widget.prototype.init = function () {
            this.registryPlugin();
            this.registryFeaturedPlugin();
            this.common.touch();
            this.common.getDeviceType();
        };

        Widget.prototype.registryPlugin = function () {
            for (var idx in pluginCollection) {
                //noinspection JSUnfilteredForInLoop
                var orginName = idx;
                var isNeededInit = false;

                // 플러그인 이름에 대문자->소문자, 간소화 등을 처리
                if (idx === "motioncapcha") {
                    orginName = "motionCaptcha";
                } else if (idx === "sign") {
                    orginName = "jSignature";
                } else {
                    isNeededInit = true;
                }

                // Wrapping이 필요한 플러그인들만을 기존 플러그인명을 그대로 사용하기 위해서 prefix old로 재정의 한다.
                //noinspection JSUnfilteredForInLoop
                if (pluginCollection[idx]) {
                    $.fn["old" + orginName] = $.fn[orginName];

                    // jSignature 플러그인은 내부적으로도 $.jSignature 사용하므로 isNeededInit으로 플러그인 제거를 방지
                    if (isNeededInit) {
                        $.fn[orginName] = undefined;
                    }
                }

                // PluginCollection에 정의된 목록대로 플러그인들을 등록한다.
                // 반복문에선 function 종료된 시점인 경우 반복문의 마지막 값이 저장되는 Closure 특징으로 한번 더 Closure를 추가함.
                $.fn[pluginPrefix + idx] = (function (name) {
                    return function (options) {
                        var widget = new Widget();
                        return this.each(function () {
                            widget[name].init(options, this);
                        });
                    }
                })(pluginPrefix + idx);
            }
        };

        Widget.prototype.registryFeaturedPlugin = function () {
//            _debugger(featuredpluginCollection);
        };

        Widget.prototype.common = {
            init:function (target, options, element) {
                if (typeof options === "string") {
                    target.options = options;
                } else {
                    target.options = $.extend({}, target.options, options);
                }

                target.element = element;
                target.$element = $(element);

                target._build();
            },
            touch:function () {

                function getTouchPageXY(e) {
                    if (e.type.match("touch.*")) {
                        touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        e.pageX = touch.pageX;
                        e.pageY = touch.pageY;
                    }
                }

                $(document).on("touchstart mousedown touchmove mousemove touchend mouseup", function (e) {
                    if (e.type.match("touch.*")) {
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        e.pageX = touch.pageX;
                        e.pageY = touch.pageY;
                    }
                });

                /**
                 * 드래그 이벤트
                 * 설정:
                 * x: true, // 수평 드래그 활성화 여부
                 * y: true, // 수직 드래그 활성호 여부
                 * drag: true // 드래그 이벤트 실행 여부
                 *
                 * Events: dragStart, drag, dragEnd.
                 * Examples$(".myelementent").drag({y: false}).on("drag", function(event, x, y) {
                 *  // do your custom thing
                 *  });
                 */
                $.fn.drag = function (conf) {
                    var doc, draggable;
                    conf = $.extend({x:true, y:true, drag:true}, conf);
                    doc = doc || $(document).on("mousedown mouseup touchstart touchend", function (e) {
                        var touch;
                        var el = $(e.target);

                        // 마우스와 터치 이벤트가 시작하고 타겟 엘리먼트가 드래그인 경우
                        if (e.type.match("mousedown|touchstart") && el.data("drag")) {

                            var offset = el.position(),
                                x0 = e.pageX - offset.left,
                                y0 = e.pageY - offset.top,
                                start = true;

                            doc.on("mousemove.drag touchmove.drag", function (e) {
                                var x = e.pageX - x0,
                                    y = e.pageY - y0,
                                    props = {};

                                if (conf.x) {
                                    props.left = x;
                                }
                                if (conf.y) {
                                    props.top = y;
                                }

                                if (start) {
                                    el.trigger("dragStart");
                                    start = false;
                                }

                                if (conf.drag) {
                                    el.css(props);
                                }

                                el.trigger("drag", [y, x]);
                                draggable = el;
                            });

                            e.preventDefault();
                        } else {

                            try {
                                if (draggable) {
                                    draggable.trigger("dragEnd");
                                }
                            } finally {
                                // 이벤트 제거
                                doc.off("mousemove.drag touchmove.drag");
                                draggable = null;
                            }
                        }

                    });

                    return this.data("drag", true);
                };
            },
            replaceAll:function (target, searchText, replaceText) {
                console.log(typeof target);
                if (typeof target === "string") {
                    target.replace(new RegExp(searchText, "gi"), replaceText);
                }
            },
            // 터치 컨테이너와 포인터의 CSS 준비
            prepareTouchCss:function (element) {
                var vendors = ['webkit', 'moz', 'ms', 'o', ''];
                var css_props = {
                    "userSelect":"none",
                    "touchCallout":"none",
                    "userDrag":"none",
                    "tapHighlightColor":"rgba(0,0,0,0)"
                };

                var prop = '';
                for (var i = 0; i < vendors.length; i++) {
                    var stylePropert = "";
                    for (var p in css_props) {
                        prop = p;
                        if (vendors[i]) {
                            prop = vendors[i] + prop.substring(0, 1).toUpperCase() + prop.substring(1);
                        }
                        stylePropert += prop + ":" + css_props[p] + "; ";
                    }

                    element.attr("style", element.attr("style") + ";" + stylePropert);
                }

            },
            // UserAgent 정보를 통해 디바이스 구분
            getDeviceType:function () {
                if (navigator.userAgent.toUpperCase().match("IOS")) {
                    $.browser.os = "IOS";
                    $.browser.version = 4;
                } else if (navigator.userAgent.toUpperCase().match("IOS")) {
                    $.browser.os = "ANDROID";
                }
            }
        };

        /**
         * alert 은 화면에 경고 메세지를 표현하기 위한 플러그인이다.
         *
         * @constructor
         * @name alert
         * @param {string} options - 옵션값 (close)
         * @param {object} element - 타겟 엘리먼트
         * @example
         * <pre>
         *     $(".alert").alert();
         * </pre>
         */
        Widget.prototype.alert = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {
                console.log(this.$element);
            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                console.log(this.options);
                this.$element.oldalert(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * button 은 버튼에 toggle 기능을 추가한 플러그인이다.
         *
         * @constructor
         * @name button
         * @param {string} options - 토글시 노출시킬 텍스트 (toggle, loading, reset, 사용자정의 문자)
         * @param {object} element - 타겟 엘리먼트
         * @example
         * <pre>
         *     $('.nav-tabs').button()
         * </pre>
         */
        Widget.prototype.button = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldbutton(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * 캐러셀은 이미지 슬라이더 플러그인으로 CSS3 효과를 추가해 다양한 형태의 화면전환를 연출시킨다.
         *
         * @constructor
         * @name carousel
         * @param {object, string} options - 이미지 슬라이더 옵션 지정 (cycle, pause, number, prev, next, default{interval: 4000, pause: "hover"})
         * @param {object} element - 타겟 엘리먼트
         * @example
         *     $('.carousel').carousel()
         *
         *     Event    Description
         *     slide    슬라이드 이벤트가 시작할 때 발생
         *     slid 슬리이드 이벤트가 완료했을 때 발생
         *
         *     TODO 반응형 웹사이트에 대응하기 위하 유동적으로 높이와 폭을 잡아야하며,
         *     background-size 역시 그 비율에 맞게 조절이 필요하다.
         */
        Widget.prototype.carousel = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{

            },
            _before:function () {

            },
            _build:function () {
                this._before();
                this.initFluxWidth = this.$element.width();
                this.flux = new flux.slider(this.$element, this.options);
                this._done();
            },
            _done:function () {
                var self = this;

                // 반응형 콜백 처리
                var delay = (function () {
                    var timer = 0;
                    return function (callback, ms) {
                        clearTimeout(timer);
                        timer = setTimeout(callback, ms);
                    };
                })();
                $(window).on("resize", function (e) {
                    delay(function () {
                    }, 500);
                });

                // 기존 플러그인에 없는 파괴 함수 추가
                this.flux.remove = function () {
                    console.log("remove");
                };
                this.flux.remove();
            },
            responsiveSlider:function () {
                var isIncreaseWidth = (this.initFluxWidth < $(".fluxslider").width());
                if (!isIncreaseWidth) {
                    this.options.width = $(".fluxslider").width();
                } else {
                    this.options.width = this.initFluxWidth;
                }

                this.flux.start();
            },
            swipeSlider:function () {

            }
        };

        /**
         * 콜라스는 아코디언으로 수직으로 접기/펼치기 기능을 하는 플러그인이다.
         * @name collapse
         */
        Widget.prototype.collapse = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldcollapse(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * dropdown은 메뉴와 같은 네비게이션에서 하위 메뉴를 노출 시킬 때 사용 되는 플러그인이다.
         * @name dropdown
         */
        Widget.prototype.dropdown = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.olddropdown(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * modal은 팝업 형태로 노출되는 플러그인이다.
         * @name modal
         * TODO 오페라 및 모바일에서 비정상적인 작동과, 성능이 저하되는 문제가 발생하므로 조치가 필요하다.
         */
        Widget.prototype.modal = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldmodal(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * popover
         * @name popover
         */
        Widget.prototype.popover = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldpopover(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * scrollspy
         * @name scrollspy
         */
        Widget.prototype.scrollspy = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldscrollspy(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * 탭은
         * @name tab
         */
        Widget.prototype.tab = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldtab(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * tooltip
         * @name tooltip
         */
        Widget.prototype.tooltip = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldtooltip(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * typeahead는 입력창에 텍스트 입력시 관련 단어들이 노출되는 플러그인이다.
         *
         * @constructor
         * @param {object, string} options - 이미지 슬라이더 옵션 지정 (cycle, pause, number, prev, next, default{interval: 4000, pause: "hover"})
         * @param {object} element - 타겟 엘리먼트
         * @example
         *     $('.carousel').carousel()
         *
         *     Event    Description
         *     slide    This event fires immediately when the slide
         *     instance method is invoked.
         *
         *     slid    This event is fired when the carousel has completed
         *     its slide transition.
         *
         *     TODO 반응형 웹사이트에 대응하기 위하 유동적으로 높이와 폭을 잡아야하며,
         *     background-size 역시 그 비율에 맞게 조절이 필요하다.
         */
        Widget.prototype.typeahead = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldtypeahead(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * sign
         * @name sign
         * TODO 터치 이벤트 중복 문제 해결필
         */
        Widget.prototype.sign = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldjSignature(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * Motion Capcha 은 Form 전송시(로그인, 회원가입 등) 스팸 방지를 위한 터치 기반 Capcha 플러그인이다.
         * @name motioncapcha
         * TODO 갤럭시 S3 기본 브라우저에서 로딩 후 첫화면이 아닌 스크롤로 이동해서 보여지는 경우 모션이 표현 되지 않는 문제.
         */
        Widget.prototype.motioncapcha = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldmotionCaptcha(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * loading
         * @name loading
         */
        Widget.prototype.loading = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
//            this.$element.oldmotionCaptcha(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * fixedbar
         * @name fixedbar
         */
        Widget.prototype.fixedbar = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {
            },
            _build:function () {
                this._before();
//                this.$element.oldalert(this.options);
                this._done();
            },
            _done:function () {

            },
            fixedbar:function () {

            }
        };

        /**
         * slider
         * @name slider
         * TODO input 태그에 pseudo 클래스 :before, :after를 사용은 유효성에 위배되므로 별개 UI(div)로 표현함.
         * http://stackoverflow.com/questions/4574912/css-content-generation-before-input-elementents
         */
        Widget.prototype.rangeinput = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                this._create();
                this._done();
            },
            _done:function () {
            },
            _create:function () {
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
                            if (conf.progress) {
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

                        input[0].value = val;
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
                $.fn._rangeinput = function (conf) {

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

                this.$element._rangeinput(this.options);
            }
        };

        var widget = new Widget();
        widget.init();
    }(jQuery, this));
}));
