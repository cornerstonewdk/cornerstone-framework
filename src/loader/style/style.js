
define( [ 'jquery' ], function( $ ) {

	return {
		load: function( name, req, load, config ) {
		
			var url = req.toUrl( name + '.css' );
		
			// 로드가 완료되었을 경우
			function success() {
				load( url );
			}
			
			// 이미 link 태그가 존재하면
			if ( $( '' ).length ) {
				success();
				return;
			}
			
			var link = $( '<link rel="stylesheet" type="text/css" media="all" href="' + url + '"></link>' )[ 0 ];
			
			// 현재 브라우저 판별
			function detectBrowser( ua ) {

				ua = ua.toLowerCase();

				var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
					/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
					/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
					/(msie) ([\w.]+)/.exec( ua ) ||
					ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
					[];

				var matched = {
					browser: match[ 1 ] || '',
					version: match[ 2 ] || '0'
				};

				var browser = {};

				if ( matched.browser ) {
					browser[ matched.browser ] = true;
					browser.version = matched.version;
				}

				if ( browser.chrome )
					browser.webkit = true;
				else if ( browser.webkit )
					browser.safari = true;

				return browser;
			}

			var browser = detectBrowser( navigator.userAgent );

			// 스타일시트 로드가 완료되었음을 판단하는 방법이 브라우저마다 다르다.
			if ( browser.msie ) {
				link.onreadystatechange = function() {
					if ( link.readyState == 'loaded' || link.readyState == 'complete' )	{
						link.onreadystatechange = null;
						success();
					}
				};
			}
			else if ( browser.opera )
				link.onload = success;
			else {
			
				// 크로스도메인임을 판단하기 위해 hostname을 비교한다.
				var hostname = location.hostname.replace( 'www.', '' );
				var urlHostname = /http:/.test( url ) ? /^(\w+:)?\/\/([^\/?#]+)/.exec( url )[ 2 ] : hostname;
				
				// Mozilla에서 크로스도메인인 경우는 완료되었음을 판단하지 못하므로 바로 완료 처리한다.
				if ( browser.mozilla && hostname != urlHostname )
					success();
				else
					( function() {
						try {
							// 스타일시트가 완전히 로드되지 않았다면 오류가 발생한다.
							link.sheet.cssRules;
						}
						catch ( e ) {
							setTimeout( arguments.callee, 20 );
							return;
						}
						success();
					} )();
			}
			
			$( 'head' ).append( link );
		}	
	};
} );
