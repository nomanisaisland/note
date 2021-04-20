// 单体模式
let Singleton = function(name) {
  this.name = name;
  this.instance = null;
}
Singleton.prototype.getName = function() {
  return this.name
}

function getInstance(name) {
  this.instance = null;
  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
}
let a = getInstance('aaa');
let b = getInstance('bbb');
console.log(a);
console.log(b);
console.log(b === a); //true
