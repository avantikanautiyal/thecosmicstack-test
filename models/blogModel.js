const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  publisher: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
