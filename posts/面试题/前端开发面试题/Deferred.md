# Deferred #

**`jQuery 1.5`的变化**

- 无法改变`JS`异步和单线程的本质
- 只能从写法上杜绝`callback`这种形式
- 它是一种语法糖形式，但是解耦了代码
- 很好的体现：开放封闭原则

**使用`jQuery deferred`**

    function waitHanle() {
      var dtd = $.Deferred(); //创建一个deferred对象
      var wait = function (dtd) {
        var task = function () {
          console.log('执行完成');
          dtd.resolve(); //表示异步任务已经完成
          // dtd.reject(); //表示异步任务失败或出错
        };
        setTimeout(task, 1000);
        return dtd;
      };
      //这里一定要有返回值
      return wait(dtd);
    }
    
**`dtd.promise`**

    function waitHanle() {
      var dtd = $.Deferred(); //创建一个deferred对象
      var wait = function (dtd) {
        var task = function () {
          console.log('执行完成');
          dtd.resolve(); //表示异步任务已经完成
        };
        setTimeout(task, 1000);
        return dtd.promise();//这里返回的是promise，而不是直接返回deferred对象
      };
      //这里一定要有返回值
      return wait(dtd);
    }
    
    var waithandle = waitHanle();
    $.when(waitHanle)
      .then(function () {
        console.log('ok 1');
      })
      .then(function () {
        console.log('ok 2');
      });
      
      
    