# CSS #

- 介绍一下标准CSS的盒子模型？低版本IE的盒子模型有什么不同？

> 1、有两种，IE盒子模型、W3C盒子模型
> 2、盒模型：内容（`content`）、填充（`padding`）、边界（`margin`）、边框（`border`）
> 3、区别：IE的`content`部分把`border`和`padding`计算进去

- CSS选择符有哪些？哪些属性可以继承？

> 1、ID选择器
> 2、类选择器
> 3、标签选择器
> 4、相邻选择器（`h1+p`）
> 5、子选择器（`ul>li`）
> 6、后代选择器（`li a`）
> 7、通配符选择器（`*`）
> 8、属性选择器（`a[rel="external"]`）
> 9、伪类选择器（`a:hover,li:nth-child`）

> 可继承的样式：`font-size`、`font-family`、`color`、`ul`、`li`、`dl`、`dd`、`dt`
> 不可继承的样式：`border`、`padding`、`margin`、`width`、`height`

- CSS优先级如何计算？

> 优先级就近原则，同权重情况下样式定义最近者为准
> 载入样式以最后载入的定位为准

> 优先级为：
> 同权重：内联样式表（标签内部）>嵌入样式表（当前文件）>外部样式表（外部文件）
> `!important > id > class > tag`
> `!important`比内联优先级高

- CSS3新增伪类有哪些？

> `p:first-of-type` 选择属于其父元素的首个`<p>`元素
> `p:last-of-type` 选择属于其父元素的最后`<p>`元素
> `p:only-of-type` 选择属于其父元素唯一的`<p>`元素
> `p:nth-child(2)` 选择属于其父元素的第二个子元素的每个`<p>`元素
> `::after`在元素之后添加内容，也可以用来做清除浮动
> `::before`在元素之前添加内容
> `::enabled ::disabled`控制表单控件的禁用状态
> `:checked`单选框或复选框被选中

- 水平居中：给`div`设置一个宽度，然后添加`margin: 0 auto`属性

```
div {
  width: 200px;
  margin: 0 auto;
}
```
    
- 让绝对定位的`div`居中

```
div {
  position: absolute;
  width: 200px;
  height: 200px;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
}
```

- 水平垂直居中一

> 确定容器的宽高
> 设置层的外边距 

    div {
      position: absolute;
      width: 200px;
      height: 200px;
      left: 50%;
      top: 50%;
      margin: -100px 0 0 -100px;
      background: #ccc;
    }

- 水平垂直居中二

> 未知容器的宽高，利用`transform`属性

    div {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #bbb;
    }

- 水平垂直居中三

> 利用`flex`布局
> 实际使用时应考虑兼容性

    body {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 300px;
        background: green;
    }
    
    span {
        width: 100px;
        height: 100px;
        background-color: #ccc;
    }
    
- `display`有哪些值？说明它们的作用？

> `block`块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
> `none`缺省值。像行内元素类型一样显示。
> `inline`行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
> `inline-block`默认宽高为内容宽度，可以设置宽高，同行显示。
> `list-item`像块类型元素一样显示，并添加样式列表标记。
> `table`此元素会作为块级表格显示。
> `inherit`规定应该从父元素继承`display`属性的值。

- `position`的值`relative`和`absolute`定位原点？

> `absolute`生成绝对定位的元素，相对于值不为`static`的第一个父元素进行定位
> `fixed`（老IE不支持）生成绝对定位的元素，相对于浏览器窗口进行定位
> `relative`生成相对定位的元素，相对于其正常位置进行定位
> `static`默认值。没有定位，元素出现在正常的流中（忽略`top`、`right`、`bottom`、`left`声明）
> `inherit`规定从父元素继承`position`属性的值

- CSS3有哪些新特性？

