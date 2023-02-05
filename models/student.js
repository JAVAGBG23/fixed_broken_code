const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    subjects: [
      {
        name: { type: String },
        points_obtained: { type: Number },
      },
    ],
    department: {
      name: { type: String },
      location: { type: String },
    },
  },
  // createdAt
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
