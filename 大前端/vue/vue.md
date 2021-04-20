#  1. Vue.js的基本认识?

```html
<style sc 	></style>
```



	1). 一位华裔前Google工程师(尤雨溪)开发的前端js库
	2). 作用: 动态构建用户界面
	3). 特点:
		* 遵循MVVM模式
		* 编码简洁, 体积小, 运行效率高, 移动/PC端开发
		* 它本身只关注UI, 可以轻松引入vue插件和其它第三库开发项目
	4). 与其它框架的关联:
		* 借鉴angular的模板和数据绑定技术
		* 借鉴react的组件化和虚拟DOM技术
	5). vue包含一系列的扩展插件(库):
		* vue-cli: vue脚手架（自动下载配置项目，帮我们做好了配置和依赖）
		* vue-resource(axios): ajax请求
		* vue-router: 路由
		* vuex: 状态管理
		* vue-lazyload: 图片懒加载
		* vue-scroller: 页面滑动相关
		* mint-ui: 基于vue的组件库(移动端)
		* element-ui: 基于vue的组件库(PC端)
	6). 渐进式的概念：使用基本核心库，根据需求再添加相应的插件，不需要就可以不添加
	7). 补充：
		+ Vue是vue.js库提供的构建函数
		+ MVVM ：
			- model（模型）：数据对象（data）
			- view(视图): 模板页面（动态页面） 
			- view model（视图模型）：Vue的实例
		+ 声明式开发和命令式开发
			- 声明式开发：按照语法做声明式的定义，直接操作，不需要管理流程
			- 命令式开发：需要告诉程序要做什么，怎么做

![1569759648499](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1569759648499.png)

# 2. 基本使用

	1). 引入vue.js
		+ <script src="vue.js"></script>
	2). 创建Vue实例对象(vm), 指定选项(配置)对象: let app = new Vue({})  //配置对象
		el : 指定dom标签容器的选择器
		data : 指定初始化状态数据的对象/函数(返回一个对象)   mvvm 中的m   v是#app标签内的内容  vm则是创建出来的整个Vue实例app 或者是vm let vm = new Vue({})
	3). 在页面模板中使用{{}}或vue指令

# 3. Vue对象的选项

## 1). el

	指定dom标签容器的选择器
	Vue就会管理对应的标签及其子标签

## 2). data

	对象或函数类型
	指定初始化状态属性数据的对象
	vm也会自动拥有data中所有属性
	页面中可以直接访问使用
	数据代理: 由vm对象来代理对data中所有属性的操作(读/写)

## 3). methods



	包含多个方法的对象
	供页面中的事件指令来绑定回调
	回调函数默认有event参数, 但也可以指定自己的参数
	所有的方法由vue对象来调用, 访问data中的属性直接使用this.xxx

## 4). computed

什么时候执行：初始化显示执行-----相关的data属性数据发生改变

```vue
computed: {
	[属性名]: function () { //计算属性中的一个方法，方法返回值作为属性值
    	return [计算属性值];
    },
	[属性名]: function () { //计算属性中的一个方法，方法返回值作为属性值
		// 回调函数（1.你定义的2.你没有调3.执行了。什么时候调，用来做什么）当你读取当前属性值时回调  根据相关的数据计算并返回当前属性的值
    	get() {
			return [计算属性值];
		},
// 回调函数 当属性值发生改变时回调，更新相关数据
		set(value) {   //value就是定义的属性名的最新值
			return [计算属性值];
		}
    },	
},
```



	在computed中，可以定义一些属性，这些属性，叫做【计算属性】，计算属性的本质是一个方法
	计算属性引用的时候一定不要夹（）去调用
	只要计算属性，这个function内部，所用到的。任何data的数据发生了变化，就会立即重新计算
	计算属性的求值结果，会被缓存起来，方便下次直接使用，如果


​	
​	包含多个方法的对象
​	对状态属性进行计算返回一个新的数据, 供页面获取显示
​	一般情况下是相当于是一个只读的属性
​	利用set/get方法来实现属性数据的计算读取, 同时监视属性数据的变化
​	如何给对象定义get/set属性
​		在创建对象时指定: get name () {return xxx} / set name (value) {}
​	  	对象创建之后指定: Object.defineProperty(obj, age, {get(){}, set(value){}})

## 5). watch

监视属性

watch 监听的属性一定是this里头有的

computer 是定义一个计算属性，所以一定

```vue
watch: {  // 配置监视
	[属性名]: function(value) {
		console.log(this)  //就是vm对象
	}
}
```



	包含多个属性监视的对象
	分为一般监视和深度监视
	    xxx: function(value){}
		xxx : {
			deep : true,
			handler : fun(value)
		}
	另一种添加监视方式: vm.$watch('xxx', function(value){})

# 4. 过渡动画

	利用vue去操控css的transition/animation动画
	模板: 使用<transition name='xxx'>包含带动画的标签
	css样式
		.fade-enter-active: 进入过程, 指定进入的transition
		.fade-leave-active: 离开过程, 指定离开的transition
		.xxx-enter, .xxx-leave-to: 指定隐藏的样式
	编码例子
	    .xxx-enter-active, .xxx-leave-active {
	      transition: opacity .5s
	    }
	    .xxx-enter, .xxx-leave-to {
	      opacity: 0
	    }
	    
	    <transition name="xxx">
	      <p v-if="show">hello</p>
	    </transition>

# 5. 生命周期

	vm/组件对象
	生命周期图
	主要的生命周期函数(钩子)
		created() / mounted(): 启动异步任务(启动定时器,发送ajax请求, 绑定监听)
		beforeDestroy(): 做一些收尾的工作（比如清除定时器防止内存泄漏）


​		
​	三个大阶段：
​	+ 初始化显示  只执行一次
​		- beforeCreate()
​		- created()
​		- beforeMount()
​		- mounted()
​	+ 更新状态  执行n次，有数据更新就执行
​		- beforeUpdate()
​		- updated()
​	+ 销毁vue实例：vm.$destory()   
​		- beforeDestory()
​		- destoryed()


# 6. 自定义过滤器

## 1). 理解

	对需要显示的数据进行格式化后再显示

## 2). 编码

	1). 定义过滤器
		Vue.filter(filterName, function(value[,arg1,arg2,...]){
		  // 进行一定的数据处理
		  return newValue
		})
	2). 使用过滤器
		<div>{{myData | filterName}}</div>
		<div>{{myData | filterName(arg)}}</div>

# 7. vue内置指令

指令实现原理：

	v-text/v-html: 指定标签体
		* v-text : 当作纯文本
		* v-html : 将value作为html标签来解析
	v-if v-else v-show: 显示/隐藏元素
		* v-if : 如果vlaue为true, 当前标签会输出在页面中
		* v-else : 与v-if一起使用, 如果value为false, 将当前标签输出到页面中
		* v-show: 就会在标签中添加display样式, 如果vlaue为true, display=block, 否则是none
	v-for : 遍历
		* 遍历数组 : v-for="(person, index) in persons"   
		* 遍历对象 : v-for="value in person"   $key
	v-on : 绑定事件监听
		* v-on:事件名, 可以缩写为: @事件名
		* 监视具体的按键: @keyup.keyCode   @keyup.enter
		* 停止事件的冒泡和阻止事件默认行为: @click.stop   @click.prevent
		* 隐含对象: $event
	v-bind : 强制绑定解析表达式  
		* html标签属性是不支持表达式的, 就可以使用v-bind
		* 可以缩写为:  :id='name'
		* :class
		  * :class="a"
			* :class="{classA : isA, classB : isB}"
			* :class="[classA, classB]"
		* :style
			:style="{color : color}"
	v-model
		* 双向数据绑定
		* 自动收集用户输入数据
		* 表单value值和v-model绑定的数据（对象或者数组格式）内的某个值相同时选中
	ref : 标识某个标签，为某个元素注册一个唯一标识
		* ref='xxx'
		* 读取得到标签对象: this.$refs.xxx
		
	v-cloak: 实现是利用指令属性解析之前会存在标签内，解析后会被删除，搭配css的属性选择器，
	[v-cloak]: {
		display: none;
	}
	可以解决闪烁问题

# 8. 自定义指令

## 1). 注册全局指令

    Vue.directive('my-directive', function(el, binding){
      el.innerHTML = binding.value.toUpperCase()
    })

## 2). 注册局部指令

    directives : {
      'my-directive' : function(el, binding) {
          el.innerHTML = binding.value.toUpperCase()
      }
    }


## 3). 使用指令

    <div v-my-directive='xxx'>




**# Vue.js - Day1**



**## 课程介绍**

前5天： 都在学习Vue基本的语法和概念；打包工具 Webpack , Gulp

后5天： 以项目驱动教学；



+ 企业为了提高开发效率：在企业中，时间就是效率，效率就是金钱；
+ \- 企业中，使用框架，能够提高开发的效率；

+ 提高开发效率的发展历程：原生JS -> Jquery之类的类库 -> 前端模板引擎 -> Angular.js / Vue.js（能够帮助我们减少不必要的DOM操作；提高渲染效率；双向数据绑定的概念【通过框架提供的指令，我们前端程序员只需要关心数据的业务逻辑，不再关心DOM是如何渲染的了】）

