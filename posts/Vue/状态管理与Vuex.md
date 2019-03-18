# 状态管理与Vuex #

非父子组件（跨级组件和兄弟组件）通信时，使用了`bus`（中央事件总线）的一个方法，用来触发和接收事件，进一步起到通信的作用。

一个组件可以分为数据（`model`）和视图（`view`），数据更新时，视图也会自动更新。在视图中又可以绑定一个事件，它们触发`methods`里指定的方法，从而可以改变数据、更新视图，这是一个组件基本的运行模式。

    const store = new Vuex.Store({});
    
仓库`store`包含了应用的数据（状态）和操作过程。Vuex里的数据都是响应式的，任何组件使用同一`store`的数据时，只要`store`的数据变化，对应的组件也会立即更新。

数据保存在Vuex选项的`state`字段内。

    const store = new Vuex.Store({
        state: {
            count: 0
        }
    });
    
在任何组件内，可以直接通过`$store.state.count`读取。

    <template>
        <div>
            <h1>首页</h1>
            {{$store.state.count}}
        </div>
    </template>
    
直接卸载`template`里显得有点乱，可以用一个计算属性来显示：

    <div>
        <h1>首页</h1>
        {{count}}
    </div>
    
    export default {
        computed: {
            count() {
                return $store.state.count;
            }
        }
    }

在组件内来自`store`的数据只能读取，不能手动修改，修改`store`中数据的唯一途径是显式地提交`mutations`。

`mutations`是Vuex的第二个选项，用来直接修改`state`里的数据。

在组件内，通过`this.$store.commit`方法来执行`mutations`。

`mutations`还可以接受第二个参数，可以是数字、字符串或对象等类型。

**ES6语法**

函数的参数可以设定默认值，当没有传入该参数时，使用设置的值。

```
increment(state,n=1)等同于：
    increment(state,n){
        n=n||1;
    }
```
    
提交`mutations`的另一种方式是直接使用包含`type`属性的对象。

> `mutations`里尽量不要异步操作数据，否则组件在`commit`后数据不能立即改变，而且不知道什么时候会改变。

## 高级用法 ##

Vuex还有其他3个选项可以使用：`getter`、`actions`、`modules`。

`getter`能将`computed`的方法提取出来，也可以依赖其他的`getter`，把`getter`作为第二个参数。

`action`与`mutation`很像，不同的是`action`里面提交的是`mutation`，并且可以一步操作业务逻辑。

`action`在组件内通过`$store.dispatch`触发。

`modules`用来将`store`分割到不同模块，当项目足够大时，`store`里的`state`、`getters`、`mutations`、`actions`会非常多，使用`modules`可以把它们写到不同的文件中。

`module`的`mutation`和`getter`接收的第一个参数`state`是当前模块的状态。在`actions`和`getters`中还可以接收一个参数`rootState`，来访问根节点的状态。

# 实战：中央事件总线插件`vue-bus` #

中央事件总线`bus`作为一个简单的组件传递事件，用于解决跨级和兄弟组件通信的问题。

`vue-bus`插件给Vue添加一个属性`$bus`，并代理`$emit`、`$on`、`$off`三个方法。

**ES6语法**

> `emit(event,..args)`中的`...`是函数参数的解构。因为不知道组件会传递多少个参数进来，使用`...args`可以把从当前参数到最后的参数都获取到。

使用`vue-bus`有两点需要注意：

1. 第一是`$bus.on`应该在`created`钩子内使用，如果在`mounted`使用，它可能接收不到其他组件来自`created`钩子内发出的事件；
2. 第二点是使用了`$bus.on`在`beforeDestroy`钩子里应该再使用`$bus.off`解除，因为组件销毁后，就没有必要把监听的句柄存储在`vue-bus`中。