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
            "name": "spin",
            "location": "../cornerstone/spin"
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
            "name": "widget-datepicker",
            "location": "../cornerstone/widget-datepicker",
            "main": "widget-datepicker.js"
        },
        {
            "name": "widget-rangeinput",
            "location": "../cornerstone/widget-rangeinput",
            "main": "widget-rangeinput.js"
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
        "widget-datepicker": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-datepicker"
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
            "name": "spin",
            "location": "../cornerstone/spin"
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
            "name": "widget-datepicker",
            "location": "../cornerstone/widget-datepicker",
            "main": "widget-datepicker.js"
        },
        {
            "name": "widget-rangeinput",
            "location": "../cornerstone/widget-rangeinput",
            "main": "widget-rangeinput.js"
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
        "widget-datepicker": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-datepicker"
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
            "name": "spin",
            "location": "../cornerstone/spin"
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
            "name": "widget-datepicker",
            "location": "../cornerstone/widget-datepicker",
            "main": "widget-datepicker.js"
        },
        {
            "name": "widget-rangeinput",
            "location": "../cornerstone/widget-rangeinput",
            "main": "widget-rangeinput.js"
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
        "widget-datepicker": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "bootstrap"
            ],
            "exports": "widget-datepicker"
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
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}