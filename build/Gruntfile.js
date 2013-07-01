module.exports = function ( grunt ) {

	// load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-shell-spawn');

	var pathInfo = {
		source: '../src/',
		lib: '../lib/',
		dist: '../grunt-dist/',
		repo: 'http://j4f.jnw.io/repository'
	};

	var inquirer = require("inquirer");

	grunt.initConfig( {
		path: pathInfo,
		pkg: grunt.file.readJSON( 'package.json' ),
		admin: grunt.file.readJSON( 'admin.json' ),
		clean: {
			options: {
				force: true
			},
			build: [ '<%= path.dist %>' ]
		},
		copy: {
			lib: {
				files: [ { 
					expand: true, 
					src: [ '<%= path.lib %>**' ], 
					dest: '<%= path.dist %>lib' 
				} ]
			},
			src: {
				files: [ {
					expand: true, 
					src: [ 
						'<%= path.source %>**', 
						'!<%= path.source %>ui*/**',
						'!<%= path.source %>stye/**',
						'<%= path.source %>style/**/package.json'
					],
					dest: '<%= path.dist %>src'
				} ]
			}
		},
		uglify: {
			options: {
				banner: grunt.file.read( './copyright.txt', { encoding: 'UTF-8' } )
			},
			loader: {
				files: [ {
					expand: true,
					src: [ '<%= path.dist %>src/**/*.js' ]
				} ]
			}
		},
		less: {
			compile: {
				files: [
					{
						'<%= path.dist %>src/style/theme-dark/cornerstone.css': '<%= path.source %>style/theme-dark/cornerstone.less'
					},
					{
						'<%= path.dist %>src/style/theme-white/cornerstone.css': '<%= path.source %>style/theme-white/cornerstone.less'
					},
					{
						'<%= path.dist %>src/style/theme-wireframe/cornerstone.css': '<%= path.source %>style/theme-wireframe/cornerstone.less'
					},
					{
						'<%= path.dist %>src/style/skin-cerulean/cerulean.css': '<%= path.source %>style/skin-cerulean/cerulean.less'
					},
					{
						'<%= path.dist %>src/style/skin-flatly/flatly.css': '<%= path.source %>style/skin-flatly/flatly.less'
					},
					{
						'<%= path.dist %>src/style/skin-united/united.css': '<%= path.source %>style/skin-united/united.less'
					}
				]
			}
		},
		cssmin: {
			options: {
				banner: grunt.file.read( './copyright.txt', { encoding: 'UTF-8' } )
			},
			minify: {
				files: [
					{
						'<%= path.dist %>src/style/theme-dark/cornerstone.css': '<%= path.dist %>src/style/theme-dark/cornerstone.css'
					},
					{
						'<%= path.dist %>src/style/theme-white/cornerstone.css': '<%= path.dist %>src/style/theme-white/cornerstone.css'
					},
					{
						'<%= path.dist %>src/style/theme-wireframe/cornerstone.css': '<%= path.dist %>src/style/theme-wireframe/cornerstone.css'
					},
					{
						'<%= path.dist %>src/style/skin-cerulean/cerulean.css': '<%= path.dist %>src/style/skin-cerulean/cerulean.css'
					},
					{
						'<%= path.dist %>src/style/skin-flatly/flatly.css': '<%= path.dist %>src/style/skin-flatly/flatly.css'
					},
					{
						'<%= path.dist %>src/style/skin-united/united.css': '<%= path.dist %>src/style/skin-united/united.css'
					}
				]
			}
		},
		shell: {
			jam: {
				command: 'jam publish <%= path.dist %>lib/backbone --repository http://j4f.jnw.io/repository',
				options: {
					async: false,
					stdout: true
				}
			}
		}
	} );
	//command: 'jam publish <%= path.dist %>lib/backbone --repository <%= path.repo %>',

	// grunt.registerTask( 't', function () {

		
	// 	var spawnOptions = {
	// 		cmd: 'jam',
	// 		args: ['publish', pathInfo.dist + 'lib/backbone', '--repository', pathInfo.repo ],
	// 		opts: {
	// 			stdio: 'inherit'
	// 		}
			
	// 	};

	// 	var child = grunt.util.spawn( spawnOptions, function ( error, result, code ) {
	// 		console.log( 'done: ', error, result, code )
	// 	} );

	// 	child.stdout.on('data', function (data) {
	// 		console.log( 1 );
	// 	    switch (data.toString().trim()) {
	// 	        case 'Username:':
	// 	            child.stdin.write('admin');
	// 	            break;
	// 	        case 'Password:':
	// 	            child.stdin.write('1234');
	// 	            break;
	// 	    }
	// 	})

	// } );


	// grunt.registerTask( 'searchForPublish', 'search the package.json in each directory', function () {
	// 	grunt.file.recurse( pathInfo.dist, function callback( abspath, rootdir, subdir, filename ) {
	// 		if ( filename === 'package.json' ) {
	// 			var options = {
	// 				cmd: 'jam publish ' + pathInfo.dist + 'lib/backbone --repository ' + pathInfo.repo,
	// 				args: [ testAdmin.id, testAdmin.pass ]

	// 			};
	// 			options.cmd = grunt.template.process(_.isFunction(options.cmd) ? options.cmd.call(grunt) : options.cmd);

	// 			console.log( options.cmd );
	// 			grunt.util.spawn( options, function ( error, result, code ) {
	// 				console.log( error, result, code );
	// 			} );
					
	// 		}


	// 		console.log( 'abspath : ' + abspath );
	// 		console.log( 'rootdir : ' + rootdir );
	// 		console.log( 'subdir : ' + subdir );
	// 		console.log( 'filename : ' + filename );

	// 		'jam publish <%= path.dist %>lib/backbone --repository <%= path.repo %>'
	// 		'jam publish ' + pathInfo.dist + 'lib/backbone --repository ' + pathInfo.repo'
	// 	} );
	// } );
	grunt.registerTask( 't', [ 'shell' ] );
	grunt.registerTask( 'publish', [ 'clean', 'copy', 'uglify', 'less', 'cssmin' ] );
	grunt.registerTask( 'default', [ 'publish' ] );
}