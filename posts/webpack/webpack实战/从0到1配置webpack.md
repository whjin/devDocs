# 从0到1配置webpack #

**忽略创建项目目录，相应文件的过程，直接进入配置阶段。**

**安装依赖**

    npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

**设置`.babelrc`**

    {
      "presets": ["@babel/preset-env", "@babel/preset-react"]
    }

**配置模块**

    module.exports = {
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }
    };
