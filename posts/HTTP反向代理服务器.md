# HTTP反向代理服务器 #

## 接口设计与相关技术 ##

使用`http.createServer()`创建HTTP服务器，处理请求的函数格式`function (req,res){}`，通过`req`、`res`两个对象取得请求的所有信息并对其进行响应。

主流的Node.js Web 框架的中间件（比如`connect`）一般都有两种形式：

- 中间件不需要任何初始化参数，其导出结果为一个`requestHandler`
- 中间件需要初始化参数，其导出结果为中间件的初始化函数，执行该初始化函数时，传入一个`options`对象，执行后返回一个`requestHandler`

