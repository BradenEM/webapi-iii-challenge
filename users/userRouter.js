const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser, async (req, res) => {
  try {
    const user = await Users.insert(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
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

router.get("/:id", validateUserId, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.getById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Users.getUserPosts(id);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
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

async function validateUserId(req, res, next) {
  try {
    const id = req.params.id;

    const user = await Users.getById(id);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "invalid user id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function validateUser(req, res, next) {
  try {
    const body = req.body;
    const user = Object.keys(req.body).length;

    if (body && user > 0) {
      if (req.body.name) {
        next();
      } else {
        res.status(400).json({ message: "missing required name field" });
      }
    } else {
      res.status(400).json({ message: "missing user data" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function validatePost(req, res, next) {
  try {
    const body = req.body;
    const post = Object.keys(req.body).length;

    if (body && post > 0) {
      if (req.body.text) {
        next();
      } else {
        res.status(400).json({ message: "missing required text field" });
      }
    } else {
      res.status(400).json({ message: "missing post data" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = router;
