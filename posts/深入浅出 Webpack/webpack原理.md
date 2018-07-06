# webpack原理 #

虽然通过前四章的学习你已经能用 Webpack 解决常见问题， 但当你在实战中遇到比较特殊的需求、在社区中找不到解决方案时，你需要编写自己的 Loader 或 Plugin， 要做到这点的前提是需要了解 Webpack 的工作原理。

了解 Webpack 的工作原理还能让你对 Webpack 有更深的认识，使用它时更加得心应手。

本章包含以下内容：

了解 Webpack 整体架构、工作流程，学会区分一个的功能的实现是通过 Loader 合适还是 Plugin 更合适：

- 工作原理概括
- 输出文件分析

如何开发、调试 Loader 和 Plugin：

- 编写 Loader
- 编写 Plugin
- 调试 Webpack