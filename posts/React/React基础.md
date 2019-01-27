# React基础 #

## React-JSX ##

**所谓的 `JSX` 其实就是 `JavaScript` 对象。**

从`JSX`到页面经历的过程：

![](https://i.imgur.com/dBOd580.png)

**总结：**

1. `JSX` 是 `JavaScript` 语言的一种语法扩展；
2. `React.js` 可以用 `JSX` 来描述你的组件；
3. `JSX` 在编译的时候会变成相应的 `JavaScript` 对象描述；
4. `react-dom` 负责把这个用来描述 `UI` 信息的 `JavaScript` 对象变成 `DOM` 元素，并且渲染到页面上。

## 组件的 `render` 方法 ##

一个组件类必须要实现一个 `render` 方法，这个 `render` 方法必须要返回一个 `JSX` 元素。


