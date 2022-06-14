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

    // Define the handlers
    let handlers = Object.create({});

    // Get the payload, if any
    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    req.on("data", function (data) {
      buffer += decoder.write(data);
    });

    req.on("end", function () {
      buffer += decoder.end();

      // Choose the handler the request should go to, if one is not found use the not found handler;
      let chosenHandler =
        typeof router[trimedpath] != "undefined"
          ? router[trimedpath]
          : handlers.notfound;

      // Construct the data object to send to the handler

      let data = {
        trimedpath,
        queryStringObject,
        method,
        headers,
        payload: buffer,
      };

      // Sample handler
      handlers.sample = function (data, callback) {
        // Callback a http status code, and a payload object
        callback(406, { name: "sample handler" });
      };

      // Route the request to the handler spicified in the handler
      chosenHandler(data, function (statusCode, payload) {
        // Use the status code called by the handler, or default;
        statusCode = typeof statusCode == "number" ? statusCode : 200;

        // Use the payload callback back by the handler, or default to empty object
        payload = typeof payload === "object" ? payload : {};

        // Convert the payload to a string;
        let payloadStr = JSON.stringify(payload);

        // Return the response
        res.writeHead(statusCode);

        res.end(payloadStr);
        // log headers
        console.log("We're returning this response", statusCode.payloadStr);
      });

      // Not found handler
      handlers.notfound = function (data, callback) {
        callback(404);
      };

      // Define a request routers
      let router = {
        sample: handler.sample,
      };
    });
  });

  server.listen(port, () => console.log(`listenining on port: ${port}`));
})();
