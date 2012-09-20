require.config( {
    paths: { // path naming
        // Libs
        "jquery": "jquery-1.7.2.min",
        "jsonp": "jsonp"
    },
    shim: { // 외존성 설정
        "jsonp": {
            deps: ["jquery"],
            exports: "jsonp"
        }
    }
} );

require( [ 'jsonp' ], function ( Jsonp ) {
    $( '#btn1' ).click( function () {
        Jsonp.get( {
            url: 'http://api.flickr.com/services/feeds/photos_public.gne',
            data: {
                tags: "cat",
                tagmode: "any",
                format: "json"
            },
            success: function ( data ){
                $.each( data.items, function( i, item ) {
                    $( '<img/>' ).attr( 'src', item.media.m ).appendTo( '#images' );
                    if ( i == 3 ) return false;
                } );
            },
            error: function () {
                alert( 'error' );
            },
            callback: 'jsonFlickrFeed',
            timeout: 5000
        } );
    } );
} );