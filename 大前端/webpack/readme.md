# [webpack 入门教程](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=webpack-入门教程)

## [webpack 是什么？](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=webpack-是什么？)

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

![webpack](https://malun666.github.io/aicoder_vip_doc/images/webpack.png)

## [快速了解几个基本的概念](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=快速了解几个基本的概念)

### [mode 开发模式](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=mode-开发模式)

webpack 提供 mode 配置选项，配置 webpack 相应模式的内置优化。

```diff
// webpack.production.config.js
module.exports = {
+  mode: 'production',
}
```

### [入口文件(entry)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=入口文件entry)

入口文件，类似于其他语言的起始文件。比如：c 语言的 main 函数所在的文件。

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

可以在 webpack 的配置文件中配置入口，配置节点为： `entry`,当然可以配置一个入口，也可以配置多个。

### [输出(output)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=输出output)

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。

```js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

### [loader](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=loader)

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

### [插件(plugins)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=插件plugins)

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

## [webpack 的安装](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=webpack-的安装)

请确保安装了 `Node.js` 的最新版本。而且已经在您的项目根目录下已经初始化好了最基本的`package.json`文件

### [本地安装 webpack](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=本地安装-webpack)

```sh
$ npm install --save-dev webpack

# 如果你使用 webpack 4+ 版本，你还需要安装 CLI。
npm install --save-dev webpack-cli
```

安装完成后，可以添加`npm`的`script`脚本

```js
// package.json
"scripts": {
    "start": "webpack --config webpack.config.js"
}
```

### [全局安装 webpack（不推荐)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=全局安装-webpack（不推荐)

将使 webpack 在全局环境下可用：

```sh
npm install --global webpack
```

> 注意：不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

## [快速入门完整 demo](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=快速入门完整-demo)

- 第一步：创建项目结构

首先我们创建一个目录，初始化 npm，然后 在本地安装 webpack，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：

```sh
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

项目结构

```diff
  webpack-demo
+ |- package.json
+ |- /dist
+   |- index.html
+ |- /src
+   |- index.js
```

- 第二步：安装 loadash 依赖和编写 js 文件

```sh
npm install --save lodash
```

编写：src/index.js 文件

```js
import _ from 'lodash';

function createDomElement() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  return dom;
}

document.body.appendChild(createDomElement());
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>起步</title>
</head>
<body>
  <script src="./main.js"></script>
</body>
</html>
```

- 第三步：编写 webpack 配置文件

根目录下添加 `webpack.config.js`文件。

```diff
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

webpack.config.js 内容如下：

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  }
};
```

- 执行构建任务

直接执行构建任务：

```sh
npx webpack
```

打开： dist/index.html 可以查看到页面的结果。

## [加载非 js 文件](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=加载非-js-文件)

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件

### [加载 CSS 文件](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=加载-css-文件)

- 第一步： 安装 css 和 style 模块解析的依赖 `style-loader` 和 `css-loader`

```sh
npm install --save-dev style-loader css-loader
```

- 第二步： 添加 css 解析的 loader

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

- `css-loader`： 辅助解析 js 中的 `import './main.css'`
- `style-loader`: 把 js 中引入的 css 内容 注入到 html 标签中，并添加 style 标签.依赖 `css-loader`

> 你可以在依赖于此样式的 js 文件中 导入样式文件，比如：import './style.css'。现在，当该 js 模块运行时，含有 CSS 字符串的 `` 标签，将被插入到 html 文件的 ``中。

- 第三步： 编写 css 文件和修改 js 文件

在 src 目录中添加 `style.css`文件

```diff
 webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

src/style.css

```css
.hello {
  color: red;
}
```

修改 js 文件

```diff
  import _ from 'lodash';
+ import './style.css';

  function createDomElement() {
    let dom = document.createElement('div');
    dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
+   dom.className = 'hello';
    return dom;
  }

  document.body.appendChild(createDomElement());
```

最后重新打开 dist 目录下的 index.html 看一下文字是否变成了红色的了。

### [module 配置补充](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=module-配置补充)

模块(module): 这些选项决定了如何处理项目中的不同类型的模块。

webpack 模块可以支持如下:

- ES2015 import 语句
- CommonJS require() 语句
- AMD define 和 require 语句
- css/sass/less 文件中的 @import 语句。
- 样式`(url(...))`或 HTML 文件`()`中的图片链接`(image url)`

#### [module.noParse](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=modulenoparse)

值的类型： RegExp | [RegExp] | function

防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

```js
module.exports = {
  mode: 'devleopment',
  entry: './src/index.js',
  ...
  module: {
    noParse: /jquery|lodash/,
    // 从 webpack 3.0.0 开始,可以使用函数，如下所示
    // noParse: function(content) {
    //   return /jquery|lodash/.test(content);
    // }
  }
  ...
};
```

#### [module.rules](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=modulerules)

创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。

```js
module.exports = {
  ...
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  ...
};
```

#### [module Rule](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=module-rule)

- Rule 条件详解
  - 字符串：匹配输入必须以提供的字符串开始。是的。目录绝对路径或文件绝对路径。
  - 正则表达式：test 输入值。
  - 函数：调用输入的函数，必须返回一个真值(truthy value)以匹配。
  - 条件数组：至少一个匹配条件。
  - 对象：匹配所有属性。每个属性都有一个定义行为。

#### [Rule.test](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=ruletest)

- { test: Condition }：匹配特定条件。一般是提供一个正则表达式或正则表达式的数组，但这不是强制的。

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  ...
};
```

其他的条件比如：

- `{ include: Condition }`:匹配特定条件。一般是提供一个字符串或者字符串数组，但这不是强制的。
- `{ exclude: Condition }`:排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。
- `{ and: [Condition] }`:必须匹配数组中的所有条件
- `{ or: [Condition] }`:匹配数组中任何一个条件
- `{ not: [Condition] }`:必须排除这个条件

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "app/styles"),
          path.resolve(__dirname, "vendor/styles")
        ],
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  ...
};
```

#### [Rule.use](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=ruleuse)

应用于模块指定使用一个 loader。

Loaders can be chained by passing multiple loaders, which will be applied from right to left (last to first configured).

加载器可以链式传递，从右向左进行应用到模块上。

```js
use: [
  'style-loader',
  {
    loader: 'css-loader'
  },
  {
    loader: 'less-loader',
    options: {
      noIeCompat: true
    }
  }
];
```

> 传递字符串（如：use: [ "style-loader" ]）是 loader 属性的简写方式（如：use: [ { loader: "style-loader "} ]）。

### [加载 Sass 文件](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=加载-sass-文件)

加载 Sass 需要`sass-loader`。

安装

```sh
npm install sass-loader node-sass webpack --save-dev
```

使用：

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
  }
};
```

