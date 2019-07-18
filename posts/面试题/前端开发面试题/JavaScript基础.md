# JavaScript基础 #

- 介绍JS的基本数据类型

> `undefined`、`null`、`Boolean`、`number`、`string`
> ES6新增：`symbol`（创建唯一且不可变数据类型）

- 介绍JS有哪些内置对象？

> `Object`是JS中所有对象的父对象
> 数据封装类对象：`Object`、`Array`、`Boolean`、`Number`和`String`
> 其他对象：`Function`、`arguments`、`Math`、`Date`、`RegExp`、`Error`

- 写JS的基本规范

> 1、不在同一行声明多个变量
> 2、使用`===/!==`来比较`true/false`或者数值
> 3、使用对象字面量替代`new Array`
> 4、不使用全局函数
> 5、`switch`语句必须带有`default`分支
> 6、函数应该有返回值
> 7、`for`循环必须使用大括号
> 8、`if`语句必须使用大括号
> 9、`for-in`循环中的变量，应该使用`var`关键字明确限定作用域，从而避免作用域污染

- JS原型，原型链？有什么特点？

> 每个对象都会在其内部初始化一个属性，就是`prototype`（原型），当访问一个对象的属性时，如果这个对象内部不存在这个属性，就会去`prototype`里找这个属性，这个`prototype`又会有自己的`prototype`，如此反复，就是原型链的概念。

**关系**：
 
```
instance.constructor.prototype=instance.__proto__
```

> 特点：
> JS对象通过引用来传递，创建的每个新对象实体中并没有一份属于自己的原型副本。当修改原型时，与之相关的对象也会继承这一改变。

> 当需要一个属性时，JS引擎会先看当前对象中是否有这个属性，如果没有，就会查找它的`prototype`对象是否有这个属性，如此递推，一直检索到`Object`内建对象。

    function Func() {}
    Func.prototype.name = "Sean";
    Func.prototype.getInfo = function () {
        return this.name;
    };
    var person = new Func();//var person=Object.create(oldObject)
    console.log(person.getInfo());//Sean
    console.log(Func.prototype);//Object {name: "Sean"}
    
- JS有几种类型的值？画一下内存图？

> 栈：原始数据类型（`undefined`，`null`、`Boolean`、`number`、`string`）
> 堆：引用数据类型（对象、数组和函数）

> 两种类型的区别：存储位置不同
> 原始数据类型直接存储在栈中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
> 引用数据类型存储在堆中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；
> 引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解析器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

