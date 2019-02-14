# Redux-评论功能 #

## 构建评论的 reducer ##

我们之前的 `reducer` 都是直接写在 `src/index.js` 文件里面，这是一个不好的做法。因为随着应用越来越复杂，可能需要更多的 `reducer` 来帮助我们管理应用。所以最好还是把所有 `reducer` 抽出来放在一个目录下 `src/reducers`。

其实评论功能的组件之间共享的状态只有 `comments`。我们可以直接只在 `src/reducers` 新建一个 `reducer` `comments.js` 来对它进行管理。

思考一下评论功能对于评论有什么操作？想清楚我们才能写好 `reducer`，因为 `reducer` 就是用来描述数据的形态和相应的变更。**新增**和**删除**评论这两个操作是最明显的，大家应该都能够轻易想到。还有一个，我们的评论功能其实会从 `LocalStorage` 读取数据，读取数据以后其实需要保存到应用状态中。所以我们还有一个**初始化**评论的操作。

我们只存储了一个 `comments` 的状态，初始化为空数组。当遇到 `INIT_COMMENTS` 的 `action` 的时候，会新建一个对象，然后用 `action.comments` 覆盖里面的 `comments` 属性。这就是初始化评论操作。

同样新建评论操作 `ADD_COMMENT` 也会新建一个对象，然后新建一个数组，接着把原来 `state.comments` 里面的内容全部拷贝到新的数组当中，最后在新的数组后面追加 `action.comment`。这样就相当于新的数组会比原来的多一条评论。（这里不要担心数组拷贝的性能问题，`[...state.comments]` 是浅拷贝，它们拷贝的都是对象引用而已。）

对于删除评论，其实我们需要做的是**新建一个删除了特定下标的内容的数组**。我们知道数组 `slice(from, to)` 会根据你传进去的下标拷贝特定范围的内容放到新数组里面。所以我们可以利用 `slice` 把原来评论数组中 `action.commentIndex` 下标之前的内容拷贝到一个数组当中，把 `action.commentIndex` 坐标之后的内容拷贝到另外一个数组当中。然后把两个数组合并起，就相当于“删除”了 `action.commentIndex` 的评论了。

## action creators ##

之前我们使用 `dispatch` 的时候，都是直接手动构建对象，每次都要写 `type` 其实挺麻烦的，而且还要去记忆 `action.type` 的名字也是一种负担。我们可以把 `action` 封装到一种函数里面，让它们去帮助我们去构建这种 `action`，我们把它叫做 `action creators`。

所谓 `action creators` 其实就是返回 `action` 的函数，这样我们 `dispatch` 的时候只需要传入数据就可以了。

`action creators` 还有额外好处就是可以帮助我们对传入的数据做统一的处理；而且有了 `action creators`，代码测试起来会更方便一些。

现在需要从复用性角度重新思考如何实现和组织这些组件。假定在目前的场景下，`CommentInput`、`CommentList`、`Comment` 组件都是需要复用的，我们就要把它们做成 `Dumb` 组件。

我们发现其实 `CommentList` 和 `Comment` 本来就是 `Dumb` 组件，直接把它们俩移动到 `components` 目录下即可。而 `CommentInput` 就需要好好重构一下了。我们把它里面和 `LocalStorage` 操作相关的代码全部删除，让它从 `props` 获取数据，变成一个 `Dumb` 组件，然后移动到 `src/components/CommentInput.js `文件内。

原来 `CommentInput` 需要从 `LocalStorage` 中获取 `username` 字段，现在让它从 `props` 里面去取；而原来用户名的输入框 `blur` 的时候需要保存 `username` 到 `LocalStorage` 的行为也通过 `props.onUserNameInputBlur` 传递到上层去做。现在 `CommentInput` 是一个 `Dumb` 组件了，它的所有渲染操作都只依赖于 `props` 来完成。

现在我们有三个 `Dumb` 组件，一个控制评论的 `reducer`。需要有人去 `LocalStorage` 加载数据，去控制新增、删除评论，去把数据保存到 `LocalStorage` 里面。

## Smart CommentList ##

对于 `CommentList` 组件，可以看到它接受两个参数：`comments` 和 `onDeleteComment`。说明需要一个 `Smart` 组件来负责把 `comments` 数据传给它，并且还得响应它删除评论的请求。

我们一开始传给 `CommentListContainer` 的 `props.comments` 其实是 `reducer` 里面初始化的空的 `comments` 数组，因为还没有从 `LocalStorage` 里面取数据。

而 `CommentListContainer` 内部从 `LocalStorage` 加载 `comments` 数据，然后调用 `this.props.initComments(comments)` 会导致 `dispatch`，从而使得真正从 `LocalStorage` 加载的 `comments` 初始化到 `state` 里面去。

因为 `dispatch` 了导致 `connect` 里面的 `Connect` 包装组件去 `state` 里面取最新的 `comments` 然后重新渲染，这时候 `CommentListContainer` 才获得了有数据的 `props.comments`。

## Smart CommentInput ##

对于 `CommentInput` 组件，我们可以看到它有三个参数：`username`、`onSubmit`、`onUserNameInputBlur`。我们需要一个 `Smart` 的组件来管理用户名在 `LocalStorage` 的加载、保存；用户还可能点击“发布”按钮，所以还需要处理评论发布的逻辑。

## Smart CommentApp ##

我们用 `CommentApp` 把这两个 `Smart` 的组件组合起来。

原本很复杂的 `CommentApp` 现在变得异常简单，因为它的逻辑都分离到了两个 `Smart` 组件里面去了。分离这些逻辑对我们代码的维护和管理也会带来好处。

通过 `commentsReducer` 构建一个 `store`，然后让 `Provider` 把它传递下去，这样我们就完成了最后的重构。

**文件目录：**

    src
    ├── components
    │   ├── Comment.js
    │   ├── CommentInput.js
    │   └── CommentList.js
    ├── containers
    │   ├── CommentApp.js
    │   ├── CommentInput.js
    │   └── CommentList.js
    │   reducers
    │     └── comments.js
    ├── index.css
    └── index.js

> 原文链接：[React.js 小书](http://huziketang.mangojuice.top/books/react/)