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
      target: "http://api.furan.xyz/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  },
  base: "/blog/",
  publicPath: "/blog/",
  history: "hash",
};
