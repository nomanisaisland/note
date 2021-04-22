## 1.  call 和 apply 的区别是什么，哪个性能更好一点

```javascript
fn.call(obj, param1, param2, param3)
fn.apply(obj, [param1, param2, param3])
```

1. 相同点
   + 都是用来执行函数并且改变函数中  this 指向
   + call 和 apply 都是 function 原型上的方法，每一个函数作为 function 的实例都可以调用原型上的这两个方法
2. 不同点
   + call传递的参数是一个一个传参，apply 要求参数需要以数组方式传参
3. 哪个性能更好一些
   + call 的性能会比apply性能更好一点，尤其是当参数超过3个的时候

> bind  方法没有把函数立即执行，只是预先把函数中的this进行处理

 4. new,call,apply,bind 方法实现原理

    ```javascript
    // new 
    //1: 获取构造函数
    //2：创建一个新对象；
    //3：将函数的作用域赋给新对象（这里实际上就是生产了一个新的上下文）
    //4：执行函数中的代码（为新对象添加属性、方法）
    //5：返回值，无返回值或者返回一个非对象值时，则将创建的新对象返回，否则会将返回值作为新对象返回。（也就是说一定会返回一个对象回来，这一步可以从下面的代码得结论）
    function MyNew() {
        let Constructor = Array.prototype.shift.call(arguments);  // 取出构造函数
        let obj = {}  // 执行会创建一个对象
        obj.__proto__ = Constructor.prototype
        var result = Constructor.apply(obj, arguments) // 4： 执行函数中的代码
    	return typeof result === 'object' ? result : obj // 5： 返回的值必须为对象
    }
    

    // call 方法实现  
    // call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
    // 原理：将调用者的方法复制一份放到content内执行，执行完毕后删掉放入的内容消除痕迹。
    // 将原来的对象浅拷贝一份然后执行，执行完毕后还原
     Function.prototype.myCall = function (context = window, ...arg) {
         if (typeof context != 'object' && this instanceof Function) {
            // 如果调用者不是一个函数的话报错，阻止程序运行
            throw new Error(`${this}.call is not a function`)
        }
         context = context || window // 指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
         let fn = Symbol() // 创建一个唯一值
         context[fn] = this // 给context对象内的fn方法绑一个方法(调用myCall的函数方法)
         const result = context[fn](...arg) // 执行这个方法
         delete context[fn] // 清除这个方法在context中的影响
         return result //使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。
     }
    // apply方法实现
    // 和call的区别就是参数类型不同，其他的一致
    Function.prototype.myApply = function (context = window, args) {
        if (typeof context != 'object' && this instanceof Function) {
            // 如果调用者不是一个函数的话报错，阻止程序运行
            throw new Error(`${this}.call is not a function`)
        }
        if(!args) {
            return Infinity
        }
        if (!Array.isArray(args)) {
            throw new Error('CreateListFromArrayLike called on non-object')
        }
        context = context || window
        const fn = Symbol()
        context[fn] = this
        const result = context[fn](...args)
        delete context[fn]
        return result
    }
    
    // bind 方法实现
    // bind() 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数
    // 利用闭包保存变量，执行的时候再释放。浅拷贝组合函数执行完后把执行完的函数保存在闭包里面返回
      Function.prototype.bind = function(context) {
          //返回一个绑定this的函数，我们需要在此保存this
          let self = this
          // 可以支持柯里化传参，保存参数
          let arg = [...arguments].slice(1)
          // 返回一个函数
          return function() {
              //同样因为支持柯里化形式传参我们需要再次获取存储参数
              let newArg = [...arguments]
              console.log(newArg)
              // 返回函数绑定this，传入两次保存的参数
              //考虑返回函数有返回值做了return
              return self.apply(context, arg.concat(newArg))
          }
      }
    
    ```
    
    

## 2. 实现`(5).add(3).minus(2)`,使其输出结果为：6

考察点：关于类和实例以及在类的原型上构建方法，并且能够实现链式写法

```javascript
(function () {
    //每一个方法执行完都要返回一个NUMBER这个类的实例，这样才可以继续调用NUBMBER类原型中的方法
    function check(n) {
      n = Number(n);  
      return isNaN(n) ? 0 : n;
    };
    
    function add(n) {
        n = check(n);
        return this + n;  //this 不能当作变量赋值，所以不能这样写：this += n
    };
    
    function minus(n) {
        n = check(n);
        return this - n;
    };
    ["add","minus"].foreach(item => {
        Number.prototype[item] = eval(item);
    })
}())
```



