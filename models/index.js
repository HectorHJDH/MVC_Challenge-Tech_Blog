// Gather the models and export them for use

// User model
const User = require('./User');
// Post model
const Post = require('./Post');
// Comment model
const Comment = require('./Comment');

// create associations
// User has many posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// User has many comments
User.hasMany(Comment, {
  foreignKey: 'user_id'
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Post has many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };
