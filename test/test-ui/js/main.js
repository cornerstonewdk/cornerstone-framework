<<<<<<< HEAD
$(function() {
    // 데이터픽커
    var HAS_TOUCH = ('ontouchstart' in window);
    if(!HAS_TOUCH) {
        $('.datepicker').datepicker({
            language: "ko"
        });
    } else {
        $('.datepicker').each(function() {

        });
    }
=======
// 데이터픽커
$('.datepicker').datepicker({
    language:"ko",
    firstDisable: true,
    changeDisplay: true
});

>>>>>>> test

// 싸인
    $("#signature").sign();

// 모션캡차
    $("#form-motion-capcha").motioncaptcha();

    $("[data-plugin='spinner']").on("click", function(e) {
        var self = this;
        window.setTimeout(function() {
            $(self).spinner("hide");
        }, 1000);
    });

// 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
    $("button.show-sign").bind('click', function (e) {
        var data = $("#signature").sign("getData", "image");
        $("div.widget-sign-viewer img").attr({
            src:"data:" + data
        });
        $("a.download-sign").attr({
            href:"data:" + data
        });
        console.log(data);
    });

    $("button.reset-sign").bind('click', function (e) {
        $("#signature").sign("reset");
        $("div.widget-sign-viewer img").attr({
            src:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        });
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

});
