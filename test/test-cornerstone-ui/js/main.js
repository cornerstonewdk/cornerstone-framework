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
				$baseStyle.after('<link id="customStyle" rel="stylesheet" href="../../grunt-dist/src/theme/' + currentValue + '/cornerstone.css"/>');
			} else {
				$baseStyle.attr("href", "../../grunt-dist/src/skin/" + currentValue + "/" + currentValue + ".css");
			}
		});

		// 컴포넌트 요소 이동
		$("#nav-component a").smoothScroll({
			offset: -50
		});

		// 툴팁 Data API
		$("[data-toggle=tooltip]").tooltip();
		$("[data-toggle=popover]").popover();

		// 버튼 터치 기반인 경우 버그픽스
		$('body').on('click', '[data-toggle^=button]', function(e) {
			var btn = $(e.target);
			if (btn.hasClass('btn')) {
			}
		});

		//
		// RangeInput 플러그인
		// --------------------------------------------------
		$("#range3").rangeinput({"inputShow": true});

		//
		// Sign 플러그인
		// --------------------------------------------------
		$("#signature").length && $("#signature").sign();

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
		$('#date-picker1, #date-picker2').length && $('#date-picker1, #date-picker2').datepicker({
			language: "kr",
			firstDisable: true,
			changeDisplay: true
		});

		//
		// 스크롤뷰 피처드
		// --------------------------------------------------
		$("#scrollView1").length && $("#scrollView1").featuredScrollView();

		var generatedCount = 0;
		$("#scrollView1").length && $("#scrollView2").featuredScrollView({
			pullDownID: "pullDown",
			pullUpID: "pullUp",
			pullDownAction: function () {
				// 일반적으로 pullDown은 새로고침 액션으로 이용된다.
				setTimeout(function () {
					$("#scrollView2").featuredScrollView("refresh");
				}, 500);
			},
			pullUpAction: function () {
				// ajax로 데이터바인딩이 완료될때 꼭 스크롤뷰 새로고침이 필요함.
				setTimeout(function () {
					// 임시 엘리먼트를 추가한다.
					var $el, li, i;
					$el = $("#scrollView2 .list-group");
					for (i = 0; i < 10; i++) {
						li = document.createElement('li');
						$("<li/>", {
							"class": "list-group-item"
						}).html(
								'<span class="glyphicon glyphicon-chevron-right"></span>'
									+ '<span class="badge">' + Math.round((Math.random() * 10) + 1) + '</span>'
									+ '신규 레코드 ' + (++generatedCount)
							).appendTo($el);
					}
					$("#scrollView2").featuredScrollView("refresh");
				}, 300);
			}
		});

		//
		// 리스트뷰 피처드
		// --------------------------------------------------
		var $el = $('#listView');
		var isLoading = false;
		var html;

		// ID가 listView이 엘리먼트에 ListView 피쳐드 적용
		$el.length && $el.featuredListView({
			optimization: true,
			spinner: "#endless-loader"
		});

		// AJAX로 데이터를 가져오는 함수
		function getItem() {
			if (isLoading) {
				return false;
			}

			isLoading = true;

			var request = $.ajax({
				url: "data/sample-list.json",
				type: "GET",
				dataType: "json"
			});

			request.done(function (json) {
				html = '<ul class="list-group">';
				if (typeof json === "object" && json.items.length > 0) {
					$(json.items).each(function (i) {
						html += '<li class="list-group-item">';
						html += '	<span class="glyphicon glyphicon-chevron-right"></span>';
						html += '	<span class="badge">' + this.published + '</span>';
						html += this.title;
						html += '</li>';
					});
					html += "</ul>";
					$el.featuredListView("addItem", html);
				}
				html = "";
				isLoading = false;
			});

			request.fail(function (jqXHR, textStatus) {
				console.log("Request failed: " + textStatus);
				isLoading = false;
			});

		}

		// 아이템 추가
		$("#addItem").on("click", function (e) {
			getItem();
		});

		$("#editorExample").length && $("#editorExample").featuredEditor();

		$('#footer').affix();

		MBP.scaleFix();
		MBP.hideUrlBar();
	});
})(jQuery, window, document);