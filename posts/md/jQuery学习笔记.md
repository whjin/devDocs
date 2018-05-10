# jQuery学习笔记 #

jQuery大部分功能需要根据文档的DOM模型来工作，首先需要正确地解析到整个文档的DOM模型结构。使用jQuery需要在整个文档被浏览器完全加载后才开始进行。

    $(document).ready(function () {
        alert("Hello World!");
        $("p").click(function (event) {
            alert("Thanks for visiting!");
        })
    });

`$`是在jQuery中使用的变量名，可以使用`jQuery.noConflict()`避免冲突，它的返回值就是jQuery对象。

    jQuery.noConflict();
    $j = jQuery.noConflict();
    
**jQuery对象与DOM对象之间的转换**

使用`$()`得到的是一个jQuery对象。它封装了很多 DOM 对象的操作，但是它和 DOM 对象之间是不同的。只有当`obj`是一个DOM对象时才能使用`obj.innerHTML`；相应地，如果是jQuery对象应该使用 `obj.html()` 。

- 从 DOM 对象转到 jQuery 对象： `$(obj)` 
- 从 jQuery 对象转到 DOM 对象： `obj[0]`

比较正规地从 jQuery 对象到 DOM 的转换，是使用 jQuery 对象的 `get()` 方法：

    $(function () {
        $("li").get();
        $("li").get(0);
        $("li").get(-1);
    });
    
## jQuery选择器 ##

**1. 常规选择器**

- `$("*")` 选择所有节点
- `$("#id")` ID选择器，注意其中的一些特殊字符，如`.`
- `$(".class")` 类选择器
- `$("tag")` 标签选择器
- `$("子元素")` 
- `$("直接子元素")` 
- `:focus` 获取焦点元素
- `:first-child/:last-child` 选择第一个/最后一个元素 
- `:first/:last` 截取第一个/最后一个符合条件的元素
- `("pre+next")` 直接兄弟元素
- `("pre~siblings")` 兄弟元素
- `:nth-child()` 索引选择，索引从1开始
    - `:nth-child(odd)`
    - `:nth-child(even)`
    - `:nth-child(4n)`

**2. 属性选择器**

- `[name~="value"]` 属性中包括某单词  
- `[name="value"]` 属性完全等于指定值
- `[name!="value"]` 属性不等于指定值
- `[name]` 包括有指定属性的元素

**3. 控件选择器**

- `:checked` 选择所有被选中的元素
- `:selected` 被选择的元素
- `:disabled/:enabled` 选择被禁用/未禁用的元素
- `:hidden` 隐藏元素，不仅是`[type="hidden"]`，还有`displa:none`
- `:visible` 可见控件，`visibility:hidden`和`opacity:0`同样被认为是可见
- `:input :button :checkbox :file :image :password :radio :reset :submit :text` 具体控件，图像控件是`[type="image"]` 

**4. 其他选择器**

- `[name="value"] [name2="value2"]` 多个AND条件  
- `("selector1, selector2, selectorN")` 多个OR条件
- `:not()` 否定选择 
- `(':contains("text")')` 包含有指定内容的元素 
- `:eq() :lt() :gt() :even :odd` 列表索引选择（不支持负数）
- `(':has(selector)')` 符合条件的再次过滤
- `:header` 选择`h1,h2,h3...`标题元素
- `:only-child` 仅有一个子元素的元素
- `:empty` 空元素，即无内容也无元素
- `:parent` 非空元素

## 节点漫游 ##

**1. 调用链处理**

- `.add()` 向已有的节点序列中添加新的对象 
- `.andSelf()` 在调用链中，随时加入原始序列
- `.eq()` 指定索引选取节点，支持负数
- `.filter() .is() .not() .find() .first() .last() .has()` 序列选择
- `.end()` 节点回溯

```
$(function () {
    $('ul.first').find('.foo').css('background-color', 'red')
        .end().find('.bar').css('background-color', 'green');
});
```
    
**2. 子节点**

- `.children()` 所有的子节点，可加入过滤条件，`.children(selector)`

**3. 兄弟节点**

