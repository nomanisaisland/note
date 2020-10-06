// 观察者模式(发布订阅)   观察者  被观察者
class Dep {
  constructor() {
    this.subs = []; // 存放左右的watcher
  }
  addSub() { // 添加watcher
    this.subs.push(watcher);
  }
  // 发布
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 默认先存放一个老值
    this.oldValue = this.get()
  }
  get() {
    Dep.target = this; //先把自己放在this上
    // 取值 把这个观察者和数据关联起来
    let value = CompileUtil.getVal(this.vm, this.expr);
    Dep.target = null;  // 不取消 任何值取值都会添加watcher
    return value;
  }
  update() { // 更新操作  数据变化后会调用观察者的update方法
    let newVal = CompileUtil.getVal(this.vm, this.expr);
    if (newVal !== this.oldValue) {
      this.cb(newVal)
    }
  }
}

class Observer { //实现数据劫持
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if (data && typeof data === 'object') {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value) {
    this.observer(value)
    let dep = new Dep(); //给每一个属性都加上一个具有发布订阅的功能
    Object.defineReactive(obj, key, [
      get() {
        // 创建watcher时 回取到对应的内容
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: (newVal) => {
        if (newVal !== value) {
          this.observer(newVal);
          value = newVal;
          dep.notify();
        }
      }
    ]);
  }
}
// 基类 调度
class Compiler {
  constructor() {
    // 判断el属性是否是一个元素，如果不是元素则获取它
    this.el = this.isElementNode(el) ? el : document.querySelector(el);

    // 把当前节点中的元素 获取到并放在内存中
    let fragment = this.node2fragment(this.el);

    // 把节点中的内容进行替换

    // 用数据编译模板
    this.compile(fragment);
    // 把页面塞到页面中

    this.el.appendChild(fragment);
  }
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 核心的编译方法
  compileElement(node) {
    let attributes = node.attributes; //元素属性组成的 类数组
    [...attributes].forEach(attr => {
      let {
        name,
        value: expr
      } = attr;
      if (this.isDirective(name)) {
        let [, directive] = name.split('-');
        let [directiveName, eventName] = directive.split(':');
        CompileUtil[directiveName](node, expr, this.vm, eventName);
      }
    })
  }
  compileText(node) {
    // 判断当前文本点中内容是否包含{{ }}
    let content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompileUtil['text'](node, content, this.vm)
    }
  }

  compile(node) { // 用来编译内存中的dom节点
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child);

        // 如果是元素的话，需要把自己传进去，去遍历子节点
        this.compile(child);
      } else {
        this.compileText(child);
      }
    })
  }
  // 把节点移动到内存中
  node2fragment(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = node.firstChild) {
      // appendChild 具有移动性
      fragment.appendChild(firstChild);
    }
    return fragment
  }

  isElementNode(node) {
    return node.nodeType === 1; //p 是否是元素节点
  }

}

let CompileUtil = {
  //根据表达式取到相应的数据
  getVal(vm, expr) { // vm.$data  school.name
    return expr.split('.').reduce((data, current) => {
      return data[current];
    }, vm.$data)
  },
  setValue(vm, expr, value) { // vm.$data school.name = xxx
    return expr.split('.').reduce((data, current) => {
      if (index === arr.length - 1) {
        return data[current] = value;
      }
      return data[current];
    }, vm.$data)
  }
  // 解析v-model 这个指令
  model(node, expr, vm) { // node是节点， expr是表达式   vm 是当前实例
    // 给输入框赋予value属性
    let fn = this.updater['modelUpdater'];
    new Watcher(vm, expr, (newVal) => { // 给输入框加一个观察者 如果稍后数据更新了会触发次方法，会拿新值  给输入框赋予值
      fn(node, newVal);
    })
    node.addEventListener('input', (e) => {
      let value = e.target.value; // 获取用户输入的内容
      this.setValue(vm, expr, value);
    })
    let value = this.getVal(vm, expr);
    fn(node, value);
  },
  html(node, expr, vm) {
    let fn = this.updater['htmlUpdater'];
    new Watcher(vm, expr, (newVal) => { // 给输入框加一个观察者 如果稍后数据更新了会触发次方法，会拿新值  给输入框赋予值
      fn(node, newVal);
    })
    let value = this.getVal(vm, expr);
    fn(node, value);
  },
  getContentValue(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1]);
    })
  },
  on(node, expr, vm, eventName) { // v-on:click="change"  expr就是change
    node.addEventListener(eventName, (e)=> {
      vm[expr].call(vm, e);
    })
  },
  text(node, expr, vm) { // expr => {{a}} {{b}} {{c}}
    let fn = this.updater['textUpdater'];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      // 给表达式每个 {{}}都加上观察者
      new Watcher(vm, args[1], (newVal) => {
        fn(node, this.getContentValue(vm, expr)); //返回一个全的字符串
      })
      return this.getVal(vm, args[1]);
    });
    fn(node, content)
  },
  updater: {
    // 把数据插入节点
    modelUpdater(node, value) {
      node.value = value
    },
    htmlUpdater(node, value) { //innerHTML不安全，可能会导致xss攻击
      node.innerHTML = value;
    },
    textUpdater(node, value) {
      node.textContent = value;
    }
  }

}

class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    let cumputed = options.computed;
    let methods = options.methods;
    // 这个根元素 存在 编译模板
    if (this.$el) {
      //把数据全部转换成用Object.defineProperty来定义
      new Observer(this.$data);

      for(let key in computed) {  // 有依赖关系 数据
        Object.defineProperty(this.$data, key, {
          get: ()=> {
            return computed[key].call(this);
          }
        })
      }
      for(let key in methods) {
        Object.defineProperty(this,key,{
          get() {
            return methods[key];
          }
        })
      }

      // 把数据获取操作vm 上的取值操作  都代理到 vm.$data;
      this.proxyVm(this.$data);

      new Compiler(this.$el, this);
    }
  }
  proxyVm(data) {
    for (var key in data) {
      Object.defineProperty(this, key, {  //实现可以通过vm取到对应的内容
        get() {
          return data[key]; //进行了转化操作
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    }
  }
}
