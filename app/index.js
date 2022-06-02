const http = require("http");
const port = process.env.PORT | 3500;
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
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

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder("utf-8");
    let buffer = "";
    req.on("data", function (data) {
      buffer += decoder.write(data);
    });

    req.on("end", function () {
      buffer += decoder.end();

      // Send the response
      res.end("Hello Word\n");

      // log headers
      console.log("Request received with this payload: ", buffer);
    });
  });

  server.listen(port, () => console.log(`listenining on port: ${port}`));
})();
