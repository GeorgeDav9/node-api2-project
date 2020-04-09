const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

// POST /api/posts
router.post('/', (req, res) => {
    const postData = req.body;

    if (!postData.title || !postData.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
      } else {
        Posts.insert(postData).then(post => {
          res.status(201).json(post);
        }).catch(err => {
          console.log(err);
          res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
      }
    })

// POST /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {
    const {text} = req.body;
    const {post_id} = req.params;

    Posts.insertComment({text, post_id})
      .then(( {id:comment_id} ) => {
        Posts.findCommentById(comment_id)
          .then(comment => {
            console.log(comment);
            if (!comment) {
              res.status(404).json({ message: "error" })
            } else {
              res.status(201).json(comment)
            }
          }).catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    })

// GET /api/posts/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    if (!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
    } else {
        Posts.findById(id).then(post => {
            res.status(200).json(post);
        }).catch(err => {
            console.log(err => {
                res.status(500).json({ error: "The posts information could not be retrieved. "})
            })
        })
    }

// GET /api/posts/:id/comments
  router.get('/:id/comments',(req, res) => {
      const id = req.params.id;

      if (!id) {
          res.status(404).json({ message: "The post with the specified ID does not exist."})
      } else {
          Posts.findCommentById(id).then(comment => {
              res.status(200).json(comment)
          }).catch(err => {
              console.log(err);
              res.status(500).json({ error: "The comments information could not be retrieved. " });
          })
      }
  })

  // DELETE /api/posts/:id
  router.delete('/:id', (req, res) => {
      const id = req.params.id;

      if (!id) {
        Posts.remove(id).then(removed => {
          res.status(200).json(removed);
      });
  }
})

//PUT /api/posts/:id
router.put('/:id', (req, res) => {
    const postData = req.body;
    const id = req.params.id;

    if (!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else if (!postData.title || !postData.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        Posts.update(id, postData).thenn(post =>{
            res.status(200).json(post);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts infromation could not be retrieved." });
        });
    }
})
})

module.exports = router;