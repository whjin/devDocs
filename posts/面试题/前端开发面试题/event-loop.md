# event-loop #

- **事件轮询**，`JS`实现异步的具体解决方案
- **同步代码**，直接执行
- 异步函数先放在**异步队列**中
- 待同步函数执行完毕，轮询执行**异步队列**的函数

**异步**

    //异步队列
    
    //100ms 之后被放入
    setTimeout(function () {
      console.log(1);
    }, 100);
    //立刻被放入
    setTimeout(function () {
      console.log(2);
    });
    //主进程
    console.log(3);
    
**事件轮询**

    //异步队列
    
    //ajax加载完毕时被放入
    $.ajax({
      url: 'url',
      success: function (result) {
        console.log(1);
      }
    });
    //100ms之后被放入
    setTimeout(function () {
      console.log(2);
    }, 100);
    //立刻被放入
    setTimeout(function () {
      console.log(3);
    });
    
    //主进程
    console.log(4);

