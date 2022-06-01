const http = require("http");
const port = process.env.PORT | 3000;

(async () => {
  // the server should respond to all request with a string
  const server = http.createServer((req, res) => {
    // res.setHeader("Content-Type", "application/json");
    // res.end();
  });

  server.listen(console.log(`listenining on ${port}`));
})();
