# 常用 Plugins #

## 用于修改行为 ##

- [define-plugin](https://webpack.js.org/plugins/define-plugin/)：定义环境变量，在[4-7区分环境](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-7%E5%8C%BA%E5%88%86%E7%8E%AF%E5%A2%83.html)中有介绍。
- [context-replacement-plugin](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-7%E5%8C%BA%E5%88%86%E7%8E%AF%E5%A2%83.html)：修改 require 语句在寻找文件时的默认行为。
- [ignore-plugin](https://webpack.js.org/plugins/ignore-plugin/)：用于忽略部分文件。

## 用于优化 ##

- [commons-chunk-plugin](https://webpack.js.org/plugins/commons-chunk-plugin/)：提取公共代码，在[4-11提取公共代码](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-11%E6%8F%90%E5%8F%96%E5%85%AC%E5%85%B1%E4%BB%A3%E7%A0%81.html)中有介绍。
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)：提取 JavaScript 中的 CSS 代码到单独的文件中，在[1-5使用 Plugin](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-5%E4%BD%BF%E7%94%A8Plugin.html) 中有介绍。
- [prepack-webpack-plugin](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-5%E4%BD%BF%E7%94%A8Plugin.html)：通过 Facebook 的 Prepack 优化输出的 JavaScript 代码性能，在 [4-13使用 Prepack](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-13%E4%BD%BF%E7%94%A8Prepack.html) 中有介绍。
- [uglifyjs-webpack-plugin](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-13%E4%BD%BF%E7%94%A8Prepack.html)：通过 UglifyES 压缩 ES6 代码，在 [4-8压缩代码](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-13%E4%BD%BF%E7%94%A8Prepack.html)中有介绍。
- [webpack-parallel-uglify-plugin](https://github.com/gdborton/webpack-parallel-uglify-plugin)：多进程执行 UglifyJS 代码压缩，提升构建速度。
- [imagemin-webpack-plugin](https://www.npmjs.com/package/imagemin-webpack-plugin)：压缩图片文件。
- [webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith)：用插件制作雪碧图。
- [ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)：开启 Webpack Scope Hoisting 功能，在[4-14开启 ScopeHoisting](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-14%E5%BC%80%E5%90%AFScopeHoisting.html)中有介绍。
- [dll-plugin](https://webpack.js.org/plugins/dll-plugin/)：借鉴 DDL 的思想大幅度提升构建速度，在[4-2使用 DllPlugin](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-2%E4%BD%BF%E7%94%A8DllPlugin.html)中有介绍。
- [hot-module-replacement-plugin](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-2%E4%BD%BF%E7%94%A8DllPlugin.html)：开启模块热替换功能。

## 其它 ##

- [serviceworker-webpack-plugin](serviceworker-webpack-plugin：给网页应用增加离线缓存功能，在3-14 构建离线应用中有介绍。)：给网页应用增加离线缓存功能，在[3-14 构建离线应用](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-14%E6%9E%84%E5%BB%BA%E7%A6%BB%E7%BA%BF%E5%BA%94%E7%94%A8.html)中有介绍。
- [stylelint-webpack-plugin](https://github.com/JaKXz/stylelint-webpack-plugin)：集成 `stylelint` 到项目中，在[3-16检查代码](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-16%E6%A3%80%E6%9F%A5%E4%BB%A3%E7%A0%81.html)中有介绍。
- [i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)：给你的网页支持国际化。
- [provide-plugin](https://webpack.js.org/plugins/provide-plugin/)：从环境中提供的全局变量中加载模块，而不用导入对应的文件。
- [web-webpack-plugin](https://github.com/gwuhaolin/web-webpack-plugin)：方便的为单页应用输出 HTML，比 html-webpack-plugin 好用。