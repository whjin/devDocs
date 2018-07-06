# webpack配置 #

配置 Webpack 的方式有两种：

1. 通过一个 JavaScript 文件描述配置，例如使用 `webpack.config.js` 文件里的配置；
2. 执行 Webpack 可执行文件时通过命令行参数传入，例如 `webpack --devtool source-map`。

这两种方式可以相互搭配，例如执行 Webpack 时通过命令 `webpack --config webpack-dev.config.js` 指定配置文件，再去 `webpack-dev.config.js` 文件里描述部分配置。

按照配置**所影响的功能**来划分，可分为：

- **Entry** 配置模块的入口；
- **Output** 配置如何输出最终想要的代码；
- **Module** 配置处理模块的规则；
- **Resolve** 配置寻找模块的规则；
- **Plugins** 配置扩展插件；
- **DevServer** 配置 DevServer；
- **其它配置项** 其它零散的配置项；
- **整体配置结构** 整体地描述各配置项的结构；
- **多种配置类型** 配置文件不止可以返回一个 Object，还有其他返回形式；
- **配置总结** 寻找配置 Webpack 的规律，减少思维负担。

## Entry ##

Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。

如果想改变 context 的默认配置，可以在配置文件里设置：

    module.exports = {
      context: path.resolve(__dirname, 'app')
    }
    
注意， context 必须是一个绝对路径的字符串。 除此之外，还可以通过在启动 Webpack 时带上参数 `webpack --context` 来设置 context。    

### Chunk 名称 ###

Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关：

- 如果 entry 是一个 `string` 或 `array`，就只会生成一个 Chunk，这时 Chunk 的名称是 `main`；
- 如果 entry 是一个 `object`，就可能会出现多个 Chunk，这时 Chunk 的名称是 `object` 键值对里键的名称。

### 配置动态 Entry ###

假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置，代码如下：

    // 同步函数
    entry: () => {
      return {
        a:'./pages/a',
        b:'./pages/b',
      }
    };
    // 异步函数
    entry: () => {
      return new Promise((resolve)=>{
        resolve({
           a:'./pages/a',
           b:'./pages/b',
        });
      });
    };

## Output ##

`output` 配置如何输出最终想要的代码。`output` 是一个 `object`，里面包含一系列配置项：

### filename ###

`output.filename` 配置输出文件的名称，为 string 类型。 如果只有一个输出文件，则可以把它写成静态不变的：

    filename: 'bundle.js'
    
但是在有多个 Chunk 要输出时，就需要借助模版和变量了。前面说到 Webpack 会为每个 Chunk取一个名称，可以根据 Chunk 的名称来区分输出的文件名：

    filename: '[name].js'
    
代码里的 `[name]` 代表用内置的 `name` 变量去替换`[name]`，这时你可以把它看作一个字符串模块函数， 每个要输出的 Chunk 都会通过这个函数去拼接出输出的文件名称。  

| 变量名        | 含义           
| ------------- |:-------------
| id    | Chunk 的唯一标识，从0开始
| name     | Chunk 的名称      
| hash | Chunk 的唯一标识的 Hash 值
| chunkhash | Chunk 内容的 Hash 值

其中 `hash` 和 `chunkhash` 的长度是可指定的，`[hash:8]` 代表取8位 Hash 值，默认是20位。

> 注意 ExtractTextWebpackPlugin 插件是使用 `contenthash` 来代表哈希值而不是 `chunkhash`， 原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身而不是由一组模块组成的 Chunk。

### chunkFilename ###

`output.chunkFilename` 配置无入口的 Chunk 在输出时的文件名称。 `chunkFilename` 和上面的 `filename` 非常类似，但 chunkFilename 只用于指定在运行过程中生成的 Chunk 在输出时的文件名称。 常见的会在运行时生成 Chunk 场景有在使用 `CommonChunkPlugin`、使用 `import('path/to/module')` 动态加载等时。 chunkFilename 支持和 filename 一致的内置变量。

**path**

`output.path` 配置输出文件存放在本地的目录，必须是 string 类型的绝对路径。通常通过 Node.js 的 `path` 模块去获取绝对路径：

    path: path.resolve(__dirname, 'dist_[hash]')
    
### publicPath ###

