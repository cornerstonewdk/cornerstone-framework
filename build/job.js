
/**
 * Cornerstone Framework Build Job
 */
var fs = require( 'fs' );
var zlib = require( 'zlib' );
var wrench = require( 'wrench' );
var glob = require( 'glob' );
var colorize = require( 'colorize' );
var jsp = require( 'uglify-js' ).parser;
var pro = require( 'uglify-js' ).uglify;
var Step = require( 'step' );

const ENCODING = 'utf-8';

var log = exports.log = function( msg ) {
	msg ? colorize.console.log( msg ) : console.log();
};

var action = exports.action = function( action, file ) {
	colorize.console.log( '    - #cyan[(' + action + ')]: ' + file );
};

exports.mkdir = function( path ) {
	wrench.mkdirSyncRecursive( path );
	action( 'Created ', path );
};

exports.copy = function( src, dest ) {
	wrench.copyDirSyncRecursive( src, dest );
	action( 'Copied   ', src + ' => ' + dest );
};

exports.files = function( base, pattern ) {
	
	return {
	
		// pattern에 맞는 파일명 목록 (base 부분을 제외한다.)
		_files: glob( base + pattern, { sync: true } ).map( function( file ) {
			return file.substring( 0, base.length ) === base ? file.substring( base.length ) : file;
		} ),
		
		// 삭제
		delete: function() {
			this._files.forEach( function( file, index, array ) {
				action( 'Deleting', base + file );
				fs.lstatSync( base + file ).isDirectory() ? wrench.rmdirSyncRecursive( base + file ) : fs.unlinkSync( base + file );
				action( 'Deleted ', base + file );
			} );
		},
		
		// 최소화
		minify: function( dest ) {
			this._files.forEach( function( file, index, array ) {
				action( 'Minifying', base + file );
				var content = fs.readFileSync( base + file, ENCODING );
				var ast = jsp.parse( content );
				ast = pro.ast_mangle( ast );
				ast = pro.ast_squeeze( ast );
				fs.writeFileSync( dest + file, pro.gen_code( ast ), ENCODING );
				action( 'Minified ', dest + file );
			} );
		},
		
		// gzip 압축
		gzip: function( cb ) {
		
			var count = this._files.length;
			var failed = false;
			
			this._files.forEach( function( file, index, array ) {
				action( 'Gzipping', base + file );
				zlib.gzip( fs.readFileSync( base + file ), function( err, buffer ) {
				
					if ( failed )
						return;
					else if ( err ) {
						failed = true;
						cb( err );
						return;
					}
					
					fs.writeFileSync( base + file, buffer );
					
					action( 'Gzipped ', base + file + '.gzip' );
					
					if ( --count === 0 )
						cb();
				} );
			} );
		}
	};
};