为 sass 文件注入内容：

如果你要将 Sass 代码放在实际的入口文件(entry file)之前，可以设置 data 选项。此时 sass-loader 不会覆盖 data 选项，只会将它拼接在入口文件的内容之前。

```js
{
    loader: "sass-loader",
    options: {
        data: "$env: " + process.env.NODE_ENV + ";"
    }
}
```

> 注意：由于代码注入, 会破坏整个入口文件的 source map。 通常一个简单的解决方案是，多个 Sass 文件入口。

### [创建 Source Map](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=创建-source-map)

`css-loader`和`sass-loader`都可以通过该 options 设置启用 sourcemap。

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }]
  }
};
```

### [PostCSS 处理 loader（附带：添加 css3 前缀）](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=postcss-处理-loader（附带：添加-css3-前缀）)

[PostCSS](https://postcss.org/)是一个 CSS 的预处理工具，可以帮助我们：给 CSS3 的属性添加前缀，样式格式校验（stylelint），提前使用 css 的新特性比如：表格布局，更重要的是可以实现 CSS 的模块化，防止 CSS 样式冲突。

我们常用的就是使用 PostCSS 进行添加前缀，以此为例：

安装

```sh
npm i -D postcss-loader
npm install autoprefixer --save-dev

# 以下可以不用安装
# cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
$ npm install postcss-cssnext --save-dev

