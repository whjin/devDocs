# 编写 Loader #

Loader 就像是一个翻译员，能把源文件经过转化后输出新的结果，并且一个文件还可以链式的经过多个翻译员翻译。

以处理 SCSS 文件为例：

- SCSS 源代码会先交给 `sass-loader` 把 SCSS 转换成 CSS；
- 把 `sass-loader` 输出的 CSS 交给 `css-loader` 处理，找出 CSS 中依赖的资源、压缩 CSS 等；
- 把 `css-loader` 输出的 CSS 交给 `style-loader` 处理，转换成通过脚本加载的 JavaScript 代码；

可以看出以上的处理过程需要有顺序的链式执行，先 `sass-loader` 再 `css-loader` 再 `style-loader`。 以上处理的 Webpack 相关配置如下：

<p data-height="365" data-theme-id="0" data-slug-hash="YLmbeQ" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="编写 Loader" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/YLmbeQ/">编写 Loader</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Loader 的职责 ##

由上面的例子可以看出：一个 Loader 的职责是单一的，只需要完成一种转换。 如果一个源文件需要经历多步转换才能正常使用，就通过多个 Loader 去转换。 在调用多个 Loader 去转换一个文件时，每个 Loader 会链式的顺序执行， 第一个 Loader 将会拿到需处理的原内容，上一个 Loader 处理后的结果会传给下一个接着处理，最后的 Loader 将处理后的最终结果返回给 Webpack。

所以，在你开发一个 Loader 时，请保持其职责的单一性，你只需关心输入和输出。

## Loader 基础 ##

由于 Webpack 是运行在 Node.js 之上的，一个 Loader 其实就是一个 Node.js 模块，这个模块需要导出一个函数。 这个导出的函数的工作就是获得处理前的原内容，对原内容执行处理后，返回处理后的内容。

一个最简单的 Loader 的源码如下：

    module.exports = function(source) {
      // source 为 compiler 传递给 Loader 的一个文件的原内容
      // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换
      return source;
    };
    
由于 Loader 运行在 Node.js 中，你可以调用任何 Node.js 自带的 API，或者安装第三方模块进行调用：

    const sass = require('node-sass');
    module.exports = function(source) {
      return sass(source);
    };
    
## Loader 进阶 ##

以上只是个最简单的 Loader，Webpack 还提供一些 API 供 Loader 调用，下面来一一介绍。

### 获得 Loader 的 `options` ###

在最上面处理 SCSS 文件的 Webpack 配置中，给 `css-loader` 传了 `options` 参数，以控制 `css-loader`。 如何在自己编写的 Loader 中获取到用户传入的 `options` 呢？需要这样做：

    const loaderUtils = require('loader-utils');
    module.exports = function(source) {
      // 获取到用户给当前 Loader 传入的 options
      const options = loaderUtils.getOptions(this);
      return source;
    };
    
### 返回其它结果 ###

上面的 Loader 都只是返回了原内容转换后的内容，但有些场景下还需要返回除了内容之外的东西。

例如以用 `babel-loader` 转换 ES6 代码为例，它还需要输出转换后的 ES5 代码对应的 Source Map，以方便调试源码。 为了把 Source Map 也一起随着 ES5 代码返回给 Webpack，可以这样写：

    module.exports = function(source) {
      // 通过 this.callback 告诉 Webpack 返回的结果
      this.callback(null, source, sourceMaps);
      // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，
      // 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中 
      return;
    };
    
其中的 `this.callback` 是 Webpack 给 Loader 注入的 API，以方便 Loader 和 Webpack 之间通信。 `this.callback` 的详细使用方法如下：    

    this.callback(
        // 当无法转换原内容时，给 Webpack 返回一个 Error
        err: Error | null,
        // 原内容转换后的内容
        content: string | Buffer,
        // 用于把转换后的内容得出原内容的 Source Map，方便调试
        sourceMap?: SourceMap,
        // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
        // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
        abstractSyntaxTree?: AST
    );
    
