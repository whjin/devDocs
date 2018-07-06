# 第3章：DOM编程 #

## 浏览器中的DOM ##

DOM是一个用于操作XML和HTML文档的程序接口（API）。在浏览器中，主要用来与HTML文档交互，同样用在Web程序中获取XML文档，并使用DOM API访问文档中的数据。

### 天生就慢 ###

两个相互独立的功能只要通过接口彼此连接，就会产生消耗。

## DOM访问与修改 ##

最坏的情况是在循环中访问或修改元素，尤其是对HTML元素集合循环操作。

## `innerHTML`对比DOM方法 ##

最终选择使用哪种方式取决于你的用户经常使用的浏览器，以及你的编码习惯。

> 字符串合并在老版本IE下性能并不是最好的，建议使用数组来合并大量字符串，这样会让`innerHTML`效率更高。

如果在一个对性能有着苛刻要求的操作中更新一大段HTML，推荐使用`innerHTML`，因为它在绝大部分浏览器中都运行得更快。

## 节点克隆 ##

使用DOM方法更新页面内容的另一个途径是克隆已有元素，而不是创建新元素。换句话说，就是使用`element.cloneNode()`（`element`表示已有节点）替代`document.createElement()`。

## HTML集合 ##

HTML集合是包含了DOM节点引用的类数组对象。以下方法的返回值就是一个集合：

- `document.getElementByName()`
- `document.getElementByClassName()`
- `document.getElementByTagName()`

下面的属性同样返回HTML集合：

- `document.images` 页面中所有`img`元素
- `document.links` 所有`a`元素
- `document.forms` 所有表单元素
- `document.forms[0].elements` 页面中第一个表单的所有字段

以上方法和属性的返回值为HTML集合对象，这是个类似数组的列表。它们并不是真正的数组（因为没有`push()`或`slice()`之类的方法），但提供了一个类似数组中的`length`属性，并且还能以数字索引的方式访问列表中的元素。

事实上，HTML集合一直与文档保持着连接，每次需要最新的信息时，都会重复执行查询的过程，即使只是获取集合里的元素个数（即访问集合的`length`属性）。

### 昂贵的集合 ###

在循环的条件控制语句中读取数组的`length`属性是不推荐的做法。读取一个集合的`length`比读取普通数组的`length`要慢很多，因为每次都要重新查询。

在每次迭代过程中，读取元素集合的`length`属性会引发集合进行更新，这在所有浏览器都有明显的性能问题。优化方法很简单，把集合的长度缓存到一个局部变量中，然后在循环的条件退出语句中使用该变量。

由于遍历数组比遍历集合快，因此如果先将集合元素拷贝到数组中，那么访问它的属性会更快。

将一个HTML集合拷贝到普通数组：

    function toArray() {
        for (var i = 0, a = [], len = coll.length; i < len; i++) {
            a[i] = coll[i];
        }
        return a;
    }
    
`toArray()`函数可作为一个通用的集合数组函数。   

### 访问集合元素时使用局部变量 ###

一般来说，对于任何类型的DOM访问，需要多次访问同一个DOM属性，或者方法需要多次访问时，最好使用一个布局变量缓存此成员。当遍历一个集合时，第一优化原则是把集合存储在局部变量中，并把`length`缓存在循环外部，然后，使用局部变量替代这些需要多次读取的元素。

**在循环中使用局部变量存储集合引用和集合元素带来显著的速度提升。**

## 遍历DOM ##

### 获取DOM元素 ###

通常需要从某一个DOM元素开始，操作周围的元素，或递归查找所有子节点。可以使用`childNodes`得到元素，或者用`nextSibling`来获取每个相邻元素。

`childNodes`是个元素集合，因此在循环中注意缓存`length`属性以避免在每次迭代中更新。

### 元素节点 ###

DOM元素属性`childNodes`、`firstChild`和`nextSibling`并不区分元素节点和其他类型节点。在某些情况下，只需访问元素节点，因此在循环中很可能需要检查返回节点的类型并过滤非元素节点。

### 选择器API ###

`querySelectorAll()`的原生DOM方法比使用JS和DOM遍历查找元素要快很多。

`querySelectorAll()`方法使用CSS选择器作为参数并返回一个`NodeList`包含着匹配节点的类数组对象。这个方法不会返回HTML集合，因此返回的节点不会对应实时的文档结构。    

如果需要处理大量组查询，使用`querySelectorAll()`会更有效率。页面中有`class`为`warning`的`div`元素和另一些`class`为`notice`的元素，如果要同时得到它们的列表，建议使用`querySelectorAll()`。

    var errs = document.querySelectorAll('div.warning,div.notice');
    
使用选择器API的性能更好，所以先检查浏览器是否支持`document.querySelectorAll()`，如果支持就是用。如果使用JS库提供的选择器API，应确保该库在底层实现中使用原生API。

## 重绘或重排 ##

**DOM树**：表示页面结构

**渲染树**表示页面结构如何显示

渲染树中的节点被称为帧`frames`或盒`boxs`，一旦DOM和渲染树构建完成，浏览器就开始显示页面元素。

当DOM的变化影响了元素的几何属性，浏览器需要进行重新计算，同时其他的元素的集合属性也会受到影响。浏览器使得渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为**重排**。完成**重排**后，浏览器会重新绘制受影响的部分，这个过程称为**重绘**。

> 元素的布局不发生变化，一般不会发生`重排`，只会进行重绘。

### 重排何时发生 ###

当页面布局和几何属性改变时就需要**重排**：

- 添加或删除可见的DOM元素
- 元素位置改变
- 元素尺寸改变（外边距、内边距、边框、宽度、高度等）
- 内容改变，比如：文本改变或图片被另一个不同尺寸的图片替代
- 页面渲染器初始化
- 浏览器窗口尺寸改变

