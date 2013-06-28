(function () {
	/*
	 Popover : DATA-API 방식을 추가함.
	 */
	this.Popover = (function () {
		var Popover;

		function Popover() {
		}

		Popover = $.fn.popover.Constructor;

		/* 확장 코딩 */
		$.fn.popover.Constructor = Popover;

		/*
		 DATA API 기능 추가 예정
		 */
		$(function () {
			$('[data-toggle=popover]').each(function () {
				$(this).popover();
			});
		});
	})();


}).call(this);