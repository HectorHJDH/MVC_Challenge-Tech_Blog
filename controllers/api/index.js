const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Set up routes for different API resources

// Use the userRoutes for handling user-related API requests
router.use('/users', userRoutes);

// Use the postRoutes for handling post-related API requests
router.use('/posts', postRoutes);

// Use the commentRoutes for handling comment-related API requests
router.use('/comments', commentRoutes);

module.exports = router;
