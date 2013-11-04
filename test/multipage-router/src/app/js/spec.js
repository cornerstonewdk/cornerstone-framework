describe( 'Multipage router data-api Test', function () {

    var expect;

    it( 'test init', function ( done ){
        require( [ 'chai' ], function ( chai ) {
            expect = chai.expect;
            expect( 1 ).to.be.equal( 1 );
            done();
        } );
    } );

    it( 'data api방식을 이용하요 page1 -> page2 전환이 되는지 확인한다.', function () {
    	$( '#page2' ).on( 'active', function ( e ) {
    		console.log( e );

    	} );

    	$( '#page1 .btn-group > a' ).click();
    } );
    
} );
