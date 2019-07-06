const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function getHtmlConfig(name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html', //将html打包到dist目录下的路径
    inject: true,
    hash: true,
    chunks: ['common', name], //要引入到html的js模块
  }
}

module.exports = {
  mode: 'development',
  //配置多页面，多文件入口
  entry: {
    common: './src/page/common/index.js',
    index: './src/page/index/index.js',
    login: './src/page/login/index.js',
  },

  //打包后的目录
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  //在webpack配置里面要去掉html-loader，否则在html里面引入html文件不生效
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  //开发服务器配置
  devServer: {
    contentBase:path.join(__dirname, 'dist'), //配置dev-server,自动编译代码
    port: 3000,
    proxy: {
      //配置代理，解决跨域问题
      '/api': {
        target: 'http://happymmall.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
    inline: true,
  },

  resolve: {
    alias: {
      //配置别名，引用方便
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image',
    },
  },
}
