require.config({
    "paths":{ // path naming
        // Libs
        "jquery":"../libs/jquery/jquery-1.7.2.min",
        "underscore":"../libs/underscore/underscore-min",
        "backbone":"../libs/backbone/backbone-min",

        // Plugin
        "jquery-transit":"../libs/jquery/plugins/jquery.transit",

        // Utils
        "transition":"../../transition",

        "app":"app"
    },
    shim:{ // 외존성 설정
        "backbone":{
            deps:["underscore"],
            exports: "Backbone"
        },
        "jquery-transit":{
            deps:["jquery"]
        },
        "transition":{
            deps:["jquery-transit"],
            exports: "Transition"
        },
        "app": {
            deps:["backbone", "transition"]
        }
    }
});

require(
    ["app"],
    function (App) {
        App.init();
    }
);