const http = require("http");
const port = process.env.PORT | 3500;
const url = require("url");

(async () => {
  // the server should respond to all request with a string
  const server = http.createServer((req, res) => {
    // Get the URL and parse it
    let parseUrl = url.parse(req.url, true);

    // Get the path
    let path = parseUrl.pathname;
    let trimedpath = path.replace(/^\/+|\/+$/g, "");

    // Get the query string as object
    const queryStringObject = parseUrl.query;

    // Get the http Method;
    const method = req.method.toLowerCase();
    // SEnd the response

    res.end("Hello Word\n");

    // log the request
    console.log(
      "Request received on path: " +
        trimedpath +
        "with this method: " +
        method +
        " with this query string parameters",
      queryStringObject
    );
    // res.setHeader("Content-Type", "application/json");
    // res.end();
  });

  server.listen(port, () => console.log(`listenining on port: ${port}`));
})();
