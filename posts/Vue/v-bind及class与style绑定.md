# v-bind及class与style绑定 #

`v-bind`的主要用法是动态更新HTML元素上的属性。

在数据绑定中，`v-bind`最常见的两个应用就是元素的样式名称`class`和内联样式`style`的动态绑定。

## 绑定`class`的几种方式 ##

### 对象语法 ###

给`v-bind:class`设置一个对象，可以动态地切换`class`：

    <div id="app">
        <div :class="{'active':'isActive'}">测试文字</div>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            isActive: true
        },
    });

对象中也可以传入多个属性，动态切换`class`。另外，`:class`可以与普通`class`共存。

    <div class="static" :class="{'active':'isActive','error':isError}">测试文字</div>

    data: {
        isActive: true,
        isError: false
    }

当`:class`的表达式过长或逻辑复杂时，还可以绑定一个计算属性。当条件多于两个时，都可以使用`data`或`computed`。

除了计算属性，也可以直接绑定一个Object类型的数据，或者使用类似计算属性的`methods`。

### 数组语法 ###

当需要应用多个`class`时，可以使用数组语法，给`:class`绑定一个数组，应用一个`class`列表：

    <div id="app">
        <div :class="[activeCls,errorCls]">测试文字</div>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            activeCls: 'active',
            errorCls: 'error'
        }
    });
    
    // 结果
    <div class="active error">测试文字</div>
    
也可以使用三元表达式来根据条件切换`class`：

    <div :class="[isActive ? activeCls : '',errorCls]">测试文字</div>
    
    new Vue({
        el: "#app",
        data: {
            isActive: true,
            activeCls: 'active',
            errorCls: 'error'
        }
    });
    
当`class`有多个条件时，可以在数组语法中使用对象语法：

    <div id="app">
        <div :class="[{'active':isActive},errorCls]">测试文字</div>
    </div>

使用计算属性给元素动态设置类名，在业务中经常用到，尤其是在写复用的组件时，所以在开发过程中，**如果表达式较长或逻辑复杂，应该尽可能地优先使用计算属性**。

### 在组件中使用 ###

如果直接在自定义组件上使用`class`或`:class`，样式规则会直接应用到这个组件的根元素上。

    Vue.component('my-component', {
        template: `<p class="article">一些文本</p>`
    });

然后在调用这个组件时，应用对象语法或数组语法给组件绑定`class`：

    <div id="app">
        <my-component :class="{'active':isActive}"></my-component>
    </div>
    
这种用法仅适用于自定义组件的最外层是一个根元素，否则会无效。当不满足这种条件或需要给具体的子元素设置类名时，应当使用组件的`props`来传递。

## 绑定内联样式 ##

使用`:style`可以给元素绑定内联样式，方法与`:class`类似，也有对象语法和数组语法，很像直接在元素上写CSS。

    <div id="app">
        <div :style="{'color':color, 'fontSize':fontSize+'px'}">文本</div>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            color: 'red',
            fontSize: 14
        }
    });

一般把样式写在`data`或`computed`中：

    <div id="app">
        <div :style="styles">文本</div>
    </div>
    
    new Vue({
        el: "#app",
        data: {
            styles: {
                color: 'red',
                fontSize: 16 + 'px'
            }
        }
    });

在实际业务中，`:style`的数组语法并不常用，可以写在一个对象里面，而较为常用的是计算属性。

另外，使用`:style`时，Vue.js会自动给特殊的CSS属性名称增加前缀，比如`transform`。