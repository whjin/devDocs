# iView组件 #

## 级联选择组件Cascader ##

级联选择组件是网页应用中的表单类控件，主要用于省市区、公司级别、事务分类等关联数据集合的选择。

Cascader接收一个`prop:data`作为选择面板的数据源，使用`v-model`可以双向绑定当前选择的项。

`data`中的`babel`是面板显示的内容，`value`是它对应的值，`children`是它的子集，可递归。`v-model`绑定一个数组，每一项对应`data`里的`value`。

开发一个通用组件最重要的是定义API，Vue组件的API来自3部分：`prop`、`slot`、`event`。

API决定了一个组件的所有功能，而且作为对外提供的组件，一旦API确定好后，如果再迭代更新，用户的代价就会很高，因为他们已经在业务中使用你的组件，改动太多意味着所有用到的地方都需要改动，所以组件库更新分兼容更新和不兼容更新。

从功能上考虑，先来定义Cascader的`prop`：

- `data`：决定了级联面板的内容
- `value`：当前选择项，可使用`v-model`
- `disabled`：是否禁用
- `clearable`：是否可清空
- `placeholder`：占位提示
- `size`：尺寸（iView多数表单类组件都有尺寸）
- `trigger`：触发方式（点击或鼠标滑入）
- `changeOnSelect`：选择即改变
- `renderFormat`：自定义显示内容

Cascader的核心是用到了组件递归，使用组件递归必不可少的两个条件是有`name`选项和在适当地时候结束递归。

# 相关开源项目 #

## 服务端渲染与`Nuxt.js` ##

### 是否需要服务端渲染 ###

**Nuxt.js**

Nuxt.js是一个基于Vue.js的通用应用框架，为Node.js做Vue的服务端渲染提供了各种配置。

与普通Vue.js项目不同的是，Nuxt.js构建的代码，UI是在服务端渲染的，而非在客户端。

**HTTP库`axios`**

`axios`是一个基于Promise，同时支持浏览器端和Node.js的HTTP库，常用语AJAX请求。

## 多语言插件`vue-i18n` ##

`vue-i18n`是一个Vue.js插件，提供了多语言解决方案。

使用`vue-i18n`插件需要在入口文件中进行多语言包的配置，其实是一个对象，每种语言对应一个`key`。