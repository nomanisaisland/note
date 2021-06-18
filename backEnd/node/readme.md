# node
是一个运行环境，js构建后台的运行环境




### 1.3.1 node.js  有什么特点

> 1）异步非阻塞式的I/O （I/O线程池）input output
>
> 2）特别适用于I/O密集型应用  （密集型：频繁的I/O操作） 请求多（对数据库的读写量大）
>
> 3）事件循环机制
>
> 4）单线程
>
> 5）跨平台


### 1.3.2 不足之处

> 1) 回调函数嵌套太多、太深（俗称回调地狱）
>
> 2）单线程，处理不好cpu密集型任务  响应多（服务器响应客户端）   这就是为什么同时很多人访问一个服务器的时候渲染速度会很慢

### 1.4 Node.js的应用场景

> 1) web服务API。
>
> 2）服务器渲染页面，提升速度
>
> 3）后端的web服务，例如跨域、服务器的请求


### node构建的服务器和java服务器的不同

> java服务器（多线程）：（请求慢的话浪费线程，但是响应块）
> 1）一个线程只为一个请求服务，请求完成，线程结束  （请求过多的解决方案--高并发，使用服务器集群，增加线程）
>
> Node（单线程）：（请求慢的话没有影响，但是响应慢）
> 1）一个线程为所有请求服务，



### node中函数的特点

> 1) node中任何一个模块（js文件）都被一个外层函数所包裹
>
> 使用arguments.callee方法可以查到外层函数，如果你写的代码没有函数体包着这个方法，需要用arguments.callee.toString()查询外层函数
>
> 外层函数console.log(arguments.callee.toString());：
>
> function (exports, require, module, __filename, __dirname) { console.log(arguments.callee.toString())

	exports：用于暴露模块
	require：用于导入模块
	module：用于暴露模块
	__filename：当前文件的绝对路径
	__dirname：当前文件所在文件夹的绝对路径


> 2) 为什么要有这个函数，这个函数的作用
>
>       1. 隐藏内部实现。
>        
>       2. 支持CommonJs的模块化



### Node中的global

> 1). 对于浏览器端而言，js由以下三部分组成
>
>       1. DOM---浏览器对象模型-----很多API（location，history）
>       2. BOM---文档对象模型------很多API（对dom的增删改查）
>       3. ES规范--------ES5，ES6，ES7

> 2). Node端js由几部分组成
>
>       1. 没有了BOM---因为服务器不需要
>       2. 没有了DOM---因为没有浏览器窗口
>       3. 几乎包含所有的js规范（alert没有）
>       4. 没有了window，但是取而代之的是一个叫做global（打印出来里面会显示很多配置）的全局变量。

tips： node中没有函数体包含的this指向的是一个空对象，浏览器中非严格模式指的是windows

### url和uri

统一资源



  ### [nvm下载无安装版](https://github.com/coreybutler/nvm-windows#installation--upgrades)

1）. D:\nodejs\dev\nvm  下解压nvm 

2）. 点击install.cmd配置文件，settings.txt加入以下代码保存在nvm目录下：

    root: D:\nodejs\dev\nvm
    path: D:\nodejs\dev\nodejs
    arch: 64
    proxy: none
    node_mirror: http://npm.taobao.org/mirrors/node/
    npm_mirror: https://npm.taobao.org/mirrors/npm/

3) .配置环境变量：
Ctrl + R 输入sysdm.cpl   

系统环境变量分别有NVM_HOME   NVM_SYMLINK  分别填写上面的root 和path路径

环境变量path上新建值%NVM_HOME% 和 %NVM_SYMLINK%

nvm v查看版本号


### [nodejs安装（二进制包）](http://nodejs.cn/download/)

nodejs解压到nvm目录下，名称以 V+【版本号】  命名，命令行使用 nvm use 【node版本号】

D:\nodejs\dev下会自动出现一个nodejs文件



    npm config get prefix   //查询当前node的全局路径
    
    npm config set prefix xxx  //设置环境变量的全局路径


### 安装npm

先在D:\nodejs\dev\nvm下创建一个npm文件夹

在命令行

    npm config set prefix D:\nodejs\dev\nvm\npm

查询C:\Users\93478下的.npmrc的路径是否和上面设置的一样，一样就没有问题

然后： 

    npm install npm -g 全局安装
    
    npm install [packagename] -g  //install的缩写i
    npm remove [packagename] -g //删除当前全局目录下的包，没有-g就是当前目录下的


>环境变量配置NPM_HOME
>
>`D:\nodejs\dev\nvm\npm`    
>path  
>
>`%NPM_HOME%` 


    npm -v  查看版本
    
    npm list npm -g  查看全局下是否有安装这个包


nrm镜像管理工具

    npm install nrm -g
    
    nrm ls 展示所有的可切换镜像地址
    
    nrm use [镜像名称]  切换镜像
    
    nrm test 测试镜像速度

nrm 运行报错internal/validators.js:124 throw new ERR_INVALID_ARG_TYPE(name, ‘string’, value);

```javascript
// nrm cli.js下  17行改为
const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
```





powershell 命令演示

    1. cd    / 当前根目录   ./当前目录      ../上级目录     3+ tab键联想快捷键
    2. dir/ls  查看当前目录列表
    3. mkdir 创建目录      echo 查看文件，没有就创建
    4. rm/del 删除文件
    5. clear/cls（clears screen）  清空当前控制台
    6. echo 内容 > 文件名扩展名


webstorm安装破解
    

    webstorm.exe.vmoptions
    webstorm64.exe.vmoptions
    
    以上两个文件添加以下路径：
    -javaagent:C:/Program Files/JetBrains/WebStorm 2018.2.5/bin/JetbrainsIdesCrack-4.2-release-sha1-3323d5d0b82e716609808090d3dc7cb3198b8c4b.jar
    
    E:\BaiduNetdiskDownload


    -javaagent:C:/Program Files/JetBrains/WebStorm 2018.2.5/bin/JetbrainsIdesCrack-4.2-release-sha1-3323d5d0b82e716609808090d3dc7cb3198b8c4b.jar
    
    E:\BaiduNetdiskDownload


​    
​    ThisCrackLicenseId-{
​    "licenseId":"ThisCrackLicenseId",
​    "licenseeName":"Rover12421",
​    "assigneeName":"",
​    "assigneeEmail":"rover12421@163.com",
​    "licenseRestriction":"For Rover12421 Crack, Only Test! Please support genuine!!!",
​    "checkConcurrentUse":false,
​    "products":[
​    {"code":"II","paidUpTo":"2099-12-31"},
​    {"code":"DM","paidUpTo":"2099-12-31"},
​    {"code":"AC","paidUpTo":"2099-12-31"},
​    {"code":"RS0","paidUpTo":"2099-12-31"},
​    {"code":"WS","paidUpTo":"2099-12-31"},
​    {"code":"DPN","paidUpTo":"2099-12-31"},
​    {"code":"RC","paidUpTo":"2099-12-31"},
​    {"code":"PS","paidUpTo":"2099-12-31"},
​    {"code":"DC","paidUpTo":"2099-12-31"},
​    {"code":"RM","paidUpTo":"2099-12-31"},
​    {"code":"CL","paidUpTo":"2099-12-31"},
​    {"code":"PC","paidUpTo":"2099-12-31"}
​    ],
​    "hash":"2911276/0",
​    "gracePeriodDays":7,
​    "autoProlongated":false}

R（receive）E(eval)P(print)L(loop)
    
js中的console和node中的console是两个不同的对象


退出REPL
    1. alt + f4
    2. .exit
    3. process.exit()
    4. 直接关掉命令行


 自执行匿名函数内部空间使用一次后自动销毁

    (function(){   }())  ~  ！  +   - 
    
    一个方法的执行一定是以 funcName() 运行的，（）是把方法转换为表达式

怎么判断一个方法是否存在？

    if(func){ console("存在") }


eval 用来执行字符串表达式


###全局作用域成员
    1）. global    
    2）. process
          1. argv 获取命令行脚本的各个参数组成脚本并返回数组
          2. on



### 箭头函数与普通函数的不同

箭头函数会改变this的指向，使用箭头函数后，它指向的不是当前事件的触发者
箭头函数中的this是在定义函数的时候绑定，而不是在执行函数的时候绑定。

普通函数在函数被调用的时候绑定所有的变量，this指的是函数本身



### 同步异步

1. 同步： 主动请求主动响应    一个线程一次请求只做一件事情  做完事情就销毁该线程
2. 异步：主动请求被动响应     一个线程做多个事情

### 多线程和单线程的区别

1. 多线程：同时做多件事情，但是需要时时切换线程
2. 单线程：一个时间段只能做一个事情


### 回调函数

创建一个函数给别人用，在函数事情处理好后返回结果。
自己创建的函数自己不用，给别人用，别人用完后给我一个结果就可以了。

### 阻塞 非阻塞

1. 阻塞：    针对响应    不管耗时不耗时都   卡住你
2. 非阻塞：   针对响应   不管耗时不耗时都   不都卡住你

### 事件驱动


### node处理高并发

请求进来后，node调度请求，把请求丢到一个队列里面，然后去处理其他请求，


### http请求一个资源

常规做法：http://ip(域名):端口/url    端口号如果是80可以不写

1. url  united resource location  统一资源定位符
2. uri united resource indenty  统一资源标识符
3. 一个url包含下面几个部分：
   1. url <==> 协议：//ip+端口+uri
4. 怎么去访问和定位到一个网络上的资源：
   1. ip：4段
   2. port：65536
   3. ip：定位到某台具体服务器
   4. port：定位到某台服务器上的某个具体的应用
   5. uri：定位到某台服务器上的某个具体的应用的某个资源


### nodemon 热更新 npm install nodemon -g

### node路由：相当于迎宾小姐，就是一个个ifesle

```javascript
if(uri == '/add'){
    
}
```




## 模块化编程

​    

### 包与包管理器

> 1）什么是包？
>
>     1. 我们电脑上的文件夹，包含了某些特定的文件，符合了某些特定的结构，就是一个包

> 2）一个标准的包，应该包含哪些内容？
>
>     1. package. json ------ 描述文件(包的“说明书”，必须要有! ! ! )
>     2. bin----------------- 可执行二进制文件
>     3. lib----------------- 经过编译后的js代码
>     4. doc----------------- 文档(说明文档、bug修复文档、版本变更记录文档)
>     5. test ------------- 一些测试报告

> 3)如何让一一个普通文件夹变成一个包?
>
>     1. 让这个文件夹拥有一个: package. json文件即可, 且package , json里面的内容要合法。
>     2. 执行命令: npm init
>     3. 包名的要求:不能有中文、不能有大写字母、不能与npm仓库上其他包同名。

> 4）npm与node的关系? (npm: node package manager ) 
>
>     1. 安装node后自动安装npm (npm是node官方出的包管理器，专门用于管理包)

> 5) npm的常用命令

#### 3.1 package包

> Node.js的包基本遵循CommonJs规范，包将一组相关的模块组合到一起，形成一组完整的工具。


> 包由包结构和包描述文件两部分组成。
>
> 1） 包结构：用于组织包中的各种文件
> 2） 包描述文件：描述包的相关信息，以供外部读取分析


##### 3.1.1包结构

> 包实际就是一个压缩文件，解压以后还原为目录。符合CommonJs规范的目录，应该包含如下文件：

----------

`
server.on('request', function(request,response){})
`
request 请求事件处理函数；需要接受两个参数：

1. Request请求对象
   请求对象可以用来获取客户端的一些请求信息，例如请求路径
2. Response 响应对象
   响应对象可以用来给客户端发送响应消息

response对象有一个方法：write可以用来给客户端发送响应数据
write可以使用多次，但是最后一定要使用end来结束响应，否则客户端会一直等待，**浏览器上面会一直打转**

一个请求对应一个响应，如果在请求过程中，已经结束响应了，则不能重复发送响应
没有请求就没有响应
`
response.write()   //不推荐这种方法发送响应数据
`
`
response.end("aaa")  //推荐这种方法，直接end的同时发送响应数据
`
绑定端口号，启动服务
`server.listen(300),function(){})`

### 数据编码

1. 在服务器默认发送的数据，其实是utf-8编码的内容
2. 但是浏览器不知道你是utf-8的内容
3. 浏览器在不知道的服务器响应内容编码的情况下会按照当前操作系统的默认编码去解析
4. 中文操作系统默认是 gbk
5. 解决方法就是正确的告诉浏览器我给你发送的是什么编码
6. 在http协议中，Content-Type就是用来告诉对方我给你发送的数据内容是什么类型的
   `
   response.setHeader('Content-Type','text/plain;charset=utf-8')
   response.setHeader('Content-Type','text/html;charset=utf-8')
   response.setHeader('Content-Type', 'application/json;charset=utf-8')
   response.end//支持两种数据类型数据，一种是二进制，一种是字符串
   `

