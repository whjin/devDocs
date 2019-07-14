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

    import {
      config
    } from '/config.js';
    
    // 设置别名
    import {
      config as config1
    } from '/config.js';
    
    import {
      config,
      fun1
    } from '/config.js';
    
    class HTTP {
      request(params) {
        wx.request({
          url: '',
        })
      }
    }





