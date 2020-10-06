// Object 构造函数的属性
// 1. length
console.log(Object.length); // 1

// 2. prototype  //原型
Object.prototype.sayHello = function() {
  console.log('hello world')
}
sayHello()



// Object 构造函数的方法
// 1. assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
// 语法：Object.assign(target, ...sources)
const target = {a: 1,b: 2};
const source = {b: 4,c: 5};
const returneDTarget = Object.assign(target,source);
console.log(returneDTarget)  //{a: 1,b: 4,c: 5}
console.log(target);        //{a: 1,b: 4,c: 5}



// 2. create() 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
// 语法：Object.create(proto[, propertiesObject])
const persion = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am i human? ${this.isHuman}`);
  }
};
const me = Object.create(persion);
me.name = "Matthew";
me.isHuman = true;

me.printIntroduction();
// 3. defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
// 语法：Object.defineProperty(obj, prop, descriptor)