+ 在Vue中，一个核心的概念，就是让用户不再操作DOM元素，解放了用户的双手，让程序员可以更多的时间去关注业务逻辑；





+ 增强自己就业时候的竞争力

- 人无我有，人有我优

- 你平时不忙的时候，都在干嘛？

## 框架和库的区别

+ 框架：是一套完整的解决方案；对项目的侵入性较大，项目如果需要更换框架，则需要重新架构整个项目。
  + node 中的 express；

+ 库（插件）：提供某一个小功能，对项目的侵入性较小，如果某个库无法完成某些需求，可以很容易切换到其它库实现需求。

- 1. 从Jquery 切换到 Zepto	

- 2. 从 EJS 切换到 art-template

**## Node（后端）中的 MVC 与 前端中的 MVVM 之间的区别**



MVC 是后端的分层开发概念；

+ MVVM是前端视图层的概念，主要关注于 视图层分离，也就是说：MVVM把前端的视图层，分为了 三部分 Model, View , VM ViewModel

+ 为什么有了MVC还要有MVVM

## Vue.js 基本代码 和 MVVM 之间的对应关系





## Vue指令之`v-text`和`v-html`

## Vue指令之`v-on`和`跑马灯效果`

### 跑马灯效果



1. HTML结构：



```html
<div id="app"	
	<p>{{info}}</p>
    <input type="button" value="开启" v-on:click="go">
    <input type="button" value="停止" v-on:click="stop">
 </div>

```

2. Vue实例：

```vue
// 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        info: '猥琐发育，别浪~！',
        intervalId: null
      },
      methods: {
        go() {
          // 如果当前有定时器在运行，则直接return
          if (this.intervalId != null) {
            return;
          }
          // 开始定时器
          this.intervalId = setInterval(() => {
            this.info = this.info.substring(1) + this.info.substring(0, 1);
          }, 500);
        },
        stop() {
          clearInterval(this.intervalId);
        }
      }
    });

```

## Vue指令之`v-on的缩写`和`事件修饰符`

### 事件修饰符：

+ .stop       阻止冒泡

+ .prevent    阻止默认事件

+ .capture    添加事件侦听器时使用事件捕获模式

+ .self       只当事件在该元素本身（比如不是子元素）触发时触发回调

+ .once       事件只触发一次

## Vue指令之`v-model`和`双向数据绑定`

## 简易计算器案例

1. HTML 代码结构

```html
<div id="app">   
	<input type="text" v-model="n1">
    <select v-model="opt">
      <option value="0">+</option>
      <option value="1">-</option>
      <option value="2">*</option>
      <opton value="3">÷</option>
    </select>
    <input type="text" v-model="n2">
    <input type="button" value="=" v-on:click="getResult">
    <input type="text" v-model="result">
</div>

```

2. Vue实例代码：

```vue
  // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        n1: 0,
        n2: 0,
        result: 0,
        opt: '0'
      },
      methods: {
        getResult() {
          switch (this.opt) {
            case '0':
              this.result = parseInt(this.n1) + parseInt(this.n2);
              break;
            case '1':
              this.result = parseInt(this.n1) - parseInt(this.n2);
              break;
            case '2':
              this.result = parseInt(this.n1) * parseInt(this.n2);
              break;
            case '3':
              this.result = parseInt(this.n1) / parseInt(this.n2);
              break;
          }
        }
      }
    });

```

## 在Vue中使用样式

### 使用class样式

1. 数组

```html
<h1 :class="['red', 'thin']">这是一个邪恶的H1</h1>

```

2. 数组中使用三元表达式

```html
<h1 :class="['red', 'thin', isactive?'active':'']">这是一个邪恶的H1</h1>

```

3. 数组中嵌套对象

```html
<h1 :class="['red', 'thin', {'active': isactive}]">这是一个邪恶的H1</h1>

```

4. 直接使用对象

```html
<h1 :class="{red:true, italic:true, active:true, thin:true}">这是一个邪恶的H1</h1>

```

### 使用内联样式

1. 接在元素上通过 `:style` 的形式，书写样式对象

```html
<h1 :style="{color: 'red', 'font-size': '40px'}">这是一个善良的H1</h1>

```

2. 将样式对象，定义到 `data` 中，并直接引用到 `:style` 中

+ 在data上定义样式：

```vue
data: {
       h1StyleObj: { color: 'red', 'font-size': '40px', 'font-weight': '200' }
}

```

+ 在元素中，通过属性绑定的形式，将样式对象应用到元素中：

```html
<h1 :style="h1StyleObj">这是一个善良的H1</h1>

```

3. 在 `:style` 中通过数组，引用多个 `data` 上的样式对象

+ 在data上定义样式：

```vue
data: {
    h1StyleObj: { color: 'red', 'font-size': '40px', 'font-weight': '200' },
    h1StyleObj2: { fontStyle: 'italic' }
}

```

```html
+ 在元素中，通过属性绑定的形式，将样式对象应用到元素中：
  <h1 :style="[h1StyleObj, h1StyleObj2]">这是一个善良的H1</h1>

```

## Vue指令之`v-for`和`key`属性

1. 迭代数组

```html
<ul>  
	<li v-for="(item, i) in list">索引：{{i}} --- 姓名：{{item.name}} --- 年龄：{{item.age}}</li>
</ul>

```

2. 迭代对象中的属性

```html
  <!-- 循环遍历对象身上的属性 -->
<div v-for="(val, key, i) in userInfo">{{val}} --- {{key}} --- {{i}}</div>

```

3. 迭代数字

```html
<p v-for="i in 10">这是第 {{i}} 个P标签</p>

```

> 2.2.0+ 的版本里，***\*当在组件中使用\**** v-for 时，key 现在是必须的。

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用 “***\*就地复用\****” 策略。如果数据项的顺序被改变，Vue将***\*不是移动 DOM 元素来匹配数据项的顺序\****， 而是***\*简单复用此处每个元素\****，并且确保它在特定索引下显示已被渲染过的每个元素。

为了给 Vue 一个提示，***\*以便它能跟踪每个节点的身份，从而重用和重新排序现有元素\****，你需要为每项提供一个唯一 key 属性。

## Vue指令之`v-if`和`v-show`

> 一般来说，v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换 v-show 较好，如果在运行时条件不大可能改变 v-if 较好。

## 品牌管理案例

### 添加新品牌

### 删除品牌

### 根据条件筛选品牌

1. 1.x 版本中的filterBy指令，在2.x中已经被废除：

