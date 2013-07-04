
var cp = require( 'child_process' );

module.exports = function( grunt ) {

	// Publish
	grunt.registerTask( 'publish', 'cornerstone-cli를 npm에 배포한다.', function() {

		var done = this.async();

		var child = cp.exec( 'npm publish ../src --force', function( err, stdout, stderr ) {
			grunt.log.writeln( 'Published!' );
			grunt.log.ok();
			done();
		} );

		child.stdin.setEncoding( 'utf-8' );
		child.stdout.pipe( process.stdout );
		process.stdin.pipe( child.stdin );
	} );

	// Default task
	grunt.registerTask( 'default', [ 'publish' ] );
};
