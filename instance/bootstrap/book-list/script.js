$(function () {
    $('#booksfilter a').each(function (i) {

        $(this).click(function () {
            $(this).addClass('cur');
            $(this).parent().siblings().find('a').removeClass('cur');
            $('.booklist').eq(i).show();
            $('.booklist').eq(i).siblings().hide();
        })

    });
});
