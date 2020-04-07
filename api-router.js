const express = require("express");

const postsRouter = require("../posts/posts-router.js");

const router = express.Router();

router.use("/posts", postsRouter);

mocule.exports = router;