## 3.性能测试(只供参考)

任何的代码性能测试都是和测试的环境有关系的，例如CPU、内存、GPU等电脑的当前性能不会有相同的情况，不同浏览器也会导致性能上的不同

1. console.time  可以测试出一段程序执行的时间

```javascript
console.time('A');
for(let i=0; i < 10000; i++) {
}
console.timeEnd('A')
```

2. console.profile()  在火狐浏览器中安装firebug可以更精准的获取到当前程序的每一个步骤所消耗的时间



## 4. 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

1. 箭头函数和普通函数的区别

   + 箭头函数语法比上普通函数更加简洁，(es6中每一种函数都可以使用形参赋默认值和剩余运算符)

   + 箭头函数没有自己的this，它里面的this是继承函数上下文的this，使用call/apply 等任何方式都无法改变this的指向

   + 箭头函数中没有ARGUMENTS（类数组），只能基于 ...ARG获取传递的参数集合（数组）

   + 箭头函数不能被new执行（因为：箭头函数没有自身的this，也没有prototype）

   + ```javascript
     function fn(x) {
         return function (y) {
             return x + y
         }
     }
     let fn = (x) => {
         return y => {
             return x + y;
         }
     } 
     let fn = x => y => x + y
     
     
     function fn() {
     	console.log(arguments);
     }
     fn(1,2,3,4);
     
     //箭头函数实现arguments的方法，利用扩展运算符
     let fn = (...arg) => console.log(arg);
     fn(1,2,3,4)
     ```



> 每一个函数都是Function的实例

##  5. 回调函数 

1. 什么是回调函数
   + 把一个函数作为实参传递给另一个函数，另一个函数在执行的时候，可以把传递进来的函数执行n次（执行n次，可传值，可该this，还可以接收返回值）

```javascript
function each(arr, callBack) {
    for (let i = 0; i < arr.length; i++) {
       	let flag = callBack.call(arr, arr[i], i);
        //接收回调函数的返回结果，如果是false 我们结束循环
        if (flag === false) {
            break;
        }
    }
};
each([10, 20, 30, 40], function (item, index) {
    // this 指向原始数组
    if (index > 1) {
        return false
    }
});


/*
* 自己封装的一个each方法
*/
function each(callback, obj) {

    for (var i = 0; i < this.length; i++) {
        callback(this[i], i);
    }
};
Array.prototype.each = each;


let a = [1,2,3,4,5];
a.each((item, index) => {
    console.log(item + "+" + index);
})
```

##  6. 如何把一个字符串的大小取反（大写变小写，小写变大写）

```javascript
let str = "skafjdkljsadkfjskdfHLKHJKLHJ后来看到就安分卡拉季!2132131";
str = str.replace(/[a-zA-Z]/g, content => {
    // content为每一次正则匹配的结果
    //思路1： 把字母转换为小写，看下是否和之前一样，如果一样之前的也是小写
    return return content.toUpperCase() === cont··      象的相关构造函数加载到类加载器（内存空间）里面去，通过类加载器在内存里面先开辟空间，建一个对象，放在开辟的空间里，左边开辟了一个小的空间，把右边实例的引用地址给左边

```

## 7. js原生ajax

