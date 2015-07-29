require("babel-core/register");

require("./server");

if ("production" !== process.env.NODE_ENV) {
  // In development, serve the static files from the webpack dev server.
  require("./webpack");
}
