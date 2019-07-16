# HTTP导学 #

- 输入URL打开网页
- AJAX获取数据
- `img`标签加载图片

**`cache-control`**

- `public`、`private`
- `must-revalidate`
- `no-cache`、`no-store`

**缓存验证**

- `last-modified`配合`if-modified-since`
- `etag`配合`if-none-match`

**请求头**

- `content-type`、`content-encoding`等用来约束数据类型
- `cookie`保持会话信息
- CORS实现跨域并保持安全性限制

## 深入到TCP ##

- 三次握手
- HTTPS链接的创建过程，以及为什么HTTPS是安全的
- 什么是长链接，为什么需要长链接
- HTTP2的信道复用又为什么能提高性能

**浏览器输入URL后HTTP请求返回的完整过程**

1. startTime开始时间--redirectStart开始跳转--**跳转Redirect**--redirectEnd跳转结束
2. fetchStart(fetch开始)--**App cache应用缓存**
3. domainLookupStart域名解析开始--**DNS(DNS查找)**--domainLookupEnd域名解析结束
4. connectStart开始创建链接--secureConnectStart开始创建安全链接-**TCP创建TCP链接**--connectEnd创建链接结束
5. requestStart开始发送请求--**Request发送请求**
6. responseStart开始接收返回--**Response接收返回**--responseEnd结束接收返回

## 网络协议分层 ##

- 物理层
- 数据链路层
- 网络层

**传输层**

向用户提供可靠的端到端服务，传输层向高层屏蔽了下层数据通信的细节。

**应用层**

为应用软件提供了很多服务，构建于TCP协议之上，屏蔽网络传输相关细节。

## HTTP发展史 ##

**HTTP/0.9**，只有一个命令`GET`，没有`HEADER`等描述数据的信息，服务器发送完毕，就关闭TCP连接。

**HTTP/1.0**，增加了很多命令，增加`status`、`code`和`header`，多字符集支持，多部分发送，权限，缓存等。

**HTTP/1.1**，持久连接，`pipeline`，增加`host`和其他一些命令。

**HTTP2**，所有数据以二进制传输，同一个连接里面发送多个请求不再需要按照顺序进行，头信息压缩以及推送等提高效率的功能，

## HTTP三次握手 ##

1. client-(SYN=1,Seq=X)->server
2. server-(SYN=1,ACK=X+1,Seq=Y)->client
3. client-(ACK=Y+1,Seq=Z)->server

## URI、URL和URN ##

**URI**，统一资源标识符，用来唯一标识互联网上的信息资源，包括URL和URN。

**URL**，统一资源定位器，`http://user:pass@host.com:80/path?query=string#hash`

## HTTP报文格式 ##

**HTTP方法**，用于定义对资源的操作





    

