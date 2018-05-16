(function ($) {
    $.fn.accordion = function () {
        return this.each(function () {
            var dts = $(this).children('dt');
            dts.click(onClick);
            dts.each(reset);
        });

        function onClick() {
            $(this).siblings('dt').each(hide);
            $(this).next().slideDown('fast');
            return false;
        }

        function hide() {
            $(this).next().slideUp('fast');
        }

        function reset() {
            $(this).next().hide();
        }
    }
})(jQuery);

$(function () {
    $("dl#my-accordion").accordion();
});