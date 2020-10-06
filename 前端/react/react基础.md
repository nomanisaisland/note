# 组件通信

## 父传子 

```react
// 父组件（中的子组件内容）：
constructor(props){
    super(props)
    this.state = {
        btn: "hhh"
    }
    this.test = this.test.bind(this)
}
test() {   // 父组件给子组件传函数，如果需要改变父组件的值需要绑定this
    conosle.log(1)
}
<List btn={this.state.btn} del={this.test}></List>
//子组件中的内容： 
<div onClick={this.props.test}>{this.props.btn}<div>
```



### 子传父

思路： 通过父组件把更改状态的函数和必要参数传递给子组件，子组件再通过传递过来的方法更改父组件的状态

```react
// 父组件
constructor(props) {
	super(props)
	this.state = {
		text: 'niu'
	}
    this.changeText = this.changeText.bind(this)
}
changeText(content) {
    this.setState(()=>{
        text: content
    })
}
<Child chageText="this.changeText"></Child>
// 子组件
changeParent() {
    this.props.chageText('hello')
}
<div onClick="this.changeParent.bind(this)"></div>
```

# react 基础

> jsx 全称JavaScript XML，是js的扩展语法 

## 1. 基本写法

```react
<div>
    {/* 我是注释 */}
    {name}  {/*可以写表达式，但是不可以写条件语句：for  if*/} 
    <div style={{width: '100px'}}>
    </div>
    {/*jsx也是表达式*/}
</div>
```



# 起步

## 上手

1. ```npm I -g create-react-app```   安装官方脚手架
2. ```create-react-app react01```  初始化
3. react的api很少，基本学一次，就不用看文档了，核心就是js功力

## 文件结构



## 事件传参

```react
<ul>
    {
        this.state.goods.map(good=>	{
            <li key="good.id">
                {good.text}
                <buttton onClick={()=> this.addToCart(good)}>加购</buttton>
            </li>
        })
    }
</ul>

// 参数传递成功 
addToCart = (good) => {
    
}
```

## Fiber架构（异步更新、异步渲染）



## react 中配置代理

```js
// proxy 一定要在script前面 字符串方式
"proxy": "http://127.0.0.1:8082/mock/10",
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  
 // 对象配置方向
// 需要安装一个中间件
npm install http-proxy-middleware --save
//然后创建一个新文件“ src / setupProxy.js”，然后键入
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:/8080',
      changeOrigin: true,
    })
  );
};
```

## 配置alias

```javascript
 npm install react-app-rewired customize-cra --save-dev
 
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app eject"
  },
  
 // 新建config-overrides.js文件
  const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
    config.resolve.alias = {
        '@': resolve('src')
    }
    return config;
}
```

```javascript

// config-overrides.js
// 本文件用于覆盖webpack默认配置

const path = require('path')

//  按需加载组件代码和样式的 babel 插件
const { override, fixBabelImports, addWebpackPlugin } = require('customize-cra')

//  使用 Day.js 替换 momentjs 优化打包大小
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

//alias配置别名
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
  config.resolve.alias = {
    '@': resolve('src'),
  }
  // vw适配方案
  require('react-app-rewire-postcss')(config, {
    plugins: (loader) => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      require('postcss-aspect-ratio-mini')({}),
      require('postcss-px-to-viewport')({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      }),
      require('postcss-write-svg')({
        utf8: false,
      }),
      require('postcss-viewport-units')({}),
      require('cssnano')({
        preset: 'advanced',
        autoprefixer: false,
        'postcss-zindex': false,
      }),
    ],
  })
  // ant自定义主题 以及 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  },config),
  // 使用 Day.js 替换 momentjs 优化打包大小
  addWebpackPlugin(new AntdDayjsWebpackPlugin(), config)
  return config
}

// npm i cssnano-preset-advanced --save-dev
```

## 模块化路由

```javascript
// router.js
import login from '@/page/login/'

// path: '/',//首页默认加载的页面
// componentName: login,
// exact: true //是否为严格模式
// route:[{}]
let router = [
    {
        path: '/login',//首页默认加载的页面
        Component: login,
        exact: true //是否为严格模式
    }
];


export default router;


//app.jsx
import React, { Component } from 'react'
import router from '@/routers/index.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class pageApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {}
    }
  }
  render () {
    return (
      <Router>
        <div className="App">
          {
            router.map(({ path, Component, exact = true, routes = [] }, key) => {
              return <Route
                exact={exact}
                key={key}
                path={path}
                render={props => (
                  //主要是为了传递嵌套路由到子组件 
                  //类似于 <User {...props} routes={routes} />
                  <Component {...props} routes={routes} />
                )}
              />
            })
          }
        </div>
      </Router>
    )
  }
}

export default pageApp
```

# 完整配置

