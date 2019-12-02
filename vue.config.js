const path = require('path')
const config = {
  publicPath: '/sgcc-frontend-wechat/',
  lintOnSave: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/sgcc-wechat-application/api': {
        target: 'http://ecargouat.jiajues.com'
      },
      '/car-deepexi-product-center': {
        target: 'http://ecargouat.jiajues.com'
      },
      'car-deepexi-shop-center': {
        target: 'http://ecargouat.jiajues.com'
      },  
      '/car-deepexi-member-center': {
        target: 'http://ecargouat.jiajues.com'
      },
      '/car-deepexi-shop-center': {
        target: 'http://ecargouat.jiajues.com'
      },
      '/wx': {
        target: 'http://ecargouat.jiajues.com'
      },
      '/sgcc-console-application': {
        target: 'http://ecargouat.jiajues.com'
      },
      '/car-deepexi-trade-center': {
        target: 'http://ecargouat.jiajues.com'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@img": path.resolve(__dirname, "./src/assets/image")
      }
    }
  }
}

module.exports = config
