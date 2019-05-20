# CDN 加速 #

虽然前面通过了压缩代码的手段来减小网络传输大小，但实际上最影响用户体验的还是网页首次打开时的加载等待。 导致这个问题的根本是网络传输过程耗时大，CDN 的作用就是加速网络传输。

CDN 又叫`内容分发网络`，通过把资源部署到世界各地，用户在访问时按照就近原则从离用户最近的服务器获取资源，从而加速资源的获取速度。 CDN 其实是通过优化物理链路层传输过程中的光速有限、丢包等问题来提升网速的，其大致原理可以如下：

在本节中你不必理解 CDN 的具体运行流程和实现原理，你可以简单的把 CDN 服务看作成速度更快的 HTTP 服务。 并且目前很多大公司都会建立自己的 CDN 服务，就算你自己没有资源去搭建一套 CDN 服务，各大云服务提供商都提供了按量收费的 CDN 服务。

## 接入 CDN ##

要给网站接入 CDN，需要把网页的静态资源上传到 CDN 服务上去，在服务这些静态资源的时候需要通过 CDN 服务提供的 URL 地址去访问。

举个详细的例子，有一个单页应用，构建出的代码结构如下：

    dist
    |-- app_9d89c964.js
    |-- app_a6976b6d.css
    |-- arch_ae805d49.png
    `-- index.html
    
其中 `index.html` 内容如下：

    <html>
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="app_a6976b6d.css">
    </head>
    <body>
    <div id="app"></div>
    <script src="app_9d89c964.js"></script>
    </body>
    </html>
    
`app_a6976b6d.css`内容如下：

    body{background:url(arch_ae805d49.png) repeat}h1{color:red}
    
可以看出到导入资源时都是通过相对路径去访问的，当把这些资源都放到同一个 CDN 服务上去时，网页是能正常使用的。 但需要注意的是由于 CDN 服务一般都会给资源开启很长时间的缓存，例如用户从 CDN 上获取到了 `index.html` 这个文件后， 即使之后的发布操作把 `index.html` 文件给重新覆盖了，但是用户在很长一段时间内还是运行的之前的版本，这会新的导致发布不能立即生效。

要避免以上问题，业界比较成熟的做法是这样的：    

- 针对 HTML 文件：不开启缓存，把 HTML 放到自己的服务器上，而不是 CDN 服务上，同时关闭自己服务器上的缓存。自己的服务器只提供 HTML 文件和数据接口。
- 针对静态的 JavaScript、CSS、图片等文件：开启 CDN 和缓存，上传到 CDN 服务上去，同时给每个文件名带上由文件内容算出的 Hash 值， 例如上面的 `app_a6976b6d.css` 文件。 带上 Hash 值的原因是文件名会随着文件内容而变化，只要文件发生变化其对应的 URL 就会变化，它就会被重新下载，无论缓存时间有多长。

采用以上方案后，在 HTML 文件中的资源引入地址也需要换成 CDN 服务提供的地址，例如以上的 `index.html` 变为如下：

    <html>
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="//cdn.com/id/app_a6976b6d.css">
    </head>
    <body>
    <div id="app"></div>
    <script src="//cdn.com/id/app_9d89c964.js"></script>
    </body>
    </html>
    
并且 `app_a6976b6d.css` 的内容也应该变为如下：

也就是说，之前的相对路径，都变成了绝对的指向 CDN 服务的 URL 地址。

> 如果你对形如 `//cdn.com/id/app_a6976b6d.css` 这样的 URL 感到陌生，你需要知道这种 URL 省掉了前面的 `http:` 或者 `https:` 前缀， 这样做的好处时在访问这些资源的时候会自动的根据当前 HTML 的 URL 是采用什么模式去决定是采用 HTTP 还是 HTTPS 模式。

除此之外，如果你还知道浏览器有一个规则是同一时刻针对同一个域名的资源并行请求是有限制的话（具体数字大概4个左右，不同浏览器可能不同）， 你会发现上面的做法有个很大的问题。由于所有静态资源都放到了同一个 CDN 服务的域名下，也就是上面的 `cdn.com`。 如果网页的资源很多，例如有很多图片，就会导致资源的加载被阻塞，因为同时只能加载几个，必须等其它资源加载完才能继续加载。 要解决这个问题，可以把这些静态资源分散到不同的 CDN 服务上去， 例如把 JavaScript 文件放到 `js.cdn.com` 域名下、把 CSS 文件放到 `css.cdn.com` 域名下、图片文件放到 `img.cdn.com` 域名下， 这样做之后 `index.html` 需要变成这样：

    <html>
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="//css.cdn.com/id/app_a6976b6d.css">
    </head>
    <body>
    <div id="app"></div>
    <script src="//js.cdn.com/id/app_9d89c964.js"></script>
    </body>
    </html>
    
> 使用了多个域名后又会带来一个新问题：增加域名解析时间。是否采用多域名分散资源需要根据自己的需求去衡量得失。 当然你可以通过在 HTML HEAD 标签中 加入 <link rel="dns-prefetch" href="//js.cdn.com"> 去预解析域名，以降低域名解析带来的延迟。

## 用 Webpack 实现 CDN 的接入 ##

总结上面所说的，构建需要实现以下几点：

- 静态资源的导入 URL 需要变成指向 CDN 服务的绝对路径的 URL 而不是相对于 HTML 文件的 URL。
- 静态资源的文件名称需要带上有文件内容算出来的 Hash 值，以防止被缓存。
- 不同类型的资源放到不同域名的 CDN 服务上去，以防止资源的并行加载被阻塞。

先来看下要实现以上要求的最终 Webpack 配置：
    
<p data-height="565" data-theme-id="0" data-slug-hash="ELqbwb" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="CDN 的接入" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/ELqbwb/">CDN 的接入</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>    

以上代码中最核心的部分是通过 `publicPath` 参数设置存放静态资源的 CDN 目录 URL， 为了让不同类型的资源输出到不同的 CDN，需要分别在：

- `output.publicPath` 中设置 JavaScript 的地址。
- `css-loader.publicPath` 中设置被 CSS 导入的资源的的地址。
- `WebPlugin.stylePublicPath` 中设置 CSS 文件的地址。

设置好 `publicPath` 后，WebPlugin 在生成 HTML 文件和 `css-loader` 转换 CSS 代码时，会考虑到配置中的 `publicPath`，用对应的线上地址替换原来的相对地址。