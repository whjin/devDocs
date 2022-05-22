# HTML #

**Doctype作用？标准模式与兼容模式各有什么区别？**

> 1、`<!DOCTYPE>`声明位于HTML文档中的第一行，处于`<html>`标签之前，告知浏览器的解析器用什么文档标准解析。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
> 2、标准模式的排版和JS运行模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

**HTML5为什么只需要写`<!DOCTYPE HTML>`？**

> HTML5不基于SGML(标准通用标记语言)，因此不需要对DTD(文档类型定义)进行引用，但是需要`doctype`来规范浏览器的行为（让浏览器按照它们应该的方式来运行）
> HTML4.01基于SGML，所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

**行内元素有哪些？块级元素有哪些？空（`void`）元素有哪些？**

> 首先：CSS规范规定，每个元素都有`display`属性，确定钙元素的类型，每个元素都有默认的`display`值，如`div`的`display`默认值为`block`，都是块级元素；`span`默认`display`属性值为`inline`，是行内元素。
> 1、行内元素：`a`、`b`、`span`、`img`、`input`、`select`、`strong`（强调的语气）
> 2、块级元素：`div`、`ul`、`ol`、`li`、`dl`、`dt`、`dd`、`h1`、`h2`、`h3`、`h4`、`p`
> 3、常见的空元素：`br`、`hr`、`img`、`input`、`link`、`meta`
>    不常用的空元素：`area`、`base`、`col`、`command`、`embed`、`keygen`、`param`、`source`、`track`、`wbr`

**页面导入样式时，使用`link`和`@import`有什么区别？**

> 1、`link`属于`XHTML`标签，除了加载`CSS`外，还能用于定义`RSS`，定义`rel`连接属性等作用；而`@import`是`CSS`提供的，只能用于加载`CSS`。
> 2、页面被加载时，`link`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载。
> 3、`import`是`CSS2.1`提出的，只在`IE5`以上才能被识别，而`link`是`XHTML`标签，无兼容问题。
> 4、`link`支持使用`JS`控制`DOM`改变样式，而`@import`不支持。

**浏览器渲染页面的过程**

- 根据HTML结构生成DOM Tree
- 根据CSS生成CSSOM
- 将DOM和CSSOM整合形成RenderTree
- 根据RenderTree开始渲染和显示
- 
- 遇到`<script>`时，会执行并阻塞渲染

**`window.onload`和`DOMContentLoaded`的区别**

- 页面的全部资源加载完才会执行，包括图片、视频等
- DOM渲染完即可执行，此时图片、视频还没有加载完

**介绍一下你对浏览器内核的理解？**

> 主要分成两部分：渲染引擎（`layout`或`engine`）和JS引擎。
> 渲染引擎：负责取得网页的内容（HTML、XML、图像等）、整理信息（加入CSS等），以及计算网页的显示方式，然后输出到显示器或打印机。浏览器的内核的不同对网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其他需要编辑、显示网络内容的应用程序都需要内核。
> JS引擎：解析和执行JS来实现网页的动态效果。
> 最开始渲染引擎和JS引擎并没有区分额很明确，后来JS引擎越来越独立，内核就倾向于只是指渲染引擎。

**常见的浏览器内核有哪些？**

> `Trident`内核：IE，MaxThon，TT，The World，360，搜狗浏览器等[MSHTML]
> `Gecko`内核：Netscape6及以上版本，FF，MozillaSuite/SeaMonkey等
> `Presto`内核：Opera7及以上[Opera内核原为：`Presto`，现为：`Blink`]
> `Webkit`内核：Safari，Chrome等[Chrome：Blink（Webkit的分支）] 

**简述一下你对HTML语义化的理解？**

> 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析
> 没有CSS样式也能正常阅读文档
> 搜索引擎的爬虫依赖HTML标记来确定上下文和各个关键字的权重，有利于SEO

**`iframe`有哪些缺点？**