在复杂的项目里可能会有一些构建出的资源需要异步加载，加载这些异步资源需要对应的 URL 地址。

`output.publicPath` 配置发布到线上资源的 URL 前缀，为string 类型。 默认值是空字符串 `''`，即使用相对路径。

把构建出的资源文件上传到 CDN 服务上，以利于加快页面的打开速度。配置代码如下：

    filename:'[name]_[chunkhash:8].js'
    publicPath: 'https://cdn.example.com/assets/'
    
这时发布到线上的 HTML 在引入 JavaScript 文件时就需要：

    <script src='https://cdn.example.com/assets/a_12345678.js'></script>
    
使用该配置项时要小心，稍有不慎将导致资源加载404错误。

`output.path` 和 `output.publicPath` 都支持字符串模版，内置变量只有一个：`hash` 代表一次编译操作的 Hash 值。

### crossOriginLoading ###

Webpack 输出的部分代码块可能需要异步加载，而异步加载是通过 `JSONP` 方式实现的。 `JSONP` 的原理是动态地向 HTML 中插入一个 `<script src="url"></script>` 标签去加载异步资源。

`output.crossOriginLoading` 则是用于配置这个异步插入的标签的 `crossorigin` 值。

script 标签的 `crossorigin` 属性可以取以下值：

- `false`(默认) 在加载此脚本资源时不会带上用户的 Cookies；
- `use-credentials` 在加载此脚本资源时会带上用户的 Cookies。

通常用设置 `crossorigin` 来获取异步加载的脚本执行时的详细错误信息。

### libraryTarget 和 library ###

当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们。

- `output.libraryTarget` 配置以何种方式导出库。
- `output.library` 配置导出库的名称。

假如配置了 `output.library='LibraryName'`，则输出和使用的代码如下：

    // Webpack 输出的代码
    var LibraryName = lib_code;
    
    // 使用库的方法
    LibraryName.doSomething();
    
假如 `output.library` 为空，则将直接输出：`lib_code`

> 其中 `lib_code` 代指导出库的代码内容，是有返回值的一个自执行函数。

它们通常搭配在一起使用。

`output.libraryTarget` 是字符串的枚举类型，支持以下配置。

### var (默认) ###

编写的库将通过 `var` 被赋值给通过 `library` 指定名称的变量。

### commonjs ###

编写的库将通过 CommonJS2 规范导出，输出和使用的代码如下：

    // Webpack 输出的代码
    module.exports = lib_code;
    
    // 使用库的方法
    require('library-name-in-npm').doSomething();
    
> CommonJS2 和 CommonJS 规范很相似，差别在于 CommonJS 只能用 `exports` 导出，而 CommonJS2 在 CommonJS 的基础上增加了 `module.exports` 的导出方式。

在 `output.libraryTarget` 为 commonjs2 时，配置 `output.library` 将没有意义。    

### this ###

编写的库将通过 `this` 被赋值给通过 `library` 指定的名称，输出和使用的代码如下：

// Webpack 输出的代码
this['LibraryName'] = lib_code;

// 使用库的方法
this.LibraryName.doSomething();

### window ###

编写的库将通过 `window` 被赋值给通过 `library` 指定的名称，即把库挂载到 `window` 上，输出和使用的代码如下：

    // Webpack 输出的代码
    window['LibraryName'] = lib_code;
    
    // 使用库的方法
    window.LibraryName.doSomething();
    
### global ###

编写的库将通过 `global` 被赋值给通过 `library` 指定的名称，即把库挂载到 `global` 上，输出和使用的代码如下：
    
    // Webpack 输出的代码
    global['LibraryName'] = lib_code;
    
    // 使用库的方法
    global.LibraryName.doSomething();
    
### libraryExport ###

`output.libraryExport` 配置要导出的模块中哪些子模块需要被导出。 它只有在 `output.libraryTarget` 被设置成 `commonjs` 或者 `commonjs2` 时使用才有意义。

假如要导出的模块源代码是：

    export const a=1;
    export default b=2;
    
现在想让构建输出的代码只导出其中的 `a`，可以把 `output.libraryExport` 设置成 `a`，那么构建输出的代码和使用方法将变成如下：    

    // Webpack 输出的代码
    module.exports = lib_code['a'];
    
    // 使用库的方法
    require('library-name-in-npm')===1;

