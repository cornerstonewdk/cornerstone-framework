module.exports = function ( grunt ) {

	// load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	var pathInfo = {
		source: '../src/',
		lib: '../lib/',
		dist: '../grunt-dist/'
	};

	grunt.initConfig( {
		path: {
			source: pathInfo.source,
			lib: pathInfo.lib,
			dist: pathInfo.dist,
			test: pathInfo.test
		},
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
						'!<%= path.source %>skin/**',
						'!<%= path.source %>theme/**', 
						'<%= path.source %>theme/**/package.json', 
						'<%= path.source %>skin/**/package.json'
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
						'<%= path.dist %>src/theme/dark/cornerstone.css': '<%= path.source %>theme/dark/cornerstone.less'
					},
					{
						'<%= path.dist %>src/theme/white/cornerstone.css': '<%= path.source %>theme/white/cornerstone.less'
					},
					{
						'<%= path.dist %>src/theme/wireframe/cornerstone.css': '<%= path.source %>theme/wireframe/cornerstone.less'
					},
					{
						'<%= path.dist %>src/skin/cerulean/cerulean.css': '<%= path.source %>skin/cerulean/cerulean.less'
					},
					{
						'<%= path.dist %>src/skin/flatly/flatly.css': '<%= path.source %>skin/flatly/flatly.less'
					},
					{
						'<%= path.dist %>src/skin/united/united.css': '<%= path.source %>skin/united/united.less'
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
						'<%= path.dist %>src/theme/dark/cornerstone.css': '<%= path.dist %>src/theme/dark/cornerstone.css'
					},
					{
						'<%= path.dist %>src/theme/white/cornerstone.css': '<%= path.dist %>src/theme/white/cornerstone.css'
					},
					{
						'<%= path.dist %>src/theme/wireframe/cornerstone.css': '<%= path.dist %>src/theme/wireframe/cornerstone.css'
					},
					{
						'<%= path.dist %>src/skin/cerulean/cerulean.css': '<%= path.dist %>src/skin/cerulean/cerulean.css'
					},
					{
						'<%= path.dist %>src/skin/flatly/flatly.css': '<%= path.dist %>src/skin/flatly/flatly.css'
					},
					{
						'<%= path.dist %>src/skin/united/united.css': '<%= path.dist %>src/skin/united/united.css'
					}
				]
			}
		}
	} );
	
	grunt.registerTask( 'publish', [ 'clean', 'copy', 'uglify', 'less', 'cssmin' ] );
	grunt.registerTask( 'default', [ 'publish' ] );
}