- `.siblings() .next() .nextAll() .nextUntil() .prevAll() .prevUntil() .closet()` 选择兄弟节点

**4. 父节点**

- `.parent() .parents() .parentUntil()` 父节点选择

## 元素控制 ##

**1. `attributes`和`properties`的区别**

- `attributes` 是XML结构中的属性节点 
    - `<div onload="prettyPrint()"></div>`
- `properties` 是DOM对象，对象属性
    - `$('body').get(0).tagName;`

**2. 类与属性控制**

- `.addCLass() .hasClass() .removeClass()` 添加一个类，判断是否有指定类，删除类

```
$('body').addClass('test');
$('body').addClass(function (index, current) {
    return current + 'new';
});
$('body').removeClass('test');
$('body').removeClass(function (index, current) {
    return current + ' ' + 'other';
});
```

- `.toggleClass()` 类的开关式转换

```
$('img').toggleClass(); //对所有类的开关
$('img').toggleClass('test'); //对指定类的开关
$('img').toggleClass(isTrue); //根据`isTrue`判断所有类的开关
$('img').toggleClass('test', isTrue); //根据`isTrue`判断指定类的开关

//同 `$('img').toggleClass('test');` 只是类名由函数返回
$('img').toggleClass(function (index, className, isTrue) {
    return 'name'
});

// `isTrue`作为函数的第三个参数传入
$('img').toggleClass(function (index, className, isTrue) {
    return 'name'
}, isTrue);
```

- `.attr()` 获取或设置一个属性值

```
// $("#greatphoto").attr('alt'); //获取属性`
$("#greatphoto").attr('alt', 'Shenzhen Brush Seller'); //设置属性`

// 同时设置多个属性
$('#greatphoto').attr({
    alt: 'Shen Brush Seller',
    title: 'photo by Kelly Clark'
});

//设置属性为函数返回值，函数的上下文为当前元素
$('#greatphoto').attr('title', function (i, val) {
    return val + ' - photo by Kelly Clark';
})
```

- `.prop()` 用法同`.attr()`，只是对象变成了`properties`
- `.removeAttr() .removeProp()` 删除属性
- `.val()` 设置或获取元素的表单值，通常用于表单元素

```
$('input').val();
$('input').val('other');
```

- `.html()` 设置或获取元素的节点`html`

```
$('div').html();
$('div').html('<div>测试</div>');
$('div').html(function (index, old) {
    return old + '<span>另外的内容</span>';
});
```

**3. 样式控制**

- `.css()` 获取或设置指定的CSS样式

```
$('body').css('background-color', 'red');
$('body').css('background-color', function (index, value) {
    return value + '1';
});
$('body').css({color: 'green', 'background-color': 'red'});
```

- `.width() .height()` 获取或设置元素的宽和高

```
$('body').width();
$('body').width(50);
$('body').width(function (index, value) {
    return value += 10;
})
```

- `.innerWidth() .innerHeight() .outerHeight() .outerWidth()` 元素的其他尺寸值
- `.scrollLefgt() .scrollTop()` 获取或设置滚动条的位置
- `.offset() .position()` 获取元素的坐标
    - `offset`是相对于`document`，`position`是相对于父级元素

**结构控制**

**1. 文本节点**

- `.html() .text()` 设置和获取节点的文本值。设置时`.text()`会转义标签，获取时`.text()`会移除所有标签。

**2. 子节点**

- `.append() .prepend()`

```
$('.inner').append('<p>Test</p>');
```

参数可以有多种形式：

```
var $newdiv1 = $('<div id="object1"/>'),
    newdiv2 = document.createElement('div'),
    existingdiv1 = document.getElementById('foo');

