const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: ["webpack-dev-server/client?http://127.0.0.1:3000", resolve(__dirname, "src/")],
  output: {
    filename: "[hash:10].build.js",
    path: resolve(__dirname, "build"),
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [["import", { libraryName: "antd", style: "css" }]],
              compact: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg | png | gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          esModule: false
        }
      },
      {
        test: /\.html/,
        loader: "html-loader"
      },
      {
        exclude: /\.(less | css| jpg | png | gif |html)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public/index.html")
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, "./"),
    publicPath: "/",
    compress: true,
    port: 3000
    // open: true
  }
};
