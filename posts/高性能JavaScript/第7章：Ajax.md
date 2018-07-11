# 第7章：Ajax #

Ajax是高性能JS的基础，它可以通过延迟下载体积较大的资源文件来使得页面加载速度更快。它通过异步的方式在客户端和服务端之间传输数据。它甚至可以只用一个HTTP请求就获取整个页面的资源。

## 数据传输 ##

Ajax是一种与服务器通信而无需重载页面的方法。

### 请求数据 ###

有五种常用技术用于向服务器请求数据：

1. `XMLHTTPRequest`
2. 动态脚本注入
3. `iframes`
4. `Comet`
5. Multipart XHR

JS中经常使用的三种技术：XHR、动态脚本注入和Multipart XHR。

**XMLHTTPRequest**

`XMLHTTPRequest`（XHR）是目前最常用的技术，它允许异步发送和接收数据。所有主流浏览器都对他提供了支持，而且它还能精确地控制发送请求和接收数据。

**使用XHR，POST和GET的对比。**只有当请求的URL加上参数的长度接近或超过**2048**个字符时，才应该用POST请求获取数据。

**动态脚本注入**

这种技术克服了XHR的最大限制：它能跨域请求数据。使用JS创建新的脚本标签，并设置它的`src`属性为不同域的URL。

    var script = document.createElement('script');
    script.src = 'http://domain.com/js/lib.js';
    document.getElementsByTagName('head')[0].appendChild(script);

动态脚本注入不能设置请求的头信息，只能使用GET方式，不能设置请求的超时处理或重试。特别重要的一点是，因为响应消息作为脚本标签的源码，它必须是可执行的JS代码。其他的任何格式都必须封装在一个回调函数中。

    function jsonCallback(jsonString) {
        var data = eval('(' + jsonString + ')');
        //处理数据
    }
    
**Multipart XHR**

Multipart XHR允许客户端只用一个HTTP请求就可以从服务端向客户端传输多个资源。它通过在服务端将资源打包成一个有双方约定的字符串分割的长字符串并发送给客户端。然后用JS代码处理这个长字符串，并根据它的`mime-type`类型和传入的其他“头信息”解析出每个资源。

<p data-height="300" data-theme-id="0" data-slug-hash="OwPWLG" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="MXHR" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/OwPWLG/">MXHR</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

使用这个技术最大缺点是获得的资源不能被浏览器缓存。合并后的资源是作为字符串传输，然后被JS代码分解成片段，无法用编程的方式向浏览器缓存里注入文件，因此用这种方式获取的资源无法被缓存。

MXHR能显著提升页面的整体性能：

- 页面包含了大量其他地方用不到的资源（无需缓存），尤其是图片
- 网站已经在每个页面使用一个独立打包的JS或CSS文件来减少HTTP请求；因此对每个页面来说这些文件都是唯一的。所以不需要从缓存中读取数据，除非重载页面

### 发送数据 ###

当数据只需发送到服务器时，有两种广泛使用的技术：XHR和信标。

**XMLHTTPRequest**

XHR既可以用于从服务器获取数据，也可以用于把数据传回服务器。当需要传回的数据超出浏览器的最大URL尺寸限制时，XHR特别有用。

<p data-height="265" data-theme-id="0" data-slug-hash="OwPWxJ" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="XHR" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/OwPWxJ/">XHR</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

**Beacons**

这个技术非常类似动态脚本注入。使用JS创建一个新的`Image`对象，并把`src`属性设置为服务器上脚本的URL。该URL包含了要通过GET传回的键值对数据。

    var url = '/status_tracker.php';
    var params = ['step=2', 'time=12472112'];
    (new Image()).src = url + '?' + params.join('&');

服务器会接收到数据并保存下来，无须向客户端发送任何反馈信息。它的性能消耗很小，而且服务端的错误完全不会影响到客户端。

图片信标无法发送POST请求，而URL的长度有最大值，可以发送的数据长度被限制的相当小。可以接收服务器返回的数据，但只局限于非常少的几种方式。一种是`Image`对象的`load`事件，它会告知服务器是否成功接收数据。还可以检查服务器返回的图片的宽高，并使用这些数字通知服务器的状态。

信标是向服务器回传数据最快且最有效的方式。服务器根本不需要发送任何响应正文，因此无需担心客户端下载数据。唯一的缺点是能够接收到的响应类型是有限的。如果需要返回大量数据给客户端，可以使用XHR。如果只关心发送数据到服务器，可以使用图片信标。

## 数据格式 ##

当使用数据传输技术时，必须考虑这些因素：功能集、兼容性、性能以及数据传输方向。当考虑数据格式时，唯一需要比较的标准就是速度。

