const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Index",
      template: path.resolve(__dirname, "./src/pages/index.html"),
      filename: "index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      title: "Photo",
      template: path.resolve(__dirname, "./src/pages/photo.html"),
      filename: "photo.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      title: "Rozklad",
      template: path.resolve(__dirname, "./src/pages/rozklad.html"),
      filename: "rozklad.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      title: "News",
      template: path.resolve(__dirname, "./src/pages/news.html"),
      filename: "news.html",
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    liveReload: true,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    historyApiFallback: true,
  },
};