## Module ##

### 配置 Loader ###

`rules` 配置模块的读取和解析规则，通常用来配置 `Loader`。其类型是一个数组，数组里每一项都描述了如何去处理部分文件。 配置一项 `rules` 时大致通过以下方式：

1. **条件匹配**：通过 `test` 、 `include` 、 `exclude` 三个配置项来命中 Loader 要应用规则的文件。
2. **应用规则**：对选中后的文件通过 `use` 配置项来应用 Loader，可以只应用一个 Loader 或者按照**从后往前**的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。
3. **重置顺序**：一组 Loader 的执行顺序**默认是从右到左执行**，通过 `enforce` 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。

```
module: {
  rules: [
    {
      // 命中 JavaScript 文件
      test: /\.js$/,
      // 用 babel-loader 转换 JavaScript 文件
      // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
      use: ['babel-loader?cacheDirectory'],
      // 只命中src目录里的js文件，加快 Webpack 搜索速度
      include: path.resolve(__dirname, 'src')
    },
    {
      // 命中 SCSS 文件
      test: /\.scss$/,
      // 使用一组 Loader 去处理 SCSS 文件。
      // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
      use: ['style-loader', 'css-loader', 'sass-loader'],
      // 排除 node_modules 目录下的文件
      exclude: path.resolve(__dirname, 'node_modules'),
    },
    {
      // 对非文本文件采用 file-loader 加载
      test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
      use: ['file-loader'],
    },
  ]
}
```

在 Loader 需要传入很多参数时，你还可以通过一个 `Object` 来描述，例如在上面的 `babel-loader` 配置中有如下代码：

    use: [
      {
        loader:'babel-loader',
        options:{
          cacheDirectory:true,
        },
        // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
        // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
        enforce:'post'
      },
      // 省略其它 Loader
    ]
    
上面的例子中 `test include exclude` 这三个命中文件的配置项只传入了一个字符串或正则，其实它们还都支持数组类型，使用如下：    

    {
      test:[
        /\.jsx?$/,
        /\.tsx?$/
      ],
      include:[
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'tests'),
      ],
      exclude:[
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_modules'),
      ]
    }

数组里的每项之间是**或**的关系，即文件路径符合数组中的任何一个条件就会被命中。

### noParse ###

`noParse` 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。 原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

`noParse` 是可选配置项，类型需要是 `RegExp`、`[RegExp]`、`function` 其中一个。

例如想要忽略掉 jQuery 、ChartJS，可以使用如下代码：

    // 使用正则表达式
    noParse: /jquery|chartjs/
    
    // 使用函数，从 Webpack 3.0.0 开始支持
    noParse: (content)=> {
      // content 代表一个模块的文件路径
      // 返回 true or false
      return /jquery|chartjs/.test(content);
    }

> 注意被忽略掉的文件里不应该包含 `import` 、 `require` 、 `define` 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

### parser ###

因为 Webpack 是以模块化的 JavaScript 文件为入口，所以内置了对模块化 JavaScript 的解析功能，支持 `AMD`、`CommonJS`、`SystemJS`、`ES6`。 

`parser` 属性可以更细粒度的配置哪些模块语法要解析哪些不解析，和 `noParse` 配置项的区别在于 `parser` 可以精确到语法层面， 而 `noParse` 只能控制哪些文件不被解析。 `parser` 使用如下：

    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          parser: {
          amd: false, // 禁用 AMD
          commonjs: false, // 禁用 CommonJS
          system: false, // 禁用 SystemJS
          harmony: false, // 禁用 ES6 import/export
          requireInclude: false, // 禁用 require.include
          requireEnsure: false, // 禁用 require.ensure
          requireContext: false, // 禁用 require.context
          browserify: false, // 禁用 browserify
          requireJs: false, // 禁用 requirejs
          }
        },
      ]
    }

## Resolve ##

Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，`Resolve` 配置 Webpack 如何寻找模块所对应的文件。 Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。

### alias ###

`resolve.alias` 配置项通过别名来把原导入路径映射成一个新的导入路径。例如使用以下配置：

    // Webpack alias 配置
    resolve:{
      alias:{
        components: './src/components/'
      }
    }

当你通过 `import Button from 'components/button'` 导入时，实际上被 `alias` 等价替换成了 `import Button from './src/components/button'`。

