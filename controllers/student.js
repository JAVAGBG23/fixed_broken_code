const Student = require("../models/Student");

// create new student
// POST /api/students/create
exports.create = async (req, res) => {
  try {
    const student = await new Student({
      ...req.body,
    });
    res.json(student);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Student creation failed");
  }
};

// get all students
// GET /api/students
exports.listAllStudents = async (req, res) => {
  const allStudents = await Student.find({}).sort({ createdAt: -1 }).exec();
  res.json(allStudents);
};

// get single student based on id
// GET /api/students/:studentId
exports.singleStudent = async (req, res) => {
  return res.json(req.student);
};

// update student
// PUT /api/students/:studentId
exports.update = async (req, res) => {
  const student = req.student;
  await student.save((err, data) => {
    if (err) {
      return res.status(400).json({
        message: "Error updating student",
      });
    }
    res.json(data);
  });
};

// delete student
// DELETE /api/students/:studentId
exports.remove = async (req, res) => {
  const student = req.student;
  await student.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        message: "Error removing student",
      });
    }
    res.json({
      message: "Student deleted",
    });
  });
};

// PARAM METHODS

// get student by id param
exports.studentById = (req, res, next, id) => {
  Student.findById({}).exec((err, student) => {
    if (err || !student) {
      return res.status(400).json({
        error: "Student not found",
      });
    }
    req.student = student;
    next();
  });
};
