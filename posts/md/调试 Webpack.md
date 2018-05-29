# 调试 Webpack #

在编写 Webpack 的 Plugin 和 Loader 时，可能执行结果会和你预期的不一样，就和你平时写代码遇到了奇怪的 Bug 一样。 对于无法一眼看出问题的 Bug，通常需要调试程序源码才能找出问题所在。

虽然可以通过 `console.log` 的方式完成调试，但这种方法非常不方便也不优雅，本节将教你如何断点调试 **工作原理概括** 中的插件代码。 由于 Webpack 运行在 Node.js 之上，调试 Webpack 就相对于调试 Node.js 程序。

## 在 Webstorm 中调试 ##

Webstorm 集成了 Node.js 的调试工具，因此使用 Webstorm 调试 Webpack 非常简单。

### 1. 设置断点 ###

在你认为可能出现问题的地方设下断点，点击编辑区代码左侧出现红点表示设置了断点。

### 2. 配置执行入口 ###

告诉 Webstorm 如何启动 Webpack，由于 Webpack 实际上就是一个 Node.js 应用，因此需要新建一个 Node.js 类型的执行入口。

以上配置中有三点需要注意：

- `Name` 设置成了 `debug webpack`，就像设置了一个别名，方便记忆和区分；
- `Working directory` 设置为需要调试的插件所在的项目的根目录；
- `JavaScript file` 即 Node.js 的执行入口文件，设置为 Webpack 的执行入口文件 `node_modules/webpack/bin/webpack.js`。

### 3. 启动调试 ###

经过以上两步，准备工作已经完成，下面启动调试，启动时选中前面设置的 `debug webpack`。

### 4. 执行到断点 ###

启动后程序就会停在断点所在的位置，在这里你可以方便的查看变量当前的状态，找出问题。