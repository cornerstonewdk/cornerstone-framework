(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        define(function (require, exports, module) {
            var $ = require("jquery");
            var Transition = require("transition");

            exports.page = factory(root, doc, $, exports);
        });
    } else {
        alert('이 모듈은 AMD 방식에서만 사용 가능합니다.');
        return null;
    }
}(window, document, function (window, document, $, exports) {
	/**
	 * 브레드 크럼에서 받은 방향정보를 이용하여 두개의 화면을 자동으로 관리하여 트렌지션 효과를 준다.
	 */
	function PageTransition(){
		this.className = 'PageTransition';
		this.currentId = '';
		this.prevId = '';
		this.prevView = null;
	};
	
	/*
	 * 기존 뷰와 새로 들어오는 뷰 객체를 이용하여 트렌지션 효과를 나타내 준다.
	 * @direction : 방향 >, <, | 이렇게 있다.
	 * View : Backbone.View를 상속받은 객체
	 * 부가 효과로 viewDidAppear, viewDidDisappear 메서드를 가지고 있다면 적절한 시점에서 호줄해준다. 없으면 무시
	 * viewDidAppear : 화면에 표시되고 난 후 호출 (화면이 그려지고 난 후에 처리할 게 있다면 여기서 처리)
	 * viewDidDisappear : 화면이 사라지고 난 후 호출 (화면이 사라지고 난 후 처리할 게 있다면 여기서 처리)
	 */
	PageTransition.prototype.transition = function(direction, View) {
		if(direction == '-') return;
		
		switch (direction) {
			case '|':
				var self = this;
				
				this.prevId = 'default';
				this.currentId = this.makeUuid();
				$('div#contentsView').append('<div id="' + this.currentId + '"></div>');
				
				View['el'] = $('div#' + this.currentId);
				View.render();
				$('div#' + this.currentId).hide();
				
				Transition.launcher({
					transitionType:"flip",
					inTarget: {
						el: '#' + this.currentId
					},
					outTarget: {
						el: '#' + this.prevId
					},
					isReverse: false,
					done: function() {
						$('div#' + self.prevId).remove();
						if(typeof(View['viewDidAppear']) != 'undefined') View['viewDidAppear']();
					}
				});
				
				break;
			case '>':
				var self = this;
				
				if(this.prevView != null && typeof(this.prevView['viewDidDisappear']) != 'undefined') {
					this.prevView['viewDidDisappear']();
				}

				this.prevId = this.currentId;
				this.currentId = this.makeUuid();
				$('div#contentsView').append('<div id="' + this.currentId + '"></div>');
				
				View['el'] = $('div#' + this.currentId);
				View.render();
				$('div#' + this.currentId).hide();
				
				Transition.launcher({
					transitionType:"slide",
					inTarget: {
						el: '#' + this.currentId
					},
					outTarget: {
						el: '#' + this.prevId
					},
					isReverse: false,
					done: function() {
						$('div#' + self.prevId).remove();
						if(typeof(View['viewDidAppear']) != 'undefined') View['viewDidAppear']();
					}
				});
				
				break;
			case '<':
				var self = this;
				
				this.prevId = this.currentId;
				this.currentId = this.makeUuid();
				$('div#contentsView').append('<div id="' + this.currentId + '"></div>');
				
				if(this.prevView != null && typeof(this.prevView['viewDidDisappear']) != 'undefined') {
					this.prevView['viewDidDisappear']();
				}

				View['el'] = $('div#' + this.currentId);
				View.render();
				$('div#' + this.currentId).hide();
				
				Transition.launcher({
					transitionType:"slide",
					inTarget: {
						el: '#' + this.currentId
					},
					outTarget: {
						el: '#' + this.prevId
					},
					isReverse: true,
					done: function() {
						$('div#' + self.prevId).remove();
						if(typeof(View['viewDidAppear']) != 'undefined') View['viewDidAppear']();
					}
				});
				
				break;
		}
		
		this.prevView = View;
	};
	
	/*
	 * 아이디를 UUID를 생성하며 DIV를 관리 한다.
	 */
	PageTransition.prototype.makeUuid = function() {
		var chars = '0123456789abcdef'.split('');
	
		var uuid = [], rnd = Math.random, r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4'; // version 4
	
		for (var i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | rnd()*16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
			}
		}
	
		return uuid.join('');
	};
	
	return new PageTransition();
	
}));