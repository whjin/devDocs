(function () {

    //---------------------------------------------------初始化
    var scWidth = document.documentElement.clientWidth;
    var scHeight = document.documentElement.clientHeight;
    var $contentsTablistWrap = document.getElementsByClassName("contents-tablist-wrap");
    for (var i = 0; i < $contentsTablistWrap.length; i++) {
        $contentsTablistWrap[i].style.width = scWidth + "px";
        $contentsTablistWrap[i].style.height = scHeight + "px";
        $contentsTablistWrap[i].style.minHeight = scHeight + "px";
    }

    //---------------------------------------------------页面切换
    var $contents = document.getElementsByClassName("contents")[0];
    var pageSlide = new PAGESHOW($contents);

    //---------------------------------------------------导航
    var $fixedNav = document.getElementsByClassName("fixed-nav")[0];
    var $itemNavInner = $fixedNav.getElementsByClassName("item-nav-inner")[0];
    var $navLi = $itemNavInner.getElementsByTagName("li");
    $fixedNav.getElementsByClassName("btn-up")[0].onclick = function () {
        //打开
        $itemNavInner.style.height = "1.5rem";
        $fixedNav.className = "fixed-nav fixed-nav-more";
    };
    $fixedNav.getElementsByClassName("btn-down")[0].onclick = function () {
        //关闭
        $itemNavInner.style.height = "0.82rem";
        $fixedNav.className = "fixed-nav";
    };
    //点击切换
    for (var i = 0; i < $navLi.length; i++) {
        $navLi[i].onclick = function () {
            for (var i = 0; i < $navLi.length; i++) {
                if ($navLi[i] === this) {
                    getNewsDate(i);
                    break;
                }
            }
        }
    }

    //---------------------------------------------------用户
    var $iconPersonal = document.getElementsByClassName("icon-personal")[0];
    var $accInner = document.getElementsByClassName("acc-inner")[0];
    var $bgfif = $accInner.getElementsByClassName("bgfif")[0];
    var $accMain = $accInner.getElementsByClassName("acc-main")[0];
    var $body = document.body;

    $iconPersonal.onclick = function () {
        $accInner.className = "acc-inner";
        $bgfif.style.opacity = "0.8";
        $bgfif.style.pointerEvents = "auto";
        $body.style.overflow = "hidden";
    };
    //阻止滑动
    $accMain.addEventListener('touchmove', function (event) {
        event.preventDefault();
        return false;
    }, false);
    //滑上即取消
    $bgfif.addEventListener('touchstart', function (event) {
        event.preventDefault();
        $accInner.className = "acc-inner acc-inner-hide";
        $bgfif.style.opacity = "0";
        $bgfif.style.pointerEvents = "none";
        $body.style.overflow = "visible";
    }, false);

    //---------------------------------------------------页面滚动 fixed
    var fixedNav_offsetTop = document.getElementsByClassName("fixed-nav")[0].offsetTop;
    window.onscroll = function () {
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        var $body = document.getElementsByTagName("body")[0];

        if (st >= fixedNav_offsetTop) {
            $body.className = "fixed-nav-css";
        } else {
            $body.className = "";
        }
    };

    //---------------------------------------------------获取新闻推荐
    getNewsDate(0);
})();