> `iframe`会阻塞主页面的`onload`事件
> 搜索引擎的检索程序无法解读这种页面，不利于SEO
> `iframe`和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
> 使用`iframe`之前需要考虑两个缺点。如果需要使用`iframe`，最好是通过JS
> 动态给`iframe`添加`src`属性值，可以绕开以上两个问题。

**`label`的作用是什么？怎么用？**

> `label`标签定义表单控件间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

    <label for="Name">Number:</label>
    <input type="text" name="Name" id="Name">   

**页面可见性可以有哪些用途？**

> 通过`visibilityState`的值检测页面当前是否可见，以及打开页面的时间等
> 在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放

**如何在页面上实现一个圆形的可点击区域？**

> 1、`map+area`或者`SVG`
> 2、`border-radius`
> 3、纯JS实现，需要求一个点在不在圆上简单算法、获取鼠标坐标等

**实现不使用`border`画出`1px`高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。**

```
<div style="height: 1px;overflow: hidden;background: red;"></div>
```
<div style="height: 1px;overflow: hidden;background: red;"></div>

**列举IE与其他浏览器不同的特性？**

> 事件：触发事件的元素被认为是目标（`target`）。在IE中，目标包含在`event`对象的`SRCElement`属性；
> 
> 获取字符代码：如果按键代表一个字符（`shift`、`Ctrl`、`Alt`除外），IE的`keyCode`会返回字符代码`unicode`，DOM中按键的代码和字符是分离的，要获取字符代码，需要使用`charCode`属性；

> 阻止某个事件的默认行为：IE中阻止某个事件的默认行为，必须将`returnValue`属性设置为`false`，火狐浏览器中需要调用`preventDefault()`方法。

> 停止事件冒泡，IE中阻止事件进一步冒泡，需要设置`cancelBubble`为`true`，火狐中需要调用`stopPropagation()`。

**解析一下优雅降级和渐进增强？**

> 优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是旧式浏览器，则代码会针对旧版本的IE进行降级处理，使之在旧式浏览器上以某种形式降级体验而不至于完全不能使用。
> 例如：`border-shadow`
> 
> 渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能，向页面增加不影响基础浏览器的额外样式和功能。当浏览器支持时，它们会自定地呈现出来并发挥作用。
> 例如：默认使用`flash`上传，但如果浏览器支持HTML5的文件上传功能，则使用HTML5实现更好的体验。



**对web标准以及W3C的理解与认识**

- 标签闭合，小写、不乱嵌套，提高搜索引擎搜索几率
- 使用外链css和js脚本，结构行为表现分离，文件下载与页面速度更快
- 内容能被更多用户、设备访问
- 更少的代码和组件、易于维护、改版方便，不需要变动页面内容
- 提供打印版本而不用复制内容，提高网站易用性

**`xhtml`和`html`有什么区别**

- HTML是一种基本的web网页设计语言，XHTML是一个基于XML的标志语言
- 最主要的不同：
    - XHTML元素必须被正确地嵌套
    - XHTML元素必须被关闭
    - 标签名必须小写
    - XHTML文档必须拥有根元素

**写出几种IE6 bug的解决方法**

- 双边距bug `float`引起的，使用`display`
- `3`像素问题，使用`float`引起的，使用`display: inline -3px;`
- 超链接`hover`点击后失效，正确的书写顺序`link`、`visited`、`hover`、`active`
- IE`z-index`问题，给父级添加`position: relative；`
- PNG透明，使用JS代码修改
- `min-height`最小高度，`!important`解决
- `select`在IE6下遮盖，使用`iframe`嵌套
- 为什么没有办法定义`1px`左右的宽度容器（IE6默认的行高造成，使用`overflow: hidden; zoom: 0.08; line-height: 1px;`）

**HTML5有哪些新特性、移除了哪些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分HTML和HTML5？**

> HTML5现在已经不是SGML的子集，主要是关于图像，位置，存储，多任务等功能的增加。
> 绘画`canvas`
> 用于媒介回放的`video`和`audio`元素
> 本地离线存储`localStorage`长期存储数据，浏览器关闭后数据不丢失
> `sessionStorage`的数据在浏览器关闭后自动删除

