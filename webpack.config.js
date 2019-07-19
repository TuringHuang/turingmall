const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

//环境变量配置
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

function getHtmlConfig(name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html', //将html打包到dist目录下的路径
    title: title,
    inject: true,
    hash: false,
    chunks: ['common', name], //要引入到html的js模块
  }
}

module.exports = {
  mode: 'dev' === WEBPACK_ENV ? 'development' : 'production',

  //配置多页面，多文件入口
  entry: {
    common: './src/page/common/index.js',
    index: './src/page/index/index.js',
    'user-login': './src/page/user-login/index.js',
    result: './src/page/result/index.js',
  },

  //打包后的目录
  output: {
    filename: 'js/[name].js',
    publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
  },

  //在webpack的rules里面要去掉html-loader，否则在html里面引入html文件不生效
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },

      //模板文件的处理
      {
        test: /\.string$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
          },
        },
      },
      //图片处理
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              /*
               * 【改动】：图片小于2kb的按base64打包
               */
              limit: 2048,
              name: 'resource/[name].[ext]',
            },
          },
        ],
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  //提取公共代码
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        common: {
          enforce: true,
          // 抽离自己写的公共代码，名字可以随意起
          chunks: 'all',
          name: 'common', // 任意命名
          minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数,默认是1
        },
      },
    },
  },

  plugins: [
    //打包html配置
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    //把css单独打包成文件，否则css样式会在js文件里以字符串的形式存在
    new ExtractTextPlugin('css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
  ],

  //开发服务器配置
  devServer: {
    contentBase: path.join(__dirname, 'dist/view'), //配置dev-server,自动编译代码
    port: 8080,
    proxy: {
      //配置代理，解决跨域问题
      '/api': {
        target: 'http://happymmall.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
    inline: true, //及时刷新
    overlay: true,
  },

  resolve: {
    alias: {
      //配置别名，引用方便
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image',
    },
  },
}
