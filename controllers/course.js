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
  // fel
  const allCourses = await Course.find({}).sort({ createdAt: -1 }).exec();
  res.json(allCourses);
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ id }).exec();

    // fel
    if (!course) {
      return res.status(400).send("Course not found");
    } else {
      const updated = await Course.findOneAndUpdate({ id }, req.body, {
        new: true,
      }).exec();

      res.json(updated);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

/*exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ id }).exec();

    if (course) {
      return res.status(400).send("Course not found");
    } else {
      const updated = await Course.findOneAndUpdate({ id }, req.body, {
        new: true,
      }).exec();

      res.json(updated);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
}; */

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
