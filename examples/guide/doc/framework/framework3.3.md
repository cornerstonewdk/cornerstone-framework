<!--
{
	"title": "모듈 사용하기",
	"group": 1,
	"order": 9
}
-->

-----------------------

# 모듈 사용하기  #

-----------------------

**- require 함수 사용**  
**- 모듈이 필요한 시점에 load 되며, dependent 한 모듈들도 같이 load 된다.**  
**- 모듈 명은 launcher의 target을 기준으로 매핑된다.**


	require( [ ‘jquery’, ‘model/user’ ], function( $, User ) {

		// 함수의 argument로 전달된 모듈을 사용
		$( ‘.container’ ).css( … );

		new User();

	} );

참고 : <http://cornerstone.sktelecom.com/2/livedoc/#3>
