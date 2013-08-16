/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-scrollview.js
 *  Description: 스크롤뷰는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD Hybrid 포맷
		define(["backbone", "underscore", "jquery"], function (Backbone, _, $) {
			factory($, root, doc);
			return Backbone.view.extend({
				render: function () {
					this.$el.featuredScrollView(this.options);
					return this;
				}
			});
		});
	} else {
		// Browser globals
		factory(root.jQuery, root, doc);
	}
}(this, document, function ($, window, document) {

	var pluginName = "featuredScrollView",
		myScroll, pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset;


	var Plugin = function (element, options) {
		this.defaultOptions = {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
			formFields: undefined,
			pullDownID: undefined,
			pullUpID: undefined,
			pullDownAction: undefined,
			pullUpAction: undefined
		};
		this.options = options = $.extend(true, this.defaultOptions, options);
		this.$el = $(element);

		this.formCheck();
		this.pullToRefresh();

		this.iscroll = new IScroll(this.$el[0], options);
		return this;
	};

	Plugin.prototype.refresh = function () {
		this.iscroll.refresh();
	};

	// 폼 엘리먼트인 경우 드래그로 입력박스 터치불가한 문제를 해결
	Plugin.prototype.formCheck = function () {
		if (!(!$.isEmptyObject(this.options) && $.isArray(this.options.formFields) && this.options.formFields.length > 0)) {
			return false;
		}
		var self = this;
		// 폼 엘리먼트인 경우 드래그 이벤트를 무시하도록 하기 위한 예외처리
		var onBeforeScrollStart = function (e) {
			var target = e.target;
			var isNotField = true;
			while (target.nodeType != 1) target = target.parentNode;

			// 배열로 예외처리할 폼 엘리먼트를 tagName과 비교한다.
			$.grep(self.options.formFields, function (n, i) {
				isNotField = isNotField && target.tagName != n;
			});

			if (isNotField)
				e.preventDefault();
		};
		this.defaultOptions.onBeforeScrollStart = onBeforeScrollStart;
	};

	// Pull to refresh
	Plugin.prototype.pullToRefresh = function () {
		if (!(this.options != null
			&& (typeof this.options.pullUpAction === "function"
			|| typeof this.options.pullDownAction === "function"))) {
			return false;
		}

		var self = this;
		pullDownEl = self.$el.find('[data-featured-scrollview="pullDown"]');
		pullDownOffset = pullDownEl && pullDownEl[0].offsetHeight;
		pullUpEl = self.$el.find('[data-featured-scrollview="pullUp"]');
		pullUpOffset = pullUpEl && pullUpEl[0].offsetHeight;

		var topOffset = pullDownOffset;
		var onRefresh = function () {
			pullDownEl = self.$el.find('[data-featured-scrollview="pullDown"]');
			pullDownOffset = pullDownEl && pullDownEl[0].offsetHeight;
			pullUpEl = self.$el.find('[data-featured-scrollview="pullUp"]');
			pullUpOffset = pullUpEl && pullUpEl[0].offsetHeight;
			if (pullDownEl && pullDownEl.attr("class").match('loading')) {
				pullDownEl.removeClass("flip loading");
			} else if (pullUpEl && pullUpEl.attr("class").match('loading')) {
				pullUpEl.removeClass("flip loading");
			}
		};

		var onScrollMove = function () {
			pullDownEl = self.$el.find('[data-featured-scrollview="pullDown"]');
			pullDownOffset = pullDownEl && pullDownEl[0].offsetHeight;
			pullUpEl = self.$el.find('[data-featured-scrollview="pullUp"]');
			pullUpOffset = pullUpEl && pullUpEl[0].offsetHeight;
			if (this.y > 5 && pullDownEl && !pullDownEl.attr("class").match('flip')) {
				pullDownEl.addClass("flip");
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl && pullDownEl.attr("class").match('flip')) {
				pullDownEl.removeClass("flip loading");
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && pullUpEl && !pullUpEl.attr("class").match('flip')) {
				pullUpEl.addClass("flip");
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl && pullUpEl.attr("class").match('flip')) {
				pullUpEl.removeClass("flip loading");
				this.maxScrollY = pullUpOffset;
			}
		};
		var onScrollEnd = function () {
            console.log(3);
			pullDownEl = self.$el.find('[data-featured-scrollview="pullDown"]');
			pullDownOffset = pullDownEl && pullDownEl[0].offsetHeight;
			pullUpEl = self.$el.find('[data-featured-scrollview="pullUp"]');
			pullUpOffset = pullUpEl && pullUpEl[0].offsetHeight;
			if (pullDownEl && pullDownEl.attr("class").match('flip')) {
				pullDownEl.addClass("loading");
				self.options.pullDownAction();
			} else if (pullDownEl && pullUpEl.attr("class").match('flip')) {
				pullUpEl.addClass("loading");
				self.options.pullUpAction();
			}
		};

		this.defaultOptions.topOffset = topOffset;
		this.defaultOptions.onRefresh = onRefresh;
		this.defaultOptions.onScrollMove = onScrollMove;
		this.defaultOptions.onScrollEnd = onScrollEnd;
	};

	// 스크롤뷰 플러그인 랩핑 및 기본값 설정
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data(pluginName);

			// 초기 실행된 경우 플러그인을 해당 엘리먼트에 data 등록
			if (!data) {
				$this.data(pluginName, (data = new Plugin(this, options)))
			}

			// 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
			if (typeof options == 'string') {
				data[options](data.options);
			}
		});
	};

	$(function () {
		/**
		 * DATA API (HTML5 Data Attribute)
		 */
		$("[data-featured=scrollView]").each(function (i) {
			$(this)[pluginName]();
		});
	});
}));