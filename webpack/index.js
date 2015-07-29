import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import path from "path";
import {client, server} from "./dev.config";

new WebpackDevServer(webpack(client), {
  contentBase: path.join(__dirname, "../public"),
  publicPath: client.output.publicPath,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  stats: {
    colors: true,
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
}).listen(8080, (err) => {
  if (err) { throw err; }
  console.log("webpack-dev-server listening at port 8080");
});

webpack(server).watch({
}, (err) => {
  if (err) { throw err; }
  console.log("webpack for server bundle is watching");
});
