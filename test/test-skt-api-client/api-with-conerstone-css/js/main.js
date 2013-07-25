require.config({
    paths:{ // path naming
        // Libs
        "jquery":"../../../../../dist/lib/jquery-1.10.2.min",
        "bootstrap": "../../../../../dist/lib/bootstrap/js/bootstrap.min",
        "SKT": "skt-css"
    },
    shim:{ // 외존성 설정
        "bootstrap": {
            deps:["jquery"],
            exports:"Bootstrap"
        },
        "SKT": {
            deps:["bootstrap"],
            exports: "SKT"
        }
    }
});

require( ['SKT'], function ( sk ) {
    var client_auth_token = undefined;
    var paymentFlag = false;

    $( '#redirectUri' ).val( 'http://61.250.22.139/cornertest/test-skt-api-client/api-with-conerstone-css/client_redirect.html' );

    $( 'ul > li' ).on( 'click', function () {
        var name = $( this ).attr( 'name' );
        $( 'ul > li' ).removeClass( 'active' );
        $( this ).addClass( 'active' );
        $( 'div.innerDiv' ).css( { "display": "none" } );
        $( 'div.innerDiv[name=' + name + ']' ).css( { "display": "inline" } );
    } );

    $( '#payForm ul.dropdown-menu > li > a' ).bind( 'click', function ( evt ) {
        $( '#payForm [data-toggle=dropdown]' ).html( $( this ).html() );
        $( '#paymentDate' ).val( '' );
        // one-time or recurring
        if( $( this ).html() === 'one-time' || $( this ).html() === 'recurring' ){
            $( '#paymentDiv' ).hide();
            paymentFlag = false;
        } else {
            $( '#paymentDiv' ).show();
            paymentFlag = true;
        }
        $( '#payForm .btn-group.open' ).removeClass("open");
        return false;
    } );

    function bindAlert( add, msg ) {
        $( '.alert' ).removeClass( 'alert-error alert-success' ).addClass( add );
        $( '.alert strong' ).html( msg );
        $( '.alert .close' ).bind( 'click', function ( evt ){ 
            $(this).parent().hide();
        } );
        $( '.alert' ).show();
    }

    // redirect 페이지에서 하기 내역을 코딩해야한다.
    // parent.SKT.authSuccess( location );
    $( '#authForm' ).submit( function () {
        sk.authorize( { 
            clientId: $( '#clientId' ).val(), 
            redirectUri: $( '#redirectUri' ).val(),
            success: function ( token ) {
                client_auth_token = token;
                $( '#auth_status' ).html( 'authorized' ).removeClass( 'label-important' ).addClass( 'label-success');
                bindAlert( 'alert-success', 'token : ' + token );
            },
            error: function ( err ){
                bindAlert( 'alert-error', JSON.stringify( err ) );
            }
        } );
        return false;
    } );

    $( '#smsForm' ).submit( function () {
        sk.sendSms( {
            accessToken: client_auth_token,
            from: $( '#from' ).val(),
            to: $( '#to' ).val(),
            message: $( '#message' ).val(),
            success: function ( data ) {
                var str = '[ 수신데이터 ]\n' +
                          'result : ' + data.result + '\n' +
                          'resultCode : ' + data.resultCode + '\n' + 
                          'Message : ' + decodeURIComponent( data.message );
                bindAlert( 'alert-success', str );
            },
            error: function ( err ) {
                bindAlert( 'alert-error', JSON.stringify( err ) );
            }
        } );
        return false;
    } );

    // 과금 요청 예제
    $( '#payForm' ).submit( function () {
        var option = {
            accessToken: client_auth_token,
            type: $( '#payForm [data-toggle=dropdown]' ).html(),
            amount: $( '#amount' ).val(),
            to: $( '#user' ).val(),
            success: function ( data ) {
                var str = '[ 수신데이터 ]\n' +
                          'result : ' + data.result + '\n' +
                          'resultCode : ' + data.resultCode + '\n' + 
                          'Message : ' + decodeURIComponent( data.message );
                bindAlert( 'alert-success', str );
            },
            error: function ( err ) {
                bindAlert( 'alert-error', JSON.stringify( err ) );
            }
        };

        if( paymentFlag ){
            option.paymentDate = $( '#paymentDate' ).val();
        } 
        sk.pay( option );
        return false;
    } );
} );
