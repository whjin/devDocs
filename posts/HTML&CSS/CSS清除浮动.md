# CSS清除浮动 #

**`overflow: hidden`**

1. `overflow`溢出隐藏
2. 清除浮动
3. 解决`margin-top`的传递问题

**（面试题）**：

- 单行文本出现省略号（4个必备条件，缺一不可）
    - `width` 宽度（不写宽度，默认继承父元素宽度）
    - `overflow: hidden;`（溢出隐藏）
    - `white-space: nowrap;`
    - `text-overflow: ellipsis;`文字隐藏的方式，以省略号的方式隐藏

- 多行文本出现省略号（必备条件，主要应用在移动端）
    - `display: -webkit-box;` 弹性盒模型
    - `-webkit-box-orient: vertical;`规定元素的排列方式：垂直排列
    - `-webkit-line-clamp: 2;`：文字的行数（自定义）
    - `overflow: hidden;`溢出隐藏

- 多个元素在一行显示的方法
    - `display: inline;`
    - `display: inline-block;`
    - `float: left/right;`

**`display: inline-block;`元素的特点**

- 盒子横向排列
- `verticle-align`属性会影响`inline-block`元素，值可能会设为`top`
- 需要设置每一列的宽度
- 如果HTML源码中元素间有空格，列与列之间会产生空隙
    - **解决方法**：
        - 如果元素添加了`dispay: inline-block;`，父元素增加一个属性`font-size: 0;`，同时在元素本身增加`font-size`属性进行覆盖

- `display:inline-block;`在IE6/7下不兼容的解决方法
    - 增加`display: inline; zoom: 1;`属性

**IE7下块元素兼容`display: inline-block;`**写法？

- 直接让块元素设置为内联对象（设置属性 `display: inline;`），然后触发块元素的`layout`（如：`zoom: 1;`等）。
- 兼容各浏览器的代码如下：`div {display: inline-block; *display: inline; *zoom: 1;}`

# `float`浮动 #

**`float`元素的特点**

1. 在一行显示
2. 设置属性值为`left`时，浮动元素依次从父级盒子的左侧向右排列
3. 自动具有块级元素的属性，不需要添加`display: block;`
4. 脱离文档流
5. 子元素不会继承浮动属性
6. 浮动元素下面的元素不能识别浮动元素的高度和位置，占据浮动元素的位置
7. 所有的元素都可以使用浮动属性

**文档流和脱离文档流**

- 文档流：元素排版布局过程中，元素自动从左往右，从上往下的流式排列。
- 每个非浮动元素块级元素独占一行，浮动元素按规则浮在行的一端。当前行容量满则另起一行浮动。
- 内联元素不会独占一行
- 几乎所有元素（包括块级、内敛和列表元素）均可生成子行，用于摆放子元素
- 标准文档流等级：分为两个等级，块级元素和行内元素
- 脱离文档流：文档流内的正常元素识别不到这个元素（脱离文档流的元素相当于平行漂浮于文档流之上）

**`float`元素产生的影响**

1. 父元素设置背景颜色`background-color`不起作用
2. 父元素设置内边距属性`padding`不会被撑开
3. 父元素设置边框属性`border`不会被撑开

# 清除浮动`float` #

**清除浮动的方法**

1. 给浮动元素的父级元素添加固定的高度`height`（不推荐）
2. 给浮动元素的父级元素添加溢出隐藏属性`overflow: hidden;`；
3. 给最后一个浮动元素后面添加一个块级元素，这个块级元素带有`clear: both;`属性
    - `clear`清除浮动元素对文档流内元素的影响（可以让文档流内的元素识别到浮动元素的高度）
    - `left`清除`float`为`left`的影响
    - `right`清除`float`为`right`的影响
    - `both`清除`float`所有的影响
    - `inherit`从父级元素上继承该属性值
4. `clearfix`清除浮动（固定代码）           
    - **利用伪元素`:after`清除浮动必备条件，缺一不可**
    - `display: block;`确保元素是一个块级元素
    - `clear: both;`不允许左右两边有浮动对象
    - `content: '';`伪元素`:brfore/:after`自带的属性，如果不写，伪元素不起作用
    - **写全的样式属性；不是必备条件**
    - `height: 0;` 防止在低版本浏览器中默认`height: 1px;`的情况，用`height: 0;`去覆盖
    - `font-size: 0;` 字体大小 
    - `overflow: hidden;` 溢出隐藏
    - `visibility: hidden;` 让所有可见性的元素隐藏

**`overflow: hidden;`和`visibility: hidden;`有什么区别？**

**（面试题）：如何让一个元素消失？**
1. `opacity: 0;`[0-1] 透明度
2. `display: none;` 隐藏
3. `widht/height/line-height + overflow`：宽/高/行高 + 溢出隐藏
4. `visibility: hidden;`让所有可见性的元素隐藏 

**`clear: both;`的特点**
1. 元素需要是块级元素
2. 元素不能带有浮动属性
3. 元素必须放在最后一个浮动元素的后面