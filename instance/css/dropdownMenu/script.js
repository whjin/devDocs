$(function () {
    for (var c in vars = '0'.split(',')) {
        $('#menu_' + vars[c]).addClass('selected');
    }

    $('#wrap-nav ul.menu>li').hover(function () {
        $(this).find('.children').show();
        if ($(this).find('.children').length) {
            $(this).addClass('hover');
        }
    }, function () {
        $('.children').hide();
        $(this).removeClass('hover');
    });

    $('#wrap-nav ul.menu h3,#wrap-nav ul.menu ul.children>li,#wrap-cats h3').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    })
});