# 加载 SVG #

SVG 作为矢量图的一种标准格式，已经得到了各大浏览器的支持，它也成为了 Web 中矢量图的代名词。 在网页中采用 SVG 代替位图有如下好处：

1. SVG 相对于位图更清晰，在任意缩放的情况下后不会破坏图形的清晰度，SVG 能方便地解决高分辨率屏幕下图像显示不清楚的问题。
2. 在图形线条比较简单的情况下，SVG 文件的大小要小于位图，在扁平化 UI 流行的今天，多数情况下 SVG 会更小。
3. 图形相同的 SVG 比对应的高清图有更好的渲染性能。
4. SVG 采用和 HTML 一致的 XML 语法描述，灵活性很高。

画图工具能导出一个个 `.svg` 文件，SVG 的导入方法和图片类似，既可以像下面这样在 CSS 中直接使用：

    body {
      background-image: url(./svgs/activity.svg);
    }
    
也可以在 HTML 中使用：

    <img src="./svgs/activity.svg"/>
    
也就是说可以直接把 SVG 文件当成一张图片来使用，方法和使用图片时完全一样。

使用 `file-loader` 和使用 `url-loader` 对 SVG 来说同样有效，只需要把 Loader test 配置中的文件后缀改成 `.svg`，代码如下：

    module.exports = {
      module: {
        rules: [
          {
            test: /\.svg/,
            use: ['file-loader']
          }
        ]
      },
    };
    
由于 SVG 是文本格式的文件，除了以上两种方法外还有其它方法，下面来一一说明。

## 使用 `raw-loader` ##

[raw-loader](https://github.com/webpack-contrib/raw-loader) 可以把文本文件的内容读取出来，注入到 JavaScript 或 CSS 中去。

例如在 JavaScript 中这样写：

    import svgContent from './svgs/alert.svg';
    
经过 `raw-loader` 处理后输出的代码如下：

    module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\"... </svg>" // 末尾省略 SVG 内容
    
也就是说 `svgContent` 的内容就等于字符串形式的 SVG，由于 SVG 本身就是 HTML 元素，在获取到 SVG 内容后，可以直接通过以下代码将 SVG 插入到网页中：    
    
    window.document.getElementById('app').innerHTML = svgContent;
    
使用 `raw-loader` 时相关的 Webpack 配置如下：    

    module.exports = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            use: ['raw-loader']
          }
        ]
      }
    };
    
由于 `raw-loader` 会直接返回 SVG 的文本内容，并且无法通过 CSS 去展示 SVG 的文本内容，因此采用本方法后无法在 CSS 中导入 SVG。 也就是说在 CSS 中不可以出现 `background-image: url(./svgs/activity.svg)` 这样的代码，因为 `background-image: url(<svg>...</svg>)` 是不合法的。

## 使用 `svg-inline-loader` ##

[svg-inline-loader](https://github.com/webpack-contrib/svg-inline-loader) 和上面提到的 `raw-loader` 非常相似， 不同在于 `svg-inline-loader` 会分析 SVG 的内容，去除其中不必要的部分代码，以减少 SVG 的文件大小。

在使用画图工具如 Adobe Illustrator、Sketch 制作 SVG 后，在导出时这些工具会生成对网页运行来说不必要的代码。 举个例子，以下是 Sketch 导出的 SVG 的代码：

    <svg class="icon" verison="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
         stroke="#000">
      <circle cx="12" cy="12" r="10"/>
    </svg>
    
被 `svg-inline-loader` 处理后会精简成如下：

    <svg viewBox="0 0 24 24" stroke="#000"><circle cx="12" cy="12" r="10"/></svg>

也就是说 `svg-inline-loader` 增加了对 SVG 的压缩功能。

使用 `svg-inline-loader` 时相关的 Webpack 配置如下：

    module.exports = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            use: ['svg-inline-loader']
          }
        ]
      }
    };   