# 类似scss的语法，实际上如果只是想用嵌套的话有cssnext就够了
$ npm install precss --save-dev

# 在@import css文件的时候让webpack监听并编译
$ npm install postcss-import --save-dev
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
```

### [样式表抽离成专门的单独文件并且设置版本号](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=样式表抽离成专门的单独文件并且设置版本号)

首先以下的 css 的处理我们都把 mode 设置为 `production`。

webpack4 开始使用： `mini-css-extract-plugin`插件, 1-3 的版本可以用： `extract-text-webpack-plugin`

> 抽取了样式，就不能再用 `style-loader`注入到 html 中了。

```sh
npm install --save-dev mini-css-extract-plugin
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'; // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css', // 设置最终输出的文件名
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
};
```

再次运行打包：

在 dist 目录中已经把 css 抽取到单独的一个 css 文件中了。修改 html，引入此 css 就能看到结果了。

### [压缩 CSS](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=压缩-css)

webpack5 貌似会内置 css 的压缩，webpack4 可以自己设置一个插件即可。

压缩 css 插件：`optimize-css-assets-webpack-plugin`

安装

```sh
npm i -D optimize-css-assets-webpack-plugin
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: '[id][hash].css'
    })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
};
```

### [JS 压缩](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=js-压缩)

压缩需要一个插件： `uglifyjs-webpack-plugin`, 此插件需要一个前提就是：`mode: 'production'`.

安装

```sh
npm i -D uglifyjs-webpack-plugin
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: '[id][hash].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
```

### [解决 CSS 文件或者 JS 文件名字哈希变化的问题](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=解决-css-文件或者-js-文件名字哈希变化的问题)

`HtmlWebpackPlugin`插件，可以把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中，这样就不用每次手动修改文件引用了。

安装

```sh
npm install --save-dev html-webpack-plugin
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: '[id][hash].css'
    }),
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'main.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true // 移除属性的引号
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
```

### [清理 dist 目录](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=清理-dist-目录)

每次构建，我们的 `/dist` 文件夹都会保存生成的文件，然后就会非常杂乱。

通常，在每次构建前清理 `/dist` 文件夹，是比较推荐的做法

`clean-webpack-plugin` 是一个比较普及的管理插件，让我们安装和配置下。

```sh
npm install clean-webpack-plugin --save-dev
```

webpack.config.js

```diff
  const path = require('path');
  ....
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin()
      ...
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
    ...
  };
```

现在执行 `npm run build`，再检查 `/dist` 文件夹。如果一切顺利，你现在应该不会再看到旧的文件，只有构建后生成的文件！

> *由于最新版本变化@2.0.1\*之前的写法已经不能使用：`new CleanWebpackPlugin(['/dist'])`。 官方文档地址：https://www.npmjs.com/package/clean-webpack-plugin 可以直接设置一个对象参考： `new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*']})`

### [加载图片与图片优化](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=加载图片与图片优化)

在 css 文件或者 sass 文件中添加如下代码

```diff
$red: #900;
$size: 20px;

.box {
  height: 30px*2;
  font-size: $size;
  transform: translate3d( 0, 0, 0 );
+ background: url('../static/1.jpeg')
}
```

运行打包发现如下错误：

```sh
ERROR in ./src/static/1.jpeg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
```

解决方案：`file-loader`处理文件的导入

```sh
npm install --save-dev file-loader
```

webpack.config.js

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

此时运行打包，发现 dist 目录多了一个图片文件，另外报错不再出现。

那更进一步，图片如何进行优化呢？

`image-webpack-loader`可以帮助我们对图片进行压缩和优化。

```sh
npm install image-webpack-loader --save-dev
```

