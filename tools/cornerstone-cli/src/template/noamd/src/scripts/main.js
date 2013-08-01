
/**
 * main.js
 * 애플리케이션 메인
 */

$( '#page1' ).on( 'render', function( event ) {
	$( this ).html(
		'<div class="panel panel-primary">' +
		'	<div class="panel-heading">Page 1</div>' +
		'	<p>첫번째 페이지 입니다.</p>' +
		'	<div class="btn-group">' +
		'		<a href="#page2" class="btn btn-success" data-transition="slide">다음</a>' +
		'	</div>' +
		'</div>'
	);
} );

$( '#page2' ).on( 'render', function( event ) {
	$( this ).html(
		'<div class="panel panel-primary">' +
		'	<div class="panel-heading">Page 2</div>' +
		'	<p>두번째 페이지 입니다.</p>' +
		'	<div class="btn-group">' +
		'		<a href="#page1" class="btn btn-success">이전</a>' +
		'		<a href="#page3" class="btn btn-success" data-transition="slide">다음</a>' +
		'	</div>' +
		'</div>'
	);
} );

$( '#page3' ).on( 'render', function( event ) {
	$( this ).html(
		'<div class="panel panel-primary">' +
		'	<div class="panel-heading">Page 3</div>' +
		'	<p>세번째 페이지 입니다.</p>' +
		'	<div class="btn-group">' +
		'		<a href="#page2" class="btn btn-success">이전</a>' +
		'	</div>' +
		'</div>'
	);
} );
