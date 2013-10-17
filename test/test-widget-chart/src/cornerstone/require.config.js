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
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-1.10.2.min.js"
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
            "name": "skin-cerulean",
            "location": "../cornerstone/skin-cerulean"
        },
        {
            "name": "skin-flatly",
            "location": "../cornerstone/skin-flatly"
        },
        {
            "name": "skin-united",
            "location": "../cornerstone/skin-united"
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
            "name": "theme-dark",
            "location": "../cornerstone/theme-dark"
        },
        {
            "name": "theme-white",
            "location": "../cornerstone/theme-white"
        },
        {
            "name": "theme-wireframe",
            "location": "../cornerstone/theme-wireframe"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
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
            "name": "widget-touch",
            "location": "../cornerstone/widget-touch",
            "main": "widget-touch.js"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
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
        "jquery": {
            "exports": "jQuery"
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
        "widget-touch": {
            "deps": [
                "jquery"
            ],
            "exports": "widget-touch"
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
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-1.10.2.min.js"
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
            "name": "skin-cerulean",
            "location": "../cornerstone/skin-cerulean"
        },
        {
            "name": "skin-flatly",
            "location": "../cornerstone/skin-flatly"
        },
        {
            "name": "skin-united",
            "location": "../cornerstone/skin-united"
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
            "name": "theme-dark",
            "location": "../cornerstone/theme-dark"
        },
        {
            "name": "theme-white",
            "location": "../cornerstone/theme-white"
        },
        {
            "name": "theme-wireframe",
            "location": "../cornerstone/theme-wireframe"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
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
            "name": "widget-touch",
            "location": "../cornerstone/widget-touch",
            "main": "widget-touch.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
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
        "jquery": {
            "exports": "jQuery"
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
        "widget-touch": {
            "deps": [
                "jquery"
            ],
            "exports": "widget-touch"
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
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-1.10.2.min.js"
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
            "name": "skin-cerulean",
            "location": "../cornerstone/skin-cerulean"
        },
        {
            "name": "skin-flatly",
            "location": "../cornerstone/skin-flatly"
        },
        {
            "name": "skin-united",
            "location": "../cornerstone/skin-united"
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
            "name": "theme-dark",
            "location": "../cornerstone/theme-dark"
        },
        {
            "name": "theme-white",
            "location": "../cornerstone/theme-white"
        },
        {
            "name": "theme-wireframe",
            "location": "../cornerstone/theme-wireframe"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
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
            "name": "widget-touch",
            "location": "../cornerstone/widget-touch",
            "main": "widget-touch.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
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
        "jquery": {
            "exports": "jQuery"
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
        "widget-touch": {
            "deps": [
                "jquery"
            ],
            "exports": "widget-touch"
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}