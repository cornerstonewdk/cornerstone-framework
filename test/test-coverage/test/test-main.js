var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from "/base"
    baseUrl: "/base",
    paths: {
        // 라이브러리
        "blackbird": "lib/blackbirdjs/blackbird",
        "d3": "lib/d3/d3.v3.min",
        "datatable": "lib/DataTables/jquery.dataTables.min",
        "datepicker": "lib/datepicker/bootstrap-datepicker",
        "hammer": "lib/hammer/hammer",
        "infinity": "lib/infinity/infinity.min",
        "iscroll": "lib/iscroll-4/iscrll",
        "jquery.hammer": "lib/jquery.hammer/jquery.hammer",
        "hotkeys": "lib/jquery.hotkeys",
        "media": "lib/media/mediaelement-and-player.min",
        "nv": "lib/nvd3/nv.d3",
        "typeahead": "lib/typeahead/typeahead",

        // MVC
        "underscore": "lib/underscore/underscore-min",
        "backbone": "lib/backbone/backbone-min",
        "handlebars": "lib/handlebars/handlebars",
        "template": "src/loader/template/template",
        "logging": "src/util/logging/logging",

        // UI
        "jquery": "lib/jquery/jquery-1.10.2.min",
        "bootstrap": "lib/bootstrap/js/bootstrap",
        "widget-alert": "src/widget/alert/widget-alert",
        "widget-button": "src/widget/button/widget-button",
        "widget-carousel": "src/widget/carousel/widget-carousel",
        "widget-chart": "src/widget/chart/widget-chart",
        "widget-collapse": "src/widget/collapse/widget-collapse",
        "widget-datatable": "src/widget/datatable/widget-datatable",
        "widget-datepicker": "src/widget/datepicker/widget-datepicker",
        "widget-dropdown": "src/widget/dropdown/widget-dropdown",
        "widget-editor": "src/widget/editor/widget-editor",
        "widget-listview": "src/widget/listview/widget-listview",
        "widget-media": "src/widget/media/widget-media",
        "widget-modal": "src/widget/modal/widget-modal",
        "widget-motioncaptcha": "src/widget/motioncaptcha/widget-motioncaptcha",
        "widget-popover": "src/widget/popover/widget-popover",
        "widget-rangeinput": "src/widget/rangeinput/widget-rangeinput",
        "widget-scrollspy": "src/widget/scrollspy/widget-scrollspy",
        "widget-scrollview": "src/widget/scrollview/widget-scrollview",
        "widget-sign": "src/widget/sign/widget-sign",
        "widget-spinner": "src/widget/spinner/widget-spinner",
        "widget-tab": "src/widget/tab/widget-tab",
        "widget-tooltip": "src/widget/tooltip/widget-tooltip",
        "widget-typeahead": "src/widget/typeahead/widget-typeahead",
        "widget-touch": "src/widget/touch/widget-touch",

        // Test
        "mocha": "test/test-coverage/js/mocha",
        "chai": "test/test-coverage/js/chai"
    },

    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "bootstrap": ["jquery"],
        "handlebars": {
            exports: "Handlebars"
        },
        "template": ["handlebars"],
        "mocha": {
            exports: "mocha"
        },
        "nv": {
            exports: "nv"
        },
        "d3": {
            exports: "d3"
        },
        "datatable": {
            exports: "datatable"
        },
        "logging": ["blackbird"]
    },


    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

mocha.setup("bdd");
define("expect", ["chai"], function (chai) {
    return chai.expect;
});