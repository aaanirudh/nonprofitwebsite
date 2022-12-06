import Application from "../models/application.model";
import Organization from "../models/organization.model";
import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";
import profileImage from "./../../client/assets/images/profile-pic.png";

/**
 * Access profile photo of application if exists
 * @param  {Object} req - profile : application profile
 * @param  {Object} res - object to be populated with profile photo of application
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
 * Create new application (create in api-application)
 * @param  {Object} req - body : application object to be created
 * @param  {Object} res - object to be populated with status and returned
 */
const create = async (req, res) => {
  const application = new Application(req.body);

  try {
    //save new application that has been created
    await application.save();
    let findOrg = await Organization.findOne({
      name: req.body.organizationName,
    });
    if (!findOrg) {
      await Organization.create({ name: req.body.organizationName });
    }
    return res.status(200).json({
      message: "Successfully registered",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getApplications = async (req, res) => {
  const applications = await Application.find().select(
    "-hashed_password -salt"
  );
  return res.status(200).json(applications);
};

const approve = async (req, res) => {
  try {
    const user = new User({
      organization: req.app.organization,
      name: req.app.name,
      email: req.app.email,
      salt: req.app.salt,
      hashed_password: req.app.hashed_password,
      organizationName: req.app.organizationName,
    });
    //save new user that has been created
    await user.save();
    let findOrg = await Organization.findOne({
      name: req.app.organizationName,
    });
    if (!findOrg) {
      await Organization.create({ name: req.app.organizationName });
    }

    let app = req.app;
    await app.remove();
    return res.status(200).json({
      message: "Successfully registered",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const deny = async (req, res) => {
  try {
    let app = req.app;
    await app.remove();
    return res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const appByID = async (req, res, next, id) => {
  try {
    let app = await Application.findById(id);

    if (!app)
      return res.status(400).json({
        error: "App not found",
      });

    req.app = app;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve app",
    });
  }
};

export default {
  create,
  getApplications,
  approve,
  deny,
  appByID,
};
