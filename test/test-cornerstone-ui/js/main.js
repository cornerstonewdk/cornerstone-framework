(function ($, window, document, undefined) {

	$(function () {
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
		}).on("click.smoothscroll", function (e) {
				if ($(e.target).closest(".dropdown-menu").length) {
					$(".navbar-toggle").trigger("click");
				}
			});

		// 툴팁 Data API
		$("[data-toggle=tooltip]").tooltip();
		$("[data-toggle=popover]").popover();

		//
		// RangeInput 플러그인
		// --------------------------------------------------
		$("#range3").rangeinput({"inputShow": true});

		//
		// Sign 플러그인
		// --------------------------------------------------
		$("#signature").sign();

		// 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
		$("button.show-sign").on('click', function (e) {
			var data = $("#signature").sign("getData", "image"); // Base64 형태의 이미지 데이터 리턴
			$("div.widget-sign-viewer").html($("<img/>", {
				src: "data:" + data
			}));
			console.log(data);
		});

		// 초기화
		$("button.reset-sign").on('click', function (e) {
			$("#signature").sign("reset"); // 초기화
			$(".widget-sign-viewer img").remove();
		});

		//
		// Spinner 플러그인
		// --------------------------------------------------
		$("[data-plugin='spinner']").on("click", function (e) {
			e.preventDefault();
			var target = $(this).data("spinnerTarget");
			window.setTimeout(function () {
				$(target).spinner("hide");
			}, 3000);
		});

		//
		// Motion Captcha 플러그인
		// --------------------------------------------------
		$("#motion-captcha button").on("click", function (e) {
			$("#mc-canvas").remove();
			$("<canvas/>", {
				"id": "mc-canvas",
				"class": "mc-canvas"
			}).appendTo($("#motion-captcha-example")).motioncaptcha({
					errorMsg: '다시 시도해주세요.',
					successMsg: '성공',
					onSuccess: function () {
						console.log("성공");
					}
				});
		});
		$("#motion-captcha button").trigger("click");

		//
		// Date Picker 플러그인
		// --------------------------------------------------
		$('#date-picker1, #date-picker2').datepicker({
			language: "kr",
			firstDisable: true,
			changeDisplay: true
		});


		$('#footer').affix();
	});
})(jQuery, window, document);