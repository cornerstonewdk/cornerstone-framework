require.config({
    "baseUrl":"./app/",
    "paths":{ // path naming
        // Libs
        "jquery":"../libs/jquery/jquery-1.7.2.min",
        "underscore":"../libs/underscore/underscore-min",
        "backbone":"../libs/backbone/backbone-min",
        "bootstrap":"../libs/bootstrap/js/bootstrap.min",
        "handlebars":"../libs/handlebars/handlebars-1.0.0.beta.6",
        "stats":"../libs/stats/Stats",

        // Plugin
        "text":"../libs/requirejs/text",
        "mediaelement":"../libs/mediaelement/mediaelement-and-player.min",
        "iscroll" : "../libs/iscroll/iscroll",
        "jquery-aop":"../libs/jquery/plugins/aop.min",

        // Utils
        "mobile": "utils/mobile",
        "page-transition": "utils/page-transition",

        // My App
        "app":"app"
    },
    shim:{ // 외존성 설정
        "underscore":{
            exports:"_"
        },
        "backbone":{
            deps:["underscore"],
            exports:"Backbone"
        },
        "bootstrap":{
            deps:["jquery"]
        },
        "mediaelement":{
            deps:["jquery"]
        },
        "jquery-aop":{
            deps:["jquery"]
        },
        "mobile" : {
            deps:["jquery"]
        },
        "page-transition" : {
            deps:["jquery"]
        },
        "app" : {
            deps:["jquery",'mobile']
        }
    }
});

require(["app"],
    function (App) {
        App.init();
    });