> [Content-Type对照表](http://tool.oschina.net/commons)

除了使用Content-Type用来指定编码，也可以在html页面中通过 meta元数据来声明当前文本的编码格式，浏览器也会识别

`<meta charset="UTF-8">`


url：统一资源定位符，一个url其实要对应到一个资源的

		let myhttp = require('http');
		let fs = require('fs');
		let shigea;
		fs.readFile('诗歌.txt', function (err, data) {
		    shigea =  data.toString();
		});
		
		let webserver = myhttp.createServer();
		//listen 监 听一个3008端口的服务器
		webserver.listen('3000', function () {
		    console.log("服务器已启动");
		})
		// on实时检测这个服务器的变化
		webserver.on('request', function (request, response) {
		    //request客户端发送过来的所有内容，消息，头
		    //response就是服务器反馈过来的内容
		    // response.setHeader('Content-Type','text/plain;charset=utf-8')
		    // response.setHeader('Content-Type','text/html;charset=utf-8')
		    // response.write("I hear you");
		    // response.write("我收到你的信息了");
		    // response.write("<h1>i hear you</h1>");
		    // response.end();
		    // console.log(request.url)
		    if (request.url == "/html") {
		        response.setHeader('Content-Type', 'text/html;charset=utf-8')
		        response.write("<a>首页</a>");
		        response.end();
		    }
		    if (request.url == "/json") {
		        response.setHeader('Content-Type', 'application/json;charset=utf-8')
		        // response.write("{'name': '首页'}");
		        let json_a = {'name': '首页'};
		        response.end(json_a.stringify())                                 
		    }
		    if (request.url == "/shige") {
		        response.setHeader('Content-Type', 'text/plain;charset=utf-8')
		        response.write(shigea);
		        response.end();
		    }
		
		})

----------

## 发送文件中的数据

1.  结合fs发送文件中的数据
2.  Content-Type
    	不同资源对应的Content-Type是不以样的，图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
    	


		let myhttp = require('http');
		let fs = require('fs');
		let shigea;
		fs.readFile('诗歌.txt', function (err, data) {
		    shigea =  data.toString(); //data默认是二进制数据，toString()能转为我们认识的字符串
		});
		
		let webserver = myhttp.createServer();
		//listen 监 听一个3008端口的服务器
		webserver.listen('3000', function () {
		    console.log("服务器已启动");
		})
		// on实时检测这个服务器的变化
		webserver.on('request', function (request, response) {
		    //request客户端发送过来的所有内容，消息，头
		    //response就是服务器反馈过来的内容
		    // response.setHeader('Content-Type','text/plain;charset=utf-8')
		    // response.setHeader('Content-Type','text/html;charset=utf-8')
		    // response.write("I hear you");
		    // response.write("我收到你的信息了");
		    // response.write("<h1>i hear you</h1>");
		    // response.end();
		    // console.log(request.url)
		    //request.url就是端口号后面的路径
		    if (request.url == "/html") {
		        response.setHeader('Content-Type', 'text/html;charset=utf-8')
		        response.write("<a>首页</a>");
		        response.end();
		    }
		    if (request.url == "/json") {
		        response.setHeader('Content-Type', 'application/json;charset=utf-8')
		        // response.write("{'name': '首页'}");
		        let json_a = {'name': '首页'};
		        response.end(json_a.stringify())
		    }
		    if (request.url == "/shige") {
		        response.setHeader('Content-Type', 'text/plain;charset=utf-8')
		        response.write(shigea);
		        response.end();
		    }
		})



----------

### 模块

1. require是一个方法，作用就是用来加载模块
   1. 作用：
      1. 加载文件模块并执行里面的代码
       2. 拿到被加载的文件模块导出的接口对象
2. 在Node中，模块有三种：
   1. 具名的核心模块，例如：
      +  fs ：文件操作模块
         +  http：网络服务构建模块
         +  os：操作系统信息模块
         +  path：路径处理模块
   2. 用户自己编写的模块（.js文件）
      1. 相对路径必须加 ./ 
      2. 可以省略后缀名
3. 在Node中没有全局作用域，只有模块作用域
   1. 内部访问不到外部，外部也访问不到内部
      2. 默认都是封闭的
4. 既然是模块作用域，那如何让模块与模块之间通信
5. 有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要的是为了使用里面的某个成员



exports
使用方法：
				

		add.js:
		exports.add = function(){}	
		r.js:
		let a = require('add');
		a.add();



###http地址和端口的概念

1. ip地址用来定位计算机
2. 端口号用来定位具体的应用程序
3. 所有需要联网通信的应用程序都会占用一个端口号
4. 端口号的范围从0~65536之间
5. 在计算机中有一些默认的端口号最好不要去使用。例如：80
6. 我们在开发过程中使用一些简单好记的就可以了，例如：3000、5000等没有什么含义
7. 可以同时开启多个服务，但是一定要确保每个服务所占的端口号

### 代码规范

[javascript standard style](https://standardjs.com/readme-zhcn.html)
[airbnb javascript style guide](https://www.ctolib.com/mip/getjll-JavaScript-Style-Guide.html)

当你采用无分号的代码规范的时候，需要注意以下情况：

1. 当一行代码是以(、[、'开头的时候，则在前面补上一个分号用来避免一些语法解析错误，所以你会看到一些第三方的代码中一上来就以分号开头
   结论：无论你的代码是有分号还是无分号风格，都建议在(、[、' 前补 个分号



>return有两个作用:
>
>1. 方法返回值
>2. 阻止代码往后执行



### 读取文件目录

`
fs.readDir('/path',function(err,file){})
`
怎么把内容(目录名)存进文件或者取代文件中的某个内容，
模板语法：
let content = ``;
data = data.replace('文件中的标记', content)
发送响应：
res.end(data)  





### 在Node中使用模板引擎

+ art-templete   不仅可以在浏览器中使用，也可以在node中使用

  - npm install art-template --save 
+ script引入的话，模板script需要type='text/template' id='tpl'
+ script脚本语法 


+ let templete = require('art-templete')


		fs.readFile('./1.html',function(err,data){  //data默认是二进制
				templatte.render(data.toString(),{ //而模板引擎的render方法接受的是字符串 
					name: 'jack',
					...
				})													
		})



​		

### 《编写可维护的JavaScript》




### 服务端渲染页面和客户端渲染页面

ajax异步渲染的数据爬虫爬不到，服务端渲染的数据方面SEO爬取

+ 区别：

  - 客户端渲染不利于SEO搜索引擎优化 
  - 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
  - 真正的网站既不是纯异步也不是纯服务器渲染出来的
  - 例如京东的商品采用的是服务端渲染，目的是为了SEO搜索引擎优化，而他的商品品论列表为了用户体验，而且也不需要SEO优化，所以采用的是客户端渲染。


### 处理网站中的静态文件

浏览器收到服务端的资源数据后开始从上到下依次解析

+ 为了让目录结构更加清晰，我们约定，把所有的HTML文件统一放在views目录中

浏览器收到html响应内容后，就要开始从上到下依次解析，当在解析过程中，如果发现有
	`
	link
	script
	img
	iframe
	video
	audio
	`
	等带有src或则link的herf属性
	标签（具有外链的静态资源）的时候（a标签除外），浏览器会自动对这些静态资源发起新的请求

为了统一处理以上资源，我们约定把所有的静态资源都存放在pubilc目录中，一些外部引用包放在lib文件夹中

统一处理:
如果请求路径是以/public/开头的，则我们认为你要获取的public中的某个资源，所以我们就可以把请求路径当作文件路径来直接读取


哪些资源可以给用户访问，哪些不可以，我们可以通过代码来控制

注意：在服务器端中，文件的路径就不要写相对路径了，因为资源都是通过url标志来获取的，服务器已经开放了public目录,路径统一写/public/...
/在这里的意思是根路径的意思

#### 如果访问不存在的网页，跳到404页面

	let http = require('http');
	let fs = require('fs');
	
	http.createServer(function (req,res) {
	    let url = req.url;
	    if (url === '/') {
	        fs.readFile('./view/index.html',function(err,data){
	            if (err) {
	
	                res.setHeader('Content-Type','text/plain; charset=utf-8');
	            return res.end('404 not found')
	        }
	
	        res.end(data);
	    })
	
	} else if (url.indexOf('/public/') === 0) {
	    fs.readFile('.' + url,function (err,data) {
	        if (err) {
	            res.end('404 not found')
	        }
	        return res.end(data);
	    })
	} else {
	    fs.readFile('./view/404.html',function (err,data) {
	        if (err) {
	            return res.end('404 not found')
	        }
	        res.end(data)
	    })
	}
	}).listen(3000,function () {
	    console.log("服务器已启动！")
	})


### 处理表单get提交

以前表单是怎么提交的？

表单中的控件必须有name属性
表单提交分为：
	1. 默认提交方式
	2. 表单异步提交

action就是提交的地址，就是请求的url地址
method请求方法：

1. get
2. post


`
/comment?name=hhh&message=fff
`
对于这种表单请求提交的路径，由于用户填写的内容不确定，无法判断完整的路径

解决方法：只要判断请求路径是/comment的时候，我就判断你的请求过来了

		let url = require('url');
		let obj = url.parse('/comment?name=hhh&message=fff',ture);
		//true可以把转换出来的字符串再转换成对象，后续可以通过query（问号之后的部分）属性访问   pathname(不包含问号的部分)         
	
		res.end(JSON.stringify(obj.query))//以json数据形式响应评论部分



使用parse的目的：

1. 拿到对象化的query和pathname

### 如何通过服务器让客户端重定向

1. 状态码设置为302临时重定向
   +  `res.statusCode = 302`
2. 在响应头中通过location告诉客户端往哪重定向
   + `res.setHeader('Location','/') `

如果客户端发现收到的服务器响应的状态码是302就会自动去响应头中找location
所以你就看到客户端自动跳转了

一次请求对于一次响应，响应结束请求结束。.end()会结束响应



1. /index.html
2. 开发public目录中的静态资源
3. /post  post.html
4. /comment
   + 接受表单提交数据
     + 存储表单提交数据
     + 让表单重定向到/

       - statusCode
       - setHeader

### repl

read
eval
print
loop

### 在node中的模块系统

1. 什么是模块化
   + 文件作用域
   + 通信规则

     - 加载require
     - 导出exports

#### commonjs模块规范

在Nodejs中有一个很重要的概念，模块系统

+ 模块作用域
+ 使用require方法加载模块
+ 使用exports接口对象导出对象成员


1. 加载require
   `var 自定义变量名 = require('模块名')`
   两个作用：
   + 执行被加载模块的代码
   + 得到exports导出的接口对象
2. 导出exports
   + Node中式模块作用域，默认文件中所有的成员只在当前文件模块有效
   + 对于希望可以被其他模块访问的成员，我们把这些公开的成员挂载到exports接口对象上就可以

require加载规则：

+ 核心模块

+ 第三方模块（兄弟模块中的第三方包无法直接通过require('package')拿到）

+ 自定义模块

+ 优先从缓存加载

  ```main.js
  require a.js
  require b.js  //由于a.js中加载了，此出导入只会得到b中的接口对象，但是不会重复加载，这样做的目的时提高加载速率
  
  ```

  ```a.js
  console.log('加载了')
  require b.js
  
  ```

  ```b.js
  console.log('加载了')
  
  ```

  结果输出一个加载了

+ 判断模块标识（require（模块标识符））

  - 如果是非路径的模块标识：
    * ./
    * ../
    * /xxx (根路径下的xxx,几乎不用)
    * D:/a/d  （不用）
    * require('./a.js')
  - 核心模块（本质也是文件，不过已经编译到二进制文件中了，我们只需要引用就可以了） 
    * require('fs')
  - 第三方模块（使用的时候用require引入，不可能和核心模块同名，既不是核心模块也不是路径模块）
    * 先查找当前文件所处目录中的node_modules目录  （没有找到就往上级目录找。直到磁盘根部）
    * 找node_modules/第三方模块名
    * 找node_modules/第三方模块名/package.json
    * 找node_modules/第三方模块名/package.json内的main属性
    * main中记录了模块的入口文件（如果没有main则会直接找index.js,默认备选项）
    * 

exports是module.exports的引用：

				//在Node中，每个模块内部都有一个自己的module对象
				//在module对象中,有一个成员叫：exports也是一个对象
				//也就是说如果你需要对外导出成员，只需要把成员挂在到module的exports对象中
				//我们发现每次导出都需要通过module.exports....太麻烦了
				//node为了简化操作，专门提供了一个变量，module.exports等于exports 
		
				var module = {
					exports: {
					}
				}
				
				var exports = module.exports;  //当引用中断时，可以用这个建立引用
				//谁来require我，谁就得到module.exports
			
				//默认在代码最后一句有：
				return module.exports



当一个模块需要导出单个成员的时候
直接给exports赋值是不管用的
`exports = 'hello'`  
exports只是moudle.exports的一个引用，以上方式给exports重新赋值了，指向了新的对象


给exports赋值会断开和module.exports的引用，同理，给module.exports赋值也会断开和exports的引用：
`module.exports = "hello"
exports.foo = "world"`



#### TIPS

1. jQuery的each和js的foreach的区别
   + ES5提供的（不兼容ie8）
   + each有第三方库提供的(2以下的版本是兼容ie8)
   + 主要用于遍历jQuery实例对象(伪数组)
   + 可以作为低版本foreach的替代品
   + jQuery的实例对象不可以用foreach方法，如果需要使用必须转换成数组`[].slice.call(jQuery实例对象)`
2. 301状态码和302状态码的区别
   + 301 是永久重定向，浏览器会记住
   + 302是临时重定向




### npm

```shell
npm install --save jquery vue //通过空格同时下载多个包  --save会把包保存到包的依赖性，存在dependencies中，如果没有就不会保存

```

package.json  包描述文件  //可以通过npm init初始化出来


dependencies  依赖    保存第三方包的依赖信息

node_module文件删除了，使用npm install，也会根据package信息重新下载下来



npm升级
`npm install --global npm`


常用命令：
		

		npm init
		npm init -y //跳过向导
		npm install //只下载
		npm install --save  //下载并且保存依赖项
		npm i -S  //npm install --save简写
		npm uninstall //依赖性会依然保存
		npm uninstall --save //卸载包并删除依赖项


新版的npm初始化，会生成两个文件，要给package.json 一个 package-lock.json

#### package.json 和 package-lock.json

npm5以前没有package-lock.json

当你安装包的时候，npm都会生成或者更新package-lock.json文件

1. 5以后的版本安装包不用加`--save`参数，它会自动保存依赖性
2. 当你安装包的时候，会自动创建或者更新，package-lock.json文件
3. package-lock.json文件保存着所有`node_modules`中所有的信息（版本信息，下载地址），提高下载依赖速度
4. 从文件来看，有一个lock称之为锁，用来锁住依赖的版本
   + 如果项目依赖了1.1.1版本，没有package-lock.json的话install其实会下载该依赖的最新版本（package.json中不会更新版本信息，^代表可以升级到最新版本），有的话，就会锁定版本号，防止升级到新的版本

### nvm

node运行环境虚拟机。

node核心模块与nvm交互，nvm根据返回的node和操作系统底层交互，操作底层

### express（快速）

出现的原因：原生的http在某些方面不足以应对开发需求，所以使用框架提高效率，让代码更加统一。

1. 安装`npm i -S express`

2. 引包 `let express = require('express')`
   		
   let app = express();
   	//当服务器收到get请求 / 的时候执行回调处理函数
   	app.get('/',function(req,res){
   		res.send('hello express')
   	})

   ```javascript
   //当服务器收到get请求 / about的时候执行回调处理函数
   app.get('/about',function(req,res){  // callback 代表业务处理
   	res.send('hello about')
   })
   		
   //相当于server.listen
   app.listen(3000,function(){
   	console.log('服务器已启动')
   })
   
   ```

+ req: 请求体
  - 包含我们要的关于请求的所有东西：
    - cookie   需要引入`cookie-parser`这个中间件搭配使用
      - `const cookieparser = require('cookie-parser');        app.use(cookieparser());    	`
      - query   
    - header

+ res：响应体
  - res.end(str)   <==>  res.send
  - res.json(obj)
  - res.cookie(name,value[option])    设置cookie
  - 

#### 公开指定目录		

```javascript
app.use('/public/',express.static('./public'))  //public 这样会成为网站请求的公开资源的根路径，可以直接在url后面访问需要访问的页面（public内的）    
											//第一个路径（标识）是第二个路径的别名   
											//一般是标识和路径同名

```

静态服务：

```javascript
app.use(express.static('./public'))             //直接公开该目录，没有标识，加上./更清晰
// /public资源
app.use(express.static('public')) 

//访问必须/static/xxx 	
app.use('/static', express.static('public');  // 前面的是url标识，后面的是目录路径
//访问必须/public/xxx
app.use('/public', express.static('public');
        
app.use('/static', express.static(path.join(__dirname, 'public'))) //path 是一个核心模块需要引入该模块才能用 path.join,作用是可以把相对路径改为绝对路径。

```

####  path 路径操作模块

##### 引入

```javascript
const path = require('path')

```

##### 参数

```javascript
path.basename('C:/a/b/c/d.js');   // 获取该路径下的文件名（也就是 d.js）
path.basename('C:/a/b/c/d.js', '.js');   // 第二个参数会自动把js后缀名去掉（指定去除的后缀名），只拿到文件名（也就是 d）

path.dirname('C:/a/b/c/d.js');   // 获取路径当中的目录部分（也就是  C:/a/b/c/）

path.extname('C:/a/b/c/d.js');   // 获取路径下文件的扩展名（也就是 .js）

path.isAbsolute('C:/a/b/c/d.js');  // 判断一个路径是否是绝对路径（也就是说当前的结对路径结果会返回 true）

path.parse('C:/a/b/c/d.js');      // 把路径转换成对象，对象中包含路径的根目录、目录部分、包含后缀名的文件、后缀名以及文件名
// path.parse('C:/a/b/c/d.js') 的输出结果：
//{
//    root: 'c:/',
//    dir: 'C:/a/b/c/',
//    base: 'd.js',
//    ext: 'html',
//    name: 'd'
//}

//tip: window的路径分隔符为 \ ，mac为 / , 一个\表示转义，两个 \ 就可以正常表示路径了
path.join('c:/a', 'b')     // 把第一个参数和第二个参数的路径拼接成一个路径（也就是说输出结果为 c:\\a\\b），好处：防止手动拼接路径分隔符导致的小错误



```

可选参数：数量自己定

##### Node中的其他成员

在每个模块中，除了`require、exports`等模块相关API之外m，还有两个特殊的成员：

+ `__dirname` 可以用来获取当前文件模块所属目录的绝对路径，不受node执行路径影响
+ `__filename`可以用来获取当前文件的绝对路径，不受node执行路径影响

```javascript
// C:/a/b/d.js
console.log(__dirname)   // 输出C:/a/b
console.log(__filename)  // 输出C:/a/b/d.js

```

作用：动态

获取当前文件的文件目录路径和文件路径，你在哪里，路径就是哪里

##### 注意

文件操作路径问题中，相对路径设计的是相对于 node 命令所处的路径，所以在文件当中操作相对路径是不可靠的（不是bug，这样设计是有使用场景的）。为了解决这个问题，只需要把相对路径变为绝对路径就可以了

```javascript
//文档结构：
+ code
  + foo
	+ index.txt
    + index.js
  + app.js

//index.js
const fs = require('fs');

fs.readFile(path.join(__dirname, '/index.txt'), 'utf8', function(err, data) {
    
})
fs.readFile(__dirname + '/index.txt', 'utf8', function(err, data) {
    
})

// shell 命令行
xxxx/code: node foo\index.js 

// 此时__dirname相当于 code/foo
  

```

所以推荐使用多使用`path.join`拼接路径

##### 区分

模块中的路径标识就是相对于当前文件模块，不受执行 node 命令所处路径影响；

`const hh = require 'hh'`

引用模块时正常写就可以了，文件操作再按照上面的操作操作

#### 基本路由: 

路由器：

+ 请求方法
+ 请求路径
+ 请求处理函数

get:

```javascript
app.get('/',function(req,res){  //当你以GET 请求 / 的时候执行该请求对应的处理函数
    res.send('hello world')
})

```

post: 

```javascript
app.post('/',function(req,res){ //当你以POST 请求 / 的时候执行该请求对应的处理函数
    res.send('hello world')
})

```

路由的概念：当请求资源，对于该资源的函数，一对一的映射关系

```javascript
app
	.get('/', func);
	.get('/about', func);
	.post('/home', func)

```

模板引擎：

+ ejs
+ jade(pug)
+ handlebars
+ nunjucks

#### 在express中使用art-templete模板引擎

+ [art-templete](http://aui.github.io/art-template/express/)

安装：

```shell
npm install --save art-template
npm install --save express-art-template   //如果只是在浏览器中使用则不必下载该包

```

配置使用 art-template模板引擎： 

```javascript
app.engine('html', require('express-art-template'));  //第一个参数表示当渲染以.art结尾的文件的时候，使用 art-template模板引擎
												//express-art-template 是专门用来在express中把 art-template 整合到 express 中
												//虽然外面不需要加载 art-template 但是也需要安装，原因是 express-art-template 依赖了 art-template

```

Express 为 Response 相应对象提供了一个 render 方法，但是默认是不可以使用的，除非你配置了模板引擎

`res.render('模板名',{ 模板数据 })`    第一个参数不能写路径，默认会去项目中的views 目录查找文件

也就是说 Express 有一个约定：开发人员把所有的视图文件都放在 views 目录中:

```javascript
app.get('/', function (req, res) {
    res.render('index.html', {
        user: {
            name: 'aui',
            tags: ['html', 'template', 'nodejs']
        }
    }); 
});

index.html
<h1> {{ user.name }} </h1>

```

如果需要修改约定的 views 视图渲染存储目录，可以：

```javascript
app.set('views', render函数的默认路径);		//第一个参数表示被改目录，第二个是需要替换路径
app.set('views', path.join(__dirname, './views/'));

```

重定向：

```javascript
res.redirect('/')           //模板引擎方式

//普通js方式
res.statusCode = 302;
res.setHeader = ('Location', '/')

```

#### 在 Express 获取 GET 请求体数据：

get 请求是通过地址栏传参，且地址长度有限。

Express内置了一个API可以通过以下方法获取

`req.query`

#### 在 Express 获取 POST 请求体数据：

post请求参数不可视，post请求数据没有长度限制

默认没有提供相应的API，需要结合插件，express的中间件（middleware）

第一步：

```shell
npm install body-parser --save

```

第二步配置：

```javascript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// 配置bodyParser
//只要加入这个配置，则会在req 请求对象上多出一个属性 body
//我们可以通过req.body 来获取post的请求体数据
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

```

第三步使用：

```javascript
app.post('/post', function(req, res){ // /post 是路径标识，当以 POST 请求/post 路径的时候，处理指定的函数
   //1. 获取 POST 请求数据
   //2. 处理
   //3. 发送请求  
   // tip: req.qurey 只能拿get请求参数
    
   console.log(req.body);
})  		
					//这样的话，我们就可以利用不同的请求方法让一个请求路径请求多次

```

Express 中的send 方法和redirect方法会自动结束响应

#### express中的中间件

[中间件](http://www.expressjs.com.cn/resources/middleware.html)

+ 同一个请求所经过的中间件都是同一个请求对象和响应对象

  + ```javascript
    app.get('/a/b',function(req,res){
        req.foo = 'bar';
        next()
    })
    app.get('/a/b', function(req,res){
        console.log(req.foo);   // 输出结果是bar
    })
    
    ```

    

+ 中间件的本质就是一个请求方法，我们把用户从请求到响应的整个过程分发到多个中间件中去处理，这样做的目的是提高代码的灵活性，动态可扩展的

+ 匹配规则：从第一个开始匹配，如果第一个不匹配，就继续匹配下一个，如果匹配成功，没有调用`next`,就会停在这个中间件，如果由调用`next`就会继续向下匹配（注意，不是覆盖，是依次执行）

##### 应用程序级别的中间件

```javascript
app.use(function (req,res,next){   // 不关心请求路径请求方法，六亲不认，是请求就给进 万能匹配 next的作用是
    console.log('1');			 //防止程序堵塞	
    next()    //如果没有这个方法，浏览器发出请求后，直接进入这个方法，后面 /a /b 的请求就会被堵塞，加了这个方法可以让程序继续往下走
})
app.use('/a', function (req,res,next){
    console.log('1');
    next()
})
app.use('/b', function (req,res,next){
    console.log('1');
    next()
})

```

除了以上中间件之外，还有一种最常用的严格匹配请求方法和请求路径的中间件

##### 路由级别的中间件

```javascript
app.get('/',function(req,res,next){   // 严格请求路径为  /  use方法是以 / （路径）开头
    
})
app.post('/',function(req,res,next){   // 严格请求路径为  /  use方法是以 / （路径）开头
    
})

```

第三方中间件：

+ border-parser
+ compression
+ cookie-parser
+ morgan
+ response-time
+ serve-static
+ session

#### 全局处理错误中间件

```javascript
app.use('/',function(err, req, res, next){
    if (err) {
        next(err);
    }
})

app.use('/a',function(err, req, res, next){
    if (err) {
        next(err);
    }
})

// 配置一个全局处理错误中间件  统一处理错误 ， 上面的有错误，next(err)就可以， 让我来处理错误
app.use('/',function(err, req, res, next){
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})

```



### 文件操作路径和模块标识路径的问题

我们使用的所有的文件操作都是异步的

1. 文件操作路径的相对路径可以省略 ./ 
   + `fs.readFile('data/a.html',function())`
2. 模块加载中的路径 ./ 不能省
   + `require('./data/a.js')`



### node修改完代码后自动重启(热更新)

nodemon工具，基于nodejs开发的一个第三方开发工具
`npm install --gloabal nodemon`
安装完后使用：
`nodemon app.js`





### Express - [crud]()

#### 模块化思想

模块职责要单一

#### 起步

+ 初始化
+ 安装依赖
+ 模板处理

#### 路由设计：（使代码编写思路更加清晰）

| 请求方法 |     请求路径     | get参数 |          post参数           |     备注功能     |
| :------: | :--------------: | :-----: | :-------------------------: | :--------------: |
|   GET    |    /students     |         |                             |     渲染页面     |
|   GET    |  /students/new   |         |                             | 渲染添加学生页面 |
|   POST   |    /students     |         |   name、age、sex、hobbies   | 处理添加学生请求 |
|   GET    |  /students/edit  |   id    |                             |   渲染编辑页面   |
|   POST   |  /students/edit  |         | id、name、age、sex、hobbies |   处理编辑请求   |
|   GET    | /students/delete |   id    |                             |   处理删除请求   |



#### 路由功能存放问题

为了更好地模块化，把路由专门放在一个叫做  `router.js` 的文件中

使用路由容器挂载暴露路由给app.js

```javascript
//router.js
let express = require('express');
let fs = require('fs');
//创建一个路由容器
let router = express.Router();

//把路由都挂载到router容器中
router.get('/student',function (req, res){}); 
 //导出router
module.exports = router;

//app.js
let express = require('express');
let app = express();
//把路由容器挂载到 app 服务中
app.use(router);


//students.js
//数据操作文件模块
//职责：操作文件中的数据，只处理数据，不关心业务


/**
*获取所有学生列表
*/

/**
*添加保存学生
*/

/**
*更新学生
*/

/**
*删除学生
*/

```

app.js模块：

职责：

+ 创建服务

 + 做一些服务相关配置
   - 模板引擎
   - body-parser 解析表单 post 请求体
   - 提供静态资源服务
+ 挂载路由
+ 监听端口启动服务

router.js模块

职责：

	+ 处理路由
	+ 根据不同的请求方法+请求路径设置具体的路由


模块职责要单一，不要乱写

我们划分模块是为了增强项目代码可维护性

提升开发效率

#### 操作设计api的文件模块

```
//数据操作文件模块
//职责：操作文件中的数据，只处理数据，不关心业务
let fs = require('fs');

/** *获取所有学生列表 */
exports.find = function () {}

/** *添加保存学生 */
exports.save = function () {}

/** *更新学生 */
exports.update = function () {}

/** *删除学生 */
exports.delete = function () {}

```

#### 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取

```javascript
function fn(callback) {
    setTimeout( function() {
        var data = 'hello'
        callback(data)
    }, 1000)
}

fn(function (data) {
    console.log(data)
})

```

node精华所在，奥义部分：封装异步api

#### 编写添加更新删除学生案例的步骤

1. 处理模板
2. 配置开放静态资源
3. 配置模板引擎
4. 简单路由，/students渲染静态页
5. 路由设计
6. 提取路由模块
7. 由于接下来一系列操作都需要处理文件数据，所以需要封装student.js
8. 先写好student.js的文件结构
9. 关注细节，关注具体功能
   1. 通过路由收到请求
   2. 接收请求中的数据（GET、POST）
      + req.query
      + req.body
   3. 调用数据操作api处理数据
   4. 根据操作结果给客户端发送响应
      + 重定向或者跳转页面
10. 业务功能顺序

#### 注意

配置模板引擎和body-parser一定要在挂载路由之前 



```html
<!--用来放一些不希望被用户看到，但是需要提交到服务端的数据-->
<input type="hidden" value="{{ student.id }}" name="id">   //一定要有name否则不会提交表单数据

```



#### 回调函数（只是一种编程方式）

```javascript
function add (x, y, callback) {
    console.log(x);
    setTimeout(function () {
        let ret = x + y;
        callback(ret)  //实参
    }, 1000)
}

add(10, 20, function (ret) {  //这个ret是形参
    console.log(ret)
})

```



javascript天生不支持模块化，node.js才有；

浏览器中可以通过第三方库来使代码模块化：

	+ require.js    	AMD
	+ sea.js             CMD


支持的好处：

+ 模块作用域
+ 可以使用api来进行文件与文件之间的依赖加载



不支持的缺点

+ 使用script加载，还得考虑加载顺序

无论是Common.js、AMD、CMD、UMD、EcmaScript 6 Moudle官方规范都是为了解决js模块化问题

目前ES6规范支持了 模块化，但是js运行环境还不支持

Node也只是在8.5版本之后才开始支持EcmaScript 6 Moudle官方规范



目前前端很多都是用新技术，然后使用编译工具打包可以在低版本浏览器运行

ES6 ==》编译器 ==》ES5

app.use 不仅仅可以用来处理静态资源，还可以用来配置中间件



#### express如果返回404页面

对于没有设定的请求页面，会默认返回can not get xxx

如果需要定制404页面需要中间件配置



只需要在z自己的路由之后增加一个

```javascript
app.use(function (req, res) {
    //所有未处理的请求路径都会跑到这里
})

```

### MongoDB

+ 关系型数据库（sql）（图形界面软件Navicat premium）
+ 非关系型数据库（MongoDB）

关系型数据库：

1. 表就是关系或者说表与表之间存在的关系
2. 所有的关系型数据库都通过`sql`语言操作
3. 所有的关系型数据库在操作之前都需要设计表结构
4. 而且数据表还支持约束
   + 唯一的
   + 主键
   + 默认值
   + 非空

非关系型数据库（非常灵活）

1. 有的非关系型数据库就是`key-value`对
2. MongoDB是长得最像关系型数据库的非关系型数据库
   + 数据库 ==》数据库
   + 数据表 ==》集合（数组）
   + 表记录 ==》（文档对象）
3. MongoDB不需要设计表结构
4. 可以任意在里面存储数据，没有结构性一说



#### 安装

安装菜鸟教程安装就可以了



#### 启动数据库

打开cmd

```shell
# mongodb 默认使用执行 mongodb 命令所处盘符根目录下的 /data/db 作为自己的数据存储目录（你切换到d盘就在d盘下）
# 所以在第一次启动该执行命令前先自己手动创建一个 /data/db
mongod

```

想要修改默认的数据存储目录：

```shell
mongod --dbpath=数据存储目录路径

```

#### 停止：

Ctrl+c停止数据库，或者关闭该命令行

#### 连接

```shell
# 该命令默认连接本机的 mongodb 服务
mongo

```

#### 退出

```shell
# 在连接状态输入exit 退出连接
exit

```

#### 基本命令

```shell
# 查看所有数据库
show dbs  

# 切换到指定数据库，如果没有则新建一个
use 数据库名称

# 查看当前操作的数据库
db

# 插入数据
db.数据对象名称.insertOne({key:value})

# 查看表
show collections

# 查看数据内容
db.数据对象名称.find()

```



### 在node中如何操作数据库

#### 使用官方的包来操作

> https://github.com/mongodb/node-mongodb-native

	#### 使用第三方mongoose 来操作


mongoose 是第三方基于官方再次做了一次封装

> https://mongoosejs.com/

##### 下载

```shell
npm install mongoose

```

##### hello world

```javascript
const mongoose = require('mongoose');
//连接数据库，指定连接的数据库可以不用存在，当你插入第一条数据后会自动创建
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
//创建一个模型，在代码中设计数据库，让我们的编写过程变得异常简单。    第一个参数是表名cat， 表中存储了一个name为字符串的文档
const Cat = mongoose.model('Cat', { name: String });
//实例化一个Cat
const kitty = new Cat({ name: 'Zildjian' });
//持久化保存Cat实例
kitty.save().then(() => console.log('meow'));

```

##### 开发步骤之

##### 设计Schema 发布model

1. 连接数据库

2. 设计集合结构（表结构）

   ```javascript
   const mongoose = require('mongoose');
   
   //架构结构
   const Schema = mongoose.Schema;
   
   mongoose.connect('mongodb://localhost/test');
   
   // 设计集合结构（表结构）  字段名称就是表结构中的属性名称    值
   // 约束的目的是为了保持数据的完整性，不要有脏数据
   let blogSchema = new Schema({
       title: String,
       author: String,
       body: String,
       username: {
           type: String,
           required: true   //必须有
       },
       comments: [{ body: String, data: Data }],
       data: { type: Date, default: Data.now },  //default默认为
       hidden: Boolean,
       meta: {
           votes: Number,
           favs: Number
       }
   })
   
   ```

3. 将文档结构发布为模型

   ```javascript
   //将文档结构发布为模型
   //mongoose.model方法就是用来将一个架构发布为model
   //  第一个参数：传入一个大写名词单数字符串来表示你的数据库名称
   //              mongoose 会自动将大写名词的字符串生成  小写复数的集合名称
   //              例如这里的 Blog 最终会变成 blogs 集合名称
   //  第二个参数：架构 Schema
   //  返回值：模型构造函数
   let Blog = mongoose.model('Blog', blogSchema);
   
   ```

   

4. 当我们有了模型构造函数之后，就可以使用构造函数对 `bolgs`  集合中的数据为所欲为了

   

##### 新增数据

```javascript
let admin = new Blog({  
    title: '我的博客',
    author: '卢加锋',
	......
})

admin.save(function (err, ret) {
    if (err) {
        console.log('fail')
        console.log(err)
    } else {
        console.log('sucess')
        console.log(ret)
    }
})

```

##### 查找数据

```javascript
// 查询所有数据
User.find(function (err,ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret)
    }
})

// 按照条件查询所有数据
User.find({
    username: 'admin',
    password: '123456'  //查询用户名为admin并且密码为123456
}, function (err,ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret)
    }
})

User.find({
    $or: [   //查询用户名为admin或者昵称为123456的数据
        {username: 'admin'},
        {nickname: '123456'}     
    ]
}, function (err,ret) {
    if (err) {
        return res.status(500).json({
            err_code: 1,   // 这个在前端用fetch表示的就是 res.status === 1
            message: 'server error'
        })
    } 
    if (data) {
        return res.status(200).json('email or nickname aleary exists')
    }
    
    // res.status(200).json({   // 该方法接收一个对象作为参数，他会自动帮你把对象转为字符串
    //    success: ture		   // 然后再发送给浏览器
    //})					 // 此方法和下面的写法作用相同，这个方法是express自带的响应方法
    res.status(200).send(JSON.stringify({   // 给请求发送json格式的字符串，请求数据为json格式
        success: ture
    }))
})

// 按照条件查询单个数据
User.findOne({
    username: 'admin'
}, function (err,ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret)
    }
})

```

##### 删除数据

```javascript
// 按照条件删除所有数据
User.remove({
    username: 'admin'
},function (err, ret) {
    if (err) {
        console.log(err)
    } else {
        console.log(ret)
    }
})
// 根据条件删除一个
User.findOneAndRemove(conditions, [options], [callback])

// 根据id 删除一个
User.findByIdAndRemove(id, [options], [callback])


```

##### 更新数据(改)

```javascript
//根据条件更改所有数据
User.update(conditions,doc, [options], [callback])
//根据指定条件更改所有数据
User.update([conditions],[update], [options], [callback])
// 根据数据id改
User.findByIdAndUpdate('5d8228f6e71ced099cf1b8ac', {
    password: "wocaonima"
}, function (err, ret) {
    if (err) {
        console.log('fail')
        console.log(err)
    } else {
        console.log('success')
        console.log(ret);
    }
})

```



#### MongoDB基本概念

+ 可以有多个数据库	                 	  qq  淘宝  京东
+ 一个数据库可以有多个集合             uers   products
+ 一个集合可以有多个文档                集合内的对象就是文档

```javascript
{
    qq: {
        uers: [
            {},
            {},
            {}
        ],
        products: [
            
        ]
    },
    淘宝: {
        
    },
    京东: {
        
    }
}

```



### Node操作MySQL

[MySQL for Node](https://www.npmjs.com/package/mysql)

安装：

```shell
npm install --save mysql

```

按照文档操作即可



### promise

#### callhell： 回调地狱

![1568892355575](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1568892355575.png)

一层依赖套一层依赖

```javascript
const fs = require('fs');

fs.readFile('./a.txt', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
})

fs.readFile('./b.txt', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
})

fs.readFile('./c.txt', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
})

```

以上代码无法保证执行顺序，我们可以通过回调嵌套的办法解决执行顺序问题：

```javascript
const fs = require('fs');

fs.readFile('./a.txt', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
        fs.readFile('./b.txt', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        console.log(data);
        fs.readFile('./c.txt', 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            console.log(data);
        })
    })
})

```

为了解决上面编码方式带来的问题，所以在ES6中新增了一个API：promise

promise是一个构造函数

##### 创建promise容器

1. 给别人一个承诺（承诺本身不是异步，但是内部往往封装了一个异步任务）

异步任务链式编程

```javascript
let p1 = new Promise(function(resolve, reject) {
    fs.readFile('./c.txt', 'utf8', function (err, data) {
        if (err) {
            // 任务失败了，承诺容器中的任务失败了
            // 把容器的 Pending 状态变为 Rejected
            // 失败调用then的第二个 参数函数
            reject(err);
        } else {
            // 承诺容器中的任务成功了
            // 把容器的 Pending 状态变为 resolve
            //也就是说，这里调用的 resolve 方法，其实就是 then 方法传递的那个 function 
            resolve(data)
        }      
    })
})

let p2 = new Promise(function(resolve, reject) {
    fs.readFile('./a.txt', 'utf8', function (err, data) {
        if (err) {
            // 任务失败了，承诺容器中的任务失败了
            // 把容器的 Pending 状态变为 Rejected
            // 失败调用then的第二个 参数函数
            reject(err);
        } else {
            // 承诺容器中的任务成功了
            // 把容器的 Pending 状态变为 resolve
            //也就是说，这里调用的 resolve 方法，其实就是 then 方法传递的那个 function 
            resolve(data)
        }      
    })
})

let p3= new Promise(function(resolve, reject) {
    fs.readFile('./b.txt', 'utf8', function (err, data) {
        if (err) {
            // 任务失败了，承诺容器中的任务失败了
            // 把容器的 Pending 状态变为 Rejected
            // 失败调用then的第二个 参数函数
            reject(err);
        } else {
            // 承诺容器中的任务成功了
            // 把容器的 Pending 状态变为 resolve
            //也就是说，这里调用的 resolve 方法，其实就是 then 方法传递的那个 function 
            resolve(data)
        }      
    })
})

// 当p1承诺执行后，执行 then,  then方法接收的 function 就是容器中的 resolve
p1.then(function (data) {
    
    //当p1读取成功的时候
    // 当前函数中return 的结果就可以z在后面的 then 中 function 接收到return 中的值
    //当你 `return 123` 后面就接收到123，没有return 后面收到的就是 undefind
    // 上面的那些return 的数据没有什么卵用
    // 真正有用的是我们可以return 一个promise对象
    //当return 一个Promise对象的时候，后续的 then 方法的第一个参数会作为 P2的resolve
    // 
    return p2;
},function (err) {
    console.log(err);
}).then(function (data) {
    return p3;
}).then(function (data) {
    
})

```

##### 封装上面的promise对象api

```javascript
let fs = require('fs');

function pReadFile(filePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                // 任务失败了，承诺容器中的任务失败了
                // 把容器的 Pending 状态变为 Rejected
                // 失败调用then的第二个 参数函数
                reject(err);
            } else {
                // 承诺容器中的任务成功了
                // 把容器的 Pending 状态变为 resolve
                //也就是说，这里调用的 resolve 方法，其实就是 then 方法传递的那个 function 
                resolve(data)
            }      
        })
    })
}

pReadFile('./a.txt').then(function(data) {
    return pReadFile('./b.txt')
}).then(function (data) {
    return pReadFile('./c.txt')
}).then(function (data) {
    
})

```

jquery ajax有封装promise



##### mongoose 所有的API都支持Promise

```javascript
User.find(function (err,ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret)
    }
})

//转换成promise对象
User.find().then(function (data) {
    console.log(data)
})

```

#### 一个简单的判断用户注册是否存在的功能

```javascript
User.findOne({
    username: "admin"
}).then(function (user) {
    if (user) {
        console.log('用户已存在')
    } else {
        return new User({
            username: 'aaa',
            pwd: '123'
        }).save()
    }
}).then(function (ret) {
    // 注册成功的操作
})

```

#### 数据库密码加密 

tip：所有平台的密码如果由进行加密，开发人员是不知道密码的，只能用把用户输入的密码进行加密然后和数据库加密密码匹配

+ MD5

md5下载

```shell
npm install --save blueimp-md5

```

```javascript
// 使用方法
const md5 = require('blueimp-md5')

body.pwd = md5(md5(body.pwd));   // 加密两次

```



### 博客项目步骤

##### 项目目录：

```javascript
+ bolg
  + node_modules
  + public
    + css
    + js
    + img
  + views
    + _layouts   // 使用下划线的原因是与需要渲染的页面做区分
		+ home.html  // 模板页面
    + _partials
		+ header.html
		+ footer.html
		+ settings-nav.html
    + settings
		+ admin.html
		+ profile.html 
    + topic
		+ edit.html
		+ new.html
         + show.html
    + index.html
    + register.html
    + login.html
  + .gitignore
  + app.js
  + package.json
  + package-lock.json
  + README.md

```



1. 创建一个项目文件夹
2. `npm init -y`
3. 需要发布到github上可以  `git init`
4. 添加 README.md 文档描述文件，和.gitignore  git忽略文件（说明哪些文件不用上传到GitHub）
5. 安装核心包  
   + express
   + mongoose
6. 新建`public`公开静态资源目录
7. 新建`app.js`入口文件，新建服务器
8. 引入模板引擎`art-templete`,新建views文件夹

##### 模板页

art-templete

##### 路由设计

| 路径      | 方法 | get参数 | post参数                  | 是否需要登录 | 备注         |
| --------- | ---- | ------- | ------------------------- | ------------ | ------------ |
| /         | GET  |         |                           |              | 渲染首页     |
| /rigister | GET  |         |                           |              | 渲染注册页面 |
| /rigister | POST |         | email、nickname、password |              | 处理注册请求 |
| /login    | GET  |         |                           |              | 渲染登录页面 |
| /login    | POST |         | email、password           |              | 处理登录请求 |
| /logout   | GET  |         |                           |              | 处理退出请求 |

1. 注册路由



##### 重定向对对异步请求无效

服务端重定向只对同步请求有效，对异步请求无效

解决办法：`window.location.href = '/'` 让浏览器自己跳转就可以了

```javascript
// ajax请求
success: function (data) {
    if (err_code === 0) {
        window.location.href = '/'
    }
}

```





#### form表单的小知识

form表单具有默认的提交行为，默认是同步的，同步表单提交，浏览器会锁死（转圈）等待服务端响应结果，表单的同步提交之后，无论服务器响应的是什么，都会直接把响应的结果覆盖掉当前的页面

解决的方法是重定向



#### 使用session保存登录状态

##### Cookie：

http是无状态的

例子：老师发苹果，人多了不知道谁没发谁发了，所以让你记住你自己，发给你就给你贴一个小纸条（cookie），但是你自己不知道

cookie可以用来保存一下不太敏感的数据，但是不能用来保存用户登录状态

一般用来 

+ 记住用户名
+ 购物车数据

##### Session：

例子：超市的电子柜，只有拿钥匙才可以打开

服务器的角度：session的，小票一旦丢失，不可找回，你的状态也就丢失了，钥匙是服务器给你的，不太容易伪造

可以保存一些敏感的数据

客户端只需要拿着这把钥匙(服务器给的)就可以了



##### express-session中间件

`express`框架默认是不支持`cookie`和`session`的

但是我们可以用`express-session`这个第三方的中间件来解决这个问题

```shell
npm install --save express-session

```

###### 配置(一定要在路由之前配置)

```javascript
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

```

###### 使用

当配置好后，我们就可以通过`req.session`来访问和设置`Session`成员了

例如：

+ 添加`Session`数据：`req.session.foo = 'bar'`
+ 访问`Session`数据： `req.session.foo`

提示：默认Session数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把Session进行持久化存储



## 模块api

但凡是node API，都有同步和异步，（不严谨说法）异步api都有回调函数，且第一个参数都是err（错误优先原则）

### fs模块（基础的文件操作API）

#### 同步读取文件

`fs.readdirSync(path[, options]) `方法将返回一个包含“指定目录下所有文件名称”的数组对象。

```javascript
// 源码
fs.readdirSync = function(path) {
  nullCheck(path);
  return binding.readdir(pathModule._makeLong(path));
};

```

#### 异步读取文件

`fs.readFile(path[, options], callback)` 

### http模块

```javascript
let server = http.createServer((req, res) => {
    let requrl = url.parse(req.url);
    if (requrl.pathname == '/favicon.ico') {   //uri就是pathname
        res.end();  //end表示结束本次请求，但是不会中止下面代码的运行
        return;  //为了让end下面的代码不会继续执行，我们需要显式的调用return去中止运行
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let query = requrl.query;   //请求参数全在query里面
    query = querystring.parse(query);
    res.end(JSON.stringify(requrl));

    login(query)

});


```



### `try{} catch(err){}`一般用于同步捕获异常



### 一个请求到服务端的完整过程

客户端发起请求  ==》  服务端接收请求 ==》  路由进行请求发布  ==》 根据uri进行请求分发到具体的模块的api ==》

如果由进行数据库交互，需要做下面的动作  ==》  组装响应的必要参数，进行数据库操作





## 验证登录密码项目

```javascript
let url = require('url');
const http = require('http');
const querystring = require('querystring');

let user = [
    {account: "tom",pwd: "123"},
    {account: "tony",pwd: "1234"},
    {account: "hhh",pwd: "12345"},
    {account: "kkk",pwd: "123456"},
    {account: "jjj",pwd: "1234567"},
    {account: "ggg",pwd: "123456789"}
]

let server = http.createServer((req, res) => {  //所有的请求都会经过这个函数
    let requrl = url.parse(req.url);
    if (requrl.pathname == '/favicon.ico') {   //uri就是pathname
        res.end();  //end表示结束本次请求，但是不会中止下面代码的运行
        return;  //为了让end下面的代码不会继续执行，我们需要显式的调用return去中止运行
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let query = requrl.query;   //请求参数全在query里面
    query = querystring.parse(query);
    res.end(JSON.stringify(requrl));

    login(query)

});

server.listen(8080,()=>{
    console.log("server restart")
})


function login(data){
    process.stdout.write(`账号为：${data.name}`);
    process.stdout.write("\n");
    process.stdout.write(`密码为：${data.pwd}`);
    process.stdout.write("\n");



        for (let i=0; i < user.length; i++) {
            if ( data.name == user[i].account && data.pwd == user[i].pwd) {
                process.stdout.write("账号密码正确，登录成功");
                process.stdout.write("\n");
                return true;
            } else {
                process.stdout.write("账号或者密码错误，请重新输入");
                process.stdout.write("\n");
                return false;
            }
        }
}


```



## 自行封装一个通用的成功响应方法和错误响应的方法

背景：每个请求的最终结束的标识符，响应end();/响应.json()

+ 响应内容对象的结构设计如下
  + {code:('ok'/'error'),data:真正想要返回到前端的业务数据}
  + 肯定是一个对象，{}包起来
  + 每个实体都要有一个标识符code，作用：标志本次的请求是否正常，如果正常-ok，不正常-error
    + 不正常：
    + 服务端异常：
      + 1》请求失败，比如说数据库异常，导致请求失败
      + 2》请求参数不合法，比如说长度不满足要求，eg：id的长度要求19位，传进来只有18位，参数异常
    + 客户端处理异常：请求还没有到服务端  -3》请求异常（不是归纳为服务端的处理异常，应该是客户端的处理异常
+ 响应内容对象用法矛盾：
  + 每次响应，都需要从头构造一个响应内容对象的模板，并对内容的code 

s

## 身份验证

http请求  无状态

1. session+cookie   （cookie-parser  express-session)
   1. 登录的时候  发布一个加密字符串 （用户相关信息）  给前端
   2. 调用其他接口，将加密字符串作为参数传给服务器
   3. 根据权限进行验证

```javascript
const cookieParser = require('cookie-parser')
const session = require('express-session');

app.use(session({
    secret: 'my_session_secret',  //为了安全性的考虑设置secret属性，私钥
    resave: true,    //即使 session 没有被修改，也保存session值  
    saveUninitialized: false, //无论有没有session cookie ，每次请求都设置个session cookie，默认给个标识为：connect.sid
    cookie: {
        secure: false,
        maxAge: 600000,   //过期时间
        httpOnly: false,
    },
    
}))

```



# token

```javascript
npm i -S jsonwebtoken;

const jwt = require('jsonwebtoken');
const secretkey = "dasdasdsadsadsasdasdas";

let token = jwt.sign({user_account:name},secretkey,{expiresIn: 60*8*100000100}); // 生成token令牌

let token = req.body.token || req.query.token || req.headers.token;  //获取客户端传的token

// 验证token信息是否匹配
jwt.verify(token,secretkey,(err,decode) => {
        
           if(err){
               res.json({
                   message: 'token过期，请重新登录',
                   resultCode: '403'
               })
           }else{
               next();
           }
        })


app.use(function(req,res,next){
    if(req.url !='/user/login' && req.url !='/user/register'){
        //token可能存在post请求和get请求
        let token = req.body.token || req.query.token || req.headers.token;
        jwt.verify(token,secretkey,function(err,decode){
           if(err){
               res.json({
                   message: 'token过期，请重新登录',
                   resultCode: '403'
               })
           }else{
               next();
           }
        })
    }else{
        next();
    }
})

```

  ### nvm下载

1）. D:\nodejs\dev\nvm  下解压nvm


2）. 点击install.cmd配置文件，settings.txt加入以下代码保存在nvm目录下：

	root: D:\nodejs\dev\nvm
	path: D:\nodejs\dev\nodejs
	arch: 64
	proxy: none
	node_mirror: http://npm.taobao.org/mirrors/node/
	npm_mirror: https://npm.taobao.org/mirrors/npm/

3) .配置环境变量：
Ctrl + R 输入sysdm.cpl

系统环境变量分别有NVM_HOME   NVM_SYMLINK  分别填写上面的root 和path路径

nvm v查看版本号


### nodejs安装

nodejs解压到nvm目录下，名称以 V+【版本号】  命名，命令行使用 nvm use 【node版本号】

D:\nodejs\dev下会自动出现一个nodejs文件



	npm config get prefix   //查询当前node的全局路径
	
	npm config set prefix xxx  //设置环境变量的全局路径


### 安装npm

先在D:\nodejs\dev\nvm下创建一个npm文件夹

在命令行

	npm config set prefix D:\nodejs\dev\nvm\npm

查询C:\Users\93478下的.npmrc的路径是否和上面设置的一样，一样就没有问题

然后： 

	npm install npm -g 全局安装
	
	npm install [packagename] -g  //install的缩写i
	npm remove [packagename] -g //删除当前全局目录下的包，没有-g就是当前目录下的


>环境变量配置NPM_HOME
>
>`D:\nodejs\dev\nvm\npm`    
>path  
>
>`%NPM_HOME%` 


	npm -v  查看版本
	
	npm list npm -g  查看全局下是否有安装这个包


nrm镜像管理工具

	npm install nrm -g
	
	nrm ls 展示所有的可切换镜像地址
	
	nrm use [镜像名称]  切换镜像
	
	nrm test 测试镜像速度


powershell 命令演示

	1. cd    / 当前根目录   ./当前目录      ../上级目录     3+ tab键联想快捷键
	2. dir/ls  查看当前目录列表
	3. mkdir 创建目录      echo 查看文件，没有就创建
	4. rm/del 删除文件
	5. clear/cls（clears screen）  清空当前控制台
	6. echo 内容 > 文件名扩展名


webstorm安装破解
	

	webstorm.exe.vmoptions
	webstorm64.exe.vmoptions
	
	以上两个文件添加以下路径：
	-javaagent:C:/Program Files/JetBrains/WebStorm 2018.2.5/bin/JetbrainsIdesCrack-4.2-release-sha1-3323d5d0b82e716609808090d3dc7cb3198b8c4b.jar
	
	E:\BaiduNetdiskDownload


	-javaagent:C:/Program Files/JetBrains/WebStorm 2018.2.5/bin/JetbrainsIdesCrack-4.2-release-sha1-3323d5d0b82e716609808090d3dc7cb3198b8c4b.jar
	
	E:\BaiduNetdiskDownload


​	

	ThisCrackLicenseId-{
	"licenseId":"ThisCrackLicenseId",
	"licenseeName":"Rover12421",
	"assigneeName":"",
	"assigneeEmail":"rover12421@163.com",
	"licenseRestriction":"For Rover12421 Crack, Only Test! Please support genuine!!!",
	"checkConcurrentUse":false,
	"products":[
	{"code":"II","paidUpTo":"2099-12-31"},
	{"code":"DM","paidUpTo":"2099-12-31"},
	{"code":"AC","paidUpTo":"2099-12-31"},
	{"code":"RS0","paidUpTo":"2099-12-31"},
	{"code":"WS","paidUpTo":"2099-12-31"},
	{"code":"DPN","paidUpTo":"2099-12-31"},
	{"code":"RC","paidUpTo":"2099-12-31"},
	{"code":"PS","paidUpTo":"2099-12-31"},
	{"code":"DC","paidUpTo":"2099-12-31"},
	{"code":"RM","paidUpTo":"2099-12-31"},
	{"code":"CL","paidUpTo":"2099-12-31"},
	{"code":"PC","paidUpTo":"2099-12-31"}
	],
	"hash":"2911276/0",
	"gracePeriodDays":7,
	"autoProlongated":false}

R（receive）E(eval)P(print)L(loop)
	
js中的console和node中的console是两个不同的对象


退出REPL
	1. alt + f4
	2. .exit
	3. process.exit()
	4. 直接关掉命令行


 自执行匿名函数内部空间使用一次后自动销毁

	(function(){   }())  ~  ！  +   - 
	
	一个方法的执行一定是以 funcName() 运行的，（）是把方法转换为表达式

怎么判断一个方法是否存在？

	if(func){ console("存在") }


eval 用来执行字符串表达式


###全局作用域成员
	1）. global    
	2）. process
	      1. argv 获取命令行脚本的各个参数组成脚本并返回数组
	      2. on



### 箭头函数与普通函数的不同

箭头函数会改变this的指向，使用箭头函数后，它指向的不是当前事件的触发者
箭头函数中的this是在定义函数的时候绑定，而不是在执行函数的时候绑定。

普通函数在函数被调用的时候绑定所有的变量，this指的是函数本身



### 同步异步

1. 同步： 主动请求主动响应    一个线程一次请求只做一件事情  做完事情就销毁该线程
2. 异步：主动请求被动响应     一个线程做多个事情

### 多线程和单线程的区别

1. 多线程：同时做多件事情，但是需要时时切换线程
2. 单线程：一个时间段只能做一个事情


### 回调函数

创建一个函数给别人用，在函数事情处理好后返回结果。
自己创建的函数自己不用，给别人用，别人用完后给我一个结果就可以了。


###阻塞 非阻塞

1. 阻塞：    针对响应    不管耗时不耗时都   卡住你
2. 非阻塞：   针对响应   不管耗时不耗时都   不都卡住你


###事件驱动


### node处理高并发

请求进来后，node调度请求，把请求丢到一个队列里面，然后去处理其他请求，


### http请求一个资源

常规做法：http://ip(域名):端口/url    端口号如果是80可以不写

1. url  united resource location  统一资源定位符
2. uri united resource indenty  统一资源标识符
3. 一个url包含下面几个部分：
   1. url <==> 协议：//ip+端口+uri
4. 怎么去访问和定位到一个网络上的资源：
   1. ip：4段
   2. port：65536
   3. ip：定位到某台具体服务器
   4. port：定位到某台服务器上的某个具体的应用
   5. uri：定位到某台服务器上的某个具体的应用的某个资源


### nodemon 热更新 npm install nodemon -g


### node路由：相当于迎宾小姐


## 模块化编程

​	

#node的两大操作 
文档操作和服务器操作

let fs = require('fs')  读文档操作.


下载插件可以读取上面的文档

1. npm i typings -g
2. 切到需要开发的目录
3. 输入typings init
4. 输入typings install dt~node --global
5. 当前目录下新建一个空的jsconfig.json文件
6. 重启编辑器



    let myhttp = require('http');

   webserver = myhttp.createServer();
   webserver.on('3008',function(){
       console.log("服务器已启动");         
   }) 



node request entity too large

```
var` `bodyParser = require(``'body-parser'``);
app.use(bodyParser.json({limit: ``'50mb'``}));
app.use(bodyParser.urlencoded({limit: ``'50mb'``, extended: ``true``}));
```



文件上传

https://itbilu.com/nodejs/npm/41vWPhuEb.html







# node 是一个运行环境，js构建后台的运行环境 [TOC]  

## 1.3.1 node.js  有什么特点 

> 1）异步非阻塞式的I/O （I/O线程池）input output 
>
> 2）特别适用于I/O密集型应用  （密集型：频繁的I/O操作） 请求多（对数据库的读写量大）
>
> 3）事件循环机制 
>
>  4）单线程 
>
> 5）跨平台  

## 1.3.2 不足之处 

> 1) 回调函数嵌套太多、太深（俗称回调地狱）
>
> 2）单线程，处理不好cpu密集型任务  响应多（服务器响应客户端）   这就是为什么同时很多人访问一个服务器的时候渲染速度会很慢 

1.4 Node.js的应用场景 

> 1) web服务API。 
>
> 2）服务器渲染页面，提升速度 
>
>  3）后端的web服务，例如跨域、服务器的请求  

### node构建的服务器和java服务器的不同 

> java服务器（多线程）：（请求慢的话浪费线程，但是响应块） 
>
>  1）一个线程只为一个请求服务，请求完成，线程结束  （请求过多的解决方案--高并发，使用服务器集群，增加线程） 
>
>  Node（单线程）：（请求慢的话没有影响，但是响应慢） 
>
> 1）一个线程为所有请求服务， 

##  node中函数的特点 

1) node中任何一个模块（js文件）都被一个外层函数所包裹 >  > 使用arguments.callee方法可以查到外层函数，如果你写的代码没有函数体包着这个方法，需要用arguments.callee.toString()查询外层函数 >  > 外层函数console.log(arguments.callee.toString());： >  function (exports, require, module, ***\*__\**filename, \**__\****dirname) { console.log(arguments.callee.toString()) 	exports：用于暴露模块 require：用于导入模块 module：用于暴露模块 __filename：当前文件的绝对路径 __dirname：当前文件所在文件夹的绝对路径  > 2) 为什么要有这个函数，这个函数的作用 >  >    1. 隐藏内部实现。 >     >    2. 支持CommonJs的模块化  ### Node中的global > 1). 对于浏览器端而言，js由以下三部分组成 >  >    1. DOM---浏览器对象模型-----很多API（location，history） >    2. BOM---文档对象模型------很多API（对dom的增删改查） >    3. ES规范--------ES5，ES6，ES7 > 2). Node端js由几部分组成 >  >    1. 没有了BOM---因为服务器不需要 >    2. 没有了DOM---因为没有浏览器窗口 >    3. 几乎包含所有的js规范（alert没有） >    4. 没有了window，但是取而代之的是一个叫做global（打印出来里面会显示很多配置）的全局变量。 tips： node中没有函数体包含的this指向的是一个空对象，浏览器中非严格模式指的是windows  ### 3包与包管理器 > 1）什么是包？ >  >   1. 我们电脑上的文件夹，包含了某些特定的文件，符合了某些特定的结构，就是一个包    > 2）一个标准的包，应该包含哪些内容？ >  >   1. package. json ------ 描述文件(包的“说明书”，必须要有! ! ! ) >   2. bin----------------- 可执行二进制文件 >   3. lib----------------- 经过编译后的js代码 >   4. doc----------------- 文档(说明文档、bug修复文档、版本变更记录文档) >   5. test ------------- 一些测试报告 > 3)如何让一一个普通文件夹变成一个包? > >   1. 让这个文件夹拥有一个: package. json文件即可, 且package , json里面的内容要合法。 >   2. 执行命令: npm init >   3. 包名的要求:不能有中文、不能有大写字母、不能与npm仓库上其他包同名。    > 4）npm与node的关系? (npm: node package manager )  > >   1. 安装node后自动安装npm (npm是node官方出的包管理器，专门用于管理包) > 5) npm的常用命令 #### 3.1 package包 > Node.js的包基本遵循CommonJs规范，包将一组相关的模块组合到一起，形成一组完整的工具。  > 包由包结构和包描述文件两部分组成。 >  >    1） 包结构：用于组织包中的各种文件 >    2） 包描述文件：描述包的相关信息，以供外部读取分析  ##### 3.1.1包结构 > 包实际就是一个压缩文件，解压以后还原为目录。符合CommonJs规范的目录，应该包含如下文件：  ---------- ` server.on('request', function(request,response){}) ` request 请求事件处理函数；需要接受两个参数： 1. Request请求对象 请求对象可以用来获取客户端的一些请求信息，例如请求路径 2.  Response 响应对象 响应对象可以用来给客户端发送响应消息 response对象有一个方法：write可以用来给客户端发送响应数据 write可以使用多次，但是最后一定要使用end来结束响应，否则客户端会一直等待，***\**\*\**浏览器上面会一直打转\**\*\*\**** 一个请求对应一个响应，如果在请求过程中，已经结束响应了，则不能重复发送响应 没有请求就没有响应 ` response.write()   //不推荐这种方法发送响应数据 ` ` response.end("aaa")  //推荐这种方法，直接end的同时发送响应数据 ` 绑定端口号，启动服务 ` server.listen(300),function(){}) ` ---------- ###数据编码 1. 在服务器默认发送的数据，其实是utf-8编码的内容 2. 但是浏览器不知道你是utf-8的内容 3. 浏览器在不知道的服务器响应内容编码的情况下会按照当前操作系统的默认编码去解析 4. 中文操作系统默认是 gbk 5. 解决方法就是正确的告诉浏览器我给你发送的是什么编码 6. 在http协议中，Content-Type就是用来告诉对方我给你发送的数据内容是什么类型的 ` response.setHeader('Content-Type','text/plain;charset=utf-8') response.setHeader('Content-Type','text/html;charset=utf-8') response.setHeader('Content-Type', 'application/json;charset=utf-8') response.end//支持两种数据类型数据，一种是二进制，一种是字符串 ` > [Content-Type对照表](http://tool.oschina.net/commons) 除了使用Content-Type用来指定编码，也可以在html页面中通过 meta元数据来声明当前文本的编码格式，浏览器也会识别 ` ***\* charset="UTF-8">** ` url：统一资源定位符，一个url其实要对应到一个资源的 		let myhttp = require('http'); 	let fs = require('fs'); 	let shigea; 	fs.readFile('诗歌.txt', function (err, data) { 	    shigea =  data.toString(); 	}); 	 	let webserver = myhttp.createServer(); 	//listen 监 听一个3008端口的服务器 	webserver.listen('3000', function () { 	    console.log("服务器已启动"); 	}) 	// on实时检测这个服务器的变化 	webserver.on('request', function (request, response) { 	    //request客户端发送过来的所有内容，消息，头 	    //response就是服务器反馈过来的内容 	    // response.setHeader('Content-Type','text/plain;charset=utf-8') 	    // response.setHeader('Content-Type','text/html;charset=utf-8') 	    // response.write("I hear you"); 	    // response.write("我收到你的信息了"); 	    // response.write("<h1>i hear you</h1>"); 	    // response.end(); 	    // console.log(request.url) 	    if (request.url == "/html") { 	        response.setHeader('Content-Type', 'text/html;charset=utf-8') 	        response.write("<a>首页</a>"); 	        response.end(); 	    } 	    if (request.url == "/json") { 	        response.setHeader('Content-Type', 'application/json;charset=utf-8') 	        // response.write("{'name': '首页'}"); 	        let json_a = {'name': '首页'}; 	        response.end(json_a.stringify())        	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        	    } 	    if (request.url == "/shige") { 	        response.setHeader('Content-Type', 'text/plain;charset=utf-8') 	        response.write(shigea); 	        response.end(); 	    } 	 	})  ---------- ##发送文件中的数据 1.  结合fs发送文件中的数据 2.  Content-Type 	不同资源对应的Content-Type是不以样的，图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码 	  	let myhttp = require('http'); 	let fs = require('fs'); 	let shigea; 	fs.readFile('诗歌.txt', function (err, data) { 	    shigea =  data.toString(); //data默认是二进制数据，toString()能转为我们认识的字符串 	}); 	 	let webserver = myhttp.createServer(); 	//listen 监 听一个3008端口的服务器 	webserver.listen('3000', function () { 	    console.log("服务器已启动"); 	}) 	// on实时检测这个服务器的变化 	webserver.on('request', function (request, response) { 	    //request客户端发送过来的所有内容，消息，头 	    //response就是服务器反馈过来的内容 	    // response.setHeader('Content-Type','text/plain;charset=utf-8') 	    // response.setHeader('Content-Type','text/html;charset=utf-8') 	    // response.write("I hear you"); 	    // response.write("我收到你的信息了"); 	    // response.write("***\*>**i hear you***\*>**"); 	    // response.end(); 	    // console.log(request.url) 	    //request.url就是端口号后面的路径 	    if (request.url == "/html") { 	        response.setHeader('Content-Type', 'text/html;charset=utf-8') 	        response.write("***\*>**首页***\*>**"); 	        response.end(); 	    } 	    if (request.url == "/json") { 	        response.setHeader('Content-Type', 'application/json;charset=utf-8') 	        // response.write("{'name': '首页'}"); 	        let json_a = {'name': '首页'}; 	        response.end(json_a.stringify())    	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            	    } 	    if (request.url == "/shige") { 	        response.setHeader('Content-Type', 'text/plain;charset=utf-8') 	        response.write(shigea); 	        response.end(); 	    } 	}) 	  ---------- ###模块 1. require是一个方法，作用就是用来加载模块 1. 作用： 	 1. 加载文件模块并执行里面的代码 	 2. 拿到被加载的文件模块导出的接口对象 2. 在Node中，模块有三种： 1. 具名的核心模块，例如： 	  +  fs ：文件操作模块 	  +  http：网络服务构建模块 	  +  os：操作系统信息模块 	  +  path：路径处理模块 2. 用户自己编写的模块（.js文件） 	1. 相对路径必须加 ./  	2. 可以省略后缀名 3. 在Node中没有全局作用域，只有模块作用域 	1. 内部访问不到外部，外部也访问不到内部 	2. 默认都是封闭的 4. 既然是模块作用域，那如何让模块与模块之间通信 5. 有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要的是为了使用里面的某个成员  exports 使用方法： 			 	add.js: 	exports.add = function(){}	 	r.js: 	let a = require('add'); 	a.add();  ###http地址和端口的概念 1. ip地址用来定位计算机 2. 端口号用来定位具体的应用程序 3. 所有需要联网通信的应用程序都会占用一个端口号 4. 端口号的范围从0~65536之间 5. 在计算机中有一些默认的端口号最好不要去使用。例如：80 6. 我们在开发过程中使用一些简单好记的就可以了，例如：3000、5000等没有什么含义 7. 可以同时开启多个服务，但是一定要确保每个服务所占的端口号  ### 代码规范 [javascript standard style](https://standardjs.com/readme-zhcn.html) [airbnb javascript style guide](https://www.ctolib.com/mip/getjll-JavaScript-Style-Guide.html) 当你采用无分号的代码规范的时候，需要注意以下情况： 1. 当一行代码是以(、[、'开头的时候，则在前面补上一个分号用来避免一些语法解析错误，所以你会看到一些第三方的代码中一上来就以分号开头 结论：无论你的代码是有分号还是无分号风格，都建议在(、[、' 前补 个分号  >return有两个作用: >1. 方法返回值 >2. 阻止代码往后执行   ###读取文件目录 ` fs.readDir('/path',function(err,file){}) ` 怎么把内容(目录名)存进文件或者取代文件中的某个内容， 模板语法： let content = ``; data = data.replace('文件中的标记', content) 发送响应： res.end(data)     ###在Node中使用模板引擎 + art-templete   不仅可以在浏览器中使用，也可以在node中使用 - npm install art-template --save  + script引入的话，模板script需要type='text/template' id='tpl' + script脚本语法   + let templete = require('art-templete')  	fs.readFile('./1.html',function(err,data){  //data默认是二进制 			templatte.render(data.toString(),{ //而模板引擎的render方法接受的是字符串  				name: 'jack', 				... 			})													 	}) 		 ### 《编写可维护的JavaScript》   ### 服务端渲染页面和客户端渲染页面 ajax异步渲染的数据爬虫爬不到，服务端渲染的数据方面SEO爬取 + 区别： - 客户端渲染不利于SEO搜索引擎优化  - 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的 - 真正的网站既不是纯异步也不是纯服务器渲染出来的 - 例如京东的商品采用的是服务端渲染，目的是为了SEO搜索引擎优化，而他的商品品论列表为了用户体验，而且也不需要SEO优化，所以采用的是客户端渲染。  ### 处理网站中的静态文件 浏览器收到服务端的资源数据后开始从上到下依次解析 + 为了让目录结构更加清晰，我们约定，把所有的HTML文件统一放在views目录中 浏览器收到html响应内容后，就要开始从上到下依次解析，当在解析过程中，如果发现有 ` link script img iframe video audio ` 等带有src或则link的herf属性 标签（具有外链的静态资源）的时候（a标签除外），浏览器会自动对这些静态资源发起新的请求 为了统一处理以上资源，我们约定把所有的静态资源都存放在pubilc目录中，一些外部引用包放在lib文件夹中 统一处理: 如果请求路径是以/public/开头的，则我们认为你要获取的public中的某个资源，所以我们就可以把请求路径当作文件路径来直接读取  哪些资源可以给用户访问，哪些不可以，我们可以通过代码来控制 注意：在服务器端中，文件的路径就不要写相对路径了，因为资源都是通过url标志来获取的，服务器已经开放了public目录,路径统一写/public/... /在这里的意思是根路径的意思 #### 如果访问不存在的网页，跳到404页面 	let http = require('http'); let fs = require('fs');  http.createServer(function (req,res) {     let url = req.url;     if (url === '/') {         fs.readFile('./view/index.html',function(err,data){             if (err) {                  res.setHeader('Content-Type','text/plain; charset=utf-8');                return res.end('404 not found')            }             res.end(data);        })     } else if (url.indexOf('/public/') === 0) {        fs.readFile('.' + url,function (err,data) {            if (err) {                res.end('404 not found')            }            return res.end(data);        })    } else {        fs.readFile('./view/404.html',function (err,data) {            if (err) {                return res.end('404 not found')            }            res.end(data)        })    } }).listen(3000,function () {     console.log("服务器已启动！") })  ###处理表单get提交 以前表单是怎么提交的？ 表单中的控件必须有name属性 表单提交分为： 1. 默认提交方式 2. 表单异步提交 action就是提交的地址，就是请求的url地址 method请求方法： 1. get 2.  post  ` /comment?name=hhh&message=fff ` 对于这种表单请求提交的路径，由于用户填写的内容不确定，无法判断完整的路径 解决方法：只要判断请求路径是/comment的时候，我就判断你的请求过来了 		let url = require('url'); 	let obj = url.parse('/comment?name=hhh&message=fff',ture); 	//true可以把转换出来的字符串再转换成对象，后续可以通过query（问号之后的部分）属性访问   pathname(不包含问号的部分) 		res.end(JSON.stringify(obj.query))//以json数据形式响应评论部分  使用parse的目的： 1. 拿到对象化的query和pathname ###如何通过服务器让客户端重定向 1. 状态码设置为302临时重定向 +  `res.statusCode = 302` 2. 在响应头中通过location告诉客户端往哪重定向 + `res.setHeader('Location','/') ` 如果客户端发现收到的服务器响应的状态码是302就会自动去响应头中找location 所以你就看到客户端自动跳转了 一次请求对于一次响应，响应结束请求结束。.end()会结束响应  1. /index.html 2. 开发public目录中的静态资源 3. /post  post.html 4. /comment 	+ 接受表单提交数据 	+ 存储表单提交数据 	+ 让表单重定向到/ 		- statusCode 		- setHeader  ###repl read eval print loop ### 在node中的模块系统 1. 什么是模块化 + 文件作用域 + 通信规则 	- 加载require 	- 导出exports ####commonjs模块规范 在Nodejs中有一个很重要的概念，模块系统 + 模块作用域 + 使用require方法加载模块 + 使用exports接口对象导出对象成员  1. 加载require `var 自定义变量名 = require('模块名')` 两个作用： + 执行被加载模块的代码 + 得到exports导出的接口对象 2. 导出exports    + Node中式模块作用域，默认文件中所有的成员只在当前文件模块有效    + 对于希望可以被其他模块访问的成员，我们把这些公开的成员挂载到exports接口对象上就可以 require加载规则： + 核心模块 + 第三方模块（兄弟模块中的第三方包无法直接通过require('package')拿到） + 自定义模块 + 优先从缓存加载 ```main.js require a.js require b.js  //由于a.js中加载了，此出导入只会得到b中的接口对象，但是不会重复加载，这样做的目的时提高加载速率 ``` ```a.js console.log('加载了') require b.js ``` ```b.js console.log('加载了') ``` 结果输出一个加载了 + 判断模块标识（require（模块标识符）） - 如果是非路径的模块标识： 	* ./ 	* ../ 	* /xxx (根路径下的xxx,几乎不用) 	* D:/a/d  （不用） 	* require('./a.js') - 核心模块（本质也是文件，不过已经编译到二进制文件中了，我们只需要引用就可以了）  	* require('fs') - 第三方模块（使用的时候用require引入，不可能和核心模块同名，既不是核心模块也不是路径模块） 	* 先查找当前文件所处目录中的node_modules目录  （没有找到就往上级目录找。直到磁盘根部） 	* 找node_modules/第三方模块名 	* 找node_modules/第三方模块名/package.json 	* 找node_modules/第三方模块名/package.json内的main属性 	* main中记录了模块的入口文件（如果没有main则会直接找index.js,默认备选项） 	*  exports是module.exports的引用： 				//在Node中，每个模块内部都有一个自己的module对象 			//在module对象中,有一个成员叫：exports也是一个对象 			//也就是说如果你需要对外导出成员，只需要把成员挂在到module的exports对象中 			//我们发现每次导出都需要通过module.exports....太麻烦了 			//node为了简化操作，专门提供了一个变量，module.exports等于exports  	 			var module = { 				exports: { 				} 			} 			 			var exports = module.exports;  //当引用中断时，可以用这个建立引用 			//谁来require我，谁就得到module.exports 		 			//默认在代码最后一句有： 			return module.exports  当一个模块需要导出单个成员的时候 直接给exports赋值是不管用的 `exports = 'hello'`   exports只是moudle.exports的一个引用，以上方式给exports重新赋值了，指向了新的对象  给exports赋值会断开和module.exports的引用，同理，给module.exports赋值也会断开和exports的引用： `module.exports = "hello" exports.foo = "world"`  ####TIPS 1. jQuery的each和js的foreach的区别 + ES5提供的（不兼容ie8） + each有第三方库提供的(2以下的版本是兼容ie8) + 主要用于遍历jQuery实例对象(伪数组) + 可以作为低版本foreach的替代品 + jQuery的实例对象不可以用foreach方法，如果需要使用必须转换成数组`[].slice.call(jQuery实例对象)` 2. 301状态码和302状态码的区别 + 301 是永久重定向，浏览器会记住 + 302是临时重定向   ### npm 	 	npm install --save jquery vue //通过空格同时下载多个包  --save会把包保存到包的依赖性，存在dependencies中，如果没有就不会保存 package.json  包描述文件  //可以通过npm init初始化出来  dependencies  依赖    保存第三方包的依赖信息 node_module文件删除了，使用npm install，也会根据package信息重新下载下来  npm升级 `npm install --global npm`  常用命令： 	 	npm init 	npm init -y //跳过向导 	npm install //只下载 	npm install --save  //下载并且保存依赖项 	npm i -S  //npm install --save简写 	npm uninstall //依赖性会依然保存 	npm uninstall --save //卸载包并删除依赖项   ### express（快速） 出现的原因：原生的http在某些方面不足以应对开发需求，所以使用框架提高效率，让代码更加统一。 1. 安装`npm i -S express` 2. 引包 `let express = require('express')` 		 	let app = express(); 	//当服务器收到get请求 / 的时候执行回调处理函数 	app.get('/',function(req,res){ 		res.send('hello express') 	}) 		//当服务器收到get请求 / about的时候执行回调处理函数 	app.get('/about',function(req,res){ 		res.send('hello about') 	}) 			 	//相当于server.listen 	app.listen(3000,function(){ 		console.log('服务器已启动') 	}) 公开指定目录	 	 	app.use('/public/',express.static('./public'))  基本路由 ###文件操作路径和模块标识路径的问题 我们使用的所有的文件操作都是异步的 1. 文件操作路径的相对路径可以省略 ./  + `fs.readFile('data/a.html',function())` 2. 模块加载中的路径 ./ 不能省 + `require('./data/a.js')`   ###node修改完代码后自动重启(热更新) nodemon工具，基于nodejs开发的一个第三方开发工具 `npm install --gloabal nodemon` 安装完后使用： `nodemon app.js` 分页思路  弹窗思路 





ajax get post 一般是和后台交互， load一般是拿取网页或者节点

### 1.3.1 node.js  有什么特点

> 1）异步非阻塞式的I/O （I/O线程池）input output
>
> 2）特别适用于I/O密集型应用  （密集型：频繁的I/O操作） 请求多（对数据库的读写量大）
>
> 3）事件循环机制
>
> 4）单线程
>
> 5）跨平台


### 1.3.2 不足之处

> 1) 回调函数嵌套太多、太深（俗称回调地狱）
>
> 2）单线程，处理不好cpu密集型任务  响应多（服务器响应客户端）   这就是为什么同时很多人访问一个服务器的时候渲染速度会很慢

### 1.4 Node.js的应用场景

> 1) web服务API。
>
> 2）服务器渲染页面，提升速度
>
> 3）后端的web服务，例如跨域、服务器的请求


### node构建的服务器和java服务器的不同

> java服务器（多线程）：（请求慢的话浪费线程，但是响应块）
> 1）一个线程只为一个请求服务，请求完成，线程结束  （请求过多的解决方案--高并发，使用服务器集群，增加线程）
>
> Node（单线程）：（请求慢的话没有影响，但是响应慢）
> 1）一个线程为所有请求服务，



### node中函数的特点

> 1) node中任何一个模块（js文件）都被一个外层函数所包裹
>
> 使用arguments.callee方法可以查到外层函数，如果你写的代码没有函数体包着这个方法，需要用arguments.callee.toString()查询外层函数
>
> 外层函数console.log(arguments.callee.toString());：
>
> function (exports, require, module, __filename, __dirname) { console.log(arguments.callee.toString())

	exports：用于暴露模块
	require：用于导入模块
	module：用于暴露模块
	__filename：当前文件的绝对路径
	__dirname：当前文件所在文件夹的绝对路径


> 2) 为什么要有这个函数，这个函数的作用
>
>       1. 隐藏内部实现。
>        
>       2. 支持CommonJs的模块化



### Node中的global

> 1). 对于浏览器端而言，js由以下三部分组成
>
>       1. DOM---浏览器对象模型-----很多API（location，history）
>       2. BOM---文档对象模型------很多API（对dom的增删改查）
>       3. ES规范--------ES5，ES6，ES7

> 2). Node端js由几部分组成
>
>       1. 没有了BOM---因为服务器不需要
>       2. 没有了DOM---因为没有浏览器窗口
>       3. 几乎包含所有的js规范（alert没有）
>       4. 没有了window，但是取而代之的是一个叫做global（打印出来里面会显示很多配置）的全局变量。

