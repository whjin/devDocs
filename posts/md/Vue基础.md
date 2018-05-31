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

# 计算属性 #

所有的计算属性都以函数的形式写在Vue实例中的`computed`选项内，最终返回计算后的结果。

## 计算属性的用法 ##

在一个计算属性中可以完成各种复杂的逻辑，包括运算、函数调用等，只要最终返回一个结果即可。

计算属性还可以依赖多个Vue实例的数据，只要其中任一数据变化，计算属性就会重新执行，视图也会更新。

每一个计算属性都包含一个`getter`和一个`setter`。

绝大多数情况下，只会用默认的`getter`方法读取一个计算属性，在业务中很少用到`setter`，所以在声明一个计算属性时，可以直接使用默认的写法，不必将`getter`和`setter`都声明。

计算属性除了简单的文本插值外，还经常用于动态地设置元素的样式名称`class`和内联样式`style`。当使用组件时，计算属性也经常用来动态传递`props`。

计算属性还有两个很实用的小技巧容易被忽略：

1. 一是计算属性可以依赖其他计算属性；
2. 二是计算属性不仅可以依赖当前Vue实例的数据，还可以依赖其他实例的数据。

```
<div id="app1"></div>
    <div id="app2">
    {{reverseText}}
</div>

var app1 = new Vue({
    el: "#app1",
    data: {
        text: '123,456'
    },
});
var app2 = new Vue({
    el: "#app2",
    computed: {
        reverseText: function () {
            //这里依赖的是实例app1的数据text
            return app1.text.split(',').reverse().join(',');
        }
    }
});
```

## 计算属性缓存 ##

没有使用计算属性，在`methods`中定义了一个方法实现了相同的效果，甚至该方法还可以接受参数，使用起来更灵活。

**使用计算属性的原因在于它的依赖缓存**。一个计算属性所依赖的数据发生变化时，它才会重新取值，在上例中只要`text`值不改变，计算属性也就不更新。但是`methods`则不同，只要重新渲染，它就会被调用，因此函数也会被执行。

使用计算属性还是`methods`取决于你是否需要缓存，当遍历大数组和做大量计算时，应当使用计算属性，除非你不希望得到缓存。

# `v-bind`及`class`与`style`绑定 #

`v-bind`的主要用法是动态更新HTML元素上的属性。

在数据绑定中，`v-bind`最常见的两个应用就是元素的样式名称`class`和内联样式`style`的动态绑定。

## 绑定`class`的几种方式 ##

### 对象语法 ###

给`v-bind:class`设置一个对象，可以动态地切换`class`：

    <div id="app">
        <div :class="{'active':'isActive'}">测试文字</div>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            isActive: true
        },
    });

对象中也可以传入多个属性，动态切换`class`。另外，`:class`可以与普通`class`共存。

    <div class="static" :class="{'active':'isActive','error':isError}">测试文字</div>

    data: {
        isActive: true,
        isError: false
    }

当`:class`的表达式过长或逻辑复杂时，还可以绑定一个计算属性。当条件多于两个时，都可以使用`data`或`computed`。

除了计算属性，也可以直接绑定一个Object类型的数据，或者使用类似计算属性的`methods`。

### 数组语法 ###

当需要应用多个`class`时，可以使用数组语法，给`:class`绑定一个数组，应用一个`class`列表：

    <div id="app">
        <div :class="[activeCls,errorCls]">测试文字</div>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            activeCls: 'active',
            errorCls: 'error'
        }
    });
    
    // 结果
    <div class="active error">测试文字</div>
    
也可以使用三元表达式来根据条件切换`class`：

    <div :class="[isActive ? activeCls : '',errorCls]">测试文字</div>
    
    new Vue({
        el: "#app",
        data: {
            isActive: true,
            activeCls: 'active',
            errorCls: 'error'
        }
    });
    
当`class`有多个条件时，可以在数组语法中使用对象语法：

    <div id="app">
        <div :class="[{'active':isActive},errorCls]">测试文字</div>
    </div>

使用计算属性给元素动态设置类名，在业务中经常用到，尤其是在写复用的组件时，所以在开发过程中，**如果表达式较长或逻辑复杂，应该尽可能地优先使用计算属性**。

### 在组件中使用 ###

如果直接在自定义组件上使用`class`或`:class`，样式规则会直接应用到这个组件的根元素上。

    Vue.component('my-component', {
        template: `<p class="article">一些文本</p>`
    });

