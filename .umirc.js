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
      target: "http://localhost:5000/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  },
  base: "/blog/",
  publicPath: "/blog/",
  history: "hash",
};