tips： node中没有函数体包含的this指向的是一个空对象，浏览器中非严格模式指的是windows



### 3包与包管理器

> 1）什么是包？
>
>     1. 我们电脑上的文件夹，包含了某些特定的文件，符合了某些特定的结构，就是一个包

> 2）一个标准的包，应该包含哪些内容？
>
>     1. package. json ------ 描述文件(包的“说明书”，必须要有! ! ! )
>     2. bin----------------- 可执行二进制文件
>     3. lib----------------- 经过编译后的js代码
>     4. doc----------------- 文档(说明文档、bug修复文档、版本变更记录文档)
>     5. test ------------- 一些测试报告

> 3)如何让一一个普通文件夹变成一个包?
>
>     1. 让这个文件夹拥有一个: package. json文件即可, 且package , json里面的内容要合法。
>     2. 执行命令: npm init
>     3. 包名的要求:不能有中文、不能有大写字母、不能与npm仓库上其他包同名。

> 4）npm与node的关系? (npm: node package manager ) 
>
>     1. 安装node后自动安装npm (npm是node官方出的包管理器，专门用于管理包)

> 5) npm的常用命令

#### 3.1 package包

> Node.js的包基本遵循CommonJs规范，包将一组相关的模块组合到一起，形成一组完整的工具。


