import merge from "lodash/object/merge";
import webpack from "webpack";
import * as config from "./config";
import writeStats from "./utils/write-stats";
import notifyStats from "./utils/notify-stats";

export const client = merge({}, config.client, {
  devtool: "eval",
  entry: {
    main: [].concat([
      `webpack-dev-server/client?http://localhost:8080`,
      "webpack/hot/only-dev-server",
    ], config.client.entry.main),
  },
  output: {
    pathinfo: true,
    publicPath: `http://localhost:8080/build/`,
  },
  module: {
    loaders: config.client.module.loaders.concat([
      {
        test: /\.jsx?$/,
        loader: "react-hot!babel",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style!css!postcss",
      },
      {
        test: /\.styl$/,
        loader: "style!css!postcss!stylus",
      },
    ]),
  },
  plugins: config.client.plugins.concat([
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    // optimize
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    // stats
    function() {
      this.plugin("done", writeStats);
      this.plugin("done", notifyStats);
    },
  ]),
});

export const server = merge({}, config.server, {
  devtool: "sourcemap",
  output: {
    pathinfo: true,
  },
  module: {
    loaders: config.server.module.loaders.concat([
      {
        test: /\.jsx?$/,
        loader: "babel",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "null",
      },
      {
        test: /\.styl$/,
        loader: "null",
      },
    ]),
  },
  plugins: config.server.plugins.concat([
    new webpack.NoErrorsPlugin(),

    // optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    // stats
    function() {
      this.plugin("done", notifyStats);
    },
  ]),
});
