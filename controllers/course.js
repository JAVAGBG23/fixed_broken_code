const Course = require("../models/course");

exports.create = async (req, res) => {
  try {
    const course = await new Course({
      ...req.body,
    }).save();
    res.json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Course creation failed");
  }
};

exports.listAllCourses = async (req, res) => {
  const allCourses = await Course.sort({ createdAt: -1 }).exec();
  res.json(allCourses);
};

exports.update = async (req, res) => {
  const course = req.course;
  course.name = req.body.name;
  course.category = req.body.category;
  await course.save((err, data) => {
    if (err) {
      return res.status(400).json({
        message: "Error updating course",
      });
    }
    res.json(data);
  });
};

exports.singleCourse = async (req, res) => {
  return res.json(req.course);
};

// PARAM METHODS

// get course by id param
exports.courseById = (req, res, next, id) => {
  Course.findById(id).exec((err, course) => {
    if (err || !course) {
      return res.status(400).json({
        error: "Course not found",
      });
    }
    req.course = course;
    next();
  });
};