如果下载后打包显示打包失败，应该是依赖安装不全，换个镜像源重新下载即可

使用：webpack.config.js

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
          use: [
            'file-loader',
+           {
+             loader: 'image-webpack-loader',
+             options: {
+               mozjpeg: {
+                 progressive: true,
+                 quality: 65
+               },
+               optipng: {
+                 enabled: false,
+               },
+               pngquant: {
+                 quality: '65-90',
+                 speed: 4
+               },
+               gifsicle: {
+                 interlaced: false,
+               },
+               webp: {
+                 quality: 75
+               }
+             }
+           },
          ]
        }
      ]
    }
  };
```

此时在运行 webpack，发现会 生成的图片的大小会被压缩很多。

### [更进一步处理图片成 base64](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=更进一步处理图片成-base64)

`url-loader`功能类似于 file-loader，可以把 url 地址对应的文件，打包成 base64 的 DataURL，提高访问的效率。

如何使用：

```sh
npm install --save-dev url-loader
```

webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader', // 根据图片大小，把图片优化成base64
            options: {
              limit: 10000
            }
          },
          {
            loader: 'image-webpack-loader', // 先进行图片优化
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
};
```

### [字体的处理（同图片）](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=字体的处理（同图片）)

由于 css 中可能引用到自定义的字体，处理也是跟图片一致。

```diff
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

## [开发相关辅助](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=开发相关辅助)

### [合并两个webpack的js配置文件](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=合并两个webpack的js配置文件)

开发环境(development)和生产环境(production)配置文件有很多不同点，但是也有一部分是相同的配置内容，如果在两个配置文件中都添加相同的配置节点， 就非常不爽。

`webpack-merge` 的工具可以实现两个配置文件进合并，这样我们就可以把 开发环境和生产环境的公共配置抽取到一个公共的配置文件中。

安装：

```sh
npm install --save-dev webpack-merge
```

例如：

project

```diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

webpack.common.js

```diff
+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```

webpack.dev.js

```diff
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });
```

webpack.prod.js

```diff
+ const merge = require('webpack-merge');
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   plugins: [
+     new UglifyJSPlugin()
+   ]
+ });
```

### [js 使用 source map](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=js-使用-source-map)

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。

使用 `inline-source-map` 选项，这有助于解释说明 js 原始出错的位置。（不要用于生产环境）：

webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

![inline-source-map](https://malun666.github.io/aicoder_vip_doc/images/webpackinline.png)

### [监控文件变化，自动编译。使用观察模式](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=监控文件变化，自动编译。使用观察模式)

每次修改完毕后，都手动编译异常痛苦。最简单解决的办法就是启动`watch`。

```sh
npx webpack --watch
```

当然可以添加到 npm 的 script 中

package.json

```diff
{
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "npx webpack --watch",
      "build": "npx webpack"
    },
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.16",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^3.0.0",
      "xml-loader": "^1.2.1"
    }
  }
```

但是有个 bug，就是每次我们修改 js 或者 css 文件后，要看到修改后的 html 的变化，需要我自己重新刷新页面。

如何能不刷新页面，自动更新变化呢？

### [使用 webpack-dev-server 和热更新](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=使用-webpack-dev-server-和热更新)

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

安装

```sh
npm install --save-dev webpack-dev-server
```

webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

启动此 webserver：

```sh
webpack-dev-server --open
```

[官网其他配置](https://webpack.docschina.org/configuration/dev-server/)：

```js
devServer: {
  clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
  hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
  contentBase:  path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
  compress: true, // 一切服务都启用gzip 压缩
  host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
  port: 8080, // 端口
  open: true, // 是否打开浏览器
  overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
    warnings: true,
    errors: true
  },
  publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
  proxy: {  // 设置代理
    "/api": {  // 访问api开头的请求，会跳转到  下面的target配置
      target: "http://192.168.0.102:8080",
      pathRewrite: {"^/api" : "/mockjsdata/5/api"}
    }
  },
  quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
  watchOptions: { // 监视文件相关的控制选项
    poll: true,   // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
    ignored: /node_modules/, // 忽略监控的文件夹，正则
    aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
  }
}
```

如何启用热更新呢？

webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
       app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),  // 更容易查看(patch)的依赖
+     new webpack.HotModuleReplacementPlugin()  // 替换插件
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### [JS启用babel转码](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=js启用babel转码)

虽然现代的浏览器已经兼容了96%以上的ES6的语法了，但是为了兼容老式的浏览器（IE8、9）我们需要把最新的ES6的语法转成ES5的。那么`babel`的loader就出场了。

安装

```sh
npm i -D babel-loader babel-core babel-preset-env
```

用法

在webpack的配置文件中，添加js的处理模块。

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,  // 加快编译速度，不包含node_modules文件夹内容
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}
```

然后，在项目根目录下，添加babel的配置文件 `.babelrc`.

`.babelrc`文件如下：

```json
{
  "presets": ["env"]
}
```

最后，在入口js文件中，添加ES6的❤新语法：

```js
class Temp {
  show() {
    console.log('this.Age :', this.Age);
  }
  get Age() {
    return this._age;
  }
  set Age(val) {
    this._age = val + 1;
  }
}

