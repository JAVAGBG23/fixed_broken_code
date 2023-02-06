const express = require("express");
const router = express.Router();

const {
  create,
  listAllStudents,
  studentById,
  remove,
  update,
  singleStudent,
} = require("../controllers/student");

router.post("/create", create);

router.get("/all", listAllStudents);

router.get("/:studentId", singleStudent);

router.put("/:studentId", update);

router.delete("/:studentId", remove);

// studentId param
router.param("studentId", studentById);

module.exports = router;