> 包由包结构和包描述文件两部分组成。
>
> 1） 包结构：用于组织包中的各种文件
> 2） 包描述文件：描述包的相关信息，以供外部读取分析


##### 3.1.1包结构

> 包实际就是一个压缩文件，解压以后还原为目录。符合CommonJs规范的目录，应该包含如下文件：

### 分析GET请求报文(给服务器看的)

    GET http://localhost:3000/meishi HTTP/1.1
    Host: localhost:3000
    Connection: keep-alive
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
    DNT: 1
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    空行
    空行

### 报文首行

    GET http://localhost:3000/meishi HTTP/1.1
        -请求类型 协议名://主机名:端口号/路由关键词 使用协议的版本

### 报文头

    Host: localhost:3000
          --访问的主机名（地址，仅仅包含主机名+端口号）
          --防盗链、广告计费
    Connection: keep-alive
          --告诉服务器，浏览器端支持长连接
    Upgrade-Insecure-Requests: 1
          --告诉服务器，浏览器端支持https协议
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
          --用户代理，告知服务器你的浏览器内核以及品牌，早期的时候用于判断用户的浏览器是拿一个品牌，现在不可用了。
    DNT: 1
          --禁止跟踪，告知服务器禁止跟踪，并不是写了该字段服务器就一定遵守。
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
          --告知服务器浏览器能接受的文件类型，q是资源的优先级，取值范围是0-1,1的权限最高，默认是1
    Accept-Encoding: gzip, deflate, br
          --告诉服务器浏览器能支持的文件压缩格式
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
          --告诉服务器，浏览器能够接受的语言

