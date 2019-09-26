export default {
  plugins: [
    [
      "umi-plugin-react",
      {
        dva: true,
        antd: true,
        dynamicImport: {
          webpackChunkName: true
        }
      }
    ]
  ],
  proxy: {
    "/api": {
      // 本地
      // target: "http://localhost:5000/",
      // 线上
      target: "https://api.furan.xyz/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  },
  base: "/blog/",
  publicPath: "/blog/",
  history: "hash"
};
