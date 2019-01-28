# Render函数 #

`Vue2`与`Vue1`最大的区别就在于`Vue2`使用了虚拟`DOM`来更新`DOM`节点，提升渲染性能。

> `Vue2`与`Vue1`最大的区别就在于`Vue2`使用了虚拟`DOM`来更新`DOM`节点，提升渲染性能。

- `Vue2`与`Vue1`最大的区别就在于`Vue2`使用了虚拟`DOM`来更新`DOM`节点，提升渲染性能。

> `Vue2`与`Vue1`最大的区别就在于`Vue2`使用了虚拟`DOM`来更新`DOM`节点，提升渲染性能。

## 虚拟DOM ##

React和Vue2都使用了虚拟DOM技术，虚拟DOM并不是真正意义上的DOM，而是一个轻量级的JavaScript对象，在状态发生变化时，虚拟DOM会进行Different运算，来更新只需要被替换的DOM，而不是全部重绘。

与DOM操作相比，虚拟DOM是基于JavaScript计算的，所以开销会小很多。

![](https://i.imgur.com/WDPrxd6.png)

在Vue2中，虚拟DOM就是通过一种VNode类表达，每个DOM元素或组件对对应一个VNode对象。

`VNodeData`节点解析：

- `children` 子节点，数组，也是VNode类型。
- `text` 当前节点的文本，一般文本节点或注释节点会有该属性。
- `elm` 当前虚拟节点对应的真实的DOM节点。
- `ns` 节点的`namespace`
- `content` 编译作用域
- `functionalContext` 函数化组件的作用域
- `key` 节点的`key`属性，用于作为节点的标识，有利于`patch`的优化
- `componentOptions` 创建组件实例时会用到的选项信息。
- `child` 当前节点对应的组件实例。
- `parent` 组件的占位节点。
- `raw` 原始`html`
- `isStatic` 静态节点的标识
- `isRootInset` 是否作为根节点插入，被`<transition>`包裹的节点，该属性的值为`false`。
- `isConment` 当前节点是否是注释节点。
- `isCloned` 当前节点是否为克隆节点。
- `isOnce` 当前节点是否有`v-once`指令。

VNode主要可以分为以下几类：

![](https://i.imgur.com/joGkCXE.png)

- `TextVNode` 文本节点。
- `ElementVNode` 普通元素节点。
- `ComponentVNode` 组件节点。
- `EmptyVNode` 没有内容的注释节点。
- `CloneVNode` 克隆节点，可以是以上任意类型的节点，唯一的区别在于`isCloned`属性为`true`。

Render函数通过`createElement`参数来创建虚拟DOM，结构精简。其中，**访问`slot`的用法，使用场景集中在Render函数**。

<p data-height="265" data-theme-id="0" data-slug-hash="wXozpg" data-default-tab="html,result" data-user="whjin" data-embed-version="2" data-pen-title="Vue-render函数" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/wXozpg/">Vue-render函数</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## `createElement`用法 ##

### 基本参数 ###

`createElement`构成了Vue虚拟DOM的模板，它有**3**个参数：

    createElement(
        //{String | Object | Function}
        //一个HTML标签，组件选项，或一个函数
        //必须return上面其中一个
        'div',
        //{Object}
        //一个对应属性的数据对象，可选
        //可以在template中使用
        //{String | Array}
        //子节点(VNode)，可选
        [
            createElement('h1','hello world'),
            createElement(MyComponent,{
                props:{
                    someProp:'foo'
                }
            }),
            'bar'
        ]
    );
    
第一个参数必选，可以是一个HTML标签，也可以是一个组件或函数；第二个是可选参数，数据对象，在`template`中使用。第三个是子节点，也是可选参数，用法一直。

之前在`template`中都是在组件的标签上使用`v-bind:class`、`v-bind:style`、`v-on:click`这样的指令，在Render函数都将其写在了数据对象中。

### 约束 ###

所有的组件树中，如果VNode是组件或含有组件的`slot`，nameVNode必须唯一。

在Render函数里创建了一个`cloneVNode`的工厂函数，通过递归将`slot`所有子节点都克隆了一份，并对VNode的关键属性也进行复制。

### 使用JavaScript代替模板功能 ###

在Render函数中，不再需要Vue内置的指令，比如`v-if`、`v-for`。无论要实现什么功能，都可以使用原生JavaScript。

<p data-height="265" data-theme-id="0" data-slug-hash="eKgVgQ" data-default-tab="html,result" data-user="whjin" data-embed-version="2" data-pen-title="render--v-for" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/eKgVgQ/">render--v-for</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> `map()`方法时快速改变数组结构，返回一个新数组。`map`常和`filter`、`sort`等方法一起使用，它们返回的都是新数组。

Render函数里没有与`v-model`对应的API，需要自己来实现逻辑。

<p data-height="265" data-theme-id="0" data-slug-hash="BVpYdd" data-default-tab="html,result" data-user="whjin" data-embed-version="2" data-pen-title="Vue-render-API" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/BVpYdd/">Vue-render-API</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

`v-model`就是`prop:value`和`event:input`组合使用的一个语法糖，虽然在Render里写起来比较复杂，但是可以自由控制，深入到更底层。

对于事件修饰符和按键修饰符，基本需要自己实现：

| 修饰符 | 对应的句柄
| -------| --------|
| `.stop` | `event.stopPropagation()`|
| `.prevent` | `event.preventDefault()`|
| `.self` | `if(event.target!==event.currentTarget) return`|
| `.ente`、`.13` | `if(event.keyCode!==13) return`替换**13**位需要的`keyCode`|
| `.ctrl`、`.alt`、`.shift`、`.meta` | `if(!event.ctrlKey) return`根据需要替换**`ctrlKey`**位**`altKey`**、**`shiftKey`**或**`metaKey`**|

对于事件修饰符`.capture`和`.once`，Vue提供了特殊的前缀，可以直接写在`on`的配置里。

| 修饰符 | 前缀
| -------| --------
| `.capture` | `!`
| `.once` | `~`
| `.capture.once`或`.once.capture` | `~!`

写法如下：

    on: {
        '!click': this.doThisInCapturingMode,
            '~keyup': this.doThisOnce,
            '~!mouseover': this.doThisOnceInCapturingMode
    }

简单模拟聊天发送内容的场景：

<p data-height="265" data-theme-id="0" data-slug-hash="ZRLrPN" data-default-tab="html,result" data-user="whjin" data-embed-version="2" data-pen-title="Vue-模拟聊天发送内容" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/ZRLrPN/">Vue-模拟聊天发送内容</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

在Render函数中会大量使用`slot`，在没有使用`slot`时会显示一个默认的内容，这部分需要自己实现。

`this.$slots.default`等于`undefined`，就说明父组件中没有定义`slot`，这是可以自定义显示的内容。