### 空行

### 报文体

    GET 请求没有报文体

## GET请求与POST请求

### 前言

> HTTP请求，最初设定了八种方法（也称为“动作”）。这八种方法本质上没有任何区别。只是让请求，更加有语义而已。
> 八种方法分别为：OPTIONS、HEAD、GET、POST、PUT、DELETE、TRACE、CONNECT
> 这八种方法最终经过“岁月沉淀”后，常用的只有两种，即：GET和POST

### GET

    1. 含义：从指定的资源获取数据（一种“索取”的感觉）。
    2. 什么时候使用GET请求较为合适？
        (1)单纯获取数据的时。
        (2)请求中不包含敏感数据时。

### POST

    1.含义：向指定的资源提交要被处理的数据（一种“交差”的感觉）。
    2.什么时候使用POST请求较为合适？
        (1)传送相对敏感数据时。
        (2)请求的结果有持续性的副作用，例如：传递的数据要作为数据源写入数据库时。
    备注：使用了POST不代表的绝对的安全。

### 常见的GET请求：

    1.浏览器地址栏输入网址时（浏览器请求网页时时GET请求，且不可更改）
    2.可以请求外部资源的html标签，例如：<img> <a> <link> <script>
    3.发送Ajax时明确指出了使用GET请求
    4.form表单提交时没有指明方式，默认使用GET

