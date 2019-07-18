# Promise #

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

