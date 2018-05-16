Date.prototype.format = function (fmt) {
    var timeObj = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),//季度
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in timeObj) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (timeObj[k]) : (("00" + timeObj[k]).substr(("" + timeObj[k]).length)));
        }
    }
    return fmt;
};

var vm = new Vue({
    data: {
        //用户评论
        comments: [
            {
                username: '张三',
                userImg: 'user02.jpg',
                words: '这历史可以啊，不错不错。呵呵！',
                like: 87,
                unLike: 53,
                time: '2017-11-28 00:46:11'
            }, {
                username: "李四",
                userImg: "user01.jpg",
                words: "吃饭去了啊。呵呵！",
                like: 23,
                unLike: 63,
                time: "2017-10-28 10:36:22"
            }, {
                username: "王五",
                userImg: "user03.jpg",
                words: "这评论可以。呵呵！",
                like: 27,
                unLike: 33,
                time: "2017-12-21 18:12:02"
            }
        ],
        //用户信息
        users: [
            {
                username: 'Lucy',
                password: "123456",
                userImg: 'user.jpg',
                words: "世界那么大我想去看看。"
            }, {
                username: "zyc",
                password: "123456",
                userImg: "user01.jpg",
                words: "雨过天晴的美好。"
            }, {
                username: "admin",
                password: "123456",
                userImg: "user02.jpg",
                words: "下大雨了，怎么办啊。"
            }
        ],
        //当前用户信息
        currentUser: {
            username: '',
            words: '',
            userImg: ''
        },
        loginStatus: false, //登录框显示或隐藏
        registerStatus: false, //注册框显示或隐藏
        userBarStatus: false, //用户信息栏显示或隐藏
        btnStatus: true //登录注册入口显示或隐藏
    },
    methods: {
        //点击登录
        showLogin() {
            var login = document.getElementById('login');
            login.reset();
            this.loginStatus = true;
            this.registerStatus = false;
        },
        //点击注册
        showRegister() {
            var register = document.getElementById('register');
            register.reset();
            this.loginStatus = false;
            this.registerStatus = true;
        },
        //退出登录
        loginOut() {
            //清空当前用户数据
            this.currentUser.username = "";
            this.currentUser.words = "";
            this.currentUser.userImg = "";
            alert("退出成功！");
            this.userBarStatus = false;
            //登录或注册入口显示
            this.btnStatus = true;
        },
        //登录遮罩层点击事件
        loginBoxClick() {
            this.loginStatus = false;
        },
        //注册遮罩层点击事件
        registerBoxClick() {
            this.registerStatus = false;
        },
        //点击登录或注册框阻止事件冒泡
        stopProp(e) {
            e = e || event;
            e.stopPropagation();
        },
        //点赞
        like(index) {
            this.comments[index].like++;
        },
        //点踩
        unLike(index) {
            this.comments[index].unLike++;
        },
        //登录
        login() {
            var username = $(".loginBox").find(".username").val(),
                pwd = $(".loginBox").find(".pwd").val(),
                flag = false;
            for (var i = 0, len = this.users.length; i < len; i++) {
                //判断用户名密码是否正确
                if (this.users[i].username === username && this.users[i].password === pwd) {
                    flag = true;
                    alert("登录成功！");
                    this.loginStatus = false;
                    this.userBarStatus = true;
                    this.currentUser.username = this.users[i].username;
                    this.currentUser.words = this.users[i].words;
                    this.currentUser.userImg = this.users[i].userImg;
                    this.btnStatus = false;
                    break;
                }
            }
            if (!flag) {
                alert("输入的账号或密码不正确！");
                var login = document.getElementById('login');
                login.reset();
            }
        },
        //注册
        register() {
            var obj = {},//存储用户账号密码
                flag = false,
                username = $(".registerBox").find(".username").val(),
                pwd = $(".registerBox").find(".pwd").val();
            for (var i = 0, len = this.users.length; i < len; i++) {
                if (this.users[i].username === username) {
                    flag = true;
                    alert("该用户名已经被注册！");
                    break;
                }
            }
            if (!flag) {
                if (username === "" || pwd === "") {
                    alert("账号和密码不能为空！");
                } else {
                    var randomNum = Math.floor(Math.random() * 5) + 1,
                        //随机生成头像
                        randomImg = "user0" + randomNum + ".jpg",
                        register = document.getElementById('register');
                    obj.username = username;
                    obj.password = pwd;
                    obj.words = "雅致寓于高阁渔舟唱晚，古典悠然；格调外发园林绿树萦绕，馥郁清香。";
                    obj.userImg = randomImg;
                    //添加用户信息到用户列表
                    this.users.push(obj);
                    alert("注册成功！");
                    this.userBarStatus = true;

                    //设置用户栏信息
                    this.currentUser.username = obj.username;
                    this.currentUser.words = obj.words;
                    this.currentUser.userImg = obj.userImg;
                    this.btnStatus = false;
                    //重置表单数据
                    register.reset();
                    this.registerStatus = false;
                }
            }
        },
        //编辑用户心情
        editUserWords() {
            var wordsObj = $(".commentBox").find(".userWord"),
                edit = wordsObj.attr("contenteditable");//获取元素的可编辑属性

            if (edit === 'false') {
                wordsObj.attr("contenteditable", "true");
            } else {
                for (var i = 0, len = this.users.length; i < len; i++) {
                    //查找对应用户名
                    if (this.users[i].username === this.currentUser.username) {
                        this.currentUser.words = $(".commentBox").find(".userWord").text();
                        this.users[i].words = this.currentUser.words;
                        wordsObj.attr("contenteditable", "false");
                        alert("保存成功！");
                    }
                }
            }
        },
        //提交评论
        submitComment() {
            if (!this.userBarStatus) {
                alert("登录之后才可以评论！");
                this.loginStatus = true;
            } else {
                if ($(".wordsBox textarea").val() === "") {
                    alert("请先填写评论内容！");
                } else {
                    var obj = {};
                    obj.username = this.currentUser.username;
                    obj.userImg = this.currentUser.userImg;
                    obj.words = $(".wordsBox textarea").val();
                    obj.like = 0;
                    obj.unLike = 0;
                    obj.time = new Date().format("yyyy-MM-dd hh:mm:ss");

                    this.comments.push(obj);
                    alert("评论成功！");
                    $(".wordsBox textarea").val("");
                }
            }
        }
    }
}).$mount('#comment');