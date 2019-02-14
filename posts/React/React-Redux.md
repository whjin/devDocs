# React-Redux #

## 初始化工程 ##

`Header` 和 `Content` 的组件的文本内容会随着主题色的变化而变化，而 `Content` 下的子组件 `ThemeSwitch` 有两个按钮，可以切换红色和蓝色两种主题，按钮的颜色也会随着主题色的变化而变化。

## 结合 context 和 store ##

我们在 `constructor` 里面初始化了组件自己的 `themeColor` 状态。然后在生命周期中 `componentWillMount` 调用 `_updateThemeColor`，`_updateThemeColor` 会从 `context` 里面把 `store` 取出来，然后通过 `store.getState()` 获取状态对象，并且用里面的 `themeColor` 字段设置组件的 `state.themeColor`。

我们给两个按钮都加上了 `onClick` 事件监听，并绑定到了 `handleSwitchColor` 方法上，两个按钮分别给这个方法传入不同的颜色 `red` 和 `blue`，`handleSwitchColor` 会根据传入的颜色 `store.dispatch` 一个 `action` 去修改颜色。

通过 `store.subscribe`，在数据变化的时候重新调用 `_updateThemeColor`，而 `_updateThemeColor` 会去 `store` 里面取最新的 `themeColor` 然后通过 `setState` 重新渲染组件，这时候组件就更新了。

## connect 和 mapStateToProps ##

我们来观察一下刚写下的这几个组件，可以轻易地发现它们有两个重大的问题：

1. **有大量重复的逻辑**：它们基本的逻辑都是，取出 `context`，取出里面的 `store`，然后用里面的状态设置自己的状态，这些代码逻辑其实都是相同的。
2. **对 `context` 依赖性过强**：这些组件都要依赖 `context` 来取数据，使得这个组件复用性基本为零。

对于第一个问题，我们可以把一些可复用的逻辑放在高阶组件当中，高阶组件包装的新组件和原来组件之间通过 `props` 传递信息，减少代码的重复程度。

如果一个组件对外界的依赖过于强，那么这个组件的移植性会很差，就像这些严重依赖 `context` 的组件一样。

如果一个组件的渲染只依赖于外界传进去的 `props` 和自己的 `state`，而并不依赖于其他的外界的任何数据，也就是说像纯函数一样，给它什么，它就吐出（渲染）什么出来。这种组件的复用性是最强的，别人使用的时候根本不用担心任何事情，只要看看 `PropTypes` 它能接受什么参数，然后把参数传进去控制它就行了。

我们需要高阶组件帮助我们从 `context` 取数据，我们也需要写 `Dumb` 组件帮助我们提高组件的复用性。所以我们尽量多地写 `Dumb` 组件，然后用高阶组件把它们包装一层，高阶组件和 `context` 打交道，把里面数据取出来通过 `props` 传给 `Dumb` 组件。

我们把这个高阶组件起名字叫 `connect`，因为它把 `Dumb` 组件和 `context` 连接（`connect`）起来了。

`connect` 函数接受一个组件 `WrappedComponent` 作为参数，把这个组件包含在一个新的组件 `Connect` 里面，`Connect` 会去 `context` 里面取出 `store`。现在要把 `store` 里面的数据取出来通过 `props` 传给 `WrappedComponent`。

但是每个传进去的组件需要 `store` 里面的数据都不一样的，所以除了给高阶组件传入 `Dumb` 组件以外，还需要告诉高级组件我们需要什么数据，高阶组件才能正确地去取数据。

这个函数会接受 `store.getState()` 的结果作为参数，然后返回一个对象，这个对象是根据 `state` 生成的。`mapStateTopProps` 相当于告知了 `Connect` 应该如何去 `store` 里面取数据，然后可以把这个函数的返回结果传给被包装的组件。

`connect` 现在是接受一个参数 `mapStateToProps`，然后返回一个函数，这个返回的函数才是高阶组件。它会接受一个组件作为参数，然后用 `Connect` 把组件包装以后再返回。

可以看到 `Header` 删掉了大部分关于 `context` 的代码，它除了 `props` 什么也不依赖，它是一个 `Pure Component`，然后通过 `connect` 取得数据。我们不需要知道 `connect` 是怎么和 `context` 打交道的，只要传一个 `mapStateToProps` 告诉它应该怎么取数据就可以了。

