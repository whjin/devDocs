# HTML元素 #

## 元素分类 ##

- **块级元素**： `div`、`h1-h6`、`hr`、`menu`、`ol`、`ul`、`li`、`dl`、`dt`、`dd`、`table`、`p`、`form`
    - 自身属性为`display: block;`的元素，通常使用块级元素进行布局（结构）的搭建。
- 块级元素的特点
    - 独占一行
    - 从上到下依次排列
    - 直接控制宽度、高度以及盒子模型的相关CSS属性
    - 不设置宽度，块级元素的宽度是它的父元素内容的宽度，高度是自身内容的高度
    - 可以嵌套行内元素
    - `ul/ol`下面只能是`li`，`dl`下面只能是`dt dd`；`p`不能包含其他块级元素包括自身


- **内联元素**：`span`、`a`、`strong`、`i`、`em`，`s`、`u`，`textarea`、`input`、`select`，`label`、`img`、`sup`，`sub`
    - 自身属性为`display: inline;`的元素，通常使用行内元素进行文字、小图标（小结构）的搭建。
- 内联元素的特点
    - 不独占一行，和其他内联元素从左到右在一行显示
    - 不能直接控制宽度、高度以及盒子模型的相关CSS属性，可以直接设置内外边距的左右值
    - 宽高由自身内容的大小决定（文字、图片等）
    - 只能容纳文本或其他内联元素（不能在内联元素中嵌套块级元素）

**CSS外链引入方式**

- `link`是`html`标签，`@import`是`css`提供的方式，写在`css`文件或`style`标签中。
- 加载顺序有区别，当一个页面被加载时，`link`引用的`css`文件会被同时加载，而`@import`引入的`css`文件会等页面全部下载完成后再加载。
- 使用`js`控制DOM改变CSS样式，只能使用`link`标签，因为`import`不能被DOM控制。

**CSS命名规范**

- 头部：`header`
- 内容：`content/container`
- 尾部：`footer`
- 导航：`nav`
- 侧栏：`sidebar`
- 栏目：`column`
- 页面外围控制整体布局宽度：`wrapper`
- 左右中：`left right center`
- 登陆条：`loginbar`
- 标志：`logo`
- 广告：`banner`
- 页面主体：`main`
- 热点：`hot`
- 新闻：`news`
- 下载：`download`
- 子导航：`subnav`
- 菜单：`menu`
- 子菜单：`submenu`
- 搜索：`search`
- 友情链接：`friendlink`
- 页脚：`footer`
- 版权：`copyright`
- 投票：`vote`
- 合作伙伴：`partner`
- 滚动：`scroll`
- 内容：`content`
- 标签页：`tab`
- 文章列表：`list`
- 提示信息：`msg`
- 小技巧：`tips`
- 栏目标题：`title`
- 加入：`joinus`
- 指南：`guild`
- 服务：`service`
- 注册：`register`
- 状态：`status`