import {join as joinPath} from "path";
import webpack from "webpack";

import fakeDataProvider from "./utils/fake-data-provider";

const resolve = {
  extensions: ["", ".js", ".jsx", ".json"],
};

const modulePreLoaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ["eslint"],
  },
];

export const client = {
  entry: {
    main: [
      "./src/client",
    ],
    vendor: ["react", "react-router", "immutable"],
  },
  output: {
    path: joinPath(__dirname, "../public/build"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/build/",
  },
  resolve: resolve,
  module: {
    preLoaders: modulePreLoaders,
    loaders: [
      {
        test: /\.json$/,
        loader: "json",
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV",
    ]),
    new webpack.DefinePlugin({
      "typeof window": JSON.stringify("object"),
    }),
    fakeDataProvider,
  ],
  progress: true,
  stylus: {
    use: [
      require("nib")(),
    ],
  },
  postcss: [
    require("autoprefixer-core")({
      browsers: "> 5%",
    }),
    require("cssnano")(),
  ],
};

const externals = Object.keys(
  require("../package.json").dependencies
)
  .map(key => new RegExp(`^${ key }`));

export const server = {
  entry: {
    main: [
      "./src/server",
    ],
  },
  target: "node",
  output: {
    library: true,
    libraryTarget: "commonjs2",
    path: joinPath(__dirname, "../server/build"),
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  resolve: resolve,
  externals: externals,
  module: {
    preLoaders: modulePreLoaders,
    loaders: [
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "null",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "null",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "null",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "null",
      },
      {
        test: /\.json$/,
        loader: "json",
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV",
    ]),
    new webpack.DefinePlugin({
      "typeof window": JSON.stringify(undefined),
    }),
    fakeDataProvider,
  ],
};


