const http = require("http");
const fs = require("fs/promises");

class Expresso {
  // runs per every initialisation
  constructor() {
    this.server = http.createServer();
    this.routes = {};

    this.server.on("request", (req, res) => {
      // send a file back to the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");
        const fileReadStream = fileHandle.createReadStream();

        res.setHeader("Content-Type", mime);

        // read file stream and write response to client
        fileReadStream.pipe(res);
      };

      // send status code to client
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      // send json back to the client
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      if (!this.routes[req.method.toLowerCase() + req.url](req, res)) {
        return res
          .status(404)
          .json({ error: `cannot ${req.method} ${req.url}` });
      }

      this.routes[req.method.toLowerCase() + req.url](req, res);
    });
  }

  // route method
  route(method, path, callback) {
    // {"get/": () => {}, "post/upload": () => {}}
    this.routes[method + path] = callback;
  }

  // listen method
  listen(port, callback) {
    this.server.listen(port, () => {
      callback();
    });
  }
}

module.exports = Expresso;
