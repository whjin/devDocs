# 使用 HappyPack #

由于有大量文件需要解析和处理，构建是文件读写和计算密集型的操作，特别是当文件数量变多后，Webpack 构建慢的问题会显得严重。 运行在 Node.js 之上的 Webpack 是单线程模型的，也就是说 Webpack 需要处理的任务需要一件件挨着做，不能多个事情一起做。

文件读写和计算操作是无法避免的，那能不能让 Webpack 同一时刻处理多个任务，发挥多核 CPU 电脑的威力，以提升构建速度呢？

HappyPack 就能让 Webpack 做到这点，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

> 由于 JavaScript 是单线程模型，要想发挥多核 CPU 的能力，只能通过多进程去实现，而无法通过多线程实现。

分解任务和管理线程的事情 HappyPack 都会帮你做好，你所需要做的只是接入 HappyPack。 接入 HappyPack 的相关代码如下：

<p data-height="665" data-theme-id="0" data-slug-hash="RyXLEy" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="HappyPack " class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/RyXLEy/">HappyPack </a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

以上代码有两点重要的修改：

- 在 Loader 配置中，所有文件的处理都交给了 `happypack/loader` 去处理，使用紧跟其后的 `querystring ?id=babel` 去告诉 `happypack/loader` 去选择哪个 HappyPack 实例去处理文件。
- 在 Plugin 配置中，新增了两个 HappyPack 实例分别用于告诉 `happypack/loader` 去如何处理 `.js `和 `.css` 文件。选项中的 `id` 属性的值和上面 `querystring` 中的 `?id=babel` 相对应，选项中的 `loaders` 属性和 Loader 配置中一样。

在实例化 HappyPack 插件的时候，除了可以传入 `id` 和 `loaders` 两个参数外，HappyPack 还支持如下参数：

- `threads` 代表开启几个子进程去处理这一类型的文件，默认是`3`个，类型必须是整数。
- `verbose` 是否允许 HappyPack 输出日志，默认是 `true`。
- `threadPool` 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多，相关代码如下：

<p data-height="465" data-theme-id="0" data-slug-hash="MGNERw" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="threadPool " class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/MGNERw/">threadPool </a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

接入 HappyPack 后，你需要给项目安装新的依赖：

    npm i -D happypack

## HappyPack 原理 ##

在整个 Webpack 构建流程中，最耗时的流程可能就是 Loader 对文件的转换操作了，因为要转换的文件数据巨多，而且这些转换操作都只能一个个挨着处理。 HappyPack 的核心原理就是把这部分任务分解到多个进程去并行处理，从而减少了总的构建时间。

从前面的使用中可以看出所有需要通过 Loader 处理的文件都先交给了 `happypack/loader` 去处理，收集到了这些文件的处理权后 HappyPack 就好统一分配了。

每通过` new HappyPack()` 实例化一个 HappyPack 其实就是告诉 HappyPack 核心调度器如何通过一系列 Loader 去转换一类文件，并且可以指定如何给这类转换操作分配子进程。

核心调度器的逻辑代码在主进程中，也就是运行着 Webpack 的进程中，核心调度器会把一个个任务分配给当前空闲的子进程，子进程处理完毕后把结果发送给核心调度器，它们之间的数据交换是通过进程间通信 API 实现的。

核心调度器收到来自子进程处理完毕的结果后会通知 Webpack 该文件处理完毕。

