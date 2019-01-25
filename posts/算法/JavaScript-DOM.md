# JavaScript-DOM #

## 循环调节列表 ##

**页面列表：**

    <ul id='adjustable-list'>
      <li>
        <span>1</span>
        <button class='up'>UP</button>
        <button class='down'>DOWN</button>
      </li>
      <li>
        <span>2</span>
        <button class='up'>UP</button>
        <button class='down'>DOWN</button>
      </li>
      <li>
        <span>3</span>
        <button class='up'>UP</button>
        <button class='down'>DOWN</button>
      </li>
    </ul>
    
点击 `UP` 按钮会使得该 `li` 元素在列表中上升一个位置，点击 `DOWN` 按钮会使得该 `li` 元素下降一个位置。点击最后的元素的 `DOWN` 按钮会使得元素回到第一个位置，点击第一个元素的 `UP` 按钮会使其回到最后的位置。

页面上已经存在该列表，你只需要完成 `initAdjustableList()` 函数，给元素添加事件。    