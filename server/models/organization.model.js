import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Organization name is required",
  },
});

export default mongoose.model("Organization", OrganizationSchema);
