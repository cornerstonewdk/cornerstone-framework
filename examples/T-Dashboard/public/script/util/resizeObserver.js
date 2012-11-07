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
	
	ResizeObserver.prototype.removeListener = function(selector) {
		delete this.listener[selector];
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
		
		// enquire.register("screen and (min-width:1200px)", {
			// match: function() {
				// self.resizeOccurred('desktop-l');
			// },
		// }).register("screen and (min-width:768px) and (max-width:979px)", {
			// match: function() {
				// self.resizeOccurred('tablet');
			// },
		// }).register("screen and (max-width:767px)", {
			// match: function() {
				// self.resizeOccurred('phone-l');
			// },
		// }).listen(5);
		
		// enquire.register("screen and (min-width:1200px)", {
			// match: function() {
				// self.resizeOccurred('desktopL-l');
			// },
		// }).register("screen and (min-width:978px) and (max-width:1199px)", {
			// match: function() {
				// self.resizeOccurred('desktop-s');
			// },
		// }).register("screen and (min-width:768px) and (max-width:979px)", {
			// match: function() {
				// self.resizeOccurred('tablet');
			// },
		// }).register("screen and (min-width:481px) and (max-width:767px)", {
			// match: function() {
				// self.resizeOccurred('phone-l');
			// },
		// }).register("screen and (max-width:480px)", {
			// match: function() {
				// self.resizeOccurred('phone-s');
			// },
		// }).listen(5);
		
		enquire.register("screen and (min-width:1200px)", {
			match: function() {
				self.resizeOccurred('desktopL-l');
			},
		}).register("screen and (min-width:978px) and (max-width:1199px)", {
			match: function() {
				self.resizeOccurred('desktop-s');
			},
		}).register("screen and (min-width:768px) and (max-width:979px)", {
			match: function() {
				self.resizeOccurred('tablet');
			},
		}).register("screen and (min-width:481px) and (max-width:767px)", {
			match: function() {
				self.resizeOccurred('phone-l');
			},
		}).register("screen and (max-width:480px)", {
			match: function() {
				self.resizeOccurred('phone-s');
			},
		}).listen(5);
	};
	
	return new ResizeObserver();
	
}));