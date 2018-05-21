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

## 使用 Plugin ##