```javascript
/*
*封装一个自己的ajax函数
*有5个参数，最后一个参数可选
*
* @param options.method(必选)    请求方式： get post
* @param options.url(必选)       请求地址
* @param options.data(必选)      请求携带数据
* @param options.callback(必选)  接收数据
* @param options.type(可选)      指定请求类型：
*/
// method, url, data, callback, type
function myAjax( options ) {
	// 创建兼容 XMLHttpRequest 对象
  var xhr;
  if (window.XMLHttpRequest) {  //IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }

  //给请求添加状态变化事件处理函数
	xhr.onreadystatechange = function (){
		//判断状态码
		if(xhr.status==200 && xhr.readyState==4){
			//根据type参数，判断返回的内容需要进行怎样的处理
			if(options.type == 'json'){
				//获得 json 形式的响应数据，并使用parse方法解析
				var res = JSON.parse(xhr.responseText);
			}else if(options.type == 'xml'){
				//获得 XML 形式的响应数据
				var res = responseXML;
			}else{
				//获得字符串形式的响应数据
				var res = xhr.responseText;
			}
			//调用回调函数,并将响应数据传入回调函数
			options.callback(res);
		}
  };
  //判断data是否有数据
	var param = '';
	//这里使用stringify方法将js对象格式化为json字符串
	if(JSON.stringify(options.data) != '{}'){
		options.url += '?';
		for(var i in options.data){
			param += i + '=' + options.data[i] + '&';   //将js对象重组，拼接成url参数存入param变量中
		}
		//使用slice函数提取一部分字符串，这里主要是为了去除拼接的最后一个&字符
		//slice函数：返回一个新的字符串。包括字符串从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。
		param = param.slice(0,param.length-1);
	}

	//判断method是否为get
	if(options.method == "get"){
		//是则将数据拼接在url后面
		options.url = options.url + param;
	}


	//初始化请求
	xhr.open(options.method, options.url, true);

	//如果method == post
	if(options.method == "post"){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//发送请求
		xhr.send(param);
	}else{
		//发送请求
		xhr.send(null);
	}
}

```

## 8. 编写代码实现图片懒加载

> 前端性能优化的重要方案
>
> ​	1. 通过图片或者数据的延迟加载，我们可以加快页面的渲染速度，让第一次打开页面的速度变快
>
> ​	2. 只有通过滑动到某个区域，我们才加载真实的图片，这样也可以节省加载的流量
>
> 处理方案
>
> 	1. 把所有需要延迟加载的图片用一个盒子包起来，设置宽高和默认的占位图
>
>    	2. 开始让所有的img的src为空，把真实的图片地址放到img的自定义属性上，让img隐藏
>       	3. 等待所有其他资源都加载完成后，我们再开始加载图片
>          	4. 对于很多图片，需要当页面滚动的时候，当前图片区域完全显示出来后，再加载真实图片
>             	5. ...

1. 单张图片

```html
<style>
    * {
			margin: 0;
			padding: 0;
		}
		.imgBox {
			margin: 1000px auto;
		}
		.imgBox,img{
			width: 300px;
			height: 300px;
			background-color: gray;
		}
		img {
			display: none;
		}
</style>
<body>
    <div class="imgBox">
		<img src="" alt="" data-img="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572587579&di=b2576ba259c0eaa90ea79a84b9a5f365&src=http://www.lgstatic.com/thumbnail_300x300/i/image/M00/A2/0C/Cgp3O1ipEhKAM_lwAAAs_vlUoqM183.jpg">
	</div>
</body>	
<script>
    let $imgBox = $('.imgBox'),
		$img = $imgBox.children('img');
		$window = $(window);   // 每次创建都会创建一个jQuery的新实例，所以一起创建，然后保存起来就可以避免这个问题

	// JQ中的事件绑定支持多事件绑定： window.onload & window.onscroll  两个事件触发的时候执行相同的事件
	$(window).on('load scroll', function(){
		if ($img.attr('isLoad')=== 'true') {
			//之前加载过就不会重新加载
			return;
		}
		let $A = $imgBox.outerHeight() + $imgBox.offset().top,
		 	$B = $window.outerHeight() + $window.scrollTop();
		 	if ($A <= $B) {
		 	 	//加载真实图片
		 	$img.attr('src', $img.attr('data-img'));
		 	$img.on('load', function (){
		 	 		// 加载成功 : fadeIn是jq中的渐现动画
		 	 	// $img.css('display', 'block');
		 	 	$img.stop().fadeIn()
		 	})
		 	$img.attr('isLoad', true); // attr存储的自定义属性值都是字符串格式 “true”
		}
	});
</script>
```

2. 多张图片

