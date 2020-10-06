## webpack配置

### proxy配置代理解决跨域问题

 设置代理的前提条件：
1、需要使用本地开发插件：[webpack-dev-server](https://github.com/webpack/webpack-dev-server)。
2、webpack-dev-server使用的是[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)来实现跨域代理的。
3、webpack版本： 3.0、4.0亲测有效 

```java
module.exports = {
  //...
  devServer: {
    proxy: {
      //捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，比如API请求/api/users, 会被代理到请求 http://www.baidu.com/api/users 。 
      '/api': {      
        //target 代理的地址，就是需要跨域的api地址，如果是域名需要额外添加一个参数changeOrigin: true，否则会代理失败。 
        target: 'http://www.baidu.com/', //域名:http://www.baidu.com  ip地址：http://127.0.0.1:3000
        // pathRewrite: 路径重写，也就是说会修改最终请求的API路径。
        // 比如访问的API路径：/api/users,
        // 设置pathRewrite: {'^/api' : ''},后，
        //  最终代理访问的路径：http://www.baidu.com/users，
        //  这个参数的目的是给代理命名后，在访问时把命名删除掉。
        pathRewrite: {'^/api' : ''},  
        changeOrigin: true,     // target是域名的话，需要这个参数
        // 设置支持https协议的代理,不检查安全问题。可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器
        secure: false,          
      },
      '/api2': {
          .....
      }
    }
  }
};
```



创建项目文件夹



用npm的包管理工具管理起来 `npm init -y`  其中`-y`是`yes`，表示跳过提问阶段直接生成`package`文件

如果创建的项目名称是中文则不能加`-y`，需要回答问题

创建`dist`文件夹， 是项目打包之后输出的文件夹

创建`src`文件夹

创建`/src/index.html`这是项目的首页

创建`/src/main.js`  项目的入口文件

然后 `webpack .\src\main.js -o .\dist\bundle.js`命令



因为`webpack`打包命令每次都要输入十分麻烦，所以需要安装  `webpack-dev-server`:

`cnpm i webpack-dev-server -D`,同时根据提示需要同时在项目本地中安装`webpack`

`cnpm i webpack -D`

 然后在项目的根目录中新建一个 `webpack.config.js` 

```js
const path = require('path')
module.exports = {

  entry: path.join(__dirname, './src/main.js'),// 入口，表示，要使用 webpack 打包哪个文件
  output: { // 输出文件相关的配置
    path: path.join(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
    filename: 'bundle.js' // 这是指定 输出的文件的名称
  }
```

这里添加上项目的输入和输入文件,这样只需要`webpack`命令即可打包



为了用`webpack-dev-server`,需要在`package.json`中添加脚本:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot",
  }
  
```

然后使用`npm run dev`

`webpack-dev-server`会帮我们托管资源此时`script`标签中`../dist/bundle.js`路径是错误的，正确的应该是`/bundle.js`

这时候我们使用`html-webpack-plugin`插件解决这个问题  

可以在内存中根据指定的模板页面生成一份内存中的首页，同时自动把打包好的bundle注入到页面的底部，

同时如果要配置插件，需要在导出的对象中挂在一个plugins节点

```js
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //制定模板文件路径
            filename: 'index.html'   //指定生成页面的名称
        })
    ],
}
```





添加css,在/css中创建css文件

在`main.js`中添加

```js
import './css/index.css'
```

这样会报错，因为webpack处理不了非JS文件

安装`style-loader`和`css-loader`------>`cnpm i style-loader css-loader -D`

在webpack中添加module，配置所有第三方loader模块

module中的rules是第三方模块的匹配规则

```js
module:{
        rules: [
          
            {test: /\.css$/, use:['style-loader', 'css-loader']}, //配置.css文件的第三方loader规则
            {test: /\.less$/, use:['style-loader', 'css-loader' ,'less-loader']}, //配置处理.less文件的第三方loader规则 
            {test: /\.scss/, use:['style-loader', 'css-loader', 'less-loader']}
        ]
    }
