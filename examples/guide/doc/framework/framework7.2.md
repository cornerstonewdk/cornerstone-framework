<!--
{
	"title": "모바일 제스처 사용하기",
	"group": 1,
	"order": 26
}
-->

-----------------------

# 모바일 제스처 사용하기  #

-----------------------

**GestureView를 확장해서 새로운 View를 정의**

	var ItemView = GestureView.extend( {

		el: ‘section#list-section tr[data-id]’,

		events: {
			‘doubletap’: ‘select’
		},

		select: function( event ) {
			location.href = ‘#detail/’ + $( event.target ).attr( ‘data-id’ );
		}
	} );

- events 정의 = ‘event [selector]’: ‘handler’
- 사용 가능한 제스처 이벤트 : tap, doubletap, hold, dragstart, drag, dragend, swipe, transformstart, transform, transformend, release

참고 : <http://cornerstone.sktelecom.com/livedoc/2_08_gesture.html>
