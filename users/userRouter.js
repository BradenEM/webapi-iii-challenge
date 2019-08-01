const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await Users.insert(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:id/posts", async (req, res) => {
  try {
    const postAddition = { user_id: req.params.id, text: req.body.text };
    const post = await Posts.insert(postAddition);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.getById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Users.getUserPosts(id);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    user = await Users.remove(id);

    res.status(200).json("user has been escorted out");
  } catch (error) {
    res.status(500).jsone(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.update(id, req.body);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
