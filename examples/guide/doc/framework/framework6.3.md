<!--
{
	"title": "데이터를 서버와 동기화하기",
	"group": 1,
	"order": 23
}
-->

-----------------------

# 데이터를 서버와 동기화하기  #

-----------------------

- Backbone.sync 사용
- 서버와 RESTful 한 통신을 주고 받음
- 데이터는 HTTP Body에 JSON 포맷으로 지정됨
- Model/Collection에 url 속성 지정

<table class="table table-bordered">
	<tr>
		<th>호출한 메소드</th>
		<th>HTTP Method</th>
		<th>URI Example</th>
	</tr>
	<tr>
		<td>Collection.fetch()</td>
		<td>GET</td>
		<td>/users</td>
	</tr>
	<tr>
		<td>Model.fetch()</td>
		<td>GET</td>
		<td>/users/1</td>
	</tr>
	<tr>
		<td>Model.save() (id가 없을 경우)</td>
		<td>POST</td>
		<td>/users</td>
	</tr>
	<tr>
		<td>Model.save() (id가 있을 경우)</td>
		<td>PUT</td>
		<td>/users/1</td>
	</tr>
	<tr>
		<td>Model.destroy()</td>
		<td>DELETE</td>
		<td>/users/1</td>
	</tr>
</table>

참고 : <http://cornerstone.sktelecom.com/livedoc/2_12_synchronization.html>
