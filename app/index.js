const http = require("http");
const port = process.env.PORT | 3500;
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");

(async () => {
  // the server should respond to all request with a string
  const server = http.createServer((req, res) => {
    // Get the URL and parse it
    var parseUrl = url.parse(req.url, true);

    // Get the path
    var path = parseUrl.pathname;
    var trimedpath = path.replace(/^\/+|\/+$/g, "");

    // Get the query string as object
    const queryStringObject = parseUrl.query;
    // Get the http Method;
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder("utf-8");
    var buffer = "";

    req.on("data", function (data) {
      buffer += decoder.write(data);
    });

    req.on("end", function () {
      buffer += decoder.end();

      // Choose the handler the request should go to, if one is not found use the not found handler;
      var chosenHandler =
        typeof router[trimedpath] != "undefined"
          ? router[trimedpath]
          : handlers.notfound;

      // Construct the data object to send to the handler
      var data = {
        trimedpath,
        queryStringObject,
        method,
        headers,
        payload: buffer,
      };

      // Route the request to the handler spicified in the handler
      chosenHandler(data, function (statusCode, payload) {
        // Use the status code called by the handler, or default;
        statusCode = typeof statusCode == "number" ? statusCode : 200;

        // Use the payload callback back by the handler, or default to empty object
        payload = typeof payload === "object" ? payload : {};
        // Convert the payload to a string;
        var payloadStr = JSON.stringify(payload);

        // Return the response
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);

        res.end(payloadStr);
        // log headers
        console.log("Returning the response", statusCode.payloadStr);
      });
    });
  });

  // Start the server
  server.listen(config.port, () =>
    console.log(`listenining on port: ${config.port} in ${config.envName}  now`)
  );
  // Define the handlers
  var handlers = {};

  // Sample handler
  handlers.sample = function (data, callback) {
    // Callback a http status code, and a payload object
    callback(406, { name: "sample handler" });
  };

  // Not found handler
  handlers.notfound = function (data, callback) {
    callback(404);
  };

  // Define a request router
  var router = {
    sample: handlers.sample,
  };
})();