### 常见的POST请求：

    1.发送Ajax时明确指出了使用POST方式
    2.使用第三方发送Ajax请求库时明确指出用POST时
    3.form表单提交时明确指出使用POST方式

### 二者的区别（幂等与非幂等）

![avatar](H:/学习笔记/2.GET与POST对比.png)

get主要用来请求固定信息，虽然也有请求主体（幂等），但是由于请求信息在地址栏，局限性太大

post主要用来修改更新信息(非幂等)

### 分析POST请求报文(给服务器看的)

    POST http://localhost:3000/demo HTTP/1.1
    Host: localhost:3000
    Connection: keep-alive
    Content-Length: 16
    Cache-Control: max-age=0
    Origin: http://localhost:63342
    Upgrade-Insecure-Requests: 1
    DNT: 1
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Referer: http://localhost:63342/node/day04/1.express%E6%9C%8D%E5%8A%A1%E5%99%A8/demo.html?_ijt=tjfnb0cpos62ql8umjmm9v24ve
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
    
    name=kobe&age=18

### 报文首行

    POST http://localhost:3000/demo HTTP/1.1
        -

### 报文头

    Host: localhost:3000
        --访问的主机名（地址，仅仅包含主机名+端口号）
    Connection: keep-alive
        --告诉服务器，浏览器端支持长连接
    Content-Length: 16
        --请求体的长度
    Cache-Control: max-age=0
        --用于控制强缓存
    Origin: http://localhost:63342
        --当前所处位置（主机位置+端口位置）
    Upgrade-Insecure-Requests: 1
        --告诉服务器，浏览器端支持https协议
    DNT: 1
        --禁止跟踪，告知服务器禁止跟踪，并不是写了该字段服务器就一定遵守。
    Content-Type: application/x-www-form-urlencoded
        --标识该请求是来自于一个form表单，并且以urlencoded形式进行编码
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
        --用户代理，告知服务器你的浏览器内核以及品牌，早期的时候用于判断用户的浏览器是拿一个品牌，现在不可用了。
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
        --告知服务器浏览器能接受的文件类型，q是资源的优先级，取值范围是0-1,1的权限最高，默认是1
    Referer: http://localhost:63342/node/day04/1.express%E6%9C%8D%E5%8A%A1%E5%99%A8/demo.html?_ijt=tjfnb0cpos62ql8umjmm9v24ve
        --在当前url下发出去的请求，是一个完整url，也可以做防盗链、同时也可以做广告计费
    Accept-Encoding: gzip, deflate, br
        --告诉服务器浏览器能支持的文件压缩格式
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
        --告诉服务器，浏览器能够接受的语言
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
        --Webstorm帮你“种”的一个cookie

