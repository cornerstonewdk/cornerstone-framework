"use strict";

module.exports = function (grunt) {
    // load all grunt tasks
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: ["coverage/"],
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ["Chrome"]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '*'
            },
            coverage: {
                options: {
                    base: 'coverage',
                    middleware: function( connect, options ) {
                        return [
                            require( 'connect-livereload' )(),
                            connect.static( options.base ),
                            connect.directory( options.base )
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: "http://localhost:<%= connect.options.port %>"
            }
        },
        watch: {
            options: {
                livereload: true
            }
        }
    });

    grunt.registerTask("default", ["clean", "karma", "connect:coverage", "open", "watch"]);
};
