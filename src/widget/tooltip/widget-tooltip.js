(function () {
    /*
     Tooltip : DATA-API 방식을 추가함.
     */
	var Tooltip;

	function Tooltip() {
	}

	Tooltip = $.fn.tooltip.Constructor;

	/* 확장 코딩 */

	$.fn.tooltip.Constructor = Tooltip;

	/*
	 DATA API 기능 추가 예정
	 */
	$(function () {
		$('[data-toggle=popover]').each(function (i) {
			$(this).tooltip({
				selector:"[rel=tooltip]"
			});
		});
	});


}).call(this);