以上 `alias` 配置的含义是把导入语句里的 `components` 关键字替换成 `./src/components/`。

这样做可能会命中太多的导入语句，`alias` 还支持 `$` 符号来缩小范围到只命中以关键字结尾的导入语句：

    resolve:{
      alias:{
        'react$': '/path/to/react.min.js'
      }
    }
    
`react$` 只会命中以 `react` 结尾的导入语句，即只会把 `import 'react'` 关键字替换成 `import '/path/to/react.min.js'`。

### mainFields ###

有一些第三方模块会针对不同环境提供几分代码。 例如分别提供采用 ES5 和 ES6 的2份代码，这2份代码的位置写在 `package.json` 文件里，如下：

    {
      "jsnext:main": "es/index.js",// 采用 ES6 语法的代码入口文件
      "main": "lib/index.js" // 采用 ES5 语法的代码入口文件
    }

Webpack 会根据 `mainFields` 的配置去决定优先采用哪份代码，`mainFields` 默认如下：

    mainFields: ['browser', 'main']

Webpack 会按照数组里的顺序去 `package.json` 文件里寻找，只会使用找到的第一个。

假如你想优先采用 ES6 的那份代码，可以这样配置：

    mainFields: ['jsnext:main', 'browser', 'main']

### extensions ###

在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。 `resolve.extensions` 用于配置在尝试过程中用到的后缀列表，默认是：

    extensions: ['.js', '.json']
    
### modules ###

`resolve.modules` 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 `node_modules` 目录下寻找。 

有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样 `import '../../../components/button'` 这时你可以利用 `modules` 配置项优化，假如那些被大量导入的模块都在 `./src/components` 目录下，把 `modules` 配置成：

    modules:['./src/components','node_modules']
    
后，你可以简单通过 `import 'button'` 导入。

### descriptionFiles ###

`resolve.descriptionFiles` 配置描述第三方模块的文件名称，也就是 `package.json` 文件。默认如下：

    descriptionFiles: ['package.json']
    
### enforceExtension ###

`resolve.enforceExtension` 如果配置为 `true` 所有导入语句都必须要带文件后缀， 例如开启前 `import './foo'` 能正常工作，开启后就必须写成 `import './foo.js'`。

### enforceModuleExtension ###

`enforceModuleExtension` 和 `enforceExtension` 作用类似，但 `enforceModuleExtension` 只对 `node_modules` 下的模块生效。 

`enforceModuleExtension` 通常搭配 `enforceExtension` 使用，在 `enforceExtension:true` 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 `enforceModuleExtension:false` 来兼容第三方模块。

## Plugins ##

Plugin 用于扩展 Webpack 功能，各种各样的 Plugin 几乎让 Webpack 可以做任何构建相关的事情。

### 配置 Plugin ###

Plugin 的配置很简单，`plugins` 配置项接受一个数组，数组里每一项都是一个要使用的 Plugin 的实例，Plugin 需要的参数通过**构造函数**传入。

    const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
    
    module.exports = {
      plugins: [
        // 所有页面都会用到的公共代码提取到 common 代码块中
        new CommonsChunkPlugin({
          name: 'common',
          chunks: ['a', 'b']
        }),
      ]
    };
    
使用 Plugin 的难点在于掌握 Plugin 本身提供的配置项，而不是如何在 Webpack 中接入 Plugin。    

## DevServer ##

要配置 DevServer ，除了在配置文件里通过 `devServer` 传入参数外，还可以通过命令行参数传入。 注意只有在通过 `DevServer` 去启动 Webpack 时配置文件里 `devServer` 才会生效，因为这些参数所对应的功能都是 DevServer 提供的，Webpack 本身并不认识 `devServer` 配置项。

### hot ###

`devServer.hot` 配置是否启用模块热替换功能。 

`DevServer` 默认的行为是在发现源代码被更新后会通过自动刷新整个页面来做到实时预览，开启模块热替换功能后将在不刷新整个页面的情况下通过用新模块替换老模块来做到实时预览。

### inline ###

DevServer 的实时预览功能依赖一个注入到页面里的代理客户端去接受来自 DevServer 的命令和负责刷新网页的工作。 

