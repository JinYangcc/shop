const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave: false,
  //开启代理服务器
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: { "^/api": "" },
        //默认都为真
        ws: true, //用于支持websocket
        changeOrigin: true, //用于控制请求头中的host值
      },
    },
  },
});
