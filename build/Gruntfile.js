module.exports = function ( grunt ) {

	// load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	var packages = [];
	var admin = grunt.file.readJSON( 'admin.json' );
	var cp = require( 'child_process' );
	var pathInfo = {
		source: '../src/',
		lib: '../lib/',
		dist: '../grunt-dist/',
		repo: 'http://j4f.jnw.io/repository'
	};

	grunt.initConfig( {
		path: pathInfo,
		pkg: grunt.file.readJSON( 'package.json' ),
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
				files: [ 
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>src/style/bootstrap/docs/assets/js/bootstrap*.js' ],
						dest: '<%= path.dist %>lib/bootstrap'
					},
					{
						expand: true, 
						src: [ 
							'<%= path.source %>**', 
							'!<%= path.source %>style/**',
							'<%= path.source %>style/**/package.json',
							'!<%= path.source %>style/bootstrap3/package.json'
						],
						dest: '<%= path.dist %>src'
					},
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>style/images/**' ],
						dest: '<%= path.dist %>src/style/theme-dark/images'
					},
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>style/images/**' ],
						dest: '<%= path.dist %>src/style/theme-white/images'
					},
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>style/images/**' ],
						dest: '<%= path.dist %>src/style/theme-wireframe/images'
					},
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>style/images/**' ],
						dest: '<%= path.dist %>src/style/skin-cerulean/images'
					},
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>style/images/**' ],
						dest: '<%= path.dist %>src/style/skin-flatly/images'
					},
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>style/images/**' ],
						dest: '<%= path.dist %>src/style/skin-united/images'
					}
				]
			}
		},
		uglify: {
			options: {
				banner: grunt.file.read( './copyright.txt', { encoding: 'UTF-8' } )
			},
			minify: {
				files: [ {
					expand: true,
					src: [ '<%= path.dist %>src/**/*.js', '!<%= path.dist %>src/style/**/*.js' ]
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
		}
	} );

	grunt.registerTask( 'findPackages', function () {
		grunt.file.recurse( pathInfo.dist, function callback( abspath, rootdir, subdir, filename ) { 
			if ( filename == 'package.json' ) packages.push( rootdir + subdir );
		} );
	} );
	
	grunt.registerTask( 'upload', function () {
		this.async();
		packages.forEach( function ( packageDir ) {
			var child = cp.exec( 'jam publish ' + packageDir + ' --force --repository ' + pathInfo.repo );

			child.stdin.setEncoding( 'utf-8' );
			child.stdout.pipe( process.stdout );

			child.stdout.on( 'data', function( chunk ) {
				if ( chunk.substr( -10 ) == 'Username: ' )
					child.stdin.write( admin.id + '\n' );
				else if ( chunk.substr( -10 ) == 'Password: ' )
					child.stdin.write( admin.pass + '\n' );
			} );
		} );
	} );

	grunt.registerTask( 'test', [ 'findPackages', 'upload' ] );
	grunt.registerTask( 'publish', [ 'clean', 'copy', 'uglify', 'less', 'cssmin' ] );
	grunt.registerTask( 'default', [ 'publish' ] );
}