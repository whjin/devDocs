# vue项目部署github pages #

`vue-cli3`项目部署在`github pages`的具体步骤：

> 参考官方文档：
> [GitHub Pages](https://cli.vuejs.org/zh/guide/deployment.html#github-pages)
> [本地预览](https://cli.vuejs.org/zh/guide/deployment.html#本地预览)

**本地预览**

第一步：先使用`npm run build`构建`dist`文件夹，再使用Node.js静态服务器进行预览。

    npm install -g serve
    # -s 参数的意思是将其架设在 Single-Page Application 模式下
    # 这个模式会处理即将提到的路由问题
    serve -s dist

第二步：在根目录创建`vue.config.js`设置`publicPath`。

```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-project/'
    : '/'
}
```

这里的`my-project`为仓库地址。

第三步：在项目目录下创建`deploy.sh`进行部署。

    #!/usr/bin/env sh
    
    # 当发生错误时中止脚本
    set -e
    
    # 构建
    npm run build
    
    # cd 到构建输出的目录下 
    cd dist
    
    # 部署到自定义域域名
    # echo 'www.example.com' > CNAME
    
    git init
    git add -A
    git commit -m 'deploy'
    
    # 部署到 https://<USERNAME>.github.io
    # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
    
    # 部署到 https://<USERNAME>.github.io/<REPO>
    # git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
    
    cd -

完成以上步骤后在GitHub上修改为`gh-pages`分支下的URL即可。