> 新增各种CSS选择器（`:not(.input)`）：所有`class`不是`input`的节点
> 圆角`border-radius:8px;`
> 多列布局`multi-column layout`
> 阴影和反射`shadow\reflect`
> 文字特效`text-shadow`
> 文字渲染`text-decoration`
> 线性渐变`gradient`
> 旋转`transform`
> 缩放、定位、倾斜、动画、多背景
> 例如：

```
transform:\scale(0.85,0.90)\translate(0,-30px)\skew(-9deg,0)\animation
```

- 请解释一下CSS3的`flexbox`（弹性盒布局模型），以及适用场景？

> 一个用于页面布局的全新CSS3功能，`flexbox`可以把列表放在同一个方向（从上到下，从左到右），并让列表能延伸到占用可用的空间。
> 较为复杂的布局还可以通过嵌套一个伸缩容器（`flex container`）来实现。
> 采用`flex`布局的元素，称为`flex`容器（`flex container`），简称`容器`
> 它的所有子元素自动称为容器成员，称为`flex`项目（`flex item`），简称`项目`
> 常规布局是基于块和内联流方向，而`flex`布局是基于`flex-flow`流，可以很方便地用来做居中，能对不同屏幕大小自适应。

- 用纯CSS创建一个三角形的原理是什么？

> 把上、左、右三条边隐藏掉（颜色设为`transparent`）

    div {
        width: 0;
        height: 0;
        border: 100px solid;
        border-color: transparent transparent red transparent;
    }
    
- 如何设计一个满屏`品`字布局？    

> 简单方式：
> 上面的`div`宽`100%`
> 下面的两个`div`分别宽`50%`
> 然后用`float`或者`inline`使其不换行即可

    body {
        margin: 0;
        padding: 0;
    }
    
    .header {
        width: 100%;
        height: 300px;
        background: green;
    }
    
    .left {
        width: 50%;
        height: 300px;
        background: aqua;
        float: left;
    }
    
    .right {
        width: 50%;
        height: 300px;
        background: blue;
        float: right;
    }

- 如何实现CSS多列等高？

> 利用`padding-bottom|margin-bottom`正负值相抵；
> 设置父容器超出隐藏`overflow:hidden;`，这样子父容器的高度还是它里面的列没有设定`padding-bottom`时的高度；
> 当它里面的任何一列高度增加，则父容器的高度被撑开到里面最高那一列的高度
> 其他比这列低的会用它们的`padding-bottom`补偿这部分的高度差

    body {
        padding: 0;
        margin: 0;
    }
    
    .container {
        width: 100%;
        height: 300px;
        overflow: hidden;
    }
    
    .left {
        float: left;
        width: 30%;
        height: 100px;
        background: aqua;
        padding-bottom: 200px;
        margin-bottom: -200px;
    }
    
    .right {
        float: right;
        width: 70%;
        height: 200px;
        background: #6cc;
        padding-bottom: 200px;
        margin-bottom: -200px;
    }
    
- 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么？常用hack技巧？

> `png24`位的图片在IE6浏览器上出现背景，解决方案是做成`png8`
> 浏览器默认的`margin`和`padding`不同。解决方案是加一个全局`{margin:0;padding:0;}`来统一
> IE6双边距`bug`块属性标签`float`后，又有横行的`margin`情况下，在IE6显示`margin`比设置的大
> 浮动IE产生的双倍距离

    #box {
        float: left;
        width: 10px;
        margin: 0 0 0 100px;
    }
    
> 这种情况下IE会产生`20px`的距离，解决方案是在`float`的标签样式控制中加入`_display:inline;`将其转化为行内属性。（`_`这个符号只有IE6会识别）
> 渐进识别的方式，从总体中逐渐排除局部。
> 首先，巧妙地使用`\9`这一标记，将IE浏览器从所有情况中分离出来。
> 接着，再次使用`+`将IE8和IE7、IE6分离开来，这样IE8已经独立识别。

    div {
        background-color: red; /*所有识别*/
        background-color: #00deff \9; /*IE6、7、9识别*/
        _background-color: #1e0bd1; /*IE6识别*/
    }
    
