import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
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

export default mongoose.model("Blog", BlogSchema);
