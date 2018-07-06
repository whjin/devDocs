# Ajax状态码 #

**Ajax状态码**，`xhr.readyState`

0：UNSENT 未发送，创建Ajax对象，默认值为0
1：OPENED 执行`xhr.open`
2：HEADERS_RECEIVED 当前ajax请求已经发送，并且已经接收到服务器端返回的相应头信息
3：LOADING 响应主体内容正在返回
4：DONE 相应主体内容已经返回到客户端

# Http网络状态码 #

**HTTP网络状态码**，记录当前服务器返回信息的状态`xhr.status`

200：标识成功状态

以**3**开头也表示成功，但服务器端做了特殊处理

301：永久转移（永久重定向），应用于域名迁移
302：临时转移（临时重定向，新版本Http中307是临时重定向），用于服务器负载均衡
304：从浏览器缓存中获取数据，把不常更新的数据缓存到浏览器中

以**4**开头，标识失败状态，多在客户端

400：请求参数错误
401：无权限访问
404：访问地址不存在

以**5**开头，标识失败状态，多在服务器端

500：Internal Server Error 未知的服务器错误
503：Service Unavailable 服务器超负载

# Ajax常用属性和方法 #

> **题目：Ajax中总共支持几个方法？**

**状态**

1. `readyState`：存储当前Ajax状态码
2. `response/responseText/responseXML`：接收服务器返回的相应主体内容
    - `responseText`最常用，接收的结果为字符串格式（一般服务器返回的数据都是JSON格式字符串）
    - `responseXML`接收XML文档数据
3. `status`：记录服务器端返回的HTTP状态码
4. `statusText`：对返回状态码的描述
5. `timeout`：设置当前Ajax请求的超时时间

**方法**

1. `abort()`：强制中断Ajax请求
2. `getAllResponseHeaders()`：获取全部的响应头信息（获取结果为字符串文本）
3. `getResponseHeader(key)`：获取指定属性名的相应头信息
4. `open()`：打开一个URL地址
5. `overrideMimeType()`：重写数据的MIME类型
6. `send()`：发送Ajax请求
7. `setRequestHeader(key,value)`：设置请求头信息

**事件**

1. `onabort()`：当Ajax被中断，请求触发此事件
2. `onreadystatechange`：Ajax状态发生改变，触发此事件
3. `ontimeout`：当Ajax请求超时，触发此事件

# JS编码解码 #

**（非加密）正常编码解码**

1. `escape/unescape`：把中文汉字进行编码解码（一般只有JS支持）
2. `encodeURI/decodeURI`：基本所有编程语言都支持
3. `encodeURIComponent/decodeURIComponent`

**（加密）编码解码**

URL问号传递参数，`encodeURI`不能编码一些特殊字符，只能使用`encodeURLComponent`处理

1. 可逆加密
2. 不可逆加密（基于MD5加密，可能会把MD5加密后的结果二次加密）

# Ajax的同步和异步 #

Ajax任务：发送请求接收到相应主体内容（完整HTTP事务）

- `xhr.send()`：任务结束
- `xhr.readyState===4`：任务结束

# Ajax类库的封装 #

- `url`：请求API地址
- `method`：请求方式GET/POST
- `dataTpye`：预设结果类型，不影响服务器的返回（服务器一般返回JSON格式字符串），如果预设为`json`，类库将服务器返回的字符串转换为json对象
- `cache`：设置是否清除缓存，只对GET系列请求有效，默认是`TRUE`不清除缓存，手动设置为`FALSE`，JQ类库在请求URL的末尾追加一个随机数来清楚缓存
- `data`：通过DATA把一些信息传递给服务器（GET请求把DATA中的内容拼接在URL的末尾通过问好传参的方式传递给服务器，POST请求把内容放在请求主体中传递给服务器）（DATA的值可以设置为两种格式：字符串、对象）
- `async`：设置同步或异步，默认是TRUE，代表异步，FALSE是同步
- `success`：请求成功执行回调函数，并把获取的结果作为实参传递给回调函数
- `error`：请求错误触发回调函数
- `complete`：完成，触发回调函数