![](https://camo.githubusercontent.com/d1947e624a0444d1032a85800013df487adc5550/687474703a2f2f7777772e77337363686f6f6c2e636f6d2e636e2f692f63745f6a735f76616c75652e676966)

- 如何将字符串转化为数字，例如`12.3b`？

> `parseFloat('12.3b');`

- 如何将浮点数点左边的数每三位添加一个逗号，如`12000000.11`转化为`12,000,000.11`？

```
function commafy(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($1, $2) {
        return $2 + ',';
    })
}
```

- 如何实现数组的随机排序？

```
//方法一：
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function randSort(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var rand = parseInt(Math.random() * len);
        var temp = arr[rand];
        arr[rand] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
```

```
//方法二：
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function randSort(arr) {
    var mixedArray = [];
    while (arr.length > 0) {
        var randomIndex = parseInt(Math.random() * arr.length);
        mixedArray.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
    }
    return mixedArray;
}
```

```
//方法三：
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(function () {
    return Math.random() - 0.5;
});
```

- JS如何实现继承？

> 1、构造
> 2、原型
> 3、实例
> 4、拷贝

> 原型`prototype`机制或`apply`和`call`方法去实现比较简单，建议使用构造函数与原型混合方式。

    function Parent() {
        this.name = name;
    }
    function Child() {
        this.age = age;
    }
    Child.prototype = new Parent();//继承Parent，通过原型
    
- JS创建对象的方式？

> JS创建对象，就是使用内置对象或各种自定义对象，还可以使用`JSON`；
> 1、对象字面量`var person={firstname:"Mark",lastname:"Yun"}`
> 2、用`function`模拟无参数的构造函数

    function Person() {}
    var person = new Person();//定义一个function，如果使用new实例化，该function可以看作一个class
    person.name = "Mark";
    person.age = "25";
    person.word = function () {
        return person.name + 'hello'
    };

> 3、用`function`模拟参数构造函数来实现（用`this`关键字定义构造的上下文属性）

    function Pet(name, age, hobby) {
        this.name = name;//this作用域，当前对象
        this.age = age;
        this.hobby = hobby;
        this.eat = function () {
            return "我是" + this.name + "，我喜欢" + this.hobby + "，是个程序员。";
        }
    }
    var maidou = new Pet("麦兜", 25, "coding");//实例化、创建对象
    maidou.eat();//调用eat方法
    
> 4、用工厂方式来创建（内置对象）

    var mcDog = new Object();
    mcDog.name = "旺财";
    mcDog.age = 3;
    mcDog.work = function () {
        return mcDog.name + ',汪汪汪......';
    };
    mcDog.work();
    
> 5、用原型方式来创建

    function Dog() {}
    Dog.prototype.name = "旺财";
    Dog.prototype.eat = function () {
        return this.name = "是个吃货"
    };
    
> 6、用混合方式来创建

    function Car(name, price) {
        this.name = name;
        this.price = price;
    }
    
    Car.prototype.sell = function () {
        return "我是" + this.name + "，我现在卖" + this.price + "万元。";
    };
    var camry = new Car("凯美瑞", 27);
    
- JS作用域链？

> 全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节。
> 当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局函数，这种组织形式就是作用域链。

- 谈谈对`this`对象的理解？

> `this`总是指向函数的直接调用者；
> 如果有`new`关键字，`this`指向`new`出来的对象；
> 在事件中，`this`指向触发这个事件的对象，特殊的是IE中的`attachEvent`中的`this`总是指向全局对象`window`。

- `eval`的作用？

> 它的功能是把对应的字符串解析成JS代码并运行；
> 应该避免使用`eval`，不安全，非常耗性能（`2`次，一次解析成JS语句，一次执行）
> 由`JSON`字符串转换成`JSON`对象的时候可以用`eval`，`var obj=eval('('+str+')');`

- 什么是`window`对象？什么是`document`对象？

> `window`对象是指浏览器打开的窗口
> `document`对象时Document对象（HTML文档对象）的一个只读引用，`window`对象的一个属性。

- `null`、`undefined`的区别？

> `null`表示一个对象的值为**空**；
> `undefined`表示一个变量声明了，但是没有初始化（赋值）；

> `undefined`不是一个有效的`JSON`，而`null`是；
> `undefined`的类型（`typeof`）是`undefined`
> `null`的类型`typeof`是`object`

> JS将未赋值的变量默认设为`undefined`；
> JS从来不会将变量设为`null`。它是用来标明某个用`var`声明的变量时没有值。

> `typeof undefined;//undefined`
> `undefined`：是一个表示**无**的原始值或说表示**缺少值**，就是此处应该有一个值，但是还没有定义。

> `typeof null;//null`
> `null`：是一个对象（空对象，没有任何属性和方法）
> 作为函数的参数，表示该函数的参数不是对象；

> 注意：
> 在验证`null`时，一定要使用`===`，因为`==`无法区分`null`和`undefined`

    null == undefined;//true
    null === undefined;//false
    
> 写一个通用的事件侦听器函数

<p data-height="565" data-theme-id="0" data-slug-hash="bKjVvM" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="通用的事件侦听器函数" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/bKjVvM/">通用的事件侦听器函数</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

- `['1', '2', '3'].map(parseInt);`答案是多少？

> `['1', '2', '3'].map(parseInt);//[ 1, NaN, NaN ]`；
> `parseInt()`函数能解析一个字符串，并返回一个整数，需要两个参数（`val`、`radix`）；
> 其中`radix`表示要解析的数字的基数。（该值介于`2~36`之间，并且字符串中的数字不能大于`radix`才能正确返回数字结果值）；
> 此处`map`穿了`3`个（`element,index,array`），重写`parseInt`函数测试是否符合上面的规则。

    function parseInt(str, radix) {
        return str + '-' + radix;
    }
    var a = ['1', '2', '3'];
    console.log(a.map(parseInt));//[ '1-0', '2-1', '3-2' ]不能大于radix

> 因为二进制里面没有数字`3`，导致出现超范围的`radix`赋值和不合法的进制解析，才会返回`NaN`。

- 什么是事件？IE与火狐的事件机制有什么区别？如何组织冒泡？

> 1、在网页中的某个操作，例如点击一个按钮就会产生一个事件，可以被JS侦测到的行为。
> 2、事件处理机制：IE是事件冒泡、Firefox同时支持两种事件模型，也就是：捕获型事件和冒泡型事件；
> 3、`ev.stopPropation();`（旧IE的方法`ev.cancelBubble=true;`）

- 什么是**闭包（closure）**，为什么要使用它？

> 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见方式是一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量；
> 利用闭包可以突破作用域链，将函数内部的变量和方法传递到外部。

> **闭包的特性：**
> 1、函数内再嵌套函数；
> 2、内部函数可以引用外层的参数和变量；
> 3、参数和变量不会被垃圾回收机制回收

> `li`节点的`onclick`事件都能正确的弹出当前被点击的`li`索引

    var nodes = document.getElementsByTagName('li');
    for (var i = 0, len = nodes.length; i < len; i++) {
        nodes[i].onclick = (function (i) {
            return function () {
                console.log(i);
            }
        })(i)
    }

> 执行`sayNum()`后，`sayNum()`闭包内部变量依旧存在，而闭包内部的函数的变量不会存在；
> 使得JS的垃圾回收机制GC不会收回`sayNum()`所占用的资源，因为`sayNum()`的内部函数的执行需要依赖`sayNum()`中的变量。这是对闭包作用的非常直白的描述。

    function sayNum() {
        var num = 666;
        var sayLog = function () {
            console.log(num);
        };
        num++;
        return sayLog;
    }
    var sayLog = sayNum();
    sayLog();//667
    
- JS代码中的`use strict;`有什么作用？使用它区别是什么？

> `use strict`是一种ES6添加的（严格）运行模式，这种模式使得JS在更严格的条件下运行；

> 使JS编码更佳规范化的模式，消除JS语法的一些不合理、不严谨的地方，减少一些怪异行为。
> 默认支持的槽糕特性都会被禁用，比如不能使用`with`，也不能再意外的情况下给全局变量赋值；
> 全局变量的显示声明，函数必须声明在顶层，不允许再非函数代码块内声明函数，`arguments.callee`也不允许使用；
> 消除代码运行的一些不安全之处，保证代码运行的安全，限制函数中的`arguments`修改，严格模式下的`eval`函数的行为和非严格模式的也不相同。

> 提高编译器效率，增加运行速度；

- 如何判断一个对象是否属于某个类？

> 使用`instanceof`

    if (a instanceof Person) {
        console.log("yes");
    }
    
- 解释一下`new`操作符？

> 1、创建一个空对象，并且`this`变量引用该对象，同时还继承了该函数的原型；
> 2、属性和方法被加入到`this`引用的对象中；
> 3、新创建的对象由`this`所引用，并且最后隐式的返回`this`。

    var obj = {};
    obj.__proto__ = Base.prototype;
    Base.call(obj);
    
- JS中的`hasOwnProperty`函数，执行对象查找时不会去查找原型，详细解释一下？

> JS中`hasOwnProperty`函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。
> 此方法无法检查该对象的原型链中是否具有该属性；
> 该属性必须是对象本身的一个成员。

> 使用方法：
> `Object.hasOwnProperty(proName)`
> 其中参数`object`是必选项。一个对象的实例。
> `proName`是必选项。一个属性名称的字符串值。

> 如果`object`具有指定名称的属性，JS中`hasOwnproperty`函数方法返回`true`，反之则返回`false`。

- 说一下你对JSON的了解？

> `JSON`是一种轻量级的数据交换格式。
> 它是基于JS的一个子集。数据格式简单，易于读写，占用带宽小

> `JSON`字符串转换成`JSON`对象：

    var obj = eval('(' + str + ')');
    var obj = str.parseJSON();
    var obj = JSON.parse(str);
    
> `JSON`对象转换成`JSON`字符串：

    var last = obj.toJSONString();
    var last = JSON.stringify(obj);
    
- JS有哪些延迟加载的方式？

> `defer`和`async`、动态创建DOM方式（用得最多）、按需异步加载JS

- `Ajax`是什么？如何创建一个`Ajax`？

> 异步传输+JS+XML
> 异步：向服务器发送请求时，不必等待结果，而是可以同时做其他的事情，等到有了结果会自己根据设定进行后续操作；
> 与此同时，页面不会发生整体刷新，提供了用户体验。

> 1、创建`XMLHTTPRequest`对象，也就是创建一个异步调用对象；
> 2、创建一个新的HTTP请求，并指定该HTTP请求的方法、URL及验证信息；
> 3、设置响应HTTP请求状态变化的函数；
> 4、发送HTTP请求
> 5、获取异步调用返回的数据
> 6、使用JS和DOM实现局部刷新

- `Ajax`解决浏览器缓存问题？

> 1、在`ajax`发送请求前添加

    AjaxObj.setRequestHeader("IF-Modified-Since","0");
    
> 2、在`ajax`发送请求前添加

    AjaxObj.setRequestHeader("Cache-Control", "no-cache");
    
> 3、在URL后面添加一个随机数：`"fresh=" + Math.random();`    

> 4、在URL后面添加时间戳：`"nowtime=" + new Date().getTime();`

> 5、如果使用jQuery，则`$.ajaxSetup({cache: false});`。这样页面的所有`ajax`都会执行这条语句，不需要保存缓存记录。

- 同步和异步的区别？

> 同步：不同进程为协同完成某项工作，在先后次序上调整（通过**阻塞**，**唤醒**等方式）。

> 同步：浏览器访问服务器请求，页面刷新，重新发送请求，等待请求完成，页面刷新显示新内容，如此反复。
> 异步：浏览器访问服务器请求，操作页面，浏览器后端进行请求。等待请求完成，页面不刷新显示新内容。

- 如何解决跨域问题？

> `jsonp`、`iframe`、`window.name`、`window.postMessage`、服务器上设置代理页面

- `AMD`、`CMD`规范的却别？

> `AMD`异步模块定义，所有的模块将被异步加载，模块加载不影响后面语句运行。
> 所有依赖某些模块的语句都放置在回调函数中。

> 区别：
> 1、对于依赖的模块，AMD是提前执行，CMD是延迟执行。
> 2、CMD推崇依赖就近，AMD推崇依赖前置

    //AMD
    define(['./a', './b'], function (a, b) {//依赖必须一开始就写好
        a.doSomething();
        b.doSomething();
    });
    
    //CMD
    define(function (require, exports, module) {
        var a = require('./a');
        a.doSomething();
        var b = require('./b');//依赖可以就近写
        b.doSomething();
    });
    
- `document.write`和`innerHTML`的区别？

> `document.write`只能重绘整个页面
> `innerHTML`可以重绘页面的一部分

- `DOM`操作——添加、移除、移动、赋值、创建和查找节点？

> 1、创建新节点

    createDocumentFragment();//创建一个DOM片段
    createElement();//创建一个具体的元素
    createTextNode();//创建一个文本节点
    
> 2、添加、移除、替换、插入

    appendChild();//添加
    removeChild();//移除
    replaceChild();//替换
    insertBefore();//在已有的子节点前插入一个新的子节点
    
> 3、查找

    getElementsByTagName();//通过标签名
    getElementsByName();//通过元素的Name属性的值（IE容错能力较强，会得到一个数组，其中包括id等于name值）
    getElementById();//通过元素id，唯一性

- `jquery.extend`和`jquery.fn.extend`的区别？

> `jquery.extend`为`jquery`类添加类方法，可以理解为添加静态方法
> `jquery.fn.extend`:
> 源码`jquery.fn=jquery.prototype`，对`jquery.fn`的扩展，就是为`jquery`类添加成员函数
> **使用**：
> `jquery.extend`扩展，需要通过`jquery`类调用，而`jquery.fn.extend`扩展，所有`jquery`实例都可以直接调用。

- 针对jQuery的优化方法？

> 基于`class`的选择器的性能相对于`id`选择器开销很大，因为需要遍历所有DOM元素。

> 频繁操作的DOM，先缓存起来再操作。用`jQuery`的链式调用更好。比如`var str=$("a").attr("href");`

> `for (var i = size, len = arr.length; i < len; i++) {}`

- 如何判断当前脚本运行在浏览器还是Node环境中？（阿里）

> `this === window ? 'browser' : 'node';`
> 通过判断`global`对象是否为`window`，如果不为`window`，当前脚本没有运行在浏览器中。

- 哪些操作会造成内存泄漏？

> 垃圾回收器定义扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为`0`（没有其他对象引用过该对象），或对该对象的唯一引用是循环的，那么该对象的内存即可回收。

> `setTimeout`的第一个参数使用字符串而非函数，会引发内存泄漏。
> 闭包、控制台日志、循环（两个对象彼此引用，且彼此保留时，就会产生一个循环）

- 用JS实现千位分隔符？

```
function commafy(num) {
    return num && num
        .toString()
        .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
            return $1 + ',';
        })
}
```
    
- 使用JS实现获取文件扩展名？

```
function getFileExtension(filename) {
    return filename.splice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
```

> `String.lastIndexOf()`方法返回指定值，在调用该方法的字符串中最后出现的位置，如果没找到则返回`-1`。
> 对于`filename`和`.hiddenfile`，`lastIndexOf`的返回值分别为`0`和`-1`。
> `String.prototype.splice()`从计算的索引提取文件的扩展名。如果索引比文件名的长度大，结果为`""`。

- webpack热更新实现原理？

> 1、`webpack`编译期，为需要热更新的`entry`注入热更新代码（`EventSource`通信）
> 2、页面首次打开后，服务端与客户端通过`EventSource`建立通信渠道，把下一次的`hash`返回前端
> 3、客户端获取到`hash`，这个`hash`将作为下一次请求服务端`hot-update.js`和`hot-update.json`的`hash`
> 4、修改页面代码，`webpack`监听到文件修改后，开始编译，编译完成后发送`build`消息给客户端
> 5、客户端获取到`hash`，成功后客户端构造`hot-update.js`的`script`链接，然后插入主文档
> 6、`hot-update.js`插入成功后，执行`hotAPI`的`createRecord`和`reload`方法，获取到组件的`render`方法，重新`render`组件，从而实现UI无刷新更新。

- 什么是`cookie`隔离？（请求资源的时候不要让它携带cookie）

> 如果静态文件都放在主域名下，静态文件请求的时都带有`cookie`的数据提交给`server`，非常浪费流量。

> 因为`cookie`有域的限制，因此不能跨域提交请求，所以使用非主要域名的时候，请求头中就不会带有`cookie`数据。
> 这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。
> 同时这种方式不会将`cookie`传入Web Server，也减少了Web Server对`cookie`的处理分析环节。
> 提高了webserver的HTTP请求的解析速度。