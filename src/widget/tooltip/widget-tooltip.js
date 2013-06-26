(function () {
    /*
     Tooltip : DATA-API 방식을 추가함.
     */
    this.Tooltip = (function () {
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
            $('[data-toggle="tooltip"]').tooltip({
                selector:"[rel=tooltip]"
            });
        });
    })();


}).call(this);