然后在调用这个组件时，应用对象语法或数组语法给组件绑定`class`：

    <div id="app">
        <my-component :class="{'active':isActive}"></my-component>
    </div>
    
这种用法仅适用于自定义组件的最外层是一个根元素，否则会无效。当不满足这种条件或需要给具体的子元素设置类名时，应当使用组件的`props`来传递。

## 绑定内联样式 ##

使用`:style`可以给元素绑定内联样式，方法与`:class`类似，也有对象语法和数组语法，很像直接在元素上写CSS。

    <div id="app">
        <div :style="{'color':color, 'fontSize':fontSize+'px'}">文本</div>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            color: 'red',
            fontSize: 14
        }
    });

一般把样式写在`data`或`computed`中：

    <div id="app">
        <div :style="styles">文本</div>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            styles: {
                color: 'red',
                fontSize: 16 + 'px'
            }
        }
    });

在实际业务中，`:style`的数组语法并不常用，可以写在一个对象里面，而较为常用的是计算属性。

另外，使用`:style`时，Vue.js会自动给特殊的CSS属性名称增加前缀，比如`transform`。

# 内置指令 #

## 基本指令 ##

### `v-cloak` ###

`v-cloak`不需要表达式，它会在Vue实例结束编译时从绑定的HTML元素上移除，经常和CSS的`display: none;`配合使用：

    <div id="app" v-cloak>
        {{message}}
    </div>
    
当网速较慢、Vue.js文件还没加载完时，在页面上会显示`{{message}}`的字样，直到Vue创建实例、编译模板时，DOM才会被替换，所以这个过程屏幕有闪。只要加一句CSS就可以解决这个问题：

    [v-cloak] {
        display: none;
    }
    
v-cloak是一个解决初始化慢导致页面闪动的最佳实践，对于简单的项目很实用。

在工程化的项目中，项目的HTML结构只有一个空的`div`元素，剩下的内容都由路由挂载不同组件完成，这时不再需要`v-cloak`。

### `v-once` ###

`v-once`是一个不需要表达式的指令，作用是定义它的元素或者组件只渲染一次，包括元素或组件的所有子节点。首次渲染后，不再随数据的变化重新渲染，将被视为静态内容。

`v-once`在业务中很少使用，如果需要进一步优化性能时，可能会用到。

## 条件渲染指令 ##

### `v-if`、`v-else-if`、`v-else` ###

Vue.js的条件指令可以根据表达式的值在DOM中渲染或销毁元素/组件。

`v-else-if`要紧跟`v-if`，`v-else`要紧跟`v-else-if`或`v-if`，表达式的值为真时，当前元素/组件及所有子节点将被渲染，为假时被移除。

如果一次判断的是多个元素，可以在Vue.js内置的`<template>`元素上使用条件指令，最终渲染的结果不会包含该元素。

Vue在渲染元素时，处于效率考虑，会尽可能地复用已有的元素，而非重新渲染。

<p data-height="265" data-theme-id="0" data-slug-hash="KewYmd" data-default-tab="html,result" data-user="whjin" data-embed-version="2" data-pen-title="条件渲染指令" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/KewYmd/">条件渲染指令</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

示例中键入内容后，点击切换按钮，虽然DOM改变了，但是之前在输入框键入的内容并没有改变，只是替换了`placeholder`的内容，说明`<input>`元素被复用了。

使用Vue.js提供的`key`属性，可以让你自己决定是否要复用元素，`key`的值必须是唯一的。

    <input type="text" placeholder="输入用户名" key="name-input">

给两个`<input>`元素都增加了`key`后，就不会复用了。切换类型时键入的内容也会被删除，不过`<label>`元素仍然会被复用，因为没有添加`key`属性。

### `v-show` ###

`v-show`的用法与`v-if`基本一致，只不过`v-show`是改变元素的CSS属性`display`。

当`v-show`表达式的值为`false`时元素会隐藏，DOM结构元素上加载了内联样式`display:none;`。

**`v-show`不能在`<template>`上使用**。

### `v-if`与`v-show`的选择 ###

`v-if`和`v-show`具有类似的功能，不过`v-if`才是真正的条件渲染，它会根据表达式适当地**销毁或重建**元素及绑定的事件或子组件。

若表达式初始值为`false`，则一开始元素/组件并不会渲染，只有当条件第一次变为真时才开始编译。

而`v-show`只是简单的CSS属性切换，无论条件真与否，都会被编译。

相比之下，`v-if`更适合条件不经常改变的场景，因为它的切换开销相对较大，而`v-show`适用于频繁切换条件。

