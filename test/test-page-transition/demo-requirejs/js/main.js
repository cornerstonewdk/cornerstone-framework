require.config({
    "paths":{ // path naming
        "app":"app"
    },
    shim:{ // 외존성 설정
        "app": {
            deps:["backbone", "transition"]
        }
    }
});

define(["app"], function (App) {
    return {
        launch:function () {
            App.init();
        }
    }
});