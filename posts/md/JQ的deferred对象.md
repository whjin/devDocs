# jQuery的deferred对象 #

**`deferred`对象就是jQuery的回调函数解决方案。**

它解决了如何处理耗时操作的问题，提供了更好的控制和`javascript`统一的编程接口。

## ajax操作的链式写法 ##

    $.ajax('test.html')
        .done(function () {
            alert('success');
        })
        .fail(function () {
            alert('error');
        })
        
## 指定同一操作的多个回调函数 ##

`deferred`允许自由添加多个回调函数。

    $.ajax('test.html')
        .done(function () {
            alert('success');
        })
        .fail(function () {
            alert('error');
        })
        .done(function () {
            alert('第二个回调函数！')
        });
        
## 为多个操作指定回调函数 ##

`deferred`对象允许为多个事件指定一个回调函数。

    $.when($.ajax("test1.html"), $.ajax("test2.html"))
        .done(function () {
            alert("success")
        })
        .fail(function () {
            alert("fail")
        });
        
## 普通操作的回调函数接口 ##

`deferred`对象把一套回调函数接口，从`ajax`操作扩展到所有操作。

`$.when()`的参数只能是`deferred`对象。

    $.when($.ajax("test1.html"), $.ajax("test2.html"))
        .done(function () {
            alert("success")
        })
        .fail(function () {
            alert("fail")
        });
        
`wait()`函数返回的是`deferred`对象，可以加上链式操作。

    $.when(wait(dtd))
        .done(function () {
            alert("success")
        })
        .fail(function () {
            alert("fail")
        });
        
`wait()`函数执行完毕，就会自动运行`done()`方法指定的回调函数。

## `deferred.resolve()`方法和`deferred.reject()`方法 ##

`deferred`对象有三种执行状态——未完成，已完成和已失败。
- 已完成（`resolved`），`deferred`对象立即调用`done()`方法指定的回调函数
- 已失败，调用`fail()`方法指定的回调函数
- 未完成，则继续等待，或调用`progress()`方法指定的回调函数
- 还存在一个`deferred.reject()`方法，作用是将`dtd`对象的执行状态从“未完成”改为“已失败”，从而触发`fail()`方法

## `deferred.promise()`方法 ##

上面的`dtd`是一个全局对象，它的执行状态可以从外部改变。

    var dtd = $.Deferred();// 新建一个deferred对象
    var wait = function (dtd) {
        var tasks = function () {
            alert("执行完毕");
            dtd.resolve();// 改变deferred对象的执行状态
        };
        setTimeout(tasks, 2000);
        return dtd;
    };
    
    $.when(wait(dtd))
        .done(function () {
            alert("success")
        })
        .fail(function () {
            alert("fail")
        });
    dtd.resolve();// 改变deferred对象的执行状态
    
在代码尾部加一行`dtd.resolve()`，改变`dtd`对象的执行状态，导致`done()`方法立即执行。

为了避免这种情况，jQuery提供了`deferred.promise()`方法。作用是在原来的`deferred`对象上返回另一个`deferred`对象，后者只开放与改变状态无关的方法（`done()`和`fail()`），屏蔽与改变状态有关的方法(`resolve()`和`reject()`)，从而使得执行状态不能被改变。

    var wait = function (dtd) {
        var dtd = $.Deferred();// 在函数内部，新建一个Deferred对象
        var tasks = function () {
            alert("执行完毕");
            dtd.resolve();// 改变deferred对象的执行状态
        };
        setTimeout(tasks, 5000);
        return dtd.promise();// 返回promise对象
    };
    
    $.when(wait())
        .done(function () {
            alert("success")
        })
        .fail(function () {
            alert("fail")
        });

另一种防止执行状态被外部改变的方法，使用`deferred`对象的构建函数`$.Deferred()`。

`$.Deferred()`可以接受一个函数名作为参数，`$.Deferred()`所生成的`deferred`对象将作为这个函数的默认参数。

    $.Deferred(wait);
    
除了上面两种方法之外，还可以直接在`wait()`对象上部署`deferred`接口。

    dtd.promise(wait);
    
## 小结：`deferred`对象的方法 ##

1. `$.Deferred()` 生成一个`deferred`对象
2. `deferred.done()` 指定操作成功时的回调函数   
3. `deferred.fail()` 指定操作失败时的回调函数
4. `deferred.promise()` 没有参数时，返回一个新的`deferred`对象，该对象的运行状态无法被改变；接受参数时，作用是在参数对象上部署`deferred`接口 
5. `deferred.resolve()` 手动改变`deferred`对象的运行状态为“已完成”，从而立即触发`done()`方法
6. `deferred.reject()` 这个方法与`deferred.resolve()`正好相反，调用后将`deferred`对象的运行状态变为"已失败"，从而立即触发`fail()`方法
7. `$.when()` 为多个操作指定回调函数
8. `deferred.then()` 可以把`done()`和`fail()`合在一起写
    - 如果`then()`有两个参数，那么第一个参数是`done()`方法的回调函数，第二个参数是`fail()`方法的回调方法。如果`then()`只有一个参数，那么等同于`done()`。

```
$.when($.ajax("main.php"))
    .then(successFunc, failFunc);
```

9. `deferred.always()`

用来指定回调函数，作用是不管调用的是`deferred.resolve()`还是`deferred.reject()`，最后总是执行。

    $.ajax("test.html")
        .always(function () {
            alert("已执行")
        });







