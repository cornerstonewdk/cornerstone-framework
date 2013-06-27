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
						'!<%= path.source %>theme/**' 
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
		}
	} );
	
	// 향후 cornerstone.less 가 1.4 기준으로 작성시 아래 주석된 녀석을 사용한다. less설정에 test1~3은 지워질 예정
	// grunt.registerTask( 'build', [ 'clean', 'createDir', 'copy', 'concat', 'less', 'uglify', 'cssmin' ] );
	grunt.registerTask( 'build', [ 'clean', 'copy', 'uglify' ] );
	grunt.registerTask( 'default', [ 'build' ] );
}