describe( 'Util Test', function () {

    var expect, jsonp, options;

    it( 'test init', function ( done ){
        require( [ 'chai' ], function ( chai ) {
            expect = chai.expect;
            expect( 1 ).to.be.equal( 1 );
            done();
        } );
    } );

    it( 'jsonp 요청시 성공했을 때 success 함수가 수행되어야 한다.', function ( done ) {
        require( [ 'jsonp' ], function ( Jsonp ) {
            jsonp = Jsonp;
            options = {
                url: 'http://api.flickr.com/services/feeds/photos_public.gne',
                data: {
                    tags: "cat",
                    tagmode: "any",
                    format: "json"
                },
                success: function ( data ){
                    expect( data ).to.be.not.undefined;
                    $.each( data.items, function( i, item ) {
                        $( '<img/>' ).attr( 'src', item.media.m ).appendTo( '#images' );
                        if ( i == 3 ) {
                            done();
                            return false;
                        } 
                    } );
                },
                error: function () {
                    alert( 'error' );
                },
                callback: 'jsonFlickrFeed',
                timeout: 5000
            };
            jsonp.get( options );
        } );
    } );

    it( 'jsonp 요청 실패시 ( timeout ) error 함수가 수행되어야 한다.', function ( done ) {
        this.timeout( 2000 );
        jsonp.get( {
            url: 'http://api.flickr.com/services/feeds/photos_public11.gne',
            data: {
                tags: "cat",
                tagmode: "any",
                format: "json"
            },
            success: function ( data ){
                expect( data ).to.be.not.undefined;
                $.each( data.items, function( i, item ) {
                    $( '<img/>' ).attr( 'src', item.media.m ).appendTo( '#images' );
                    if ( i == 3 ) {
                        return false;
                    } 
                } );
            },
            error: function ( jqXHR, textStatus, errorThrown ) {
                expect( jqXHR ).to.be.not.undefined;
                expect( textStatus ).to.be.equal( 'timeout' );
                done();
            },
            callback: 'jsonFlickrFeed',
            timeout: 1000
        } );
    } );
} );
