import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Organization name is required",
  },
  code: {
    type: Number,
  },
});
OrganizationSchema.pre("save", async function (next) {
  this.code = Math.floor(100000 + Math.random() * 900000);
  next();
});

export default mongoose.model("Organization", OrganizationSchema);
