### Webpack4

```shell
npm install 
webpack@4.44.2
webpack-cli@3.3.12
webpack-dev-server@3.11.2
-D
```

* 简单运行.vue文件

```shell
npm install 
@vue/compiler-sfc@3.1.2
vue-loader@16.5.0
vue-style-loader@4.1.3
vue-template-compiler@2.6.14
-D
```

* webpack插件(html/css/sass)

```shell
npm install 
html-webpack-plugin@4.5.0
css-loader@4
sass-loader@10.1.1
sass@1.45.2
-D
```

#### 项目结构

```diff
  |- /dist
  |- /src
 	|- /assets
 	   |- /font
 	      |- iconfont.css
 	      |- iconfont.ttf
 	   |- logo.png
 	|- /css
 	   |- index.less
 	   |- index.css
    |- index.js
  |- index.html
  |- webpack.config.js
  |- webpack.dll.js
  |- package.json

```

  

* package.json

```json
"scripts": {
    "build": "webpack --mode production",
    "serve":"npx webpack-dev-server"
  },
  "dependencies": {},
"devDependencies": {
    "css-loader": "3.4.2",
    "file-loader": "3.0.1",
    "html-loader": "0.5.5",
    "html-webpack-plugin": "3.2.0",
    "less": "3.0.0",
    "less-loader": "5.0.0",
    "mini-css-extract-plugin": "0.9.0",
    "optimize-css-assets-webpack-plugin": "5.0.3",
    "postcss-loader": "3.0.0",
    "postcss-preset-env": "6.7.0",
    "style-loader": "1.1.3",
    "url-loader": "3.0.0",
    "webpack": "4.41.6",
    "webpack-cli": "3.3.11",
    "webpack-dev-server": "3.10.3"
  },
 "browserslist":{
   "development":[//开发模式不需要兼容太多,主要做调试的版本就可以(最近的一个版本)
     "last 1 chrome version",
     "last 1 firefox version",
     "last 1 safari version"
   ],
  "production":[ //绝大多数做了兼容
     ">0.2%",
     "not dead",
     "not op_mini all"
   ]
 }
```

#### webpack.config.js

```js
/**
 * css
 * scss
 * png|gif|jpg
 * html模板
 * 字体文件(其它文件)
 * 抽离css文件
 * 出口文件分类
 * 浏览器兼容
 *
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

process.env.NODE_ENV = 'production' //指定环境变量的值, postcss兼容时会选择生产的配置

module.exports = {
  mode: 'development', //开发模式
  entry: './src/index.js', //入口文件
  devServer: {//开发服务的配置,只打包到内存,不做实际打包,作用于开发时实时预览
    contentBase: resolve(__dirname, 'dist'),//打包后的文件路径,跟出口文件路径一致
    compress: true,//是否开启gzip 压缩
    port: '80',//启动后的端口
    index: 'index.html',//索引文件的文件名,默认就是index.html,配置一下应该启动会快一点..
    publicPath: '/',//静态资源访问路径 默认就是/ => 比如: ip/build.js (文档有说明)
  },
  output: {
    filename: 'build.js', //出口文件名
    path: resolve(__dirname, 'dist'), //打包到build文件夹下
  },
  module: {
    rules: [
      {
        test: /\.css$/, //css文件编译
        use: ['style-loader','css-loader']
      },
      {
        test: /\.less$/, //less文件
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      //或者
      {
        test: /\.less$/,//不使用scss是因为这个版本node-sass安装爱报错,
           // 'style-loader', 将出口文件里的css插入到html中的style标签中
           MniCssExtractPlugin.loader,//3. 将出口文件中的css内容编译成css文件,并引入html文件中
           'css-loader',//2. 将入口文件中引入的css文件编译成css内容放入到出口文件
           'less-loader', //1. 
           {
           		loader: 'postcss-loader',//css兼容处理
            	options: {
                 	ident: 'postcss',//固定写法
              		plugins: () => [
                		require('postcss-preset-env')(),//postcss-preset-env 插件,自动读取package.json中browserlist配置
               ]
             }
           },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,//无法处理html文件的图片,需要配合html-loader
        loader: 'url-loader',
        options: {
          //8k以下进行压缩,优点:减少请求减轻服务压力,缺点:加载慢,文件变大
          limit: 8192,
          esModule: false, //html-loader处理的图片使用的commonjs语法,而url-loader是es6,所以需要关闭掉统一才能编译html文件的图片
          //name: 'img/[name].[hash:10].[ext]'->文件名格式
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader'//能够编译html文件的图片,但是使用的是commonjs语法
      },
      {
        exclude: /\.(html|png|jpg|gif|less|css|js)$/, //这些文件以外使用file-loader 一定要将js排除,否则会冲突
        loader: 'file-loader',
        options: {
          name: 'asstes/[name].[hash:6].[ext]', //打包后的文件名
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //模板复刻，以一个模板为基础复刻一个html文件为index.html,并且自动引入出口js文件
      template: './index.html',
      minify: {//模板的压缩配置 (文档有说明(
        collapseWhitespace: true,//去除空白区
        removeComments: true,//去除注释
      }
    }),
    new MniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css'//生成文件的文件名格式
    }) //将出口文件的css内容抽离成单个css文件，并且引入html，需要在loader指定
    new optimizeCssAssetsWebpackPlugin()//压缩css文件
  ],
}
```

#### webpack.dll.js

* 分离打包第三方库

```js
const { resolve } = require('path')
const webpack = require('webpack')
const { dll_path, library } = require('./CONFIG.js')

module.exports = {
    entry: {
        ...library
    },
    output: {
        filename: 'vandor_.[name].[hash:6].js',
        path: resolve(__dirname, dll_path), //单独打包的库文件放在dll_path文件夹下
        lirary: '[name]'//这是打包后库里面暴露出去的名字
    }，
    plugins: [
    	new webpack.DllPlugin({// 生成一个映射关系文件告诉webpack这些内容不用打包
    		name: '[name]', //映射库暴露的内容
    		path: resolve(__dirname, dll_path, 'vendor_[name].json') //记录映射的这个文件的文件路径
		})
    ]
}
```

* CONFIG.js

```js
module.exports = {
    dll_path:'Dll_vendor',
    library:{
        dll:['jquery'],
        axios_dll:['axios']
    }
}
```

  
