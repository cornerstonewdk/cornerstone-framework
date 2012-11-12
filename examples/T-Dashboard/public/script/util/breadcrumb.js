(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        define(function (require, exports, module) {
            var $ = require("jquery");

            exports.manager = factory(root, doc, $, exports);
        });
    } else {
        alert('이 모듈은 AMD 방식에서만 사용 가능합니다.');
        return null;
    }
}(window, document, function (window, document, $, exports) {
	function BreadcrumbManager(){
		this.el = $('ul.breadcrumb');
		this.className = 'Breadcrumb';
		this.itemList = new Array();
		this.prevRoute = null;
	};
	
	BreadcrumbManager.prototype.route = function(route, title) {
		var alreadyRoute = false;
		var sameIdx = 0;
		var isRoot = this.itemList.length == 0 ? true : false;
		
		if(this.prevRoute != null) {
			if(this.prevRoute == route) {
				this.prevRoute = route;
				return '|';	
			}
		}
		
		this.prevRoute = route;
		
		for(var i = 0; i < this.itemList.length; i++) {
			var item = this.itemList[i];
			
			if(item['route'] == route) {
				alreadyRoute = true;
				sameIdx = i;
			}
		}
		
		//첫번째가 만약 index 가 안들어왔다면 브레드크럼 히스토리 보정
		if(isRoot) {
			switch(route) {
				case 'index':
					break;
				case 'lteReport':
				case 'pricePlan':
				case 'voc':
					this.itemList.push({'route': 'index', 'title': 'T-Dashboard'});
					break;
				case 'makePricePlan':
					this.itemList.push({'route': 'index', 'title': 'T-Dashboard'});
					this.itemList.push({'route': 'pricePlan', 'title': '정책'});
					break;
			}
		}
		
		//히스토리 확인하여 기존것이 있는지 체크 한 후에 방향 및 히스토리 정리
		if(!alreadyRoute) {
			this.itemList.push({'route': route, 'title': title});
			this.draw();
			
			return isRoot ? "|" : ">";
		} else {
			for(var i = sameIdx + 1; i < this.itemList.length; i++) {
				 this.itemList.pop();
				 i--;
			}
			
			this.draw();
			
			return "<";
		}
	};
	
	/*
	 * 브레드크럼 히스토리 포함하여 그려주기
	 */
	BreadcrumbManager.prototype.draw = function() {
		this.el.children().remove();
		
		for(var i = 0; i < this.itemList.length; i++) {
			var item = this.itemList[i];
			this.el.append('<li><a href="#' + item['route'] + '">' + item['title'] + '</a>' + (i == (this.itemList.length - 1) ? '' : '<span class="divider">/</span>') + '</li>');	
		}
		
		$('ul.breadcrumb > li:last-child > a').addClass('active');
	};
	
	return new BreadcrumbManager();
	
}));