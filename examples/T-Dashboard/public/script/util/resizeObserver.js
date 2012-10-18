(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        define(function (require, exports, module) {
            var $ = require("jquery");

            exports.resize = factory(root, doc, $, exports);
        });
    } else {
        alert('이 모듈은 AMD 방식에서만 사용 가능합니다.');
        return null;
    }
}(window, document, function (window, document, $, exports) {
	function ResizeObserver(){
		this.className = 'ResizeObserver';
		this.listener = {};
		this.screenState = '';
	};
	
	ResizeObserver.prototype.addListener = function(selector, callback) {
		if ($(selector).length == 0) return;
		
		this.listener[selector] = callback;
		console.log('ResizeObserver - added listener[' + selector + ']');
		callback(this.screenState);
	};
	
	ResizeObserver.prototype.getListener = function() {
		return this.listener;
	};
	
	ResizeObserver.prototype.resizeOccurred = function(state) {
		this.screenState = state;
		
		for(var selector in this.listener) {
			if($(selector).length == 0) {
				console.log('ResizeObserver - removed listener[' + selector + ']');
				delete this.listener[selector];
				continue;
			}
			
			this.listener[selector](state);
		}
	};
	
	ResizeObserver.prototype.listen = function() {
		var self = this;
		
		enquire.register("screen and (min-width:1200px)", {
			match: function() {
				// console.log('Large desktop');
				self.resizeOccurred('desktop');
			},
		}).register("screen and (min-width:768px) and (max-width:979px)", {
			match: function() {
				// console.log('Portrait tablet to landscape and desktop');
				self.resizeOccurred('tablet');
			},
		}).register("screen and (min-width:481px) and (max-width:767px)", {
			match: function() {
				// console.log('Landscape phone to portrait tablet');
				self.resizeOccurred('phone');
			},
		}).register("screen and (max-width:480px)", {
			match: function() {
				// console.log('Landscape phone and down');
				self.resizeOccurred('phone');
			},
		}).listen(5);
	};
	
	return new ResizeObserver();
	
}));