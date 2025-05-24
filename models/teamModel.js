const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  social: {
    Linkedin: {
      type: String,
      required: true,
    },
    Github: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Team", teamSchema);
