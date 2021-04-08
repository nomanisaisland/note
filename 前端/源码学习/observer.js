class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 先把旧值保存起来
        this.oldVal = this.getOldVal()
    }
    getOldVal () {
        Dep.target = this
        let oldVal = compileUntil.getVal(this.expr, this.vm)
        Dep.target = null
        return oldVal
    }
    update () {
        const newVal = compileUntil.getVal(this.expr, this.vm)
        if (newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}
class Dep {
    constructor() {
        this.subs = []
    }
    // 收集观察者
    addSub (watcher) {
        this.subs.push(watcher)
    }
    notify () {
        this.subs.forEach(w => w.update())
    }
}
class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer (data) {  // 观察数据
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive (data, key, value) {
        // 递归遍历
        this.observer(value)
        const dep = new Dep(); // 创建一个收集器
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get () {
                Dep.target && dep.addSub(Dep.target)  // 如果target有值才执行addSub方法
                return value
            },
            set: (newVal) => {
                this.observer(newVal)
                if (newVal !== value) {
                    value = newVal
                }
                // 告诉Dep通知变化
                dep.notify()
            }
        })
    }
}