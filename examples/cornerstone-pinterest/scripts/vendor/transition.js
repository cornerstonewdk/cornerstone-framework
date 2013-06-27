/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  Description: 이 플러그인은 화면전환을 실행하기 위한 플러그인이며,
 *  이 플러그인은 jQuery Core Style Guide(http://docs.jquery.com/JQuery_Core_Style_Guidelines)를 준수합니다.
 *  Author: 김우섭
 *  License :
 */


/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function (k) {
	k.transit = {version: "0.9.9", propertyMap: {marginLeft: "margin", marginRight: "margin", marginBottom: "margin", marginTop: "margin", paddingLeft: "padding", paddingRight: "padding", paddingBottom: "padding", paddingTop: "padding"}, enabled: true, useTransitionEnd: false};
	var d = document.createElement("div");
	var q = {};

	function b(v) {
		if (v in d.style) {
			return v
		}
		var u = ["Moz", "Webkit", "O", "ms"];
		var r = v.charAt(0).toUpperCase() + v.substr(1);
		if (v in d.style) {
			return v
		}
		for (var t = 0; t < u.length; ++t) {
			var s = u[t] + r;
			if (s in d.style) {
				return s
			}
		}
	}

	function e() {
		d.style[q.transform] = "";
		d.style[q.transform] = "rotateY(90deg)";
		return d.style[q.transform] !== ""
	}

	var a = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
	q.transition = b("transition");
	q.transitionDelay = b("transitionDelay");
	q.transform = b("transform");
	q.transformOrigin = b("transformOrigin");
	q.transform3d = e();
	var i = {transition: "transitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", WebkitTransition: "webkitTransitionEnd", msTransition: "MSTransitionEnd"};
	var f = q.transitionEnd = i[q.transition] || null;
	for (var p in q) {
		if (q.hasOwnProperty(p) && typeof k.support[p] === "undefined") {
			k.support[p] = q[p]
		}
	}
	d = null;
	k.cssEase = {_default: "ease", "in": "ease-in", out: "ease-out", "in-out": "ease-in-out", snap: "cubic-bezier(0,1,.5,1)", easeOutCubic: "cubic-bezier(.215,.61,.355,1)", easeInOutCubic: "cubic-bezier(.645,.045,.355,1)", easeInCirc: "cubic-bezier(.6,.04,.98,.335)", easeOutCirc: "cubic-bezier(.075,.82,.165,1)", easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)", easeInExpo: "cubic-bezier(.95,.05,.795,.035)", easeOutExpo: "cubic-bezier(.19,1,.22,1)", easeInOutExpo: "cubic-bezier(1,0,0,1)", easeInQuad: "cubic-bezier(.55,.085,.68,.53)", easeOutQuad: "cubic-bezier(.25,.46,.45,.94)", easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)", easeInQuart: "cubic-bezier(.895,.03,.685,.22)", easeOutQuart: "cubic-bezier(.165,.84,.44,1)", easeInOutQuart: "cubic-bezier(.77,0,.175,1)", easeInQuint: "cubic-bezier(.755,.05,.855,.06)", easeOutQuint: "cubic-bezier(.23,1,.32,1)", easeInOutQuint: "cubic-bezier(.86,0,.07,1)", easeInSine: "cubic-bezier(.47,0,.745,.715)", easeOutSine: "cubic-bezier(.39,.575,.565,1)", easeInOutSine: "cubic-bezier(.445,.05,.55,.95)", easeInBack: "cubic-bezier(.6,-.28,.735,.045)", easeOutBack: "cubic-bezier(.175, .885,.32,1.275)", easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"};
	k.cssHooks["transit:transform"] = {get: function (r) {
		return k(r).data("transform") || new j()
	}, set: function (s, r) {
		var t = r;
		if (!(t instanceof j)) {
			t = new j(t)
		}
		if (q.transform === "WebkitTransform" && !a) {
			s.style[q.transform] = t.toString(true)
		} else {
			s.style[q.transform] = t.toString()
		}
		k(s).data("transform", t)
	}};
	k.cssHooks.transform = {set: k.cssHooks["transit:transform"].set};
	if (k.fn.jquery < "1.8") {
		k.cssHooks.transformOrigin = {get: function (r) {
			return r.style[q.transformOrigin]
		}, set: function (r, s) {
			r.style[q.transformOrigin] = s
		}};
		k.cssHooks.transition = {get: function (r) {
			return r.style[q.transition]
		}, set: function (r, s) {
			r.style[q.transition] = s
		}}
	}
	n("scale");
	n("translate");
	n("rotate");
	n("rotateX");
	n("rotateY");
	n("rotate3d");
	n("perspective");
	n("skewX");
	n("skewY");
	n("x", true);
	n("y", true);
	function j(r) {
		if (typeof r === "string") {
			this.parse(r)
		}
		return this
	}

	j.prototype = {setFromString: function (t, s) {
		var r = (typeof s === "string") ? s.split(",") : (s.constructor === Array) ? s : [s];
		r.unshift(t);
		j.prototype.set.apply(this, r)
	}, set: function (s) {
		var r = Array.prototype.slice.apply(arguments, [1]);
		if (this.setter[s]) {
			this.setter[s].apply(this, r)
		} else {
			this[s] = r.join(",")
		}
	}, get: function (r) {
		if (this.getter[r]) {
			return this.getter[r].apply(this)
		} else {
			return this[r] || 0
		}
	}, setter: {rotate: function (r) {
		this.rotate = o(r, "deg")
	}, rotateX: function (r) {
		this.rotateX = o(r, "deg")
	}, rotateY: function (r) {
		this.rotateY = o(r, "deg")
	}, scale: function (r, s) {
		if (s === undefined) {
			s = r
		}
		this.scale = r + "," + s
	}, skewX: function (r) {
		this.skewX = o(r, "deg")
	}, skewY: function (r) {
		this.skewY = o(r, "deg")
	}, perspective: function (r) {
		this.perspective = o(r, "px")
	}, x: function (r) {
		this.set("translate", r, null)
	}, y: function (r) {
		this.set("translate", null, r)
	}, translate: function (r, s) {
		if (this._translateX === undefined) {
			this._translateX = 0
		}
		if (this._translateY === undefined) {
			this._translateY = 0
		}
		if (r !== null && r !== undefined) {
			this._translateX = o(r, "px")
		}
		if (s !== null && s !== undefined) {
			this._translateY = o(s, "px")
		}
		this.translate = this._translateX + "," + this._translateY
	}}, getter: {x: function () {
		return this._translateX || 0
	}, y: function () {
		return this._translateY || 0
	}, scale: function () {
		var r = (this.scale || "1,1").split(",");
		if (r[0]) {
			r[0] = parseFloat(r[0])
		}
		if (r[1]) {
			r[1] = parseFloat(r[1])
		}
		return(r[0] === r[1]) ? r[0] : r
	}, rotate3d: function () {
		var t = (this.rotate3d || "0,0,0,0deg").split(",");
		for (var r = 0; r <= 3; ++r) {
			if (t[r]) {
				t[r] = parseFloat(t[r])
			}
		}
		if (t[3]) {
			t[3] = o(t[3], "deg")
		}
		return t
	}}, parse: function (s) {
		var r = this;
		s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function (t, v, u) {
			r.setFromString(v, u)
		})
	}, toString: function (t) {
		var s = [];
		for (var r in this) {
			if (this.hasOwnProperty(r)) {
				if ((!q.transform3d) && ((r === "rotateX") || (r === "rotateY") || (r === "perspective") || (r === "transformOrigin"))) {
					continue
				}
				if (r[0] !== "_") {
					if (t && (r === "scale")) {
						s.push(r + "3d(" + this[r] + ",1)")
					} else {
						if (t && (r === "translate")) {
							s.push(r + "3d(" + this[r] + ",0)")
						} else {
							s.push(r + "(" + this[r] + ")")
						}
					}
				}
			}
		}
		return s.join(" ")
	}};
	function m(s, r, t) {
		if (r === true) {
			s.queue(t)
		} else {
			if (r) {
				s.queue(r, t)
			} else {
				t()
			}
		}
	}

	function h(s) {
		var r = [];
		k.each(s, function (t) {
			t = k.camelCase(t);
			t = k.transit.propertyMap[t] || k.cssProps[t] || t;
			t = c(t);
			if (k.inArray(t, r) === -1) {
				r.push(t)
			}
		});
		return r
	}

	function g(s, v, x, r) {
		var t = h(s);
		if (k.cssEase[x]) {
			x = k.cssEase[x]
		}
		var w = "" + l(v) + " " + x;
		if (parseInt(r, 10) > 0) {
			w += " " + l(r)
		}
		var u = [];
		k.each(t, function (z, y) {
			u.push(y + " " + w)
		});
		return u.join(", ")
	}

	k.fn.transition = k.fn.transit = function (z, s, y, C) {
		var D = this;
		var u = 0;
		var w = true;
		if (typeof s === "function") {
			C = s;
			s = undefined
		}
		if (typeof y === "function") {
			C = y;
			y = undefined
		}
		if (typeof z.easing !== "undefined") {
			y = z.easing;
			delete z.easing
		}
		if (typeof z.duration !== "undefined") {
			s = z.duration;
			delete z.duration
		}
		if (typeof z.complete !== "undefined") {
			C = z.complete;
			delete z.complete
		}
		if (typeof z.queue !== "undefined") {
			w = z.queue;
			delete z.queue
		}
		if (typeof z.delay !== "undefined") {
			u = z.delay;
			delete z.delay
		}
		if (typeof s === "undefined") {
			s = k.fx.speeds._default
		}
		if (typeof y === "undefined") {
			y = k.cssEase._default
		}
		s = l(s);
		var E = g(z, s, y, u);
		var B = k.transit.enabled && q.transition;
		var t = B ? (parseInt(s, 10) + parseInt(u, 10)) : 0;
		if (t === 0) {
			var A = function (F) {
				D.css(z);
				if (C) {
					C.apply(D)
				}
				if (F) {
					F()
				}
			};
			m(D, w, A);
			return D
		}
		var x = {};
		var r = function (H) {
			var G = false;
			var F = function () {
				if (G) {
					D.unbind(f, F)
				}
				if (t > 0) {
					D.each(function () {
						this.style[q.transition] = (x[this] || null)
					})
				}
				if (typeof C === "function") {
					C.apply(D)
				}
				if (typeof H === "function") {
					H()
				}
			};
			if ((t > 0) && (f) && (k.transit.useTransitionEnd)) {
				G = true;
				D.bind(f, F)
			} else {
				window.setTimeout(F, t)
			}
			D.each(function () {
				if (t > 0) {
					this.style[q.transition] = E
				}
				k(this).css(z)
			})
		};
		var v = function (F) {
			this.offsetWidth;
			r(F)
		};
		m(D, w, v);
		return this
	};
	function n(s, r) {
		if (!r) {
			k.cssNumber[s] = true
		}
		k.transit.propertyMap[s] = q.transform;
		k.cssHooks[s] = {get: function (v) {
			var u = k(v).css("transit:transform");
			return u.get(s)
		}, set: function (v, w) {
			var u = k(v).css("transit:transform");
			u.setFromString(s, w);
			k(v).css({"transit:transform": u})
		}}
	}

	function c(r) {
		return r.replace(/([A-Z])/g, function (s) {
			return"-" + s.toLowerCase()
		})
	}

	function o(s, r) {
		if ((typeof s === "string") && (!s.match(/^[\-0-9\.]+$/))) {
			return s
		} else {
			return"" + s + r
		}
	}

	function l(s) {
		var r = s;
		if (k.fx.speeds[r]) {
			r = k.fx.speeds[r]
		}
		return o(r, "ms")
	}

	k.transit.getTransitionValue = g
})(jQuery);


