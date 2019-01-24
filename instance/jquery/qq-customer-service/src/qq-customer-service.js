$(function () {
    var flag = 1;
    $('#rightArrow').click(function () {
        if (flag == 1) {
            $('#floatDivBox').animate({right: '-175px'}, 300);
            $(this).animate({right: '-5px'}, 300);
            $(this).css('background-position', '-50px 0');
            flag = 0;
        } else {
            $('#floatDivBox').animate({right: '0'}, 300);
            $(this).animate({right: '170px'}, 300);
            $(this).css('background-position', '0 0');
            flag = 1;
        }
    })
});