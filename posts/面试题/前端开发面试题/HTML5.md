# HTML5 #

- HTML5有哪些新特性、移除了哪些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分HTML和HTML5？

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

- HTML5的离线存储怎么使用，工作原理解释一下？

> 在用户没有联网时，可以正常访问站点或应用；在联网的情况下，更新用户机器上的缓存文件。
> 原理：HTML5的离线存储是基于一个新建的`.appchache`文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源就会像`cookie`一样被存储下来。之后当网络处于离线状态时，浏览器会通过被离线存储的数据进行页面展示。

> 如何使用：
> 1、页面头部加入一个`manifest`的属性
> 2、在`cache.manifest`文件的编写离线存储的资源
> 3、在离线状态下，操作`window.applicationCache`进行需求实现

- 浏览器是如何对HTML5的离线存储资源进行管理和加载的？

> 在线的情况下，浏览器发现`html`头部有`manifest`属性，它会请求`manifest`文件，如果是第一次访问`app`，浏览器会根据`manifest`文件的内容下载相应的资源并且进行离线存储。
> 如果已经访问过`app`，并且资源已经离线存储，浏览器会使用离线的资源加载页面，然后浏览器会对比新的`manifest`文件，如果文件没有发生改变，就不做任何操作，否则就会重新下载文件中的资源并进行离线存储。
> 离线的情况下，浏览器直接使用离线存储的资源。

- 请描述一下`cookie`，`sessionStorage`，`localStorage`的区别？

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

- HTML5的`form`如何关闭自动完成功能？

> 给不想要提示的`form`或某个`input`设置为`autocomplete=off`

- 如何实现浏览器内多个标签页之间的通信？（阿里）

> `WebSocket`，`SharedWorkder`
> 也可以调用`localStorage`、`cookies`等本地存储方式
> `localStorage`另一个浏览上下文中被添加、修改或删除时，它都会触发一个事件，通过监听事件，控制它的值来进行页面信息通信

- `WebSocket`如何兼容低浏览器？（阿里）

> `Adobe Flash Socket`
> `ActiveX HTMLFile（IE）`
> 基于`multipart`编码发送`XHR`
> 基于长轮询的`XHR`

- Web应用从服务器主动推送Data到客户端有哪些方式？

> HTML5提供的`WebSocket`
> 不可见的`iframe`
> `WebSocket`通过`flash`
> `XHR`长时间连接
> `XHR Multipart Streaming`
> `<script>`标签的长时间连接（可跨域）