$('body').append($newdiv1, [newdiv2, existingdiv1]);
```

**3. 兄弟节点**

- `.after() .before()`

```
$('.inner').after('<p>Test</p>');
```

**4. 父节点**

- `.wrap() .wrap() .wrapInner()`

```
$('.inner').wrap('<div class="new"></div>');
$('.inner').wrapAll('<div class="new"></div>');
$('.inner').wrapInner('<div class="new"></div>');
```

**5. 复制/删除/替换节点**

- `.clone()` 复制节点，可选参数表示是否处理已绑定的事件与数据
    - `.clone(true)` 处理当前节点的事件与数据
    - `.clone(true, true)` 处理当前节点及所有子节点的事件与数据
- `.detach()` 暂时移除节点，之后可以再次恢复指定位置
- `.remove()` 永久移除节点
- `.empty()` 清除一个节点的所有内部内容
- `.unwrap()` 移除节点的父节点

## 工具函数 ##

- `.map()` 遍历所有成员

```
$(':checkbox').map(function () {
    return this.id;
}).get().join(',');

$(':checkbox').map(function (index, node) {
    return node.id;
}).get().join(',');
```

- `.slice()` 序列切片，支持一个或两个参数，支持负数

```
$('li').slice(2).css('background-color', 'red');
$('li').slice(2, 4).css('background-color', 'green');
$('li').slice(-2, -1).css('background-color', 'blue');
```

## 通用工具 ##

- `$.each() $.map()` 遍历列表，`$.map()`可以用于对象

```
$.each([52, 97], function (index, value) {
    console.log((index + ' : ' + value));
});
$.map([0, 1, 2], function (index, n) {
    return n + 4;
});
$.map([0, 1, 2], function (n) {
    return n > 0 ? n + 1 : null;
});
$.map([0, 1, 2], function (n) {
    return [n, n + 1];
});

var dimensions = {width: 10, height: 15, length: 20};
$.map(dimensions, function (value, key) {
    return value * 2;
});

var dimensions = {width: 10, height: 15, length: 20};
$.map(dimensions, function (value, key) {
    return key;
});
```

- `$.extend()` 合并对象，第一个参数表示是否进行递归深入

```
var object = $.extend({}, object1, object2);
var object = $.extend(true, {}, object1, object2);
```

- `$.merge()` 合并列表

```
$.merge([0, 1, 2], [2, 3, 4]);
```

- `.grep()` 过滤列表，第三个参数表示是否为取反

```
$.grep([0, 1, 2], function (array, index) {
    return n > 0;
});//[1,2]
$.grep([0, 1, 2], function (array, index) {
    return n > 0;
}, true);//[0]
```

- `$.inArray()` 存在判断

```
$.inArray(value, array [, fromIndex])
```

- `$.isArray() $.isEmptyObject() $.isFunction() $.iSNumeric() $.isPainObject() $.isWindow $.isXMLDoc()` 类型判断
- `$.noop()` 空函数
- `$.now()` 当前时间戳，值为`(new Date).getTime()`
- `$.parseJson() $.parseXML()` 把字符串解析为对象

```
var xml = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
    xmlDoc = $.parseXML(xml),
    $xml = $(xmlDoc),
    $title = $xml.find("title");
```

- `$.trim()` 去头去尾 `$.trim(str)`
- `$.type()` 判断参数的类型
- `$.unique()` 遍历后去重。`$.unique(arraty)`

## 上下文绑定 ##

- `$.proxy()` 为函数绑定上下文
    - `$.proxy(function,context)`
    - `$.proxy(context,name)`

```
var o = {
    x: '123',
    f: function () {
        console.log(this.x)
    },
};
var go = function (f) {
    f()
};

o.f();// 123
go(o.f);// undefined
go($.proxy(o.f, o));//123
$.proxy(o, 'f')(); //123
```

**当一个函数被传递之后，它就失去了原先的上下文。**

## 把数据存到节点中 ##

jQuery提供了一种机制，可以把节点作为数据存储的容器。

- `$.data()` 往节点中获取/设置数据
- `$.removeData()` 删除数据

在内部实现上，jQuery会在指定节点添加一个内部标识，以此为`key`，把数据存在内部闭包的一个结构中。

事实上，jQuery的事件绑定机制也使用了这套数据接口。

```
$.data($('#data').get(0), 'test', '123');
$('#data').data('test', '456');
```

## 事件处理 ##

**1. 事件绑定**

在 jQuery1.7之后，推荐统一使用`on()`来进行事件绑定。

- `.on()` 绑定事件 `on()`的基本使用方式是：`.on(event,handler)`
- `.off()` 移除事件
- `.one()` 绑定单次事件

```
$('#btn').on('click', function (eventObj) {
    console.log('Hello');
})
```

对于`handler`，它默认的上下文是触发事件的节点：

```
$('#btn').on('click', function (eventObj) {
    console.log(this);
})
```

使用`$.proxy()`可以随意控制上下文：

```
$('#btn').on('click',
    $.proxy(function (eventObj) {
        console.log(this.a);
    }, {a: 123})); // 123
