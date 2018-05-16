window.onload = function () {
    var select = 0;
    var timer = null;
    var imgTimer = null;
    var pic = document.getElementById('pic');
    var img = pic.getElementsByTagName('li');
    var menu = document.getElementById('menu');
    var menu_li = menu.getElementsByTagName('a');

    for (var i = 0; i < img.length; i++) {
        img[i].index = i;
        menu_li[i].index = i;
        menu_li[i].onmouseover = function () {
            clearInterval(timer);
            menuPlay(this.index);
        };
        menu_li[i].onmouseout = function () {
            imgPlay(this.index);
        }
    }
    imgPlay(1);

    function imgPlay(start) {
        clearInterval(imgTimer);
        var i = start;
        imgTimer = setInterval(function () {
            menuPlay(i);
            i++;
            if (i == img.length) {
                i = 0;
            }
        }, 3000);
    }

    function menuPlay(i) {
        clearInterval(timer);
        var target = -i * 490;
        menu_li[select].className = '';
        select = i;
        menu_li[select].className = 'select';
        timer = setInterval(function () {
            var speed = (target - pic.offsetLeft) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (pic.offsetLeft === target) {
                clearInterval(timer);
            } else {
                pic.style.left = pic.offsetLeft + speed + 'px';
            }
        }, 20);
    }
};