//===================================================【焦点图组件】
//构造函数
function SLIDESHOW(container, params) {
    this.dom = container; //焦点图元素
    this.pagination = params.pagination; //是否显示指示器
    this.loop = params.loop; //是否循环显示
    this.silderShow = this.dom.getElementsByClassName("slides")[0]; //焦点图容器
    this.btnWarp = this.dom.getElementsByClassName("btn")[0]; //指示器容器
    this.imgWidth = parseInt(this.dom.offsetWidth); //焦点图容器的宽度（移动的单位距离）
    this.imgNum = this.silderShow.getElementsByTagName("li").length; //焦点图的数量
    this.activeNum = 1; //指示器
    this.dataTransform = 0; //保存偏移值
    var $slides = this.silderShow; //焦点图容器
    var touchstart_x = 0; //滑动开始时的x坐标
    var touchstart_y = 0; //滑动开始时的y坐标
    var touchmoveX = 0; //滑动的x轴距离
    var touchmove_x = 0; //滑动时的x轴距离
    var touchmove_y = 0; //滑动时的y轴距离
    var touchend_x = 0; //滑动结束时的x坐标
    var moveSW = false; //是否滑动的开关
    var touchstart_time = 0; //滑动开始时的时间
    var touchend_time = 0; //滑动结束时的时间
    var touch_time = 0; //滑动耗时
    var sw = false; //如果滑动耗时在150毫秒以下，距离在60以上，切换焦点图
    var touch_fx = false; //根据起点和终点返回方向
    var t = this;

    //创建指示器
    if (!this.pagination) {
        this.btnWarp.style.display = "none";
    }
    var html = "";
    for (var i = 0; i < this.imgNum; i++) {
        html += "<li></li>";
    }
    this.btnWarp.innerHTML = "<ul>" + html + "</ul>";
    this.btnWarp.getElementsByTagName("li")[0].className = "active";

    //创建克隆DOM
    if (this.loop) {
        var sourceNode = this.silderShow.getElementsByTagName("li")[0]; // 获得被克隆的节点对象
        var clonedNode = sourceNode.cloneNode(true); // 克隆节点
        sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点
    }

    //滑动开始
    this.silderShow.addEventListener('touchstart', function (event) {

        //重置
        touch_time = 0;
        touchmoveX = 0;

        //阻止事件冒泡
        event.stopPropagation();

        //打开滑动的开关
        moveSW = true;

        //关闭过渡效果
        $slides.style.transitionDuration = "0s";

        //记录坐标
        touchstart_x = event.changedTouches[0].pageX;
        touchstart_y = event.changedTouches[0].pageY;

        //记录时间
        touchstart_time = new Date();

    }, false);

    //滑动中
    this.silderShow.addEventListener('touchmove', function (event) {

        //阻止事件冒泡
        event.stopPropagation();

        if (moveSW) {

            //记录坐标
            touchmove_x = event.changedTouches[0].pageX;
            touchmove_y = event.changedTouches[0].pageY;

            //每次滑动只获取一次
            if (!touch_fx) {
                //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右，0：未滑动
                touch_fx = getSlideDirection(touchstart_x, touchstart_y, touchmove_x, touchmove_y);
            }

            //左右滑动焦点图
            if (touch_fx === 3 || touch_fx === 4) {

                //阻止浏览器默认动作
                event.preventDefault();

                //滑动距离
                touchmoveX = parseInt(event.changedTouches[0].pageX) - parseInt(touchstart_x);
                var x = t.dataTransform + touchmoveX;
                $slides.style.transform = "translate3d(" + x + "px,0,0)";

                if (t.loop) {
                    //图片循环显示
                    //向前翻循环
                    if (x > 0 && x < 50) {
                        //重置到最后一张
                        t.dataTransform = t.imgWidth * t.imgNum * -1;
                    }

                    //向后翻循环
                    if (x < (t.imgWidth * t.imgNum * -1)) {
                        //重置到第一张
                        t.dataTransform = 0;
                    }
                }
            }

            //上下滚动页面
            else {
                moveSW = false;
            }
        }
    }, false);

    //滑动结束
    this.silderShow.addEventListener('touchend', function (event) {

        //阻止事件冒泡
        event.stopPropagation();

        //关闭滑动的开关
        moveSW = false;

        //删除获取的滑动方向
        touch_fx = false;

        //打开过度效果
        $slides.style.transitionDuration = "0.5s";

        //记录坐标
        touchend_x = event.changedTouches[0].pageX;

        //记录时间
        touchend_time = new Date();

        //记录滑动耗时
        touch_time = touchend_time.getTime() - touchstart_time.getTime();

        //如果滑动耗时在150毫秒以下，距离在60以上，切换焦点图
        if (touch_time <= 150 && Math.abs(touchmoveX) > 60) {
            sw = true;
        } else {
            sw = false;
        }

        //发送移动的数值
        t.domMove(touchmoveX, sw);

    }, false);
}