```

其中use中的使用顺序是从右往左

# webpack快速入门

## 1. 目标

    1). 理解项目的模块化打包
    2). 学会webpack的基本使用
    3). 理解webpack的4个核心概念

## 2. 初始化项目

    创建空应用: demo1
    npm init -y

## 3. 下载webpack

    npm install webpack -g   //全局下载webpack
    npm install webpack --save-dev  //下载webpack为开发依赖

## 4. 编码

    1. bar.js
      export default function bar() {
        console.log('bar()')
      }
    2. app.js
      import bar from './bar'
      bar()
      document.getElementById('app').innerHTML = 'Hello, webpack'
    3. page.html
      <html>
        <head>
          <title>Hello webpack</title>
        </head>
        <body>
          <div id="app"></div>
          <script src="bundle.js"></script>
        </body>
      </html>

## 5. 使用webpack打包项目

    1. webpack配置: webpack.config.js
      module.exports = {
        entry: './app.js',
        output: {
          filename: 'bundle.js'
        }
      }
    2. 编译打包
      webpack
    3. 浏览器打开page.html, 查看运行效果

# 编译打包各种类型资源

## 1. 目标

    1). 利用webpack打包项目中的各种资源
        * JS(ES6)
        * CSS
        * 图片
        * JSON
    2). 加深对loader和plugin的理解

## 2. 下载依赖包

    1). jquery包
        npm install --save jquery@1.12
    2). babel相关包
        npm install --save-dev babel-core babel-loader babel-preset-env babel-plugin-transform-runtime
    3). 处理css文件的包
        npm install --save-dev css-loader style-loader
    4). 处理图片的包
        npm install --save-dev url-loader file-loader
    5). 处理HTML
        npm install --save-dev html-webpack-plugin

## 3. 编码

    1). 创建整体结构
        demo2
            |--src
                |--assets
                    |--css
                    |--img
                    |--json
                |--index.js
            |--index.html
            |--webpack.config.js
    2). index.html
        <h1>尚硅谷后期课程</h1>
        <div id="app"></div>   
    3). 添加图片: assets/img/atguigu.jpg
    	![atguigu](https://i.imgur.com/UP73Jdt.jpg)
    4). 添加样式: assets/css/style.css
        body {
          padding: 20px;
          background: url("../img/atguigu.jpg");
          font-size: 20px;
        }
    5). 添加json: assets/json/lessons.json
        [{
            "name": "ES5/6/7",
            "days": 2
          },
          {
            "name": "JS高级",
            "days": 3
          },
          {
            "name": "JS模块化",
            "days": 1.5
          },
          {
            "name": "react及项目",
            "days": 8
          },
          {
            "name": "redux",
            "days": 1
          },
          {
            "name": "vue及项目",
            "days": 8
          },
          {
            "name": "vue源码分析",
            "days": 2
          },
          {
            "name": "vuex",
            "days": 1
          },
          {
            "name": "webpack模块化打包",
            "days": 2
          },
          {
            "name": "项目实战",
            "days": 7
          }]
    6). 添加自定义JS模块: src/math.js
        export function square(x) {
          return x * x
        }
        export function cube(x) {
          return x * x * x
        }
    7). 实现入口js编码
        import $ from 'jquery'
        import {cube} from "./math"
        import lessons from './assets/json/lessons.json'
        import './assets/css/style.css'
        
        console.log(cube(3))
        
        $(function () {
          const $app = $('#app')
          const $ul = $('<ul>')
          $app.append($ul)
          lessons.forEach(lesson => {
            $ul.append(`<li>课程名: ${lesson.name}, 时间: ${lesson.days}天</li>`)
          })
        })

## 4. 配置

    1). babel配置: .babelrc
        {
          "presets": ["env"],
          "plugins": ["transform-runtime"]
        }  
    2). webpack配置: webpack.config.js
        var path = require('path')
        var HtmlPlugin = require('html-webpack-plugin')
        
        // 得到指定文件夹的绝对路径
        function resolve(dir) {
          return path.resolve(__dirname, dir)
        }
        
        module.exports = {
          // 入口
          entry: './src/index.js',
          // 出口
          output: {
            path: resolve('dist'),
            filename: 'bundle.js'
          },
          // 模块加载器
          module: {
            rules: [
              // 将src下所有js从es6编译为es5
              {
                test: /\.js$/,
                use: 'babel-loader',
                include: [resolve('src')]
              },
              // 加载css
              {
                test: /\.css$/,
                use: [
                  'style-loader', // 将js中的css动态插入到DOM中
                  'css-loader' // 将css加载到打包的js中
                ]
              },
              // 加载图片
              {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
              }
            ]
          },
          // 插件
          plugins: [
            // 根据模板生成html(自动引入js/css)
            new HtmlPlugin({
              filename: 'index.html', //生成文件
              template: 'index.html', //模板文件
              inject: true //自动注入js/css
            })
          ]
        }
    3). 添加打包命令配置: package.json
        "scripts": {
          "build": "webpack"
        },

## 5. 打包并运行项目

    npm run build
    npm install -g pushstate-server
    pushstate-server dist
    访问: http://localhost:9000

# 开发/生产环境打包

## 1. 目标

    1). 2种环境不同的配置
    2). 开发环境: 实现live-reload, 开启sourceMap调试
    3). 生产环境: 单独打包css, 单独打包第三方JS包, 打包文件缓存处理

## 2. 下载依赖包

    npm install --save-dev clean-webpack-plugin   //清理文件插件
    npm install --save-dev extract-text-webpack-plugin  //抽取css单独打包插件
    npm install --save-dev webpack-dev-server  // webpack开发服务器
    npm install --save-dev webpack-merge  // 合并webpack配置的包

## 3. webpack配置

    1). 基础配置: build/webpack.base.conf.js
        const path = require('path')
        const HtmlPlugin = require('html-webpack-plugin')
        
        function resolve(dir) {
          return path.resolve(__dirname, '..', dir)
        }
        
        module.exports = {
          // 入口
          entry: {
            app: './src/index.js'
          },
          // 出口
          output: {
            path: resolve('dist'),
            filename: '[name].js',
            publicPath: '/'
          },
        
          // 模块加载
          module: {
            rules: [
              // 处理js
              {
                test: /\.js$/,
                use: 'babel-loader',
                include: [resolve('src')]
              },
              // 处理图片
              {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'url-loader',
                options: {
                  limit: 1000,
                  name: 'static/img/[name].[hash:8].[ext]'
                }
              }
            ]
          },
          // 插件
          plugins: [
            // 生成html
            new HtmlPlugin({
              template: 'index.html',
              filename: 'index.html', //目标文件夹是: dist
              inject: true
            })
          ]
        }
    2). 开发环境配置: build/webpack.dev.conf.js
        /*
        开发环境的配置
         */
        const merge = require('webpack-merge')
        
        const baseConfig = require('./webpack.base.conf')
        
        module.exports = merge(baseConfig, {
          // 模块加载器
          module: {
            rules: [
              // 加载css
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
            ]
          },
          // 开启sourceMap调试
          devtool: 'cheap-source-map',
        })
    3). 生产环境配置: build/webpack.prod.conf.js
        const path = require('path')
        const merge = require('webpack-merge')
        const ExtractTextPlugin = require('extract-text-webpack-plugin')
        const CleanPlugin = require('clean-webpack-plugin')
        const baseConfig = require('./webpack.base.conf')
        
        function resolve(dir) {
          return path.resolve(__dirname, '..', dir)
        }
        
        module.exports = merge(baseConfig, { // 合并配置
          // 出口
          output: {
            path: resolve('dist'),
            filename: 'static/js/[name].[chunkhash].js'
          },
          // 模块加载
          module: {
            rules: [
              // 加载css
              {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ // 抽取css
                  use: 'css-loader'
                })
              }
            ]
          },
        
          plugins: [
            // 清理dist文件夹
            new CleanPlugin(['dist'], {
              root: resolve('')
            }),
            // 抽取所有css到指定文件
            new ExtractTextPlugin({
              filename: 'static/css/[name].[contenthash].css'
            })
          ]
        })

## 4. 打包运行命令配置

    "scripts": {
      "start": "webpack-dev-server --config build/webpack.dev.conf.js --open",
      "build": "webpack --config build/webpack.prod.conf.js",
      "server": "pushstate-server dist"
    }

## 5. 打包运行

    1). 开发运行
        npm start
        修改js/css, 直接查看效果
    2). 生产打包运行
        npm run build
        npm run server

