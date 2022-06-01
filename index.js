const http = require("http");
const port = process.env.PORT | 3000;
const url = require("url");

(async () => {
  // the server should respond to all request with a string
  const server = http.createServer((req, res) => {
    // Get the URL and parse it
    let parseUrl = url.parse(req.url, true);

    // Get the path
    let path = parseUrl.pathname;
    let trimedpath = path.replace(/^\/+|+\/$/g, "");

    // SEnd the response

    res.end("Hello Word\n");

    // log the request
    console.log("Request received on path: " + trimedpath);
    // res.setHeader("Content-Type", "application/json");
    // res.end();
  });

  server.listen(console.log(`listenining on ${port}`));
})();
