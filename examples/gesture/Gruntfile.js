
module.exports = function( grunt ) {

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-open' );
	grunt.loadNpmTasks( 'grunt-mocha' );

	grunt.initConfig( {

		// 경로 설정
		path: {
			src: 'src',
			dist: 'dist',
			test: 'test'
		},

		clean: {
			dist: '<%= path.dist %>'
		},

		cssmin: {
			dist: {
				expand: true,
				cwd: '<%= path.src %>/app',
				src: '**/*.css',
				dest: '<%= path.dist %>/app'
			}
		},

		uglify: {
			dist: {
				expand: true,
				cwd: '<%= path.src %>/app',
				src: '**/*.js',
				dest: '<%= path.dist %>/app'
			}
		},

		copy: {
			dist: {
				expand: true,
				cwd: '<%= path.src %>',
				src: [ 'cornerstone/**/*', '**/images/**/*', '**/fonts/**/*', '**/*.html', '**/*.template' ],
				dest: '<%= path.dist %>'
			}
		},

		connect: {
			options: {
				port: 9000,
				hostname: '*'
			},
			test: {
				// keepalive 옵션이 없으면 grunt task들이 모두 완료되면 서버가 종료된다.
				options: {
					base: '<%= path.test %>',
					middleware: function( connect, options ) {
						return [
							connect.static( options.base ),
							connect.directory( options.base )
						];
					}
				}
			},
			dist: {
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
				files: '<%= path.src %>/app/**/*.js',
				tasks: [ 'uglify' ]
			},
			styles: {
				files: '<%= path.src %>/app/**/*.css',
				tasks: [ 'cssmin' ]
			},
			rest: {
				files: [ '<%= path.src %>/cornerstone/**/*', '<%= path.src %>/**/images/**/*', '<%= path.src %>/**/fonts/**/*', '<%= path.src %>/**/*.html', '<%= path.src %>/**/*.template' ],
				tasks: [ 'copy' ]
			}
		},

		mocha: {
			all: {
				options: {
					run: true,
					urls: [ 'http://localhost:<%= connect.options.port %>/index.html' ]
				}
			}
		}
	} );

	grunt.registerTask( 'build', [ 'clean', 'cssmin', 'uglify', 'copy' ] );
	grunt.registerTask( 'test', [ 'build', 'connect:test', 'mocha' ] );
	grunt.registerTask( 'server', [ 'build', 'connect:dist', 'open', 'watch' ] );

	// Default task
	grunt.registerTask( 'default', [ 'build' ] );
};
