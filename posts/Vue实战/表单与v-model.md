# 表单与v-model #

Vue.js提供了`v-model`指令，用于在表单类元素上双向绑定数据。

使用`v-model`后，表单控件显示的值只依赖所绑定的数据，不再关心初始化时的`value`属性，对于在`<textarea></textarea>`之间插入的值，也不会生效。

使用`v-model`时，如果是用中文输入法输入中文，一般在没有选定词组前，也就是在拼音阶段，Vue时不会更新数据的，当敲下汉字时才会触发更新。

如果希望总是实时更新，可以用`@input`替代`v-model`。事实上，`v-model`也是一个特殊的语法糖，只不过它会在不同的表单上智能处理。

## 单选按钮 ##

单选按钮在单独使用时，不需要`v-model`，直接使用`v-bind`把你当一个布尔类型的值，为真时选中，为否时不选。

    <div id="app">
        <input type="radio" :checked="picked" id="radio">
        <label for="radio">单选按钮</label>
    </div>

如果是组合使用来实现互斥选择的效果，就需要`v-model`配合`value`来使用。
    
    <div id="app">
        <p>
            <input type="radio" v-model="picked" value="html" id="html">
            <label for="html">HTML</label>
        </p>
        <p>
            <input type="radio" v-model="picked" value="js" id="js">
            <label for="js">JavaScript</label>
        </p>
        <p>
            <input type="radio" v-model="picked" value="css" id="css">
            <label for="css">CSS</label>
        </p>
        <p>选择的项：{{picked}}</p>
    </div>
    
## 复选框 ##

复选框单独使用时，也是用`v-model`绑定一个布尔值。

组合使用时，也是`v-model`与`value`一起，多个勾选框都绑定到同一个数组类型的数据，`value`的值在数组中，就会选中这一项。这一过程也是双向的，在勾选时`value`得知也会自动`push`到这个数组中。

## 选择列表 ##

选择列表就是下来选择器，分为单选和多选两种方式。

<option>是备选项，如果含有`value`属性，`v-model`就会优先匹配`value`值；如果没有，就会直接匹配`<option>`的`text`。

在业务中，`<option>`经常用`v-for`动态输出，`value`和`text`也是用`v-bind`动态输出。

# 绑定值 #

在业务中，有时需要绑定一个动态的数据，这时可以使用`v-bind`实现。

## 单选按钮 ##

    <div id="app">
        <input type="radio" v-model="picked" :value="value">
        <p>{{picked}}</p>
        <p>{{value}}</p>
    </div>
    
    data: {
        picked: false,
        value: 123
    },

在选中时，`app.picked===app.value`，值都是`123`。

## 复选框 ##
    
    <div id="app">
        <input type="checkbox" v-model="toggle" :true-value="value1" :false-value="value2">
        <p>{{toggle}}</p>
        <p>{{value1}}</p>
        <p>{{value2}}</p>
    </div>
    
## 选择列表 ##

    <div id="app">
        <select v-model="selected">
            <option :value="{number:123}">123</option>
        </select>
        {{selected.number}}
    </div>
    
当选中时，`app.selected`是一个Object，所以`app.selected.number===123`。

# 修饰符 #

与事件的修饰符类似，`v-model`也有修饰符，用于控制数据同步的时机。

## `.lazy` ##

在输入框中，`v-model`默认是在`input`事件中同步输入框的数据，使用修饰符`.lazy`会转变为在`change`事件中同步。

    <div id="app">
        <input type="text" v-model.lazy="message">
        <p>{{message}}</p>
    </div>
    
这时，`message`并不是实时变化，而是在失焦或按回车键时才更新。

## `.number` ##

使用修饰符`.number`可以将输入转换成Number类型，否则输入的数字，但它的类型其实是String，在数字输入框时比较有用。

    <div id="app">
        <input type="number" v-model.number="message">
        <p>{{typeof message}}</p>
    </div>
    
## `.trim` ##

修饰符`.trim`可以自动过滤输入的首尾空格。

    <input type="text" v-model.trim="message">
    