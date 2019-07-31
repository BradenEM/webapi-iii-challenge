const express = require("express");

const server = express();

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  // console.log(req.route.path);
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timestamp = `${hours}:${minutes}:${seconds}`;
  console.log(`${req.method} on path: "${req.originalUrl}" at ${timestamp}`);
  next();
}

module.exports = server;
