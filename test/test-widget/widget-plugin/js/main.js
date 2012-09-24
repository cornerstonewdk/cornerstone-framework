// QRCODE 추가
var pageUrl = "http://www.jnwlab.com/site/workspace/cornerstone/cornerstone-mywork/widget/plugin/index.html";
$("footer > div").qrcode(pageUrl);


// 싸인
$("#signature").sign();

// 모션캡차
$("#form-motion-capcha").motioncaptcha();

// Input Range
$(".widget-range").each(function (i) {
    if (i == 0) {
        $(this).rangeinput();
    } else if (i == 1) {
        $(this).rangeinput({
            inputShow:false,
            progress:true
        });
    } else {
        $(this).rangeinput({
            inputShow:true,
            progress:true
        });
    }
});

// Spinner
$("#loadingCircle a").bind("click", function (e) {
    console.log($(this).data("spinner-type"));
    $(this).spinner($(this).data("spinner-type"));

    var exitFunc = function () {
        $("div.widget-spinner").spinner("hide");
    };

    window.setTimeout(exitFunc, 2000);
});

// Flip Switch
$(".handle, input[type=range]:first-child").bind("dragStart",function (e) {
    console.log("start drag");
}).bind("drag",function (e) {
        console.log("dragging", e);
    }).bind("dragEnd", function (e) {
        console.log("end drag");
    });

// Carousel Event Test
$(".carousel").swipe().bind("swipeLeft",function (e, swipeEventObj) {
    console.log("left", swipeEventObj);
    $(".carousel").carousel("next");
}).bind("swipeRight", function (e, swipeEventObj) {
        console.log("right", swipeEventObj);
        $(".carousel").carousel("prev");
    });

// TODO Sign 자체 터치 이벤트로 인한 사이드이펙트 수정 중
$("input[type=range]:first-child").bind("click",function (e) {
    console.log("click", e);
}).bind("mousedown",function (e) {
        console.log("mouse down", e);
    }).bind("mousemove",function (e) {
        console.log("mouse move", e);
    }).bind("mouseup", function (e) {
        console.log("mouse up", e);
        e.preventDefault();
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

/**
 * Popover
 */
$("a[rel=popover]").popover().click(function (e) {
    e.preventDefault()
});

/**
 * Tooltip
 */
$('.tooltip-demo').tooltip({
    selector:"a[rel=tooltip]"
});
