const mongoose = require("mongoose");

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user:{
    type:String,
    required: true,
  },
  tags: {
    type: [String],
  },

  description: {
    type: String,
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

module.exports = mongoose.model("blog", blogSchema);