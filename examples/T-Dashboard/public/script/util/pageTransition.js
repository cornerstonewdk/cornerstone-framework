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
	function PageTransition(){
		this.className = 'PageTransition';
		this.currentId = '';
		this.prevId = '';
		this.prevView = null;
	};
	
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