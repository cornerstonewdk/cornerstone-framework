/**
 * Created with JetBrains WebStorm.
 * User: AZAMARA
 * Date: 12. 7. 31
 * Time: 오전 10:03
 * To change this template use File | Settings | File Templates.
 */
$(function() {
    var effect = Transition.effect.prototype;
    effect.custom1= function (opt) {
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
            width:$(opt.outTarget.id).width(),
            scale:1,
            opacity:1,
            perspective:$(opt.outTarget.id).width(),
            rotate3d:"0, 0, 0, 0",
            overflow:"hidden"
        };

        // 들어오는 페이지 스타일 초기화 값
        this.inTargetCss = {
            position:"absolute",
            width:$(opt.inTarget.id).width(),
            scale:0.5,
            opacity:0,
            perspective:$(opt.outTarget.id).width(),
            rotate3d:"0, 0, 0, 0",
            overflow:"hidden"
        };

        $(opt.inTarget.id).css(this.inTargetCss);
        $(opt.outTarget.id).css(this.outTargetCss).transition({
            scale:0.5,
            opacity:0
        }, opt.outTarget.duration, opt.outTarget.timing, function () {
            $(this).css({
                scale:1
            });
            opt.outTarget.done();

            $(opt.inTarget.id).transition({
                scale:1,
                opacity:1
            }, opt.inTarget.duration, opt.inTarget.timing, function () {
                self.launcher._done(opt);
            });
        });
    };

    // 주소 툴바 감추기
    window.addEventListener('load', function(){
        setTimeout(scrollTo, 0, 0, 1);
    }, false);

    $("#front .btn").live("click", function (e) {
        var transitionType = $(this).attr("data-transition"),
            inTargetID = "#back",
            outTargetID = "#front";
        Transition.launcher({
            transitionType:transitionType, // 화면전환 효과 기본 None(효과 없음)
            inTarget:{
                id:inTargetID // 들어오는 페이지의 ID 값
            },
            outTarget:{
                id:outTargetID // 나가는 페이지의 ID 값
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
                id:inTargetID // 들어오는 페이지의 ID 값
            },
            outTarget:{
                id:outTargetID // 나가는 페이지의 ID 값
            },
            isReverse:true, // 뒤로가기 여부
            done:function () {
                $("#front").addClass("current");
                $("#back").removeClass("current");
            }
        });
    });
});
