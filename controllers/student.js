const Student = require("../models/Student");

exports.create = async (req, res) => {
  try {
    const student = await new Student({
      ...req.body,
      // fel
    }).save();
    res.json(student);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Student creation failed");
  }
};

exports.listAllStudents = async (req, res) => {
  // ändra bara
  const allStudents = await Student.find({}).exec();
  res.json(allStudents);
};

exports.singleStudent = async (req, res) => {
  return res.json(req.student);
};

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
  // fel
  Student.findById(id).exec((err, student) => {
    if (err || !student) {
      return res.status(400).json({
        error: "Student not found",
      });
    }
    req.student = student;
    next();
  });
};