> Source Map 的生成很耗时，通常在开发环境下才会生成 Source Map，其它环境下不用生成，以加速构建。 为此 Webpack 为 Loader 提供了 `this.sourceMap` API 去告诉 Loader 当前构建环境下用户是否需要 Source Map。 如果你编写的 Loader 会生成 Source Map，请考虑到这点。    

## 同步与异步 ##

Loader 有同步和异步之分，上面介绍的 Loader 都是同步的 Loader，因为它们的转换流程都是同步的，转换完成后再返回结果。 但在有些场景下转换的步骤只能是异步完成的，例如你需要通过网络请求才能得出结果，如果采用同步的方式网络请求就会阻塞整个构建，导致构建非常缓慢。

在转换步骤是异步时，你可以这样：

    module.exports = function(source) {
        // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
        var callback = this.async();
        someAsyncOperation(source, function(err, result, sourceMaps, ast) {
            // 通过 callback 返回异步执行后的结果
            callback(err, result, sourceMaps, ast);
        });
    };
    
## 处理二进制数据 ##

在默认的情况下，Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串。 但有些场景下 Loader 不是处理文本文件，而是处理二进制文件，例如 `file-loader`，就需要 Webpack 给 Loader 传入二进制格式的数据。 为此，你需要这样编写 Loader：

    module.exports = function(source) {
        // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
        source instanceof Buffer === true;
        // Loader 返回的类型也可以是 Buffer 类型的
        // 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
        return source;
    };
    // 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据 
    module.exports.raw = true;
    
以上代码中最关键的代码是最后一行 `module.exports.raw = true;`，没有该行 Loader 只能拿到字符串。

## 缓存加速 ##

在有些情况下，有些转换操作需要大量计算非常耗时，如果每次构建都重新执行重复的转换操作，构建将会变得非常缓慢。 为此，Webpack 会默认缓存所有 Loader 的处理结果，也就是说在需要被处理的文件或者其依赖的文件没有发生变化时， 是不会重新调用对应的 Loader 去执行转换操作的。

如果你想让 Webpack 不缓存该 Loader 的处理结果，可以这样：

    module.exports = function(source) {
      // 关闭该 Loader 的缓存功能
      this.cacheable(false);
      return source;
    };

## 其它 Loader API ##

除了以上提到的在 Loader 中能调用的 Webpack API 外，还存在以下常用 API：

- `this.context`：当前处理文件的所在目录，假如当前 Loader 处理的文件是 `/src/main.js`，则 `this.context` 就等于 `/src`。
- `this.resource`：当前处理文件的完整请求路径，包括 `querystring`，例如 `/src/main.js?name=1`。
- `this.resourcePath`：当前处理文件的路径，例如 `/src/main.js`。
- `this.resourceQuery`：当前处理文件的 `querystring`。
- `this.target`：等于 Webpack 配置中的 Target。
- `this.loadModule`：但 Loader 在处理一个文件时，如果依赖其它文件的处理结果才能得出当前文件的结果时， 就可以通过 `this.loadModule(request: string, callback: function(err, source, sourceMap, module))` 去获得 `request` 对应文件的处理结果。
- `this.resolve`：像 `require` 语句一样获得指定文件的完整路径，使用方法为 `resolve(context: string, request: string, callback: function(err, result: string))`。
- `this.addDependency`：给当前处理文件添加其依赖的文件，以便再其依赖的文件发生变化时，会重新调用 Loader 处理该文件。使用方法为 `addDependency(file: string)`。
- `this.addContextDependency`：和 `addDependency` 类似，但 `addContextDependency` 是把整个目录加入到当前正在处理文件的依赖中。使用方法为 `addContextDependency(directory: string)`。
- `this.clearDependencies`：清除当前正在处理文件的所有依赖，使用方法为 `clearDependencies()`。
- `this.emitFile`：输出一个文件，使用方法为 `emitFile(name: string, content: Buffer|string, sourceMap: {...})`。
    
