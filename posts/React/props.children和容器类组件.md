# props.children和容器类组件 #

如果组件标签也能像普通的 `HTML` 标签那样编写内嵌的结构，那么就方便很多了。实际上，`React.js` 默认就支持这种写法，所有嵌套在组件中的 `JSX` 结构都可以在组件内部通过 `props.children` 获取到。

`React.js` 就是把我们嵌套的 `JSX` 元素一个个都放到数组当中，然后通过 `props.children` 传给了 `Card`。

**总结**

使用自定义组件的时候，可以在其中嵌套 `JSX` 结构。嵌套的结构在组件内部都可以通过 `props.children` 获取到，这种组件编写方式在编写容器类型的组件当中非常有用。而在实际的 `React.js` 项目当中，我们几乎每天都需要用这种方式来编写组件。

## `dangerouslySetHTML` 和 `style` 属性 ##

### `dangerouslySetHTML` ###

