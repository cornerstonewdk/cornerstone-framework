// Set the require.js configuration for your application.
require.config({
    paths:{
        // JavaScript folders.
        plugins:"../assets/js/plugins",
        dummyDataUtil: "util/dummyDataUtil"
    },

    shim:{

    }

});


define(["router"], function (Router) {
    return {
        launch:function () {
            // 애플리게이션의 시작점
            console.log("Application Start");
        }
    }
});