<!--
{
	"title": "화면 이동시 이벤트 처리하기",
	"group": 1,
	"order": 22
}
-->

-----------------------

# 화면 이동시 이벤트 처리하기  #

-----------------------

	var MainRouter = Backbone.Router.extend( {

		pages: {
			‘list-page’: {
				fragment: [ ‘’, ‘list’ ],
				el: ‘div#list’,
				render: function() {
				},
				active: function() {
				},
				inactive: function( nextPageId ) {
				}
			},
			‘add-page’: {
			},
			‘detail-page’: {
			}
		}
	} );

- render : 해당 페이지가 활성화되고 Transition이 일어나기 전에 실행됨
- active : Transition이 완료된 후에 실행됨
- inactive : 다른 페이지가 활성화될 경우에 해당 페이지의 render보다 먼저 실행됨

참고 : <http://cornerstone.sktelecom.com/livedoc/2_13_routing.html>
