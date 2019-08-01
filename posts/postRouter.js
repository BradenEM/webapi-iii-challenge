const express = require("express");
const Posts = require("./postDb");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(erro);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.getById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.remove(id);

    res.status(200).json("post has been removed");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.update(id, req.body);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
