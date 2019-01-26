# JavaScript-DOM #

## 循环调节列表 ##

### 循环调节列表 ###

#### 循环调节列表 ####

#### 循环调节列表 ####

#### 循环调节列表 ####

**页面列表：**

> 点击 `UP` 按钮会使得该 `li` 元素在列表中上升一个位置，点击 `DOWN` 按钮会使得该 `li` 元素下降一个位置。点击最后的元素的 `DOWN` 按钮会使得元素回到第一个位置，点击第一个元素的 `UP` 按钮会使其回到最后的位置。

页面上已经存在该列表，你只需要完成 `initAdjustableList()` 函数，给元素添加事件。    

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="whjin" data-slug-hash="gqPBMO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="循环调节列表">
  <span>See the Pen <a href="https://codepen.io/whjin/pen/gqPBMO/">
  循环调节列表</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 	DOM标签统计 ##

**完成 `getPageTags` 函数，判断你的代码所执行的页面用到了哪些标签。**

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js" data-user="whjin" data-slug-hash="KJVGWm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="DOM标签统计">
  <span>See the Pen <a href="https://codepen.io/whjin/pen/KJVGWm/">
  DOM标签统计</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

**完成 `getChildAttributes` 函数，它接受一个 `DOM` 元素作为参数和一个属性名作为参数，你需要返回这个 `DOM` 的直接子元素的特定属性列表。**

	<ul id='list'>
	  <li data-name="Jerry" class="item"><span>1</span></li>
	  <li data-name="Lucy" class="item"><span>2</span></li>
	  <li data-name="Tomy"><span>3</span></li>
	</ul>

	getChildAttributes(el, 'data-name') // => ['Jerry', 'Lucy', 'Tomy']
	getChildAttributes(el, 'class') // => ['item', 'item', null]

> 测试页面2