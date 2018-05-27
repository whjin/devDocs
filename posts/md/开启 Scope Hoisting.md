# 开启 Scope Hoisting #

Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"，是在 Webpack3 中新推出的功能。 单从名字上看不出 Scope Hoisting 到底做了什么，下面来详细介绍它。

让我们先来看看在没有 Scope Hoisting 之前 Webpack 的打包方式。

假如现在有两个文件分别是 `util.js`:

    export default 'Hello,Webpack';
    
和入口文件 `main.js`:

    import str from './util.js';
    console.log(str);
    
以上源码用 Webpack 打包后输出中的部分代码如下：

    [
      (function (module, __webpack_exports__, __webpack_require__) {
        var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(1);
        console.log(__WEBPACK_IMPORTED_MODULE_0__util_js__["a"]);
      }),
      (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_exports__["a"] = ('Hello,Webpack');
      })
    ]

在开启 Scope Hoisting 后，同样的源码输出的部分代码如下：

    [
      (function (module, __webpack_exports__, __webpack_require__) {
        var util = ('Hello,Webpack');
        console.log(util);
      })
    ]
    
从中可以看出开启 Scope Hoisting 后，函数申明由两个变成了一个，`util.js` 中定义的内容被直接注入到了 `main.js` 对应的模块中。 这样做的好处是：

- 代码体积更小，因为函数申明语句会产生大量代码；
- 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小。

Scope Hoisting 的实现原理其实很简单：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。 因此只有那些被引用了一次的模块才能被合并。

由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效。

## 使用 Scope Hoisting ##

要在 Webpack 中使用 Scope Hoisting 非常简单，因为这是 Webpack 内置的功能，只需要配置一个插件，相关代码如下：

    const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
    
    module.exports = {
      plugins: [
        // 开启 Scope Hoisting
        new ModuleConcatenationPlugin(),
      ],
    };

同时，考虑到 Scope Hoisting 依赖源码需采用 ES6 模块化语法，还需要配置 mainFields。 原因在 4-10 使用 TreeShaking 中提到过：因为大部分 Npm 中的第三方库采用了 CommonJS 语法，但部分库会同时提供 ES6 模块化的代码，为了充分发挥 Scope Hoisting 的作用，需要增加以下配置：

    module.exports = {
      resolve: {
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
      },
    };
    
对于采用了非 ES6 模块化语法的代码，Webpack 会降级处理不使用 Scope Hoisting 优化，为了知道 Webpack 对哪些代码做了降级处理， 你可以在启动 Webpack 时带上 `--display-optimization-bailout` 参数，这样在输出日志中就会包含类似如下的日志：    

    [0] ./main.js + 1 modules 80 bytes {0} [built]
        ModuleConcatenation bailout: Module is not an ECMAScript module
        
其中的 `ModuleConcatenation bailout` 告诉了你哪个文件因为什么原因导致了降级处理。

也就是说要开启 Scope Hoisting 并发挥最大作用的配置如下：      

    const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
    
    module.exports = {
      resolve: {
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
      },
      plugins: [
        // 开启 Scope Hoisting
        new ModuleConcatenationPlugin(),
      ],
    };