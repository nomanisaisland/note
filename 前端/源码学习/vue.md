# vue源码学习

```
npm run dev报错：Could not load C:\OpenServer\domains\vue\src\core/index (imported by C:/OpenServer/doma
ins/vue/src/entries/web-runtime.js): ENOENT: no such file or directory, open 'C:\OpenServer\dom
ains\vue\src\core\index']

下载https://github.com/ideayuye/rollup-plugin-alias这个版本的
```

# 源码中的基础知识点回顾

## 数组方法

### slice方法可从已有的数组中返回选定的元素。

参数：

​	start：必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类	推。
​	end：可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如	果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

返回值：

​	返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

### 修改数组长度

Array.length = 0, 修改原数组长度，为零代表数组为空，会影响到其他引用

Array = []  将原数组赋予一个新的空数组，其他引用不会受到影响，其他引用还是指向原数组



### call apply 和bind的用法以及差异

####  call

1. call方法使用一个指定的this值和单独给出的一个或多个参数来调用一个函数

2. 语法：function.call(thisArg,arg1,arg2,...)

3. 参数：

   + thisArg  可选的。在 function 函数运行时使用的 this 值。请注**argsArray**意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。（给绑定的函数上下文指定this，非严格模式下没有的话会默认指定为全局）
   + arg1,arg2 指定的参数列表。

4. 返回值：使用调用者提供的 `this` 值和参数调用该函数的返回值。若该方法没有返回值，则返回 `undefined`。

5. 描述：

   + `call()` 允许为不同的对象分配和调用属于一个对象的函数/方法。

   + `call()` 提供新的 **this** 值给当前调用的函数/方法。你可以使用 `call` 来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