//焦点图容器的移动
SLIDESHOW.prototype.domMove = function (num, sw) {
    var moveNum;
    var index;
    var needWidth = this.imgWidth / 2;

    //滑动超过半个宽度，或有特殊指令，切换焦点图
    if (Math.abs(num) > needWidth || sw) {

        //上一个
        if (num > 0 && (this.loop ? true : this.activeNum > 1)) {
            //if(num > 0){
            moveNum = this.dataTransform + this.imgWidth * 1;
            this.moveAnimate(moveNum);
        }

        //下一个
        else if (num < 0 && (this.loop ? true : this.activeNum < this.imgNum)) {
            //else if(num < 0){
            moveNum = this.dataTransform + this.imgWidth * -1;
            this.moveAnimate(moveNum);
        }

        //不动
        else {
            this.moveAnimate(this.dataTransform);
        }

    } else {
        //不动
        this.moveAnimate(this.dataTransform);
    }
};

//焦点图的移动动画
SLIDESHOW.prototype.moveAnimate = function (moveNum) {

    //移动动画
    this.silderShow.style.transform = "translate3d(" + moveNum + "px,0,0)";
    this.dataTransform = moveNum;

    //当前下标值
    this.activeNum = Math.abs(this.dataTransform) / this.imgWidth + 1;

    //指示器动画
    var $btnLi = this.btnWarp.getElementsByTagName("li");
    for (var i = 0; i < $btnLi.length; i++) {
        $btnLi[i].className = "";
    }

    var showIndex = this.activeNum > this.imgNum ? 0 : this.activeNum - 1;
    $btnLi[showIndex].className = "active";
};


//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function getSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        //未滑动
        return result;
    }

    //返回滑动的角度
    var angle = Math.atan2(dy, dx) * 180 / Math.PI;

    if (angle >= -45 && angle < 45) {
        //向右
        result = 4;
    }

    else if (angle >= 45 && angle < 135) {
        //向上
        result = 1;
    }

    else if (angle >= -135 && angle < -45) {
        //向下
        result = 2;
    }

    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        //向左
        result = 3;
    }

    return result;
}


