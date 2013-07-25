define([
    'backbone',
    'jquery',
    'transition'],
    function (Backbone, $, Transition) {
        return {
            init:function () {
                $(document).on("click", "#front .btn", function (e) {
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

                $(document).on("click", "#back .btn", function (e) {
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
            }
        }
    }
);