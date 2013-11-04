<!--
{
	"title": "Form Widget을 사용해서 화면 구성하기",
	"group": 1,
	"order": 19
}
-->

-----------------------

# Form Widget을 사용해서 화면 구성하기  #

-----------------------

```
<form id="add-form" class="form-horizontal" role="form">
	<legend>사용자 추가</legend>
	<div class="form-group">
		<label class="col-lg-2 col-md-2 col-sm-2 control-label" for="name">이름</label>
		<div class="col-lg-6 col-md-6 col-sm-6">
			<input type="text" class="form-control" id="name" name="name" data-placement="right"/>
			<span class="help-block"></span>
		</div>
	</div>
	<div class="form-group">
		<label class="col-lg-2 col-md-2 col-sm-2 control-label" for="name">성별</label>
		<div class="col-lg-6 col-md-6 col-sm-6">
			<label class="radio-inline"><input type="radio" name="gender" value="M" checked="checked"/> 남</label>
		</div>
	</div>
	<div class="form-group">
		<label class="col-lg-2 col-md-2 col-sm-2 control-label" for="name">관심분야</label>
		<div class="col-lg-6 col-md-6 col-sm-6">
			<label class="checkbox-inline"><input type="checkbox" name="interest" value="1" data-placement="top"/> 영화</label>
			<span class="help-block"></span>
		</div>
	</div>
	<button type="submit" class="btn btn-primary pull-right">사용자 추가</button>
</form>
```