let t = new Temp();
t.Age = 19;

t.show();
```

最后打包：

```sh
npx webpack
```

最终打包后的js代码：

```js
var a = 1,
    b = 3,
    c = 9;

console.log('a :', a);
console.log('b :', b);
console.log('c :', c);

var Temp = function () {
  function Temp() {
    _classCallCheck(this, Temp);
  }

  _createClass(Temp, [{
    key: 'show',
    value: function show() {
      console.log('this.Age :', this.Age);
    }
  }, {
    key: 'Age',
    get: function get() {
      return this._age;
    },
    set: function set(val) {
      this._age = val + 1;
    }
  }]);

  return Temp;
}();

var t = new Temp();
t.Age = 19;

t.show();
```

### [Babel优化](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=babel优化)

babel-loader可以配置如下几个options：

- `cacheDirectory`：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (loader: 'babel-loader?cacheDirectory') 或者 true (loader: babel-loader?cacheDirectory=true)，loader 将使用默认的缓存目录 node_modules/.cache/babel-loader，如果在任何根目录下都没有找到 node_modules 目录，将会降级回退到操作系统默认的临时文件目录。
- `cacheIdentifier`：默认是一个由 babel-core 版本号，babel-loader 版本号，.babelrc 文件内容（存在的情况下），环境变量 BABEL_ENV 的值（没有时降级到 NODE_ENV）组成的字符串。可以设置为一个自定义的值，在 identifier 改变后，强制缓存失效。
- `forceEnv`：默认将解析 BABEL_ENV 然后是 NODE_ENV。允许你在 loader 级别上覆盖 BABEL_ENV/NODE_ENV。对有不同 babel 配置的，客户端和服务端同构应用非常有用。

> 注意：sourceMap 选项是被忽略的。当 webpack 配置了 sourceMap 时（通过 devtool 配置选项），将会自动生成 sourceMap。

babel 在每个文件都插入了辅助代码，使代码体积过大.babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。 默认情况下会被添加到每一个需要它的文件中。你可以引入 `babel runtime` 作为一个独立模块，来避免重复引入。

安装：

```sh
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```

配置：

webpack.config.js

```js
rules: [
  // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
    }
  }
]
```

修改`.babelrc`

```json
{
  "presets": ["env"],
  "plugins": [
    ["transform-runtime", {
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

此时，webpack打包的时候，会自动优化重复引入公共方法的问题。

### [ESLint校验代码格式规范](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=eslint校验代码格式规范)

安装

```sh
npm install eslint --save-dev
npm install eslint-loader --save-dev

# 以下是用到的额外的需要安装的eslint的解释器、校验规则等
npm i -D babel-eslint standard

npx eslint --init
初始化eslint 并进行配置
```

使用

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
          fix: true
        }
      },
    ],
  },
  // ...
}
```

eslint配置可以直接放到webpack的配置文件中，也可以直接放到项目根目录的 `.eslintrc`中[文档](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)。

```js
// .eslintrc.js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  globals: {
    NODE_ENV: false
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 添加，分号必须
    semi: ['error', 'always'],
    'no-unexpected-multiline': 'off',
    'space-before-function-paren': ['error', 'never'],
    // 'quotes': ["error", "double", { "avoidEscape": true }]
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ]
  }
};
```

此时eslint的配置就结束了。

### [到此为止，一个完整的开发阶段的webpack的配置文件](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=到此为止，一个完整的开发阶段的webpack的配置文件)

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
    hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    compress: true, // 一切服务都启用gzip 压缩
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    port: 8085, // 端口
    open: true, // 是否打开浏览器
    overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
      warnings: true,
      errors: true
    },
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    proxy: { // 设置代理
      "/api": { // 访问api开头的请求，会跳转到  下面的target配置
        target: "http://192.168.0.102:8080",
        pathRewrite: {
          "^/api": "/mockjsdata/5/api"
        }
      }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { // 监视文件相关的控制选项
      poll: true, // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
      ignored: /node_modules/, // 忽略监控的文件夹，正则
      aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: [{
          loader: 'babel-loader'
        },{
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [autoprefixer({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].css', chunkFilename: '[id].css'}),
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(), // 更容易查看(patch)的依赖
    new webpack.HotModuleReplacementPlugin(), // 替换插件
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true, // 移除属性的引号
      },
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  optimization: {}
};

```

