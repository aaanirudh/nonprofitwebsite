import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
  },
  link: {
    type: String,
    required: "Link is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    },
  ],
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Course", CourseSchema);
