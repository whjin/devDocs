# webpack入门 #

## 安装webpack ##

```
# npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies

# 安装最新稳定版
npm i -D webpack

# 安装指定版本
npm i -D webpack@<version>

# 安装最新体验版本
npm i -D webpack@beta
```

安装完后可以通过这些途径运行安装到本项目的 Webpack：

- 在项目根目录下对应的命令行里通过 `node_modules/.bin/webpack` 运行 Webpack 可执行文件。
- 在 `Npm Script` 里定义的任务会优先使用本项目下的 Webpack，代码如下：

```
"scripts": {
    "start": "webpack --config webpack.config.js"
}
```

Webpack 是一个打包模块化 JavaScript 的工具，它会从 [main.js](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-3%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8.html) 出发，识别出源码中的模块化导入语句， 递归的寻找出入口文件的所有依赖，把入口和其所有依赖打包到一个单独的文件中。 从 Webpack2 开始，已经内置了对 ES6、CommonJS、AMD 模块化语句的支持。

## 使用 Loader ##

Webpack 把一切文件看作模块，CSS 文件也不例外，要引入 `main.css` 需要像引入 JavaScript 文件那样，修改入口文件 [main.js](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-4%E4%BD%BF%E7%94%A8Loader.html)。

[Webpack的配置修改](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-4%E4%BD%BF%E7%94%A8Loader.html)

在配置 Loader 时需要注意：

- `use` 属性的值需要由 `Loader` 名称组成的数组，Loader 的执行顺序是由后到前的；
- 每一个 Loader 都可以通过` URL querystring` 的方式传入参数，
    - 例如 `css-loader?minimize` 中的 `minimize` 告诉 `css-loader` 要开启 CSS 压缩。

## [使用 Plugin](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-5%E4%BD%BF%E7%94%A8Plugin.html) ##

## 使用 DevServer ##

DevServer 会启动一个 HTTP 服务器用于服务网页请求，同时会帮助启动 Webpack ，并接收 Webpack 发出的文件更变信号，通过 WebSocket 协议自动刷新网页做到实时预览。

1. 提供 HTTP 服务而不是使用本地文件预览；
2. 监听文件的变化并自动刷新网页，做到实时预览；
3. 支持 Source Map，以方便调试。

首先需要安装 DevServer：

    npm i -D webpack-dev-server
    
安装成功后执行 `webpack-dev-server` 命令， 启动 DevServer。

### 实时预览 ###

Webpack 在启动时可以开启监听模式，开启监听模式后 Webpack 会监听本地文件系统的变化，发生变化时重新构建出新的结果。Webpack 默认是关闭监听模式的，可以在启动 Webpack 时通过 `webpack --watch` 来开启监听模式。

通过 DevServer 启动的 Webpack 会开启监听模式，当发生变化时重新执行完构建后通知 DevServer。 DevServer 会让 Webpack 在构建出的 JavaScript 代码里注入一个**代理客户端**用于控制网页，网页和 DevServer 之间通过 `WebSocket` 协议通信， 以方便 DevServer **主动向客户端发送命令**。 DevServer 在收到来自 Webpack 的文件变化通知时通过注入的客户端控制网页刷新。

如果尝试修改 `index.html` 文件并保存，这并不会触发以上机制，导致这个问题的原因是 Webpack 在启动时会以配置里的 entry 为入口去递归解析出 entry 所依赖的文件，只有 entry 本身和依赖的文件才会被 Webpack 添加到监听列表里。 而 index.html 文件是脱离了 JavaScript 模块化系统的，所以 Webpack 不知道它的存在。

### 模块热替换 ###

模块热替换默认是关闭的，要开启模块热替换，只需在启动 DevServer 时带上 `--hot` 参数，重启 DevServer 后再去更新文件就能体验到模块热替换的神奇。

### 支持 Source Map ###

Webpack 支持生成 Source Map，只需在启动时带上 `--devtool source-map` 参数。 加上参数重启 DevServer 后刷新页面，再打开 Chrome 浏览器的开发者工具，就可在 Sources 栏中看到可调试的源代码。

## 核心概念 ##

Webpack 有以下几个核心概念:

- **Entry**：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- **Module**：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- **Chunk**：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- **Loader**：模块转换器，用于把模块原内容按照需求转换成新内容。
- **Plugin**：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- **Output**：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

