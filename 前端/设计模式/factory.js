let factory = {};
// 1. 工厂应该有厂长来决定运行哪条生产线
//  消费者-》子类
factory.produceClothes = function(argument) {
  this.worker = 50;
}
factory.produceShoes = function() {
  alert('生产鞋子')
}
factory.transport = function() {
  alert('运输')
}
factory.factoryManager = function(para) {
  return new factory[para]();
}
let me = factory.factoryManager('produceClothes');
console.log(typeof me)
// -----------------------------------------------------
function Factory(name, age, sex) {
  let person = {};
  person.name = name;
  person.age = age;
  person.sex = sex;
  return person;
}
let factory = new Factory('卢加锋', 24, '男');
console.log(factory);
console.log(factory.name);
console.log(factory.age);
console.log(typeof factory);
console.log(factory instanceof Object);
// ------------------------复杂工厂模式------------------
let BicycleShop = function(name) {
  this.name = name;
  this.method = function() {
    return this.name;
  }
}
BicycleShop.prototype = {
  constructor: BicycleShop,
  /*
   * 买自行车这个方法
   * @param {model} 自行车型号
   */
  sellBicycle: function(model) {
    var bicycle = this.createBicycle(model);
    // 执行A业务逻辑
    bicycle.A();

    // 执行B业务逻辑
    bicycle.B();

    return bicycle;
  },
  createBicycle: function(model) {
    throw new Error("父类是抽象类不能直接调用，需要子类重写该方法");
  }
};
// 实现原型继承
function extend(Sub, Sup) {
  //Sub表示子类，Sup表示超类
  // 首先定义一个空函数
  var F = function() {};

  // 设置空函数的原型为超类的原型
  F.prototype = Sup.prototype;

  // 实例化空函数，并把超类原型引用传递给子类
  Sub.prototype = new F();

  // 重置子类原型的构造器为子类自身
  Sub.prototype.constructor = Sub;

  // 在子类中保存超类的原型,避免子类与超类耦合
  Sub.sup = Sup.prototype;

  if (Sup.prototype.constructor === Object.prototype.constructor) {
    // 检测超类原型的构造器是否为原型自身
    Sup.prototype.constructor = Sup;
  }
}
var BicycleChild = function(name) {
  this.name = name;
  // 继承构造函数父类中的属性和方法
  BicycleShop.call(this, name);
};
// 子类继承父类原型方法
extend(BicycleChild, BicycleShop);
// BicycleChild 子类重写父类的方法
BicycleChild.prototype.createBicycle = function() {
  var A = function() {
    console.log("执行A业务操作");
  };
  var B = function() {
    console.log("执行B业务操作");
  };
  return {
    A: A,
    B: B
  }
}
var childClass = new BicycleChild("龙恩");
console.log(childClass);


class User {
  //构造器
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  //静态方法
  static getInstance(role) {
    switch (role) {
      case 'superAdmin':
        return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
        break;
      case 'admin':
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
        break;
      case 'user':
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

//调用
let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');
