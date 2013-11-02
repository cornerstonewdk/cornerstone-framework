<!--
{
	"id": "f6",
	"title": "예제 만들기 2",
	"group": 1,
	"order": 21
}
-->

-----------------------

# 화면 이동시 전환 효과 주기  #

-----------------------

**MultipageRouter의 transitions 속성 설정**

	var MainRouter = Backbone.Router.extend( {

		// 화면 전환 효과
		transitions: {
			‘list-page:add-page’: { type: ‘slide’, duration: 2000 },
			‘list-page:detail-page’: ‘flip’
		}
	} );

**Data Attribute 사용 (우선적으로 적용)**

	<a href=“#add” class=“btn” data-transition=“slide”>추가</a>
	<a href=“#add” class=“btn” data-transition=“flip” data-duration=“1500”>추가</a>
	<button class=“btn” data-transition=“fade”>수정</button>

참고 : <http://cornerstone.sktelecom.com/2/livedoc/#14>
