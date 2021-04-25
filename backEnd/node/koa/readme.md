# 1. 使用koa2 和 express 对比

- express中间件是异步回调，koa2原生支持async/awit
- 新开发的框架和系统，都开始基于koa2,例如ess.js
- express虽然为过时，但是koaw肯定是未来趋势

# 2. 介绍async/await

```
1. await 后面可以追加 promise 对象，获取resolve 的值
2. await 必须包裹在 async 函数里面
3. async 函数执行返回的也是一个promise
4. try-catch 截获Promise 中的reject 的值
复制代码
```

# 3. 介绍koa2

- 安装（使用脚手架）
  - npm install -g koa-generator
  - Koa2 koa2--test
  - npm install & npm run dev
- 初始化代码，处理路由
- 使用中间件

## 3.1 实现session

- 和express 类似

- 基于koa-generic-session 和 koa-redis

  ```
      cnpm i koa-generic-session koa-redis redis --save
  复制代码
  ```

## 3.2 开发路由

- 复用之前代码，如mysql,登录中间件，controller,model
- 初始化路由，前端联调

```
cnpm i mysql xss --save

复制代码
```

## 3.3 日志

- access log 记录，使用morgan

```
    npm i koa-morgan --save
复制代码
```

- 自定义日志使用console.log 和 console.error
- 日志拆分、日志内存分析

# 4. 中间件原理分析

- 洋葱圈模型
  - Request ---> Response
- 分析
  - app.use 用来注册中间件，先收集起来
  - 实现next机制，即上一个next触发下一个
  - 不涉及method 和 path 判断

# 5. 进程守护 pm2

> PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

- node app.js 和 nodemon app.js 进程崩溃则不能访问
- pm2 遇到进程崩溃，会自动重启
- pm2需要全局安装 `npm install -g pm2`

## 5.1 常用配置 pm2

- 新建pm2 配置文件（包括进程数量，日志文件目录等）
- 修改pm2 启动命令，重启
- 访问server, 检查日志文件的内容（日志记录是否生效）

## 5.2 pm2 常用命令

1. 启动进程/应用 `pm2 start bin/www 或 pm2 start app.js`
2. 重命名进程/应用 `pm2 start app.js --name wb123`
3. 添加进程/应用`watch pm2 start bin/www --watch`
4. 结束进程/应用 `pm2 stop www`
5. 结束所有进程/应用 `pm2 stop all`
6. 删除进程/应用 `pm2 delete www`
7. 删除所有进程/应用 `pm2 delete all`
8. 列出所有进程/应用 `pm2 list`
9. 查看某个进程/应用具体情况 `pm2 describe www`
10. 查看进程/应用的资源消耗情况 `pm2 monit`
11. 查看pm2的日志 `pm2 logs`
12. 若要查看某个进程/应用的日志,使用 `pm2 logs www`
13. 重新启动进程/应用 `pm2 restart www`
14. 重新启动所有进程/应用 `pm2 restart all`

# 6. 多进程

- 为什么使用多进程
  - 操作系统会限制一个进程的最大可用内存
  - 内存：无法充分利用机器的全部内存
  - CPU:无法充分利用多核CPU的优势
- 多进程redis
  - 多进程之间，内存无法共享
  - 多进程访问一个redis,实现数据共享

# 7. 上线与配置总结

- 服务器运维，一般由专业的OP人员和部门来处理
- 大公司都有自己的运维团队
- 中小型工期推荐使用一些云服务，如华为云的node平台
- pm2的核心价值 进程守护
- pm2的常用命令和配置，日志记录
- 多进程













##### Koa2初始化操作

**1.koa-generator快速生成koa服务的脚手架工具**

> 1.1 全局安装脚手架工具

```
npm install -g koa-generator    
```

> 1.2 进入到项目文件夹目录,执行生成命令

```
koa2 项目名
```

> 1.3 安装依赖

```
npm install / cnpm install
```

> 1.4 启动服务

```
npm start / node .bin/www       #默认的访问地址localhost:3000/ 
```

**2. koa-generator创建的koa2框架目录**

```
|-- koa-server 
   |-- app.js             #根入口
   |-- package-lock.json
   |-- package.json
   |-- bin
   |   |-- www
   |-- public            #公共资源
   |   |-- images
   |   |-- javascripts
   |   |-- stylesheets
   |       |-- style.css
   |-- routes
   |   |-- index.js      #定义了localhost:3000/之下的路由
   |   |-- users.js      #定义了localhost:3000/users/之下的路由
   |-- views             #视图Pug是一款HTML模板引擎，专门为 Node.js 平台开发
       |-- error.pug
       |-- index.pug
       |-- layout.pug
```

