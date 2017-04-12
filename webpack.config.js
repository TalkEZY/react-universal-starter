"use strict";

require("dotenv").config({ path: (process.env.ENV_PATH || ".env") });

const path = require("path");
const webpack = require("webpack");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

// Setup webpack plugins
const commons = new CommonsChunkPlugin({
  name: "common",
  minChunks: 2,
});
const provide = new webpack.ProvidePlugin({
  $: path.join(__dirname, "node_modules", "jquery/dist/jquery"),
  jQuery: path.join(__dirname, "node_modules", "jquery/dist/jquery"),
});
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = [
  commons,
  provide,
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

const common = ["react-hot-loader/patch", "common", "babel-polyfill"];

if (!process.env.NO_WEBPACK_MIDDLEWARE) {
  common.unshift(`webpack-hot-middleware/client?${process.env.ASSET_HOST}`);
} else {
  common.unshift(`webpack-dev-server/client?${process.env.ASSET_HOST}`);
  common.unshift("webpack/hot/only-dev-server");
}

module.exports = {
  context: path.join(__dirname, "app"),
  entry: {
    common,
    universal: "universal/client",
    home: "home/client",
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
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader",
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
      use: `handlebars-loader?&rootRelative=${path.resolve(__dirname, "./node_modules/rizzo-next/src/")}/`,
    }, {
      test: /\.otf$|\.eot\??$|\.svg$|\.woff$|\.ttf$|\.png$/,
      use: "file-loader?name=[name].[ext]",
    }],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["app", "node_modules"],
  },
  plugins,
};
