/* eslint-disable import-helpers/order-imports */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false;
const port = process.env.PORT_FRONTEND || 3000;
const app = next({ dev, dir: process.cwd(), port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log("Server has been started...");
  });
});
