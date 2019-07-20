# Promise #

**基本使用和原理**

- 如何异常捕获
- 多个串联-链式执行的好处
- `Promise.all`和`Promise.race`
- `Promise`标准-状态变化、`then`函数

**`Promise`语法**

    function loadImg(src) {
      const promiss = new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.onload = function () {
          resolve(img);
        };
        img.onerror = function () {
          reject()
        };
        img.src = src;
      });
      return promiss;
    }
    
    let src = 'img_url';
    const result = loadImg(src);
    
    result.then(img => {
      console.log(img.width);
    }, () => {
      console.log('failed');
    });
    
    result.then(img => {
      console.log(img.height);
    });
    
**问题解答**

- `new Promiss()`实例，而且要`return`
- `new Promise`时要传入函数，函数有`resolve`、`reject`两个参数
- 成功时执行`resolve()`，失败时执行`reject()`
- `then`监听结果

**异常捕获**

    //规定：then只接受一个参数，最后统一用catch捕获异常
    result.then(function (img) {
      console.log(img.width);
    }).then(function (img) {
      console.log(img.height);
    }).catch(function (ex) {
    //  最后统一catch
      console.log(ex);
    });
    
**`Promise.all`&`Promise.race`**    

    //Promise.all接收一个promise对象的数组
    //待全部完成之后，统一执行success
    Promise.all([result1, result2]).then(datas => {
      //接收到的datas是一个数组，依次包含了多个promise返回的内容
      console.log(datas[0]);
      console.log(datas[1]);
    });
    
    //Promise,race接收一个包含多个promise对象的数组
    //只要有一个完成，就执行success
    Promise.race([result1, result2]).then(data => {
      //data即最先执行完成的，promise的返回值
      console.log(data);
    });
    
## Promise标准-状态变化 ##

- 三种状态：`pending`、`fullfilled`、`reject`
- 初始状态：`pending`
- `pending`变为`fullfilled`，或者`pending`变为`rejected`
- 变化状态不可逆

## Promise标准-`then` ##

- `Promise`实例必须实现`then`这个方法
- `then()`必须可以接收两个函数作为参数
- `then()`返回的必须是一个`Promise`实例

