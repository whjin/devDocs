# CSS代码拆分 #

## 安装 `extract-text-webpack-plugin` ##

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

