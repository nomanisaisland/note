// vue 2.0 响应式原理
// function vue() {
//   this.$data = {
//     a: 1
//   };
//   this.el = document.getElementById('app');
//   this._html = '';
//   this.observe(this.$data);
//   this.render();
// };
//
// vue.prototype.observe = function (obj) {
//   var value;
//   var self = this;
//   for(var key in obj) {
//     value = obj[key];
//     if (typeof value === 'object') {
//       this.observe(value);
//     } else {
//       Object.defineProperty(this.$data, key, {
//         get: function () {
//           return value
//         },
//         set: function (newValue) {
//           value = newValue;
//           self.render();
//         }
//       })
//     }
//   }
// }
// vue.prototype.render = function () {
//   this._html = 'i am' + this.$data.a;
//   this.el.innerHTML = this._html;
// }


// vue 双向绑定处理数组
// var arraypro = Array.prototype;
// var arrayob = Object.create(arraypro);  //深拷贝一次数组
// var arr = ['push', 'pop', 'shift'];
// // arr里的方法，既能保持原有方法，又能触发更新
// // 装饰者模式
// arr.forEach(function(method, index){
//   arrayob[method] = function() {
//     var ret = arraypro[method].apply(this,arguments);
//     self.render();
//     return ret;
//   }
// })
// var arr = [];
// arr.__proto__ = arrayob;
// arr.push(1);

// vue 3.0 响应式原理
// Proxy 代理用法： 需要更改对象属性值时，不可以直接操作原对象，需要操作Proxy对象：obj
// var ob = {
//   a: 1,
//   b: 2
// }
//
// var obj = new Proxy(ob, {
//   get: function(target, key, receive) {
//     return target[key]
//   },
//   set: function(target, key, newvalue, receive) {
//     target[key] = newvalue;
//   }
// });


// 为什么改用proxy
// 1. defineProperty只能监听某个属性，不能对全对象监听
// 2.  可以省去for in 提升效率
// 3. 可以监听数组，不用再单独对数组做特异处理


// proxy实现双向绑定
function vue() {
  this.$data = {
    a: 1
  };
  this.el = document.getElementById('app');
  this._html = '';
  this.observe(this.$data);
  this.render();
};

vue.prototype.observe = function (obj) {
  var self = this;
  this.$data = new Proxy(this.$data, {
    get: function(target, key, receive) {
      return target[key]
    },
    set: function(target, key, newvalue, receive) {
      target[key] = newvalue;
      self.render();
    }
  });
}
vue.prototype.render = function () {
  this._html = 'i am' + this.$data.a;
  this.el.innerHTML = this._html;
}


//类型校验器 比如父传子props类型校验
function createValidator(target, validator) {
  return new Proxy(target,{
    _validator : validator; // 往target里面增加属性，方便后续校验
    set(target, key, value, proxy) {
      if (target.hasOwnProperty(key)) {
        var validator = this._validator[key];
        if (validator(value)) {
          return Reflect.set(target, key, value, proxy);
        } else {
          throw Error('type error');
        }
      }
    }
  });
}
