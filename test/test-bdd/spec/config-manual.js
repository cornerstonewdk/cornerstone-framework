require.config({
    "paths": {
        "faketouches": "../js/faketouches",
        "showtouches": "../js/hammer.showtouches",
        "gestures": "../js/gestures",
        "backbone": "../../../dist/lib/backbone/backbone-min",
        "blackbird": "../../../dist/lib/blackbirdjs/blackbird",
        "bootstrap": "../../../dist/lib/bootstrap/js/bootstrap",
        "datatable": "../../../dist/lib/DataTables/jquery.dataTables.min",
        "d3": "../../../dist/lib/d3/d3.v3.min",
        "device": "../../../dist/src/device/srt-0.9",
        "form-view": "../../../dist/src/mvc/view/form-view/form",
        "gesture-view": "../../../dist/src/mvc/view/gesture-view/gesture",
        "hammer": "../../../dist/lib/hammer/hammer",
        "handlebars": "../../../dist/lib/handlebars/handlebars",
        "infinity": "../../../dist/lib/infinity/infinity.min",
        "iscroll": "../../../dist/lib/iscroll-4/iscroll",
        "jquery": "../../../dist/lib/jquery/jquery-1.10.2.min",
        "jquery.hammer": "../../../dist/lib/jquery.hammer/jquery.hammer",
        "jquery.hotkeys": "../../../dist/lib/jquery.hotkeys/jquery.hotkeys",
        "jsonp": "../../../dist/src/util/jsonp/jsonp",
        "launcher": "../../../dist/src/launcher/launcher",
        "logging": "../../../dist/src/util/logging/logging",
        "media": "../../../dist/lib/media/mediaelement-and-player.min",
        "multipage-route": "../../../dist/src/mvc/router/multipage-route/multipage",
        "nv": "../../../dist/lib/nvd3/nv.d3",
        "skt": "../../../dist/src/util/skt/skt",
        "style": "../../../dist/src/loader/style/style",
        "template": "../../../dist/src/loader/template/template",
        "theme-dark": "../../../dist/src/style/theme-dark",
        "theme-white": "../../../dist/src/style/theme-white",
        "transition": "../../../dist/src/util/transition/transition",
        "typeahead": "../../../dist/lib/typeahead/typeahead",
        "underscore": "../../../dist/lib/underscore/underscore-min",
        "validation-view": "../../../dist/src/mvc/view/validation-view/validation",
        "widget-alert": "../../../dist/src/widget/alert/widget-alert",
        "widget-button": "../../../dist/src/widget/button/widget-button",
        "widget-carousel": "../../../dist/src/widget/carousel/widget-carousel",
        "widget-chart": "../../../dist/src/widget/chart/widget-chart",
        "widget-collapse": "../../../dist/src/widget/collapse/widget-collapse",
        "widget-datatable": "../../../dist/src/widget/datatable/widget-datatable",
        "widget-datepicker": "../../../dist/src/widget/datepicker/widget-datepicker",
        "widget-dropdown": "../../../dist/src/widget/dropdown/widget-dropdown",
        "widget-editor": "../../../dist/src/widget/editor/widget-editor",
        "widget-listview": "../../../src/widget/listview/widget-listview",
        "widget-media": "../../../dist/src/widget/media/widget-media",
        "widget-modal": "../../../dist/src/widget/modal/widget-modal",
        "widget-motioncaptcha": "../../../dist/src/widget/motioncaptcha/widget-motioncaptcha",
        "widget-popover": "../../../dist/src/widget/popover/widget-popover",
        "widget-rangeinput": "../../../dist/src/widget/rangeinput/widget-rangeinput",
        "widget-scrollspy": "../../../dist/src/widget/scrollspy/widget-scrollspy",
        "widget-scrollview": "../../../src/widget/scrollview/widget-scrollview",
        "widget-sign": "../../../dist/src/widget/sign/widget-sign",
        "widget-spinner": "../../../dist/src/widget/spinner/widget-spinner",
        "widget-tab": "../../../dist/src/widget/tab/widget-tab",
        "widget-tooltip": "../../../dist/src/widget/tooltip/widget-tooltip",
        "widget-touch": "../../../dist/src/widget/touch/widget-touch",
        "widget-typeahead": "../../../dist/src/widget/typeahead/widget-typeahead"
    },
    "shim": {
        "faketouches": {
            "exports": "faketouches"
        },
        "showtouches": {
            "deps": [
                "hammer"
            ]
        },
        "gestures": {
            "deps": [
                "faketouches"
            ],
            "exports": "gestures"
        },
        "backbone": {
            "deps": [
                "underscore"
            ],
            "exports": "Backbone"
        },
        "blackbird": {
            "deps": [
                "style!blackbird"
            ],
            "exports": "log"
        },
        "bootstrap": {
            "deps": [
                "jquery"
            ]
        },
        "d3": {
            "exports": "d3"
        },
        "device": {
            "exports": "device"
        },
        "datatable": {
            "deps": [
                "jquery"
            ],
            "exports": "datatable"
        },
        "form-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "validation-view",
                "bootstrap"
            ],
            "exports": "form-view"
        },
        "gesture-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "jquery.hammer"
            ],
            "exports": "gesture-view"
        },
        "hammer": {
            "exports": "hammer"
        },
        "handlebars": {
            "exports": "Handlebars"
        },
        "infinity": {
            "deps": [
                "jquery"
            ],
            "exports": "infinity"
        },
        "iscroll": {
            "exports": "iscroll"
        },
        "jquery": {
            "exports": "jquery"
        },
        "jquery.hammer": {
            "deps": [
                "jquery",
                "hammer"
            ],
            "exports": "jquery.hammer"
        },
        "jquery.hotkeys": {
            "deps": [
                "jquery"
            ]
        },
        "jsonp": {
            "deps": [
                "jquery"
            ],
            "exports": "Jsonp"
        },
        "logging": {
            "deps": [
                "blackbird"
            ],
            "exports": "logging"
        },
        "media": {
            "deps": [
                "jquery"
            ]
        },
        "multipage-route": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "transition",
                "jquery.hammer"
            ],
            "exports": "multipage-route"
        },
        "nv": {
            "deps": [
                "d3"
            ],
            "exports": "nv"
        },
        "skt": {
            "deps": [
                "jquery"
            ]
        },
        "style": {
            "deps": [
                "jquery"
            ],
            "exports": "style"
        },
        "template": {
            "deps": [
                "jquery",
                "handlebars"
            ],
            "exports": "template"
        },
        "transition": {
            "deps": [
                "jquery"
            ],
            "exports": "Transition"
        },
        "typeahead": {
            "deps": [
                "jquery"
            ],
            "exports": "typeahead"
        },
        "underscore": {
            "exports": "_"
        },
        "validation-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "validation-view"
        },
        "widget-alert": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ]
        },
        "widget-button": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-button"
        },
        "widget-carousel": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-carousel"
        },
        "widget-chart": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "d3",
                "nv"
            ],
            "exports": "widget-chart"
        },
        "widget-collapse": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ]
        },
        "widget-datatable": {
            "deps": [
                "backbone",
                "underscore",
                "datatable",
                "jquery"
            ],
            "exports": "widget-datatable"
        },
        "widget-datepicker": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-datepicker"
        },
        "widget-dropdown": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-dropdown"
        },

        "widget-editor": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "jquery.hotkeys"
            ],
            "exports": "widget-editor"
        },
        "widget-listview": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "infinity"
            ],
            "exports": "widget-listview"
        },
        "widget-media": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "media"
            ],
            "exports": "widget-media"
        },
        "widget-modal": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-modal"
        },
        "widget-motioncaptcha": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "widget-motioncaptcha"
        },
        "widget-popover": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-popover"
        },
        "widget-rangeinput": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "widget-touch"
            ],
            "exports": "widget-rangeinput"
        },
        "widget-scrollspy": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-scrollspy"
        },
        "widget-scrollview": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "iscroll"
            ],
            "exports": "widget-scrollview"
        },
        "widget-sign": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "widget-sign"
        },
        "widget-spinner": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "widget-spinner"
        },
        "widget-tab": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-tab"
        },
        "widget-tooltip": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-tooltip"
        },
        "widget-touch": {
            "deps": [
                "jquery"
            ],
            "exports": "widget-touch"
        },
        "widget-typeahead": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "typeahead"
            ],
            "exports": "widget-typeahead"
        }
    }
});

require( [ 'jquery', 'logging', 'spec-manual' ], function( $, Logging ) {
    Logging.config( {
        defaultLevel: 'debug',
        debug: 'screen',
        info: 'screen',
        warn: 'screen',
        error: 'screen',
        time: 'screen'
    } );

    window.Logging = Logging;
    
    $('#blackbird').css({'margin-top': '60px'});

	// INITIALIZE THE RUN
	$(document).on('click', 'a[href="#"], [type="submit"]', function(e) {
        e.preventDefault();
    });

    // If tests run in a real browser
    // Can alternatively do a check on window.PHANTOMJS
    if (navigator.userAgent.indexOf('PhantomJS') < 0) {
        mocha.run();
    }
});