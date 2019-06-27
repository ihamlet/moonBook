const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

const server_host = 'https://hu.wmlife.net/'

module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/Public/lib/bookshelf-jlf/' : '/',
  productionSourceMap:false,
  lintOnSave: false, //先关闭esinst验证
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 15,
            propList: ['*'],
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  devServer:{
    proxy: {
      '/book':{
        target: server_host,
        changeOrigin: true
      },
      '/Public': {
        target: server_host,
        changeOrigin: true
      },
      '/attachs': {
        target: server_host,
        changeOrigin: true
      },
      '/peixun':{
        target: server_host,
        changeOrigin: true
      },
      '/SchoolManage': {
        target: server_host,
        changeOrigin: true
      }
    },
  }
}