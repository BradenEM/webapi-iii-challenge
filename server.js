const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const obscurity = require("helmet");
const server = express();

server.use(obscurity());
server.use(logger);
server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

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
