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
            this.timeout( 1000 * 10 );
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
                timeout: 1000 * 10
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
                logging.debug( 'Debug 메시지를 로그에 남깁니다.' );
                expect( $( '#blackbird .mainBody li:last-child' ).hasClass( 'debug' ) ).to.be.false;
            } ).trigger( 'click' );
            setTimeout( function () {
                $( '#info-button' ).off( 'click' ).on( 'click', function () {
                    expect( $( '#blackbird .mainBody li:last-child' ).hasClass( 'info' ) ).to.be.true;
                    done();
                } ).trigger( 'click' );
            }, 1000 );
        } );
    } );

    describe( 'SKT Open API (과금)', function () {

        var auth_token;

        it( 'MVC Framework를 통해 비동기방식( AMD )으로 정상적으로 로드 되는지 확인', function ( done ) {
            require( [ 'skt' ], function () {
                expect( SKT ).to.be.not.undefined;
                skt = SKT;
                done();
            } );
        } );

        it( '서버에 요청 전 필수 요소에 대한 유효성 확인을 하는지 확인', function ( done ) {
            SKT.authorize( {
                redirectUri: 'http://www.sktelecom.com',
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
        
        // TODO 하기는 서버에 올라가 cross domain문제가 없을 시에만 테스트 가능
        it( '인증이 완료되었을 시 success 콜백 함수에 token이 전달되는지 확인', function ( done ) {
            this.timeout( 1000 * 10 );
            var $frame;
            SKT.authorize( {
                clientId: '7',
                redirectUri: 'http://cornerstone.sktelecom.com/2/test/util/client_redirect.html',
                success: function( token ) {
                    expect( token ).to.be.not.undefined;
                    expect( typeof token ).to.be.an( 'string' );
                    auth_token = token;
                    done();
                },
                error: function( err ) {
                }
            } );

            setTimeout( function () {
                $frame = $( '#' + SKT.authFrame + ' iframe' ).contents().find( 'body' );
                if( $frame.length > 0 ) {
                    $frame.find( 'input[name="username"]' ).val( 'test' );
                    $frame.find( 'input[name="password"]' ).val( '1111' );
                    $frame.find( 'input[type="submit"]' ).click();
                }                
                setTimeout( function () {
                    // iframe의 url이 바뀌면서 다시 $frame을 다시 정의한다.
                    $frame = $( '#' + SKT.authFrame + ' iframe' ).contents().find( 'body' );
                    $frame.find( 'button[name="allow"]' ).click();
                }, 2000 );
            }, 2000 );
        } );

        it( 'sms 발송 전 유효성 검사 확인', function ( done ) {
            SKT.sendSms( {
                success: function ( data ) {
                },
                error: function ( err ) {
                    expect( err ).to.be.not.undefined;
                    expect( err.result ).to.be.equal( 'fail' );
                    expect( parseInt( err.resultCode ) ).to.be.equal( 1 );
                    done();
                }
            } );
        } );

        it( 'sms 발송 후 success 함수 수행 확인', function ( done ) {
            SKT.sendSms( {
                accessToken: auth_token,
                from: '01112345678',
                to: '01012345678',
                message: 'test',
                success: function ( data ) {
                    expect( data ).to.be.not.undefined;
                    expect( data.result ).to.be.equal( 'success' );
                    expect( parseInt( data.resultCode ) ).to.be.equal( 0 );
                    expect( decodeURIComponent( data.message ) ).to.be.equal( '정상처리되었습니다' );
                    done();
                },
                error: function ( err ) {
                }
            } );
        } );

        it( '과금 요청 전 유효성 검사 확인', function ( done ) {
            var option = {
                success: function ( data ) {
                },
                error: function ( err ) {
                    expect( err ).to.be.not.undefined;
                    expect( err.result ).to.be.equal( 'fail' );
                    expect( parseInt( err.resultCode ) ).to.be.equal( 1 );
                    done();
                }
            };
            SKT.pay( option );
        } );

        it( '과금 요청 후 success 함수 수행 확인', function ( done ) {
            var option = {
                accessToken: auth_token,
                type: 'one-time',
                amount: 10000,
                to: '01012345678',
                success: function ( data ) {
                   expect( data ).to.be.not.undefined;
                    expect( data.result ).to.be.equal( 'success' );
                    expect( parseInt( data.resultCode ) ).to.be.equal( 0 );
                    done();
                },
                error: function ( err ) {
                }
            };
            SKT.pay( option );
        } );
    } );
} );
