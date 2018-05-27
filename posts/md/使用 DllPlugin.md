# 使用 DllPlugin #

要给 Web 项目构建接入动态链接库的思想，需要完成以下事情：

- 把网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中去。一个动态链接库中可以包含多个模块。
- 当需要导入的模块存在于某个动态链接库中时，这个模块不能被再次被打包，而是去动态链接库中获取。
- 当需要导入的模块存在于某个动态链接库中时，这个模块不能被再次被打包，而是去动态链接库中获取。

为什么给 Web 项目构建接入动态链接库的思想后，会大大提升构建速度呢？ 原因在于包含大量复用模块的动态链接库只需要编译一次，在之后的构建过程中被动态链接库包含的模块将不会在重新编译，而是直接使用动态链接库中的代码。 由于动态链接库中大多数包含的是常用的第三方模块，例如 `react`、`react-dom`，只要不升级这些模块的版本，动态链接库就不用重新编译。

## 接入 Webpack ##

Webpack 已经内置了对动态链接库的支持，需要通过2个内置的插件接入，它们分别是：

- DllPlugin 插件：用于打包出一个个单独的动态链接库文件。
- DllReferencePlugin 插件：用于在主要配置文件中去引入 DllPlugin 插件打包好的动态链接库文件。

下面以基本的 React 项目为例，为其接入 DllPlugin，在开始前先来看下最终构建出的目录结构：

    ├── main.js
    ├── polyfill.dll.js
    ├── polyfill.manifest.json
    ├── react.dll.js
    └── react.manifest.json
    
其中包含两个动态链接库文件，分别是：
    
- `polyfill.dll.js` 里面包含项目所有依赖的 `polyfill`，例如 Promise、fetch 等 API。
- `react.dll.js` 里面包含 React 的基础运行环境，也就是 `react` 和 `react-dom` 模块。

以 `react.dll.js` 文件为例，其文件内容大致如下：

    var _dll_react = (function(modules) {
      // ... 此处省略 webpackBootstrap 函数代码
    }([
      function(module, exports, __webpack_require__) {
        // 模块 ID 为 0 的模块对应的代码
      },
      function(module, exports, __webpack_require__) {
        // 模块 ID 为 1 的模块对应的代码
      },
      // ... 此处省略剩下的模块对应的代码 
    ]));
    
可见一个动态链接库文件中包含了大量模块的代码，这些模块存放在一个数组里，用数组的索引号作为 ID。 并且还通过 `_dll_react` 变量把自己暴露在了全局中，也就是可以通过 `window._dll_react` 可以访问到它里面包含的模块。    

其中 `polyfill.manifest.json` 和 `react.manifest.json` 文件也是由 DllPlugin 生成出，用于描述动态链接库文件中包含哪些模块， 以 `react.manifest.json` 文件为例，其文件内容大致如下：

<p data-height="565" data-theme-id="0" data-slug-hash="GdVvmZ" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="react.manifest.json" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/GdVvmZ/">react.manifest.json</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

可见 `manifest.json` 文件清楚地描述了与其对应的 `dll.js` 文件中包含了哪些模块，以及每个模块的路径和 ID。

`main.js` 文件是编译出来的执行入口文件，当遇到其依赖的模块在 `dll.js` 文件中时，会直接通过 `dll.js` 文件暴露出的全局变量去获取打包在 `dll.js` 文件的模块。 所以在 `index.html` 文件中需要把依赖的两个 `dll.js` 文件给加载进去，`index.html` 内容如下：
    
    <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
    <div id="app"></div>
    <!--导入依赖的动态链接库文件-->
    <script src="./dist/polyfill.dll.js"></script>
    <script src="./dist/react.dll.js"></script>
    <!--导入执行入口文件-->
    <script src="./dist/main.js"></script>
    </body>
    </html>
    
以上就是所有接入 DllPlugin 后最终编译出来的代码，接下来教你如何实现。

## 构建出动态链接库文件 ##

构建输出的以下这四个文件：

    ├── polyfill.dll.js
    ├── polyfill.manifest.json
    ├── react.dll.js
    └── react.manifest.json

和以下这一个文件：

    ├── main.js
    
是由两份不同的构建分别输出的。

动态链接库文件相关的文件需要由一份独立的构建输出，用于给主构建使用。新建一个 Webpack 配置文件 `webpack_dll.config.js` 专门用于构建它们，文件内容如下：

<p data-height="665" data-theme-id="0" data-slug-hash="MGNvrB" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="webpack_dll.config.js" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/MGNvrB/">webpack_dll.config.js</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 使用动态链接库文件 ##

构建出的动态链接库文件用于给其它地方使用，在这里也就是给执行入口使用。

用于输出 `main.js` 的主 Webpack 配置文件内容如下：

<p data-height="720" data-theme-id="0" data-slug-hash="GdVvxj" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="main.js" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/GdVvxj/">main.js</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> 注意：在 `webpack_dll.config.js` 文件中，DllPlugin 中的 `name` 参数必须和 `output.library` 中保持一致。 原因在于 DllPlugin 中的 `name` 参数会影响输出的 `manifest.json` 文件中 `name` 字段的值， 而在 `webpack.config.js` 文件中 DllReferencePlugin 会去 `manifest.json` 文件读取 `name` 字段的值， 把值的内容作为在从全局变量中获取动态链接库中内容时的全局变量名。

## 执行构建 ##

在修改好以上两个 Webpack 配置文件后，需要重新执行构建。 重新执行构建时要注意的是需要先把动态链接库相关的文件编译出来，因为主 Webpack 配置文件中定义的 DllReferencePlugin 依赖这些文件。

执行构建时流程如下： 

1. 如果动态链接库相关的文件还没有编译出来，就需要先把它们编译出来。方法是执行 `webpack --config webpack_dll.config.js` 命令。
2. 在确保动态链接库存在时，才能正常的编译出入口执行文件。方法是执行 webpack 命令。这时你会发现构建速度有了非常大的提升。