> 语义化更好的内容元素，比如`article`、`footer`、`header`、`nav`、`section`
> 表单控件：`calendar`、`date`、`time`、`email`、`url`、`search`
> 新技术：`webworker`、`websocket`、`Geolocation`

> 移除的元素：
> 纯表现的元素：`basefont`、`big`、`center`、`font`、`s`、`strike`、`tt`、`u`
> 对可用性产生负面影响的元素：`frame`、`frameset`、`noframes`

> 支持HTML5新标签：
> `IE8/IE7/IE6`支持通过`document.createElement`方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，浏览器支持新标签后，还需要添加默认的样式。
> 也可以直接使用成熟的框架，如`html5shim`：

    <!--[if lt IE 9]>
        <script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>    
    <![endif]>
    
> 区分HTML5,：DOCTYPE声明，新增的结构元素，功能元素等   

**HTML5的离线存储怎么使用，工作原理解释一下？**

> 在用户没有联网时，可以正常访问站点或应用；在联网的情况下，更新用户机器上的缓存文件。
> 原理：HTML5的离线存储是基于一个新建的`.appchache`文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源就会像`cookie`一样被存储下来。之后当网络处于离线状态时，浏览器会通过被离线存储的数据进行页面展示。

> 如何使用：
> 1、页面头部加入一个`manifest`的属性
> 2、在`cache.manifest`文件的编写离线存储的资源
> 3、在离线状态下，操作`window.applicationCache`进行需求实现

**浏览器是如何对HTML5的离线存储资源进行管理和加载的？**

> 在线的情况下，浏览器发现`html`头部有`manifest`属性，它会请求`manifest`文件，如果是第一次访问`app`，浏览器会根据`manifest`文件的内容下载相应的资源并且进行离线存储。
> 如果已经访问过`app`，并且资源已经离线存储，浏览器会使用离线的资源加载页面，然后浏览器会对比新的`manifest`文件，如果文件没有发生改变，就不做任何操作，否则就会重新下载文件中的资源并进行离线存储。
> 离线的情况下，浏览器直接使用离线存储的资源。

**请描述一下`cookie`，`sessionStorage`，`localStorage`的区别？**

> `cookie`是网站为了标识用户身份而存储在用户本地终端上的数据（通常经过加密）
> `cookie`数据始终在同源的`http`请求中携带（即使不需要），就会在浏览器和服务器间来回传递
> `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存

> 存储大小：
> `cookie`数据大小不能超过`4k`
> `sessionStorage`和`localStorage`虽然也有存储大小的限制，但比`cookie`大得多，可以达到`5M`或更大

> 有效时间：
> `localStorage`存储持久数据，浏览器关闭后数据不丢失，除非主动删除数据
> `sessionStorage`数据在当前浏览器窗口关闭后自动删除
> `cookie`设置的`cookie`过期时间之前一直有效，即使窗口或浏览器关闭

**HTML5的`form`如何关闭自动完成功能？**

> 给不想要提示的`form`或某个`input`设置为`autocomplete=off`

**如何实现浏览器内多个标签页之间的通信？（阿里）**

> `WebSocket`，`SharedWorkder`
> 也可以调用`localStorage`、`cookies`等本地存储方式
> `localStorage`另一个浏览上下文中被添加、修改或删除时，它都会触发一个事件，通过监听事件，控制它的值来进行页面信息通信

**`WebSocket`如何兼容低浏览器？（阿里）**

> `Adobe Flash Socket`
> `ActiveX HTMLFile（IE）`
> 基于`multipart`编码发送`XHR`
> 基于长轮询的`XHR`

**Web应用从服务器主动推送Data到客户端有哪些方式？**

> HTML5提供的`WebSocket`
> 不可见的`iframe`
> `WebSocket`通过`flash`
> `XHR`长时间连接
> `XHR Multipart Streaming`
> `<script>`标签的长时间连接（可跨域）