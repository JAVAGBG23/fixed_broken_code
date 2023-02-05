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
    courses: [
      {
        type: ObjectId,
        ref: "Course",
      },
    ],
  },
  // createdAt
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
