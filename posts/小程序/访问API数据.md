# 访问API数据 #

**监听页面加载**

最快从服务器发起请求，获取数据。`request`异步处理。

    onLoad: function(options) {
      wx.request({
        url: '',
        data: '',
        header: {
          "content-type": "json"
        },
        success: function (res) {
          console.log(res)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }

**ES6箭头函数和`this`指代**，解决`this`指代问题。

    success: res => {
      console.log(res)
    }
    
## `Promise`应用场景 ##

1. 异步嵌套
2. 使用`return`获取返回值

新建`config.js`配置文件，写入内容，导出模块：

    // 导出形式1
    export const config = {
      api_base_url: '',
      appkey: ""
    }
    
    export let fun1 = function() {}
    
    // 导出形式2
    export {
      config,
      fun1
    };        

新建`http.js`，创建一个类，引入`config.js`模块：

    // 引入多个模块
    import {
      config
    } from '../config.js';
    
    class HTTP {
      request(params) {
        if (!params.method) {
          params.method = "GET"
        }
        wx.request({
          url: config.api_base_url + params.url,
          method: params.method,
          data: params.data,
          header: {
            'content-type': 'application/json',
            'appkey': config.appkey
          },
          success: res => {
            // 40x状态码依然在success里面处理 
            // 使用ES6中的startsWith和endsWith
            let code = res.statusCode.toString();
            if (code.startsWith('2')) {
              params.success(res.data)
            } else {}
          },
          fail: err => {}
        })
      }
    }
    
    export {
      HTTP
    };

> 组件中引入模块可以使用绝对定位，在页面中引入则需要使用相对路径。





