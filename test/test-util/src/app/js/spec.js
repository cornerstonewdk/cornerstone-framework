describe( 'Util Test', function () {

    var expect, jsonp, options, logging, skt;

    it( 'test init', function ( done ){
        require( [ 'chai' ], function ( chai ) {
            expect = chai.expect;
            expect( 1 ).to.be.equal( 1 );
            done();
        } );
    } );

    describe( 'jsonp', function () {
        it( 'MVC Framework를 통해 비동기방식( AMD )으로 정상적으로 로드 되는지 확인', function ( done ) {
            require( [ 'jsonp' ], function ( Jsonp ) {
                expect( Jsonp ).to.be.not.undefined;
                jsonp = Jsonp;
                done();
            } );
        } );

        it( 'jsonp 요청시 성공했을 때 success 함수가 수행되어야 한다.', function ( done ) {
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

        it( 'jsonp 요청 시 data 옵션 지정 후 요청 시 request query에 정상적으로 파라미터가 전달되는지 확인하고, 요청 실패시 ( timeout ) error 함수가 수행되어야 한다.', function ( done ) {
            this.timeout( 2000 );
            var time = new Date().getTime();
            jsonp.get( {
                url: 'http://api.flickr.com/services/feeds/photos_public11.gne',
                data: {
                    tags: "cat",
                    tagmode: "any",
                    format: "json"
                },
                beforeSend: function ( jqXHR, settings ) {
                    var sp = settings.url.split( '?' );
                    expect( sp.length > 0 ).to.be.true;
                    var arr = sp[1].split( '&' );
                    expect( arr.length > 0 ).to.be.true;
                    var sendData = {};
                    $.each( arr, function ( i, item ) {
                        var result = item.split( '=' );
                        sendData[ result[ 0 ] ] = result[ 1 ];
                        if( arr.length - 1 == i ) {
                            expect( sendData[ 'tags'] ).to.be.equal( 'cat' );
                            expect( sendData[ 'tagmode'] ).to.be.equal( 'any' );
                            expect( sendData[ 'format'] ).to.be.equal( 'json' );
                        }
                    } );
                    
                },
                success: function ( data ){
                    expect( data ).to.be.not.undefined;
                    $.each( data.items, function ( i, item ) {
                        $( '<img/>' ).attr( 'src', item.media.m ).appendTo( '#images' );
                        if ( i == 3 ) {
                            return false;
                        } 
                    } );
                },
                error: function ( jqXHR, textStatus, errorThrown ) {
                    expect( jqXHR ).to.be.not.undefined;
                    expect( textStatus ).to.be.equal( 'timeout' );
                    expect( new Date().getTime() - time ).to.be.below( 2000 );
                    done();
                },
                callback: 'jsonFlickrFeed',
                timeout: 1000
            } );
        } );
    } );

    describe( 'Logging', function () {
        it( 'MVC Framework를 통해 비동기방식( AMD )으로 정상적으로 로드 되는지 확인', function ( done ) {
            require( [ 'logging', 'jquery' ], function ( Logging, $ ) {
                expect( Logging ).to.be.not.undefined;
                expect( $( '#blackbird' ) ).to.be.not.undefined;
                logging = Logging;
                logging.config( {
                    defaultLevel: 'info',
                    debug: 'screen',
                    info: 'screen',
                    warn: 'screen',
                    error: 'screen',
                    time: 'screen'
                } );
                
                $( '#blackbird' ).css( { 'z-index': '10', 'margin': '70px 0 0 0' } );
                done();
            } );
        } );
        
        it( 'debug함수를 이용하여 디버그 메시지 로그가 남는지 확인', function ( done ) {
            $( '#debug-button' ).click( function() {
                logging.debug( 'Debug 메시지를 로그에 남깁니다.' );
                expect( $( '#blackbird .mainBody li:last-child' ).hasClass( $( this ).attr( 'id' ).split( '-' )[ 0 ] ) ).to.be.true;
                done();
            } ).trigger( 'click' );
        } );

        it( 'info함수를 이용하여 정보 메시지 로그가 남는지 확인', function ( done ) {
            $( '#info-button' ).click( function() {
                logging.info( 'Info 메시지를 로그에 남깁니다.' );
                expect( $( '#blackbird .mainBody li:last-child' ).hasClass( $( this ).attr( 'id' ).split( '-' )[ 0 ] ) ).to.be.true;
                done();
            } ).trigger( 'click' );
        } );

        it( 'warn함수를 이용하여 주의 메시지 로그가 남는지 확인', function ( done ) {
            $( '#warn-button' ).click( function() {
                logging.warn( 'Warn 메시지를 로그에 남깁니다.' );
                expect( $( '#blackbird .mainBody li:last-child' ).hasClass( $( this ).attr( 'id' ).split( '-' )[ 0 ] ) ).to.be.true;
                done();
            } ).trigger( 'click' );
        } );

        it( 'error함수를 이용하여 디버그 메시지 로그가 남는지 확인', function ( done ) {
            $( '#error-button' ).click( function() {
                logging.error( 'Error 메시지를 로그에 남깁니다.' );
                expect( $( '#blackbird .mainBody li:last-child' ).hasClass( $( this ).attr( 'id' ).split( '-' )[ 0 ] ) ).to.be.true;
                done();
            } ).trigger( 'click' );
        } );

        it( 'log함수를 이용하여 디버그 메시지 로그가 남는지 확인', function ( done ) {
            $( '#log-button' ).click( function() {
                logging.log( 'Log 메시지를 로그에 남깁니다.' );
                expect( $( '#blackbird .mainBody li:last-child' ).hasClass( 'info' ) ).to.be.true;
                done();
            } ).trigger( 'click' );
        } );

        it( 'timer함수를 이용하여 시간 경과값 메시지 로그가 (1000ms 이후 timeEnd 실행) 남는지 확인', function ( done ) {
            $( '#time-button' ).click( function() {
                var self = $( this );
                logging.time( 'timer1' );
                setTimeout( function () {
                    logging.timeEnd( 'timer1' );
                    var $lastChild = $( '#blackbird .mainBody li:last-child' );
                    var $preChild = $lastChild.prev();
                    var time = parseInt( $lastChild.text().split( ': ' )[1].replace( 'ms', '' ) );
                    expect( $lastChild.hasClass( 'profile' ) ).to.be.true;
                    expect( $preChild.hasClass( 'profile' ) ).to.be.true;
                    expect( time ).to.be.below( 2000 );
                    expect( time ).to.be.above( 1000 );
                    done();
                }, 1000 );
            } ).trigger( 'click' );
        } );

        it( 'config함수를 이용하여 메시지를 남길곳을 변경해 정상동작 하는지 확인( screen --> none )', function ( done ) {
            logging.config( {
                defaultLevel: 'info',
                debug: 'none',
                info: 'screen',
                warn: 'screen',
                error: 'screen',
                time: 'screen'
            } );
            $( '#debug-button' ).off( 'click' ).on( 'click', function () {
                logging.info( 'Info 메시지를 로그에 남깁니다.' );
                expect( $( '#blackbird .mainBody li:last-child' ).hasClass( 'profile' ) ).to.be.false;
            } ).trigger( 'click' );
            setTimeout( function () {
                $( '#info-button' ).off( 'click' ).on( 'click', function () {
                    expect( $( '#blackbird .mainBody li:last-child' ).hasClass( 'info' ) ).to.be.true;
                    done();
                } ).trigger( 'click' );
            }, 200 );
        } );
    } );

    describe( 'SKT Open API (과금)', function () {

        it( 'MVC Framework를 통해 비동기방식( AMD )으로 정상적으로 로드 되는지 확인', function ( done ) {
            require( [ 'skt' ], function () {
                expect( SKT ).to.be.not.undefined;
                skt = SKT;
                done();
            } );
        } );

        it( '서버에 요청 전 필수 요소에 대한 유효성 확인을 하는지 확인', function ( done ) {
            SKT.authorize( {
                redirectUri: 'http://www.naver.com',
                success: function( token ) {
                },
                error: function( err ) {
                    expect( err ).to.be.not.undefined;
                    expect( err.result ).to.be.equal( 'fail' );
                    expect( parseInt( err.resultCode ) ).to.be.equal( 1 );
                }
            } );

            setTimeout( function () {
                SKT.authorize( {
                    clientId: '4',
                    success: function( token ) {
                    },
                    error: function( err ) {
                        expect( err ).to.be.not.undefined;
                        expect( err.result ).to.be.equal( 'fail' );
                        expect( parseInt( err.resultCode ) ).to.be.equal( 1 );
                        done();
                    }
                } );
            }, 500 );
        } );

        it( '인증이 완료되었을 시 success 콜백 함수에 token이 전달되는지 확인', function ( done ) {
            this.timeout( 1000 * 10 );
            SKT.authorize( {
                clientId: '4',
                redirectUri: 'redirect.html',
                success: function( token ) {
                    expect( token ).to.be.not.undefined;
                    expect( typeof token ).to.be.an( 'string' );
                    done();
                },
                error: function( err ) {
                }
            } );
        } );
    } );
} );