## 加载本地 Loader ##

在开发 Loader 的过程中，为了测试编写的 Loader 是否能正常工作，需要把它配置到 Webpack 中后，才可能会调用该 Loader。 在前面的章节中，使用的 Loader 都是通过 Npm 安装的，要使用 Loader 时会直接使用 Loader 的名称，代码如下：

    module.exports = {
      module: {
        rules: [
          {
            test: /\.css/,
            use: ['style-loader'],
          },
        ]
      },
    };
    
如果还采取以上的方法去使用本地开发的 Loader 将会很麻烦，因为你需要确保编写的 Loader 的源码是在 `node_modules` 目录下。 为此你需要先把编写的 Loader 发布到 Npm 仓库后再安装到本地项目使用。

解决以上问题的便捷方法有两种，分别如下：    

### `Npm link` ###

Npm link 专门用于开发和调试本地 Npm 模块，能做到在不发布模块的情况下，把本地的一个正在开发的模块的源码链接到项目的 `node_modules` 目录下，让项目可以直接使用本地的 Npm 模块。 由于是通过软链接的方式实现的，编辑了本地的 Npm 模块代码，在项目中也能使用到编辑后的代码。

完成 Npm link 的步骤如下：

- 确保正在开发的本地 Npm 模块（也就是正在开发的 Loader）的 `package.json` 已经正确配置好；
- 在本地 Npm 模块根目录下执行 `npm link`，把本地模块注册到全局；
- 在项目根目录下执行 `npm link loader-name`，把第2步注册到全局的本地 Npm 模块链接到项目的 `node_moduels` 下，其中的 `loader-name` 是指在第1步中的 `package.json` 文件中配置的模块名称。

链接好 Loader 到项目后你就可以像使用一个真正的 Npm 模块一样使用本地的 Loader 了。

### `ResolveLoader` ###

ResolveLoader 用于配置 Webpack 如何寻找 Loader。 默认情况下只会去 `node_modules` 目录下寻找，为了让 Webpack 加载放在本地项目中的 Loader 需要修改 `resolveLoader.modules`。

假如本地的 Loader 在项目目录中的 `./loaders/loader-name` 中，则需要如下配置：
    
    module.exports = {
      resolveLoader:{
        // 去哪些目录下寻找 Loader，有先后顺序之分
        modules: ['node_modules','./loaders/'],
      }
    }
    
加上以上配置后， Webpack 会先去 `node_modules` 项目下寻找 Loader，如果找不到，会再去 `./loaders/ `目录下寻找。    

## 实战 ##

上面讲了许多理论，接下来从实际出发，来编写一个解决实际问题的 Loader。

该 Loader 名叫 `comment-require-loader`，作用是把 JavaScript 代码中的注释语法：

    // @require '../style/index.css'
    
转换成：

    require('../style/index.css');
    
该 Loader 的使用场景是去正确加载针对 [Fis3](http://fis.baidu.com/fis3/docs/user-dev/require.html) 编写的 JavaScript，这些 JavaScript 中存在通过注释的方式加载依赖的 CSS 文件。

该 Loader 的使用方法如下：    

    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['comment-require-loader'],
            // 针对采用了 fis3 CSS 导入语法的 JavaScript 文件通过 comment-require-loader 去转换 
            include: [path.resolve(__dirname, 'node_modules/imui')]
          }
        ]
      }
    };
    
该 Loader 的实现非常简单，完整代码如下：

    function replace(source) {
        // 使用正则把 // @require '../style/index.css' 转换成 require('../style/index.css');  
        return source.replace(/(\/\/ *@require) +(('|").+('|")).*/, 'require($2);');
    }
    
    module.exports = function (content) {
        return replace(content);
    };