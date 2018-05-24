# 为单页应用生成HTML #

## 引入问题 ##

在使用 React 框架中，是用最简单的 `Hello,Webpack` 作为例子让大家理解， 这个例子里因为只输出了一个 `bundle.js `文件，所以手写了一个 `index.html` 文件去引入这个 `bundle.js`，才能让应用在浏览器中运行起来。

在实际项目中远比这复杂，一个页面常常有很多资源要加载。接下来举一个实战中的例子，要求如下：

1. 项目采用 ES6 语言加 React 框架。
2. 给页面加入 Google Analytics，这部分代码需要内嵌进 HEAD 标签里去。
3. 给页面加入 Disqus 用户评论，这部分代码需要异步加载以提升首屏加载速度。
4. 压缩和分离 JavaScript 和 CSS 代码，提升加载速度。

在开始前先来看看该应用最终发布到线上的[代码](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-9%E4%B8%BA%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%E7%94%9F%E6%88%90HTML.html)。

可以看到部分代码被内嵌进了 HTML 的 HEAD 标签中，部分文件的文件名称被打上根据文件内容算出的 Hash 值，并且加载这些文件的 URL 地址也被正常的注入到了 HTML 中。 

## 解决方案 ##

推荐一个用于方便地解决以上问题的 Webpack 插件 [web-webpack-plugin](https://github.com/gwuhaolin/web-webpack-plugin)。 该插件已经被社区上许多人使用和验证，解决了大家的痛点获得了很多好评，下面具体介绍如何用它来解决上面的问题。

首先，修改 [Webpack 配置](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-9%E4%B8%BA%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%E7%94%9F%E6%88%90HTML.html)。

以上配置中，大多数都是按照前面已经讲过的内容增加的配置，例如：

- 增加对 CSS 文件的支持，提取出 Chunk 中的 CSS 代码到单独的文件中，压缩 CSS 文件；
- 定义 `NODE_ENV` 环境变量为 `production`，以去除源码中只有开发时才需要的部分；
- 给输出的文件名称加上 Hash 值；
- 压缩输出的 JavaScript 代码。

但最核心的部分在于 `plugins` 里的：

    new WebPlugin({
      template: './template.html', // HTML 模版文件所在的文件路径
      filename: 'index.html' // 输出的 HTML 的文件名称
    })

其中 `template: './template.html'` 所指的模版文件 `template.html` 的内容是：

    <head>
      <meta charset="UTF-8">
      <!--注入 Chunk app 中的 CSS-->
      <link rel="stylesheet" href="app?_inline">
      <!--注入 google_analytics 中的 JavaScript 代码-->
      <script src="./google_analytics.js?_inline"></script>
      <!--异步加载 Disqus 评论-->
      <script src="https://dive-into-webpack.disqus.com/embed.js" async></script>
    </head>
    <body>
    <div id="app"></div>
    <!--导入 Chunk app 中的 JS-->
    <script src="app"></script>
    <!--Disqus 评论容器-->
    <div id="disqus_thread"></div>
    </body>

该文件描述了哪些资源需要被以何种方式加入到输出的 HTML 文件中。

以 `<link rel="stylesheet" href="app?_inline">` 为例，按照正常引入 CSS 文件一样的语法来引入 Webpack 生产的代码。`href` 属性中的 `app?_inline` 可以分为两部分，前面的 `app` 表示 CSS 代码来自名叫 `app` 的 Chunk 中，后面的 `_inline` 表示这些代码需要被内嵌到这个标签所在的位置。

同样的 `<script src="./google_analytics.js?_inline"></script>` 表示 JavaScript 代码来自相对于当前模版文件 `template.html` 的本地文件 `./google_analytics.js`， 而且文件中的 JavaScript 代码也需要被内嵌到这个标签所在的位置。

也就是说资源链接 URL 字符串里问号前面的部分表示资源内容来自哪里，后面的 `querystring` 表示这些资源注入的方式。

除了 `_inline` 表示内嵌外，还支持以下属性：

- `_dist` 只有在生产环境下才引入该资源;
- `_dev` 只有在开发环境下才引入该资源；
- `_ie` 只有IE浏览器才需要引入的资源，通过 `[if IE]>resource<![endif]` 注释实现。

这些属性之间可以搭配使用，互不冲突。例如 `app?_inline&_dist` 表示只在生产环境下才引入该资源，并且需要内嵌到 HTML 里去。

`WebPlugin` 插件还支持一些其它更高级的用法，详情可以访问该[项目主页](https://github.com/gwuhaolin/web-webpack-plugin)阅读文档。