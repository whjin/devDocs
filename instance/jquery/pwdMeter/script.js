$(function () {
    var pwd1 = $('#password1'),
        pwd2 = $('#password2'),
        email = $('#email'),
        form = $('#main form'),
        arrow = $('#main .arrow');

    $('#main .row input').val('');

    form.on('submit', function (e) {
        if ($('#main .row.success').length === $('#main .row').length) {
            alert("欢迎使用这个表单系统！");
            e.preventDefault();
        } else {
            e.preventDefault();
        }
    });

    email.on('blur', function () {
        if (!/^\S+@\S+\.\S+$/.test(email.val())) {
            email.parent().addClass('error').removeClass('success');
        } else {
            email.parent().removeClass('error').addClass('success');
        }
    });

    pwd1.complexify({
        minimumChars: 6,
        strengthScaleFactor: .7
    }, function (valid, complexify) {
        if (valid) {
            pwd2.removeAttr('disabled');
            pwd1.parent()
                .removeClass('error')
                .addClass('success');
        } else {
            pwd2.attr('disabled', 'true');
            pwd1.parent()
                .removeClass('success')
                .addClass('error');
        }

        var calculated = (complexify / 100) * 268 - 134,
            prop = 'rotate(' + (calculated) + 'deg)';

        arrow.css({
            '-moz-transform': prop,
            '-webkit-transform': prop,
            '-o-transform': prop,
            '-ms-transform': prop,
            'transform': prop
        })
    });

    pwd2.on('keydown input', function () {
        if (pwd2.val() === pwd1.val()) {
            pwd2.parent()
                .removeClass('error')
                .addClass('success');
        } else {
            pwd2.parent()
                .removeClass('success')
                .addClass('error');
        }
    })
});