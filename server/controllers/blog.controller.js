import Blog from "../models/blog.model";
import errorHandler from "../helpers/dbErrorHandler";

const isPoster = (req, res, next) => {
  let isBlogPoster =
    req.blog && req.auth && req.blog.postedBy._id == req.auth._id;
  if (!isBlogPoster) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const blogByID = async (req, res, next, id) => {
  try {
    let blog = await Blog.findById(id).populate("postedBy", "_id name").exec();

    if (!blog)
      return res.status(400).json({
        error: "Blog post not found",
      });

    req.blog = blog;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve use blog post",
    });
  }
};

const create = async (req, res) => {
  try {
    console.log(req.body);
    let blog = new Blog(req.body);
    blog["postedBy"] = req.profile;
    let result = await blog.save();

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByUser = async (req, res) => {
  try {
    let blogs = await Blog.find({ postedBy: req.profile._id })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .populate("likes", "_id")
      .sort("-created")
      .exec();

    res.json(blogs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getFeed = async (req, res) => {
  try {
    let blogs = await Blog.find()
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .populate("likes", "_id")
      .sort("-created")
      .exec();

    res.json(blogs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  let blog = req.blog;
  try {
    let deletedBlog = await blog.remove();
    res.json(deletedBlog);
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
    let result = await Blog.findByIdAndUpdate(
      req.blog._id,
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
    let result = await Blog.findByIdAndUpdate(
      req.blog._id,
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
    let result = await Blog.findByIdAndUpdate(req.blog._id, {
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
    let result = await Blog.findByIdAndUpdate(req.blog._id, {
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
  blogByID,
  remove,
  comment,
  uncomment,
  getFeed,
  isPoster,
};
