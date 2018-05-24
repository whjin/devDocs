# 使用Flow检查器 #

Flow 是一个 Facebook 开源的 JavaScript 静态类型检测器，它是 JavaScript 语言的超集。 

你所需要做的就是在需要的地方加上类型检查，例如在两个由不同人开发的模块对接的接口出加上静态类型检查，能在编译阶段就指出部分模块使用不当的问题。 同时 Flow 也能通过类型推断检查出 JavaScript 代码中潜在的 Bug。

Flow 使用效果如下：

    // @flow
    
    // 静态类型检查
    function square1(n: number): number {
      return n * n;
    }
    square1('2'); // Error: square1 需要传入 number 作为参数
    
    // 类型推断检查
    function square2(n) {
      return n * n; // Error: 传入的 string 类型不能做乘法运算
    }
    square2('2');
    


> 需要注意的时代码中的第一行 `// @flow` 告诉 Flow 检查器这个文件需要被检查。

## 使用 Flow ##

Flow 检测器由高性能跨平台的 OCaml 语言编写，它的可执行文件可以通过：

    npm i -D flow-bin
    
安装，安装完成后通过先配置 Npm Script：

    "scripts": {
       "flow": "flow"
    }
    
再通过 `npm run flow` 去调用 Flow 执行代码检查。 

除此之外你还可以通过：

    npm i -g flow-bin
    
把 Flow 安装到全局后，再直接通过 `flow` 命令去执行代码检查。

安装成功后，在项目根目录下执行 Flow 后，Flow 会遍历出所有需要检查的文件并对其进行检查，输出错误结果到控制台。

采用了 Flow 静态类型语法的 JavaScript 是无法直接在目前已有的 JavaScript 引擎中运行的，要让代码可以运行需要把这些静态类型语法去掉。

    // 采用 Flow 的源代码
    function foo(one: any, two: number, three?): string {}
    
    // 去掉静态类型语法后输出代码
    function foo(one, two, three) {}
    
有两种方式可以做到这点：

1. `flow-remove-types` 可单独使用，速度快。
2. `babel-preset-flow` 与 Babel 集成。

## 集成 Webpack ##

由于使用了 Flow 项目一般都会使用 ES6 语法，所以把 Flow 集成到使用 Webpack 构建的项目里最方便的方法是借助 Babel。

1. 安装 `npm i -D babel-preset-flow` 依赖到项目。
2. 修改 `.babelrc` 配置文件，加入 Flow Preset：

    ```
    "presets": [
    ...[],
    "flow"
    ]
    ```
    
往源码里加入静态类型后重新构建项目，你会发现采用了 Flow 的源码还是能正常在浏览器中运行。 

> 要明确构建的目的只是为了去除源码中的 Flow 静态类型语法，而代码检查和构建无关。 许多编辑器已经整合 Flow，可以实时在代码中高亮指出 Flow 检查出的问题。
