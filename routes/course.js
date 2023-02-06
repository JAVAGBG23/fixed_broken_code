const express = require("express");
const router = express.Router();

const {
  create,
  listAllCourses,
  courseById,
  update,
  singleCourse,
} = require("../controllers/course");

router.post("/create", create);

router.get("/all", listAllCourses);

router.get("/:courseId", singleCourse);

router.put("/:courseId", update);

// param
router.param("courseId", courseById);

module.exports = router;
