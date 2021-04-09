const server = require('./server/index');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/WarMap/'
      : '/',

      configureWebpack: {
        devServer: {
           watchOptions: {
              poll: true
           },
           before: server
        }
     }
  }