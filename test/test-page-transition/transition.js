/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  Description: 이 플러그인은 화면전환을 실행하기 위한 플러그인이며,
 *  이 플러그인은 jQuery Core Style Guide(http://docs.jquery.com/JQuery_Core_Style_Guidelines)를 준수합니다.
 *  Author: 김우섭
 *  License :
 */

// 세미콜론은 패키징 작업시 앞쪽 스크립트가 닫지 않은 경우 오류를 사전에 막기 위함
;var Transition = {};
(function ($, window) {

    var Launcher = function (options) {
        this.options = options;
    };

    var Effect = Transition.effect = function (options) {
        this.options = options;
    };

    Transition.launcher = function (option) {
        return new Launcher(option).init();
    };

    // 화면전환 실행기
    Launcher.prototype = {
        defaults:{
            transitionType:"none", // 화면전환 효과 기본 None(효과 없음)
            fallbackType:"fade", // IE에서 임시로 사용할 효과
            inTarget:{
                id:undefined, // 들어오는 페이지의 ID 값
                from:undefined, // 들어오는 페이지의 시작점
                to:undefined, // 들어오는 페이지의 도착점
                duration:undefined, // 들어오는 페이지의 애니메이션 시간
                timing:"ease", // linear ease ease-in ease-out ease-in-out
                done:function () {

                }
            },
            outTarget:{
                id:undefined, // 나가는 페이지의 ID 값
                from:undefined, // 나가는 페이지의 시작점
                to:undefined, // 나가는 페이지의 도착점
                duration:undefined, // 나가는 페이지의 애니메이션 시간
                timing:"ease",
                done:function () {

                }
            },
            isReverse:false, // 뒤로가기 여부
            done:function () {

            }
        },
        // 초기화
        init:function () {
            // 기본 설정과 사용자가 정의한 값을 병합
            this.options.inTarget = $.extend({}, this.defaults.inTarget, this.options.inTarget);
            this.options.outTarget = $.extend({}, this.defaults.outTarget, this.options.outTarget);
            this.options = $.extend({}, this.defaults, this.options);

            this.run();
            return this;
        },

        // 화면전환 실행
        run:function () {
            var effect = new Effect(this.options);
            try {
                this._before(this.options);

                // Fallback for MSIE
                if (!$.support.transition) {
                    $.fn.transition = $.fn.animate;
                    this.options.transitionType = this.options.fallbackType;
                    this.options.inTarget.timing = "linear";
                    this.options.outTarget.timing = "linear";
                }

                effect.init();
                effect[this.options.transitionType](this.options);
            } catch (e) {
                console.log(e);
                effect.none(this.options);
            }
        },

        // 화면전환 시작하기 전 실행
        _before:function (opt) {
            console.log("_before");

            $("body").css({overflow:"hidden"});
            $(opt.inTarget.id).show();
            $(opt.outTarget.id).show();

            if (opt.isReverse) {
                this.options.transitionType = $("body").attr("data-transition");
            }
        },

        // 화면전환 완료시 실행
        _done:function (opt) {
            $("body").css({overflow:"auto"}).attr("data-transition", opt.transitionType);
            $(opt.outTarget.id).removeAttr("style").hide();
            $(opt.inTarget.id).removeAttr("style").show();
            opt.inTarget.done();
            opt.done();

            console.log("_done");
        }
    };

    // 화면전환 효과
    Effect.prototype = {
        inTargetCss:null,
        outTargetCss:null,

        // 초기화
        init:function () {
            this.plugin = new Launcher(this.options);
        },

        // 페이지별 설정값 병합 유틸리티
        extend:function (defaultValue, opt) {
            opt.inTarget = $.extend({}, defaultValue.inTarget, opt.inTarget);
            opt.outTarget = $.extend({}, defaultValue.outTarget, opt.outTarget);
            return opt;
        },

        // 효과가 없는 경우
        none:function (opt) {
            var self = this;
            $(opt.outTarget.id).hide(function () {
                opt.outTarget.done();
                $(opt.inTarget.id).show(function () {
                    self.plugin._done(opt);
                });
            });
        },

        // 플립효과
        flip:function (opt) {
            // 플립 기본 값
            var self = this,
                defaultValue = {
                    inTarget:{
                        from:"90deg",
                        to:0,
                        duration:350
                    },
                    outTarget:{
                        from:0,
                        to:"-90deg",
                        duration:150
                    }
                };

            // 뒤로가기시 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget:{
                        from:"-90deg",
                        to:0,
                        duration:350
                    },
                    outTarget:{
                        from:0,
                        to:"90deg",
                        duration:150
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            $(opt.outTarget.id).height();
            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"absolute",
                width:$(opt.outTarget.id).width(),
                perspective:$(opt.outTarget.id).width(),
                rotate3d:"0, 1, 0, " + opt.outTarget.from,
                height:$(window).height() > $(opt.outTarget.id).height() ?
                    $(opt.outTarget.id).height() : $(window).height(),
                opacity:1
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"absolute",
                width:$(opt.inTarget.id).width(),
                perspective:$(opt.inTarget.id).width(),
                rotate3d:"0, 1, 0, " + opt.inTarget.from,
                height:$(window).height() > $(opt.inTarget.id).height() ?
                    $(opt.inTarget.id).height() : $(window).height(),
                opacity:0
            };

            $.transition = $.transit;
            $(opt.inTarget.id).css(this.inTargetCss);
            $(opt.outTarget.id).css(this.outTargetCss).transition({
                rotate3d:"0, 1, 0, " + opt.outTarget.to,
                opacity:0
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                opt.outTarget.done();

                $(opt.inTarget.id).transition({
                    rotate3d:"0, 1, 0, " + opt.inTarget.to,
                    opacity:1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.plugin._done(opt);
                });
            });

        },

        // 회전 효과
        spin:function (opt) {
            // 플립 기본 값
            var self = this,
                defaultValue = {
                    inTarget:{
                        from:"90deg",
                        to:0,
                        duration:550
                    },
                    outTarget:{
                        from:0,
                        to:"-90deg",
                        duration:550
                    }
                };

            // 뒤로가기시 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget:{
                        from:"-90deg",
                        to:0,
                        duration:550
                    },
                    outTarget:{
                        from:0,
                        to:"90deg",
                        duration:550
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"absolute",
                width:$(opt.outTarget.id).width(),
                perspective:$(opt.outTarget.id).width(),
                rotate3d:"0, 0, 0, " + opt.outTarget.from,
                scale:1,
                opacity:1
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"absolute",
                width:$(opt.inTarget.id).width(),
                perspective:$(opt.inTarget.id).width(),
                rotate3d:"0, 0, 0, " + opt.inTarget.from,
                scale:0,
                opacity:0
            };

            $(opt.inTarget.id).css(this.inTargetCss);
            $(opt.outTarget.id).css(this.outTargetCss).transition({
                rotate3d:"0, 0, 0, " + opt.outTarget.to,
                scale:0,
                opacity:0
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                $(this).css({
                    scale:1
                });
                opt.outTarget.done();

                $(opt.inTarget.id).transition({
                    rotate3d:"0, 0, 0, " + opt.inTarget.to,
                    scale:1,
                    opacity:1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.plugin._done(opt);
                });
            });
        },

        // 슬라이드 효과
        slide:function (opt) {
            // 슬라이드 기본 좌표 값
            var self = this,
                defaultValue = {
                    inTarget:{
                        from:"120%", // width 100%인 경우 UI 상 페이지가 붙는 상태로 보이는 문제를 위해 좌표 20% 증가
                        to:"0",
                        duration:550
                    },
                    outTarget:{
                        from:"0",
                        to:'-100%',
                        duration:550
                    }
                };

            // 뒤로가기시 슬라이드 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget:{
                        from:"-120%",
                        to:"0",
                        duration:550
                    },
                    outTarget:{
                        from:"0",
                        to:'100%',
                        duration:550
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화
            this.outTargetCss = {
                position:"absolute",
                width:$(opt.outTarget.id).width(),
                transform:"translate(" + opt.outTarget.from + ",0)",
                opacity:1
            };

            // 들어오는 페이지 스타일 초기화
            this.inTargetCss = {
                position:"absolute",
                width:$(opt.inTarget.id).width(),
                transform:"translate(" + opt.inTarget.from + ",0)",
                opacity:1
            };

            // 나가는 페이지 슬라이드
            $(opt.outTarget.id).css(this.outTargetCss).transition({
                x:opt.outTarget.to,
                opacity:0
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                // 기본 좌표로 초기화
                $(this).css({
                    transform:"translate(0,0)"
                });
                opt.outTarget.done();
            });

            // 들어오는 페이지 슬라이드
            $(opt.inTarget.id).css(this.inTargetCss).transition({
                x:opt.inTarget.to
            }, opt.inTarget.duration, opt.inTarget.timing, function () {
                self.plugin._done(opt);
            });

        },

        // 슬라이드 업 효과
        slideup:function (opt) {
            // 슬라이드 기본 좌표 값
            var self = this,
                defaultValue = {
                    inTarget:{
                        from:"100%",
                        to:"0",
                        duration:550
                    },
                    outTarget:{
                        from:"0",
                        to:'-100%',
                        duration:550
                    }
                };

            // 뒤로가기시 슬라이드 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget:{
                        from:"-100%",
                        to:"0",
                        duration:550
                    },
                    outTarget:{
                        from:"0",
                        to:'100%',
                        duration:550
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화
            this.outTargetCss = {
                position:"absolute",
                width:$(opt.outTarget.id).width(),
                transform:"translate(0, " + opt.outTarget.from + ")",
                opacity:1
            };

            // 들어오는 페이지 스타일 초기화
            this.inTargetCss = {
                position:"absolute",
                width:$(opt.inTarget.id).width(),
                transform:"translate(0, " + opt.inTarget.from + ")",
                opacity:1
            };

            // 나가는 페이지 슬라이드
            $(opt.outTarget.id).css(this.outTargetCss).transition({
                y:opt.outTarget.to,
                opacity:0
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                $(this).css({
                    transform:"translate(0,0)"
                });
                opt.outTarget.done();
            });

            // 들어오는 페이지 슬라이드
            $(opt.inTarget.id).css(this.inTargetCss).transition({
                y:opt.inTarget.to
            }, opt.inTarget.duration, opt.inTarget.timing, function () {
                self.plugin._done(opt);
            });

        },

        // 슬라이드 다운 효과
        slidedown:function (opt) {
            // 슬라이드 기본 좌표 값
            var self = this,
                defaultValue = {
                    inTarget:{
                        from:"-100%",
                        to:"0",
                        duration:550
                    },
                    outTarget:{
                        from:"0",
                        to:'100%',
                        duration:550
                    }
                };

            // 뒤로가기시 슬라이드 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget:{
                        from:"100%",
                        to:"0",
                        duration:550
                    },
                    outTarget:{
                        from:"0",
                        to:'-100%',
                        duration:550
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화
            this.outTargetCss = {
                position:"absolute",
                width:$(opt.outTarget.id).width(),
                transform:"translate(0, " + opt.outTarget.from + ")",
                opacity:1
            };

            // 들어오는 페이지 스타일 초기화
            this.inTargetCss = {
                position:"absolute",
                width:$(opt.inTarget.id).width(),
                transform:"translate(0, " + opt.inTarget.from + ")",
                opacity:1
            };

            // 나가는 페이지 슬라이드
            $(opt.outTarget.id).css(this.outTargetCss).transition({
                y:opt.outTarget.to,
                opacity:0
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                $(this).css({
                    transform:"translate(0,0)"
                });
                opt.outTarget.done();
            });

            // 들어오는 페이지 슬라이드
            $(opt.inTarget.id).css(this.inTargetCss).transition({
                y:opt.inTarget.to
            }, opt.inTarget.duration, opt.inTarget.timing, function () {
                self.plugin._done(opt);
            });

        },

        // 페이드 효과
        fade:function (opt) {
            // 페이드 기본 값
            var self = this,
                defaultValue = {
                    inTarget:{
                        duration:250
                    },
                    outTarget:{
                        duration:250
                    }
                };

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"absolute",
                width:$(opt.outTarget.id).width(),
                opacity:1
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"absolute",
                width:$(opt.inTarget.id).width(),
                opacity:0
            };

            // 페이지 스타일 초기화
            $(opt.inTarget.id).css(this.inTargetCss);
            $(opt.outTarget.id).css(this.outTargetCss).transition({
                opacity:0
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                opt.outTarget.done();
                $(opt.inTarget.id).transition({
                    opacity:1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.plugin._done(opt);
                });
            });
        },

        // 팝 효과
        pop:function (opt) {
            // 회전 기본 값
            var self = this,
                defaultValue = {
                    inTarget:{
                        duration:350
                    },
                    outTarget:{
                        from:0,
                        duration:150
                    }
                };

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"absolute",
                width:$(opt.outTarget.id).width(),
                scale:1,
                opacity:1,
                perspective:$(opt.outTarget.id).width(),
                rotate3d:"0, 0, 0, 0",
                overflow:"hidden"
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"absolute",
                width:$(opt.inTarget.id).width(),
                scale:0.5,
                opacity:0,
                perspective:$(opt.outTarget.id).width(),
                rotate3d:"0, 0, 0, 0",
                overflow:"hidden"
            };

            $(opt.inTarget.id).css(this.inTargetCss);
            $(opt.outTarget.id).css(this.outTargetCss).transition({
                scale:0.5,
                opacity:0
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                $(this).css({
                    scale:1
                });
                opt.outTarget.done();

                $(opt.inTarget.id).transition({
                    scale:1,
                    opacity:1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.plugin._done(opt);
                });
            });
        },

        // 전환 효과
        turn:function (opt) {
            // 회전 기본 값
            var self = this,
                defaultValue = {
                    inTarget:{
                        from:"90deg",
                        to:0,
                        duration:350
                    },
                    outTarget:{
                        from:0,
                        to:"-90deg",
                        duration:150
                    }
                };

            // 뒤로가기시 반대 효과 좌표 값
            if (opt.isReverse) {
                defaultValue = {
                    inTarget:{
                        from:"-90deg",
                        to:0,
                        duration:350
                    },
                    outTarget:{
                        from:0,
                        to:"90deg",
                        duration:150
                    }
                };
            }

            // 기본값과 사용자 정의 값 병합
            opt = this.extend(defaultValue, opt);

            // 나가는 페이지 스타일 초기화 값
            this.outTargetCss = {
                position:"absolute",
                width:$(opt.outTarget.id).width(),
                perspective:$(opt.outTarget.id).width(),
                rotate3d:"0, 1, 0, " + opt.outTarget.from,
                transformOrigin:"0 0",
                opacity:1,
                height:$(window).height() > $(opt.outTarget.id).height() ?
                    $(opt.outTarget.id).height() : $(window).height(),
                overflow:"hidden"
            };

            // 들어오는 페이지 스타일 초기화 값
            this.inTargetCss = {
                position:"absolute",
                width:$(opt.inTarget.id).width(),
                perspective:$(opt.inTarget.id).width(),
                rotate3d:"0, 1, 0, " + opt.inTarget.from,
                transformOrigin:"0 0",
                opacity:0 ,
                height:$(window).height() > $(opt.outTarget.id).height() ?
                    $(opt.outTarget.id).height() : $(window).height(),
                overflow:"hidden"
            };

            $(opt.inTarget.id).css(this.inTargetCss);
            $(opt.outTarget.id).css(this.outTargetCss).transition({
                rotate3d:"0, 1, 0, " + opt.outTarget.to,
                opacity:0
            }, opt.outTarget.duration, opt.outTarget.timing, function () {
                opt.outTarget.done();

                $(opt.inTarget.id).transition({
                    rotate3d:"0, 1, 0, " + opt.inTarget.to,
                    opacity:1
                }, opt.inTarget.duration, opt.inTarget.timing, function () {
                    self.plugin._done(opt);
                });
            });
        },

        // 사용자 정의
        custom:function (opt) {
            // Some ...
        }
    }
})(jQuery, window);