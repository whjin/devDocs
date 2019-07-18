# ES6 #

- `Object.is()`与原来的比较操作符`===`、`==`的区别？

> `==`判断，会在比较时进行类型转换
> `===`判断（严格判断），比较时不进行隐式类型转换，类型不同就会返回`false`

> `Object.is()`在`===`判断的基础上特别处理了`NaN`、`-0`和`+0`，保证`-0`和`+0`不再相同，但`Object.is(NaN,NaN)`会返回`true`

## ES6常用功能 ##

- `let/const`
- 多行字符串/模板变量
- 解构赋值
- 块级作用域
- 函数默认参数
- 箭头函数

**解构赋值**

    const obj = {a: 10, b: 20, c: 30};
    const {a, b} = obj;
    console.log(a); //10
    console.log(b); //20
    
    const arr = ['a', 'b', 'c'];
    const [x, y, z] = arr;
    console.log(x); //a
    console.log(y); //b
    console.log(z); //c