`devServer.inline` 用于配置是否自动注入这个代理客户端到将运行在页面里的 Chunk 里去，默认是会自动注入。 DevServer 会根据你是否开启 `inline` 来调整它的自动刷新策略：

- 如果开启 `inline`，DevServer 会在构建完变化后的代码时通过代理客户端控制网页刷新。
- 如果关闭 `inline`，DevServer 将无法直接控制要开发的网页。这时它会通过 `iframe` 的方式去运行要开发的网页，当构建完变化后的代码时通过刷新 `iframe` 来实现实时预览。 

如果你想使用 DevServer 去自动刷新网页实现实时预览，最方便的方法是直接开启 `inline`。

### historyApiFallback ###

`devServer.historyApiFallback` 用于方便的开发使用了 HTML5 History API 的单页应用。 

这类单页应用要求服务器在针对任何命中的路由时都返回一个对应的 HTML 文件，例如在访问 `http://localhost/user` 和 `http://localhost/home` 时都返回 `index.html` 文件， 浏览器端的 JavaScript 代码会从 URL 里解析出当前页面的状态，显示出对应的界面。

配置 `historyApiFallback` 最简单的做法是：

    historyApiFallback: true
    
这会导致任何请求都会返回 `index.html` 文件，这只能用于只有一个 HTML 文件的应用。    

如果你的应用由多个单页应用组成，这就需要 DevServer 根据不同的请求来返回不同的 HTML 文件，配置如下：

    historyApiFallback: {
      // 使用正则匹配命中路由
      rewrites: [
        // /user 开头的都返回 user.html
        { from: /^\/user/, to: '/user.html' },
        { from: /^\/game/, to: '/game.html' },
        // 其它的都返回 index.html
        { from: /./, to: '/index.html' },
      ]
    }
    
### contentBase ###

`devServer.contentBase` 配置 DevServer HTTP 服务器的文件根目录。 默认情况下为当前执行目录，通常是项目根目录，所有一般情况下你不必设置它，除非你有额外的文件需要被 DevServer 服务。 例如你想把项目根目录下的 `public` 目录设置成 DevServer 服务器的文件根目录，你可以这样配置：

    devServer:{
      contentBase: path.join(__dirname, 'public')
    }

这里需要指出可能会让你疑惑的地方，DevServer 服务器通过 HTTP 服务暴露出的文件分为两类：

- 暴露本地文件。
- 暴露 Webpack 构建出的结果，由于构建出的结果交给了 DevServer，所以你在使用了 DevServer 时在本地找不到构建出的文件。

`contentBase` 只能用来配置暴露本地文件的规则，你可以通过 `contentBase:false` 来关闭暴露本地文件。

### headers ###

`devServer.headers` 配置项可以在 HTTP 响应中注入一些 HTTP 响应头，使用如下：

    devServer:{
      headers: {
        'X-foo':'bar'
      }
    }

### host ###

`devServer.host` 配置项用于配置 DevServer 服务监听的地址。 

例如你想要局域网中的其它设备访问你本地的服务，可以在启动 DevServer 时带上 `--host 0.0.0.0`。 `host` 的默认值是 `127.0.0.1` 即只有本地可以访问 DevServer 的 HTTP 服务。

### port ###

`devServer.port` 配置项用于配置 DevServer 服务监听的端口，默认使用 `8080` 端口。 如果 `8080` 端口已经被其它程序占有就使用 `8081`，如果 `8081` 还是被占用就使用 `8082`，以此类推。

### allowedHosts ###

`devServer.allowedHosts` 配置一个白名单列表，只有 HTTP 请求的 HOST 在列表里才正常返回，使用如下：

    allowedHosts: [
      // 匹配单个域名
      'host.com',
      'sub.host.com',
      // host2.com 和所有的子域名 *.host2.com 都将匹配
      '.host2.com'
    ]

### disableHostCheck ###

`devServer.disableHostCheck` 配置项用于配置是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。 

DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。 它通常用于搭配 `--host 0.0.0.0` 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查。

### https ###

DevServer 默认使用 HTTP 协议服务，它也能通过 HTTPS 协议服务。 有些情况下你必须使用 HTTPS，例如 HTTP2 和 Service Worker 就必须运行在 HTTPS 之上。 要切换成 HTTPS 服务，最简单的方式是：

    devServer:{
      https: true
    }