```js
	let $container = $('.container'),
		$imgBoxs = null,
		$window = $(window);


	let str = '';
	// fill 方法是填充的意思，在数组中填充null
	new Array(20).fill(null).forEach(item => {
		str += `<div class="imgBox">
			<img src="" alt="" data-img="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572587579&di=b2576ba259c0eaa90ea79a84b9a5f365&src=http://www.lgstatic.com/thumbnail_300x300/i/image/M00/A2/0C/Cgp3O1ipEhKAM_lwAAAs_vlUoqM183.jpg">
		</div>`;
	})
	$container.html(str);
	$imgBoxs = $container.children('.imgBox');
	$window.on('load scroll', function(){
		
		// $B获取浏览器地边框距离BODY的距离
		let $B = $window.outerHeight() + $window.scrollTop();
		// 循环每一个区域，根据自己区域距离BODY的距离，计算出里面的图片是否加载
		$imgBoxs.each((index, item) => {
			let $item = $(item),
				$itemA = $item.outerHeight() + $item.offset().top,
				isLoad = $item.attr('isLoad');


			if ( $itemA <= $B && isLoad !== 'true') {
				let $img = $item.children('img');
				
				$item.attr('isLoad', true);
				// 加载当前区域的图片
				$img.attr('src', $img.attr('data-img'));
				$img.on('load', function(){
					$img.stop().fadeIn();
				});
			}
		});
	})
```

## 9 .实现一个$attr(name,value)

```javascript
function $attr(property, value) {
    //获取当前页面所有的标签
    let elements = document.getElementsByTagName("*"),
        arr = [];
    elements = Array.from(elements); //把非数组转换为数组
    elements.forEach(item => {
        // 存储的是当前元素property对应的属性值
        let itemValue = item.getAttribute(property);
        if (property === 'class') {
            // => 样式属性名要特殊处理，因为里面可能有多个值
            new RegExp("\\b"+ value + "\\b").test(itemValue) ? arr.push(item) : null;
            return;
        }
        if (itemValue === value) {
            // 获取的值和传递的值校验成功： 当前就是我们想要的
            arr.push(item);
        }
    })
    return arr;
}
```



## 正则

```js
^  以......开头
$  以......结尾
(?!)  负向预查  不能为......
(?=)  正向预查	一定为......
```



```js
// 编写一条正则，用来验证此规则： 一个6~16的字符串，必须同时包含大小写字母和数字
// ?! 负向预言 不可以为......
let reg = /^(?![a-z]+$)(?![A-Z]+$)(?![0-9])[a-zA-Z0-9]{6,16}$/;
```

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`exec`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) | 一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回 null）。 |
| [`test`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) | 一个在字符串中测试是否匹配的RegExp方法，它返回 true 或 false。 |
| [`match`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) | 一个在字符串中执行查找匹配的String方法，它返回一个数组，在未匹配到时会返回 null。 |
| [`matchAll`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) | 一个在字符串中执行查找所有匹配的String方法，它返回一个迭代器（iterator）。 |
| [`search`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search) | 一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。 |
| [`replace`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) | 一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。 |
| [`split`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) | 一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 `String` 方法。 |

## 数组



## ES6

​                                                                                                                                                                                                                                                                      

## 兼容问题

3. 事件兼容的问题，我们通常需要会封装一个适配器的方法，过滤事件句柄绑定、移除、冒泡阻止以及默认事件行为处理 

   ```javascript
    var  helper = {}
   
    //绑定事件
    helper.on = function(target, type, handler) {
    	if(target.addEventListener) {
    		target.addEventListener(type, handler, false);
    	} else {
    		target.attachEvent("on" + type,
    			function(event) {
    				return handler.call(target, event);
    		    }, false);
    	}
    };
   
    //取消事件监听
    helper.remove = function(target, type, handler) {
    	if(target.removeEventListener) {
    		target.removeEventListener(type, handler);
    	} else {
    		target.detachEvent("on" + type,
    	    function(event) {
    			return handler.call(target, event);
    		}, true);
        }
    };
   ```

   5. new Date()构造函数使用，'2018-07-05'是无法被各个浏览器中，使用new Date(str)来正确生成日期对象的。 正确的用法是'2018/07/05'.

   6. 获取 scrollTop 通过 document.documentElement.scrollTop 兼容非chrome浏览器 

      ```javascript
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      ```

      

### 浏览器 hack

快速判断 IE 浏览器版本

```
 <!--[if IE 8]> ie8 <![endif]-->
 
 <!--[if IE 9]> 骚气的 ie9 浏览器 <![endif]-->
复制代码
```

判断是否是 Safari 浏览器

```
 /* Safari */
 var isSafari = /a/.__proto__=='//';
复制代码
```

判断是否是 Chrome 浏览器

```
 /* Chrome */
 var isChrome = Boolean(window.chrome);
```

### 性能优化问题：

for 循环每一次循环都查找了数组 (arr) 的.length 属性，在开始循环的时候设置一个变量来存储这个数字，可以让循环跑得更快：