//===================================================【页面切换组件】
//构造函数
function PAGESHOW(dom) {
    this.dom = dom; //页面元素
    this.silderShow = this.dom.getElementsByClassName("contents-tablist")[0]; //页面容器
    this.touchDom = this.dom.getElementsByClassName("news-list")[0]; //滑动事件的容器
    this.imgWidth = parseInt(this.dom.offsetWidth); //页面容器的宽度（移动的单位距离）
    this.imgNum = this.silderShow.getElementsByClassName("contents-tablist-wrap").length; //页面的数量
    this.activeNum = 1; //指示器
    this.dataTransform = 0; //保存偏移值
    var $slides = this.silderShow; //焦点图容器
    var touchstart_x = 0; //滑动开始时的x坐标
    var touchmove_x = 0; //滑动的x轴距离
    var touchend_x = 0; //滑动结束时的x坐标
    var touchmoveX = 0; //滑动的x轴距离
    var moveSW = false; //是否计算滑动距离开关
    var touchstart_time = 0; //滑动开始时的时间
    var touchend_time = 0; //滑动结束时的时间
    var touch_time = 0; //滑动耗时
    var sw = false; //如果滑动耗时在150毫秒以下，距离在60以上，切换焦点图
    var touch_fx = false; //根据起点和终点返回方向
    var t = this;

    //滑动开始
    this.silderShow.addEventListener('touchstart', function (event) {

        //重置
        touch_time = 0;
        touchmoveX = 0;

        //记录当前x坐标，避免被导航切换页面影响 this.dataTransform 的值
        t.dataTransform = parseInt(t.silderShow.style.transform.split("(")[1].split(",")[0]);

        //阻止事件冒泡
        event.stopPropagation();

        //打开滑动的开关
        if (!document.getElementById("loading")) {
            moveSW = true;
        }

        //关闭过渡效果
        $slides.style.transitionDuration = "0s";

        //记录坐标
        touchstart_x = event.changedTouches[0].pageX;
        touchstart_y = event.changedTouches[0].pageY;

        //记录时间
        touchstart_time = new Date();
    }, false);

    //滑动中
    this.silderShow.addEventListener('touchmove', function (event) {

        //阻止事件冒泡
        event.stopPropagation();

        if (moveSW) {

            //记录坐标
            touchmove_x = event.changedTouches[0].pageX;
            touchmove_y = event.changedTouches[0].pageY;

            //每次滑动只获取一次
            if (!touch_fx) {
                //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右，0：未滑动
                touch_fx = getSlideDirection(touchstart_x, touchstart_y, touchmove_x, touchmove_y);
            }

            //左右滑动页面
            if (touch_fx === 3 || touch_fx === 4) {

                //阻止浏览器默认动作
                event.preventDefault();

                //滑动距离
                touchmoveX = parseInt(event.changedTouches[0].pageX) - parseInt(touchstart_x);
                var x = t.dataTransform + touchmoveX;
                $slides.style.transform = "translate3d(" + x + "px,0,0)";
            }

            //上下滚动页面
            else {
                moveSW = false;
            }
        }
    }, false);

    //滑动结束
    this.silderShow.addEventListener('touchend', function (event) {

        //阻止事件冒泡
        event.stopPropagation();

        //关闭滑动的开关
        moveSW = false;

        //删除获取的滑动方向
        touch_fx = false;

        //打开过度效果
        $slides.style.transitionDuration = "0.5s";

        //记录坐标
        touchend_x = event.changedTouches[0].pageX;

        //记录时间
        touchend_time = new Date();

        //记录滑动耗时
        touch_time = touchend_time.getTime() - touchstart_time.getTime();

        //如果滑动耗时在150毫秒以下，距离在60以上，切换页面
        if (touch_time <= 150 && Math.abs(touchmoveX) > 60) {
            sw = true;
        } else {
            sw = false;
        }

        //发送移动的数值
        t.domMove(touchmoveX, sw);

    }, false);
}

//页面容器的移动
PAGESHOW.prototype.domMove = function (num, sw) {
    var moveNum;
    var index;
    var needWidth = this.imgWidth / 2;

    //滑动超过半个宽度，或有特殊指令，切换页面
    if (Math.abs(num) > needWidth || sw) {

        //上一个
        if (num > 0 && this.activeNum > 1) {
            moveNum = this.dataTransform + this.imgWidth * 1;
            this.moveAnimate(moveNum);

        }

        //下一个
        else if (num < 0 && this.activeNum < this.imgNum) {
            moveNum = this.dataTransform + this.imgWidth * -1;
            this.moveAnimate(moveNum);
        }

        //不动
        else {
            this.moveAnimate(this.dataTransform);
        }

    } else {
        //不动
        this.moveAnimate(this.dataTransform);
    }
};

//页面的移动动画
PAGESHOW.prototype.moveAnimate = function (moveNum) {

    //移动动画
    this.silderShow.style.transform = "translate3d(" + moveNum + "px,0,0)";
    this.dataTransform = moveNum;

    //当前下标值
    this.activeNum = Math.abs(this.dataTransform) / this.imgWidth + 1;
    getNewsDate(this.activeNum - 1);
};


//===================================================【ajax】
function loadXMLDoc(options) {
    options = options || {};
    xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = function (data) {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 0 || xmlhttp.status === 200) {
                    options.success(eval("(" + xmlhttp.responseText + ")"));
                } else {
                    alert("XMLHTTP error，请刷新浏览器");
                }
            }
        };
        xmlhttp.open("get", options.url, true);
        xmlhttp.send(null);
    } else {
        alert("您的浏览器不支持 XMLHTTP");
    }
}

//===================================================【获取新闻数据】
var PAGE_ID;

