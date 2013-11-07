
var marked = require( 'marked' );

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
			doc: '../../doc',
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
			src: {
				expand: true,
				cwd: '<%= path.src %>',
				src: [ 'cornerstone/**/*', '**/images/**/*', '**/fonts/**/*', '**/*.html', '**/*.template','data/*' ],
				dest: '<%= path.dist %>'
			},
			docImage: {
				expand: true,
				flatten: true,
				cwd: '<%= path.doc %>',
				src: [ '**/images/**/*' ],
				dest: '<%= path.dist %>/images'
			},
			docSample: {
				expand: true,
				flatten: true,
				cwd: '<%= path.doc %>',
				src: [ '**/sample/**/*' ],
				dest: '<%= path.dist %>/sample'
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
			docs: {
				files: '<%= path.doc %>/**/*.md',
				tasks: [ 'markdown' ]
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

	grunt.registerTask( 'markdown', 'markdown 파일들을 HTML 정보가 포함된 json 파일로 변환한다.', function() {

		// Markdown 파일 목록 구하기
		var files = grunt.file.expand( grunt.config.get( 'path.doc' ) + '/**/*.md' );
		var documents = [];

		for ( var i in files ) {
			// 파일의 내용을 읽어서
			var mdContent = grunt.file.read( files[ i ], { encoding: 'utf-8' } );
			try {
				// 메타데이터를 읽고
				var meta = JSON.parse( mdContent.match( /<!--([\s\S]+?)-->/ )[ 1 ] );
				// HTML로 변환 후
				meta[ 'content' ] = marked( mdContent );

				meta[ 'content' ] = meta[ 'content' ]
					.replace(/<table>/gi, '<table class="table table-striped table-hover table-responsive">');
				
				// 메타 정보와 함께 객체에 저장
				documents.push( meta );
			}
			catch( e ) {
				// 메타데이터가 없거나 JSON 형식이 아니면 Skip
			}
		}

		// 객체를 JSON 형식으로 파일에 저장한다.
		grunt.file.write( grunt.config.get( 'path.dist' ) + '/data/documents.json', JSON.stringify( documents ), { encoding: 'utf-8' } );
		grunt.log.ok();
	} );

	grunt.registerTask( 'build', [ 'clean', 'cssmin', 'uglify', 'markdown', 'copy' ] );
	grunt.registerTask( 'test', [ 'build', 'connect:test', 'mocha' ] );
	grunt.registerTask( 'server', [ 'build', 'connect:dist', 'open', 'watch' ] );

	// Default task
	grunt.registerTask( 'default', [ 'build' ] );
};
