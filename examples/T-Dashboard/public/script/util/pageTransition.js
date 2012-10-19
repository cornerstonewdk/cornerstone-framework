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
	};
	
	PageTransition.prototype.transition = function(direction, View) {
		//트렌지션 사용시 아래 두줄 제거 후 사용 위에 require 도 주석 풀어줘야함
		// View.render();
		// return;
		
		switch (direction) {
			case '=':
				var self = this;
				
				this.prevId = 'default';
				this.currentId = this.makeUuid();
				$('div#contentsView').append('<div id="' + this.currentId + '"></div>');
				
				View['el'] = $('div#' + this.currentId);
				View.render();
				$('div#' + this.currentId).hide();
				
				Transition.launcher({
					transitionType:"slide",
					inTarget: {
						id: '#' + this.currentId
					},
					outTarget: {
						id: '#' + this.prevId
					},
					isReverse: false,
					done: function() {
						$('div#' + self.prevId).remove();
					}
				});
				
				break;
			case '>':
				var self = this;

				this.prevId = this.currentId;
				this.currentId = this.makeUuid();
				$('div#contentsView').append('<div id="' + this.currentId + '"></div>');
				
				View['el'] = $('div#' + this.currentId);
				View.render();
				$('div#' + this.currentId).hide();
				
				Transition.launcher({
					transitionType:"slide",
					inTarget: {
						id: '#' + this.currentId
					},
					outTarget: {
						id: '#' + this.prevId
					},
					isReverse: false,
					done: function() {
						$('div#' + self.prevId).remove();
					}
				});
				
				break;
			case '<':
				var self = this;
				
				this.prevId = this.currentId;
				this.currentId = this.makeUuid();
				$('div#contentsView').append('<div id="' + this.currentId + '"></div>');
				
				View['el'] = $('div#' + this.currentId);
				View.render();
				$('div#' + this.currentId).hide();
				
				Transition.launcher({
					transitionType:"slide",
					inTarget: {
						id: '#' + this.currentId
					},
					outTarget: {
						id: '#' + this.prevId
					},
					isReverse: true,
					done: function() {
						$('div#' + self.prevId).remove();
					}
				});
				
				break;
		}
		
		
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
	

	PageTransition.prototype.wait = function(msecs) {
		var start = new Date().getTime();
		var cur = start;
		while (cur - start < msecs) {
			cur = new Date().getTime();
		}
	};

	
	return new PageTransition();
	
}));