DevServer 会自动的为你生成一份 HTTPS 证书。

如果你想用自己的证书可以这样配置：

    devServer:{
      https: {
        key: fs.readFileSync('path/to/server.key'),
        cert: fs.readFileSync('path/to/server.crt'),
        ca: fs.readFileSync('path/to/ca.pem')
      }
    }

### clientLogLevel ###

`devServer.clientLogLevel` 配置在客户端的日志等级，这会影响到你在浏览器开发者工具控制台里看到的日志内容。 

`clientLogLevel` 是**枚举类型**，可取如下之一的值 `none | error | warning | info`。 默认为 `info` 级别，即输出所有类型的日志，设置成 `none` 可以不输出任何日志。

### compress ###

`devServer.compress` 配置是否启用 gzip 压缩。`boolean` 为类型，默认为 `false`。

### open ###

`devServer.open` 用于在 DevServer 启动且第一次构建完时自动用你系统上默认的浏览器去打开要开发的网页。 同时还提供 `devServer.openPage` 配置项用于打开指定 URL 的网页。

## 其它配置项 ##

### Target ###

`target` 配置项可以让 Webpack 构建出针对不同运行环境的代码。 target 可以是以下之一：

| target值        | 描述           
| ------------- |-------------
| web    | 	针对浏览器 **(默认)**，所有代码都集中在一个文件里
| node     | 针对 Node.js，使用 `require` 语句加载 Chunk 代码    
| async-node | 	针对 Node.js，异步加载 Chunk 代码
| webworker | 针对 WebWorker
| electron-main | 针对 [Electron](https://electronjs.org/) 主线程
| electron-renderer | 针对 Electron 渲染线程

例如当你设置 `target:'node'` 时，源代码中导入 Node.js 原生模块的语句 `require('fs')` 将会被保留，`fs` 模块的内容不会打包进 Chunk 里。

### Devtool ###

`devtool` 配置 Webpack 如何生成 Source Map，默认值是 `false` 即不生成 Source Map，想为构建出的代码生成 Source Map 以方便调试，可以这样配置：

    module.export = {
      devtool: 'source-map'
    }

### Watch 和 WatchOptions ###

前面介绍过 Webpack 的监听模式，它支持监听文件更新，在文件发生变化时重新编译。在使用 Webpack 时监听模式默认是关闭的，想打开需要如下配置：

    module.export = {
      watch: true
    }

在使用 DevServer 时，监听模式默认是开启的。

除此之外，Webpack 还提供了 `watchOptions` 配置项去更灵活的控制监听模式，使用如下：

    module.export = {
      // 只有在开启监听模式时，watchOptions 才有意义
      // 默认为 false，也就是不开启
      watch: true,
      // 监听模式运行时的参数
      // 在开启监听模式时，才有意义
      watchOptions: {
        // 不监听的文件或文件夹，支持正则匹配
        // 默认为空
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        // 默认为 300ms  
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
        // 默认每1000豪秒去问1次
        poll: 1000
      }
    }

### Externals ###

Externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。

有些 JavaScript 运行环境可能内置了一些全局变量或者模块，例如在你的 HTML HEAD 标签里通过以下代码：

    <script src="path/to/jquery.js"></script>
    
引入 jQuery 后，全局变量 `jQuery` 就会被注入到网页的 JavaScript 运行环境里。

如果想在使用模块化的源代码里导入和使用 jQuery，可能需要这样：

    import $ from 'jquery';
    $('.my-element');

构建后你会发现输出的 Chunk 里包含的 jQuery 库的内容，这导致 jQuery 库出现了2次，浪费加载流量，最好是 Chunk 里不会包含 jQuery 库的内容。

Externals 配置项就是为了解决这个问题。

通过 `externals` 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量，针对这些全局变量不用打包进代码中而是直接使用全局变量。 要解决以上问题，可以这样配置 `externals`：

    module.export = {
      externals: {
        // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
        jquery: 'jQuery'
      }
    }

### ResolveLoader ###

ResolveLoader 用来告诉 Webpack 如何去寻找 Loader，因为在使用 Loader 时是通过其包名称去引用的， Webpack 需要根据配置的 Loader 包名去找到 Loader 的实际代码，以调用 Loader 去处理源文件。

ResolveLoader 的默认配置如下：

    module.exports = {
      resolveLoader:{
        // 去哪个目录下寻找 Loader
        modules: ['node_modules'],
        // 入口文件的后缀
        extensions: ['.js', '.json'],
        // 指明入口文件位置的字段
        mainFields: ['loader', 'main']
      }
    }

该配置项常用于加载本地的 Loader。

## 整体配置结构 ##

之前的章节分别讲述了每个配置项的具体含义，但没有描述它们所处的位置和数据结构，下面通过一份代码来描述清楚：

<p data-height="565" data-theme-id="0" data-slug-hash="RyORja" data-default-tab="js,result" data-user="whjin" data-embed-version="2" data-pen-title="webpack整体配置" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/RyORja/">webpack整体配置</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 多种配置类型 ##

除了通过导出一个 Object 来描述 Webpack 所需的配置外，还有其它更灵活的方式，以简化不同场景的配置。

### 导出一个 Function ###

在大多数时候你需要从同一份源代码中构建出多份代码，例如一份用于开发时，一份用于发布到线上。

如果采用导出一个 Object 来描述 Webpack 所需的配置的方法，需要写两个文件。 一个用于开发环境，一个用于线上环境。再在启动时通过 `webpack --config webpack.config.js` 指定使用哪个配置文件。

采用导出一个 Function 的方式，能通过 JavaScript 灵活的控制配置，做到只写一个配置文件就能完成以上要求。

导出一个 Function 的使用方式如下：

<p data-height="365" data-theme-id="0" data-slug-hash="zjXBmQ" data-default-tab="js,result" data-user="whjin" data-embed-version="2" data-pen-title="webpack-导出一个Function" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/zjXBmQ/">webpack-导出一个Function</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

在运行 Webpack 时，会给这个函数传入2个参数，分别是：

1. `env`：当前运行时的 Webpack 专属环境变量，`env` 是一个 Object。读取时直接访问 Object 的属性，设置它需要在启动 Webpack 时带上参数。例如启动命令是 `webpack --env.production --env.bao=foo` 时，则 `env` 的值是 `{"production":"true","bao":"foo"}`。
2. `argv`：代表在启动 Webpack 时所有通过命令行传入的参数，例如 `--config、--env、--devtool`，可以通过 `webpack -h` 列出所有 Webpack 支持的命令行参数。

就以上配置文件而言，在开发时执行命令 webpack 构建出方便调试的代码，在需要构建出发布到线上的代码时执行 `webpack --env.production` 构建出压缩的代码。

### 导出一个返回 Promise 的函数 ###

在有些情况下你不能以同步的方式返回一个描述配置的 Object，Webpack 还支持导出一个返回 Promise 的函数，使用如下：

    module.exports = function(env = {}, argv) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            // ...
          })
        }, 5000)
      })
    }

