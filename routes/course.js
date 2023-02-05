const express = require("express");
const router = express.Router();

// controllers
const {
  create,
  listAllCourses,
  courseById,
  update,
  singleCourse,
} = require("../controllers/course");

// create a new course
router.post("/create", create);

// list all courses
router.get("/all", listAllCourses);

// get single course
router.get("/:courseId", singleCourse);

// update course
router.put("/:courseId", update);

// param
router.param("courseId", courseById);

module.exports = router;
