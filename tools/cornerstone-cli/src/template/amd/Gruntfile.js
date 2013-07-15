
module.exports = function( grunt ) {

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-open' );

	grunt.initConfig( {

		// 경로 설정
		path: {
			src: 'src',
			dist: 'dist'
		},

		clean: {
			dist: '<%= path.dist %>'
		},

		cssmin: {
			dist: {
				expand: true,
				cwd: '<%= path.src %>/styles',
				src: '**/*.css',
				dest: '<%= path.dist %>/styles'
			}
		},

		uglify: {
			dist: {
				expand: true,
				cwd: '<%= path.src %>/scripts',
				src: '**/*.js',
				dest: '<%= path.dist %>/scripts'
			}
		},

		copy: {
			dist: {
				expand: true,
				cwd: '<%= path.src %>',
				src: [ 'cornerstone/**/*', 'images/**/*', 'styles/fonts/**/*', '**/*.html' ],
				dest: '<%= path.dist %>'
			}
		},

		connect: {
			options: {
				port: 9000,
				hostname: '*'
			},
			dist: {
				// keepalive 옵션이 없으면 grunt task들이 모두 완료되면 서버가 종료된다.
				options: {
					base: '<%= path.dist %>',
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
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: '<%= path.src %>/scripts/**/*.js',
				tasks: [ 'uglify' ]
			},
			styles: {
				files: '<%= path.src %>/styles/**/*.css',
				tasks: [ 'cssmin' ]
			},
			rest: {
				files: [ '<%= path.src %>/cornerstone/**/*', '<%= path.src %>/images/**/*', '<%= path.src %>/styles/fonts/**/*', '<%= path.src %>/**/*.html' ],
				tasks: [ 'copy' ]
			}
		}
	} );

	grunt.registerTask( 'build', [ 'clean', 'cssmin', 'uglify', 'copy' ] );
	grunt.registerTask( 'test', [ 'build', 'connect', 'mocha' ] );
	grunt.registerTask( 'server', [ 'build', 'connect:dist', 'open', 'watch' ] );

	// Default task
	grunt.registerTask( 'default', [ 'test', 'build' ] );
};
