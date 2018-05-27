# 使用 Tree Shaking #

Tree Shaking 可以用来剔除 JavaScript 中用不上的死代码。它依赖静态的 ES6 模块化语法，例如通过 `import` 和 `export` 导入导出。 Tree Shaking 最先在 Rollup 中出现，Webpack 在 2.0 版本中将其引入。

为了更直观的理解它，来看一个具体的例子。假如有一个文件 `util.js` 里存放了很多工具函数和常量，在 `main.js` 中会导入和使用 `util.js`，代码如下：

`util.js` 源码：

    export function funcA() {
    }
    
    export function funB() {
    }
    
`main.js` 源码：

    import {funcA} from './util.js';
    funcA();
    
Tree Shaking 后的 `util.js`：

    export function funcA() {
    }
    
由于只用到了 `util.js` 中的 `funcA`，所以剩下的都被 Tree Shaking 当作死代码给剔除了。

需要注意的是要让 Tree Shaking 正常工作的前提是交给 Webpack 的 JavaScript 代码必须是采用 ES6 模块化语法的， 因为 ES6 模块化语法是静态的（导入导出语句中的路径必须是静态的字符串，而且不能放入其它代码块中），这让 Webpack 可以简单的分析出哪些 `export` 的被 `import` 过了。 如果你采用 ES5 中的模块化，例如 `module.export={...}`、`require(x+y)`、`if(x){require('./util')}`，Webpack 无法分析出哪些代码可以剔除。    

## 接入 Tree Shaking ##

上面讲了 Tree Shaking 是做什么的，接下来一步步教你如何配置 Webpack 让 Tree Shaking 生效。

首先，为了把采用 ES6 模块化的代码交给 Webpack，需要配置 Babel 让其保留 ES6 模块化语句，修改 `.babelrc` 文件为如下：

    {
      "presets": [
        [
          "env",
          {
            "modules": false
          }
        ]
      ]
    }
    
其中 `"modules": false` 的含义是关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法。

配置好 Babel 后，重新运行 Webpack，在启动 Webpack 时带上 `--display-used-exports` 参数，以方便追踪 Tree Shaking 的工作， 这时你会发现在控制台中输出了如下的日志：

    > webpack --display-used-exports
    bundle.js  3.5 kB       0  [emitted]  main
       [0] ./main.js 41 bytes {0} [built]
       [1] ./util.js 511 bytes {0} [built]
           [only some exports used: funcA]

其中 [only some exports used: funcA] 提示了 util.js 只导出了用到的 funcA，说明 Webpack 确实正确的分析出了如何剔除死代码。

但当你打开 Webpack 输出的 `bundle.js` 文件看下时，你会发现用不上的代码还在里面，如下：

    /* harmony export (immutable) */
    __webpack_exports__["a"] = funcA;
    
    /* unused harmony export funB */
    
    function funcA() {
      console.log('funcA');
    }
    
    function funB() {
      console.log('funcB');
    }
    
Webpack 只是指出了哪些函数用上了哪些没用上，要剔除用不上的代码还得经过 UglifyJS 去处理一遍。 要接入 UglifyJS 也很简单，不仅可以通过4-8压缩代码中介绍的加入 UglifyJSPlugin 去实现， 也可以简单的通过在启动 Webpack 时带上 `--optimize-minimize` 参数，为了快速验证 Tree Shaking 我们采用较简单的后者来实验下。

通过 `webpack --display-used-exports --optimize-minimize` 重启 Webpack 后，打开新输出的 `bundle.js`，内容如下：    
    
    function r() {
      console.log("funcA")
    }
    
    t.a = r
    
可以看出 Tree Shaking 确实做到了，用不上的代码都被剔除了。

当你的项目使用了大量第三方库时，你会发现 Tree Shaking 似乎不生效了，原因是大部分 Npm 中的代码都是采用的 CommonJS 语法， 这导致 Tree Shaking 无法正常工作而降级处理。 但幸运的时有些库考虑到了这点，这些库在发布到 Npm 上时会同时提供两份代码，一份采用 CommonJS 模块化语法，一份采用 ES6 模块化语法。 并且在 `package.json` 文件中分别指出这两份代码的入口。

以 `redux` 库为例，其发布到 Npm 上的目录结构为：   

    node_modules/redux
    |-- es
    |   |-- index.js # 采用 ES6 模块化语法
    |-- lib
    |   |-- index.js # 采用 ES5 模块化语法
    |-- package.json

`package.json` 文件中有两个字段：

    {
      "main": "lib/index.js", // 指明采用 CommonJS 模块化的代码入口
      "jsnext:main": "es/index.js" // 指明采用 ES6 模块化的代码入口
    }

`mainFields` 用于配置采用哪个字段作为模块的入口描述。 为了让 Tree Shaking 对 `redux` 生效，需要配置 Webpack 的文件寻找规则为如下：

    module.exports = {
      resolve: {
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
      },
    };
    
以上配置的含义是优先使用 `jsnext:main` 作为入口，如果不存在 `jsnext:main` 就采用 `browser` 或者 `main` 作为入口。 虽然并不是每个 Npm 中的第三方模块都会提供 ES6 模块化语法的代码，但对于提供了的不能放过，能优化的就优化。

目前越来越多的 Npm 中的第三方模块考虑到了 Tree Shaking，并对其提供了支持。 采用 `jsnext:main` 作为 ES6 模块化代码的入口是社区的一个约定，假如将来你要发布一个库到 Npm 时，希望你能支持 Tree Shaking， 以让 Tree Shaking 发挥更大的优化效果，让更多的人为此受益。    