> IE下可以使用获取常规属性的方法来获取自定义属性，也可以使用`getAttribute()`获取自定义属性；
> firefox下只能使用`getAttribute()`获取自定义属性
> 解决方法：统一通过`getAttribute()`获取自定义属性
> 
> IE下`event`对象有`x`、`y`属性，但是没有`pageX`、`pageY`属性；
> Firefox下`event`对象有`pageX`、`pageY`属性，但是没有`x`、`y`属性
> 解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数

> chrome中文界面下默认会将小于`12px`的文本强制按照`12px`显示
> 可通过加入CSS属性`-webkit-text-size-adjust:none;`解决

> 超链接访问过后`hover`样式不出现，被点击访问过的超链接样式不再具有`hover`和`avtive`。
> 解决方法：改变CSS属性的排列顺序。

    L-V-H-A：a:link{} a:visited{} a:hover{} a:active{}
    
- `li`与`li`之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

> 行框的排列会受到中间空白（回车/空格）等的影响，因为空格也属于字符，这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为`0`，就没有空格。

- 为什么要初始化CSS样式？

> 浏览器有兼容问题，不同浏览器对有些标签的默认值不同，没有CSS初始化会出现浏览器之间的页面显示差异。

> 初始化样式会对SEO有一定的影响，尽量在影响最小的情况下进行初始化。

- `absolute`的`containing block`（容器块）计算方式跟正常流有什么不同？

> 无论属于哪种，都要先找到其祖先元素中最近的`position`值不为`static`的元素，然后再判断：
> 1、若此元素为`inline`元素，则`containing block`为能够包含这个元素生成的第一个和最后一个`inline box`的`padding box`（除`margin`，`border`外的区域）的最小矩形；
> 2、否则由这个祖先元素的`padding box`构成
> 如果都找不到，则为`initial containing block`

> 补充：
> 1、`static/relative`，它的父元素的内容框（即去掉`padding`的部分）
> 2、`absolute`：向上找最近的定位为`absolute、relative`的元素
> 3、`fixed`：它的`containing block`一律为根元素（`html/body`），根元素也是`initial containing block`

- CSS里的`visibility`属性有个`collapse`属性值的作用？在不同浏览器下有什么区别？

> 对于普通元素`visibility:collapse;`会将元素完全隐藏，不占据页面布局空间，与`display:none;`表现相同。如果目标元素为`table`，`visibility:collapse;`将`table`隐藏，但是会占据页面布局空间。仅在Firefox下起作用，IE会显示元素，Chrome会将元素隐藏，但是占据空间。

- `position`跟`display`、`margin collapse`、`overflow`、`float`这些特性相互叠加后会怎样？

> 如果元素的`display`为`none`，那么元素不被渲染，`position`，`float`不起作用；
> 如果元素拥有`position:absolute;`或`position:fixed;`属性，那么元素将为绝对定位，`float`不起作用。
> 如果元素`float`属性不是`none`，元素会脱离文档流，根据`float`属性值来显示。有浮动、绝对定位，`inline-block`属性的元素，`margin`不会和垂直方向上的其他元素`margin`折叠。

- 对BFC规范（块级格式化上下文）的理解？

> 它是一个独立容器，决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。
> 一个页面是由多个Box组成，元素的类型和`display`属性，决定了这个Box的类型
> 不同类型的Box会参与不同的`Formatting Context`（决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染，也就是说BFC内部的元素和外部的元素不会相互影响。

- CSS定义的权重

> 权重的规则：标签的权重为`1`，`class`的权重为`10`，`id`的权重为`100`。

- 请解释一下为什么需要清除浮动？清除浮动的方法？

> 清除浮动是为了清除使用浮动元素产生的影响。
> 浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

> 1、父级`div`定义`height`；
> 2、父级`div`也一起浮动；
> 3、常规的使用一个`class`；

    .clearfix:before, .clearfix:after {
        content: '';
        display: table;
    }
    
    .clearfix:after {
        clear: both;
    }
    
    .clearfix {
        *zoom: 1;
    }
    