用于生产环境的配置

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: [{
          loader: 'babel-loader'
        },{
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [autoprefixer({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader'
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name][hash].css', chunkFilename: '[id][hash].css'}),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true, // 移除属性的引号
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
```

## [解析(resolve)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=解析resolve)

配置模块如何解析。比如： `import _ from 'lodash'` ,其实是加载解析了lodash.js文件。此配置就是设置加载和解析的方式。

- `resolve.alias`

创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块：

```diff
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
+ resolve: {
+   alias: {
+     vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
+     '@': path.resolve(__dirname, 'src/')
+   }
+ }
  ...
}

// index.js
// 在我们的index.js文件中，就可以直接import
import vue from 'vue';
// 等价于
import vue from  'src/lib/vue/dist/vue.esm.js';

```

- `resolve.extensions`的应用

自动解析确定的扩展。

```diff
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    alias: {
      vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
      '@': path.resolve(__dirname, 'src/')
    },
+   extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
  }
  ...
}
```

> 给定对象的键后的末尾添加 $，以表示精准匹配

## [外部扩展(externals)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=外部扩展externals)

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。 [文档](https://webpack.docschina.org/configuration/externals/)

例如，从 CDN 引入 jQuery，而不是把它打包：

index.html

```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```

webpack.config.js

```diff
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  alias: {
    extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
    vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
    '@': path.resolve(__dirname, 'src/')
  },
+ externals: {
+   jquery: 'jQuery'
+ },
  ...
}
```

这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：

```js
import $ from 'jquery';

$('.my-element').animate(...);
```

具有外部依赖(external dependency)的 bundle 可以在各种模块上下文(module context)中使用，例如 CommonJS, AMD, 全局变量和 ES2015 模块。外部 library 可能是以下任何一种形式：

- root：可以通过一个全局变量访问 library（例如，通过 script 标签）。
- commonjs：可以将 library 作为一个 CommonJS 模块访问。
- commonjs2：和上面的类似，但导出的是 module.exports.default.
- amd：类似于 commonjs，但使用 AMD 模块系统。

不同的配置方式：

```js
externals : {
  react: 'react'
}

// 或者

externals : {
  lodash : {
    commonjs: "lodash",
    amd: "lodash",
    root: "_" // 指向全局变量
  }
}

// 或者

