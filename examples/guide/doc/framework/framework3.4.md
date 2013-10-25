<!--
{
	"title": "모듈 만들기",
	"group": 1,
	"order": 10
}
-->

-----------------------

# 모듈 만들기  #

-----------------------

**- define 함수 사용**  
**- 객체 또는 함수의 형태로 정의**  
**- 하나의 파일에 하나의 모듈 정의**  
**- 정의된 파일 이름과 파일이 존재하는 경로가 모듈의 이름이 된다.**

	define( [ ‘model/calculator’ ], function( calculator ) {

		// 나이 계산
		var age = calculator.calculateAge();

		return {
			name: ‘홍길동’,
			age: age,
			gender: ‘남‘
		};
	} );

참고 : <http://cornerstone.sktelecom.com/livedoc/2_02_module.html>
