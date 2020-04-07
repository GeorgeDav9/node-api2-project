const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();

// POST /api/posts
router.post('/', (req, res) => {
    const postData = req.body;

    if (!postData.title || !postData.contents {
        res.status(400).json({ errorMEssage: "Provide Title and Contents for post."});
    } else {
        Posts.insert(postData).then(post => {
            res.status(201).json(post);
        }) .catch(err => {
        console.log(err);
        res.status(500).json({ error: "There was an error while saving the post to the database."});
  });
 }
})