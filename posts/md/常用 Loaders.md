# 常用 Loaders #

## 加载文件 ##

- [raw-loader](https://github.com/webpack-contrib/raw-loader)：把文本文件的内容加载到代码中去，在 [3-20加载SVG](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-20%E5%8A%A0%E8%BD%BDSVG.html) 中有介绍。
- [file-loader](https://github.com/webpack-contrib/file-loader)：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件，在 [3-19加载图片](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-19%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87.html)、[3-20加载 SVG](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-20%E5%8A%A0%E8%BD%BDSVG.html)、[4-9 CDN 加速](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-9CDN%E5%8A%A0%E9%80%9F.html) 中有介绍。
- [url-loader](https://github.com/webpack-contrib/url-loader)：和 `file-loader` 类似，但是能在文件很小的情况下以 `base64` 的方式把文件内容注入到代码中去，在 [3-19加载图片](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-19%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87.html)、[3-20加载 SVG](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-20%E5%8A%A0%E8%BD%BDSVG.html) 中有介绍。
- [source-map-loader](https://github.com/webpack-contrib/source-map-loader)：加载额外的 Source Map 文件，以方便断点调试，在 [3-21加载 Source Map](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-21%E5%8A%A0%E8%BD%BDSourceMap.html) 中有介绍。
- [svg-inline-loader](https://github.com/webpack-contrib/svg-inline-loader)：把压缩后的 SVG 内容注入到代码中，在 [3-20加载 SVG](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-20%E5%8A%A0%E8%BD%BDSVG.html) 中有介绍。
- [node-loader](https://github.com/webpack-contrib/svg-inline-loader)：加载 Node.js 原生模块 .node 文件。
- [image-loader](https://github.com/tcoopman/image-webpack-loader)：加载并且压缩图片文件。
- [json-loader](https://github.com/webpack-contrib/json-loader)：加载 JSON 文件。
- [yaml-loader](https://github.com/okonet/yaml-loader)：加载 YAML 文件。

## 编译模版 ##

- [pug-loader](https://github.com/pugjs/pug-loader)：把 Pug 模版转换成 JavaScript 函数返回。
- [handlebars-loader](https://github.com/pcardune/handlebars-loader)：把 Handlebars 模版编译成函数返回。
- [ejs-loader](https://github.com/okonet/ejs-loader)：把 EJS 模版编译成函数返回。
- [haml-loader](https://github.com/AlexanderPavlenko/haml-loader)：把 HAML 代码转换成 HTML。
- [markdown-loader](https://github.com/peerigon/markdown-loader)：把 Markdown 文件转换成 HTML。

## 转换脚本语言 ##

- [babel-loader](https://github.com/babel/babel-loader)：把 ES6 转换成 ES5，在 [3-1使用 ES6 语言](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-1%E4%BD%BF%E7%94%A8ES6%E8%AF%AD%E8%A8%80.html) 中有介绍。
- [ts-loader](https://github.com/TypeStrong/ts-loader)：把 TypeScript 转换成 JavaScript，在[3-2使用 TypeScript 语言](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-2%E4%BD%BF%E7%94%A8TypeScript%E8%AF%AD%E8%A8%80.html)中有遇到。
- [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)：把 TypeScript 转换成 JavaScript，性能要比 `ts-loader` 好。
- [coffee-loader](https://github.com/webpack-contrib/coffee-loader)：把 CoffeeScript 转换成 JavaScript。

## 转换样式文件 ##

- [css-loader](https://github.com/webpack-contrib/css-loader)：加载 CSS，支持模块化、压缩、文件导入等特性。
- [style-loader](https://github.com/webpack-contrib/style-loader)：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- [sass-loader](https://github.com/webpack-contrib/sass-loader)：把 SCSS/SASS 代码转换成 CSS，在[3-4使用 SCSS 语言](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-4%E4%BD%BF%E7%94%A8SCSS%E8%AF%AD%E8%A8%80.html)中有介绍。
- [postcss-loader](https://github.com/postcss/postcss-loader)：扩展 CSS 语法，使用下一代 CSS，在[3-5使用 PostCSS](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-5%E4%BD%BF%E7%94%A8PostCSS.html)中有介绍。
- [less-loader](https://github.com/webpack-contrib/less-loader)：把 Less 代码转换成 CSS 代码。
- [stylus-loader](https://github.com/shama/stylus-loader)：把 Stylus 代码转换成 CSS 代码。

## 检查代码 ##

- [eslint-loader](https://github.com/MoOx/eslint-loader)：通过 ESLint 检查 JavaScript 代码，在 [3-16检查代码](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-16%E6%A3%80%E6%9F%A5%E4%BB%A3%E7%A0%81.html)中有介绍。
- [tslint-loader](https://github.com/wbuchwalter/tslint-loader)：通过 TSLint 检查 TypeScript 代码。
- [mocha-loader](https://github.com/webpack-contrib/mocha-loader)：加载 Mocha 测试用例代码。
- [coverjs-loader](https://github.com/webpack-contrib/coverjs-loader)：计算测试覆盖率。

## 其它 ##

- [vue-loader](https://github.com/vuejs/vue-loader)：加载 Vue.js 单文件组件，在[3-7使用 Vue 框架](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-7%E4%BD%BF%E7%94%A8Vue%E6%A1%86%E6%9E%B6.html)中有介绍。
- [i18n-loader](https://github.com/webpack-contrib/i18n-loader)：加载多语言版本，支持国际化。
- [ignore-loader](https://github.com/webpack-contrib/i18n-loader)：忽略掉部分文件，在[3-11构建同构应用](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-11%E6%9E%84%E5%BB%BA%E5%90%8C%E6%9E%84%E5%BA%94%E7%94%A8.html)中有介绍。
- [ui-component-loader](https://github.com/gwuhaolin/ui-component-loader)：按需加载 UI 组件库，例如在使用 antd UI 组件库时，不会因为只用到了 Button 组件而打包进所有的组件。