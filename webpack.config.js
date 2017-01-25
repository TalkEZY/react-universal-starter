"use strict";

/* jshint node:true */
// TODO: This can eventually be removed, but not yet...
// https://github.com/jtangelder/sass/pull/132/files
process.env.UV_THREADPOOL_SIZE = 100;

require("dotenv").config({ path: (process.env.ENV_PATH || ".env") });
require("es6-promise").polyfill();

const path = require("path");
const webpack = require("webpack");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

// Setup webpack plugins
const commons = new CommonsChunkPlugin({
  name: "common",
  minChunks: Infinity,
})
const provide = new webpack.ProvidePlugin({
  $: path.join(__dirname, "node_modules", "jquery/dist/jquery"),
  jQuery: path.join(__dirname, "node_modules", "jquery/dist/jquery"),
});
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = [
  commons,
  provide,
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|en-eu|eu/),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin({
    filename: "[name].css",
    disable: false,
    allChunks: true,
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("development"),
      ASSET_HOST: JSON.stringify(process.env.ASSET_HOST),
    },
    ENV_PROD: JSON.stringify(false),
  }),
];

// Dynamically build entry files
const basePath = path.join(__dirname, "app");
const common = ["assets/common", "babel-polyfill"];

if (process.env.NODE_ENV === "development") {
  if (!process.env.NO_WEBPACK_MIDDLEWARE) {
    common.unshift(`webpack-hot-middleware/client?${process.env.ASSET_HOST}`);
  } else {
    common.unshift(`webpack-dev-server/client?${process.env.ASSET_HOST}`);
    common.unshift("webpack/hot/only-dev-server");
  }

  common.unshift("react-hot-loader/patch");
}

module.exports = {
  context: basePath,
  entry: {
    common,
    universal: "assets/universal",
    home: "assets/home",
  },
  output: {
    path: path.join(__dirname, "public", "assets"),
    filename: "[name].js",
    chunkFilename: "[name]_[chunkhash:20].js",
    publicPath: `${process.env.ASSET_HOST}/assets/`,
    libraryTarget: "var",
  },
  module: {
    noParse: /node_modules\/(jquery)$/,
    // preLoaders: [{
    //   test: /\.jsx?$/,
    //   loader: "eslint-loader",
    //   exclude: /node_modules/,
    // }],
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: "css-loader",
      }),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: [
          "css-loader",
          `sass-loader?outputStyle=expanded&includePaths[]=${path.resolve(__dirname, "./node_modules")}`,
        ],
      }),
    }, {
      test: /(\.jsx?)$/,
      exclude: /node_modules/,
      use: [
        "babel-loader",
      ],
    }, {
      test: /\.hbs$/,
      // Fix a doozie of a bug where we were using the CJS version of the runtime
      loader: "handlebars-loader?runtime=" + require.resolve("handlebars/dist/handlebars.runtime") +
        "&rootRelative=" + path.resolve(__dirname, "./node_modules/rizzo-next/src/") + "/",
    }, {
      test: /\.otf$|\.eot\??$|\.svg$|\.woff$|\.ttf$|\.png$/,
      loader: "file-loader?name=[name].[ext]",
    }],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["app", "node_modules"],
  },
  plugins,
};
