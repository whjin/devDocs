# Promise #

**基本使用和原理**

- 异常捕获
- 多个串联
- `Promise.all`和`Promise.race`
- `Promise`标准

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