### 空行

### 报文体

    name=kobe&age=18
        --携带过去的数据，以urlencoded进行编码

###分析响应报文（给浏览器看的）
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: text/html; charset=utf-8
    Content-Length: 27
    ETag: W/"1b-q8c2w67PUz7P4t0CNbDw9xqw6bo"
    Date: Tue, 23 Jul 2019 06:20:18 GMT
    Connection: keep-alive
    

    <h2>我是美食界面</h2>

###报文首行
    HTTP/1.1 200 OK
    协议名/协议版本 状态码
###报文头
    X-Powered-By: Express
        -服务器所使用的框架
    Content-Type: text/html; charset=utf-8
        -告诉浏览器解析文件的方式；文件编码方式
    Content-Length: 27
        -响应体的长度
    ETag: W/"1b-NFYx6TA4AihYceTsWYDlBLJferg"
        -协商缓存（资源唯一标识）
    Date: Tue, 23 Jul 2019 06:20:18 GMT
        -日期
    Connection: keep-alive
        -告诉浏览器，服务器支持长连接
###空行
    
###报文体

    <h2>我是美食界面</h2>

###Http状态码（服务器给客户端的东西）

###作用：  

* 告诉客户端，当前服务器处理请求的结果

###http状态码的分类

 * 1xx : 服务器已经收到了本次请求，但是还需要进一步的处理才可以。
 * 2xx : 服务器已经收到了本次请求，且已经分析、处理等........最终处理完毕！
 * 3xx : 服务器已经接收到了请求，还需要其他的资源，或者重定向到其他位置，甚至交给其他服务器处理。
 * 4xx ：一般指请求的参数或者地址有错误， 出现了服务器无法理解的请求（一般是前端的锅）。
 * 5xx ：服务器内部错误（不是因为请求地址或者请求参数不当造成的），无法响应用户请求（一般是后端人员的锅）。

###常见的几个状态码

 * 200 ：成功（最理想状态）
 * 301 ：重定向，被请求的旧资源永久移除了（不可以访问了），将会跳转到一个新资源，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址；
 * 302 ：重定向，被请求的旧资源还在（仍然可以访问），但会临时跳转到一个新资源，搜索引擎会抓取新的内容而保存旧的网址。
 * 304 ：请求资源重定向到缓存中（命中了协商缓存）。
 * 404 ：资源未找到，一般是客户端请求了不存在的资源。
 * 500 ：服务器收到了请求，但是服务器内部产生了错误。
 * 502 ：连接服务器失败（服务器在处理一个请求的时候，或许需要其他的服务器配合，但是联系不上其他的服务器了）。