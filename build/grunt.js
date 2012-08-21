/**
 * Cornerstone Framework Build
 */
module.exports = function( grunt ) {

	// 프로젝트 설정
	grunt.initConfig( {
		lint: {
			all: [ '../src/*.js' ]
		},
		qunit: {},
		concat: {},
		min: {}
	} );
	
	// 디폴트 task
	grunt.registerTask( 'default', 'lint qunit concat min' );
};