externals : {
  subtract : {
    root: ["math", "subtract"]   // 相当于： window.math.substract
  }
}
```

## [构建目标(targets)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=构建目标targets)

webpack 能够为多种环境或 target 构建编译。想要理解什么是 target 的详细信息，请阅读 target 概念页面。

`target`: 告知 webpack 为目标(target)指定一个环境。

可以支持以下字符串值：

| 选项              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| async-node        | 编译为类 Node.js 环境可用（使用 fs 和 vm 异步加载分块）      |
| electron-main     | 编译为 Electron 主进程。                                     |
| electron-renderer | 编译为 Electron 渲染进程，使用 JsonpTemplatePlugin, FunctionModulePlugin 来为浏览器环境提供目标，使用 NodeTargetPlugin 和 ExternalsPlugin 为 CommonJS 和 Electron 内置模块提供目标。 |
| node              | 编译为类 Node.js 环境可用（使用 Node.js require 加载 chunk） |
| node-webkit       | 编译为 Webkit 可用，并且使用 jsonp 去加载分块。支持 Node.js 内置模块和 nw.gui 导入（实验性质） |
| web               | 编译为类浏览器环境里可用（默认）                             |
| webworker         | 编译成一个 WebWorker                                         |

例如，当 target 设置为 "electron"，webpack 引入多个 electron 特定的变量.

webpack.config.js

```diff
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  alias: {
    extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
    vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
    '@': path.resolve(__dirname, 'src/')
  },
  externals: {
    jquery: 'jQuery'
  },
+ target: 'node'
  ...
}
```

## [相关的loader列表](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=相关的loader列表)

`webpack` 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。

### [文件](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=文件)

- `raw-loader` 加载文件原始内容（utf-8）
- `val-loader` 将代码作为模块执行，并将 exports 转为 JS 代码
- `url-loader` 像 file loader 一样工作，但如果文件小于限制，可以返回 [data URL](https://tools.ietf.org/html/rfc2397)
- `file-loader` 将文件发送到输出文件夹，并返回（相对）URL

### [JSON](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=json)

- `json-loader` 加载 [JSON](http://json.org/) 文件（默认包含）
- `json5-loader` 加载和转译 [JSON 5](https://json5.org/) 文件
- `cson-loader` 加载和转译 [CSON](https://github.com/bevry/cson#what-is-cson) 文件

### [转换编译(Transpiling)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=转换编译transpiling)

- `script-loader` 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析
- `babel-loader` 加载 ES2015+ 代码，然后使用 [Babel](https://babeljs.io/) 转译为 ES5
- `buble-loader` 使用 [Bublé](https://buble.surge.sh/guide/) 加载 ES2015+ 代码，并且将代码转译为 ES5
- `traceur-loader` 加载 ES2015+ 代码，然后使用 [Traceur](https://github.com/google/traceur-compiler#readme) 转译为 ES5
- [`ts-loader`](https://github.com/TypeStrong/ts-loader) 或 [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader) 像 JavaScript 一样加载 [TypeScript](https://www.typescriptlang.org/) 2.0+
- `coffee-loader` 像 JavaScript 一样加载 [CoffeeScript](http://coffeescript.org/)

### [模板(Templating)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=模板templating)

- `html-loader` 导出 HTML 为字符串，需要引用静态资源
- `pug-loader` 加载 Pug 模板并返回一个函数
- `jade-loader` 加载 Jade 模板并返回一个函数
- `markdown-loader` 将 Markdown 转译为 HTML
- [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader) 使用 markdown-parse parser(解析器) 将 Markdown 编译为 React 组件
- `posthtml-loader` 使用 [PostHTML](https://github.com/posthtml/posthtml) 加载并转换 HTML 文件
- `handlebars-loader` 将 Handlebars 转移为 HTML
- [`markup-inline-loader`](https://github.com/asnowwolf/markup-inline-loader) 将内联的 SVG/MathML 文件转换为 HTML。在应用于图标字体，或将 CSS 动画应用于 SVG 时非常有用。

### [样式](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=样式)

- `style-loader` 将模块的导出作为样式添加到 DOM 中
- `css-loader` 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
- `less-loader` 加载和转译 LESS 文件
- `sass-loader` 加载和转译 SASS/SCSS 文件
- `postcss-loader` 使用 [PostCSS](http://postcss.org/) 加载和转译 CSS/SSS 文件
- `stylus-loader` 加载和转译 Stylus 文件

### [清理和测试(Linting && Testing)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=清理和测试linting-ampamp-testing)

- `mocha-loader` 使用 [mocha](https://mochajs.org/) 测试（浏览器/NodeJS）
- [`eslint-loader`](https://github.com/webpack-contrib/eslint-loader) PreLoader，使用 [ESLint](https://eslint.org/) 清理代码
- `jshint-loader` PreLoader，使用 [JSHint](http://jshint.com/about/) 清理代码
- `jscs-loader` PreLoader，使用 [JSCS](http://jscs.info/) 检查代码样式
- `coverjs-loader` PreLoader，使用 [CoverJS](https://github.com/arian/CoverJS) 确定测试覆盖率

### [框架(Frameworks)](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=框架frameworks)

- `vue-loader` 加载和转译 [Vue 组件](https://vuejs.org/v2/guide/components.html)
- `polymer-loader` 使用选择预处理器(preprocessor)处理，并且 `require()` 类似一等模块(first-class)的 Web 组件
- `angular2-template-loader` 加载和转译 [Angular](https://angular.io/) 组件
- Awesome 更多第三方 loader，查看 [awesome-webpack 列表](https://github.com/webpack-contrib/awesome-webpack#loaders)。

## [打包分析优化](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=打包分析优化)

`webpack-bundle-analyzer`插件可以帮助我们分析打包后的图形化的报表。

> 仅仅在开发环境使用。

安装

```sh
npm install --save-dev webpack-bundle-analyzer
+ const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  module.exports = {
    plugins: [
+     new BundleAnalyzerPlugin()
    ]
  }
