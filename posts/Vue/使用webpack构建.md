# 使用webpack构建 #

webpack的主要适用场景时单页面富应用（SPA）。SPA通过是由一个`html`文件和一堆按需加载的`js`文件组成。

`export`和`import`是用来导出和导入模块的。一个模块就是一个`js`文件，它拥有独立的作用域，里面定义的变量外部是无法获取的。

在`module`对象的`rules`属性中可以指定一系列的`loaders`，每一个`loader`都必须包含`test`和`use`两个选项。

当`webpack`编译过程中遇到`require()`或`import`语句导入一个后缀名为`.css`的文件时，先将它通过`css-loader`转换，再通过`style-loader`转换，然后继续打包。`use`选项的值可以是数组或字符串，如果是数组，它的编译顺序就是从后往前。

> webpack的主要核心部分包括**入口（Entry）**、**出口（Output）**、**加载器（Loaders）**、**插件（Plugin）**。

# 单文件组件与`vue-loader` #

`<style>`标签使用`scoped`属性，表示当前的CSS只在这个组件有效，如果不加，name`div`的样式会应用到整个项目。

使用`.vue`文件需要先安装`vue-loader`、`vue-style-loader`等加载器并做配置。如果要使用ES6语法，还需要安装`babel`和`babel-loader`等加载器。

<p data-height="465" data-theme-id="0" data-slug-hash="NzjNgp" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="Vue-webpack.config.js" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/NzjNgp/">Vue-webpack.config.js</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

新建`.babelrc`文件，并写入`babel`的配置，webpack会依赖此配置文件来使用`babel`编译ES6代码。

    {
      "presets": ["es2015"],
      "plugins": ["transform-runtime"],
      "comments": false
    }
    
**每个`.vue`**文件代表一个组件，组件之间可以相互依赖。

**ES语法：**

`=>`是箭头函数

    render: h=>h(App)等同于
        render: function(h) {
            return h(App)
        }
        
    也等同于：
        render: h=>{
            return h(App)
        }
        
箭头函数里的`this`指向与普通函数不一样，箭头函数体内的`this`对象就是定义时所在的对象，而不是使用时所在的对象。