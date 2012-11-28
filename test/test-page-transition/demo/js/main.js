/**
 * Created with JetBrains WebStorm.
 * User: AZAMARA
 * Date: 12. 7. 31
 * Time: 오전 10:03
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    var effect = Transition.effect.prototype;
    effect.custom1 = function (opt) {
        // 회전 기본 값
        var self = this,
            defaultValue = {
                inTarget:{
                    duration:350
                },
                outTarget:{
                    from:0,
                    duration:150
                }
            };

        // 기본값과 사용자 정의 값 병합
        opt = this.extend(defaultValue, opt);

        // 나가는 페이지 스타일 초기화 값
        this.outTargetCss = {
            position:"absolute",
            width:$(opt.outTarget.el).width(),
            scale:1,
            opacity:1,
            perspective:$(opt.outTarget.el).width(),
            rotate3d:"0, 0, 0, 0",
            overflow:"hidden"
        };

        // 들어오는 페이지 스타일 초기화 값
        this.inTargetCss = {
            position:"absolute",
            width:$(opt.inTarget.el).width(),
            scale:0.5,
            opacity:0,
            perspective:$(opt.outTarget.el).width(),
            rotate3d:"0, 0, 0, 0",
            overflow:"hidden"
        };

        $(opt.inTarget.el).css(this.inTargetCss);
        $(opt.outTarget.el).css(this.outTargetCss).transition({
            scale:0.5,
            opacity:0
        }, opt.outTarget.duration, opt.outTarget.timing, function () {
            $(this).css({
                scale:1
            });
            opt.outTarget.done();

            $(opt.inTarget.el).transition({
                scale:1,
                opacity:1
            }, opt.inTarget.duration, opt.inTarget.timing, function () {
                self.launcher._done(opt);
            });
        });
    };

    // 주소 툴바 감추기
    function hideAddressBar() {
        // 웹페이지의 높이가 화면높이보다 작을 때는 실행할 필요가 없으므로 종료
        if (document.height <= window.outerHeight) return;
        var scrollTimer = setInterval(function () {
            if (!pageYOffset) {  // 모바일 브라우저에서 주소창이 보이고 있을 때는 pageYOffset = 0 이므로 이때만 실행
                scrollTo(0, 1);  // 웹페이지를 x축 0, y축 1의 위치로 끌어올림
            } else { // pageYOffset !=0 인 경우 반복 종료: scrollTo(0, 1) 이 실행되었거나 사용자가 스크롤을 움직인 경우
                clearInterval(scrollTimer);
            }
        }, 100); // 100 밀리세컨드마다 반복 실행
    }

    window.addEventListener('load', hideAddressBar, false);  // 페이지 로드 되었을 때 실행
    window.addEventListener('orientationchange', hideAddressBar, false); // 화면이 가로/세로 전환되었을 때 실행

    $("#front .btn").live("click", function (e) {
        var transitionType = $(this).attr("data-transition"),
            inTargetID = "#back",
            outTargetID = "#front";
        Transition.launcher({
            transitionType:transitionType, // 화면전환 효과 기본 None(효과 없음)
            inTarget:{
                el:inTargetID // 들어오는 페이지의 element의 셀렉터나 ID 또는 클래스
            },
            outTarget:{
                el:outTargetID // 나가는 페이지의 element의 셀렉터나 ID 또는 클래스
            },
            isReverse:false, // 뒤로가기 여부
            done:function () {
                $("#front").removeClass("current");
                $("#back").addClass("current");
            }
        });
    });

    $("#back .btn").live("click", function (e) {
        var transitionType = $(this).attr("data-transition"),
            outTargetID = "#back",
            inTargetID = "#front";
        Transition.launcher({
            inTarget:{
                el:inTargetID // 들어오는 페이지의 element의 셀렉터나 ID 또는 클래스
            },
            outTarget:{
                el:outTargetID // 나가는 페이지의 element의 셀렉터나 ID 또는 클래스
            },
            isReverse:true, // 뒤로가기 여부
            done:function () {
                $("#front").addClass("current");
                $("#back").removeClass("current");
            }
        });
    });
});
