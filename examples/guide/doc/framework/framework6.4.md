<!--
{
	"title": "데이터를 로컬 스토리지와 동기화하기",
	"group": 1,
	"order": 24
}
-->

-----------------------

# 데이터를 로컬 스토리지와 동기화하기  #

-----------------------

- 간단한 코드만으로 RESTful 서버를 브라우저의 로컬 스토리지로 대체
- 네트워크를 사용하지 않지만 데이터의 그룹을 구분하는 의미로 url은 필요
***
	require( [ ‘backbone’, ‘sync’ ], function( Backbone, Sync ) {

		Backbone.sync = Sync.local;
	} );

참고 : <http://cornerstone.sktelecom.com/livedoc/2_12_synchronization.html>