function getNewsDate(index) {

    //指示器
    var $contentsTablist = document.getElementsByClassName("contents-tablist")[0];
    var $contentsTablistWrap = $contentsTablist.getElementsByClassName("contents-tablist-wrap");
    for (var i = 0; i < $contentsTablistWrap.length; i++) {
        $contentsTablistWrap[i].className = "contents-tablist-wrap";
    }
    $contentsTablistWrap[index].className = "contents-tablist-wrap tablist-active";
    var pageId = $contentsTablistWrap[index].id.split("_")[1];
    var $page = document.getElementById("wap_" + pageId);

    //切换导航
    var $itemNavList = document.getElementsByClassName("item-nav-list")[0];
    var $navLi = $itemNavList.getElementsByTagName("li");
    for (var i = 0; i < $navLi.length; i++) {
        $navLi[i].className = "";
        if ($navLi[i].getAttribute("data-id") == pageId) {
            $navLi[i].className = "active";
        }
    }

    //页面切换动画
    var pageWidth = parseInt($contentsTablistWrap[0].offsetWidth); //页面容器的宽度（移动的单位距离）
    $contentsTablist.style.transform = "translate3d(" + (pageWidth * index * -1) + "px,0,0)";

    //获取新闻数据
    if (PAGE_ID != pageId && !$page.getElementsByClassName("news-list")[0]) {

        //loading
        if (!document.getElementById("loading")) {
            var loadingDiv = document.createElement('div');
            loadingDiv.className = "loading-wrap";
            loadingDiv.id = "loading";
            $page.appendChild(loadingDiv);
            var $loading = document.getElementById("loading");
            $loading.innerHTML = '<div class="inner"><div class="loading"><div class="loading-icon iconfont"></div></div><div class="loadtext">正在加载更多</div></div>';
        }

        PAGE_ID = pageId;
        loadXMLDoc({
            url: "https://whjin.github.io/full-stack-development/instance/js/newsClient/json/" + pageId + ".json",
            success: function (json) {
                var html = "";

                //有焦点图
                if (json.slide) {
                    html += '<div class="head-slide"><ul class="slides">';
                    for (var i = 0; i < json.slide.length; i++) {
                        html += '<li><a href="#">';
                        html += '<img src="' + json.list[i].imgsrc + '"><div class="text"><span>' + json.slide[i].title + '</span></div>';
                        html += '</a></li>';
                    }
                    html += '</ul><div class="btn"></div></div>';
                }

                //新闻列表
                html += '<div class="news-list">';
                for (var i = 0; i < json.list.length; i++) {
                    html += '<section><a href="#">';
                    html += '<div class="content-img"><img src="' + json.list[i].imgsrc + '"></div>';
                    html += '<div class="content-val"><strong>' + json.list[i].title + '</strong>';
                    html += '<div class="article-desc-l"><span class="channel i-tag">新闻</span><cite class="time">5小时前</cite></div>';
                    html += '<div class="article-desc-r"><cite class="tie"><span class="iconfont"></span>' + json.list[i].priority + '</cite>';
                    html += '</div></div></a></section>';
                }
                html += '</div>';

                //插入DOM
                $page.removeChild(loadingDiv);
                $page.innerHTML = html;
                if (json.slide && json.slide.length > 1) {
                    var $headSlide = $page.getElementsByClassName("head-slide")[0];
                    var headSlide = new SLIDESHOW($headSlide, {

                        //是否显示指示器
                        pagination: true,

                        //是否循环显示
                        loop: true
                    });
                }
            }
        });
    }
}


//===================================================【是否移动端】
function isMobile() {
    var sw = false;
    var browser = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                linux: u.indexOf('linux') > -1, //加mobile和这个属性一起，可以判断uc浏览器
                wp7: (u.indexOf('WP7') > -1) || (u.indexOf('Windows Phone OS') > -1) //trident IE内核 并且包含WP7标示 windows phone7手机
            };
        }(),

        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    var userAgent = navigator.userAgent;

    if (browser.versions.ios || browser.versions.android) {
        sw = true;
    }

    return sw;
}