// 세미콜론은 패키징 작업시 앞쪽 스크립트가 닫지 않은 경우 오류를 사전에 막기 위함
;
(function ($, window) {

	/**
	 * Transition 은 화면 전환를 구현 하기 위해 Launcher 와 Effect로 이뤄져 있다.
	 * @name Transition
	 * @constructor
	 * @class Transition
	 */
	var Transition = window.Transition = {};

	/**
	 * Launcher 은 화면 전환를 구현 하기 위해 Launcher 와 Effect로 이뤄져 있다.
	 * @name Launcher
	 * @class Launcher
	 * @constructor
	 * @param {JSON} options - 옵션값
	 */
	var Launcher = function (options) {
		this.options = options;
	};

	var Effect = Transition.effect = function (options) {
		this.options = options;
	};

	Transition.launcher = function (option) {
		return new Launcher(option).init();
	};

	Launcher.prototype = {
		defaults: {
			transitionType: "none", // 화면전환 효과 기본 None(효과 없음)
			fallbackType: "fade", // IE에서 임시로 사용할 효과
			autoDisplay: true, // 완료시 자동으로 이전페이지를 감출지 여부
			nested: false, // 네스티드 여부
			animationFade: true, // 트랜지션 중 페이드인아웃
			inTarget: {
				el: undefined, // 들어오는 페이지의 element의 셀렉터나 ID 또는 클래스
				from: undefined, // 들어오는 페이지의 시작점
				to: undefined, // 들어오는 페이지의 도착점
				duration: undefined, // 들어오는 페이지의 애니메이션 시간
				timing: "ease", // linear ease ease-in ease-out ease-in-out
				done: function () {

				}
			},
			outTarget: {
				el: undefined, // 나가는 페이지의 element의 셀렉터나 ID 또는 클래스
				from: undefined, // 나가는 페이지의 시작점
				to: undefined, // 나가는 페이지의 도착점
				duration: undefined, // 나가는 페이지의 애니메이션 시간
				timing: "ease",
				done: function () {

				}
			},
			isReverse: false, // 뒤로가기 여부
			done: function () {

			}
		},

		// 초기화
		init: function () {
			// 기본 설정과 사용자가 정의한 값을 병합
			this.options.inTarget = $.extend({}, this.defaults.inTarget, this.options.inTarget);
			this.options.outTarget = $.extend({}, this.defaults.outTarget, this.options.outTarget);
			this.options = $.extend({}, this.defaults, this.options);

			this.run();
			return this;
		},

		/**
		 * 화면 전환 실행 함수
		 * @name Launcher#run
		 * @function
		 * @example
		 * this.run();
		 */
		run: function () {
			var self = this;
			var effect = new Effect(this.options);

			this._before();

			try {
				// Fallback for MSIE
				if (!$.support.transition) {
					$.fn.transition = $.fn.animate;
					this.options.transitionType = this.options.fallbackType;
					this.options.inTarget.timing = "linear";
					this.options.outTarget.timing = "linear";
				}

				effect.init(self);
				effect[self.options.transitionType](self.options);
			} catch (e) {
				effect.none(this.options);
			}
		},

		/**
		 * 화면 전환 시작전 실행 함수
		 * @name Launcher#_before
		 * @function
		 * @example
		 * this._before();
		 */
		_before: function () {
//            console.log("_before")
			var $body = $("body");
			this.previousOverflow = $body.css("overflow");
			$body.css({overflowX: "hidden"});
			$(this.options.inTarget.el).show();
			$(this.options.outTarget.el).show();

			if (this.options.isReverse && $body.attr("data-transition") !== undefined) {
				this.options.transitionType = $body.attr("data-transition");
			}
		},

		/**
		 * 화면 전환 완료시 실행 함수
		 * @name Launcher#_done
		 * @function
		 * @example
		 * self.launcher._done();
		 */
		_done: function () {
			$("body").css({
				overflow: this.previousOverflow || "auto"
			}).attr("data-transition", this.options.transitionType);
			var $outTargetEl = $(this.options.outTarget.el).removeAttr("style");
			var $inTargetEl = $(this.options.inTarget.el).removeAttr("style");

			// 자동으로 이전페이지를 숨기기
			if (this.options.autoDisplay) {
				$outTargetEl.hide();
				$inTargetEl.show();
			}

			this.options.inTarget.done();
			this.options.done();
		}
	};

	// 화면전환 효과
	Effect.prototype = {
		inTargetCss: null,
		outTargetCss: null,

		// 초기화
		init: function (launcher) {
			this.launcher = launcher;
		},

		// 페이지별 설정값 병합 유틸리티
		extend: function (defaultValue, opt) {
			opt.inTarget = $.extend({}, defaultValue.inTarget, opt.inTarget);
			opt.outTarget = $.extend({}, defaultValue.outTarget, opt.outTarget);
			return opt;
		},

		// 효과가 없는 경우
		none: function (opt) {
			var self = this;
			$(opt.outTarget.el).hide(function () {
				opt.outTarget.done();
				$(opt.inTarget.el).show(function () {
					self.launcher._done();
				});
			});
		},

		// 플립효과
		flip: function (opt) {
			// 플립 기본 값
			var self = this,
				defaultValue = {
					inTarget: {
						from: "90deg",
						to: 0,
						duration: 350
					},
					outTarget: {
						from: 0,
						to: "-90deg",
						duration: 150
					}
				};

			// 뒤로가기시 반대 효과 좌표 값
			if (opt.isReverse) {
				defaultValue = {
					inTarget: {
						from: "-90deg",
						to: 0,
						duration: 350
					},
					outTarget: {
						from: 0,
						to: "90deg",
						duration: 150
					}
				};
			}

			// 기본값과 사용자 정의 값 병합
			opt = this.extend(defaultValue, opt);

			$(opt.outTarget.el).height();
			// 나가는 페이지 스타일 초기화 값
			this.outTargetCss = {
				position: "absolute",
				width: $(opt.outTarget.el).width(),
				perspective: $(opt.outTarget.el).width() * 2,
				rotate3d: "0, 1, 0, " + opt.outTarget.from,
				height: $(window).height() > $(opt.outTarget.el).height() ?
					$(opt.outTarget.el).height() : $(window).height(),
				overflow: "hidden",
				opacity: 1
			};

			// 들어오는 페이지 스타일 초기화 값
			this.inTargetCss = {
				position: "absolute",
				width: $(opt.inTarget.el).width(),
				perspective: $(opt.inTarget.el).width() * 2,
				rotate3d: "0, 1, 0, " + opt.inTarget.from,
				height: $(window).height() > $(opt.inTarget.el).height() ?
					$(opt.inTarget.el).height() : $(window).height(),
				overflow: "hidden",
				opacity: opt.animationFade ? 0 : 1
			};

			;
			$(opt.inTarget.el).css(this.inTargetCss);
			$(opt.outTarget.el).css(this.outTargetCss).transit({
				rotate3d: "0, 1, 0, " + opt.outTarget.to,
				opacity: opt.animationFade ? 0 : 1
			}, opt.outTarget.duration, opt.outTarget.timing, function () {
				opt.outTarget.done();

				$(opt.inTarget.el).transit({
					rotate3d: "0, 1, 0, " + opt.inTarget.to,
					opacity: 1
				}, opt.inTarget.duration, opt.inTarget.timing, function () {
					self.launcher._done();
				});
			});

		},

		// 회전 효과
		spin: function (opt) {
			// 회전 기본값
			var self = this,
				defaultValue = {
					inTarget: {
						from: "90deg",
						to: 0,
						duration: 550
					},
					outTarget: {
						from: 0,
						to: "-90deg",
						duration: 550
					}
				};
			// 뒤로가기시 반대 효과 좌표 값
			if (opt.isReverse) {
				defaultValue = {
					inTarget: {
						from: "-90deg",
						to: 0,
						duration: 550
					},
					outTarget: {
						from: 0,
						to: "90deg",
						duration: 550
					}
				};
			}
			// 기본값과 사용자 정의 값 병합
			opt = this.extend(defaultValue, opt);
			// 나가는 페이지 스타일 초기화 값
			this.outTargetCss = {
				position: "absolute",
				width: $(opt.outTarget.el).width(),
				perspective: $(opt.outTarget.el).width(),
				rotate3d: "0, 0, 0, " + opt.outTarget.from,
				height: $(window).height() > $(opt.inTarget.el).height() ?
					$(opt.inTarget.el).height() : $(window).height(),
				overflow: "hidden",
				scale: 1,
				opacity: 1
			};
			// 들어오는 페이지 스타일 초기화 값
			this.inTargetCss = {
				position: "absolute",
				width: $(opt.inTarget.el).width(),
				perspective: $(opt.inTarget.el).width(),
				rotate3d: "0, 0, 0, " + opt.inTarget.from,
				height: $(window).height() > $(opt.inTarget.el).height() ?
					$(opt.inTarget.el).height() : $(window).height(),
				overflow: "hidden",
				scale: 0,
				opacity: opt.animationFade ? 0 : 1
			};
			$(opt.inTarget.el).css(this.inTargetCss);
			$(opt.outTarget.el).css(this.outTargetCss).transit({
				rotate3d: "0, 0, 0, " + opt.outTarget.to,
				scale: 0,
				opacity: opt.animationFade ? 0 : 1
			}, opt.outTarget.duration, opt.outTarget.timing, function () {
				$(this).css({
					scale: 1
				});
				opt.outTarget.done();
				$(opt.inTarget.el).transit({
					rotate3d: "0, 0, 0, " + opt.inTarget.to,
					scale: 1,
					opacity: 1
				}, opt.inTarget.duration, opt.inTarget.timing, function () {
					self.launcher._done();
				});
			});
		},

		// 슬라이드 효과
		slide: function (opt) {
			// 슬라이드 기본 좌표 값
			var self = this,
				defaultValue = {
					inTarget: {
						from: "150%", // width 100%인 경우 UI 상 페이지가 붙는 상태로 보이는 문제를 위해 좌표 20% 증가
						to: "0",
						duration: 550
					},
					outTarget: {
						from: "0",
						to: '-150%',
						duration: 550
					}
				};

			// 뒤로가기시 슬라이드 반대 효과 좌표 값
			if (opt.isReverse) {
				defaultValue = {
					inTarget: {
						from: "-150%",
						to: "0",
						duration: 550
					},
					outTarget: {
						from: "0",
						to: '150%',
						duration: 550
					}
				};
			}

			window.scrollTo(0, 0);
			// 기본값과 사용자 정의 값 병합
			opt = this.extend(defaultValue, opt);

			// 나가는 페이지 스타일 초기화
			this.outTargetCss = {
				position: "absolute",
				width: $(window).width() > $(opt.outTarget.el).width() ?
					$(opt.outTarget.el).width() : $(window).width(),
				height: $(window).height() > $(opt.outTarget.el).height() ?
					$(opt.outTarget.el).height() : $(window).height(),
				transform: "translate(" + opt.outTarget.from + ",0)",
				opacity: 1
			};

			// 들어오는 페이지 스타일 초기화
			this.inTargetCss = {
				position: "absolute",
				width: $(window).width() > $(opt.inTarget.el).width() ?
					$(opt.inTarget.el).width() : $(window).width(),
				height: $(window).height() > $(opt.inTarget.el).height() ?
					$(opt.inTarget.el).height() : $(window).height(),
				transform: "translate(" + opt.inTarget.from + ",0)",
				opacity: 1
			};

			opt.inTarget.top = $(opt.inTarget.el).css("top");

			// 나가는 페이지 슬라이드
			$(opt.outTarget.el).css(this.outTargetCss).transit({
				x: opt.outTarget.to,
				opacity: opt.animationFade ? 0 : 1
			}, opt.outTarget.duration, opt.outTarget.timing, function () {
				opt.outTarget.done();
			});

			// 들어오는 페이지 슬라이드
			$(opt.inTarget.el).css(this.inTargetCss).transit({
				x: opt.inTarget.to
			}, opt.inTarget.duration, opt.inTarget.timing, function () {
				// 기본 좌표로 초기화
				$(opt.outTarget.el).css({
					transform: "translate(0,0)"
				});
				self.launcher._done();
			});

		},

		// 슬라이드 업 효과
		slideup: function (opt) {
			// 슬라이드 기본 좌표 값
			var self = this,
				defaultValue = {
					inTarget: {
						from: "100%",
						to: "0",
						duration: 550
					},
					outTarget: {
						from: "0",
						to: '-100%',
						duration: 550
					}
				};

			// 뒤로가기시 슬라이드 반대 효과 좌표 값
			if (opt.isReverse) {
				defaultValue = {
					inTarget: {
						from: "-100%",
						to: "0",
						duration: 550
					},
					outTarget: {
						from: "0",
						to: '100%',
						duration: 550
					}
				};
			}

			// 기본값과 사용자 정의 값 병합
			opt = this.extend(defaultValue, opt);

			// 나가는 페이지 스타일 초기화
			this.outTargetCss = {
				position: "absolute",
				width: $(opt.outTarget.el).width(),
				transform: "translate(0, " + opt.outTarget.from + ")",
				height: $(window).height() > $(opt.outTarget.el).height() ?
					$(opt.outTarget.el).height() : $(window).height(),
				opacity: 1
			};

			// 들어오는 페이지 스타일 초기화
			this.inTargetCss = {
				position: "absolute",
				width: $(opt.inTarget.el).width(),
				transform: "translate(0, " + opt.inTarget.from + ")",
				height: $(window).height() > $(opt.outTarget.el).height() ?
					$(opt.outTarget.el).height() : $(window).height(),
				opacity: 1
			};

			// 나가는 페이지 슬라이드
			$(opt.outTarget.el).css(this.outTargetCss).transit({
				y: opt.outTarget.to,
				opacity: opt.animationFade ? 0 : 1
			}, opt.outTarget.duration, opt.outTarget.timing, function () {
				$(this).css({
					transform: "translate(0,0)"
				});
				opt.outTarget.done();
			});

			// 들어오는 페이지 슬라이드
			$(opt.inTarget.el).css(this.inTargetCss).transit({
				y: opt.inTarget.to
			}, opt.inTarget.duration, opt.inTarget.timing, function () {
				self.launcher._done();
			});

		},

		// 슬라이드 다운 효과
		slidedown: function (opt) {
			// 슬라이드 기본 좌표 값
			var self = this,
				defaultValue = {
					inTarget: {
						from: "-100%",
						to: "0",
						duration: 550
					},
					outTarget: {
						from: "0",
						to: '100%',
						duration: 550
					}
				};

			// 뒤로가기시 슬라이드 반대 효과 좌표 값
			if (opt.isReverse) {
				defaultValue = {
					inTarget: {
						from: "100%",
						to: "0",
						duration: 550
					},
					outTarget: {
						from: "0",
						to: '-100%',
						duration: 550
					}
				};
			}

			// 기본값과 사용자 정의 값 병합
			opt = this.extend(defaultValue, opt);

			// 나가는 페이지 스타일 초기화
			this.outTargetCss = {
				position: "absolute",
				width: $(opt.outTarget.el).width(),
				transform: "translate(0, " + opt.outTarget.from + ")",
				opacity: 1
			};

			// 들어오는 페이지 스타일 초기화
			this.inTargetCss = {
				position: "absolute",
				width: $(opt.inTarget.el).width(),
				transform: "translate(0, " + opt.inTarget.from + ")",
				opacity: 1
			};

			// 나가는 페이지 슬라이드
			$(opt.outTarget.el).css(this.outTargetCss).transit({
				y: opt.outTarget.to,
				opacity: opt.animationFade ? 0 : 1
			}, opt.outTarget.duration, opt.outTarget.timing, function () {
				$(this).css({
					transform: "translate(0,0)"
				});
				opt.outTarget.done();
			});

			// 들어오는 페이지 슬라이드
			$(opt.inTarget.el).css(this.inTargetCss).transit({
				y: opt.inTarget.to
			}, opt.inTarget.duration, opt.inTarget.timing, function () {
				self.launcher._done();
			});

		},

		// 페이드 효과
		fade: function (opt) {
			// 페이드 기본 값
			var self = this,
				defaultValue = {
					inTarget: {
						duration: 250
					},
					outTarget: {
						duration: 250
					}
				};

			// 기본값과 사용자 정의 값 병합
			opt = this.extend(defaultValue, opt);

			// 나가는 페이지 스타일 초기화 값
			this.outTargetCss = {
				position: "absolute",
				width: $(opt.outTarget.el).width(),
				opacity: 1
			};

			// 들어오는 페이지 스타일 초기화 값
			this.inTargetCss = {
				position: "absolute",
				width: $(opt.inTarget.el).width(),
				opacity: opt.animationFade ? 0 : 1
			};

			// 페이지 스타일 초기화
			$(opt.inTarget.el).css(this.inTargetCss);
			$(opt.outTarget.el).css(this.outTargetCss).transit({
				opacity: opt.animationFade ? 0 : 1
			}, opt.outTarget.duration, opt.outTarget.timing, function () {
				opt.outTarget.done();
				$(opt.inTarget.el).transit({
					opacity: 1
				}, opt.inTarget.duration, opt.inTarget.timing, function () {
					self.launcher._done();
				});
			});
		},

		// 팝 효과
		pop: function (opt) {
			// 회전 기본 값
			var self = this,
				defaultValue = {
					inTarget: {
						duration: 350
					},
					outTarget: {
						from: 0,
						duration: 350
					}
				};

			// 기본값과 사용자 정의 값 병합
			opt = this.extend(defaultValue, opt);

			// 나가는 페이지 스타일 초기화 값
			this.outTargetCss = {
				position: "absolute",
				width: $(opt.outTarget.el).width(),
				scale: 1,
				opacity: 1,
				perspective: $(opt.outTarget.el).width(),
				rotate3d: "0, 0, 0, 0",
				overflow: "hidden"
			};

			// 들어오는 페이지 스타일 초기화 값
			this.inTargetCss = {
				position: "absolute",
				width: $(opt.inTarget.el).width(),
				scale: 0.5,
				opacity: opt.animationFade ? 0 : 1,
				perspective: $(opt.outTarget.el).width(),
				rotate3d: "0, 0, 0, 0",
				overflow: "hidden"
			};

			$(opt.inTarget.el).css(this.inTargetCss);
			$(opt.outTarget.el).css(this.outTargetCss).transit({
				scale: 0.5,
				opacity: opt.animationFade ? 0 : 1
			}, opt.outTarget.duration, opt.outTarget.timing, function () {
				$(this).css({
					scale: 1
				});
				opt.outTarget.done();

				$(opt.inTarget.el).transit({
					scale: 1,
					opacity: 1
				}, opt.inTarget.duration, opt.inTarget.timing, function () {
					self.launcher._done();
				});
			});
		},

		// 전환 효과
		turn: function (opt) {
			// 회전 기본 값
			var self = this,
				defaultValue = {
					inTarget: {
						from: "90deg",
						to: 0,
						duration: 350
					},
					outTarget: {
						from: 0,
						to: "-90deg",
						duration: 150
					}
				};

			// 뒤로가기시 반대 효과 좌표 값
			if (opt.isReverse) {
				defaultValue = {
					inTarget: {
						from: "-90deg",
						to: 0,
						duration: 350
					},
					outTarget: {
						from: 0,
						to: "90deg",
						duration: 150
					}
				};
			}

			// 기본값과 사용자 정의 값 병합
			opt = this.extend(defaultValue, opt);

			// 나가는 페이지 스타일 초기화 값
			this.outTargetCss = {
				position: "absolute",
				width: $(opt.outTarget.el).width(),
				perspective: $(opt.outTarget.el).width(),
				rotate3d: "0, 1, 0, " + opt.outTarget.from,
				transformOrigin: "0 0",
				opacity: 1,
				height: $(window).height() > $(opt.outTarget.el).height() ?
					$(opt.outTarget.el).height() : $(window).height(),
				overflow: "hidden"
			};

			// 들어오는 페이지 스타일 초기화 값
			this.inTargetCss = {
				position: "absolute",
				width: $(opt.inTarget.el).width(),
				perspective: $(opt.inTarget.el).width(),
				rotate3d: "0, 1, 0, " + opt.inTarget.from,
				transformOrigin: "0 0",
				opacity: opt.animationFade ? 0 : 1,
				height: $(window).height() > $(opt.outTarget.el).height() ?
					$(opt.outTarget.el).height() : $(window).height(),
				overflow: "hidden"
			};

			$(opt.inTarget.el).css(this.inTargetCss);
			$(opt.outTarget.el).css(this.outTargetCss).transit({
				rotate3d: "0, 1, 0, " + opt.outTarget.to,
				opacity: opt.animationFade ? 0 : 1
			}, opt.outTarget.duration, opt.outTarget.timing, function () {
				opt.outTarget.done();

				$(opt.inTarget.el).transit({
					rotate3d: "0, 1, 0, " + opt.inTarget.to,
					opacity: 1
				}, opt.inTarget.duration, opt.inTarget.timing, function () {
					self.launcher._done();
				});
			});
		}

	}
})(jQuery, window);