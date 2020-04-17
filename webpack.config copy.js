const path = require("path");
const webpack = require("webpack");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const markdownRenderer = require("./src/components/MarkDownReader/renderer").renderer;

const { NODE_ENV } = process.env;

const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: NODE_ENV === "development"
});

const docsPath = NODE_ENV === "development" ? "./dist" : "./";
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(NODE_ENV)
    }
  }),
  extractLess,
  new HtmlwebpackPlugin({
    title: "gqcomponents",
    filename: "index.html",
    template: "public/index.html",
    inject: true,
    hash: true,
    path: docsPath
  })
];

if (process.env.NODE_ENV === "production") {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  plugins.push(new webpack.BannerPlugin({ banner: `Last update: ${new Date().toString()}` }));
  plugins.push(
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

const common = {
  entry: path.resolve(__dirname, "src/"),
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "./"),
    publicPath: "/"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./"
  },
  plugins,
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
        loader: extractLess.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
              renderer: markdownRenderer()
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png|jpg|gif|jpeg)($|\?)/,
        use: [
          {
            loader: "url-loader?limit=1&hash=sha512&digest=hex&size=16&name=resources/[hash].[ext]"
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
      "@components": `${__dirname}/src/components`,
      "@utils": `${__dirname}/src/utils`
    }
  }
};

module.exports = () => {
  if (NODE_ENV === "development") {
    return Object.assign({}, common, {
      entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://127.0.0.1:3100",
        "webpack/hot/only-dev-server",
        path.resolve(__dirname, "src/index")
      ],
      devtool: "source-map"
    });
  }

  return Object.assign({}, common, {
    entry: [path.resolve(__dirname, "src/index")]
  });
};
