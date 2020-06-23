let webpack = require('webpack')
let SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
let path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 14, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 1 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  devServer: {
    before(app) {
      app.use('/api/:id', (request, response) => {
        let {query} = request
        let {
          delay,
          status,
          msg
        } = query
        let result = {
          code: 0,
          msg: '',
          data: {
            timestamp: +(new Date())
          }
        }
        if (status && Math.random() > .5) {
          response.status(status)
        } else if (msg && Math.random() > .5) {
          result.code = -1
          result.msg = msg
        }
        if (query.delay) {
          setTimeout(e => {
            response.json(result)
          }, query.delay)
        } else {
          response.json(result)
        }
      })
    },
    proxy: {
      '/page' : {
        target: 'http://api.duanshu.com/',
        pathRewrite: {'^/page' : ''},
        headers: {
          'x-shop': 'j54g72862j3630ed1b'
        }
      }
    }
  },
  configureWebpack(config) {
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/skeleton/entry-skeleton.js')
        }
      },
      // SPA 下是压缩注入 HTML 的 JS 代码
      minimize: true,
      // 服务端渲染时是否需要输出信息到控制台
      quiet: true,
      // 根据路由显示骨架屏
      router: {
        mode: 'hash',
        routes: [
          {
            path: '/',
            skeletonId: 'skeleton1'
          },
          {
            path: '/about',
            skeletonId: 'skeleton2'
          },
          {
            path: '/about2',
            skeletonId: 'skeleton2'
          },
          {
            path: '/about3',
            skeletonId: 'skeleton2'
          },
          {
            path: '/about4',
            skeletonId: 'skeleton2'
          },
          {
            path: '/about5',
            skeletonId: 'skeleton2'
          }
        ]
      }
    }))
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    // // 或者
    // // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
  }
}
