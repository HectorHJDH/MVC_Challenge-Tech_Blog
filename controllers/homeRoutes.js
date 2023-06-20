const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// Render homepage
router.get("/", (req, res) => {
  console.log(req.session);
  // Retrieve all posts along with associated comments and usernames of post owners
  Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
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
      // Pass data to the template and render the homepage view
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Render login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Render the login page
  res.render("login");
});

// Render signup page
router.get("/signup", (req, res) => {
  // Render the signup page
  res.render("signup");
});

// Render single post page
router.get("/post/:id", (req, res) => {
  // Retrieve a specific post by its ID along with associated comments and usernames of comment authors
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        // If no post is found, send a 404 status and message
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // Serialize data before passing it to the template
      const post = dbPostData.get({ plain: true });
      // Pass data to the template and render the single-post view
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
