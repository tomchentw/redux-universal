import {join as joinPath} from "path";
import express from "express";
import bodyParser from "body-parser";
import serveStatic from "serve-static";

const server = express();
const IS_PRODUCTION = "production" === process.env.NODE_ENV;

server.use(bodyParser.json());

if (IS_PRODUCTION) {
  // On production, use the public directory for static files
  // This directory is created by webpack on build time.
  server.use(serveStatic(joinPath(__dirname, "../public")));
}

// Render the app server-side and send it as response.
server.get("/*", require("./render"));

// Catch server error
server.use((err, req, res) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
