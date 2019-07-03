# HTML #

- Doctype作用？标准模式与兼容模式各有什么区别？

> 1、`<!DOCTYPE>`声明位于HTML文档中的第一行，处于`<html>`标签之前，告知浏览器的解析器用什么文档标准解析。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
> 2、标准模式的排版和JS运行模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

- HTML5为什么只需要写`<!DOCTYPE HTML>`？

> HTML5不基于SGML(标准通用标记语言)，因此不需要对DTD(文档类型定义)进行引用，但是需要`doctype`来规范浏览器的行为（让浏览器按照它们应该的方式来运行）
> HTML4.01基于SGML，所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

- 行内元素有哪些？块级元素有哪些？空（`void`）元素有哪些？

> 首先：CSS规范规定，每个元素都有`display`属性，确定钙元素的类型，每个元素都有默认的`display`值，如`div`的`display`默认值为`block`，都是块级元素；`span`默认`display`属性值为`inline`，是行内元素。
> 1、行内元素：`a`、`b`、`span`、`img`、`input`、`select`、`strong`（强调的语气）
> 2、块级元素：`div`、`ul`、`ol`、`li`、`dl`、`dt`、`dd`、`h1`、`h2`、`h3`、`h4`、`p`
> 3、常见的空元素：`br`、`hr`、`img`、`input`、`link`、`meta`
>    不常用的空元素：`area`、`base`、`col`、`command`、`embed`、`keygen`、`param`、`source`、`track`、`wbr`

- 页面导入样式时，使用`link`和`@import`有什么区别？

> 1、`link`属于`XHTML`标签，除了加载`CSS`外，还能用于定义`RSS`，定义`rel`连接属性等作用；而`@import`是`CSS`提供的，只能用于加载`CSS`。
> 2、页面被加载时，`link`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载。
> 3、`import`是`CSS2.1`提出的，只在`IE5`以上才能被识别，而`link`是`XHTML`标签，无兼容问题。
> 4、`link`支持使用`JS`控制`DOM`改变样式，而`@import`不支持。

- 介绍一下你对浏览器内核的理解？

> 主要分成两部分：渲染引擎（`layout`或`engine`）和JS引擎。
> 渲染引擎：负责取得网页的内容（HTML、XML、图像等）、整理信息（加入CSS等），以及计算网页的显示方式，然后输出到显示器或打印机。浏览器的内核的不同对网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其他需要编辑、显示网络内容的应用程序都需要内核。
> JS引擎：解析和执行JS来实现网页的动态效果。
> 最开始渲染引擎和JS引擎并没有区分额很明确，后来JS引擎越来越独立，内核就倾向于只是指渲染引擎。

- 常见的浏览器内核有哪些？

> `Trident`内核：IE，MaxThon，TT，The World，360，搜狗浏览器等[MSHTML]
> `Gecko`内核：Netscape6及以上版本，FF，MozillaSuite/SeaMonkey等
> `Presto`内核：Opera7及以上[Opera内核原为：`Presto`，现为：`Blink`]
> `Webkit`内核：Safari，Chrome等[Chrome：Blink（Webkit的分支）] 

- 简述一下你对HTML语义化的理解？

> 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析
> 没有CSS样式也能正常阅读文档
> 搜索引擎的爬虫依赖HTML标记来确定上下文和各个关键字的权重，有利于SEO

- `iframe`有哪些缺点？

> `iframe`会阻塞主页面的`onload`事件
> 搜索引擎的检索程序无法解读这种页面，不利于SEO
> `iframe`和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
> 使用`iframe`之前需要考虑两个缺点。如果需要使用`iframe`，最好是通过JS
> 动态给`iframe`添加`src`属性值，可以绕开以上两个问题。

- `label`的作用是什么？怎么用？

> `label`标签定义表单控件间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

    <label for="Name">Number:</label>
    <input type="text" name="Name" id="Name">   

- 页面可见性可以有哪些用途？

> 通过`visibilityState`的值检测页面当前是否可见，以及打开页面的时间等
> 在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放

- 如何在页面上实现一个圆形的可点击区域？

> 1、`map+area`或者`SVG`
> 2、`border-radius`
> 3、纯JS实现，需要求一个点在不在圆上简单算法、获取鼠标坐标等

- 实现不使用`border`画出`1px`高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。

```
<div style="height: 1px;overflow: hidden;background: red;"></div>
```
<div style="height: 1px;overflow: hidden;background: red;"></div>

- 列举IE与其他浏览器不同的特性？

> 事件：触发事件的元素被认为是目标（`target`）。在IE中，目标包含在`event`对象的`SRCElement`属性；
> 
> 获取字符代码：如果按键代表一个字符（`shift`、`Ctrl`、`Alt`除外），IE的`keyCode`会返回字符代码`unicode`，DOM中按键的代码和字符是分离的，要获取字符代码，需要使用`charCode`属性；

> 阻止某个事件的默认行为：IE中阻止某个事件的默认行为，必须将`returnValue`属性设置为`false`，火狐浏览器中需要调用`preventDefault()`方法。

> 停止事件冒泡，IE中阻止事件进一步冒泡，需要设置`cancelBubble`为`true`，火狐中需要调用`stopPropagation()`。

- 解析一下优雅降级和渐进增强？

> 优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是旧式浏览器，则代码会针对旧版本的IE进行降级处理，使之在旧式浏览器上以某种形式降级体验而不至于完全不能使用。
> 例如：`border-shadow`
> 
> 渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能，向页面增加不影响基础浏览器的额外样式和功能。当浏览器支持时，它们会自定地呈现出来并发挥作用。
> 例如：默认使用`flash`上传，但如果浏览器支持HTML5的文件上传功能，则使用HTML5实现更好的体验。