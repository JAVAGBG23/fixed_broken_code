const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  // createdAt
  { timestamps: true }
);

module.exports = mongoose.model("Student", courseSchema);
