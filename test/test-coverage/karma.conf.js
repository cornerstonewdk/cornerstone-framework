// Karma configuration
// Generated on Tue Oct 08 2013 17:59:26 GMT+0900 (KST)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: "../../",


        // frameworks to use
        frameworks: ["mocha", "requirejs"],


        // list of files / patterns to load in the browser
        files: [
            {pattern: "lib/**/*.js", included: false},
            {pattern: "src/{widget,mvc,loader,util}/**/*.js", included: false},
            {pattern: "test/test-coverage/templates/**/*.template", included: false},
            {pattern: "test/test-coverage/js/**/*.js", included: false},
            {pattern: "test/test-coverage/data/**/*.json", included: false},
            {pattern: "test/test-coverage/test/**/*Spec.js", included: false},
            "test/test-coverage/test/test-main.js"
        ],


        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: "dots", "progress", "junit", "growl", "coverage"
        reporters: ["progress", "coverage"],

        preprocessors: {
            "src/widget/**/*.js": "coverage"
        },

        // coverage config
        coverageReporter: {
            type : "html",
            dir : "test/test-coverage/coverage/"
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ["Chrome"],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