#### apply

 1. apply方法调用一个具有给定`this`值的函数，以及以一个数组（或[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）的形式提供的参数。

 2. 语法：func.apply(thisArg, [argsArray])

 3. 参数：

    + thisArg   必选的。在 *`func`* 函数运行时使用的 `this` 值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。
    + argsArray  可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#Browser_compatibility) 请参阅本文底部内容。

 4. 返回值： 调用有指定this值和参数的函数的结果。

 5. 描述：

    + 在调用一个存在的函数时，你可以为其指定一个 `this` 对象。 `this` 指当前对象，也就是正在调用这个函数的对象。 使用 `apply`， 你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。
    + `apply` 与 [`call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 非常相似，不同之处在于提供参数的方式。`apply` 使用参数数组而不是一组参数列表。`apply` 可以使用数组字面量（array literal），如 `fun.apply(this, ['eat', 'bananas'])`，或数组对象， 如 `fun.apply(this, new Array('eat', 'bananas'))`。
    + 你也可以使用 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)对象作为 `argsArray` 参数。 `arguments` 是一个函数的局部变量。 它可以被用作被调用对象的所有未指定的参数。 这样，你在使用apply函数的时候就不需要知道被调用对象的所有参数。 你可以使用arguments来把所有的参数传递给被调用对象。 被调用对象接下来就负责处理这些参数。
    + 从 ECMAScript 第5版开始，可以使用任何种类的类数组对象，就是说只要有一个 `length` 属性和`(0..length-1)`范围的整数属性。例如现在可以使用 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) 或一个自己定义的类似 `{'length': 2, '0': 'eat', '1': 'bananas'}` 形式的对象。

 6. 


    快速记忆：

    猫吃鱼，狗吃肉，奥特曼打小怪兽。

    有天狗想吃鱼了

    猫.吃鱼.call(狗，鱼)

    狗就吃到鱼了

    猫成精了，想打怪兽

    奥特曼.打小怪兽.call(猫，小怪兽)

    就这样记住了。

    ```javascript
    let dog = {
        eat: function (food) {
            console.log('dog', food)
        }
    }
    let cat = {
        eat: function (food) {
            dog.eat.call(this,food)
            console.log('cat', food)
        }
    }
    ```


# 寻找VUE实例

## 入口

通过package.json里面的dev可以找到，配置入口文件在scripts/config.js

在config.js  找到这段代码

```javascript
 'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  }
```

通过alias.js 我们知道web是 src/platforms/web的别名

```javascript
web: resolve('src/platforms/web'),
```

所以vue入口是在 ``` src/platforms/web/entry-runtime-with-compiler.js ``` 中，先不管里面七七八八的东西。找到 ```import Vue from './runtime/index'```



继续往下找``` import Vue from 'core/index'``` ， core又是一个别名（alias.js中可以看到）。找到``` src/core/index```  ```import Vue from './instance/index'```

找到这里发现文件里再没有引用vue的文件了，而且Vue实例方法也在这里面

```
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```

不难看出，这个文件里面创建了一个Vue构造函数，并且在里面做了一些操作。到目前为止，vue构造函数中已经挂满了东西，我们就从这里开始向上层一层一层扒



## lifecycleMixin(Vue)做了什么？？？

进入lifecycle文件，在文件里面找到lifecycleMixin函数

我们可以看到，这个函数在vue原型上挂了三个方法：_update（更新）、$forceUpdate（强制更新）和销毁（$destroy）

然后开始深入函数，有些地方现在看的莫名奇妙。先记录一下这些点，后面慢慢扒

```
vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
vm.$el = vm.__patch__(prevVnode, vnode)
```

然后我们返回Vue构造函数，往Vue的上层去找，找到```entry-runtime-with-compiler``` 在这里我们有找到```hydrating```











# VUE中用到的工具

1. rollup  ---- javaScript 模块打包器

# VUE中使用的函数方法

## 数组方法

1. reduce

   ```javascript
   let arr = [1, 23, 3, 44, 21, 3]
   //accumulator  累加器，返回的值在里面保存
   // currentValue 当前值，操作函数的值
   // currentIndex 当前操作函数的数组下标
   // array 操作函数的数组
   //initValue  指定累加器的初始值，如果没有则使用数组的第一个参数
   const aaa = arr.reduce((accumulator, currentValue, currentIndex, array) => {
       return accumulator + currentValue
   },initValue)
   console.log(aaa)  // 95
   ```



2.



1. window.performance
   参数含义：

   > redirectCount:
   >
   > ​    重定向的数量（只读），但是这个接口有同源策略限制，即仅能检测同源的重定向；
   > type:
   >
   > ​    返回值应该是0,1,2 中的一个。分别对应三个枚举值:
   > ​         0 : TYPE_NAVIGATE (用户通过常规导航方式访问页面，比如点一个链接，或者一般的get方式)
   > ​         1 : TYPE_RELOAD (用户通过刷新，包括JS调用刷新接口等方式访问页面)
   > ​         2 : TYPE_BACK_FORWARD (用户通过后退按钮访问本页面)
   >
   > timing:
   >
   > ​	包含了网络、解析等一系列的时间数据。
   >
   > - `startTime`：有些浏览器实现为[`navigationStart`](https://msdn.microsoft.com/en-us/library/ff974724(v=vs.85).aspx)，代表浏览器开始unload前一个页面文档的开始时间节点。比如我们当前正在浏览baidu.com，在地址栏输入google.com并回车，浏览器的执行动作依次为：unload当前文档（即baidu.com）->请求下一文档（即google.com）。navigationStart的值便是触发unload当前文档的时间节点。
   >
   >   > 如果当前文档为空，则navigationStart的值等于fetchStart。
   >
   > - `redirectStart`和`redirectEnd`：如果页面是由redirect而来，则redirectStart和redirectEnd分别代表redirect开始和结束的时间节点；
   >
   > - `unloadEventStart`和`unloadEventEnd`：如果前一个文档和请求的文档是同一个域的，则`unloadEventStart`和`unloadEventEnd`分别代表浏览器unload前一个文档的开始和结束时间节点。否则两者都等于0；
   >
   > - `fetchStart`是指在浏览器发起任何请求之前的时间值。在fetchStart和`domainLookupStart`之间，浏览器会检查当前文档的缓存；
   >
   > - `domainLookupStart`和`domainLookupEnd`分别代表DNS查询的开始和结束时间节点。如果浏览器没有进行DNS查询（比如使用了cache），则两者的值都等于`fetchStart`；
   >
   > - `connectStart`和`connectEnd`分别代表TCP建立连接和连接成功的时间节点。如果浏览器没有进行TCP连接（比如使用持久化连接webscoket），则两者都等于`domainLookupEnd`；
   >
   > - `secureConnectionStart`：可选。如果页面使用HTTPS，它的值是安全连接握手之前的时刻。如果该属性不可用，则返回undefined。如果该属性可用，但没有使用HTTPS，则返回0；
   >
   > - `requestStart`代表浏览器发起请求的时间节点，请求的方式可以是请求服务器、缓存、本地资源等；
   >
   > - `responseStart`和`responseEnd`分别代表浏览器收到从服务器端（或缓存、本地资源）响应回的第一个字节和最后一个字节数据的时刻；
   >
   > - `domLoading`代表浏览器开始解析html文档的时间节点。我们知道IE浏览器下的document有`readyState`属性，`domLoading`的值就等于`readyState`改变为`loading`的时间节点；
   >
   > - `domInteractive`代表浏览器解析html文档的状态为`interactive`时的时间节点。`domInteractive`并非DOMReady，它早于DOMReady触发，代表html文档解析完毕（即dom tree创建完成）但是内嵌资源（比如外链css、js等）还未加载的时间点；
   >
   > - `domContentLoadedEventStart`：代表`DOMContentLoaded`事件触发的时间节点：
   >
   >   > 页面文档完全加载并解析完毕之后,会触发DOMContentLoaded事件，HTML文档不会等待样式文件,图片文件,子框架页面的加载(load事件可以用来检测HTML页面是否完全加载完毕(fully-loaded))。
   >
   > - `domContentLoadedEventEnd`：代表`DOMContentLoaded`事件完成的时间节点，此刻用户可以对页面进行操作，也就是jQuery中的domready时间；
   >
   > - `domComplete`：html文档完全解析完毕的时间节点；
   >
   > - `loadEventStart`和`loadEventEnd`分别代表onload事件触发和结束的时间节点

2. performance.mark(name);  创建了一个在浏览器入口缓冲中给定名字的时间戳    从navigetionStart事件发生时刻到记录时刻间隔的毫秒数
3. Object.create() 创建一个新对象，并且复制旧对象的所有属性

3

## replace 进价

```javascript
'123=0kfads-bvab-Adfg'.replace(/-(\w)/g,(_,a,b,c)=> {
    // 第一个参数表示匹配到的第一个符合要求的数据，第二个表示匹配到的数据的偏移量为1的数据，第三个表示当前匹配的是第几个，第四个表示原数据
    console.log(_,a,b,c)
})
```





# 带着问题看源码

1. 虚拟DOM那么大，Vue如何高效的处理好所有节点数据渲染到页面上