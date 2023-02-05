const Student = require("../models/Student");

// create new student
// POST /api/student
exports.create = async (req, res) => {
  try {
    const student = await new Student({
      ...req.body,
    }).save();
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
// GET /api/student/:studentId
exports.singleStudent = async (req, res) => {
  return res.json(req.student);
};

// update student
// PUT /api/student/:studentId
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
// DELETE /api/student/:studentId
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
  Student.findById(id).exec((err, student) => {
    if (err || !student) {
      return res.status(400).json({
        error: "Student no found",
      });
    }
    req.student = student;
    next();
  });
};