```

自动生成一个网页报表，如下所示： ![图片](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif)

## [other](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=other)

webpack还是有很多其他需要学习的内容。 请参考官网，或者研究一下`vue-cli`的生成的webpack的相关配置，也很值得学习。

另外其他脚手架生成的相关配置都可以研究一下比如：`create-react-app`、`yo`等









```js
// 由于 webpack 是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
var path = require('path')
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin')

// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = {
  entry: path.join(__dirname, './src/main.js'), // 入口文件
  output: { // 指定输出选项
    path: path.join(__dirname, './dist'), // 输出路径
    filename: 'bundle.js' // 指定输出文件的名称
  },
  plugins: [ // 所有webpack  插件的配置节点
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
      filename: 'index.html' // 设置生成的内存页面的名称
    })
  ],
  module: { // 配置所有第三方loader 模块的
    rules: [ // 第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
      // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
      { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
    ]
  },
  resolve: {
    alias: { // 修改 Vue 被导入时候的包的路径
      // "vue$": "vue/dist/vue.js"
    }
  }
}
```

## 理解webpack4

从 webpack v4.0.0 开始，可以不用引入一个配置文件（不配置，也就是零配置也可以使用，通過npx webpack可以直接执行），然而，webpack 仍然还是[高度可配置的](https://www.webpackjs.com/configuration)

webpack 的四个核心概念：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

SourceMap 一个存储源代码与编译代码对应位置映射的信息文件

在前端的工作中主要是用来解决以下三个方面出现的 debug 问题：

> a. 代码压缩混淆后
> b. 利用 sass 、typeScript 等其他语言编译成 css 或 JS 后
> c. 利用 webpack 等打包工具进行多文件合并后

上面三种情况，我们在调试时都是没办法像调试源码般轻松，这就需要 SourceMap 帮助我们在控制台中转换成源码，从而进行 debug 。







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