### 导出多份配置 ###

除了只导出一份配置外，Webpack 还支持导出一个数组，数组中可以包含每份配置，并且每份配置都会执行一遍构建。

使用如下：

    module.exports = [
      // 采用 Object 描述的一份配置
      {
        // ...
      },
      // 采用函数描述的一份配置
      function() {
        return {
          // ...
        }
      },
      // 采用异步函数描述的一份配置
      function() {
        return Promise();
      }
    ]

以上配置会导致 Webpack 针对这三份配置执行三次不同的构建。

这特别适合于用 Webpack 构建一个要上传到 Npm 仓库的库，因为库中可能需要包含多种模块化格式的代码，例如 CommonJS、UMD。

## 配置总结 ##

从前面的配置看来选项很多，Webpack 内置了很多功能。 

你不必都记住它们，只需要大概明白 Webpack 原理和核心概念去判断选项大致属于哪个大模块下，再去查详细的使用文档。

通常你可用如下经验去判断如何配置 Webpack：

- 想让**源文件**加入到构建流程中去被 Webpack 控制，配置 `entry`。
- 想自定义**输出文件的位置和名称**，配置 `output`。
- 想自定义**寻找依赖模块时的策略**，配置 `resolve`。
- 想自定义**解析和转换文件的策略**，配置 `module`，通常是配置 `module.rules` 里的 Loader。
- 其它的大部分需求可能要通过 Plugin 去实现，配置 `plugin`。