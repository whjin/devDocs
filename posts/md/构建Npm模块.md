# 构建Npm模块 #

发布到 Npm 仓库的模块有以下几个特点：

- 每个模块根目录下都必须有一个描述该模块的 `package.json` 文件。该文件描述了模块的入口文件是哪个，该模块又依赖哪些模块等。
- 模块中的文件以 JavaScript 文件为主，但不限于 JavaScript 文件。例如一个 UI 组件模块可能同时需要 JavaScript、CSS、图片文件等。
- 模块中的代码大多采用模块化规范，因为你的这个模块可能依赖其它模块，而且别的模块又可能依赖你的这个模块。因为目前支持比较广泛的是 CommonJS 模块化规范，上传到 Npm 仓库的代码最好遵守该规范。

## 抛出问题 ##

Webpack 不仅可用于构建运行的应用，也可用于构建上传到 Npm 的模块。 接下来用教大家如何用 Webpack 构建一个可上传的 Npm 仓库的 React 组件，具体要求如下：

1. 源代码采用 ES6 写，但发布到 Npm 仓库的需要是 ES5 的，并且遵守 CommonJS 模块化规范。如果发布到 Npm 上去的 ES5 代码是经过转换的，请同时提供 Source Map 以方便调试。
2. 该 UI 组件依赖的其它资源文件例如 CSS 文件也需要包含在发布的模块里。
3. 尽量减少冗余代码，减少发布出去的组件的代码文件大小。
4. 发布出去的组件的代码中不能含有其依赖的模块的代码，而是让用户可选择性的去安装。例如不能内嵌 React 库的代码，这样做的目的是在其它组件也依赖 React 库时，防止 React 库的代码被重复打包。

在开始前先看下最终发布到 Npm 仓库的模块的目录结构：

    node_modules/hello-webpack
    ├── lib
    │   ├── index.css (组件所有依赖的 CSS 都在这个文件中)
    │   ├── index.css.map
    │   ├── index.js (符合 CommonJS 模块化规范的 ES5 代码)
    │   └── index.js.map
    ├── src (ES6 源码)
    │   ├── index.css
    │   └── index.js
    └── package.json (模块描述文件)
    
`src/index.js` 文件，内容如下：

    import React, { Component } from 'react';
    import './index.css';
    
    // 导出该组件供给其它模块使用
    export default class HelloWebpack extends Component {
      render() {
        return <h1 className="hello-component">Hello,Webpack</h1>
      }
    }
    
要使用该模块时只需要这样：

    // 通过 ES6 语法导入
    import HelloWebpack from 'hello-webpack';
    import 'hello-webpack/lib/index.css';
    
    // 或者通过 ES5 语法导入
    var HelloWebpack = require('hello-webpack');
    require('hello-webpack/lib/index.css');
    
    // 使用 react-dom 渲染
    render(<HelloWebpack/>);
    
## 使用 Webpack 构建 Npm 模块 ##

**对于要求1，可以这样做到：**

- 使用 `babel-loader` 把 ES6 代码转换成 ES5 的代码。
- 通过开启 `devtool: 'source-map'` 输出 Source Map 以发布调试。
- 设置 `output.libraryTarget='commonjs2'` 使输出的代码符合CommonJS2 模块化规范，以供给其它模块导入使用。

相关的 Webpack 配置代码如下：

    module.exports = {
      output: {
        // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
        libraryTarget: 'commonjs2',
      },
      // 输出 Source Map
      devtool: 'source-map',
    };
    
**对于要求2，需要通过 `css-loader` 和 `extract-text-webpack-plugin` 实现，相关的 Webpack 配置代码如下：**

    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    
    module.exports = {
      module: {
        rules: [
          {
            // 增加对 CSS 文件的支持
            test: /\.css/,
            // 提取出 Chunk 中的 CSS 代码到单独的文件中
            use: ExtractTextPlugin.extract({
              use: ['css-loader']
            }),
          },
        ]
      },
      plugins: [
        new ExtractTextPlugin({
          // 输出的 CSS 文件名称
          filename: 'index.css',
        }),
      ],
    };
    
此步引入了3个新依赖：

    # 安装 Webpack 构建所需要的新依赖
    npm i -D style-loader css-loader extract-text-webpack-plugin
    
**对于要求3，需要注意的是 Babel 在把 ES6 代码转换成 ES5 代码时会注入一些辅助函数。**

例如下面这段 ES6 代码：

    class HelloWebpack extends Component{
    }
    
在被转换成能正常运行的 ES5 代码时需要以下2个辅助函数：

- `babel-runtime/helpers/createClass` 用于实现 `class` 语法
- `babel-runtime/helpers/inherits` 用于实现 `extends` 语法