> SASS编译的时候，浮动元素的父级`div`定义伪类`:after`

    div:after, div:before {
        content: '';
        visibility: hidden;
        display: block;
        height: 0;
        clear: both;
    }
    
> 解析原理：
> 1、`displa:block;`使生成的元素以块级元素显示，占满剩余空间；
> 2、`height:0`避免生成内容破坏原有布局的高度；
> 3、`visibility:hidden;`使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互；
> 4、通过`content:"."`生成内容作为最后一个元素，
> 5、`zoom:1;`触发IE `hasLayout`

通过分析发现，除了`clear:both`用来闭合浮动，其他代码都是为了隐藏`content`生成的内容，这也是其他版本的闭合浮动为什么有`font-size:0`，`line-height:0`

- 什么是外边距合并？

> 外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。
> 合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者

- `zoom:1`的清除浮动原理？

> 清除浮动，触发`hasLayout`；
> `zoom`属性时IE浏览器的专有属性，它可以设置或检索对象的缩放比例。解决IE存在的`bug`
> 比如外边距的重叠，浮动清除，触发IE的`hasLayout`属性等

> 当设置了`zoom`的值后，所设置的元素就会扩大或缩小，高度宽度就会重新计算，一旦改变`zoom`值时也会发生重新渲染，运用这个原理解决IE中子元素浮动时父元素不随着自动扩大的问题。

> 目前非IE浏览器不支持这个属性，可以通过CSS3中的动画属性`scale`进行缩放。

- 浏览器如何解析CSS选择器？

> 从关键选择器开始匹配，然后左移查找规则选择器祖先元素。
> 只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或因为不匹配而放弃规则。

- `margin`和`padding`分别适用什么场景？

> `margin`用来隔开元素与元素的间距；
> `padding`用来隔开元素与内容的间隔；
> `margin`用于布局分开元素使元素与元素互不相干；
> `padding`用于元素与内容之间的间隔，让内容与元素之间有一段距离

- `::before`和`:after`中双冒号和单冒号有什么区别？解释一下这两个伪类的作用？

> 单冒号（`:`）用于CSS3伪类，双冒号（`::`）用于CSS3伪元素。（伪元素由双冒号和伪元素组成）
> 双冒号是在当前规范中引入的，用于区分伪类和伪元素。

- 如何修改Chrome记住密码后自动填充表单的黄色背景？

```
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 250, 189);
    background-image: none;
    color: rgb(0, 0, 0);
}   
```  

- 设置元素浮动后，该元素的`display`值是多少？

> 自动变成`display:block`

- 如何让Chrome支持小于`12px`的文字？

> 1、使用图片：如果是内容固定不变的情况下，使用将小于`12px`文字内容切出做图片，这样既兼容又美观。
> 2、使用`12px`字体大小样式设置，如果不考虑Chrome可以不用考虑兼容同时在设置小于`12px`对象设置`-webkit-text-adjust:none`，做到最大兼容考虑。
> 4、使用`12px`以上字体，重新考虑权重下兼容性。

- 如何用CSS让页面的字体变得清晰，变细？

```
-webkit-font-smoothing: antialiased;
```

- `position:fixed;`在Android下无效如何处理？

> `fixed`的元素是相对整个页面固定位置，在屏幕上滑动只是在移动这个所谓的`viewport`
> 并不是IOS不支持`fixed`，只是`fixed`的元素不是相对手机屏幕固定的。

- 手动写动画，最小时间间隔是多少？

> 多数显示器默认频率是`60Hz`，即1秒刷新`60`次，所以理论上最小间隔为`1/60*1000ms=16.7ms`

- `display:inline-block`什么时候会显示间隙？

> 移除空格、使用`margin`负值、使用`font-size:0`、`letter-spacing`、`word-spacing`