# CSS盒子模型 #

**`border`边框**

- 三角形箭头：
    - 正方形的任意相邻两条边，然后旋转一定的角度，得到我们需要的任意方向的箭头
    - `border`、`border-width`、`border-style`、`border-color`

- 三角形：
    - `border`的3个属性：`border-width/border-style/border-color`，宽度和高度都为`0`，三角形箭头方向设定颜色，其余方向颜色设为透明`transparent`

**`margin`边距**

- **`margin`边距重叠**： 取大值，不是两者相加之和。
- **`margin-top`的传递**：大盒嵌套小盒，小盒加`margin-top`值，传递到大盒，导致整体下移。
    - 解决`margin`的兼容性问题：
        1. `float: left;`
        2. `overflow: hidden;`
        3. `padding-top: 0/1px;`
        4. `border-top: 1px solid transparent;` 












