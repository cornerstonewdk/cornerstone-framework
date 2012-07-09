require.config({
    "baseUrl":"./app/",
    "paths":{
        // Libs
        "jquery":"../libs/jquery/jquery-1.7.2.min",
        "underscore":"../libs/underscore/underscore-min",
        "backbone":"../libs/backbone/backbone-min",
        "bootstrap":"../libs/bootstrap/js/bootstrap.min",
        "handlebars":"../libs/handlebars/handlebars-1.0.0.beta.6",

        // Plugin
        "text":"../libs/requirejs/text",
        "mediaelement":"../libs/mediaelement/mediaelement-and-player.min",

        // My App
        "app":"app"
    },
    shim:{
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
        }
    }
});

require(["app"],
    function (App) {
        App.init();
    });
