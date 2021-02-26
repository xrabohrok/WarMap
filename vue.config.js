module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/WarMap/'
      : '/',

      configureWebpack: {
        devServer: {
           watchOptions: {
              poll: true
           }
        }
     }
  }