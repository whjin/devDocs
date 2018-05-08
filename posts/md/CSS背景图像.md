# CSS背景图像 #

**`background`背景**

主要属性：
- `background-color`：背景颜色，简写`background`
    - 不能继承，默认是`transparent`
    - `inherit` 指定背景颜色，从父元素继承
- `background-image`：背景图片
    - `url`：图片URL地址
    - `node`：默认值 背景上未放置图片
    - `inherit`：指定背景图片从父元素继承
    - 一个元素可以引入多张背景图片；
        - 指定要使用的一个或多个背景图片，默认情况下，`background-image`放置在元素的左上角，并重复垂直和水平方向
    - 属性不能继承
- `background-repeat`：背景重复
    - 默认重复`background-image`的垂直和水平方向
    - `repeat` 默认
    - `repeat-x` 只有水平位置重复
    - `repear-y` 只有垂直位置重复
    - `no-repeat` 不重复
    - `inherit` 从父元素继承
- `background-position`：背景定位
    - 设置背景图片的起始位置
    - `x`、`y` 水平位置，垂直位置。左上角是`0`。单位（px，关键字，百分数）
    - 关键字成对出现`left right top bottom center`，仅指定一个关键字，其他值将会是`center`
    - 只设定`x`轴方向，默认`y`轴为`center`
    - `inherit` 从父元素继承
- `background-attachment`：背景关联
    - 设置背景图片固定或随页面的其余部分滚动
    - `scroll` 默认
    - `fixed` 固定
    - `inherit` 从父元素继承
- `background-size`：背景图像的尺寸大小
    - `<length>` 长度值指定图像大小。不允许负值
    - `<percentage>` 百分比指定图像大小。不允许负值
    - `auto` 图像的真实大小
    - `cover` 将背景图像等比例缩放到完全覆盖容器，有可能超出容器
    - `contain` 等比例所放到宽/高与容器的宽/高相等，背景图像始终被包含在容器内
- `background-origin`：设置背景图像的参考原点（位置）
    - `padding-box`：从`padding`区域（含`padding`）开始显示背景
    - `border-box`：从`border`区域（含`border`）开始显示背景
    - `content-box`：从`content`区域开始显示背景
- `background-clip`：设置对象的背景图像向外裁剪的区域
    - `padding-box`：从`padding`区域（不含`padding`）开始向外裁剪背景
    - `border-box`：从`border`区域（不含`border`）开始向外裁剪背景
    - `content-box`：从`content`区域开始向外裁剪背景
    - `text`：从前景内容的形状（比如文字）作为裁剪区向外裁剪，实现使用背景作为填充色之类的遮罩效果。
- 雪碧图：`background-position: x y`