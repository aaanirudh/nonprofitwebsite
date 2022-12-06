import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//connect to database
mongoose.Promise = global.Promise;

dotenv.config();
/**
 * Connects to database or exits process.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(process.env.MONGODB_URI);

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

//start up server
const server = app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