```

`event`参数还支持通过：
    - 以`.`分割的子名字
    - 以空格分割的多个事件

```
$('#btn').on('click.my', (function (eventObj) {
            console.log('123');
        }
    )
);
var f = function () {
    $('#btn').off('click.my')
};
```

多个事件：

```
$('#btn').on('click.my click.other',
    (function (eventObj) {
            console.log('123');
        }
    )
);
var f = function () {
    $('#btn').off('click.my')
}
```

`on()`的另一种调用形式：

```
$('#btn').on({
    'click': function (eventObj) {
        console.log('click');
    },
    'mousemove': function (eventObj) {
        console.log('move');
    }
});
```

`off()`的使用方式与`on()`完全类似：

```
var f = function (eventObj) {
    console.log('Hello');
};
$('#btn').on('click', f);
$('#btn').off('click');
```

**2. 事件触发**

事件的触发有两种方式，一是使用预定的“事件函数”（`.click()`，`.focus()`），二是使用`trigger()`或`triggerHandler()`。

    $('#btn').on('click', function (eventObj) {
        console.log("hello");
    });
    $('#btn').click();
    $('#btn').trigger('click');

`trigger()`与`triggerHandler()`不同之处在于前面是触发事件，而后者是执行绑定函数。

```
$('#btn').on('focus', function (event) {
    console.log("Hello");
});
$('#btn').triggerHandler('focus');
```

`trigger()`和`triggerHandler()`也用于触发自定义事件。

```
$('#btn').on('my', function (event) {
    console.log("Hello");
});
$('#btn').triggerHandler('my');
```

`trigger()`和`triggerHandler()`触发事件时，可以带上参数：

    $('#btn').on('my', function (event) {
        console.log(obj);
    });
    $('#btn').trigger('my', {a: 123});

**3. 事件类型**

行为事件：

- `.click()` 单击
- `.dbclick()` 双击
- `.blur()` 失去焦点时
- `.change()` 值变化时
- `.focus()` 获取焦点时
- `.focusin()` jQuery扩展的获取焦点
- `.focusout()` jQuery扩展的失去焦点
- `.resize()` 调整大小
- `.scroll()` 滚动
- `.select()` 被选择
- `.submit()` 表单被提交

键盘事件：

- `.keydown()` 按下键
- `.keyup()` 放开键

鼠标事件：

- `.mousedown()` 点下鼠标
- `.mouseup()` 松开鼠标
- `.mouseover()` 光标移入
- `.mouseout()` 光标移出
- `.mousemove()` 光标在其上移动
- `.mouseleave() .mouseenter()` 光标移出/移入

页面事件：

- `.ready()` 准备就绪
- `.unload()` 离开当前页时，针对`window`对象
- `.error()` 发生错误时
- `.load()` 正在载入

**4. 事件对象**

- `event.currentTarget,event,target` 事件绑定节点/事件的触发节点（冒泡行为）
- `event.delegateTarget` 绑定事件的对象，通常就是`event.currentTarget`
- `event.relatedTarget` 相关的节点，主要用于一些转换式的事件。比如鼠标移入，表示它从哪个节点来的
- `event.which` 标明哪个按钮触发了事件，鼠标和键盘的键标识统一在这个属性中
- `event.preventDefault() event.isDefaultPrevented()` 禁止默认行为
- `event.stopImmediateProgation() event.isImmediateProgationStopped()` 不仅禁止冒泡。还终止绑定函数链的继续进行
- `event.stopPropagation()，event.isPropagationStopped()` 禁止冒泡
- `event.pageX，event.pageY` 事件触发时相对于`document`的鼠标位置
- `event.namespace` 事件触发时的名字空间，比如`trigger('click.namespace')` 
- `event.data` 额外传入的数据
- `event.result` 上一个绑定函数的返回值
- `event.timeStamp` 事件触发时的时间，其值为`(new Date).getTime()`
- `event.type` 事件类型

如果一个绑定函数最后返回了`false`，则默认是`event.preventDefault()`和`event.stopPropagation()`行为。

## AJAX ##

**1. 请求与回调**

jQuery的AJAX，核心的请求处理函数只有一个，就是`$.ajax()`，然后就是一个简单的上层函数。

`$.ajax()` 的基本使用形式是：

`jQuey.ajax(settings)` `settings`是一个对象，里面包含了所有的配置项。

- `url` 请求的地址。
- `type` 请求的方法类型，`GET`，`POST`。默认是`GET`。
- `data` 要发送的数据
- `dataType` 服务器返回的数据类型，支持`xml`，`html`，`script`，`json`，`jsonp`，`text`
- `success` 请求成功时调用的处理函数 `success(data, textStatus, jqXHR)`
- `context` 回调函数执行时的上下文
- `cache` 默认为`true`，是否为请求单独添加一个随机参数以防止浏览器缓存
- `error` 请求错误时的调用函数。
    - `error(jqXHR, textStatus, errorThrown)`
    - 第二个参数是表示请求状态的字符串：`timeout`，`error`，`abort`，`parsererror`
    - 第三个参数是当HTTP错误发生时，具体的错误描述：`Not Found`，`Internal Server Error`等
- `complete` 请求结束（无论成功或失败）时的一个回调函数。
    - `complete(jqXHR, textStatus)`
    - 第二个参数时表示请求状态的字符串：`success`，`notmodified`，`error`，`timeout`，`abort`，`parsererror`。
- `jsonp` 一个参数名，默认是`callback`，一般用于指明回调函数名。设置成`false`可以让请求没有`callback`参数。
- `jsonpCallback` `callback`参数值。默认是自动生成的一个随机值。

**2. 请求的状态**

对于全局的所有AJAX请求而言，可以在任意节点上绑定到全局任意AJAX请求的每一个事件：

    $('#loading').ajaxStart(function () {
        $(this).show();
    });

- `.ajaxStart()` 请求将要发出时
- `.ajaxSend()` 请求将要发出时（在`.ajaxStart()`后）
- `.ajaxSuccess()` 请求成功
- `.ajaxError()` 请求错误
- `.ajaxComplete()` 请求完成
- `.ajaxStop()` 请求结束（在`.ajaxComplete()`后）

**3. 工具函数**

- `.serialize()` 解析表单参数项，返回字符串

```
$('form').submit(function () {
    alert($(this).serialize());
    return false;
});
```

- `.serializeArray()` 解析表单参数项，返回一个列表对象。

```
$('form').submit(function () {
    alert($(this).serializeArray());
    return false;
});
```

## 泛化回调 ##

**1. [Deferred](https://whjin.github.io/full-stack-development/posts/JQ%E7%9A%84deferred%E5%AF%B9%E8%B1%A1.html)**

- `Deferred`对象是在jQuery1.5中引入的回调管理对象。其作用是把一堆函数按顺序放入一个调用链，然后根据状态来依次调用这些函数。AJAX的所有操作都是使用它来进行封装的。

```
var obj = $.Deferred(function (a) {

});
obj.done(function () {
    console.log("1");
});
obj.done(function () {
    console.log("2");
});
obj.resolve();
```

总的来说：jQuery的`Deferred`对象有三个状态：`done`，`fail`，`process`。
    - `process` 只能先于其他两个状态先被激发。
    - `done`和`fail`互斥，只能激发一个。
    - `process`可以被重复激发，而`done`和`fail`只能激发一次。

然后，jQuery提供了一些函数用于添加回调，激发状态等。

- `deferred.done()` 添加一个或多个成功回调
- `deferred.fail()` 添加一个或多个失败回调
- `deferred.always()` 添加一个函数，同时应用于成功和失败
- `deferred.progress()` 添加一个函数用于准备回调
- `deferred.then()` 依次接受三个函数，分别用于成功，失败，准备状态
- `deferred.reject()` 激发失败状态
- `deferred.resolve()` 激发成功状态
- `deferred.notify()` 激发准备状态

如果一个`Deferred`已经被激发，则新添加的对应的函数会被立即执行。

jQuery还提供了一个`jQuery.when()`的回调管理函数，可以用于方便地管理多个事件并发的情况。

    var defer = $.ajax({
        url: 'test.html',
        dataType: 'json'
    });
    defer.done(function (data) {
        console.log(data);
    });

`done()`做的事和使用`success()`定义是一样的。

当我们需要完成，像“请求A和请求B都完成时，执行函数”之类的需求时，使用`$.when()`就可以了。

    var defer_1 = $.ajax({
        url: 'json.html',
        dataType: 'json'
    });
    var defer_2 = $.ajax({
        url: 'jsonp.html',
        dataType: 'jsonp'
    });
    var new_defer = $.when(defer_1, defer_2);
    new_defer.done(function () {
        console.log("hello");
    });
    
在`$.when()`中的`Deferred`，只要有一个是`fail`，则整体结果为`fail`。

`Deferred`的回调函数的执行顺序与它们的添加顺序一致。

这里特别注意一点，就是`done/fail/always`与`then`的返回值的区别。从功能上看，它们都可以添加回调函数，但是，方法的返回值是不同的。前组的返回值是原来的那个`defer`对象，而`then`返回的是一个新的`defer`对象。

`then`返回新的`defer`这种形式，可以用于方便地实现异步函数的链式调用。

    defer.done(function () {
        return $.ajax({
            url: '/json',
            dataType: 'json',
            success: function () {
                console.log("inner");
            }
        })
    }).done(function () {
        console.log("hello");
    });
    
等同于是调用了两次 `defer.done `, `defer.done` ，注册的两次回调函数依次被执行后，看到的输出是：`hello`，`inner`。

这是两次 `defer.done` 的结果，第一个回调函数返回了一个新的 `defer` 没任何作用。

如果换成 `then` 方法：`defer.then(function () {...});`

它跟两次 `defer.done` 是不同的。 `new_defer` 会在 `inner` 那里的 `defer` 被触发时再被触发，所以输出结果是：`inner`，`hello`。

更一般地来说 `then` 的行为，就是前面的注册函数的返回值，会作为后面注册函数的参数值：

    var defer = $.ajax({
        url: '/json',
        dataType: 'json'
    });
    defer.then(function (res) {
        console.log(res);
        return 1;
    }).then(function (res) {
        console.log(res);
        return 2;
    }).then(function (res) {
        console.log(res);
    });
    
上面代码的输入结果是：`ajax response`，`1`，`2`。

**2. Callbacks**

事实上，`Deferred`机制，只是在`Callbacks`机制的上层进行了一层简单封装。`Callbacks`对象才是真正的jQuery中定义的原始的回调管理机制。

    var obj = $.Callbacks();
    obj.add(function () {
        console.log("1");
    });
    obj.add(function () {
        console.log("2");
    });
    obj.fire();

`Callbacks`对象的初始化支持一组控制参数：

- `$.Callbacks(flags)` 初始化一个回调管理对象。`flags`是空格分割的多个字符串，以定义此回调对象的行为：
    - `once` 回调链只能被激发一次
    - `memory` 回调链被激发后，新添加的函数被立即执行
    - `unique` 相同的回调函数只能被添加一次
    - `stopOnFalse` 当有回调函数返回`false`时终止调用链的执行

`CallbackS`的控制方法：

- `callbacks.add()` 添加一个或一串回调函数
- `callbacks.fire()` 激发回调
- `callbacks.remove()` 从调用链中移除指定的函数
- `callbacks.empty()` 清空调用链
- `callbacks.disable()` 关闭调用链的继续执行，新添加的函数也不会被执行
- `callbacks.lock()` 锁定调用链，但是如果打开了`memory`的`flag`，新添加的函数仍然会执行
- `callbacks.has()` 检查一个函数是否处于回调链之中
- `callbacks.fired()` 检查回调链是否被激发
- `callbacks.locked()` 检查回调链是否被锁定