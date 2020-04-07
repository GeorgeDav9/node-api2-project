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

// POST /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {
    const {text} = req.body;
    const {post_id} = req.params;

Posts.insertComment({text, post_id})
.then(( {id:comment_id} ) =>{
    Posts.findCommentById(comment_id)
    .then(comment => {
        console.log(comment);
        if(!comment) {
            res.status(404).json({message: "error"})
        } else {
            res.status(201).json(comment)
        }
    }).catch(err => console.log(err));
})
.catch(err => console.log(err));
})