## 列表渲染指令`v-for` ##

### 基本用法 ###

当需要将一个数组遍历或枚举一个对象循环显示时，就会用到列表渲染指令`v-for`。它的表达式需结合`in`来使用，类似`item in items`的形式。

列表渲染也支持用`of`代替`in`作为分隔符，它更接近JavaScript迭代器的语法：

    <li v-for="book of books">{{book.name}}</li>
    
`v-for`的表达式支持一个可选参数作为当前项的索引。

    <li v-for="(book,index) of books">{{index}} - {{book.name}}</li>

分隔符`in`前的语句使用括号，第二项就是`books`当前项的索引。

与`v-if`一样，`v-for`也可以用在内置标签`<template>`上，将多个元素进行渲染。

除了数组外，对象的属性也是可以遍历的。

遍历对象属性时，有两个可选参数，分别是键名和索引：

    <div id="app">
        <ul>
            <li v-for="(value,key,index) of users">
                {{index}} - {{key}} - {{value}}
            </li>
        </ul>
    </div>

`v-for`还可以迭代整数：

    <div id="app">
        <span v-for="n in 10">{{n}}</span>
    </div>

## 数组更新 ##

Vue的核心是数据与视图的双向绑定，包含了一组观察数组变化的方法，使用它们改变数组也会触发视图更新：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

使用以上方法会改变被这些方法调用的原始数组。

以下方法不会改变原数组：

- `filter()`
- `concat()`
- `slice()`

它们返回的是一个新数组，在使用这些非变异方法时，可以用新数组来替换元素组。

Vue在检测到数组变化时，并不是直接重新渲染整个列表，而是最大化地复用DOM元素。替换的数组中，含有相同元素的项不会被重新渲染，因此可以大胆地用新数组来替换旧数组，不用担心性能问题。

需要注意的是，以下变动的数组中，Vue时不能检测到的，也不会触发视图更新：

- 通过索引直接设置项，`app.books[3]={}`
- 修改数组长度，`app.books.length=1`

解决第一个问题可以用两种方法实现同样的效果，第一种是使用Vue内置的`set`方法：

    Vue.set(app.books, 3, {
        name: '《CSS秘密花园》',
        author: '无名氏'
    });
    
如果是在webpack中使用组件化的方式，默认是没有导入Vue的，这时可以使用`this.$set`。

另一种方法：`app.books.splice(3,1,{})`

## 过滤与排序 ##

如果不希望改变原数组，想通过一个数组的副本来做过滤或排序的显示时，可以使用计算属性返回过滤或排序后的数组。

# 方法与事件 #

@click调用得方法名后可以不跟括号`()`，如果该方法有参数，默认会将原生事件对象`event`传入。

这种在HTML元素上监听事件的设计看似将DOM与JavaScript紧耦合，违背分离的原理，实则刚好相反。因为通过HTML就可以知道调用的是哪个方法，将逻辑与DOM解耦，便于维护。

**最重要的是，当`viewModel`销毁时，所有的事件处理器都会自动销毁，无需自己处理。**

Vue提供了一个特殊变量`$event`，用于访问原生DOM事件。

    <div id="app">
        <a href="https://www.apple.com/" @click="handleClick('禁止打开',$event)">打开链接</a>
    </div>

## 修饰符 ##

Vue支持以下修饰符：

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`

具体用法如下：

| 修饰符功能 | 使用示例
| --------- | ---------
| 阻止单击事件冒泡 | `<a @click.stop="handle"></a>`
| 提交事件不再重载页面 | `<form @submit.prevent="handle"></form>`
| 修饰符可以串联 | `<a @click.stop.prevent="handle"></a>`
| 只有修饰符 | `<form @submit.prevent></form>`
| 添加事件侦听器时使用事件捕获模式 | `<div @click.capture="handle">...</div>`
| 只当事件在该元素本身（不是子元素）触发时执行回调 | `<div @click.self="handle">...</div>`
| 只触发一次，组件同样适用 | `<div @click.once="handle">...</div>`

在表单元素上监听键盘事件时，还可以使用按键修饰符。

| 修饰符功能 | 使用示例
| --------- | ---------
| 只有在`keyCode`是`13`时调用`vm.submit()` | `<input @keyup.13="submit">`

除了具体的某个`keyCode`外，Vue还提供了一些快捷名称：

- `.enter`
- `.tab`
- `.delete`（补货“删除”和“退格”键）
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

这些按键修饰符也可以组合使用，或和鼠标一起配合使用：

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`



    
    
    



