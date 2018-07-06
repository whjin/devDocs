# JS实用技巧 #

1. 使用闭包实现私有变量

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
    
2. 创建对象的构造函数

    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }


[https://modernweb.com/45-useful-javascript-tips-tricks-and-best-practices/](https://modernweb.com/45-useful-javascript-tips-tricks-and-best-practices/)
