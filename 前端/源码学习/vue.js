/**
 * 解析器compile
 */
const compileUntil = {
    getVal (expr, vm) {
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)
    },
    setVal (expr, vm, inputVal) {
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal] = inputVal
        }, vm.$data)
    },
    getContentVal (expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    text (node, expr, vm) {
        let value
        if (expr.indexOf('{{') !== -1) {
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                new Watcher(vm, args[1], () => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm))
                })
                return this.getVal(args[1], vm)
            })
        } else {
            value = this.getVal(expr, vm);
        }

        this.updater.textUpdater(node, value);
    },
    html (node, expr, vm) {
        const value = this.getVal(expr, vm);
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal);
        })
        this.updater.htmlUpdater(node, value);
    },
    model (node, expr, vm) {
        const value = this.getVal(expr, vm);
        // 绑定更新函数  数据=》视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal)
        })

        // 视图=》数据=》视图
        node.addEventListener('input', (e) => {
            // 设置值
            this.setVal(expr, vm, e.target.value)
        })
        this.updater.modelUpdater(node, value)
    },
    on (node, expr, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[expr]  // 从methods里面取方法或者从属性内取
        node.addEventListener(eventName, fn.bind(vm), false);
    },
    bind (node, expr, vm, attrName) {
        const value = this.getVal(expr, vm);
        new Watcher(vm, expr, (newVal) => {
            this.updater.bindUpdater(node, value, newVal)
        })
        this.updater.bindUpdater(node, value, attrName)
    },
    updater: {
        textUpdater (node, value) {
            node.textContent = value
        },
        htmlUpdater (node, value) {
            node.innerHTML = value
        },
        modelUpdater (node, value) {
            node.value = value
        },
        bindUpdater (node, value, attrName) {
            node.setAttribute(attrName, value)
        }
    }
}
class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);  // 判断el是否是一个节点，如果不是的话自己查找一下节点
        this.vm = vm
        // 1. 获取文档碎片对象  放入内存中会减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el);
        this.compile(fragment)
        this.el.appendChild(fragment)
    }
    compile (fragment) {
        // 获取每一个子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                // 如果该节点是元素节点
                // 编译元素节点
                this.compileElement(child)
            } else {
                // 文本节点
                // 编译文本节点
                this.compileText(child)
            }
            if (child.childNodes && child.childNodes.length) {
                this.compile(child)
            }
        })
    }
    compileElement (node) {
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            const { name, value } = attr;
            if (this.isDirective(name)) {  // 是一个指令 
                const [, directive] = name.split('-');  // 拿到指令
                const [dirName, eventName] = directive.split(':');  // 区分指令和事件

                // 数据驱动视图更新
                compileUntil[dirName](node, value, this.vm, eventName)
                // 删除带有指令的标签属性
                node.removeAttribute('v-' + directive)
            } else if (this.isEventName(name)) { // 处理修饰符操作，比如@click
                let [, eventName] = name.split('@');
                compileUntil['on'](node, value, this.vm, eventName)
            } else if (this.isBindName(name)) {
                let [, attrName] = name.split('v-bind:')
                compileUntil['bind'](node, value, this.vm, attrName)
            }
        })
    }
    compileText (node) {
        // 编译文本  {{}}
        const content = node.textContent;
        if (/\{\{(.+?)\}\}/.test(content)) {
            compileUntil['text'](node, content, this.vm);
        }
    }
    isEventName (attrName) {
        return attrName.startsWith('@');
    }
    isDirective (attrName) {
        return attrName.startsWith('v-');
    }
    isBindName (attrName) {
        return attrName.startsWith('v-bind:')
    }
    node2Fragment (el) {
        // 创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)   // 通过appendChild添加的子节点会删除掉原Dom对象的子节点
        }
        return f
    }
    isElementNode (node) {
        return node.nodeType === 1
    }
}
class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if (this.$el) {
            // 1.实现一个数据观察者
            // 2.实现一个指令解析器
            new Observer(this.$data)
            new Compile(this.$el, this)
            this.proxyData(this.$data);  // 实现代理，不用 this.$data这样取,可以直接用this取到
        }
    }
    proxyData (data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get () {
                    return data[key]
                },
                set (newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}