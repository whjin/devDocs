# Vue基础 #

构造函数Vue的根实例`new Vue({})`，并启动Vue应用。

    var app = Vue({
        el: "#app",
        data: {},
        methods: {}
    });
    
变量`app`代表这个Vue实例。

其中，必不可少的选项是`el`，用于指定一个页面中已存在的DOM元素来挂载Vue实例，可以是`HTMLElement`，也可以是CSS选择器。

    var app = Vue({
        el: document.getElementById('app')
    });
        
挂载成功后，可以通过`app.$el`访问该元素。Vue提供了很多常用的实例属性和方法，都以`$`开头。

`data`选项用于声明应用内需要双向绑定的数据。建议所有会用到的数据都预先在`data`内声明，提升业务的可维护性。

Vue实例`new Vue({})`，这里可以使用`app`代理了`data`对象里的所有属性，可以这样访问`data`中的数据：

    console.log(app.name);
    
除了显式地声明数据外，还可以指向一个已有的变量，并且它们之间默认建立了双向绑定，当修改其中任意一个时，另一个也会跟着变化。

    var myData = {
        a: 1
    };
    
    var app = Vue({
        el: "#app",
        data: myData
    });
    
    app.a = 2;
    console.log(myData.a);//2
    myData.a = 3;
    console.log(app.a);//3
    
## 生命周期 ##

Vue的生命周期钩子：

- `created`：实例创建完成后调用，此阶段完成了数据的观测等，但未挂载，`$el`还不可用。（需要初始化处理一些数据时会比较有用）
- `mounted`：`el`挂载到实例上后调用，第一个业务逻辑会在这里开始。
- `beforeDestroy`：实例销毁之前调用。主要解绑一些使用`addEventListener`监听的事件等。

这些钩子与`el`和`data`类似，也是作为选项写入Vue实例中，并且钩子的`this`指向的是调用它的Vue实例。

## 插值与表达式 ##

使用（Mustache语法）`{{}}`是最基本的文本插值方法，它会自动将我们双向绑定的数据实时显示出来。

`v-html`直接输出HTML，而不是将数据解析后的纯文本。

    <div id="app">
    <span v-html="link"></span>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            link: '<a href="#">this is a link.</a>'
        }
    });

link的内容将会被渲染成一个`a`标签，而不是纯文本。

如果将用户产生的内容使用`v-html`输出后，有可能导致XSS攻击，所以要在服务端对用户提交的内容进行处理，一般可将`<>`转义。

如果想要显示`{{}}`标签，不进行替换，使用`v-pre`即可跳过这个元素和它的子元素的编译过程。

- 在`{{}}`中除了简单的绑定属性值外，还可以使用JavaScript表达式进行简单的运算、三元运算等。
- Vue只支持单个表达式，不支持语句和流程控制。
- 在表达式中不能使用用户自定义的全局变量，只能使用Vue白名单内的全局变量，例如`Math`和`Date`。

## 过滤器 ##

Vue.js支持在`{{}}`插值的尾部添加一个管道符`(|)`对数据进行过滤，经常用户格式化文本，比如**字母全部大写**、**货币千位使用逗号分隔**等。过滤的规则是自定义的，通过给Vue实例添加选项`filter`来设置。

    <div id="app">
        {{date | formatDate}}
    </div>

过滤器也可以串联，而且可以接收参数：

    <!--串联-->
    {{message | filterA | filterB}}
    
    <!--接收参数-->
    {{message | filterA('arg1','arg2')}}

过滤器应当用于处理简单的文本转换，如果要实现更为复杂的数据转换，应该使用计算属性。

## 指令事件 ##

指令（`Directives`）是Vue.js模板中最常用的一项功能，它带有前缀`v-`。指令的主要职责就是当其表达式的值改变时，相应地将某些行为应用到DOM上。

`v-bind`的基本用途是动态更新HTML元素上的属性，比如`id`、`class`等。

另一个非常重要的指令就是`v-on`，用来绑定事件监听器。

在普通元素上，`v-on`可以监听原生的DOM事件，除了`click`外还有`dbclick`、`keyup`、`mousemove`等。表达式可以是一个方法名，这些方法都写在Vue市里的`methods`属性内，并且是函数的形式，这些函数的`this`指向的是当前Vue实例本身，因此可以直接使用`this.xxx`的形式访问或修改数据。

Vue.js将`methods`里的方法进行代理，可以像访问Vue数据一样调用方法：

    <div id="app">
        <p v-if="show">这是一段为本</p>
        <button @click="handleClose">点击隐藏</button>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            show: true
        },
        methods: {
            handleClose: function () {
                this.close()
            },
            close: function () {
                this.show = false
            }
        }
    });

在`handleClose`方法中直接通过`this.close()`调用了`close()`函数。

    var app = new Vue({
        el: "#app",
        data: {
            show: true
        },
        methods: {
            init: function (text) {
                console.log(text);
            },
        },
        mounted: function () {
            this.init('在初始化时调用');
        }
    });
    app.init('通过外部调用');

## 语法糖 ##

语法糖是指在不影响功能的情况下，添加某种方法实现同样的效果，从而方便程序开发。

Vue.js的`v-bind`和`v-on`指令都提供了语法糖，也可以说是缩写，比如`v-bind`缩写成`:`，多用于`a`、`img`标签；`v-on`缩写成`@`，所用于`input`、`button`标签。