`connect` 还没有监听数据变化然后重新渲染，所以现在点击按钮只有按钮会变颜色。我们给 `connect` 的高阶组件增加监听数据变化重新渲染的逻辑，稍微重构一下 `connect`。

我们在 `Connect` 组件的 `constructor` 里面初始化了 `state.allProps`，它是一个对象，用来保存需要传给被包装组件的所有的参数。生命周期 `componentWillMount` 会调用 `_updateProps` 进行初始化，然后通过 `store.subscribe` 监听数据变化重新调用 `_updateProps`。

为了让 `connect` 返回新组件和被包装的组件使用参数保持一致，我们会把所有传给 `Connect` 的 `props` 原封不动地传给 `WrappedComponent`。所以在 `_updateProps` 里面会把 `stateProps` 和 `this.props` 合并到 `this.state.allProps` 里面，再通过 `render` 方法把所有参数都传给 `WrappedComponent`。

`mapStateToProps` 也发生点变化，它现在可以接受两个参数了，我们会把传给 `Connect` 组件的 `props` 参数也传给它，那么它生成的对象配置性就更强了，我们可以根据 `store` 里面的 `state` 和外界传入的 `props` 生成我们想传给被包装组件的参数。

## mapDispatchToProps ##

在重构 `ThemeSwitch` 的时候我们发现，`ThemeSwitch` 除了需要 `store` 里面的数据以外，还需要 `store` 来 `dispatch`。

既然可以通过给 `connect` 函数传入 `mapStateToProps` 来告诉它如何获取、整合状态，我们也可以想到，可以给它传入另外一个参数来告诉它我们的组件需要如何触发 `dispatch`。

和 `mapStateToProps` 一样，它返回一个对象，这个对象内容会同样被 `connect` 当作是 `props` 参数传给被包装的组件。不一样的是，这个函数不是接受 `state` 作为参数，而是 `dispatch`，你可以在返回的对象内部定义一些函数，这些函数会用到 `dispatch` 来触发特定的 `action`。

在 `_updateProps` 内部，我们把 `store.dispatch` 作为参数传给 `mapDispatchToProps` ，它会返回一个对象 `dispatchProps`。接着把 `stateProps`、`dispatchProps`、`this.props` 三者合并到 `this.state.allProps` 里面去，这三者的内容都会在 `render` 函数内全部传给被包装的组件。

## Provider ##

其实它要用 `context` 就是因为要把 `store` 存放到里面，好让子组件 `connect` 的时候能够取到 `store`。我们可以额外构建一个组件来做这种脏活，然后让这个组件成为组件树的根节点，那么它的子组件都可以获取到 `context` 了。

我们把这个组件叫 `Provider`，因为它提供（`provide`）了 `store`。

`Provider` 做的事情也很简单，它就是一个容器组件，会把嵌套的内容原封不动作为自己的子组件渲染出来。它还会把外界传给它的 `props.store` 放到 `context`，这样子组件 `connect` 的时候都可以获取到。

## React-redux 总结 ##

`React.js` 除了状态提升以外并没有更好的办法帮我们解决组件之间共享状态的问题，而使用 `context` 全局变量让程序不可预测。我们知道 `store` 里面的内容是不可以随意修改的，而是通过 `dispatch` 才能变更里面的 `state`。所以我们尝试把 `store` 和 `context` 结合起来使用，可以兼顾组件之间共享状态问题和共享状态可能被任意修改的问题。

我们尝试通过构建一个高阶组件 `connect` 函数的方式，把所有的重复逻辑和对 `context` 的依赖放在里面 `connect` 函数里面，而其他组件保持 `Pure（Dumb）` 的状态，让 `connect` 跟 `context` 打交道，然后通过 `props` 把参数传给普通的组件。

而每个组件需要的数据和需要触发的 `action` 都不一样，所以调整 `connect`，让它可以接受两个参数 `mapStateToProps` 和 `mapDispatchToProps`，分别用于告诉 `connect` 这个组件需要什么数据和需要触发什么 `action`。

`Provider` 作为所有组件树的根节点，外界可以通过 `props` 给它提供 `store`，它会把 `store` 放到自己的 `context` 里面，好让子组件 `connect` 的时候都能够获取到。

## 使用真正的 Redux 和 React-redux ##

在工程目录下使用 `npm` 安装 `Redux` 和 `React-redux` 模块：

    npm install redux react-redux --save

把前面部分的代码调整为：

    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { createStore } from 'redux'
    import { Provider } from 'react-redux'
    import Header from './Header'
    import Content from './Content'
    import './index.css'

