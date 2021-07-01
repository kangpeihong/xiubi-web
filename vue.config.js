var webpack = require('webpack')
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 把px单位换算成rem单位
          require('postcss-pxtorem')({
            rootValue: 16, // 换算的基数(设计图750的根字体为32)
            propList: ['*'], //可以从px更改为rem的属性。
          }),
        ],
      },
    },
  },
  //webpack配置
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      },
    },
  },
}
