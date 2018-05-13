# Vue学习笔记 #

## Vue基础 ##

**Vue的两个核心点：**

- 响应的数据变化
    - 当数据发生改变—>视图自动更新
- 组合的视图组件
    - UI页面映射为组件树
    - 划分组件可维护、可复用、可测试

```
var vm=new Vue({
    el:"#app",
    data:{}
})
```

`vue`循环`data`中的数据（数据劫持），依次增加`getter`和`setter`

使用变量时，需要先进行初始化，否则新添加的属性不会刷新页面。

`vm.$set()`此方法可以给对象添加响应式的数据变化。

vue提供了一个指令`v-for`解决循环问题，更高效，复用原有的结构。

`npm install vue axios bootstrap`

复选框，只有一个值时，将此值转换为`boolean`类型。

- `created()`专门用来发送`ajax`方法，在数据被初始化后会调用，`this`指向`vm`实例，钩子函数
- `v-model`：如果`checkbox`，`select`多选是数组，提供一个`value`属性）（`radio`，`checkbox`分组依靠`v-model`），`checked`，`selected`不存在
- 修饰符 
    - `.number` 
    - `.lazy`
- 按键修饰符 
    - `.enter.ctrl.keyCode`
- 事件
    - `stopPropagation`
    - `cancelBubble=true`
    - `preventDefault`
    - `returnValue=false`
- `jquery once`
- `e.srcElement&&e.target` 判断事件源绑定事件
- `computed`计算属性，不是方法
    - 方法不会有缓存，`computed`会根据依赖的属性进行缓存
    - 两部分组成有`get`和`get`（不能只写set）一般情况下，通过JS赋值影响其他人或表单元素设置值的时候会调用`set`方法
-    