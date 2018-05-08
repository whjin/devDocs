# SVG指南 #

## 简介 ##

SVG是在XML中描述二维图形的语言。这些图形由路径，图片和文本组成，并能在不失真的情况下任意变换尺寸。

把SVG插入到项目：内联、`img`、`background-iamge`、`<object>`或者`Data URI`。

## 基本图形和路径 ##

**基本图形**

SVG包含基本形状元素集：**矩形**，**圆形**，**椭圆形**，**直线**，**折现和多边形**。

### 矩形 ###

`<rect>`元素定义一个矩形。

    <svg>
        <rect width="200" height="100" fill="#bbc42a"></rect>
    </svg>
    
其他属性`x`和`y`坐标，`rx`和`ry`属性创建圆角。

### 圆形 ###

`<circle>`元素中心点和外半径定义一个圆形。

    <svg>
        <circle cx="75" cy="75" r="75" fill="#bbc42a"></circle>
    </svg>

### 椭圆 ###

`<ellipse>`元素基于中心点和两个半径定义一个椭圆。

    <svg>
        <ellipse cx="100" cy="100" rx="100" ry="50" fill="#bbc42a"></ellipse>
    </svg>
    
### 直线 ###

`line`元素定义一条直线。

    <svg>
        <line x1="5" y1="5" x2="100" y2="100" stroke="#765373" stroke-width="8"></line>
    </svg>

`x1/y1`确定直线的开始坐标，`x2/y2`确定直线的结束坐标。

### 折现 ###

未完待续...

[编写 SVG 的指南](https://www.w3cplus.com/svg/svg-pocket-guide.html)