## 渲染树变化的排队和刷新 ##

获取布局信息的操作会导致队列刷新：

- `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
- `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
- `clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
- `getCompotedStyle()`

以上属性和方法需要返回最新的布局信息，因此浏览器不得不执行渲染队列中的**待处理**变化，并触发重排以返回正确的值。

> 在修改样式的过程中，最好避免使用上面列出的属性。它们都会刷新渲染队列，即使是在获取最近未发生改变或与最新改变无关的布局信息。

    //定义变量并获取样式
    var computed,
        tmp = '',
        bodystyle = document.body.style;
    if (document.body.currentStyle) {//IE，Opera
        computed = document.body.currentStyle;
    } else {//W3C
        computed = document.defaultView.getComputedStyle(document.body, '');
    }
    bodystyle.color = 'red';
    tmp = computed.backgroundColor;
    tmp = computed.backgroundImage;
    tmp = computed.backgroundAttachment;

## 最小化重绘和重排 ##

为了减少发生次数，应该合并多次对DOM和样式的修改，然后一次性处理。

**改变样式**

> 一个能够达到同样效果且效率更高的方式是：合并所有的改变然后一次处理，这样只修改一次DOM。使用`cssText`属性可以实现。

    var el = document.getElementById("myDiv");
    el.style.cssText = "border-left:1px;border-right:2px;padding:5px;";
    
**批量修改DOM**

如果需要对DOM进行一系列操作，可以通过一下步骤减少重绘和重排的次数：

1. 使元素脱离文档流
2. 对其应用多重改变
3. 把元素带回文档中

有三种基本方法可以使DOM脱离文档：

- 隐藏元素，应用修改，重新显示
- 使用文档片段，在当前DOM之外构建一个子树，再把它拷贝回文档
- 将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后再替换原始元素

<p data-height="365" data-theme-id="0" data-slug-hash="NzZjqG" data-default-tab="js,result" data-user="whjin" data-embed-version="2" data-pen-title="最小化重排" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/NzZjqG/">最小化重排</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> 一个减少重排的方法是通过改变`display`属性，临时从文档中移除`<ul>`元素，然后再恢复它。
> 另一个减少重排的方法是：在文档之外创建并更新一个文档片段，然后把它附加到原始列表中。文档片段是个轻量级的`document`对象，它的设计初衷就是为了完成这类任务——更新和移动节点。文档片段的一个便利语法特性是当你附加一个片段到节点中时，实际上被添加的是该片段的子节点，而不是片段本身。

下面的例子只触发一次重排，而且只访问一次实时的DOM：

    var fragment = document.createDocumentFragment();
    appendDataToElement(fragment, data);
    document.getElementById("myList").appendChild(fragment);
    


> 第三种解决方案是为需要修改的节点创建一个备份，然后对副本进行操作，一旦操作完成，就用新的节点替代旧的节点。

    var old = document.getElementById("myList");
    var clone = old.cloneNode(true);
    appendDataToElement(clone, data);
    old.parentNode.replaceChild(clone, old);
    
**推荐尽可能使用文档片段（第二个方案），因为它们所产生的DOM遍历和重排次数最少。**

## 缓存布局信息 ##

浏览器尝试通过队列化修改和批量执行的方式最小化重排次数，当查询布局信息时，例如获取偏移量`offset`、滚动位置或计算出样式值时，浏览器为了返回最新值会刷新队列并应用所有变更。**最好的做法是尽量减少布局信息的获取次数，获取后把它赋值给布局变量，然后再操作布局变量。**

    var current = myElement.offsetLeft;
    current++;
    myElement.style.left = current + 'px';
    myElement.style.top = current + 'px';
    if (current >= 500) {
        stopAnimation();
    }
    
获取一次起始位置的值，然后将其赋值给一个变量，然后在动画循环中直接使用`current`变量而不再查询偏移量。

## 让元素脱离动画流 ##

使用以下步骤可以避免页面中大部分重排：

1. 使用绝对定位页面上的动画元素，将其脱离文档流
2. 让元素动起来。当它扩大时会临时覆盖部分页面，但这只是页面一个小区域的重绘，不会产生重排并重绘页面的大部分内容
3. 当动画结束时恢复定位，从而只会下移一次文档的其他元素

**IE和`:hover`**

从IE7开始，IE允许在任何元素（严格模式）上使用`:hover`，然而，如果有大量元素使用了`:hover`，就会降低响应速度，此问题在IE8中尤为明显。

## 事件委托 ##

当页面中存在大量元素，而且每一个都要一次或多次绑定事件处理器时，这种情况可能影响性能。每绑定一个事件处理器都是有代价的，要么加重了页面负担，要么是增加了运行期的执行时间。需要访问和修改的DOM元素越多，应用程序就越慢，特别是事件绑定通常发生在`onload`时，此时对每一个富交互应用的网页来说都是一个拥堵的时刻。事件绑定占用了处理时间，而且浏览器需要跟踪每个事件处理器，这也会占用更多的内存。当工作结束时，这些事件处理器很多都不再需要。

一个简单的处理DOM事件的技术是**事件委托**。它是基于**事件逐层冒泡并能被父级元素捕获。使用事件代理，只需给外层元素绑定一个处理器，就可以处理在其子元素上触发的所有事件。**

根据DOM标准，每个事件都要经历三个阶段：

- 捕获
- 到达目标
- 冒泡

**可以添加一个事件处理器到父级元素，由它接收所有子节点的事件消息。**

用事件委托来实现（拦截所有点击事件，并阻止其默认行为，发送一个AJAX请求来获取内容，然后局部更新页面），只需要给外层`ul`元素添加一个点击监听器，它会捕获并分析点击是否来自链接。