默认的情况下 Babel 会在每个输出文件中内嵌这些依赖的辅助函数的代码，如果多个源代码文件都依赖这些辅助函数，那么这些辅助函数的代码将会重复的出现很多次，造成代码冗余。 

为了不让这些辅助函数的代重复出现，可以在依赖它们的时候通过 `require('babel-runtime/helpers/createClass')` 的方式去导入，这样就能做到只让它们出现一次。 `babel-plugin-transform-runtime` 插件就是用来做这个事情的。

修改 `.babelrc` 文件，为其加入 `transform-runtime` 插件：

    {
      "plugins": [
        [
          "transform-runtime",
          {
            // transform-runtime 默认会自动的为你使用的 ES6 API 注入 polyfill
            // 假如你在源码中使用了 Promise，输出的代码将会自动注入 require('babel-runtime/core-js/Promise') 语句
            // polyfill 的注入应该交给模块使用者，因为使用者可能在其它地方已经注入了其它的 Promise polyfill 库
            // 所以关闭该功能
            "polyfill": false
          }
        ]
      ]
    }
    
由于加入 `babel-plugin-transform-runtime` 后生成的代码中会大量出现类似 `require('babel-runtime/helpers/createClass')` 这样的语句，所以输出的代码将依赖 `babel-runtime` 模块。

此步引入了3个新依赖：

    # 安装 Webpack 构建所需要的新依赖
    npm i -D babel-plugin-transform-runtime
    # 安装输出代码运行时所需的新依赖
    npm i -S babel-runtime
    
**对于要求4，需要通过在 [其它配置项](https://whjin.github.io/full-stack-development/posts/webpack%E9%85%8D%E7%BD%AE.html) 中介绍过的 `Externals` 来实现。    **

Externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。

相关的 Webpack 配置代码如下：
    
    module.exports = {
      // 通过正则命中所有以 react 或者 babel-runtime 开头的模块
      // 这些模块通过注册在运行环境中的全局变量访问，不用被重复打包进输出的代码里
      externals: /^(react|babel-runtime)/,
    };
    
开启以上配置后，输出的代码中会存在导入 `react` 或者 `babel-runtime` 模块的代码，但是它们的 `react` 或者 `babel-runtime` 的内容不会被包含进去，如下：    

    [
        (function (module, exports) {
            module.exports = require("babel-runtime/helpers/inherits");
        }),
        (function (module, exports) {
            module.exports = require("react");
        })
    ]
    
这样就做到了在保持代码正确性的情况下，输出文件不存放 react 或者 babel-runtime 模块的代码。

实际上当你在开发 Npm 模块时，不只需要对 react 和 babel-runtime 模块做这样的处理，而是需要对所有正在开发的模块所依赖的模块进行这样的处理。 因为正在开发的模块所依赖的模块也可能被其它模块所依赖。 当一个项目中一个模块被依赖多次时，Webpack 只会将其打包一次。

完成以上4步后最终的 Webpack 完整配置代码如下：

<p data-height="565" data-theme-id="0" data-slug-hash="gzJdam" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="构建Npm模块" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/gzJdam/">构建Npm模块</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

重新执行构建后，你将会在项目目录下看到一个新目录 `lib`，里面放着要发布到 Npm 仓库的最终代码。

## 发布到 Npm ##

在把构建出的代码发布到 Npm 仓库前，还需要确保你的模块描述文件 `package.json` 是正确配置的。

由于构建出的代码的入口文件是 `./lib/index.js`，需要修改 `package.json` 中的 `main` 字段如下：

    {
      "main": "lib/index.js",
      "jsnext:main": "src/index.js"
    }
    
其中 `jsnext:main` 字段用于指出采用 ES6 编写的模块入口文件所在的位置。

修改完毕后在项目目录下执行 `npm publish` 就能把构建出的代码发布到 Npm 仓库中(确保已经 `npm login` 过)。

> 如果你想让发布到 Npm 上去的代码保持和源码的目录结构一致，那么用 Webpack 将不在适合。 因为源码是一个个分割的模块化文件，而 Webpack 会把这些模块组合在一起。 虽然 Webpack 输出的文件也可以是采用 CommonJS 模块化语法的，但在有些场景下把所有模块打包成一个文件发布到 Npm 是不适合的。 例如像 Lodash 这样的工具函数库在项目中可能只用到了其中几个工具函数，如果所有工具函数打包在一个文件中，那么所有工具函数都会被打包进去，而保持模块文件的独立能做到只打包进使用到的。 还有就是像 UI 组件库这样由大量独立组件组成的库也和 Lodash 类似。
> 所以 Webpack 适合于构建完整不可分割的 Npm 模块。