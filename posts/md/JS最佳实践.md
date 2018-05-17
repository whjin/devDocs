# JS最佳实践 #

## 语言精粹 ##

- 面向对象
- 匿名函数
- 函数作为第一类对象
- 弱类型
- 作用域和提升
    - **变量提升**：在运行时，所有的变量及函数声明将会被移到函数的起始位置（它的作用域）- 这就是所谓的变量提升。
- 函数绑定
    - 在另一个函数中保持`this`的上下文环境时，需要**函数原型绑定**
- 闭包函数
    - 闭包是引用独立（自由）变量的函数。
    - 闭包中定义的函数会“记住”它被创建时的环境。
- 严格模式
- 立即调用函数
    - 一个立即调用函数表达式是采用JS的函数作用域产生一个词法作用域的模式。
    - 立即调用函数可避免变量从其所在的块内提升到上面的块，以避免污染全局环境，并可使用公共方法访问它，同时保留隐私。

## 设计模式 ##

- 工厂模式
- 原型模式
- 混合模式
- 单例模式

### 创建型设计模式 ###

- 适配器模式
- 桥接模式
- 组合模式
- 装饰者模式
- 外观模式
- 享元模式
- 模块模式
- 代理模式
- 揭示模块模式

### 结构型设计模式 ###

- 职责链模式
- 命令模式
- 中介者模式
- 观察者模式

### 行为设计模式 ###

## 测试工具 ##

- `Mocha`
- `QUnit`
- `Jasmine`
- `Karma`
- `Intern`
- `AVA`
- `Jest`

## 框架 ##

### 热门框架 ###

- `jQuery`
- `ZeptoJS`
    - 针对现在浏览器开发，极简的JavaScript函数库，兼容大量的jQuery API。
- `Dojo Toolkit`
    - 免费、开源的JavaScript工具包，用来建立高效的网络应用。
- `UnderScore.js`
    - 提供整套函数式变成的工具，同时不扩展原生JavaScript的库。

### MV* ###

- `backbone.js`
    - 非常热门的JavaScript客户端框架。
- `Ember.js`
    - jQuery及Ruby on Rails核心开发者
- `Knockout.js`
    - 使用`Model-View-View-Model(MVVM)`构建简单的JavaScript用户界面。
- `Angular.js`
    - 类似`polyfill`用于HTML
- `Angular`
    - 一个`framework.Mobile`和桌面。
    - 一种使用Angular创建应用城市的额方法，对于web，移动网站，手机和本地桌面。
- `Meteor`
    - 可以在短时间内建立起高质量的网络应用的开源平台

### 函数库 ###

- `React`
    - React是一个JavaScript函数库，用于开发Facebook及Instagram的用户界面。
- `Handlebars`
    - 建立有语义的模板

### 动画 ###

- `Velocity.js`
    - 一个和jQuery的`$.animate()`有相同API的动画引擎。
- `Bounce.js`
    - 一个创造精美CSS3动画的工具及JS函数库
- ``









