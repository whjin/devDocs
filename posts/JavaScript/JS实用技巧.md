# JS实用技巧 #

**使用闭包实现私有变量**

```
function Person(name, age) {
  this.getName = function() { return name; };
  this.setName = function(newName) { name = newName; };
  this.getAge = function() { return age; };
  this.setAge = function(newAge) { age = newAge; };

  //未在构造函数中初始化的属性
  var occupation;
  this.getOccupation = function() { return occupation; };
  this.setOccupation = function(newOcc) { occupation =
    newOcc; };
}
```
    
**创建对象的构造函数**

```
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
```

**判断对象的数据类型**

    const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
    const isArray = isType('Array');
    console.log(isArray([]));

使用`Object.prototyoe.toString`配合闭包，通过传入不同的判断类型，返回不同的判断函数。

> 不推荐将这个函数用来检测可能会产生包装类型的基本数据类型上，因为`call`会将第一个参数进行装箱操作。

**循环实现数据`map`方法**

**使用`reduce`实现数组`map`方法**

**循环实现数组`filter`方法**

****    

> 参考文章：[45 Useful JavaScript Tips, Tricks and Best Practices](https://modernweb.com/45-useful-javascript-tips-tricks-and-best-practices/)
