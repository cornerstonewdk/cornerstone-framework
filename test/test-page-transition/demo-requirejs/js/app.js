define([
    'backbone',
    'jquery',
    'transition'],
    function (Backbone, $, Transition) {
        return {
            init:function () {
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
            }
        }
    }
);