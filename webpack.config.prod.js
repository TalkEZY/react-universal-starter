const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");
const config = require("./webpack.config");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.plugins = [
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|en-eu|eu/),
  new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    minChunks: 3,
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.ProvidePlugin({
    $: path.join(__dirname, "node_modules", "jquery/dist/jquery"),
    jQuery: path.join(__dirname, "node_modules", "jquery/dist/jquery"),
  }),
  new ManifestPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new ExtractTextPlugin({
    filename: "[name].[chunkhash:20].css",
    disable: false,
    allChunks: true,
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
      ASSET_HOST: JSON.stringify(process.env.ASSET_HOST),
    },
  }),
];

config.entry.common = ["babel-polyfill", "assets/common"];
config.output.filename = "[name].[chunkhash:20].js";

module.exports = config;
