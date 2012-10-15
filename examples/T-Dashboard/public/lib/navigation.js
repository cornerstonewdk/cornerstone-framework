(function (root, doc, factory) {
    var moduleName = "navigation";

    // requirejs가 존재하고 amd 방식 호출인 경우
    if (typeof define === "function" && define.amd) {
        // 정의된 코드를 moduleName에 정외한 네임으로 모듈 등록을 한다.
        // 아래 define은 AMD Hybrid Format 방식으로 exports를 사용해서 외부에서 해당 모듈에 exports(public)로 내부 함수를 실행 할 수
        // 있도록 구현함.
        
        define(moduleName, function (require, exports, module) {
            var $ = require("jquery");
// 
			// console.log(module);
// 			
            // exports.test2 = function () {
                // console.log("exports test");
            // };

            // exports.plugin = factory(root, doc, moduleName, $, exports);
            
         	return factory(root, doc, moduleName, $, exports);
        });
    } else {
        factory(root, doc, moduleName, root.jQuery);
    }
}(window, document, function (window, document, moduleName, $, exports) {
	var NavigationController = function() {
	};
	
	NavigationController.prototype.test = function() {
		console.log('test');
	};
	
	return NavigationController;
	
}));