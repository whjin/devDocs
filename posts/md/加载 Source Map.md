# 加载 Source Map #

由于在开发过程中经常会使用新语言去开发项目，最后会把源码转换成能在浏览器中直接运行的 JavaScript 代码。 这样做虽能提升开发效率，在调试代码的过程中你会发现生成的代码可读性非常差，这给代码调试带来了不便。

Webpack 支持为转换生成的代码输出对应的 Source Map 文件，以方便在浏览器中能通过源码调试。 控制 Source Map 输出的 Webpack 配置项是 `devtool`，它有很多选项，下面来一一详细介绍。

| devtool | 含义
| ---------| ----- 
| 空 | 不生成 Source Map
| `eval` | 每个 `module` 会封装到 `eval` 里包裹起来执行，并且会在每个 `eval` 语句的末尾追加注释 `//# sourceURL=webpack:///./main.js`
| `source-map` | 会额外生成一个单独 Source Map 文件，并且会在 JavaScript 文件末尾追加 `//# sourceMappingURL=bundle.js.map`
| `hidden-source-map` | 和 `source-map` 类似，但不会在 JavaScript 文件末尾追加 `//# sourceMappingURL=bundle.js.map`
| `inline-source-map` | 和 `source-map` 类似，但不会额外生成一个单独 Source Map 文件，而是把 Source Map 转换成 `base64` 编码内嵌到 JavaScript 中
| `eval-source-map` | 和 `eval` 类似，但会把每个模块的 Source Map 转换成 `base64` 编码内嵌到 `eval` 语句的末尾，例如 `//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW...`
| `cheap-source-map` | 和 `source-map` 类似，但生成的 Source Map 文件中没有列信息，因此生成速度更快
| `cheap-module-source-map` | 和 `cheap-source-map` 类似，但会包含 Loader 生成的 Source Map

其实以上表格只是列举了 `devtool` 可能取值的一部分， 它的取值其实可以由 `source-map`、`eval`、`inline`、`hidden`、`cheap`、`module` 这六个关键字随意组合而成。 这六个关键字每个都代表一种特性，它们的含义分别是：

- `eval`：用 `eval` 语句包裹需要安装的模块；
- `source-map`：生成独立的 Source Map 文件；
- `hidden`：不在 JavaScript 文件中指出 Source Map 文件所在，这样浏览器就不会自动加载 Source Map；
- `inline`：把生成的 Source Map 转换成 `base64` 格式内嵌在 JavaScript 文件中；
- `cheap`：生成的 Source Map 中不会包含列信息，这样计算量更小，输出的 Source Map 文件更小；同时 Loader 输出的 Source Map 不会被采用；
- `module`：来自 Loader 的 Source Map 被简单处理成每行一个模块；

## 该如何选择 ##

如果你不关心细节和性能，只是想在不出任何差错的情况下调试源码，可以直接设置成 `source-map`，但这样会造成两个问题：

- `source-map` 模式下会输出质量最高最详细的 Source Map，这会造成构建速度缓慢，特别是在开发过程需要频繁修改的时候会增加等待时间；
- `source-map` 模式下会把 Source Map 暴露出去，如果构建发布到线上的代码的 Source Map 暴露出去就等于源码被泄露；

为了解决以上两个问题，可以这样做：

- 在开发环境下把 `devtool` 设置成 `cheap-module-eval-source-map`，因为生成这种 Source Map 的速度最快，能加速构建。由于在开发环境下不会做代码压缩，Source Map 中即使没有列信息也不会影响断点调试；
- 在生产环境下把 `devtool` 设置成 `hidden-source-map`，意思是生成最详细的 Source Map，但不会把 Source Map 暴露出去。由于在生产环境下会做代码压缩，一个 JavaScript 文件只有一行，所以需要列信息。

> 在生产环境下通常不会把 Source Map 上传到 HTTP 服务器让用户获取，而是上传到 JavaScript 错误收集系统，在错误收集系统上根据 Source Map 和收集到的 JavaScript 运行错误堆栈计算出错误所在源码的位置。

> 不要在生产环境下使用 `inline` 模式的 Source Map， 因为这会使 JavaScript 文件变得很大，而且会泄露源码。

## 加载现有的 Source Map ##

有些从 Npm 安装的第三方模块是采用 ES6 或者 TypeScript 编写的，它们在发布时会同时带上编译出来的 JavaScript 文件和对应的 Source Map 文件，以方便你在使用它们出问题的时候调试它们；

默认情况下 Webpack 是不会去加载这些附加的 Source Map 文件的，Webpack 只会在转换过程中生成 Source Map。 为了让 Webpack 加载这些附加的 Source Map 文件，需要安装 [source-map-loader](https://github.com/webpack-contrib/source-map-loader) 。 使用方法如下：

    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            // 只加载你关心的目录下的 Source Map，以提升构建速度
            include: [path.resolve(root, 'node_modules/some-components/')],
            use: ['source-map-loader'],
            // 要把 source-map-loader 的执行顺序放到最前面，如果在 source-map-loader 之前有 Loader 转换了该 JavaScript 文件，会导致 Source Map 映射错误
            enforce: 'pre'
          }
        ]
      }
    };
    


> 由于 `source-map-loader` 在加载 Source Map 时计算量很大，因此要避免让该 Loader 处理过多的文件，不然会导致构建速度缓慢。 通常会采用 `include` 去命中只关心的文件。    

再安装新引入的依赖：

    npm i -D source-map-loader
    
重启 Webpack 后，你就能在浏览器中调试 `node_modules/some-components/` 目录下的源码了。    