### XMLP134 ###

### XPath ###

**响应内容大小和解析事件P137**

XML和XPath两项技术略过不讲。

### JSON ###

在JS中可以简单地使用`eval()`来解析JSON字符串。

    function parseJSON(responseText) {
        return eval('(' + responseText + ')')
    }

> 在代码中使用`eval()`是很危险的，特别是它执行第三方的JSON数据。尽可能使用`JSON.parse()`方法解析字符串本身。该方法可以捕获JSON中的词法错误，并允许传入一个函数，用来过滤或转换解析结果。

### JSON-P ###

JSONP在本地执行会导致性能问题。当使用XHR时，JSON数据被当成字符串返回。该字符串紧接着被`eval()`转换成原生对象。然而在使用动态脚本注入时，JSON数据被当成另一个JS文件并作为原生代码执行。为实现这一点，这些数据必须封装在一个回调函数中。

    parseJSON([
        {"id": 1, "username": "Andy", "realname": "Andy Liu", "email": "AndyLiu@163.com"},
        {"id": 2, "username": "Lucy", "realname": "Lucy Chen", "email": "LucyChen@163.com"},
    ]);
    
由于数据是当做原生的JS，因此解析速度跟原生JS一样快。最快的JSON格式是使用数组形式的JSON-P。

> 有一种情形要避免使用JSON-P（与性能无关），因为JSON-P必须是可执行的JS，它可能被任何人调用并使用动态脚本注入技术插入到任何网站。不要把任何敏感数据编码在JSON-P中，因为无法确认它是否保持着私有调用状态。

### HTML ###

HTML作为一种数据格式，既缓慢，有臃肿。

### 自定义格式 ###

控制字符在JS中使用Unicode表示法，`split()`函数可以使用字符串或正则表达式作为参数。如果在数据中存在空白字段，使用字符串作为分隔符；如果分隔符是正则表达式，IE中的`split()`会忽略紧挨着的两个分隔符中的第二个分隔符。

    //正则表达式作为分隔符
    var rows = req.responseText.split(/\u0001/);
    
    //字符串作为分隔符
    var rows = req.responseText.split("\u0001");

### 数据格式总结 ###

如果是数据集很大且对解析时间有要求，那么从以下两种格式中做出选择：

1. JSON-P数据，使用动态脚本注入获取。它把数据当做可执行JS而不是字符串，解析速度极快。它能跨域使用，但涉及敏感数据时不应该使用它。
2. 字符分隔的自定义格式，使用XHR或动态脚本注入获取，使用`split()`解析。这项技术解析大数据集比JSON-P略快，而且通常文件尺寸更小。

## Ajax性能指南 ##

### 缓存数据 ###

最快的AJax请求就是没有请求。有两种主要的方法可避免发送不必要的请求：

1. 在服务端，设置HTTP头信息以确保响应会被浏览器缓存。
2. 在客户端，把获取到的信息存储到本地，从而避免再次请求。

#### 设置HTTP头信息 ####

如果希望Ajax响应能够被浏览器缓存，必须使用GET方式发出请求，还必须在响应中发送正确的HTTP头信息。Expires头信息会告诉浏览器应该缓存响应多久。它的值是一个日期，过期后对该URL的任何请求都不再从缓存中获取，而是重新访问服务器。

设置Expires头信息是确保浏览器缓存Ajax响应最简单的方法。

#### 本地数据存储 ####

<p data-height="300" data-theme-id="0" data-slug-hash="MBYreG" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="xhrLocalCache" class="codepen">See the Pen <a href="https://codepen.io/whjin/pen/MBYreG/">xhrLocalCache</a> by whjin (<a href="https://codepen.io/whjin">@whjin</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 了解Ajax类库的局限P148 ##

## 小结 ##

动态脚本注入允许跨域请求和本地执行JS和JSON，但是它的接口不是很安全，而且不能读取头信息或响应代码。MXHR可以用来减少请求数，并处理一个响应中的各种文件类型，但是它不能缓存接收到的响应。当需要发送数据时，图片信标是一种简单而有效的方法。XHR还可以用POST发送大量数据。

除了这些格式和传输技术，还有一些准则有助于加速Ajax：

- 减少请求数，可通过合并JS和CSS文件，或使用MXHR。
- 缩短页面的加载时间，页面主要内容加载完成后，用Ajax获取那些次要的文件。
- 确保代码错误不会输出给用户，并在服务端处理错误。
- 知道何时使用成熟的Ajax类库，以及何时编写自己的底层AJax代码。