我们删除了自己写的 `createStore`，改成使用第三方模块 `redux` 的 `createStore`；`Provider` 本来从本地的 `./react-redux` 引入，改成从第三方 `react-redux` 模块中引入。其余代码保持不变。

<p class="codepen" data-height="365" data-theme-id="0" data-default-tab="js" data-user="whjin" data-slug-hash="YBjeWz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="React-redux-usersReducer">
  <span>See the Pen <a href="https://codepen.io/whjin/pen/YBjeWz/">
  React-redux-usersReducer</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Smart 组件 vs Dumb 组件 ##

当我们拿到一个需求开始划分组件的时候，要认真考虑每个被划分成组件的单元到底会不会被复用。如果这个组件可能会在多处被使用到，那么我们就把它做成 `Dumb` 组件。

`Smart` 组件不用考虑太多复用性问题，它们就是用来执行特定应用逻辑的。`Smart` 组件可能组合了 `Smart` 组件和 `Dumb` 组件；但是 `Dumb` 组件尽量不要依赖 `Smart` 组件。一旦一个可复用的 `Dumb` 组件之下引用了一个 `Smart` 组件，就相当于污染了这个 `Dumb` 组件树。如果一个组件是 `Dumb` 的，那么它的子组件们都应该是 `Dumb` 的才对。

### 划分 Smart 和 Dumb 组件 ###

我们规定：**所有的 `Dumb` 组件都放在 `components/` 目录下，所有的 `Smart` 的组件都放在 `containers/` 目录下**，这是一种约定俗成的规则。

### 组件划分原则 ###

**`Content` 不复用**

如果产品场景并没有要求说 `Content` 需要复用，它只是在特定业务需要而已。那么没有必要把 `Content` 做成 `Dumb` 组件了，就让它成为一个 `Smart` 组件。因为 `Smart` 组件是可以使用 `Smart` 组件的，所以 `Content` 可以使用 `Dumb` 的 `ThemeSwitch` 组件 `connect` 的结果。

    src
    ├── components
    │   ├── Header.js
    │   └── ThemeSwitch.js
    ├── containers
    │   ├── Content.js
    │   ├── Header.js
    │   └── ThemeSwitch.js
    └── index.js

**`Content` 可复用**

如果产品场景要求 `Content` 可能会被复用，那么 `Content` 就要是 `Dumb` 的。那么 `Content` 的之下的子组件 `ThemeSwitch` 就一定要是 `Dumb`，否则 `Content` 就没法复用了。这就意味着 `ThemeSwitch` 不能 `connect`，即使你 `connect` 了，`Content` 也不能使用你 `connect` 的结果，因为 `connect` 的结果是个 `Smart` 组件。

这时候 `ThemeSwitch` 的数据、`onSwitchColor` 函数只能通过它的父组件传进来，而不是通过 `connect` 获得。所以只能让 `Content` 组件去 `connect`，然后让它把数据、函数传给 `ThemeSwitch`。

    src
    ├── components
    │   ├── Header.js
    │   ├── Content.js
    │   └── ThemeSwitch.js
    ├── containers
    │   ├── Header.js
    │   └── Content.js
    └── index.js

**总结**

- 根据是否需要高度的复用性，把组件划分为 `Dumb` 和 `Smart` 组件，约定俗成地把它们分别放到 `components` 和 `containers` 目录下。
- `Dumb` 基本只做一件事情 —— 根据 `props` 进行渲染。而 `Smart` 则是负责应用的逻辑、数据，把所有相关的 `Dumb（Smart）` 组件组合起来，通过 `props` 控制它们。
- `Smart` 组件可以使用 `Smart`、`Dumb` 组件；而 `Dumb` 组件最好只使用 `Dumb` 组件，否则它的复用性就会丧失。
- 要根据应用场景不同划分组件，如果一个组件并不需要太强的复用性，直接让它成为 `Smart` 即可；否则就让它成为 `Dumb` 组件。
- 还有一点要注意，`Smart` 组件并不意味着完全不能复用，`Smart` 组件的复用性是依赖场景的，在特定的应用场景下是当然是可以复用 `Smart` 的。而 `Dumb` 则是可以跨应用场景复用，`Smart` 和 `Dumb` 都可以复用，只是程度、场景不一样。

> 原文链接：[React.js 小书](http://huziketang.mangojuice.top/books/react/)