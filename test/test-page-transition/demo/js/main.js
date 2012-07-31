/**
 * Created with JetBrains WebStorm.
 * User: AZAMARA
 * Date: 12. 7. 31
 * Time: 오전 10:03
 * To change this template use File | Settings | File Templates.
 */
$(function() {
    $("#front .btn").live("click", function (e) {
        var transitionType = $(this).attr("data-transition"),
            inTargetID = "#back",
            outTargetID = "#front";
        $.cornerStoneTransition({
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
        $.cornerStoneTransition({
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
