(function ($, window, document, undefined) {

	$(function() {
		// 설정되지 않은 링크 기능 방지
		$("a[href='#'], [type='submit']").on("click", function (e) {
			e.preventDefault();
		});

		// 테마, 스킨 변경 제어
		$("#changeStyle").on("change", function () {
			var $baseStyle = $("#baseStyle");
			var $customStyle = $("#customStyle");
			var currentValue = $(this).val();
			var currentType = $(this).find("option:checked").data("style-type");
			$customStyle.remove();
			if (currentType === "theme") {
				$baseStyle.attr("href", "../../grunt-dist/lib/bootstrap/css/bootstrap.css");
				$baseStyle.after('<link id="customStyle" rel="stylesheet" href="../../grunt-dist/ui/theme/' + currentValue + '/cornerstone.css"/>');
			} else {
				$baseStyle.attr("href", "../../grunt-dist/ui/skin/" + currentValue + "/" + currentValue + ".css");
			}
		});

		// 컴포넌트 요소 이동
		$("#nav-component a").smoothScroll({
			offset: -50
		});

		// 툴팁 Data API
		$("[data-toggle=tooltip]").tooltip();
		$("[data-toggle=popover]").popover();

		// RangeInput 스크립트로 적응
		$("#range3").rangeinput({"inputShow": true});

		//
		// Sign 플러그인
		// --------------------------------------------------
		$("#signature").sign();

		// 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
		$("button.show-sign").on('click', function (e) {
			var data = $("#signature").sign("getData", "image"); // Base64 형태의 이미지 데이터 리턴
			$("div.widget-sign-viewer").html($("<img/>", {
				src:"data:" + data
			}));
			console.log(data);
		});

		// 초기화
		$("button.reset-sign").on('click', function (e) {
			$("#signature").sign("reset"); // 초기화
			$(".widget-sign-viewer img").remove();
		});


		$('#footer').affix();
	});
})(jQuery, window, document);