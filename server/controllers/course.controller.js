import Course from "../models/course.model";
import errorHandler from "../helpers/dbErrorHandler";

const isPoster = (req, res, next) => {
  let isCoursePoster =
    req.course && req.auth && req.course.postedBy._id == req.auth._id;
  if (!isCoursePoster) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const courseByID = async (req, res, next, id) => {
  try {
    let course = await Course.findById(id)
      .populate("postedBy", "_id name")
      .exec();

    if (!course)
      return res.status(400).json({
        error: "Course post not found",
      });

    req.course = course;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve use course post",
    });
  }
};

const create = async (req, res) => {
  try {
    console.log(req.body);
    let course = new Course(req.body);
    course["postedBy"] = req.profile;
    let result = await course.save();

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByUser = async (req, res) => {
  try {
    let courses = await Course.find({ postedBy: req.profile._id })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .populate("likes", "_id")
      .sort("-created")
      .exec();

    res.json(courses);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getFeed = async (req, res) => {
  try {
    let courses = await Course.find()
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .populate("likes", "_id")
      .sort("-created")
      .exec();

    res.json(courses);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  let course = req.course;
  try {
    let deletedCourse = await course.remove();
    res.json(deletedCourse);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const comment = async (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.auth._id;
  try {
    let result = await Course.findByIdAndUpdate(
      req.course._id,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(result.comments);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const uncomment = async (req, res) => {
  let comment = req.body.comment;
  try {
    let result = await Course.findByIdAndUpdate(
      req.course._id,
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(result.comments);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const like = async (req, res) => {
  try {
    let result = await Course.findByIdAndUpdate(req.course._id, {
      $push: { likes: req.auth._id },
    });

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const unlike = async (req, res) => {
  try {
    let result = await Course.findByIdAndUpdate(req.course._id, {
      $pull: { likes: req.auth._id },
    });
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  listByUser,
  like,
  unlike,
  create,
  courseByID,
  remove,
  comment,
  uncomment,
  getFeed,
  isPoster,
};
