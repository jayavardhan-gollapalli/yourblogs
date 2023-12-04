const mongoose = require("mongoose");

const { Schema } = mongoose;

const publicBlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
  },

  description: {
    type: String,
  },

  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  public: {
    type: Boolean,
    default: false,
  },

  author: {
    type: String,
    default: "Anonymous",
  },
});

module.exports = mongoose.model("publicBlog", publicBlogSchema);
