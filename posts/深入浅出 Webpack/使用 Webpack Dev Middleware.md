# 使用 Webpack Dev Middleware #

 DevServer 是一个方便开发的小型 HTTP 服务器， DevServer 其实是基于 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 和 Expressjs 实现的， 而 webpack-dev-middleware 其实是 Expressjs 的一个中间件。
 
 也就是说，实现 DevServer 基本功能的代码大致如下：
 
 <p data-height="345" data-theme-id="0" data-slug-hash="erwmZQ" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="webpack-dev-middleware" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/erwmZQ/">webpack-dev-middleware</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

从以上代码可以看出，从 `webpack-dev-middleware` 中导出的 `webpackMiddleware` 是一个函数，该函数需要接收一个 Compiler 实例。Webpack API 导出的 `webpack` 函数会返回一个Compiler 实例。

`webpackMiddleware` 函数的返回结果是一个 Expressjs 的中间件，该中间件有以下功能：

- 接收来自 Webpack Compiler 实例输出的文件，但不会把文件输出到硬盘，而是保存在内存中；
- 往 Expressjs app 上注册路由，拦截 HTTP 收到的请求，根据请求路径响应对应的文件内容；

通过 `webpack-dev-middleware` 能够将 DevServer 集成到你现有的 HTTP 服务器中，让你现有的 HTTP 服务器能返回 Webpack 构建出的内容，而不是在开发时启动多个 HTTP 服务器。 这特别适用于后端接口服务采用 Node.js 编写的项目。

## Webpack Dev Middleware 支持的配置项 ##

在 Node.js 中调用 webpack-dev-middleware 提供的 API 时，还可以给它传入一些配置项，方法如下：

<p data-height="500" data-theme-id="0" data-slug-hash="NMZPbX" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="Webpack Dev Middleware" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/NMZPbX/">Webpack Dev Middleware</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Webpack Dev Middleware 与模块热替换 ##

DevServer 提供了一个方便的功能，可以做到在监听到文件发生变化时自动替换网页中的老模块，以做到实时预览。 

DevServer 虽然是基于 `webpack-dev-middleware` 实现的，但 `webpack-dev-middleware` 并没有实现模块热替换功能，而是 DevServer 自己实现了该功能。

为了在使用 `webpack-dev-middleware` 时也能使用模块热替换功能去提升开发效率，需要额外的再接入 [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)。 需要做以下修改才能实现模块热替换。

第1步：修改 `webpack.config.js` 文件，加入 `HotModuleReplacementPlugin` 插件，修改如下：

<p data-height="385" data-theme-id="0" data-slug-hash="XqLJMQ" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="HotModuleReplacementPlugin " class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/XqLJMQ/">HotModuleReplacementPlugin </a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

第2步：修改 HTTP 服务器代码 `server.js` 文件，接入 `webpack-hot-middleware` 中间件，修改如下：

<p data-height="450" data-theme-id="0" data-slug-hash="yjdyvG" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="server.js" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/yjdyvG/">server.js</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

第3步：修改执行入口文件 `main.js`，加入替换逻辑，在文件末尾加入以下代码：

    if (module.hot) {
      module.hot.accept();
    }
    
第4步：安装新引入的依赖：

    npm i -D webpack-dev-middleware webpack-hot-middleware express
    
安装成功后，通过 `node ./server.js` 就能启动一个类似于 DevServer 那样支持模块热替换的自定义 HTTP 服务了。

> 本实例提供[项目完整代码](http://webpack.wuhaolin.cn/3-18%E4%BD%BF%E7%94%A8WebpackDevMiddleware.zip)