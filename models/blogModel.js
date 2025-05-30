const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["draft", "published"],
  },
});

module.exports = mongoose.model("Blog", blogSchema);
