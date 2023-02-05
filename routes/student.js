const express = require("express");
const router = express.Router();

// controllers
const {
  create,
  listAllStudents,
  studentById,
  remove,
  update,
  singleStudent,
} = require("../controllers/student");

// create a new student
router.post("/create", create);

// get all students
router.get("/all", listAllStudents);

// get single student by id
router.get("/:studentId", singleStudent);

// update student
router.put("/:studentId", update);

// remove student
router.delete("/:studentId", remove);

// studentId param
router.param("studentId", studentById);

module.exports = router;
