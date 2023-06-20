const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Routes for /api/comments

// GET /api/comments
router.get("/", (req, res) => {
  // Fetch all comments from the database
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/comments
router.post("/", withAuth, (req, res) => {
  if (req.session) {
    // Create a new comment in the database
    Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

// DELETE /api/comments/1
router.delete("/:id", withAuth, (req, res) => {
  // Delete a comment from the database based on its id
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        // If no comment was found with the given id, return a 404 status
        res.status(404).json({ message: "No comment found with this id." });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