```javascript
// 请注意less-loader 需要用5.0.0版本
// addLessLoader 需要将react-script 降级到3.2.0 否则不支持模块化
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addBabelPlugins,
  addWebpackPlugin,
  useBabelRc,
  disableChunk,
  adjustWorkbox,
  setWebpackPublicPath,
  addBundleVisualizer,
  disableEsLint,
  addWebpackExternals,
} = require('customize-cra')
const path = require('path')
const paths = require('react-scripts/config/paths')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
//   const CompressionWebpackPlugin = require('compression-webpack-plugin')
const rewireCompressionPlugin = require('react-app-rewire-compression-plugin')
const rewireUglifyjs = require('react-app-rewire-uglifyjs')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 补充：对开发友好，打包完成桌面提醒
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
  const webpackConfig = require('./webpack.config.js')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const Dashboard = require('webpack-dashboard')
// const DashboardPlugin = require('webpack-dashboard/plugin')
// const dashboard = new Dashboard()
const theme = require('./theme')
// SKIP_PREFLIGHT_CHECK = true
/**
 * 生产环境是否打包 Source Map 两种方法
 *
 */
const rewiredMap = () => (config) => {
  config.devtool =
    config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}
process.env.PORT = 8080
process.env.GENERATE_SOURCEMAP !== 'false'

/**
 * baocuo
 * @param {*} dir
 */
  const addWebpackModules = () => config => {
    const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf
    loaders[loaders.length - 4] = Object.assign(
      loaders[loaders.length - 4],
      webpackConfig.module.rules[0]
    )
    return config
  }

// path
const resolveAlias = (dir) => path.join(__dirname, '.', dir)
// 热跟新
const hotLoader = () => (config, env) => {
  config = rewireReactHotLoader(config, env)
  return config
}
const addPostCssVW = () => (config, env) => {
  config = require('react-app-rewire-postcss')(config, {
    plugins: (loader) => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      require('postcss-aspect-ratio-mini')({}),
      require('postcss-px-to-viewport')({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      }),
      require('postcss-write-svg')({
        utf8: false,
      }),
      // 过滤覆盖filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1 防止报错
      require('postcss-viewport-units')({filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1}),
      require('cssnano')({
        preset: 'advanced',
        autoprefixer: false,
        'postcss-zindex': false,
      }),
    ],
  })
  return config
}
// build--->prod --->文件设置
const appBuildPathFile = () => (config) => {
  if (config.mode === 'development') {
  } else if (config.mode === 'production') {
    // 关闭sourceMap
    config.devtool = false
    //  // 配置打包后的文件位置修改path目录
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
    config.output.path = path.join(path.dirname(config.output.path), 'dist')
    // 添加js打包gzip配置
    // config.plugins.push(
    //   new CompressionWebpackPlugin({
    //     test: /\.js$|\.css$/,
    //     threshold: 1024
    //   })
    // )
    // 更改生产模式输出的文件名
    // config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]'
    // config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]'
  }
  return config
}

//生产环境去除console.* functions
const dropConsole = () => {
  return (config) => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}
/**
   *
   * @description 解决打包的时候如下报错
   * @url{https://github.com/ant-design/ant-design/issues/15696}
   * https://blog.csdn.net/peade/article/details/84890399
  chunk 3 [mini-css-extract-plugin]
  Conflicting order between:
   * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/input/style/index.less
   * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/message/style/index.less
   */
const delConflictingOrder = () => {
  return (config) => {
    for (let i = 0; i < config.plugins.length; i++) {
      const p = config.plugins[i]
      if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
        const miniCssExtractOptions = { ...p.options, ignoreOrder: true }
        config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions)
        break
      }
    }
  }
}
const addMiniCssExtractPlugin = () => {
  return (config) => {
    config.plugins.unshift(
      new FilterWarningsPlugin({
        // exclude: /any-warnings-matching-this-will-be-hidden/
        // exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        exclude: /\[mini-css-extract-plugin\][^]*Conflicting order between:/,
      })
    )
  }
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    addLessLoader({
      // strictMath: true,
      lessOptions: {
        noIeCompat: true,
      javascriptEnabled: true,
      modifyVars: { ...theme },
      localIdentName: '[local]--[hash:base64:5]', // 自定义 CSS Modules 的 localIdentName
      }
    }),
    setWebpackPublicPath('/'), // 修改 publicPath
    addWebpackExternals({
      React: 'React',
      lodash: 'Lodash',
    }),
    //   addWebpackModules(),
    addWebpackAlias({
      '@': resolveAlias('src'),
      lib: resolveAlias('src/lib'),
      components: resolveAlias('src/components'),
      images: resolveAlias('src/assets/images'),
      styled: resolveAlias('src/assets/styled'),
      views: resolveAlias('src/views'),
      store: resolveAlias('src/store'),
      router: resolveAlias('src/router'),
      locale: resolveAlias('src/locale'),
      // 处理警告  React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.
      // 'react-dom': '@hot-loader/react-dom'
      // 解决antd 的icon图标打包体积大
      // '@ant-design/icons': 'purched-antd-icons'
    }),
    disableEsLint(),
    addPostCssVW(),
    appBuildPathFile(),
    disableChunk(),
    dropConsole(),
    // 关闭mapSource
    rewiredMap(),
    // 热跟新
    hotLoader(),
    // 配置babel解析器
    addBabelPlugins(['@babel/plugin-proposal-decorators', { legacy: true }]),
    //   //启用ES7的修改器语法（babel 7）
    //   // ['@babel/plugin-proposal-decorators', {legacy: true}],
    //   // ['@babel/plugin-proposal-class-properties', {loose: true}],
    //   // 打包编译完成提醒
    addWebpackPlugin(
      new WebpackBuildNotifierPlugin({
        title: '',
        logo: path.resolve('./public/logo.svg'),
        suppressSuccess: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[id].[contenthash].css',
        ignoreOrder: false,
        // moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
      }),
      // 美化控制台
      // new DashboardPlugin(dashboard.setData),
      // 进度条
      new ProgressBarPlugin(),
      delConflictingOrder(),
      addMiniCssExtractPlugin()
    ),
    rewireUglifyjs,
    rewireCompressionPlugin,
    // 允许使用.babelrc文件进行Babel配置。
    //   useBabelRc(),
    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    //   process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
    //   adjustWorkbox(wb =>
    //     Object.assign(wb, {
    //       skipWaiting: true,
    //       exclude: (wb.exclude || []).concat('index.html')
    //     })
    //   )
    // addDecoratorsLegacy(), // 解析器,
  ),
}
```



