# 构建Electron应用 #

Electron 是 Node.js 和 Chromium 浏览器的结合体，用 Chromium 浏览器显示出的 Web 页面作为应用的 GUI，通过 Node.js 去和操作系统交互。 当你在 Electron 应用中的一个窗口操作时，实际上是在操作一个网页。当你的操作需要通过操作系统去完成时，网页会通过 Node.js 去和操作系统交互。

采用这种方式开发桌面端应用的优点有：

- 降低开发门槛，只需掌握网页开发技术和 Node.js 即可，大量的 Web 开发技术和现成库可以复用于 Electron；
- 由于 Chromium 浏览器和 Node.js 都是跨平台的，Electron 能做到写一份代码在不同的操作系统运行。

在运行 Electron 应用时，会从启动一个主进程开始。主进程的启动是通过 Node.js 去执行一个入口 JavaScript 文件实现的，这个入口文件 `main.js` 内容如下：

<p data-height="565" data-theme-id="0" data-slug-hash="vjweQv" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="Electron-main.js" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/vjweQv/">Electron-main.js</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

主进程启动后会一直驻留在后台运行，你眼睛所看得的和操作的窗口并不是主进程，而是由主进程新启动的窗口子进程。

应用从启动到退出有一系列生命周期事件，通过 `electron.app.on()` 函数去监听生命周期事件，在特定的时刻做出反应。 例如在 `app.on('ready')` 事件中通过 `BrowserWindow` 去展示应用的主窗口。

启动的窗口其实是一个网页，启动时会去加载在 `loadURL` 中传入的网页地址。 每个窗口都是一个单独的网页进程，窗口之间的通信需要借助主进程传递消息。

总体来说开发 Electron 应用和开发 Web 应用很相似，区别在于 Electron 的运行环境同时内置了浏览器和 Node.js 的 API，在开发网页时除了可以使用浏览器提供的 API 外，还可以使用 Node.js 提供的 API。

## 接入 Webpack ##

接下来做一个简单的 Electron 应用，要求为应用启动后显示一个主窗口，在主窗口里有一个按钮，点击这个按钮后新显示一个窗口，且使用 React 开发网页。

由于 Electron 应用中的每一个窗口对应一个网页，所以需要开发2个网页，分别是主窗口的 `index.html` 和新打开的窗口 `login.html`。 

需要改动的地方如下：

- 在项目根目录下新建主进程的入口文件 `main.js`，内容和上面提到的一致；
- 主窗口网页的代码如下：

<p data-height="665" data-theme-id="0" data-slug-hash="odRogQ" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="main.js" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/odRogQ/">main.js</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

其中最关键的部分在于在按钮点击事件里通过 `electron` 库里提供的 API 去新打开一个窗口，并加载网页文件所在的地址。

页面部分的代码已经修改完成，接下来修改构建方面的代码。 这里构建需要做到以下几点：

- 构建出2个可在浏览器里运行的网页，分别对应2个窗口的界面；
- 由于在网页的 JavaScript 代码里可能会有调用 Node.js 原生模块或者 electron 模块，也就是输出的代码依赖这些模块。但由于这些模块都是内置支持的，构建出的代码不能把这些模块打包进去。

要完成以上要求非常简单，因为 Webpack 内置了对 Electron 的支持。 只需要给 Webpack 配置文件加上一行代码即可，如下：

    target: 'electron-renderer',
    
以上修改都完成后重新执行 Webpack 构建，对应的网页需要的代码都输出到了项目根目录下的 `dist` 目录里。

为了以 Electron 应用的形式运行，还需要安装新依赖：
    
    # 安装 Electron 执行环境到项目中
    npm i -D electron

