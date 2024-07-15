const Expresso = require("./expresso");

const PORT = 8050;

const server = new Expresso();

server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/", (req, res) => {
  res.sendFile("./public/script.js", "text/javascript");
});

server.listen(PORT, () => {
  console.log("Web server is live at http://localhost:8050");
});
