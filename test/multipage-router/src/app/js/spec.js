describe( 'Multipage router data-api Test', function () {

    var expect;

    it( 'test init', function ( done ){
        require( [ 'chai' ], function ( chai ) {
            expect = chai.expect;
            expect( 1 ).to.be.equal( 1 );
            done();
        } );
    } );

    it( 'data api방식을 이용하요 page1 -> page2 전환이 되는지 확인한다. 보여지는 페이지에 render -> active 순서로 발생하여야 한다.', function ( done ) {
    	$( '#page2' ).on( 'render', function ( e ) {
    		expect( e.type ).to.be.equal( 'render' );
    	} ).on( 'active', function ( e ) {
    		expect( e.type ).to.be.equal( 'active' );
    		done();
    	} );
    	$( '#page1 a.btn' ).click( function () {
    		location.href = '#page2';	
    	} ).trigger( 'click' );
    } );

    it( 'data api방식을 이용하요 page2 -> page1 history back 할때 전환이 되는지 확인한다. 숨겨지는 페이지에 inactive가 발생하여야 한다.', function ( done ) {
    	$( '#page2' ).on( 'inactive', function ( e ) {
    		expect( e.type ).to.be.equal( 'inactive' );
    		done();
    	} )
    	history.back();
    } );
    
} );
