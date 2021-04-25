1、初始化项目
在终端输入：npm init -y

这时候我们看见根目录下多了一个package.json的文件夹，里面我写了部分的代码


2、安装依赖
由于需要安装的依赖太多了，我就直接在package.json的devDependencies和dependencies里面写入需要安装的依赖了，然后直接npm install

注意：
a、在安装babel相关的依赖的时候，要先确保安装了babe命令行：npm install --save-dev babel-cli，建议不要全局安装，在项目中安装就可以，一次性安装：npm install babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015 babel-runtime --save-dev

b、webpack中autoprefixer是配合postcss-loader一起的，首先安装相应的依赖：npm i -D style-loader css-loader postcss-loader autoprefixer

c、在webpack中默认只能处理js文件部分，对于ES6的高级语法，要借助第三方loader来帮助webpack将高级的语法转换成低级的语法：babel-loader、babel-core、babel-preset-env

d、安装vue：npm install vue --save

{
  "name": "webpackVue",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "webpack-dev-server --config webpack.config.js --port 3000",
    "build": "webpack --progress --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.6.12",
    "core-js": "^3.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.7.2",
    "@babel/plugin-transform-runtime": "^7.6.2",
    "@babel/preset-env": "^7.7.1",
    "autoprefixer": "^9.7.1",
    "babel-loader": "^8.0.6",
    "babel-plugin-import": "^1.12.2",
    "css-loader": "^3.2.0",
    "file-loader": "^4.2.0",
    "html-webpack-plugin": "^3.2.0",
    "postcss-loader": "^3.0.0",
    "style-loader": "^1.0.0",
    "terser-webpack-plugin": "^2.2.1",
    "url-loader": "^2.2.0",
    "vue-loader": "^15.7.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0"
  }
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
这里简单的说明一下这些依赖有什么用

1、core：用来兼容es6的语法，我安装的是3.x的版本，可以安装指定的版本，在@后面指定版本号就行npm install core-js@3 --save

2、plugin-transform-runtime：可以减小项目文件的大小，先安装npm install --save-dev babel-plugin-transform-runti 然后再安装npm install --save babel-runtime

3、preset-env：按需转码用的，npm install --save-dev babel-preset-env

4、autoprefixer：根据你需要兼容的浏览器版本来自动增加前缀的工具

5、babel-loader：转换es6代码，npm i babel-loader -D

6、babel-plugin-import：会在编译过程中将 import 的写法自动转换为按需引入的方式，npm i babel-plugin-import -D

7、css-loader、style-loader：使用webpack打包时对于css类文件不能直接打包，需要安装对应的loader，npm install css-loader style-loader --save-dev

8、file-loader：由于webpack只能处理js类型的文件，无法打包其他类型的，不安装相应的loader打包图片就会报错，比如图片，安装这个就可以对图片等类型进行打包，npm install --save-dev file-loader

9、html-webpack-plugin：打包的dist 目录属于构建目录，是我们源码的输出目录，我们希望里面的一切都是可以自动化的，包括 index.html 文件也能自动创建，js 文件也能自动引入到页面，
所以我们需要用到插件 html-webpack-plugin，使用之前应该新建一个html模板，好让插件在执行命令时，知道参照谁来生成对应的 html 文件，npm install html-webpack-plugin --save-dev

10、terser-webpack-plugin： 打包时自动去除console.log，npm install terser-webpack-plugin --save-dev

11、urlurl-loader：访问简单的图片，将文件转换为base64URL，配合file-loader使用，npm install url-loader --save-dev

12、vue-loader：打包vue类型的文件（一定要先安装vue），npm install vue-loader --save-dev

13、vue-template-compiler：将 Vue 2.0 模板预编译为渲染函数（template => ast => render），以避免运行时编译开销和 CSP。配合vue-loader使用，npm install vue-template-compiler

14、安装webpack相关：npm install -- save-dev webpack webpack-cli webpack-dev-server

3、新建项目相关文件
在根目录下新建public文件夹，并在里面新建index.html（首页入口文件）
新建src文件夹，并新建views文件夹存放vue文件和app.vue（项目入口文件）
新建main.js（核心js文件，全局的配置写在这里）


main.js部分代码

import Vue from 'vue'
import store from './store'
import router from './router'
// import Antd from 'ant-design-vue';
import { List, Modal, Input } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.min.css';
import app from './src/App'
import {ConfigProvider} from 'ant-design-vue'
Vue.config.productionTip = false;