for (var i = size, length = arr.length; i < length; i++) {}

**你如何从浏览器的URL中获取参数信息**

浏览器宿主环境中，有一个location对象，同时这个对象也是window对象和document对象的属性。

location对象中提供了与当前窗口加载的文档有关的的信息，即URL信息。

如 https://www.baidu.com/api/sousu?search=baidu&id=123#2

location.href: 完整URL

location.protocol: 返回协议（https:）

location.host: 返回服务器名称和端口号（[www.baidu.com](http://www.baidu.com/)）

location.hostname: 返回服务器名称（[www.baidu.com](http://www.baidu.com/)）

location.port:返回服务器端口号（http默认80，https默认443）

location.pathname:返回URL中的目录和文件名（api/sousu）

location.search:返回查询字符串（?search=baidu&id=123#2）

location.hash:返回hash值（#2）



## 基础

基础类型

数值存储在堆内存

引用类型

数值存储在栈内存，标识符和指针存储在栈内存



#### Number类型

float 精度丢失问题

计算机所有的操作最终都需要转换为二进制，十进制小数部分转换为二进制的方式是先将小数部分不断乘2（无限小数），并取整数部分的值，直到小数部分为零为止，然后再将得到的小数转换成二进制小数，有限空间无法存储无限数据，这就需要 转换为二进制指数格式 ，使小数点左移或者右移，最后提取数值，进行数值截取，导致精度丢失



```jsx
function createCORSRequest(method,url){
        var xhr=new XMLHttpRequest();
        if("withCredentials" in xhr){
            xhr.open(method,url,true);
        }else if(typeof XDomainRequest != "undefined"){//IE10之前的版本使用XDmainRequest支持CORS
            xhr=new XDomainRequest();
            xhr.open(method,url);
        }else{
            xhr=null;
        }
        return xhr;
    }
    var request=createCORSRequest("get","待访问的地址");
    if(request){
        request.onload=function(data){
            //do sth
        };
        request.send();
    }   
```

## 浏览器事件模型的三个阶段

1. 捕获阶段

2. 目标阶段

3. 冒泡阶段

# 跨域问题总结

### 1.为什么会有跨域这个问题？

   > 原因是浏览器为了安全，而采用的同源策略（Same origin policy）

### 2.什么是同源策略？

    1. 同源策略是由Netscape提出的一个著名的安全策略，现在所有支持JavaScript 的浏览器都会使用这个策略。
    2. Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。
    3. 所谓同源是指：协议，域名（IP），端口必须要完全相同
       即：协议、域名（IP）、端口都相同，才能算是在同一个域里。

备注：规则举例如下(假设已有网站地址为：http://study.cn)
![Alt text](https://s2.ax1x.com/2019/01/26/knAIit.png)

### 3.没有同源策略的危险场景：

危险场景：

> 有一天你刚睡醒，收到一封邮件，说是你的银行账号有风险，赶紧点进www.yinghang.com改密码。你着急的赶紧点进去，还是熟悉的银行登录界面，你果断输入你的账号密码，登录进去看看钱有没有少了，睡眼朦胧的你没看清楚，平时访问的银行网站是www.yinhang.com，而现在访问的是www.yinghang.com，随后你来了一条短信，钱没了，这个钓鱼网站做了什么呢？大概是如下思路：

	<iframe id="baidu" src="https://www.baidu.com"></iframe>
	
	<script type="text/javascript">
	  const iframe = window.frames['baidu']
	  const inputNode = iframe.document.getElementById('输入敏感信息的input的id')
	  console.log(inputNode.value)
	</script>

### 3.非同源受到哪些限制？

    1. Cookie不能读取；
    2. DOM无法获得；
    3. Ajax请求不能发送

### 4.如何在开发中解决跨域问题：

**1.JSONP解决发送请求跨域问题：**

> 要明确的是：JSONP不是一种技术，而是程序员“智慧的结晶”（利用了标签请求资源不受同源策略限制的特点）
> JSONP需要前后端人员互相配合。

前端页面写法：

		<body>
		  <button id="btn">按钮</button>
		  <script type="text/javascript">
		    var btn = document.getElementById('btn');
		    btn.onclick = function () {
		      //1. 创建一个script标签
		      var script = document.createElement('script');
		      //2. 设置回调函数
		      window.getData = function (data) {
		        console.log(data);//拿到数据
		      }
		      //3. 设置script标签src属性，填写跨域请求的地址
		      script.src = 'http://localhost:3000/jsonp?callback=getData';
		      //4. 将script标签添加到body中生效
		      document.body.appendChild(script);
		      //5.不影响整体DOM结构，删除script标签
		      document.body.removeChild(script);
		    }
		  </script>
		</body>

后端写法：

	app.get('/jsonp', (req, res) => {
	  //解构赋值获取请求参数
	  const {callback} = req.query
	  //去数据库查找对应数据
	  const data = [{name: 'tom', age: 18}, {name: 'jerry', age: 20}];
	  res.send(callback + '(' + JSON.stringify(data) + ')');
	})

**2.后台配置cors解决跨域**

	以Node为例：
	res.set('Access-Control-Allow-Origin', 'http://localhost:63342');

**3.使用代理服务器**
	

	例如：nginx等

# iframe跨域的几种常用方法

# 背景

随着业务的发展，自然地会有一些公共的业务被抽离成为公共组件共各个项目使用。但是由于各个项目用到的技术栈都有所不同，所以这个公共组件就不能方便地被引用了。为解决这个问题，我们把这个组件写成了单独的页面挂到一个域名下，其他项目采用iframe或者webview的方式去加载这个页面，从而实现功能的简单复用。
不过这过程中也产生了很多问题，单是跨域就会出现好几次了。以下我将会介绍我遇到的跨域问题以及一些解决方法。

# 场景

最近在做一个需求，需要用iframe引入一个别人封装好的类似视频播放器的东西。iframe里面有一个全屏的按钮，点击后需要页面让iframe全屏，由于受到同源策略的限制，iframe无法告诉页面全屏。

# 解决办法

## 设置domain

document.domain作用是获取/设置当前文档的原始域部分，同源策略会判断两个文档的原始域是否相同来判断是否跨域。这意味着只要把这个值设置成一样就可以解决跨域问题了。
在此我将domain设置为一级域名的值，a页面url为a.demo.com，a页面中iframe引用的b页面url为b.demo.com，具体设置为

```
document.domain = 'demo.com'
复制代码
```

设置完之后，在a页面的window上挂载使iframe全屏的方法

```
// a页面
window.toggleFullScreen = () => {
    // do something
}
复制代码
```

在b页面上可以直接获取到a页面的window对象并直接调用

```
// b页面
window.parent.toggleFullScreen()
复制代码
```

但是这个值的设置也有一定限制，只能设置为当前文档的上一级域或者是跟该文档的URL的domain一致的值。如url为a.demo.com，那domain就只能设置为demo.com或者a.demo.com。因此，设置domain的方法只能用于解决主域相同而子域不同的情况。

## 使用中间页面

我们还可以使用一个与a页面同域名但不同路由的c页面作为中间页面，b页面加载c页面，c页面调用a页面的方法，从而实现b页面调用a页面的方法。具体操作如下：
在a页面的node层新开一个路由，此路由加载一个c页面作为中间页面，c页面的url为a.demo.com/c。c页面只是一个简单的html页面，在window的onload事件上调用了a页面的方法。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <script>
        window.onload = function () {
            parent.parent.toggleFullScreen();
        }
    </script>
</body>
</html>
复制代码
```

由于c页面和a页面是符合同源策略的，所以可以避开跨域问题，执行全屏的方法。

## postmessage

window.postMessage方法可以安全地实现跨源通信，写明目标窗口的协议、主机地址或端口就可以发信息给它。

```
// b页面
parent.postMessage(
    value,
    "http://a.demo.com"
);
复制代码
// a页面
window.addEventListener("message", function( event ) {
    if (event.origin !== 'http://b.demo.com') return;
    toggleFullScreen()
 });
复制代码
```

为了安全，收到信息后要检测下event.origin判断是否要收信息的窗口发过来的。

# 总结

通过以上的方法，我们就可以和iframe自由通信啦。



## 发布订阅（publish-subscribe）

### DOM0和DOM2

1. 语法上的区别
   box.onclick = function() {}
   box.addEventListener('click',function(){})
2. 底层运行机制上的区别
   DOM0就是给元素的某个属性绑定方法（有效绑定的方法只有一个）
   DOM2是基于事件池中的事情 => 发布订阅其实就是模拟的事件池机制（可以给一个元素的某个事件绑定多个不同的方法）
3. DOM2中可以给一些特殊的事件类型绑定方法，这些事件类型DOM0不支持，例如：DOMContentLoaded、transitioned...
   $(document).ready() => $(function(){})   DOM2，DOM结构加载完后触发
   vs
   window.onload    DOM0，当页面所有资源加载完后才会触发

#### DOM2的事件池机制  DOM事件的传播有三个阶段：捕获、目标、冒泡

1. 基于addEventListener/attachEvent(IE6~8) 向事件池中追加方法：新版本浏览器会根据元素和事件类型对新增的方法做重复校验，但是IE6~8不可以
2. 当事件行为触发，会把事件池中的方法按照增加的顺序依次执行，但是IE6~8中执行的顺序是不固定的





## export 

这是node中向外暴露成员的形式

module.exports = {}



```js
//export.js
//1.
export var a = 1;
//2.
var b = 2;
var c = 3;
export {b,c};
//3.
export var ajson = {name:1}

//4.
var bjson = {name: 2};
export {bjson};
//5.
export function afunc(){
    
}
//7
bfunc() {
    
}
export {bfunc}
//6
export default b;


//import.js
import default, {a,b,c} from "export.js" 
```

## 2. 变量声明

const 定义的值是否可以改变：

const 是用来定义常量的，定义的时候一定要初始化，且定义后不能修改，但是由于 const 保存的只是一个值在内存中存储地址的指针，只要指针不变，就不会报错，所以基本类型定义后是不可以修改的，但是由于引用数据类型，比如对象引用类型，其内的部分属性改变，但是由于存储地址不变，指针指向的内存地址也没有改变，是合法的。如果重新创建属性名和值都是一样的对象，由于这个是重新开辟了一个内存空间，是需要修改指针指向的，所以是不被允许的

## 1.  函数

### 1.1 函数声明

```javascript
// es5
function func() {}  //普通函数
function () {} 		//匿名函数
// es6 
()=>{}  			//箭头函数
```

### 1.2 函数表达式（函数字面量）

```javascript
// es5
var func = function() {}
// es6
let func = () => {}
```

### 1.3 构造函数

```javascript
const sum = new Function('a', 'b', 'return a + b' )
```

### 1.4 三种函数的对比

jsonp 访问数据格式

http://localhost:8080/vue/jsonp?name1=name12312&callback=_jsonpvqdyx1cfxcn

![1571220520136](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1571220520136.png)

jsonp:

1. 创建一个不重复的callback方法名
2. 动态将请求参数和callback=不重复的方法名 拼接到url作为尾缀
   1. 带参url：http://ip:port/uri?p1=pv1 ===> 只要添加&p2=p2value
   2. 不带参url：http://ip:port/uri ===> 1. 第一个参数：?p1=pv1  2. 第二个及第二个以上的参数：&p2=pv2
3. 动态创建一个script标签
4. scriptb标签的src属性赋值内容为接口url
5. ![1571221733093](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1571221733093.png)
6. 动态将script标签挂载到文档流里面
   1. 一旦挂载上去，就会立马请求，请求成功，立马以“callback(参数)”形式返回响应信息，并且返回客户端的时候，立马以js的形式运行
7. 请求执行结束后要动态地删除callback方法，script节点，做到悄悄的来，悄悄地走



闭包->内部空间变量传递,能够访问到不同作用于的变量和环境
好处：能够延长局部变量的生命周期
缺点：延长变量时间，增加内存消耗

基本闭包写法
function f1(){
    let timer = 10;
    return function(){
        return timer;
    }
}
let fn = f1()
fn();

以内存空间的角度就会比较容易理解一点`



递归模式->一直重复调用自己



沙箱->自调用函数

## 冒泡和事件委托

阻止冒泡的三种方法：
	

	event.stopPropagation()

事件处理过程中，阻止了事件冒泡，但不会阻击默认行为


	return false

事件处理过程中，阻止了事件冒泡，也阻止了默认行为

	event.preventDefault()

事件处理过程中，不阻击事件冒泡，但阻击默认行为


通过事件委托，批量委托父级代理事件

## localStorage

尽量把对象存入其中   





# Array.prototype.shift.call(arguments) 和 arguments.shift()

arguments是个伪数组,，借用Array上的方法操作arguments数据