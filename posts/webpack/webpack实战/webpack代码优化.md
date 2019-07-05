# webpack代码优化 #

**代码分片**，把原来的代码进行**提取**和**分离**，使客户端尽可能地只加载当前需要的资源。

**提取**，把代码中重复或不经常变动的部分将其作为一个独立的资源打包。

**分离**，将部分代码延迟加载或动态加载，通过`import()`实现。

    export function add(a, b) {
      return a + b;
    }
    
    import('./util').then(({
      add
    }) => {
      console.log(add(2, 3))
    })

使用`import()`加载的模块及其依赖模块会构建出一个`async chunk`，并在页面上延迟加载。

这种方法适用于处理第三方库以及用户不会立即使用的功能，或者配合SPA路由，将页面级别的代码全部使用动态加载。

**在Vue中的实现：**

    const Home = () => import('./Home.vue');
    const router = new VueRouter({
      routes: [{
        path: '/',
        component: Home
      }]
    })

**在React中的实现：**

    const Home = lazy(() => import('./routes/Home'));
    const App = () => {
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Suspense>
      </Router>
    }

**排除非必要资源**，借助`ignorePlugin`将语言包模块进行忽略。

**减小CSS体积**，压缩代码。

    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const OptimizeCSSAssetsPlugin = require('optimize-css-assets-plugin');
    module.exports = {
      optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin()]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css'
        })
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          }
        ]
      }
    };

**`url-loader`容易导致CSS文件体积过大。**检查CSS内容中是否包含过多图片的base64 URI。

**`url-loader`的`limit`设置：**

    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
            },
          }
        ],
      }
    ]

**使用Brotli进行资源压缩**，Google开发的无损压缩算法，可以在几乎相同的速度下比gzip得到更好的压缩效果，并且已经被绝大多数浏览器所支持。

    const BrotliPlugin = require('brotli-webpack-plugin');
    module.exports = {
        plugins: [
            new BrotliPlugin({
                asset: '[path].br',
                test: /\.(js|css|svg)$/
            })
        ],
    };

**资源打包分析和监控**

1. `webpack-bundle-analyzer`，可视化展示输出资源的构成
2. `size-plugin`，在每次执行打包命令后打印出本次构建的资源体积，并和上次构建结果进行对比。
3. `Import Cost`，VSCode扩展，在模块加载语句旁边展示所加载模块的大小。

**安装 `extract-text-webpack-plugin`**

**修改 `webpack.config.js` 文件**

    var ExtractTextPlugin = require("extract-text-webpack-plugin");

    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        loader: 'css-loader',
      })
    }


`plugins`新增`new ExtractTextPlugin`

    plugins: [
      new ExtractTextPlugin({
        filename: "[name].bundle.css",
        allChunks: true,
      }),
    ]

**排除`jQuery`，告诉`webpack`我们会自行载入外部的`jQuery`**

**使用`html-webpack-plugins`处理HTML，这个插件提供了`favicon`**

    const htmlPlugin = new HtmlWebpackPlugin({
        favicon: path.resolve(publicDir, './img/favicon.ico')
    });
    pluginsConfig.push(htmlPlugin);

