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
<form id="add-form" class="form-horizontal">
	<fieldset>
		<legend>사용자 추가</legend>
		<div class="control-group">
			<label class="control-label" for="name">이름</label>
			<div class="controls">
				<input type="text" class="input-xlarge" id="name" name="name" data-placement="right"/>
				<span class="help-inline"></span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="gender">성별</label>
			<div class="controls">
				<label class="radio"><input type="radio" name="gender" value="M" checked="checked"/> 남</label>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="gender">관심분야</label>
			<div class="controls">
				<label class="checkbox"><input type="checkbox" name="interest" value="1" data-placement="top"/> 영화</label>
				<span class="help-inline"></span>
			</div>
		</div>
		<div class="form-actions">
			<button type="submit" class="btn btn-primary">사용자 추가</button><a href="#list" class="btn">취소</a>
		</div>
	</fieldset>
</form>
```