[filterBy - 指令](https://v1-cn.vuejs.org/api/#filterBy)

```html
<tr v-for="item in list | filterBy searchName in 'name'">
  <td>{{item.id}}</td>
  <td>{{item.name}}</td>
  <td>{{item.ctime}}</td>
  <td>
    <a href="#" @click.prevent="del(item.id)">删除</a>
  </td>
</tr>

```

2. 在2.x版本中[手动实现筛选的方式](https://cn.vuejs.org/v2/guide/list.html#显示过滤-排序结果)：

+ 筛选框绑定到 VM 实例中的 `searchName` 属性：

```html
<hr> 输入筛选名称：
<input type="text" v-model="searchName">

```

+ 在使用 `v-for` 指令循环每一行数据的时候，不再直接 `item in list`，而是 `in` 一个 过滤的methods 方法，同时，把过滤条件`searchName`传递进去：

```html
<tbody>
      <tr v-for="item in search(searchName)">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.ctime}}</td>
        <td>
          <a href="#" @click.prevent="del(item.id)">删除</a>
        </td>
      </tr>
    </tbody>

```

+ `search` 过滤方法中，使用 数组的 `filter` 方法进行过滤：

\```



search(name) {



  return this.list.filter(x => {



​    return x.name.indexOf(name) != -1;



  });



}



\```







## Vue调试工具`vue-devtools`的安装步骤和使用

[Vue.js devtools - 翻墙安装方式 - 推荐](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN)

## 过滤器

概念：Vue.js 允许你自定义过滤器，***\*可被用作一些常见的文本格式化\****。过滤器可以用在两个地方：***\*mustache 插值和 v-bind 表达式\****。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示；

### 私有过滤器

1. HTML元素：

```html
<td>{{item.ctime | dataFormat('yyyy-mm-dd')}}</td>

```

2. 私有 `filters` 定义方式：

```vue
filters: { // 私有局部过滤器，只能在 当前 VM 对象所控制的 View 区域进行使用
    dataFormat(input, pattern = "") { // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
      var dt = new Date(input);
      // 获取年月日
      var y = dt.getFullYear();
      var m = (dt.getMonth() + 1).toString().padStart(2, '0');
      var d = dt.getDate().toString().padStart(2, '0');
      // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
      // 否则，就返回  年-月-日 时：分：秒
      if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return `${y}-${m}-${d}`;
      } else {
        // 获取时分秒
        var hh = dt.getHours().toString().padStart(2, '0');
        var mm = dt.getMinutes().toString().padStart(2, '0');
        var ss = dt.getSeconds().toString().padStart(2, '0');
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
      }
    }
  }

```

> 使用ES6中的字符串新方法 String.prototype.padStart(maxLength, fillString='') 或 String.prototype.padEnd(maxLength, fillString='')来填充字符串；

### 全局过滤器

```vue
// 定义一个全局过滤器
Vue.filter('dataFormat', function (input, pattern = '') {
  var dt = new Date(input);
  // 获取年月日
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1).toString().padStart(2, '0');
  var d = dt.getDate().toString().padStart(2, '0');
  // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
  // 否则，就返回  年-月-日 时：分：秒
  if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`;
  } else {
    // 获取时分秒
    var hh = dt.getHours().toString().padStart(2, '0');
    var mm = dt.getMinutes().toString().padStart(2, '0');
    var ss = dt.getSeconds().toString().padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
});

```

> 注意：当有局部和全局两个名称相同的过滤器时候，会以就近原则进行调用，即：局部过滤器优先于全局过滤器被调用！

## 键盘修饰符以及自定义键盘修饰符

### 1.x中自定义键盘修饰符【了解即可】

```vue
Vue.directive('on').keyCodes.f2 = 113;

```

### [2.x中自定义键盘修饰符](https://cn.vuejs.org/v2/guide/events.html#键值修饰符)

1. 通过`Vue.config.keyCodes.名称 = 按键值`来自定义案件修饰符的别名：

```vue
Vue.config.keyCodes.f2 = 113;

```

2. 使用自定义的按键修饰符：

```html
<input type="text" v-model="name" @keyup.f2="add">

```

## [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

1. 自定义全局和局部的 自定义指令：

```
    // 自定义全局指令 v-focus，为绑定的元素自动获取焦点：
    Vue.directive('focus', {
      inserted: function (el) { // inserted 表示被绑定元素插入父节点时调用
        e.focus();
      }
    });
    // 自定义局部指令 v-color 和 v-font-weight，为绑定的元素设置指定的字体颜色 和 字体粗细：
      directives: {
        color: { // 为元素设置指定的字体颜色
          bind(el, binding) {
           el.style.color = binding.value;
          }
        },
        'font-weight': function (el, binding2) { // 自定义指令的简写形式，等同于定义了 bind 和 update 两个钩子函数
          el.style.fontWeight = binding2.value;
        }
      }

```

2. 自定义指令的使用方式：

```html
<input type="text" v-model="searchName" v-focus v-color="'red'" v-font-weight="900">

```

## Vue 1.x 中 自定义元素指令【已废弃,了解即可】

```
Vue.elementDirective('red-color', {

  bind: function () {

    this.el.style.color = 'red';

  }

});

```

使用方式：

```
<red-color>1232</red-color>

```



**## 相关文章**

1. [vue.js 1.x 文档](https://v1-cn.vuejs.org/)

2. [vue.js 2.x 文档](https://cn.vuejs.org/)

3. [String.prototype.padStart(maxLength, fillString)](http://www.css88.com/archives/7715)

4. [js 里面的键盘事件对应的键码](http://www.cnblogs.com/wuhua1/p/6686237.html)

5. [Vue.js双向绑定的实现原理](http://www.cnblogs.com/kidney/p/6052935.html)









## 1. vue脚手架

​    用来创建vue项目的工具包

​    创建项目:

​        npm install -g vue-cli

​        vue init webpack VueDemo

​    开发环境运行:

​        cd VueDemo

​        npm install

​        npm run dev

​    生产环境打包发布

​        npm run build

​        npm install -g serve

​        serve dist

​        http://localhost:5000



## 2. eslint

​    用来做项目编码规范检查的工具

​    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息

​    有相应的配置, 可定制检查



## 3. 组件化编程

​    vue文件包含3个部分

```html
<template>          
	<div></div>
</template>
<script>
    export default {
        props: []/{}   //接受父组件传的数据
        data(){},
        computed: {}
        methods: {},
        watch: {},
        filters: {},
        directives: {},
        components: {}
    }
</script>
<style>
    
</style>

//父组件传值方式  不仅仅可以传数据，还可以传方法函数
<child-component :[数据名]='数据属性名'/>
    
data: {
	[数据名]: [数据值];
}

```

​    组件化编码的基本流程

​      1). 拆分界面, 抽取组件

​      2). 编写静态组件

​      3). 编写动态组件

​          初始化数据, 动态显示初始化界面

​          实现与用户交互功能

​    组件通信的5种方式

​      props

​      vue的自定义事件

​      pubsub第三方库

​      slot

​      vuex(后面单独讲)

​    props:

​        父子组件间通信的基本方式

​        属性值的2大类型: 

​            一般: 父组件-->子组件

```vue
// 父组件内容  :footer="footerWidth"  绑定传值
<left-nav-footer :footer="footerWidth"></left-nav-footer>
<script>
    export default {
        data() {
            return {
                footerWidth: '0'
            }
        },
    }
</script>

//子组件的内容  props接值
<script>
  props: {
    footer: {
      type: String,
      default: 'false'
    }
  },
</script>


```



​            函数: 子组件-->父组件

​    隔层组件间传递: 必须逐层传递(麻烦)

​    兄弟组件间: 必须借助父组件(麻烦)

  vue自定义事件

​      子组件与父组件的通信方式

​      用来取代function props

​      不适合隔层组件和兄弟组件间的通信

  pubsub第三方库(消息订阅与发布)

​      适合于任何关系的组件间通信

  slot

​      通信是带数据的标签

​      注意: 标签是在父组件中解析

  vuex

​      多组件共享状态(数据的管理)

​      组件间的关系也没有限制

​      功能比pubsub强大, 更适用于vue项目

## 4. ajax

​    相关库:

​        vue-resource: vue插件, 多用于vue1.x

​        axios: 第三方库, 多用于vue2.x

​    vue-resource使用

​        // 引入模块

```vue
import VueResource from 'vue-resource'

```

​        // 使用插件

```vue
Vue.use(VueResource)

```

​        // 通过vue/组件对象发送ajax请求

```javascript
this.$http.get('/someUrl').then((response) => {
     // success callback
     console.log(response.data) //返回结果数据
     }, (response) => {
     // error callback
     console.log(response.statusText) //错误信息
})

```

​    axios使用

​        // 引入模块

```javascript
import axios from 'axios'

```

​        // 发送ajax请求

```javascript
 axios.get(url)
   .then(response => {
      console.log(response.data) // 得到返回结果数据
   })
   .catch(error => {
     console.log(error.message)
    })

```

## 5. vue-router

vue用来实现SPA的插件

使用vue-router

1. 创建路由器: router/index.js

```javascript
new VueRouter({
   routes: [
       { // 一般路由
         path: '/about',
         component: about
       },
       { // 自动跳转路由
         path: '/', 
         redirect: '/about'
       }
    ]
})

```

2. 注册路由器: main.js

```javascript
import router from './router'
new Vue({
   router
})

```

3. 使用路由组件标签:

```javascript
<router-link to="/xxx">Go to XXX</router-link>
<router-view></router-view>

```

​    编写路由的3步

​        1. 定义路由组件    

​        2. 映射路由

​        3. 编写路由2个标签

​    嵌套路由

```javascript
children: [
	{
		path: '/home/news',
		component: news
	},
	{
		path: 'message',
		component: message
	}
]

```

​    向路由组件传递数据

```javascript
params: <router-link to="/home/news/abc/123">
props: <router-view msg='abc'>

```

​    缓存路由组件

```html
<keep-alive>
	<router-view></router-view>
</keep-alive>

```

​    路由的编程式导航

​      this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)

​      this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)

​      this.$router.back(): 请求(返回)上一个记录路由





## webpack 结合vue使用

1. 安装：

```shell
npm install vue
导入vue
import Vue from vue

```

2. 在index页面中，创建一个id为 app div 容器
3. 通过 呢哇 vue 得到一个vm实例
4. 通过npm run dev 就报错
   1. 主要原因：在webpack，使用import vue from 'vue'导入的构造函数，功能不完整，只提了 runtime-only的方式，并没有提供像网页那样的编码	
   2. 解决导包不全方式，
      1. 直接导入vue.js文件： impot Vue from './node_moudel/.../vue.js'
      2. 







## 拓展

mixin 混入，对象合并 以后者为主覆盖前者
mixin 组件调用了mixin 以组件自身拥有的为优先
如果没有的变量或者方法就拷贝

用到的方法：





## 查漏补缺

```vue
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/text',
      name: 'text',
      component: text
    }, {
      path: '/text/:id',
      component: param
    }
  ]
})

```

### 路由组件中name的作用：

1.  通过name属性，为一个页面中不同的router-view渲染不同的组件,如：将上面代码的Hello渲染在 name为Hello的router-view中，将text渲染在name为text的router-view中。不设置name的将为默认的渲染组件。

```vue
<template>
  <div id="app">
     <router-view></router-view>
     <router-view  name="Hello"></router-view> //将渲染Hello组件
     <router-view  name="text"></router-view>   //将渲染text组件
  </div>
</template>

```

2.  可以用name传参 使用$router.name获取组件name值 

```vue
 <template>
  <div id="app">
    <p>{{ $route.name }}</p> //可以获取到渲染进来的组件的name值
    <router-view></router-view>
  </div>
</template>

```



3. 用于pramas传参的引入 pramas必须用name来引入 query可以用name或者path来引入（不明白vue-router传参的可以参考我的另一篇文章[vue-router中 query传参和params传参的区别和注意事项](https://blog.csdn.net/alokka/article/details/84307161)）

```vue
  var router = new VueRouter({
      routes: [
        { name:'register', path: '/register/:id/:name', component: register }
      ]
    })
   <router-link :to="{name:'register',params:{id:10,name:'lili'}}">注册</router-link>

```

### 1.query方式传参和接收参数

```vue
传参: 
this.$router.push({
        path:'/xxx',
        query:{
          id:id
        }
      })
  
接收参数:
this.$route.query.id
//注意:传参是this.$router,接收参数是this.$route,这里千万要看清了！！！
```

#### $route和$router的区别

1.$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法
2.$route为当前router跳转对象，里面可以获取name、path、query、params等

### params方式传参和接收参数

```
传参: 
this.$router.push({
        name:'xxx',
        params:{
          id:id
        }
      })
  
接收参数:
this.$route.params.id
注意:params传参，push里面只能是 name:'xxxx',不能是path:'/xxx',因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！
```

### 另外，二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示

配置动态路由参数id：

routes: [

​    // 动态路径参数 以冒号开头

​    { path: '/user/:id', component: User }

   ]

html路由跳转：

<router-link to="/demo53/8">路径参数跳转</router-link>

①不带参数写法：

　　　　　　<router-link to="home">点我</router-link>

　　　　　　<router-link v-bind:to="'home'">点我</router-link>

　　　　　　<router-link :to="'home'">Home</router-link>

　　　　　　<router-link :to="{ path: 'home' }">Home</router-link>

② 带参数写法：

　　　　　A：　<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

　　　　　　批注：路由配置格式：

　　　　　　　　{ path: '/user/:userId', name: 'user', component: User }

　　　　　　　导航显示：`/user/123` 

　　　　　B:　<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

　　　　　　　　批注：带查询参数

　　　　　　　　　　　导航显示：/register?plan=private

　js中使用的方式：  

　　　　① this.$router.push('xxx')                                  //字符串,这里的字符串是路径path匹配噢，不是router配置里的name

　　　　② `this.$router.push({ path: 'home' })                       //对象`

　　　　③ `this.$router.push({ name: 'user', params: { userId: 123 }})     // ``命名的路由 这里会变成 /user/123`

　　　　④ `this.$router.push({ path: 'register', query: { plan: 'private' }})    ``// 带查询参数，变成 /register?plan=private`

 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
vue之this.$route.query和this.$route.params接收参数
this.$route.query
A页面传递参数peng=0
registerInfoThis.$router.push("/hrhi/psninfo/dynamic/" + data.row.pk_psndoc + '?funcode=60070psninfo&peng=0');
B页面接收参数
created() {
    this.penga = this.$route.query["peng"];            
  },
```

‘http://localhost:8080/linkParamsQuestion?age=18’

let age = this.$route.query.age; //问号后面参数会被封装进 this.$route.query;

```
this.$route.params
1、router/index.js
{
        path:'/mtindex',
        component: mtindex,
        //添加路由
        children:[
             {
                 path:"/detail",
                 name:'detail',
                 component:guessdetail
             }
        ]        

 },

2、传参数（ params相对应的是name query相对应的是path）
this.$router.push({
name: ‘detail’, params:{shopid: item.id}
});


3、获取参数
this.$route.params.shopid


4、url的表现形式(url中没带参数)
http://localhost:8080/#/mtindex
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 3.检测路由　

　　watch:{
　　　　'$route': function (to,from) {
　　　　　　// 对路由变化作出响应...
　　　　}
　　}
或者
watch: {
    "$route": "routeChange",
},

methods: {
    routeChange(){
        console.log(this.$route.path);
    }
    
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

**在 router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子了**

 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<router-view :key="key"></router-view>

computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

HttpGet请求拼接url参数

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
    const query = {
      client_id: state.auth.clientID,
      redirect_uri: location.href,
      scope: 'public_repo'
    }

    const queryString = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
      .join('&')

    return `http://github.com/login/oauth/authorize?${queryString}`
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
    return vue.$http.get(`https://api.github.com/search/issues?q=${data.keyword}+state:open+repo:${vue.$store.getters.repo}${label}&sort=created&order=desc&page=${data.currentPage}&per_page=${data.pageSize}`, {
      headers: {
        'Accept': 'application/vnd.github.v3.html'
      }
    })
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 url参数转json字符串：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const queryParse = (search = window.location.search) => {
  if (!search) {
    return {}
  } else {
    const queryString = search[0] === '?' ? search.substring(1) : search
    const query = {}
    queryString
      .split('&')
      .forEach(queryStr => {
        const [key, value] = queryStr.split('=')
        if (key) {
          query[decodeURIComponent(key)] = decodeURIComponent(value)
        }
      })
    return query
  }
}

const queryStringify = query => {
  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
    .join('&')
  return queryString
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

https://www.cnblogs.com/websmile/p/7873601.html　　　 　 vue-router的用法

 

https://blog.csdn.net/zjl199303/article/details/82655576     vue 配置路由 + 用户权限生成动态路由 踩过的那些坑
https://blog.csdn.net/sangjinchao/article/details/70888259    vue,router-link传参以及参数的使用
https://blog.csdn.net/wojiaomaxiaoqi/article/details/80688911     vue中this.$router.push路由传参以及获取方法

https://juejin.im/post/5a07ff97f265da430944a411

# vue路由传参--------params和query的区别

背景：项目中需要跨页面传值，如试题id,遇到了刷新后，传的值消失，所以研究了以下两者的区别

1.params只能用name来引入路由，query用path/name来引入

2.params类似于post，query更加类似于我们ajax中get传参，说的再简单一点，前者在浏览器地址栏中不显示参数，后者显示，所以params传值相对安全一些。

3.取值用法类似分别是this.$route.params.name和this.$route.query.name。

4.params传值一刷新就没了，query传值刷新还存在

5.query地址栏中有参数信息 eg:http://localhost:8080/#/spoc-eduManage/classManage/addStudent.html?id=274de6fe001f474b89d4ed89a9a71970

```
this.$router.push({

path:"/detail",

params:{

name:'nameValue',

code:10011

}

});

this.$router.push({

path:'/xxx'

query:{

id:id

}

})复制代码
```

6.vue-router 利用url传递参数:

我们上面虽然已经学会传递参数，但是我们这些老程序员的情怀还是利用url来传值，因为我们以前在前后端没有分开开发的时候，经常这样做。在实际开发也是有很多用URL传值的需求，比如我们在新闻列表中有很多新闻标题整齐的排列，我们需要点击每个新闻标题打开不同的新闻内容，这时在跳转路由时跟上新闻编号就十分实用。

路由文件中这样写:

```
{

path:'/params/:id',

component:Params

}复制代码
```

这时候我们可以直接利用url传值了跳转:

方式1:<router-link to="/params/198">params</router-link>

方式2:编程式路由:

```
?this.$router.push({

path:'/xxx'

params:{

id:'198'

}

})复制代码
```

接收参数:

<p>新闻ID：{{ $route.params.newsId}}</p>
<p>新闻标题：{{ $route.params.newsTitle}}</p>
```
export default new Router({
  routes: [

    {
      path: '/',
      redirect: '/main',
    },{
      path: '/main',
      name: 'Main',
      component: ()=> import('@/views/Main'),
      children: [
        {
          //path: '/testPage',  //这种方式 不配置参数名， 页面刷新会丢失参数
           path: '/testPage/:aaa/:bbb',  //这样通过 name 和 params 进行路由传参时 ， 刷新页面就不会丢失 参数aaa 和 bbb 了。
          name: 'TestPage',
          component: ()=> import('@/views/TestPage/TestPage')
        },
      ]

    },

  ]
})
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

调整函数：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
        methods: {

            //路由调整传参测试

            goRouterTest(){
                // this.$router.push('/testpage');
                this.$router.push({ name: 'TestPage', params:{aaa: '111', bbb: '222'} });
            }

        },
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

这样传参时，地址栏就会出现参数了。这样属性就不会丢失了。

![img](https://img2018.cnblogs.com/blog/1249006/201906/1249006-20190621144222401-789626817.png)

 

//然后可以选择配合 路由解耦来使用

修改路由配置为：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
        {
          // path: '/testPage',  //这种方式 不配置参数名， 页面刷新会丢失参数
          path: '/testPage/:aaa/:bbb',  //这样通过 name 和 params 进行路由传参时 ， 刷新页面就不会丢失 参数aaa 和 bbb 了。
          name: 'TestPage',
          props: true,   //若个要解耦的 到组件中 props 中。
          component: ()=> import('@/views/TestPage/TestPage')
        },
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

要调整的组件生命 props

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<template>
    <div class="TestPage">
        Name路由传参{{$route.params}}
    </div>
</template>

<script>
    export default {
        name: "TestPage",
        props: {
            //将路由中的参数 aaa 和 bbb 解耦的 组件上的 props 上。
            aaa: {
                type: String
            },
            bbb: {
                type: String
            }
        },

        mounted() {
            console.log('这是路由传的参数aaa', this.aaa, '这是路由传的参数bbb', this.bbb );
        }


    }
</script>

<style scoped>

</style>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

最后的效果（刷新不会丢失）：

![img](https://img2018.cnblogs.com/blog/1249006/201906/1249006-20190621145733982-1450754343.png)

结束。

 

当然也可以通过 path 和 query 的方式进行传参 this.$router.push({path: 路由路径，query: {要传的产生} })

但是这不能进行 props 解耦。

 

------------------------------------2019711 配置可选路由参数-------------------------------------------

假如下面是我们的某个路由：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
        {
            path: 'examPaperMultiPurpose/:action/:id', //多加 ? 代表这个参数是可选的。
            name: 'examPaperMultiPurpose',
            title: '考卷管理',
            notKeepAlive: true,
            props: true,
            component: () =>
                import ('@/views/exam/examManage/examPaperMultiPurpose.vue'),
        }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

当我们这样进行页面跳转时：

```
this.$router.push( { name: 'examPaperMultiPurpose', params: {action: 'add'} } );
```

很显然我们在跳转时， 没有进行 id 参数 的 传递。我们在控制台也会看到这样的警告。

![img](https://img2018.cnblogs.com/blog/1249006/201907/1249006-20190711230232711-864913628.png)

提醒 我们 缺少参数，id 是一个没有定义的。

当我们有时候不是 都想传递每个参数，我们可以 把参数配置成 可选的。配置方法为 在参数后只要多加一个 ? 即可，如下

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
        //新增、编辑、查询 考卷
        {
            path: 'examPaperMultiPurpose/:action?/:id?', //多加 ? 代表这个参数是可选的。
            name: 'examPaperMultiPurpose',
            title: '考卷管理',
            notKeepAlive: true,
            props: true,
            component: () =>
                import ('@/views/exam/examManage/examPaperMultiPurpose.vue'),
        }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

这样我们就把两个参数action 和 id 配置成可选的路由参数了， 当我们还进行上面的方式进行传参时。 就不会警告我们 缺少参数了。

## 1 Vue的生命周期

> 什么是生命周期： 从Vue实例创建、运行、到销毁期间，总是伴随各种各样的事件，这些事件统称为生命周期
> 生命周期钩子： 就是生命周期事件的别名
> 生命周期钩子 = 生命周期函数 = 生命周期事件

1. beforeCreate（创建前）
	
	+ 实例刚在内存中被创建出来，数据观测和事件配置之前被调用（组件的选项对象还未创建，el 和 data 并未初始化）因此无暂时重定向（302）和永久重定向（301）
	
	  >  所谓重定向就是将网页自动转向重定向，即：301永久性重定向和302临时性重定向。实施301后，新网址完全继承旧网址，旧网址的排名等完全清零；实施302后，对旧网址没有影响，但新网址不会有排名。 
	
	  ```javascript
	  app.use('/*',function(req,res,next){
	      if(req.hostname == 'meetqy.com') return res.redirect(302, 'http://www.meetqy.com/');
	      next();
	  )}
	  ```
	
	  - 301重定向可促进搜索引擎优化效果
	  - 从搜索引擎优化角度出发，301重定向是网址重定向最为可行的一种办法。当网站的域名发生变更后，搜索引擎只对新网址进行索引，同时又会把旧地址下原有的外部链接如数转移到新地址下，从而不会让网站的排名因为网址变更而收到丝毫影响。同样，在使用301永久性重定向命令让多个域名指向网站主域时，亦不会对网站的排名产生任何负面影响。
	  - 302重定向可影响搜索引擎优化效果
	  - 迄今为止，能够对302重定向具备优异处理能力的只有Google。也就是说，在网站使用302重定向命令将其它域名指向主域时，只有Google会把其它域名的链接成绩计入主域，而其它搜索引擎只会把链接成绩向多个域名分摊，从而削弱主站的链接总量。既然作为网站排名关键因素之一的外链数量受到了影响，网站排名降低也是很自然的事情了。
	  - 综上所述，在众多重定向技术中，301永久性重定向是最为安全的一种途径，也是极为理想的一款解决方案。
	
	  **301重定向**
	
	  **什么是301转向？**
	
	  301转向(或叫301重定向，301跳转)是当用户或搜索引擎向网站服务器发出浏览请求时，服务器返回的HTTP数据流中头信息(header)中的状态码的一种，表示本网页永久性转移到另一个地址。
	
	  其它常见的状态码还包括，200表示一切正常，404网页找不到，302暂时转向，等等。
	
	  **为什么要做网址转向？**
	
	  除了前面介绍过的[网址规范化问题](http://www.chinamyhosting.com/seoblog/2006/04/10/url-canonicalization/)外，还有很多需要做网址转向的情形。比如，为保护版权，你拥有不同TLD的多个域名：
	
	  *company.com
	  company.net
	  company.org
	  company.com.cn
	  company.cn*
	  等等。
	
	  很自然这些域名全部指向一个网站。如用company.com为主域名，其它域名就可以转向到*company.com*。
	
	  或者你注册了公司全称域名*longcompanyname.com*，但太长 ，你也注册了缩写域名方便用户记住*lcn.com*，其中一个做主域名，另一个就可以转向到主域名。
	
	  **为什么要用301转向？**
	
	  网址转向方法主要包括：301转向，302转向，JavaScript转向，PHP/ASP/CGI转向，META REFRESH网页META刷新，等。302转向可能会有[URL规范化问题](http://www.chinamyhosting.com/seoblog/2006/04/10/url-canonicalization/)。其它方法都是常用的作弊手法，当然不是说不可以正当地用，方法本身没有错，但被作弊者用多了，搜索引擎对这些可疑的转向都很敏感。何必冒险呢。
	
	  当网页A用301重定向转到网页B时，搜索引擎可以肯定网页A永久的改变位置，或者说实际上不存在了，搜索引擎就会把网页B当作唯一有效目标。好处是，第一，没有[网址规范化问题](http://www.chinamyhosting.com/seoblog/2006/04/10/url-canonicalization/)，第二，也很重要的，网页A的[PR网页级别](http://www.chinamyhosting.com/seoblog/2006/04/08/google-pr/)会传到网页B。
	
	  
	
	  ### 状态码
	
	  - `1xx`：相关信息
	  - `2xx`：操作成功
	  - `3xx`：重定向
	  - `4xx`：客户端错误
	  - `5xx`：服务器错误
	
	  ### 4xx 状态码
	
	  `4xx`状态码表示客户端错误，主要有下面几种。
	
	  `400 Bad Request`：服务器不理解客户端的请求，未做任何处理。
	
	  `401 Unauthorized`：用户未提供身份验证凭据，或者没有通过身份验证。
	
	  `403 Forbidden`：用户通过了身份验证，但是不具有访问资源所需的权限。
	
	  `404 Not Found`：所请求的资源不存在，或不可用。
	
	  `405 Method Not Allowed`：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。
	
	  `410 Gone`：所请求的资源已从这个地址转移，不再可用。
	
	  `415 Unsupported Media Type`：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。
	
	  `422 Unprocessable Entity` ：客户端上传的附件无法处理，导致请求失败。
	
	  `429 Too Many Requests`：客户端的请求次数超过限额。
	
	  
	
	  ### 5xx 状态码:
	
	  `5xx`状态码表示服务端错误。一般来说，API 不会向用户透露服务器的详细信息，所以只要两个状态码就够了。
	
	  `500 Internal Server Error`：客户端请求有效，服务器处理时发生了意外。
	
	  `503 Service Unavailable`：服务器无法处理请求，一般用于网站维护状态。
	
	  法访问methods， data， computed等上的方法和数据。
2. created（创建后）
	
	+ 实例在内存中创建完成之后被调用，在这一步，实例已完成以下配置：数据观测、属性和方法的运算，watch/event事件回调，完成了data 数据的初始化，el没有。 然而，挂在阶段还没有开始, $el属性目前不可见，这是一个常用的生命周期，因为你可以调用methods中的方法，改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上，，获取computed中的计算属性等等，通常我们可以在这里对实例进行预处理，也有一些童鞋喜欢在这里发ajax请求，值得注意的是，这个周期中是没有什么方法来对实例化过程进行拦截的，因此假如有某些数据必须获取才允许进入页面的话，并不适合在这个方法发请求，建议在组件路由钩子beforeRouteEnter中完成。在这个周期里面如果进行请求是可以改变数据并渲染，由于DOM未挂载，请求过多或者占用时间过多过长会导致页面线上空白
3. beforeMount
	
	+ 挂载开始之前被调用，相关的render函数首次被调用（虚拟DOM），实例已完成以下的配置： 编译模板，把data里面的数据和模板生成html，完成了el和data 初始化，注意此时还没有挂载html到页面上。DOM未完成挂载，数据虽然早已完成初始化，但是数据的双向绑定还是显示{{}} ,这是因为Vue采用了Virtual DOM 技术，先占住了一个坑
4. mounted
	
	+ 挂载完成，也就是模板中的HTML渲染到HTML页面中，此时一般可以做一些ajax操作，mounted只会执行一次。在上一个周期占位的数据把值渲染进去，一般请求放在这个地方，因为请求完成后刚好就可以渲染了
5. beforeUpdate（更新前）
	
	+ 只要是页面数据变化了都会触发，数据更新之前，页面的数据还是之前的数据，当你请求赋值一个数据的时候会执行这个周期，如果没有数据改变不执行
6. updated（更新后）
	
	+ 只要是页面数据改变了都会触发，数据更新完毕，页面的数据是更新完毕的，beforeUpdate和updated要谨慎使用，因为页面更新数据的时候都会触发，在这里操作数据很影响性能和容易死循环。
7. beforeDestroy（销毁前）
	
	+ 这个周期是在组件销毁之前执行，在我项目开发中，觉得这个其实有点类似路由钩子beforeRouterLeave,都是在路由离开的时候执行，只不过beforeDestroy无法阻止路由跳转，但是可以做一些路由离开的时候操作，因为这个周期里面还可以使用data和method。比如一个倒计时组件，如果在路由跳转的时候没有清除，这个定时器还是在的，这时候就可以在这个里面清除计时器。
8. destroyed（销毁后）
	
	+ 在实例销毁之后调用，调用后，所以的事件监听器会被移出，所有的子实例也会被销毁，该钩子在服务器端渲染期间不被调用




特点记忆法：
1. beforeCreate： 一个空的Vue实例（里面什么都没有）
2. created： 一个完整的Vue实例，包含data和methods
3. beforeMount: Vue实例跟文档结合完毕
4. mounted： Vue实例与文档流的结合体第一次显示在页面上
5. beforeUpdate： data最新，但是页面还是旧的
6. updated： data最新，页面最新
7. beforeDestroy： 实例还可以用
8. destroyed： 实例被销毁了


## 2. 指令的生命周期
自定义指令有五个生命周期（也叫钩子函数），分别是 bind,inserted,update,componentUpdated,unbind

bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
update: 被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
unbind: 只调用一次，指令与元素解绑时调用。



##  3. v-model的实现

```vue
<template>
  <some-component v-model="anyProp"></some-component>
  <input type="text">
  <some-component :value="anyProp" @input="onChangeEnv"></some-component>
  <some-component :some-prop="anyProp" @some-event="onChangeEnv"></some-component>
<child-component>
    model:{
        event:'some-event',
        prop:'someProp'
    }
    methods:{
        onEvent(){
            this.$emit('some-event',changedValue)
        },
    }
</child-component> 
</template>
<script>
export default {
    methods: {
        onChangeEnv(v){
            this.anyProp=v
        },
    }
  data() {
    return {anyProp:''};
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
};
</script>
```

### 缓存路由组件：

使用`keep-alive`可以将所有路径匹配到的路由组件都缓存起来，包括路由组件里面的组件，`keep-alive`大多数使用场景就是这种。

```
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
```


https://juejin.im/post/5b41bdef6fb9a04fe63765f1

##  组件通信的八种方式

### 组件通信的种类

+ 父子组件通信
+ 非父子组件通信（兄弟组件和隔代组件）

### 组件通信方式

1. 父传子

   + ```vue
     // section父组件
     <template>
       <div class="section">
         <com-article :articles="articleList"></com-article>
       </div>
     </template>
     
     <script>
     import comArticle from './test/article.vue'
     export default {
       name: 'HelloWorld',
       components: { comArticle },
       data() {
         return {
           articleList: ['红楼梦', '西游记', '三国演义']
         }
       }
     }
     </script>
     
     // 子组件 article.vue
     <template>
       <div>
         <span v-for="(item, index) in articles" :key="index">{{item}}</span>
       </div>
     </template>
     
     <script>
     export default {
       props: ['articles']
     }
     </script>
     
     // 总结，vue父组件向子组件传值，可以通过在父组件内的子组件标签双向绑定一个自定义属性值，子组件通过props接收父组件绑定的属性值拿值-
     ```

     

2. 子传父

   + ```vue
     // 父组件
     <template>
       <div class="section">
         <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
         <p>{{currentIndex}}</p>
       </div>
     </template>
     
     <script>
     import comArticle from './test/article.vue'
     export default {
       name: 'HelloWorld',
       components: { comArticle },
       data() {
         return {
           currentIndex: -1,
           articleList: ['红楼梦', '西游记', '三国演义']
         }
       },
       methods: {
         onEmitIndex(idx) {
           this.currentIndex = idx
         }
       }
     }
     </script>
     
     // 子组件
     <template>
       <div>
         <div v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</div>
       </div>
     </template>
     
     <script>
     export default {
       props: ['articles'],
       methods: {
         emitIndex(index) {
           this.$emit('onEmitIndex', index)
         }
       }
     }
     </script>
     
     //子组件通过自定义事件给父组件传值，使用this.$emit('事件名', 需要传的参数)，父组件使用 @事件名="函数，名"，然后可以在 父组件函数名的函数中拿到这个值
     ```

   + 

3. 兄弟组件通信

4. 隔代组件通信

5. 共同方式通信

## vue框架对比

####  1. vue和react对比

+ angular 提供的更多是以整套解决方案，后者更像一个生态
+ Vue和React目前都使用Virtual Dom

不同点：

Vue: 

+ 模板和渲染函数的弹性选择
+ 简单的语法及项目创建
+ 更快的渲染速度和更小的体积

React：

+ 更适用于大型应用和更好的可测试性
+ 同时适用于web端和原生App
+ 更大的生态圈带来的更多支持和工具

相同点：

+ 利用虚拟DOM实现快速渲染（虚拟DOM是利用js在内存中创建一个类似于dom树的对象，创建完毕后进行拼接解析，最后一次性插入到真实DOM中）
+ 轻量级
+ 响应式组件
+ 服务端渲染
+ 易于集成路由工具，打包工具以及状态管理工具
+ 优秀的支持和社区



1. vue-cli 
2. vue create projectName
3. npm install /npm run [pakage.json/script/"cmd"]
4. main.js 入口文件
5. 定义router，定义store
6. 在main注入挂载
7. 访问某个路由时候加载相应的组件
8. store state mutaions astions getters 静默存在
   没有commit 就不会触发mutations 
   没有 取state 也不动
   没有 调用actions 也不会commit mutatiions



# 1. vuex是什么

	github站点: https://github.com/vuejs/vuex
	在线文档: https://vuex.vuejs.org/zh-cn/
	简单来说: 对应用中组件的状态进行集中式的管理(读/写)

# 2. 状态自管理应用

	state: 驱动应用的数据源
	view: 以声明方式将state映射到视图
	actions: 响应在view上的用户输入导致的状态变化(包含n个更新状态的方法)

![单向数据流](https://vuex.vuejs.org/zh-cn/images/flow.png)

# 3. 多组件共享状态的问题

	多个视图依赖于同一状态
	来自不同视图的行为需要变更同一状态
	以前的解决办法
		* 将数据以及操作数据的行为都定义在父组件
		* 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)
	vuex就是用来解决这个问题的

![vuex结构](https://vuex.vuejs.org/zh-cn/images/vuex.png)

# 4. vuex的核心概念

问题： 传0进去会直接当作false 	

## 1). state

	vuex管理的状态对象
	它应该是唯一的
	const state = {
		xxx: initValue
	}

## 2). mutations

	包含多个直接更新state的方法(回调函数)的对象
	谁来触发: action中的commit('mutation名称')
	只能包含同步的代码, 不能写异步代码
	const mutations = {
		yyy (state, data) { 
			// 更新state的某个属性
		}
	}

**除了这种使用 `this.$store.commit('xxx')` 提交 mutation的方式之外，还有一种方式，即使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `this.$store.commit`。**例如：

```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## 3). actions

	包含多个事件回调函数的对象
	通过执行: commit()来触发mutation的调用, 间接更新state
	谁来触发: 组件中: $store.dispatch('action名称')  // 'zzz'
	可以包含异步代码(定时器, ajax)
	const actions = {
		zzz ({commit, state}, data1) {
			commit('yyy', data2)
		}
	}
	
	它接收的第一个参数是一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
	
	不过，mutation处理函数中所做的事情是改变state，而action处理函数中所做的事情则是commit mutation。
	我的理解，actions只是一种异步提交mutation的提交方式

还有一种方法使用 `mapActions` 辅助函数将组件的 methods 映射为 `this.$store.dispatch` 调用。如下：

```
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## 4). getters

	包含多个计算属性(get)的对象
	谁来读取: 组件中: $store.getters.xxx
	const getters = {
		mmm (state) {
			return ...
		}
	}

## 5). modules

	包含多个module
	一个module是一个store的配置对象
	与一个组件(包含有共享数据)对应

## 6). 向外暴露store对象

	export default new Vuex.Store({
		state,
		mutations,
		actions,
		getters
	})

## 7). 组件中:

	import {mapGetters, mapActions} from 'vuex'
	export default {
		computed: mapGetters(['mmm'])
		methods: mapActions(['zzz'])
	}
	
	{{mmm}} @click="zzz(data)"


## 8). 映射store

	import store from './store'
	new Vue({
		store
	})

## 9). store对象

	1.所有用vuex管理的组件中都多了一个属性$store, 它就是一个store对象
	2.属性:
	  state: 注册的state对象
	  getters: 注册的getters对象
	3.方法:
	  dispatch(actionName, data): 分发action 

https://mobilesite.github.io/2016/12/18/vuex-introduction/   vuex精品文章

### vuex使用记录

```js
// const.js
export const GET_GRADE_ID = "GET_GRADE_ID"  // 未状态操作命名，方便管理，后续查看常量可以得出有多少状态管理，方便找出对于状态

// index.js module vuex 的使用方式，index文件做统筹集合
import Vue from "vue";
import Vuex from "vuex";
import getPageState from "./modules/getPageState";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    getPageState
  }
});
export default store;

// getPageState.js  模块化vuex，专门做状态管理的模块
import * as types from "@/store/const";
const currentPage = {
  namespace: true, // 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
  state: {
    gradeId: ""
  },
  mutations: {
    [types.GET_GRADE_ID](state, params) {  // GET_GRADE_ID 状态同步提交
      state.gradeId = "";
      if (params) {
        state.gradeId = params;
      }
    }
  },
  actions: {  // 异步提交mutations，type为传入的值
    setActiveState(store, type) {
      store.commit(types.GET_GRADE_ID, type)
    }
  },
  getters: {   // 获取state的值，方便组件使用
    getActiveState: state => {
      return state.gradeId
    }
  }
};
export default currentPage;

```

怎么使用：

```vue
<script>
import { mapActions, mapGetters } from "vuex";

created() {
    this.gradeId = this.getActiveState; //把getActiveState获取的state给gradeId
}
watch: {
  gradeId(item) {
    this.setActiveState(item);  // 给setActiveState函数带参
  }
},
computed: {
  ...mapGetters(["getActiveState"]) // 拿到getters的getActiveState函数
},
methods: {
   ...mapActions(["setActiveState"]), // 把函数返回
}
</script>
```

问题：

1. 首页进入通知栏正常，但是进入详情后退出来异常

# 5. 将vuex引到项目中

## 1). 下载: npm install vuex --save

## 2). 使用vuex

	1.store.js
		import Vuex from 'vuex'
		export default new Vuex.Store({
			state,
			mutations,
			actions,
			getters,
			modules
		})
	2.main.js
		import store from './store.js'
		new Vue({
			store
		})

## 1. 准备

	1.[].slice.call(lis): 将伪数组转换为真数组
	2.node.nodeType: 得到节点类型
	3.Object.defineProperty(obj, propertyName, {}): 给对象添加/修改属性(指定描述符)
		configurable: true/false  是否可以重新define
		enumerable: true/false 是否可以枚举(for..in / keys())
		value: 指定初始值
		writable: true/false value是否可以修改存取(访问)描述符
		get: 函数, 用来得到当前属性值
		set: 函数, 用来监视当前属性值的变化

  	4.Object.keys(obj): 得到对象自身可枚举的属性名的数组
  	5.DocumentFragment: 文档碎片(高效批量更新多个节点)
  	6.obj.hasOwnProperty(prop): 判断prop是否是obj自身的属性

## 2. 数据代理(MVVM.js)

	1.通过一个对象代理对另一个对象中属性的操作(读/写)

  	2.通过vm对象来代理data对象中所有属性的操作
  	3.好处: 更方便的操作data中的数据
  	4.基本实现流程
    	1). 通过Object.defineProperty()给vm添加与data对象的属性对应的属性描述符
    	2). 所有添加的属性都包含getter/setter
    	3). 在getter/setter内部去操作data中对应的属性数据
    

## 3. 模板解析(compile.js)

  	1.模板解析的关键对象: compile对象
  	2.模板解析的基本流程:
    	1). 将el的所有子节点取出, 添加到一个新建的文档fragment对象中
    	2). 对fragment中的所有层次子节点递归进行编译解析处理
        	* 对表达式文本节点进行解析
        	* 对元素节点的指令属性进行解析
            	* 事件指令解析
            	* 一般指令解析
      	3). 将解析后的fragment添加到el中显示
    3.解析表达式文本节点: textNode.textContent = value
      	1). 根据正则对象得到匹配出的表达式字符串: 子匹配/RegExp.$1
      	2). 从data中取出表达式对应的属性值
      	3). 将属性值设置为文本节点的textContent
    4.事件指令解析: elementNode.addEventListener(事件名, 回调函数.bind(vm))
        v-on:click="test"
      	1). 从指令名中取出事件名
      	2). 根据指令的值(表达式)从methods中得到对应的事件处理函数对象
      	3). 给当前元素节点绑定指定事件名和回调函数的dom事件监听
      	4). 指令解析完后, 移除此指令属性
    5.一般指令解析: elementNode.xxx = value
      	1). 得到指令名和指令值(表达式)
      	2). 从data中根据表达式得到对应的值
      	3). 根据指令名确定需要操作元素节点的什么属性
	        * v-text---textContent属性
	        * v-html---innerHTML属性
	        * v-class--className属性
      	4). 将得到的表达式的值设置到对应的属性上
      	5). 移除元素的指令属性

## 4. 数据劫持-->数据绑定

1.数据绑定(model==>View):
	  1). 一旦更新了data中的某个属性数据, 所有界面上直接使用或间接使用了此属性的节点都会更新(更新)

  	2.数据劫持
		1). 数据劫持是vue中用来实现数据绑定的一种技术
		2). 基本思想: 通过defineProperty()来监视data中所有属性(任意层次)数据的变化, 一旦变化就去更新界面
  	3.四个重要对象
    	1). Observer
			* 用来对data所有属性数据进行劫持的构造函数
	      	* 给data中所有属性重新定义属性描述(get/set)
	      	* 为data中的每个属性创建对应的dep对象
	    2). Dep(Depend)
	      	* data中的每个属性(所有层次)都对应一个dep对象
	      	* 创建的时机:
	        	* 在初始化define data中各个属性时创建对应的dep对象
	        	* 在data中的某个属性值被设置为新的对象时
	      	* 对象的结构
		        {
		          id, // 每个dep都有一个唯一的id
		          subs //包含n个对应watcher的数组(subscribes的简写)
		        }
			* subs属性说明
				* 当一个watcher被创建时, 内部会将当前watcher对象添加到对应的dep对象的subs中
				* 当此data属性的值发生改变时, 所有subs中的watcher都会收到更新的通知, 从而最终更新对应的界面
		3). Compile
			* 用来解析模板页面的对象的构造函数(一个实例)
			* 利用compile对象解析模板页面
			* 每解析一个表达式(非事件指令)都会创建一个对应的watcher对象, 并建立watcher与dep的关系
			* complie与watcher关系: 一对多的关系
		4). Watcher
	      	* 模板中每个非事件指令或表达式都对应一个watcher对象
	      	* 监视当前表达式数据的变化
	      	* 创建的时机: 在初始化编译模板时
	      	* 对象的组成
				{
		          vm,  //vm对象
		          exp, //对应指令的表达式
		          cb, //当表达式所对应的数据发生改变的回调函数
		          value, //表达式当前的值
		          depIds //表达式中各级属性所对应的dep对象的集合对象
		                  //属性名为dep的id, 属性值为dep
				}
			

		5). 总结: dep与watcher的关系: 多对多
			* 一个data中的属性对应对应一个dep, 一个dep中可能包含多个watcher(模板中有几个表达式使用到了属性)
			* 模板中一个非事件表达式对应一个watcher, 一个watcher中可能包含多个dep(表达式中包含了几个data属性)
			* 数据绑定使用到2个核心技术
				* defineProperty()
				* 消息订阅与发布
	
	4.双向数据绑定
		1). 双向数据绑定是建立在单向数据绑定(model==>View)的基础之上的
		2). 双向数据绑定的实现流程:
	      	* 在解析v-model指令时, 给当前元素添加input监听
	      	* 当input的value发生改变时, 将最新的值赋值给当前表达式所对应的data属性
### 响应式原理：

```javascript
// 属性
let a = {
    b: 123,
    c: 456
}
Object.seal(a, 'b')  // 使对象无法被遍历  configurable 为false
Object.freeze(a, 'b') // 使writeable  configurable 为false  无法写入和遍历
Object.defineProperty(a, 'b', {  // 今后会逐渐被 Reflect.ownKeys(target) 取代
    writable: true,  // 非defineProperty方法创建的对象，三个属性值默认为true，否则为false
    enumerable: true,
    configurable: true,
})

// vue 通过var dep = new Dep() 收集依赖   更新依赖
```





## 1. vue脚手架

    用来创建vue项目的工具包
    创建项目:
        npm install -g vue-cli
        vue init webpack VueDemo
    开发环境运行:
        cd VueDemo
        npm install
        npm run dev
    生产环境打包发布
        npm run build
        npm install -g serve
        serve dist
        http://localhost:5000

## 2. eslint

    用来做项目编码规范检查的工具
    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息
    有相应的配置, 可定制检查

## 3. 组件化编程

    vue文件包含3个部分
        <template>
          <div></div>
        </template>
        <script>
            export default {
    		  props: []/{}
              data(){},
    		  computed: {}
              methods: {},
    		  
    		  watch: {}
    		  filters: {}
    		  directives: {}
    		  components: {}
            }
        </script>
        <style>
        </style>
    组件化编码的基本流程
    	1). 拆分界面, 抽取组件
    	2). 编写静态组件
    	3). 编写动态组件
        	初始化数据, 动态显示初始化界面
        	实现与用户交互功能
    组件通信的5种方式
    	props
    	vue的自定义事件
    	pubsub第三方库
    	slot
    	vuex(后面单独讲)
    props:
        父子组件间通信的基本方式
        属性值的2大类型: 
            一般: 父组件-->子组件
            函数: 子组件-->父组件
    	隔层组件间传递: 必须逐层传递(麻烦)
    	兄弟组件间: 必须借助父组件(麻烦)
    vue自定义事件
        子组件与父组件的通信方式
        用来取代function props
        不适合隔层组件和兄弟组件间的通信
    pubsub第三方库(消息订阅与发布)
        适合于任何关系的组件间通信
    slot
        通信是带数据的标签
        注意: 标签是在父组件中解析
    vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比pubsub强大, 更适用于vue项目

## 4. ajax

    相关库:
        vue-resource: vue插件, 多用于vue1.x
        axios: 第三方库, 多用于vue2.x
    vue-resource使用
        // 引入模块
        import VueResource from 'vue-resource'
        // 使用插件
        Vue.use(VueResource)
        
        // 通过vue/组件对象发送ajax请求
        this.$http.get('/someUrl').then((response) => {
          // success callback
          console.log(response.data) //返回结果数据
        }, (response) => {
          // error callback
          console.log(response.statusText) //错误信息
        })
    axios使用
        // 引入模块
        import axios from 'axios'
        
        // 发送ajax请求
        axios.get(url)
          .then(response => {
            console.log(response.data) // 得到返回结果数据
          })
          .catch(error => {
        	console.log(error.message)
          })

## 5. vue-router

    vue用来实现SPA的插件
    使用vue-router
        1. 创建路由器: router/index.js
          new VueRouter({
            routes: [
              { // 一般路由
                path: '/about',
                component: about
              },
              { // 自动跳转路由
                path: '/', 
                redirect: '/about'
              }
            ]
          })
        2. 注册路由器: main.js
           import router from './router'
           	new Vue({
           		router
           	})
        3. 使用路由组件标签:
           	<router-link to="/xxx">Go to XXX</router-link>
           	<router-view></router-view>
    编写路由的3步
        1. 定义路由组件    
        2. 映射路由
        3. 编写路由2个标签
    嵌套路由
        children: [
            {
              path: '/home/news',
              component: news
            },
            {
              path: 'message',
              component: message
            }
         ]
    向路由组件传递数据
        params: <router-link to="/home/news/abc/123">
        props: <router-view msg='abc'>
    缓存路由组件
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    路由的编程式导航
    	this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
    	this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
    	this.$router.back(): 请求(返回)上一个记录路由

## 1. vue脚手架

​    用来创建vue项目的工具包

​    创建项目:

​        npm install -g vue-cli

​        vue init webpack VueDemo

​    开发环境运行:

​        cd VueDemo

​        npm install

​        npm run dev     //编码 自动编译打包（HMR），查看效果

​    生产环境打包发布

​        npm run build

​        npm install -g serve

​        serve dist      部署运行文件夹（dist）

​        http://localhost:5000



## 2. eslint

​    用来做项目编码规范检查的工具

​    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息

​    有相应的配置, 可定制检查



## 3. 组件化编程

​    vue文件包含3个部分

```html
<template>          
	<div></div>
</template>
<script>
    export default {
        props: []/{}
        data(){},
        computed: {}
        methods: {},
        watch: {},
        filters: {},
        directives: {},
        components: {}
    }
</script>
<style>
    
</style>
```

​    组件化编码的基本流程

​      1). 拆分界面, 抽取组件

​      2). 编写静态组件

​      3). 编写动态组件

​          初始化数据, 动态显示初始化界面

​          实现与用户交互功能

​    组件通信的5种方式

​      props

​      vue的自定义事件

​      pubsub第三方库

​      slot

​      vuex(后面单独讲)

​    props:

​        父子组件间通信的基本方式

​        属性值的2大类型: 

​            一般: 父组件-->子组件

​            函数: 子组件-->父组件

​    隔层组件间传递: 必须逐层传递(麻烦)

​    兄弟组件间: 必须借助父组件(麻烦)

  vue自定义事件

​      子组件与父组件的通信方式

​      用来取代function props

​      不适合隔层组件和兄弟组件间的通信

  pubsub第三方库(消息订阅与发布)

​      适合于任何关系的组件间通信

  slot

​      通信是带数据的标签

​      注意: 标签是在父组件中解析

  vuex

​      多组件共享状态(数据的管理)

​      组件间的关系也没有限制

​      功能比pubsub强大, 更适用于vue项目

## 4. ajax

​    相关库:

​        vue-resource: vue插件, 多用于vue1.x

​        axios: 第三方库, 多用于vue2.x

​    vue-resource使用

​        // 引入模块

       ```vue

import VueResource from 'vue-resource'
       ```

​        // 使用插件

        ```vue

Vue.use(VueResource)
        ```

​        // 通过vue/组件对象发送ajax请求

 ```javascript
this.$http.get('/someUrl').then((response) => {
     // success callback
     console.log(response.data) //返回结果数据
     }, (response) => {
     // error callback
     console.log(response.statusText) //错误信息
})
 ```

​    axios使用

​        // 引入模块

```javascript
import axios from 'axios'
```

​        // 发送ajax请求

```javascript
 axios.get(url)
   .then(response => {
      console.log(response.data) // 得到返回结果数据
   })
   .catch(error => {
     console.log(error.message)
    })
```

## 5. vue-router

vue用来实现SPA的插件

使用vue-router

1. 创建路由器: router/index.js

```javascript
new VueRouter({
   routes: [
       { // 一般路由
         path: '/about',
         component: about
       },
       { // 自动跳转路由
         path: '/', 
         redirect: '/about'
       }
    ]
})
```

2. 注册路由器: main.js

```javascript
import router from './router'
new Vue({
   router
})
```

3. 使用路由组件标签:

```javascript
<router-link to="/xxx">Go to XXX</router-link>
<router-view></router-view>
```

​    编写路由的3步

​        1. 定义路由组件    

​        2. 映射路由

​        3. 编写路由2个标签

​    嵌套路由

```javascript
children: [
	{
		path: '/home/news',
		component: news
	},
	{
		path: 'message',
		component: message
	}
]
```

​    向路由组件传递数据

```javascript
params: <router-link to="/home/news/abc/123">
props: <router-view msg='abc'>
```

​    缓存路由组件

```html
<keep-alive>
	<router-view></router-view>
</keep-alive>
```

​    路由的编程式导航

​      this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)

​      this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)

​      this.$router.back(): 请求(返回)上一个记录路由



![1569990488918](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1569990488918.png)

## stylus

```shell
npm install stylus stylus-loader --save

<style lang="stylus" rel="stylesheet/stylus">

</style>
```

<route-link to="跳转地址">  可以作为路由a链接

```vue
@click="$router.back()"
```

## 路由跳转地址相同时报错 Uncaught (in promise)

出现问题的原因：vue-router ≥3.0版本回调形式以及改成promise api的形式了，返回的是一个promise，如果路由地址跳转相同, 且没有捕获到错误，控制台始终会出现如图所示的警告 （注：3.0以下版本则不会出现以下警告！！！，因路由回调问题…）

解决方案: 针对于路由跳转相同的地址添加catch捕获一下异常：

`this.$router.push('/location').catch(err => { console.log(err) })`





## 按需加载js

const Home = () => import('../pages/pagesHome/pagesHome.vue')



#### 1、vue使用定时器

在vue中使用定时器，很多情况下，进入和退出vue界面，都没有清除定时器，从而导致有很多定时器一起工作，这样肯定是不行的，接下来就使用当用户进入界面时启用定时器，当用户离开当前界面时就清除定时器。

```vue
<template>
</template>

<script>
    import store from '@/store'
    import Vue from 'vue'

    export default {
        name: "test",
        data () {
            return {
                timer: null
            }
        },
        methods: {
            setTimer() {
                if(this.timer == null) {
                    this.timer = setInterval( () => {
                        console.log('开始定时...每过一秒执行一次')
                    }, 1000)
                }
            }
        },
        created: function() {
            this.getFamilyBase_info()
            // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
            clearInterval(this.timer)
            this.timer = null
            this.setTimer()
        },
        destroyed: function () {
            // 每次离开当前界面时，清除定时器
            clearInterval(this.timer)
            this.timer = null
        }
    }
</script>
<style scoped>
</style>
```









# VUE3.0

vue/cli @4.5.0    使用elementui  

```shell
vue add element-plus
```

插槽的变化