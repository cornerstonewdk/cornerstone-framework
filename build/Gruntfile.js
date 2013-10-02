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
		dist: '../dist/',
		repo: 'http://cornerstone.sktelecom.com/couchdb/repository'
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
						src: [ '<%= path.source %>style/bootstrap3/dist/js/*' ],
						dest: '<%= path.dist %>lib/bootstrap/js'
					},
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>style/bootstrap3/dist/css/*' ],
						dest: '<%= path.dist %>lib/bootstrap/css'
					},
					{
						expand: true, 
						src: [ 
							'<%= path.source %>**', 
							'!<%= path.source %>style/**',
							'<%= path.source %>style/**/package.json',
							'!<%= path.source %>style/bootstrap3/package.json',
							'!<%= path.source %>style/bootstrap3/**'
						],
						dest: '<%= path.dist %>src'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/images/',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/theme-dark/images'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/images/',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/theme-white/images'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/images/',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/theme-wireframe/images'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/images/',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/skin-cerulean/images'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/images/',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/skin-flatly/images'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/images/',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/skin-united/images'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/bootstrap3/fonts',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/skin-cerulean/fonts'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/bootstrap3/fonts',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/skin-flatly/fonts'
					},
					{
						expand: true,
						cwd: '<%= path.source %>style/bootstrap3/fonts',
						src: [ '**' ],
						dest: '<%= path.dist %>src/style/skin-united/fonts'
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
						'<%= path.dist %>src/style/skin-cerulean/cornerstone.css': '<%= path.source %>style/skin-cerulean/cornerstone.less'
					},
					{
						'<%= path.dist %>src/style/skin-flatly/cornerstone.css': '<%= path.source %>style/skin-flatly/cornerstone.less'
					},
					{
						'<%= path.dist %>src/style/skin-united/cornerstone.css': '<%= path.source %>style/skin-united/cornerstone.less'
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
						'<%= path.dist %>src/style/skin-cerulean/cornerstone.css': '<%= path.dist %>src/style/skin-cerulean/cornerstone.css'
					},
					{
						'<%= path.dist %>src/style/skin-flatly/cornerstone.css': '<%= path.dist %>src/style/skin-flatly/cornerstone.css'
					},
					{
						'<%= path.dist %>src/style/skin-united/cornerstone.css': '<%= path.dist %>src/style/skin-united/cornerstone.css'
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
		var done = this.async();
		var count = 0;

		grunt.util.async.whilst(
		    function () {	
		    	return count < packages.length; 
		    },
		    function ( callback ) {
		    	var child = cp.exec( 'jam publish ' + packages[ count ] + ' --force --repository ' + pathInfo.repo );

				child.stdin.setEncoding( 'utf-8' );
				child.stdout.pipe( process.stdout );

				child.stdout.on( 'data', function( chunk ) {
					if ( chunk.substr( -10 ) == 'Username: ' )
						child.stdin.write( admin.id + '\n' );
					else if ( chunk.substr( -10 ) == 'Password: ' )
						child.stdin.write( admin.pass + '\n' );
				} );
		        count++;
		        setTimeout( callback, 1000 );
		    },
		    function ( err ) {
		    	if ( err ) {
		    		console.log( err );
		    		throw err;
		    	}
		        done();
		    }
		);
	} );

	grunt.registerTask( 'publish', function ( arg1 ) {
		if ( arguments.length === 0 ) 
			grunt.task.run( [ 'findPackages', 'upload' ] );	
		else {
			
			var done = this.async();
			grunt.file.recurse( pathInfo.dist, function callback( abspath, rootdir, subdir, filename ) { 
				if ( filename == 'package.json' ) {
					
					var loaded = grunt.file.readJSON( abspath );
					
					if ( loaded.name === arg1 ) {

						var child = cp.exec( 'jam publish ' + rootdir + subdir + ' --force --repository ' + pathInfo.repo );

						child.stdin.setEncoding( 'utf-8' );
						child.stdout.pipe( process.stdout );

						child.stdout.on( 'data', function( chunk ) {
							if ( chunk.substr( -10 ) == 'Username: ' )
								child.stdin.write( admin.id + '\n' );
							else if ( chunk.substr( -10 ) == 'Password: ' )
								child.stdin.write( admin.pass + '\n' );
						} );

						setTimeout( function () {
							done();
						}, 1000 );
					}
				} 
			} );
		}
	} );

	grunt.registerTask( 'build', [ 'clean', 'copy', 'uglify', 'less', 'cssmin' ] );
	grunt.registerTask( 'default', [ 'build', 'publish' ] );
}