**3. 备注**

> koa-generator创建项目后，将vue等打包后的文件直接放入`public`文件夹中，然后在`.routes/index.js`中定义首页路由：

```
router
    // 渲染首页
    .get('/',async (ctx,next)=>{
        await ctx.render('index',{});
    })
```

> Koa2将直接将public文件夹中的`index.html`在页面渲染出来。

------

##### 使用pm2部署Koa2项目并实现启动、关闭、自动重启

**1. 全局安装**

```
npm install -g pm2
```

**2. 启动项目**

> 进入项目目录，然后使用pm2启动项目。这里要特别注意：启动**单文件**时用（app.js是项目文件名）

```
pm2 start app.js       #启动单文件
```

> 但是在koa2中需要这样启动：

```
pm2 start ./bin/www #启动koa2项目
```

**3. pm2自动重启**

> 把pm2的服务先停下,然后起来的时候带上--watch就可以了

```
pm2 start ./bin/www --watch
```

**4. 启动完成，可以访问了**

![pm2启动成功](https://segmentfault.com/img/bVbGHD3)

**5. pm2相关命令(www是项目名)**

```
pm2 list           #查看所用已启动项目
pm2 start          #启动
pm2 restart www    #重启
pm2 stop www       #停止
pm2 delete www     #删除
```













# [Node.js运行原理、高并发性能测试对比及生态圈汇总](https://segmentfault.com/a/1190000019425388)

[![img](https://avatar-static.segmentfault.com/246/160/2461605313-5f315f954fa2f_big64)**Peter谭老师**](https://segmentfault.com/u/jerrytanjinjie)发布于 2019-06-09

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000019425388&referer=https%3A%2F%2Fwww.google.com.hk%2F&cb=674b04c218)

![img](https://segmentfault.com/img/remote/1460000019425391?w=1440&h=1080)

#### `Node.js`是从纯前端走向更高阶层的前端，以及全栈工程师的唯一快速途径

- 简单的说`Node.js` 就是运行在服务端的 `JavaScript`
- `Node.js` 是一个基于Chrome `JavaScript` 运行时建立的一个平台
- `Node.js`是一个事件驱动`I/O`服务端`JavaScript`环境，基于`Google`的`V8`引擎，`V8`引擎执行`Javascript`的速度非常快，性能非常好

#### 如果你是一个前端程序员，你不懂得像`PHP`、`Python`或`Ruby`等动态编程语言，然后你想创建自己的服务，那么`Node.js`是一个非常好的选择

- `Node.js `是运行在服务端的 `JavaScript`，如果你熟悉`Javascript`，那么你将会很容易的学会`Node.js`
- 当然，如果你是后端程序员，想部署一些高性能的服务，那么学习`Node.js`也是一个非常好的选择

#### `Node.JS`适合运用在高并发、`I/O`密集、少量业务逻辑的场景

#### `Node.js`的模块组成如下：

![img](https://segmentfault.com/img/remote/1460000019425392?w=720&h=281)

#### `Node.js`的运行机制

- V8引擎解析`JavaScript`脚本
- 解析后的代码，调用`Node API`
- `libuv`库负责`Node API`的执行。它将不同的任务分配给不同的线程，形成一个`EventLoop`（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
- `V8`引擎再将结果返回给用户。

#### 事件循环`（Event Loop）`

- `Nodejs `执行之后会初始化一个事件循环，执行代码程序（这些程序可能会造成异步调用、定时器或者`process.nextTick()`），然后开始执行事件循环。
- 事件循环的执行循序：

![img](https://segmentfault.com/img/remote/1460000019425393?w=730&h=380)

- 上边的每一个模块都是事件循环的一个阶段，每个阶段都有一个要执行的回调的FIFO队列。虽然每个阶段都不同，一般来说，当事件执行到一个阶段，先执行这个阶段特有的操作，然后操作这个阶段的队列，当队列执行完或者达到了回调上限，事件循环就会执行下一个阶段。

各个阶段执行的任务如下：

- `timers 阶段`: 这个阶段执行`setTimeout`和`setInterval`预定的`callback`;
- `I/O callbacks` 阶段: 执行除了`close`事件的`callbacks`、被`timers`设定的`callbacks`、`setImmediate()`设定的`callbacks`这些之外的`callbacks`;
- `idle, prepare` 阶段: 仅node内部使用;
- `poll` 阶段: 获取新的I/O事件, 适当的条件下`node`将阻塞在这里;
- `check` 阶段: 执行`setImmediate()` 设定的`callbacks`;
- `close callbacks` 阶段: 执行`socket.on('close', ...)`这些 `callback`
- `process.nextTick()`不属于上面的任何一个`phase`，它在每个`phase`结束的时候都会运行。也可以认为，`nextTick`在下一个异步方法的事件回调函数调用前执行。

> `TIPS:` `Node.js`中的事件循环机制不会掉头，只会由上往下，循环执行。

#### 完整的一次执行机制可以这样描述

![img](https://segmentfault.com/img/remote/1460000019425394?w=678&h=873)

> 在`Node.js`中，绝大部分`API`都是异步的，有一个很形象的故事描述了`JAVA和Node.js`的区别，`JAVA`是一个餐厅`100`个服务员对应`100`客户，`Node.js`是一个服务员玩命干，也对应`100`个客户，上菜的速度很大一部分取决于厨师的做菜速度

#### Node.js的单线程并不是真正的单线程，只是开启了单个线程进行业务处理（cpu的运算），同时开启了其他线程专门处理I/O。当一个指令到达主线程，主线程发现有I/O之后，直接把这个事件传给I/O线程，不会等待I/O结束后，再去处理下面的业务，而是拿到一个状态后立即往下走，这就是“单线程”、“异步I/O”。

- `I/O`操作完之后呢？`Node.js`的`I/O` 处理完之后会有一个回调事件，这个事件会放在一个事件处理队列里头，在进程启动时node会创建一个类似于`While(true)`的循环，它的每一次轮询都会去查看是否有事件需要处理，是否有事件关联的回调函数需要处理，如果有就处理，然后加入下一个轮询，如果没有就退出进程，这就是所谓的“事件驱动”。这也从`Node`的角度解释了什么是”事件驱动”。
- 在`node.js`中，事件主要来源于网络请求，文件`I/O`等，根据事件的不同对观察者进行了分类，有文件I/O观察者，网络I/O观察者。事件驱动是一个典型的生产者/消费者模型，请求到达观察者那里，事件循环从观察者进行消费，主线程就可以马不停蹄的只关注业务不用再去进行`I/O`等待。
  - 优点： `Node` 公开宣称的目标是 “旨在提供一种简单的构建可伸缩网络程序的方法”。我们来看一个简单的例子，在 Java和 PHP 这类语言中，每个连接都会生成一个新线程，每个新线程可能需要2MB的配套内存。在一个拥有8GBRAM的系统上，理论上最大的并发连接数量是`4,000`个用户。随着您的客户群的增长，如果希望您的Web应用程序支持更多用户，那么，您必须添加更多服务器。所以在传统的后台开发中，整个Web应用程序架构（包括流量、处理器速度和内存速度）中的瓶颈是：服务器能够处理的并发连接的最大数量。这个不同的架构承载的并发数量是不一致的。
  - 而Node的出现就是为了解决这个问题：更改连接到服务器的方式。在`Node` 声称它不允许使用锁，它不会直接阻塞 `I/O `调用。`Node`在每个连接发射一个在 Node 引擎的进程中运行的事件，而不是为每个连接生成一个新的 OS 线程（并为其分配一些配套内存）。

- 缺点：如上所述，`nodejs`的机制是单线程，这个线程里面，有一个事件循环机制，处理所有的请求。在事件处理过程中，它会智能地将一些涉及到IO、网络通信等耗时比较长的操作，交由`worker-threads`去执行，执行完了再回调，这就是所谓的异步IO非阻塞吧。但是，那些非IO操作，只用CPU计算的操作，它就自己扛了，比如算什么斐波那契数列之类。它是单线程，这些自己扛的任务要一个接着一个地完成，前面那个没完成，后面的只能干等。因此，对CPU要求比较高的CPU密集型任务多的话，就有可能会造成号称高性能，适合高并发的node.js服务器反应缓慢。

#### `Node.js`高并发使用`Nginx+pm2`,`pm2`中可以开启多线程负载均衡，模式分两种：

> `pm2`简介: `PM2`是`node`进程管理工具，可以利用它来简化很多`node`应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

下面就对PM2进行入门性的介绍，基本涵盖了PM2的常用的功能和配置。

- `fork`模式，单实例多进程，常用于多语言混编，比如`php、python`等，不支持端口复用，需要自己做应用的端口分配和负载均衡的子进程业务代码。

缺点就是单服务器实例容易由于异常会导致服务器实例崩溃。

- `cluster`模式，多实例多进程，但是只支持`node`，端口可以复用，不需要额外的端口配置，0代码实现负载均衡。

优点就是由于多实例机制，可以保证服务器的容错性，就算出现异常也不会使多个服务器实例同时崩溃。

- 共同点，由于都是多进程，都需要消息机制或数据持久化来实现数据共享。

#### `pm2`部署，默认开启负载均衡：

- `npm i pm2 -g`
- `$ pm2 start app.js # 启动app.js应用程序`
- `$ pm2 start app.js -i 4 # cluster mode 模式启动4个app.js的应用实例 # 4个应用程序会自动进行负载均衡`
- `pm2 start app.js -i max 根据你的cpu数量最大化启动多线程进行负载均衡`
- `如果要停止所有应用，可以pm2 stop all`
- `查看进程状态 pm2 list`
- `pm2真心很好很强大，可以在线热更新代码，更多的指令需要上官网看`

#### `pm2`和`Nginx`配合

- pm2 + nginx
- 无非就是在nginx上做个反向代理配置，直接贴配置。

```
 upstream my_nodejs_upstream {
 server 127.0.0.1:3001;
}
server { 
listen 80;
server_name my_nodejs_server;
root /home/www/project_root; location / { proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host; 
proxy_set_header X-NginX-Proxy true; 
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade; 
proxy_set_header Connection "upgrade";
proxy_max_temp_file_size 0; proxy_pass http://my_nodejs_upstream/;
proxy_redirect off; proxy_read_timeout 240s;
    }
    
```

> 特别说明，我们不建议使用`Node.js`作为底层服务器，更多时候作为中间件和接入层使用，例如`Electron`开发跨平台应用

- `Nginx`开启多线程，负载均衡

#### 负载均衡的作用

- 负载均衡：分摊到多个操作单元上进行执行，和它的英文名称很匹配。就是我们需要一个调度者，保证所有后端服务器都将性能充分发挥，从而保持服务器集群的整体性能最优，这就是负载均衡。

## 负载均衡这里面涉及的东西相对也是比较多的，理论就不说太多了，网上，书上很多，今天我们就利用Nginx服务器来实现一个简单的负载均衡

#### 负载均衡算法

- 源地址哈希法：根据获取客户端的IP地址，通过哈希函数计算得到一个数值，用该数值对服务器列表的大小进行取模运算，得到的结果便是客服端要访问服务器的序号。采用源地址哈希法进行负载均衡，同一IP地址的客户端，当后端服务器列表不变时，它每次都会映射到同一台后端服务器进行访问。
- 轮询法：将请求按顺序轮流地分配到后端服务器上，它均衡地对待后端的每一台服务器，而不关心服务器实际的连接数和当前的系统负载。
- 随机法：通过系统的随机算法，根据后端服务器的列表大小值来随机选取其中的一台服务器进行访问。
- 加权轮询法：不同的后端服务器可能机器的配置和当前系统的负载并不相同，因此它们的抗压能力也不相同。给配置高、负载低的机器配置更高的权重，让其处理更多的请；而配置低、负载高的机器，给其分配较低的权重，降低其系统负载，加权轮询能很好地处理这一问题，并将请求顺序且按照权重分配到后端。
- 加权随机法：与加权轮询法一样，加权随机法也根据后端机器的配置，系统的负载分配不同的权重。不同的是，它是按照权重随机请求后端服务器，而非顺序。
- 最小连接数法：由于后端服务器的配置不尽相同，对于请求的处理有快有慢，最小连接数法根据后端服务器当前的连接情况，动态地选取其中当前积压连接数最少的一台服务器来处理当前的请求，尽可能地提高后端服务的利用效率，将负责合理地分流到每一台服务器。
- 下载`Nginx`，找到`config`文件夹下面的`nginx.conf`，修改下面配置文件
- 每个

```
upstream test{ 
      server 11.22.333.11:6666 weight=1; 
      server 11.22.333.22:8888 down; 
      server 11.22.333.33:8888 backup;
      server 11.22.333.44:5555 weight=2; 
}
//down 表示单前的server临时不參与负载.
//weight 默觉得1.weight越大，负载的权重就越大
//backup： 其他全部的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻
 
```

#### `nginx`命令汇总 ：

```
nginx 服务器重启命令，关闭
nginx -s reload ：修改配置后重新加载生效
nginx -s reopen ：重新打开日志文件
nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

关闭nginx：
nginx -s stop :快速停止nginx
quit ：完整有序的停止nginx

其他的停止nginx 方式：

ps -ef | grep nginx

kill -QUIT 主进程号 ：从容停止Nginx
kill -TERM 主进程号 ：快速停止Nginx
pkill -9 nginx ：强制停止Nginx

 

启动nginx:
nginx -c /path/to/nginx.conf

平滑重启nginx：
kill -HUP 主进程号
```

#### 在开启`Nginx`多线程负载均衡和部署`pm2`负载均衡后的架构图：

- 第一种，`Node.js`作为底层服务器，直接操作数据库的方式：

![img](https://segmentfault.com/img/remote/1460000019425395?w=674&h=506)

- 第二种，`Node.js`作为中间件，访问底层服务器的方式:

![img](https://segmentfault.com/img/remote/1460000019425396?w=1089&h=495)

#### 高并发下性能对比，`Apache、Nginx 与 Node.js `之争

> 高并发下的性能测试对比:

- 参考文章 : [巨头终极对决，`Apache、Nginx 与 Node.js `之争](https://www.oschina.net/news/79567/apache-vs-nginx-vs-node-js)
- 所有的测试都在本地运行：
- 英特尔酷睿 `i7-2600k`，四核八线程的机器
- `Gentoo Linux` 是用于测试的操作系统
- 用于基准测试的工具：`ApacheBench，2.3 <$Revision: 1748469 $>`
- 测试包括一系列基准，从 1000 到 10000 个请求以及从 100 到 1000 个的并发请求——结果相当令人惊讶。

#### 高并发测试结果对比：

- Apache、Nginx 与 Node 的对比：请求负载的性能（每 100 位并发用户）

![img](https://segmentfault.com/img/remote/1460000019425397?w=730&h=234)

- Apache、Nginx 与 Node 的对比：用户负载能力（每 1000 个请求）

![img](https://segmentfault.com/img/remote/1460000019425398?w=730&h=234)

- 压力测试

![img](https://segmentfault.com/img/remote/1460000019425399?w=604&h=433)

> 我们可以从结果中得到什么？

- 从以上结果判断，似乎 Nginx 可以在最少的时间内完成最多请求，换句话来说，Nginx 是最快的 HTTP 服务器。
- 还有一个相当惊人的事实是，在特定的用户并发数和请求数下，Node.js 可以比 Nginx 和 Apache 更快。
- 但当请求的数量在并发测试中增加的时候，Nginx 将重回领先的位置，这个结果可以让那些陷入 Node.js 的遐想的人清醒一下。
- 和 Apache、Nginx 不同的是，Node.js 似乎对用户的并发数不太敏感，尤其是在集群节点。如图所示，集群节点在 0.1 秒左右保持一条直线，而 Apache 和 Nginx 都有大约 0.2 秒的波动。
- 基于上述统计可以得出的结论是：网站比较小，其使用的服务器就无所谓。然而，随着网站的受众越来越多，HTTP 服务器的影响变得愈加明显。
- 当涉及到每台服务器的原始速度的底线的时候，正如压力测试所描述的，我的感觉是，性能背后最关键的因素不是一些特定的算法，而实际上是运行的每台服务器所用的编程语言。
- 由于 Apache 和 Nginx 都使用了 C 语言—— AOT 语言（编译型语言），而 Node.js 使用了 JavaScript ——这是一种 JIT 语言（解释型语言）。这意味着 Node.js 在执行程序的过程中还有额外的工作负担。
- 这意味着我不能仅仅基于上面的结果来下结论，而要做进一步校验，正如你下面看到的结果，当我使用一台经过优化的 Node.js 服务器与流行的 Express 框架时，我得到几乎相同的性能结论。

> 全面考虑

- 逝者如斯夫，如果没有服务的内容，HTTP 服务器是没什么用的。因此，在比较 we服务器的时候，我们必须考虑的一个重要的部分就是我们希望在上面运行的内容。
- 虽然也有其它的功能，但是 HTTP 服务器最广泛的使用就是运行网站。因此，为了看到每台服务器的性能的实际效果，我决定比较一下世界上使用最广泛的 CMS（内容管理系统）WordPress 和 Ghost —— 内核使用了 JavaScript 的一颗冉冉升起的明星。
- 基于 JavaScript 的 Ghost 网页能否胜过运行在 PHP 和 Apache / Nginx 上面的 WordPress 页面？
- 这是一个有趣的问题，因为 Ghost 具有操作工具单一且一致的优点——无需额外的封装，而 WordPress 需要依赖 Apache / Nginx 和 PHP 之间的集成，这可能会导致显著的性能缺陷。
- 除此之外，PHP 距 Node.js 之间还有一个显著的性能落差，后者更佳，我将在下面简要介绍一下，可能会出现一些与初衷大相径庭的结果。

> PHP 与 Node.js 的对决

- 为了比较 WordPress 和 Ghost，我们必须首先考虑一个影响到两者的基本组件。
- 基本上，WordPress 是一个基于 PHP 的 CMS，而 Ghost 是基于 Node.js（JavaScript）的。与 PHP 不同，Node.js 有以下优点：
- 非阻塞的 I/O
- 事件驱动
- 更新颖、更少的残旧代码
- 由于有大量的测评文章解释和演示了 Node.js 的原始速度超过 PHP（包括 PHP 7），我不会再进一步阐述这个主题，请你自行用谷歌搜索相关内容。
- 因此，考虑到 Node.js 的性能优于 PHP，一个 Node.js 的网站的速度要比 Apache / Nginx 和 PHP 的网站快吗？
- WordPress 和 Ghost 对决
- 当比较 WordPress 和 Ghost 时，有些人会说这就像比较苹果和橘子，大多数情况下我同意这个观点，因为 WordPress 是一个完全成熟的 CMS，而 Ghost 基本上只是一个博客平台。
- 然而，两者仍然有共同竞争的市场，这两者都可以用于向世界发布你的个人文章。
- 制定一个前提，我们怎么比较两个完全基于不同的代码来运行的平台，包括风格主题和核心功能。
- 事实上，一个科学的实验测试条件是很难设计的。然而，在这个测试中我对更接近生活的情景更感兴趣，所以 WordPress 和 Ghost 都将保留其主题。因此，这里的目标是使两个平台的网页大小尽可能相似，让 PHP 和 Node.js 在幕后斗智斗勇。
- 由于结果是根据不同的标准进行测量的，最重要的是尺度不一样，因此在图表中并排显示它们是不公平的。因此，我改为使用表：
- Node、Nginx、Apache 以及运行 WordPress 和 Ghost 的比较。前两行是 WordPress，底部的两行是 Ghost
- Node、Nginx、Apache 以及运行 WordPress 和 Ghost 的比较。前两行是 WordPress，底部的两行是 Ghost
- 正如你所见，尽管事实上 Ghost（Node.js）正在加载一个更小的页面（你可能会惊讶 1kb 可以产生这么大的差异），它仍然比同时使用 Nginx 和 Apache 的 WordPress 要慢。
- 此外，使用 Nginx 代理作为负载均衡器来接管每个 Node 服务器的请求实际上会提升还是降低性能？
- 那么，根据上面的表格，如果说它产生什么效果的话，它造成了更慢的效果——这是一个合理的结果，因为额外封装一层理所当然会使其变得更慢。当然，上面的数字也表明这点差异可以忽略不计。
- 但是上表中最重要的一点是，即使 Node.js 比 PHP 快，HTTP 服务器的作用也可能超过某个 web 平台使用的编程语言的重要性。
- 当然，另一方面，如果加载的页面更多地依赖于服务器端的脚本处理，那么我怀疑结果可能会有点不同。
- 最后，如果一个 web 平台真的想在这场竞赛里击败 WordPress，从这个比较中得出的结论就是，要想性能占优，必须要定制一些像 PHP-FPM 的工具，它将直接与 JavaScript 通信（而不是作为服务器来运行），因此它可以完全发挥 JavaScript 的力量来达到更好的性能。

#### `Node.js`的生态圈汇总：

- `Node.js`遵循`commonJS`规范，要说它的生态圈，第一个肯定是`webpack`，用不好`Node.js`的人肯定用不好`webpack`,所以说`Node.js`的一个突破初级前端工程师的好学习方向
- `express koa koa2 egg`一系列的`Node.js`框架，在`Restful`架构下使用，完成常规的一些`http,ajax`请求响应
- `GraphQL`，`GraphQL` 是一种 API 所使用的查询语言,不止`Node.js`有，其他语言也有，不止可以查询，还可以多数据库`CRUD`操作，解决了一部分`RestFul`架构带来的问题
- `mongodb`，非关系型数据库，轻量级别数据库，目前`Node.js`配合使用的比较多的数据库,在`Node.js`中我们一般使用 `mongoose`这个库来配合使用
- `sqlite`，SQLite是一个进程内的库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。它是一个零配置的数据库，这意味着与其他数据库一样，您不需要在系统中配置。就像其他数据库，SQLite 引擎不是一个独立的进程，可以按应用程序需求进行静态或动态连接。SQLite 直接访问其存储文件。
- `Electron`，跨平台桌面开发，可以使用`Node.js`的API，V8的环境也被打包在内。
- `C++`插件，`Node.js`的V8环境就是C++写的，自然也是可以使用C++插件
- `Redis`，数据缓存层，Redis支持主从同步。数据可以从主服务器向任意数量的从服务器上同步，从服务器可以是关联其他从服务器的主服务器。这使得Redis可执行单层树复制。存盘可以有意无意的对数据进行写操作。由于完全实现了发布/订阅机制，使得从数据库在任何地方同步树时，可订阅一个频道并接收主服务器完整的消息发布记录。同步对读取操作的可扩展性和数据冗余很有帮助。
- `SSR`, 以`React`为例，在中间层对代码进行注水，在客户端对代码脱水，实现部分首屏`SSR`,优化首屏渲染时间。
- `websocket`通讯等
- `puppeteer`爬虫

#### 总结一下Node.js

- `Node.js`在目前前端的开发中，是一项不可或缺的技能，它也是让我们走向真正全栈工程师的路不那么陡峭
- `Node.js`适用场景，非密集型计算型
- `Node.js`最核心的部分不止是`RestFul`架构的那一套接受请求，返回数据。还有文件`IO`，流,`Buffer`,`redis层`这一类的操作
- `Node.js`配合`Nginx`进行负载均衡，不仅能提升性能，更能替后端真正减轻很多负担，完成许多特定的需求。
- `Node.js`在做接入层，比如`Electron`中，可以调用很多`Node API`，完成渲染进程不能做的事情，例如文件`io`,`buffer`操作等









# 中间件汇总

+ koa-router：提供全面的路由功能，比如类似Express的app.get/post/put的写法，URL命名参数、路由命名、嵌套路由、支持加载多个中间件
+ koa-body:  可以代替koa-bodyparser和body-parser，比koa-bodyparser多一个解析文件的能力
+ koa-bodyparser：post提交数据中间件，解析请求体时需要加载的中间件，支持x-www-form-urlencoded, application/json等格式的请求体，不支持form-data的请求体
+ koa-views：对进行视图模板渲染，支持ejs, nunjucks等模板引擎
+ koa-static：静态资源中间件，用作类似Nginx的静态文件服务，在本地开发时可用于加载前端文件或后端Fake数据
+ koa-session：session验证，支持将会话信息存储在本地Cookie或Redis, MongoDB
+ koa-jwt：token验证，路由权限控制功能，Session Base转为用Token Base
+ koa-helmet：网络安全，增加Strict-Transport-Security, X-Frame-Options, X-Frame-Options等HTTP头，提高应用程序的安全性
+ koa-compress：当响应体较大时，启用类似Gzip的压缩技术减少传输内容
+ koa-logger：输出请求日志的功能，包括请求的url、状态码、响应时间、响应体大小等信息
+ koa-convert：基于Promise的中间件和基于Generate的中间件相互转换
+ koa-nunjucks-2：轻量级 Nunjucks 中间件，可以用作模板引擎，为koa应用提供页面渲染功能
+ koa-favicon：页面logo加载
+ koa-json：get提交数据的中间件
+ koa-onerror：在服务器产生错误（throw 抛出等）后自动重定义到指定路径
+ koa-respond：在Koa上下文中添加了常用的方法
+ sequelize: 操作数据库