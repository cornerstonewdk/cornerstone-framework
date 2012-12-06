// 데이터픽커
$('.datepicker').datepicker({
    language:"ko",
    firstDisable: true,
    changeDisplay: true
});

$("#range3").rangeinput({"inputShow":true});
// 싸인
$("#signature").sign();

// 모션캡차
$("#form-motion-capcha").motioncaptcha();

$("[data-plugin='spinner']").on("click", function (e) {
    var self = this;
    var target = $(this).data("spinnerTarget");
    window.setTimeout(function () {
        $(target).spinner("hide");
    }, 30000);
});

// 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
$("button.show-sign").on('click', function (e) {
    var data = $("#signature").sign("getData", "image");
    $("div.widget-sign-viewer").html($("<img/>", {
        src:"data:" + data
    }));
    $("a.download-sign").attr({
        href:"data:" + data
    });
    console.log(data);
});

$("button.reset-sign").on('click', function (e) {
    $("#signature").sign("reset");
    $(".widget-sign-viewer img").remove();
    $("a.download-sign").attr({
        href:"#"
    });
});

$("a.download-sign").bind("click", function (e) {
    var href = $(this).attr("href");
    if (typeof href === "string" && href === "#") {
        alert("이미지 보기 후 다운로드해주세요.");
        e.preventDefault();
    }
});

$("#tooltip a").on("click", function (e) {
    e.preventDefault();
});
