/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : plugin-cornerstone.js
 *  Description: 이 플러그인은 부트스트랩 플러그인들 중 코너스톤에 필요한 기능들을 추가한 플러그인이다.
 *  Author: 김우섭
 *  License :
 */

(function () {
	var HAS_TOUCH = ('ontouchstart' in window);

	/*
	 Alert 기능 확장 : Close할때 마크업 삭제가 아닌 display none/block 처리 추가
	 */
	this.Alert = (function () {
		var Alert = $.fn.alert.Constructor;

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
		var Carousel = $.fn.carousel.Constructor;

		Carousel.prototype.activeSwipe = function () {
			var self = this;
			var $target = this.$element.swipe();
			$(document).on("swipeLeft.cs.carousel", '[data-carousel="swipe"]',
				function (e, swipeEventObj) {
					if (!self.isActive) {
						self.pause();
						self.slide("next");
						self.isActive = true;
					}
				}).on("swipeRight.cs.carousel", '[data-carousel="swipe"]',
				function (e, swipeEventObj) {
					if (!self.isActive) {
						self.pause();
						self.slide("prev");
						self.isActive = true;
					}
				});

			$(document).on("slide.cs.carousel", '[data-carousel="swipe"]',
				function () {
					return self.isActive = true;
				}).on("slid.cs.carousel", '[data-carousel="swipe"]', function () {
					self.isActive = false;
				});
		};

		$.fn.carousel.Constructor = Carousel;

		/**
		 * 터치기반인 경우 Swipe 활성화
		 */
		$(function () {
			$('[data-carousel="swipe"]').carousel("activeSwipe");
			$(".carousel-indicators > li").on("click", function (e) {
				console.log(e);
			});
		});

		return Carousel;

	})();

	/*
	 Popover : DATA-API 방식을 추가함.
	 */
	this.Popover = (function () {
		var Popover = $.fn.popover.Constructor;

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
		var Tooltip = $.fn.tooltip.Constructor;

		/* 확장 코딩 */

		$.fn.tooltip.Constructor = Tooltip;

		/*
		 DATA API 기능 추가 예정
		 */
		$(function () {
			$('[data-toggle="tooltip"]').tooltip({
				selector: "[rel=tooltip]"
			});
		});
	})();

	/**
	 * Collapse
	 */
	var Collapse = $.fn.collapse.Constructor;

	// 터치기반에 최적화된 Show 함수
	if (HAS_TOUCH) {
		Collapse.prototype.toggle = function () {
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

	if (HAS_TOUCH) {
		$(function () {
			$(".dropdown-menu li").on("touchstart", function (e) {
				$(this).find("a").trigger("click");
				return false;
			});
		});
	}

}).call(this);
