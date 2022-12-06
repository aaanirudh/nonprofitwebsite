import User from "../models/user.model";
import Organization from "../models/organization.model";
import extend from "lodash/extend";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";
import profileImage from "./../../client/assets/images/profile-pic.png";
import Application from "../models/application.model";

/**
 * Access profile photo of user if exists
 * @param  {Object} req - profile : user profile
 * @param  {Object} res - object to be populated with profile photo of user
 * @param  {function} next - call next function in route
 */
const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

/**
 * Access default photo
 * @param  {Object} req - unused
 * @param  {Object} res - object to be populated with default profile image
 */
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + profileImage);
};

/**
 * Create new user (create in api-user)
 * @param  {Object} req - body : user object to be created
 * @param  {Object} res - object to be populated with status and returned
 */
const create = async (req, res) => {
  let temp = req.body;
  try {
    if (!temp.organization) {
      const org = await Organization.findOne({
        code: parseInt(temp.organizationName),
      });

      if (!org) {
        return res.status(400).json({
          error: "Invalid Organization Code",
        });
      }
      temp.organizationName = org.name;
    }
    const application = new Application(temp);
    //save new user that has been created
    await application.save();
    return res.status(200).json({
      message: "Successfully registered",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
  // const user = new User(req.body);

  // try {
  //   //save new user that has been created
  //   await user.save();
  //   let findOrg = await Organization.findOne({
  //     name: req.body.organizationName,
  //   });
  //   if (!findOrg) {
  //     await Organization.create({ name: req.body.organizationName });
  //   }
  //   return res.status(200).json({
  //     message: "Successfully registered",
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({
  //     error: errorHandler.getErrorMessage(err),
  //   });
  // }
};

/**
 * Helper function : check if user exists and populate profile in req
 * @param  {Object} req - body : user object to be created
 * @param  {Object} res - object to be populated with status and returned
 * @param  {function} next - call next function in route
 * @param  {string} id - id of user
 */
const userByID = async (req, res, next, id) => {
  try {
    //find user by id and add reviews to be returned
    let user = await User.findById(id)
      .populate("posts", "_id")
      .populate("reviews.poster", "_id name")
      .exec();

    //handle if user doesn't exist
    if (!user) {
      return res.status("400").json({
        error: "User not found",
      });
    }

    req.profile = user;

    return next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

/**
 * Get profile without password (read in api-user)
 * @param  {Object} req - profile : user profile that is requested
 * @param  {Object} res - object to be populated with status and profile and returned
 */
const read = async (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  let temp = req.profile;
  if (temp.organization) {
    const orgName = await Organization.findOne({ name: temp.organizationName });
    temp.organizationName = `${temp.organizationName} (${orgName?.code})`;
  }
  return res.status(200).json(temp);
};

/**
 * Update a profile (update in api-user)
 * @param  {Object} req - profile : user profile that is to be updated
 * @param  {Object} res - object to be populated with status and profile and returned
 */
const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  //update profile and process image if inputted
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }

    let user = req.profile;
    user = extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    try {
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;

      res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

/**
 * Delete a profile (remove in api-user)
 * @param  {Object} req - profile : user profile that is to be deleted
 * @param  {Object} res - object to be populated with status and deleted profile and returned
 */
const remove = async (req, res) => {
  try {
    let user = req.profile;

    //delete user
    let deletedUser = await user.remove();

    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;

    res.status(200).json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getOrganizations = async (req, res) => {
  try {
    let allOrgs = await Organization.find().select("name -_id");
    let orgNames = [];
    allOrgs.forEach(({ name }) => orgNames.push(name));

    res.status(200).json(orgNames);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const subscribe = async (req, res) => {
  try {
    let user = req.profile;
    user.donor = true;
    await user.save();
    res.status(200).json({
      message: "Subscription successful",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  userByID,
  read,
  photo,
  defaultPhoto,
  remove,
  update,
  subscribe,
  getOrganizations,
};
