var jam = {
    "packages": [
        {
            "name": "backbone",
            "location": "../cornerstone/backbone",
            "main": "backbone-min.js"
        },
        {
            "name": "bootstrap",
            "location": "../cornerstone/bootstrap",
            "main": "js/bootstrap.min.js"
        },
        {
            "name": "d3",
            "location": "../cornerstone/d3",
            "main": "d3.v3.min.js"
        },
        {
            "name": "form-view",
            "location": "../cornerstone/form-view",
            "main": "form.js"
        },
        {
            "name": "handlebars",
            "location": "../cornerstone/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "infinity",
            "location": "../cornerstone/infinity",
            "main": "infinity.js"
        },
        {
            "name": "iscroll",
            "location": "../cornerstone/iscroll",
            "main": "iscroll.js"
        },
        {
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-2.0.2.min.js"
        },
        {
            "name": "launcher",
            "location": "../cornerstone/launcher",
            "main": "launcher.js"
        },
        {
            "name": "multipage-router",
            "location": "../cornerstone/multipage-router",
            "main": "multipage.js"
        },
        {
            "name": "nv",
            "location": "../cornerstone/nv",
            "main": "nv.d3.js"
        },
        {
            "name": "spin",
            "location": "../cornerstone/spin",
            "main": "spin.js"
        },
        {
            "name": "style",
            "location": "../cornerstone/style",
            "main": "style.js"
        },
        {
            "name": "template",
            "location": "../cornerstone/template",
            "main": "template.js"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
        },
        {
            "name": "typeahead",
            "location": "../cornerstone/typeahead",
            "main": "typeahead.js"
        },
        {
            "name": "underscore",
            "location": "../cornerstone/underscore",
            "main": "underscore-min.js"
        },
        {
            "name": "validation-view",
            "location": "../cornerstone/validation-view",
            "main": "validation.js"
        },
        {
            "name": "widget-chart",
            "location": "../cornerstone/widget-chart",
            "main": "widget-chart.js"
        },
        {
            "name": "widget-datepicker",
            "location": "../cornerstone/widget-datepicker",
            "main": "widget-datepicker.js"
        },
        {
            "name": "widget-listview",
            "location": "../cornerstone/widget-listview",
            "main": "widget-listview.js"
        },
        {
            "name": "widget-motioncaptcha",
            "location": "../cornerstone/widget-motioncaptcha",
            "main": "widget-motioncaptcha.js"
        },
        {
            "name": "widget-rangeinput",
            "location": "../cornerstone/widget-rangeinput",
            "main": "widget-rangeinput.js"
        },
        {
            "name": "widget-scrollview",
            "location": "../cornerstone/widget-scrollview",
            "main": "widget-scrollview.js"
        },
        {
            "name": "widget-sign",
            "location": "../cornerstone/widget-sign",
            "main": "widget-sign.js"
        },
        {
            "name": "widget-spinner",
            "location": "../cornerstone/widget-spinner",
            "main": "widget-spinner.js"
        },
        {
            "name": "widget-touch",
            "location": "../cornerstone/widget-touch",
            "main": "widget-touch.js"
        },
        {
            "name": "widget-typeahead",
            "location": "../cornerstone/widget-typeahead",
            "main": "widget-typeahead.js"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "backbone": {
            "deps": [
                "underscore"
            ],
            "exports": "Backbone"
        },
        "bootstrap": {
            "deps": [
                "jquery"
            ]
        },
        "d3": {
            "exports": "d3"
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
            "exports": "iScroll"
        },
        "jquery": {
            "exports": "jquery"
        },
        "multipage-router": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "transition"
            ],
            "exports": "multipage-router"
        },
        "nv": {
            "deps": [
                "d3"
            ],
            "exports": "nv"
        },
        "spin": {
            "deps": [
                "jquery"
            ],
            "exports": "spin"
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
            ]
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
        "widget-datepicker": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-datepicker"
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
        "widget-motioncaptcha": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "widget-motioncaptcha"
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
                "jquery",
                "spin"
            ],
            "exports": "widget-spinner"
        },
        "widget-touch": {
            "deps": [
                "jquery"
            ],
            "exports": "widget-touch"
        },
        "widget-typeahead": {
            "deps": [
                "typeahead"
            ]
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "backbone",
            "location": "../cornerstone/backbone",
            "main": "backbone-min.js"
        },
        {
            "name": "bootstrap",
            "location": "../cornerstone/bootstrap",
            "main": "js/bootstrap.min.js"
        },
        {
            "name": "d3",
            "location": "../cornerstone/d3",
            "main": "d3.v3.min.js"
        },
        {
            "name": "form-view",
            "location": "../cornerstone/form-view",
            "main": "form.js"
        },
        {
            "name": "handlebars",
            "location": "../cornerstone/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "infinity",
            "location": "../cornerstone/infinity",
            "main": "infinity.js"
        },
        {
            "name": "iscroll",
            "location": "../cornerstone/iscroll",
            "main": "iscroll.js"
        },
        {
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-2.0.2.min.js"
        },
        {
            "name": "launcher",
            "location": "../cornerstone/launcher",
            "main": "launcher.js"
        },
        {
            "name": "multipage-router",
            "location": "../cornerstone/multipage-router",
            "main": "multipage.js"
        },
        {
            "name": "nv",
            "location": "../cornerstone/nv",
            "main": "nv.d3.js"
        },
        {
            "name": "spin",
            "location": "../cornerstone/spin",
            "main": "spin.js"
        },
        {
            "name": "style",
            "location": "../cornerstone/style",
            "main": "style.js"
        },
        {
            "name": "template",
            "location": "../cornerstone/template",
            "main": "template.js"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
        },
        {
            "name": "typeahead",
            "location": "../cornerstone/typeahead",
            "main": "typeahead.js"
        },
        {
            "name": "underscore",
            "location": "../cornerstone/underscore",
            "main": "underscore-min.js"
        },
        {
            "name": "validation-view",
            "location": "../cornerstone/validation-view",
            "main": "validation.js"
        },
        {
            "name": "widget-chart",
            "location": "../cornerstone/widget-chart",
            "main": "widget-chart.js"
        },
        {
            "name": "widget-datepicker",
            "location": "../cornerstone/widget-datepicker",
            "main": "widget-datepicker.js"
        },
        {
            "name": "widget-listview",
            "location": "../cornerstone/widget-listview",
            "main": "widget-listview.js"
        },
        {
            "name": "widget-motioncaptcha",
            "location": "../cornerstone/widget-motioncaptcha",
            "main": "widget-motioncaptcha.js"
        },
        {
            "name": "widget-rangeinput",
            "location": "../cornerstone/widget-rangeinput",
            "main": "widget-rangeinput.js"
        },
        {
            "name": "widget-scrollview",
            "location": "../cornerstone/widget-scrollview",
            "main": "widget-scrollview.js"
        },
        {
            "name": "widget-sign",
            "location": "../cornerstone/widget-sign",
            "main": "widget-sign.js"
        },
        {
            "name": "widget-spinner",
            "location": "../cornerstone/widget-spinner",
            "main": "widget-spinner.js"
        },
        {
            "name": "widget-touch",
            "location": "../cornerstone/widget-touch",
            "main": "widget-touch.js"
        },
        {
            "name": "widget-typeahead",
            "location": "../cornerstone/widget-typeahead",
            "main": "widget-typeahead.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore"
            ],
            "exports": "Backbone"
        },
        "bootstrap": {
            "deps": [
                "jquery"
            ]
        },
        "d3": {
            "exports": "d3"
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
            "exports": "iScroll"
        },
        "jquery": {
            "exports": "jquery"
        },
        "multipage-router": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "transition"
            ],
            "exports": "multipage-router"
        },
        "nv": {
            "deps": [
                "d3"
            ],
            "exports": "nv"
        },
        "spin": {
            "deps": [
                "jquery"
            ],
            "exports": "spin"
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
            ]
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
        "widget-datepicker": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-datepicker"
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
        "widget-motioncaptcha": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "widget-motioncaptcha"
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
                "jquery",
                "spin"
            ],
            "exports": "widget-spinner"
        },
        "widget-touch": {
            "deps": [
                "jquery"
            ],
            "exports": "widget-touch"
        },
        "widget-typeahead": {
            "deps": [
                "typeahead"
            ]
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "backbone",
            "location": "../cornerstone/backbone",
            "main": "backbone-min.js"
        },
        {
            "name": "bootstrap",
            "location": "../cornerstone/bootstrap",
            "main": "js/bootstrap.min.js"
        },
        {
            "name": "d3",
            "location": "../cornerstone/d3",
            "main": "d3.v3.min.js"
        },
        {
            "name": "form-view",
            "location": "../cornerstone/form-view",
            "main": "form.js"
        },
        {
            "name": "handlebars",
            "location": "../cornerstone/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "infinity",
            "location": "../cornerstone/infinity",
            "main": "infinity.js"
        },
        {
            "name": "iscroll",
            "location": "../cornerstone/iscroll",
            "main": "iscroll.js"
        },
        {
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-2.0.2.min.js"
        },
        {
            "name": "launcher",
            "location": "../cornerstone/launcher",
            "main": "launcher.js"
        },
        {
            "name": "multipage-router",
            "location": "../cornerstone/multipage-router",
            "main": "multipage.js"
        },
        {
            "name": "nv",
            "location": "../cornerstone/nv",
            "main": "nv.d3.js"
        },
        {
            "name": "spin",
            "location": "../cornerstone/spin",
            "main": "spin.js"
        },
        {
            "name": "style",
            "location": "../cornerstone/style",
            "main": "style.js"
        },
        {
            "name": "template",
            "location": "../cornerstone/template",
            "main": "template.js"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
        },
        {
            "name": "typeahead",
            "location": "../cornerstone/typeahead",
            "main": "typeahead.js"
        },
        {
            "name": "underscore",
            "location": "../cornerstone/underscore",
            "main": "underscore-min.js"
        },
        {
            "name": "validation-view",
            "location": "../cornerstone/validation-view",
            "main": "validation.js"
        },
        {
            "name": "widget-chart",
            "location": "../cornerstone/widget-chart",
            "main": "widget-chart.js"
        },
        {
            "name": "widget-datepicker",
            "location": "../cornerstone/widget-datepicker",
            "main": "widget-datepicker.js"
        },
        {
            "name": "widget-listview",
            "location": "../cornerstone/widget-listview",
            "main": "widget-listview.js"
        },
        {
            "name": "widget-motioncaptcha",
            "location": "../cornerstone/widget-motioncaptcha",
            "main": "widget-motioncaptcha.js"
        },
        {
            "name": "widget-rangeinput",
            "location": "../cornerstone/widget-rangeinput",
            "main": "widget-rangeinput.js"
        },
        {
            "name": "widget-scrollview",
            "location": "../cornerstone/widget-scrollview",
            "main": "widget-scrollview.js"
        },
        {
            "name": "widget-sign",
            "location": "../cornerstone/widget-sign",
            "main": "widget-sign.js"
        },
        {
            "name": "widget-spinner",
            "location": "../cornerstone/widget-spinner",
            "main": "widget-spinner.js"
        },
        {
            "name": "widget-touch",
            "location": "../cornerstone/widget-touch",
            "main": "widget-touch.js"
        },
        {
            "name": "widget-typeahead",
            "location": "../cornerstone/widget-typeahead",
            "main": "widget-typeahead.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore"
            ],
            "exports": "Backbone"
        },
        "bootstrap": {
            "deps": [
                "jquery"
            ]
        },
        "d3": {
            "exports": "d3"
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
            "exports": "iScroll"
        },
        "jquery": {
            "exports": "jquery"
        },
        "multipage-router": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "transition"
            ],
            "exports": "multipage-router"
        },
        "nv": {
            "deps": [
                "d3"
            ],
            "exports": "nv"
        },
        "spin": {
            "deps": [
                "jquery"
            ],
            "exports": "spin"
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
            ]
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
        "widget-datepicker": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-datepicker"
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
        "widget-motioncaptcha": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "widget-motioncaptcha"
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
                "jquery",
                "spin"
            ],
            "exports": "widget-spinner"
        },
        "widget-touch": {
            "deps": [
                "jquery"
            ],
            "exports": "widget-touch"
        },
        "widget-typeahead": {
            "deps": [
                "typeahead"
            ]
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}