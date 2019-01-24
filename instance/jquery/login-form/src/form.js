$(function () {
    $("#btn").click(function () {
        if ($('#name').val() == '') {
            alert("请输入用户名");
        } else {
            $('#sp1').html('');
        }
        if ($('#password').val() == '') {
            alert("请输入密码");
        } else {
            $('#sp2').html('');
        }
    });
    $('input').change(function () {
        if ($('#name').val() == '') {
            alert("请输入用户名");
        } else {
            $('#sp1').html('');
        }
        if ($('#password').val() == '') {
            alert("请输入密码");
        } else {
            $('#sp2').html('');
        }
    })
});