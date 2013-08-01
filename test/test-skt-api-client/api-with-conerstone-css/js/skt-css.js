;( function ( $, window ) {

	if (typeof exports !== 'undefined') {
		Backbone = exports;
	} else {
		Backbone = window.Backbone = {};
	}

	// SKT 전역 객체 선언
	var SKT = window.SKT = { authFrame: undefined };
	// redirect 정보를 전달받을 객체 선언
	var SKT_AUTH;

	// 상수 선언
	// server url은 향후 https 프로토콜로 통신
	var SERVER_URL = 'http://cornerstone.sktelecom.com/';
	
	// 변수 선언
	var authorize_uri = SERVER_URL + '/oauth/authorize',
		sendSms_uri = SERVER_URL + '/sms',
		pay_uri = SERVER_URL + '/payment';

	// Authroize 생성자
	var Authorize = function ( options ) {
		this.options = options;
	};

	// SKT.authroize 함수 정의
	SKT.authorize = function ( options ) {
		SKT_AUTH = new Authorize( options );
		SKT_AUTH.init();
		return SKT_AUTH;
	};

	// redirectUri 에서 호출할 parent window 함수
	SKT.authSuccess = function ( loc ) {
		var access_token = loc.href.match(/access_token=(.*)&/)[1];

		// iframe유무 확인 후 iframe 제거
		if( $( '#' + SKT.authFrame ) ){
			//$( '#' + SKT.authFrame ).remove();
			// bootstrap modal 사용시
			$( '#btnModalClose' ).trigger( 'click' );
			SKT.authFrame = undefined;
			$( window ).off( 'resize' );
		} 

		// 옵션으로 넘어온 사용자 정의 success 함수 실행
		if( !access_token ){
			SKT_AUTH.options.error( { "result": "fail", "resultCode": "1", "message": "access_token is not valid." } );	
			return false;
		}
		SKT_AUTH.success( decodeURIComponent( access_token ) );	
	};

	Authorize.prototype = {
		defaults: {
			client_id: undefined,
			redirect_uri: undefined,
			response_type: 'token'
		},
		init: function () {

			var def = [ 'clientId', 'redirectUri' ];

			if( requireAttrCheck( this.options, def ) ) return false;

			// 생성시 넘어온 options로 opt를 만든다.
			var opt = {
				client_id: this.options.clientId, 
				redirect_uri: encodeURI( this.options.redirectUri ),
			};

			// Authorize.success 를 override 한다.
			this.success = this.options.success;

			$.extend( this.defaults, opt );

			// 동적 삽입용 iframe을 만든다. 이름 중복을 막기위해
			// id값에 숫자를 랜덤하게 만들어 붙여준다.

			// 윈도우 사이즈가 변화시 + 모바일 기기에서 어떻게 보이는지 확인이 필요

			/* iframe 화면 꽉 차게..
			if( !SKT.authFrame ){
				SKT.authFrame = 'skt_auth_iframe_' + Math.floor( Math.random() * 1000 ) + 1;
				var iframeClose = $( '<button>close</button>', {
					type: 'button',
				} ).css( {
					'left': '10px',
					'top': '10px',
					'position': 'absolute',
					'font-size': '15px'
				} ).addClass( 'btn btn-primary' );

				// iframeClose 버튼에 클릭발생시 iframe을 달아주고 resize 리스너
				iframeClose.on( 'click', function ( evt ) {
					$( '#' + SKT.authFrame ).remove();
					SKT.authFrame = undefined;
					$( window ).off( 'resize' );
				} );

				var iframeDiv = $( '<div></div>', { id: SKT.authFrame } ).css( {
					'z-index': '10000',
					'left': '0px',
					'top': '0px',
					'width': window.innerWidth + 'px',
					'height': window.innerHeight + 'px',
					'position': 'absolute',
					'background-color': 'gray'
					
				} );

				// 윈도우 창 사이즈가 변해도 iframe을 계속 화면에 가득차게 유지
				$( window ).on( 'resize', function ( event ) {
					iframeDiv.css( {
						'width': event.currentTarget.innerWidth + 'px',
						'height': event.currentTarget.innerHeight + 'px'
					} );
					iframe.css( {
						'width': event.currentTarget.innerWidth + 'px',
						'height': event.currentTarget.innerHeight + 'px'
					} );
				} );

				var iframe = $( '<iframe></iframe>', {
					src: authorize_uri + '?' + $.param( this.defaults )
				} ).css( {
					'width': window.innerWidth + 'px',
					'height': window.innerHeight + 'px',
					'background-color': 'gray'
				} );

				cons.log( 'iframe을 body에 append' );
				// 만들어진 iframe을 body에 심어준다.
				iframe.appendTo( iframeDiv );
				iframeClose.appendTo( iframeDiv );
				iframeDiv.appendTo( 'body' );
				$( '#myModal' ).modal( { show: true } );
			} else {
				$( '#' + SKT.authFrame ).attr( 'src', authorize_uri + '?' + $.param( this.defaults ) );
			}
			*/

			// bootstrap modal 사용
			if( !SKT.authFrame ){
				SKT.authFrame = 'skt_auth_iframe_' + Math.floor( Math.random() * 1000 ) + 1;
				var html = '<div class="modal hide fade" id="' + SKT.authFrame + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
							+ '<div class="modal-header">'
							+ '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
							+ '<h3 id="myModalLabel">SKT Open API</h3>'
							+ '</div>'
							+ '<div class="modal-body">'
							+ '</div>'
							+ '<div class="modal-footer">'
							+ '<button id="btnModalClose" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Close</button>'
							+ '</div>'
							+ '</div>';
				$( 'body' ).append( html );

				// 신규 테스트
				var iframe = $( '<iframe></iframe>', {
					src: authorize_uri + '?' + $.param( this.defaults )
					//src: 'http://prandy.iptime.org:9000/test?callback=test'
				} ).css( {
					'width': '400px',
					'height': '300px',
					'frameborder': '0'
				} );

				$( '#' + SKT.authFrame + ' div.modal-body' ).append( iframe );

				/* 원본
				$( '#' + SKT.authFrame + ' div.modal-body' ).append( $( '<iframe></iframe>', {
					src: authorize_uri + '?' + $.param( this.defaults )
					//src: 'http://prandy.iptime.org:9000/test'
				} ).css( {
					'width': '400px',
					'height': '300px',
					'frameborder': '0'
				} ) );
				*/

				
			} else {
				//$( '#' + SKT.authFrame ).attr( 'src', authorize_uri + '?' + $.param( this.defaults ) );
				$( '#' + SKT.authFrame +' iframe' ).attr( 'src', authorize_uri + '?' + $.param( this.defaults ) );
			}
			$( '#' + SKT.authFrame ).modal( { show: true } );
		},
		success: function () {
		}
	};

	function callbackHandler( data, handler ){
		handler ? handler( data ) : console.log( 'handler is not define' );
	}

	function requireAttrCheck( object, array ){
		var flag = false;
		for( var i in array ){
			if( !object[ array[i] ] ){
				callbackHandler( { "result": "fail", "resultCode": "1", "message": array[ i ] + " is require." }, object.error );
				flag = true;
			}
		}
		return flag;
	}

	SKT.sendSms = function ( options ) {
		var defaults = [ 'accessToken', 'from', 'to', 'message' ];

		// 넘어온 options값에서 필수 요소가 존재하는지 확인한다.
		if( requireAttrCheck( options, defaults ) ) return false;

		var params = {
			access_token: options.accessToken,
			from: options.from,
			to: options.to,
			message: encodeURIComponent( options.message )
		};

		$.ajax( {
            url: sendSms_uri,
            data: params,
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'success',
            timeout: options.timeout || 1000 * 5,
            success: function ( data ) {
            	if( data.resultCode == 1 )
            		callbackHandler( data, options.error );
            	else
            		callbackHandler( data, options.success );
            },
            error: function ( jqXHR, textStatus, errorThrown ) {
            	callbackHandler( { "result": "fail",
            					   "resultCode": "1",
            					   "message": "time out." }, options.error );
			}
        } );
	};

	SKT.pay = function ( options ) {
		
		var defaults = [ 'accessToken', 'type', 'amount', 'to' ];

		if( !( options.type === 'one-time' || options.type === 'recurring' ) )
			defaults.push( 'paymentDate' );

		// 넘어온 options값에서 필수 요소가 존재하는지 확인한다.
		if( requireAttrCheck( options, defaults ) ) return false;

		var params = {
			access_token: options.accessToken,
			type: options.type,
			amount: options.amount,
			payment_date: options.paymentDate,
			to: options.to
		};

		$.ajax( {
			url: pay_uri,
			data: params,
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'success',
			timeout: options.timeout || 1000 * 5,
			success: function ( data ) {
            	if( data.resultCode == 1 )
            		callbackHandler( data, options.error );
            	else
            		callbackHandler( data, options.success );
            },
            error: function ( jqXHR, textStatus, errorThrown ) {
            	callbackHandler( { "result": "fail",
            					   "resultCode": "1",
            					   "message": "time out." }, options.error );
			}
		} );
	}

} )( jQuery, window );