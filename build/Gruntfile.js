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
		dist: '../grunt-dist/',
		test: '../../../bootstrap-3.0.0-wip/less/' 
	};

	grunt.initConfig( {
		path: {
			source: pathInfo.source,
			lib: pathInfo.lib,
			dist: pathInfo.dist,
			test: pathInfo.test
		},
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			options: {
				force: true
			},
			build: [ '<%= path.dist %>' ]
		},
		copy: {
			lib: {
				files: [
					{ expand: true, src: [ '<%= path.lib %>**' ], dest: '<%= path.dist %>lib' }
				]
			},
			 ui: {
			 	files: [
			 		{
			 			expand: true,
		 				flatten: true,
		 				filter: 'isFile',
			 			src: [ 
			 				'<%= path.source %>ui/widget/featured/chart/widget-chart.js',
							'<%= path.source %>ui/widget/featured/chart/widget-chart.css',
							'<%= path.source %>ui/widget/featured/datatable/widget-datatable.js',
							'<%= path.source %>ui/widget/featured/datatable/widget-datatable.css',
							'<%= path.source %>ui/widget/featured/list-view/widget-listview.js',
							'<%= path.source %>ui/widget/featured/media/widget-media.js',
							'<%= path.source %>ui/widget/featured/media/widget-media.css',
							'<%= path.source %>ui/widget/featured/scroll-view/widget-scrollview.js',
							'<%= path.source %>ui/widget/featured/scroll-view/widget-scrollview.css',
							'<%= path.source %>ui/widget/featured/editor/widget-editor.js'
						],
						dest: '<%= path.dist %>ui/'
					}
				]
			},
			imgMedia: {
				files: [
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>ui/widget/featured/media/img/**' ],
						dest: '<%= path.dist %>ui/img/'
					}
				]
			},
			imgDarkTheme: {
				files: [
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>ui/theme/dark/img/**' ],
						dest: '<%= path.dist %>ui/theme/dark/img/'
					}
				]
			},
			imgWhiteTheme: {
				files: [
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>ui/theme/white/img/**' ],
						dest: '<%= path.dist %>ui/theme/white/img/'
					}
				]
			},
			imgWireframeTheme: {
				files: [
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [ '<%= path.source %>ui/theme/wireframe/img/**' ],
						dest: '<%= path.dist %>ui/theme/wireframe/img/'
					}
				]
			},
			readme: { 
				files: [ {
					src: [ './README.md' ],
					dest: '<%= path.dist %>'
				} ]
			}
		},
		concat: {
			// 이번에는 외부 라이브러리는 포함하지 않는다.
			deploy: {
				files: [
					// Plugin 파일 통합
					{
						src: [
							'<%= path.source %>ui/widget/plugins/plugin-cornerstone.js',
							'<%= path.source %>ui/widget/plugins/plugin-touch.js',
							'<%= path.source %>ui/widget/plugins/plugin-motioncaptcha.js',
							'<%= path.source %>ui/widget/plugins/plugin-rangeinput.js',
							'<%= path.source %>ui/widget/plugins/plugin-sign.js',
							'<%= path.source %>ui/widget/plugins/plugin-spinner.js',
							'<%= path.source %>ui/widget/plugins/plugin-datepicker.js'
						],
						dest: '<%= path.dist %>ui/widget-plugins.js'
					}
				]
			}
		},
		less: {
			test1: {
				files: {
					'<%= path.dist %>ui/theme/dark/css/cornerstone.css' : '<%= path.test %>bootstrap.less'
				}
			},
			test2: {
				files: {
					'<%= path.dist %>ui/theme/white/css/cornerstone.css' : '<%= path.test %>bootstrap.less'
				}
			},
			test3: {
				files: {
					'<%= path.dist %>ui/theme/wireframe/css/cornerstone.css' : '<%= path.test %>bootstrap.less'
				}
			}
			,
			// less 1.4 미만 컴파일 에러 떨어짐
			cplDarkTheme: {
				files: {
					'<%= path.dist %>ui/theme/dark/css/cornerstone.css': '<%= path.source %>ui/theme/dark/less/cornerstone.less'
				}
			},
			cplWhiteTheme: {
				files: {
					'<%= path.dist %>ui/theme/white/css/cornerstone.css': '<%= path.source %>ui/theme/white/less/cornerstone.less'
				}
			},
			cplWireframeTheme: {
				files: {
					'<%= path.dist %>ui/theme/wireframe/css/cornerstone.css': '<%= path.source %>ui/theme/wireframe/less/cornerstone.less',
				}
			}
		},
		uglify: {
			options: {
				banner: grunt.file.read( './copyright.txt', { encoding: 'UTF-8' } )
			},
			ui: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.dist %>ui/*.js', '!<%= path.dist %>lib/**'	],
					dest: '<%= path.dist %>ui/'
				} ]
			},
			root: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.source %>*.js' ],
					dest: '<%= path.dist %>'
				} ]
			},
			loader: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.source %>loader/**/*.js' ],
					dest: '<%= path.dist %>loader/'
				} ]
			},
			mvcModel: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.source %>mvc/model/**/*.js' ],
					dest: '<%= path.dist %>mvc/model/'
				} ]
			},
			mvcView: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.source %>mvc/view/**/*.js' ],
					dest: '<%= path.dist %>mvc/view/'
				} ]
			},
			mvcRouter: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.source %>mvc/router/**/*.js' ],
					dest: '<%= path.dist %>mvc/router/'
				} ]
			},
			util: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.source %>util/**/*.js' ],
					dest: '<%= path.dist %>util/'
				} ]
			}
		},
		cssmin: {
			options: {
				banner: grunt.file.read( './copyright.txt', { encoding: 'UTF-8' } )
			},
			widget: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.dist %>ui/widget-*.css' ],
					dest: '<%= path.dist %>ui/'
				} ]
			},
			darkTheme: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.dist %>ui/theme/dark/css/cornerstone.css' ],
					dest: '<%= path.dist %>ui/theme/dark/css/'
				} ]
			},
			whiteTheme: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.dist %>ui/theme/white/css/cornerstone.css' ],
					dest: '<%= path.dist %>ui/theme/white/css/'
				} ]
			},
			wireframeTheme: {
				files: [ {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [ '<%= path.dist %>ui/theme/wireframe/css/cornerstone.css' ],
					dest: '<%= path.dist %>ui/theme/wireframe/css/'
				} ]
			}
		}
	} );
	
	grunt.registerTask( 'createDir', function () {
		grunt.file.mkdir( pathInfo.dist + 'loader' );
		grunt.file.mkdir( pathInfo.dist + 'mvc/model' );
		grunt.file.mkdir( pathInfo.dist + 'mvc/view' );
		grunt.file.mkdir( pathInfo.dist + 'mvc/router' );
		grunt.file.mkdir( pathInfo.dist + 'ui' );
		grunt.file.mkdir( pathInfo.dist + 'ui/img' );
		grunt.file.mkdir( pathInfo.dist + 'ui/theme/dark/css' );
		grunt.file.mkdir( pathInfo.dist + 'ui/theme/white/css' );
		grunt.file.mkdir( pathInfo.dist + 'ui/theme/wireframe/css' );
		grunt.file.mkdir( pathInfo.dist + 'util' );
	} );

	// 향후 cornerstone.less 가 1.4 기준으로 작성시 아래 주석된 녀석을 사용한다. less설정에 test1~3은 지워질 예정
	// grunt.registerTask( 'build', [ 'clean', 'createDir', 'copy', 'concat', 'less', 'uglify', 'cssmin' ] );
	grunt.registerTask( 'build', [ 'clean', 'createDir', 'copy', 'concat', 'less:test1', 'less:test2', 'less:test3', 'uglify', 'cssmin' ] );
	grunt.registerTask( 'default', [ 'build' ] );
}