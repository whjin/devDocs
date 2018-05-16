jQuery(document).ready(function () {
    jQuery("#web_loading div").animate({width: "100%"}, 1000, function () {
        setTimeout(function () {
            jQuery("#web_loading div").fadeOut(500, function () {
                var obj = $('#note').show().get(0);
                jiggleit(obj);
            });
        }, 200);
    });
});
function jiggleit(obj) {
    var flag = 200000;
    while (flag) {
        setTimeout(function () {
            obj.style.top = ((parseInt(obj.style.top) == -1) ? 1 : -1) + 'px'
        }, 80);
        flag--;
    }

}
window.onload = function () {
    var oSpan = document.getElementsByTagName('span');
    var oNote = document.getElementById('note');
    for (var i = 0; i < oSpan.length; i++) {
        oSpan[i].timer = null;
        oSpan[i].onclick = function () {
            var objL = this.parentNode;
            var oLis = document.getElementsByTagName('li');
            if (objL.className == 'curr') {
                for (var i = 0; i < oLis.length; i++) {
                    oLis[i].className = '';
                    buffer(oLis[i], {'height': 40});
                }
                return;
            }
            resetHeight(this);
        };
    }
};
function resetHeight(obj) {
    var objL = obj.parentNode;
    var oLis = document.getElementsByTagName('li');
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = '';
        buffer(oLis[i], {'height': 40});
    }
    objL.className = 'curr';
    var tmp = objL.getElementsByTagName('p').length * 36 + 40;
    buffer(objL, {'height': tmp});
}