const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET all posts for dashboard
router.get("/", withAuth, (req, res) => {
  // Retrieve all posts for the logged-in user
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // Serialize data before passing it to the template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // Pass data to the template and render the dashboard view
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET edit post by id
router.get("/edit/:id", withAuth, (req, res) => {
  // Retrieve a specific post by its ID
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((dbPostData) => {
    if (dbPostData) {
      // Serialize data before passing it to the template
      const post = dbPostData.get({ plain: true });
      // Pass data to the template and render the edit-post view
      res.render("edit-post", { post, loggedIn: true });
    } else {
      res.status(404).end();
    }
  });
});

// GET new post
router.get("/new", (req, res) => {
  // Render the new-post view and pass data to it if the user is logged in
  res.render("new-post", {
    layout: "dashboard",
  });
});

module.exports = router;
