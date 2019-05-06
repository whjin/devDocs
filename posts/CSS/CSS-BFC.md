# CSS BFC #

## BFC的定义 ##

**BFC**决定了元素对其内容进行定位，以及与其他元素的关系和相互作用。

创建了**BFC**的元素中，子元素会依次放置。两个相邻的元素之间的垂直距离取决于`margin`特性。相邻的块级元素的垂直边距会折叠。

每个元素左外边与包含块的左边想接触，即使存在浮动也是如此（一个元素的内容区域由于浮动而压缩），除非这个元素新建一个新的**BFC**。

浮动元素会形成**BFC**，浮动元素内部子元素只要受该浮动元素影响，两个浮动元素之间互不影响。

## 怎样才能形成BFC ##

- `float`的值不为`none`
- `overflow`的值不为`visible`
- `display`的值为`table-cell`，`table-caption`，`inline-block`中的任何一个
- `position`的值不为`relative`和`static`

## BFC的作用 ##

**不和浮动元素重叠**

一个浮动元素后面跟着非浮动元素，就会产生覆盖现象，自适应两栏布局。

**清除元素内部浮动**

只要把父元素设为BFC就可以清理子元素的浮动，最常见的用法就是在父元素上设置`overflow: hidden`样式，对于IE6加上`zoom: 1`

**嵌套元素`margin`边距折叠问题的解决**

只有同属于一个BFC时，两个元素才有可能发生垂直`margin`的重叠，包括**相邻元素**、**嵌套元素**，只要它们之间没有阻挡（例如**边框**、**非空元素**，`padding`）就会发生`margin`重叠。

解决`margin`重叠，让它们不在同一个BFC即可。

## IE HasLayout ##

下列元素默认具有`layout`：

- `html`、`body`
- `table`、`tr`、`th`、`td`
- `img`
- `hr`
- `input`、`button`、`select`、`textarea`、`fieldset`、`legend`
- `iframe`、`embed`、`object`、`applet`
- `marquee`

下列CSS属性和取值将让元素获得`layout`：
    
- `position: absolute`
    - 绝对定位元素的包含区块    
- `float: left|right`
- `display: inline-block`
- `width/height` 除`auto`外的任意值
- `zoom` 除`normal`外的任意值

**IE7中引入的hasLayout成员**

- `overflow: hidden|scroll|auto`
- `position: fixed`
- `min-width` 任意值
- `max-width` 除`none`之外的任意值
- `min-height` 任意值 
- `max-height` 除`none`之外的任意值