// Vue.use(Antd);
Vue.use(List)
Vue.use(Modal)
Vue.use(Input)
message.config({
    duration: 1.5,// 持续时间
    top:"120px", // 到页面顶部距离
    maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});

new Vue({
    store,
    router,
    render: h => h(app)
}).$mount('#app')
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
根目录下新建webpack.config.js，进行webpack配置

webpack.config.js代码

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	//入口文件
    entry: {
        main: './main.js',
    },
    //输入文件名
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[chunkhash:8].bundle.js"
    },
    //环境，development：开发环境
    mode: 'development',
    resolve: {
    	//配置目录别名
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@assets': path.resolve('./src/assets'),
            '@views': path.resolve('./src/views'),
            '@utils': path.resolve('./src/utils'),
            '@components': path.resolve('./src/components'),
        },
        //配置文件扩展名，这样引入的时候后面就不用加.vue、.js等后缀名了
        extensions: ['*', '.js', '.vue', '.json']
    },
    //配置服务器
    devServer: {
    	//是否关闭用于DNS重绑定的http请求的host检查
        disableHostCheck: true,
        //配置代理
        proxy: {
          //'http://106.53.151.120:8888/user-info/
          '/api' : {
          	//目标请求地址
            target: 'http://132.232.223.165:8888/',
            //是否在请求头中加入host首部
            changeOrigin: false,
            //检测是否是http是否是s
            secure:false,
            //正则匹配路径
            pathRewrite: { '^/api': '' }
          }
        }
    },
    module: {
    	//验证规则
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        "corejs": 3,
                                        "targets": {
                                        	//兼容浏览器最后两个版本的，小于等于ie9版本的
                                            "browsers": [
                                                "last 2 versions",
                                                "not ie <= 9"
                                            ]
                                        },
                                    }
                                ]
                            ],
                            "plugins": [
                            	// `style: true` 会加载 less 文件
                                ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": 'true' }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer(['last 2 version', '> 1%', 'not ie < 11'])]
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 3 * 1024,
                        outputPath: 'images',// 将文件打包到哪里
                        publicPath: 'images/',
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
        	//引用的模板文件路径
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
            	//是否缓存
                cache: true,
                //是否定位源文件的代码
                sourceMap: true,
                terserOptions: {
                    comments: false,
                    //打包的时候不打包用不到的、console.log的、debug调试的、死代码等代码
                    compress: {
                        unused: true,
                        drop_console: true,
                        drop_debugger: true,
                        dead_code: true
                    }
                },
                //是否多进程并行压缩代码
                parallel: true,
            })
        ]
    }
    
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
index.html代码

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>xxxxxxxx</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
1
2
3
4
5
6
7
8
9
10
11
4、打包、运行测试
我们在package.json的scripts中写入如下脚本，因为我的8080端口被占用了，就暂时先用3000的端口

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "webpack-dev-server --config webpack.config.js --port 3000",//运行脚本
    "build": "webpack --progress --config webpack.config.js"//打包脚本
  },
1
2
3
4
5


在终端输入npm run build进行打包

这个dist文件夹就是我们打包后的文件夹


我们先在app.vue中随便写点东西，输入npm run serve运行项目



打开浏览器查看，也没有任何报错


5、引入路由
1、第一步我们先npm安装vue-router：npm install vue-router --save

2、在和main.js同级的目录下新建router.js,并写入代码，在views目录下新建首页home.vue来作为刚进入展示的第一个页面

home.vue代码

<template>
  <div>我是home.vue</div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style>

</style>

router.js代码

//引入vue、vue路由和相关vue文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/home/home'

Vue.use(VueRouter)
//防止路由跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//导出路由
export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        //重定向
        {
            path: '/Home',
            name: 'Home',
            redirect: {
                name: 'Home'
            },
            component: Home,
            children: [
                
            ]
        }
    ]

})
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
3、在main.js中引入路由

import Vue from 'vue'
import app from './src/app.vue'
//引入路由的js文件
import router from './router'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(app)
}).$mount('#app')
1
2
3
4
5
6
7
8
9
10
11
4、在app.vue中写入router-view

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }

</script>
<style scoped>
</style>
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
最后在浏览器中就能看到效果啦

————————————————
版权声明：本文为CSDN博主「一个什么都不会的前端」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_43090018/article/details/109570260