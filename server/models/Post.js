// Post.js - Mongoose model for blog posts

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    post: {
      type: String,
      required: [true, 'Please provide content'],
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model('Post', PostSchema); 