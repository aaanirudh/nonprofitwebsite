import Application from "../models/application.model";
import Organization from "../models/organization.model";
import User from "../models/user.model";
import errorHandler from "./../helpers/dbErrorHandler";

/**
 * Create new application (create in api-application)
 * @param  {Object} req - body : application object to be created
 * @param  {Object} res - object to be populated with status and returned
 */
const create = async (req, res) => {
  try {
    if (!req.body.organization) {
      const org = await Organization.findOne({
        code: parseInt(req.body.organizationName),
      });

      if (!org) {
        return res.status(400).json({
          error: "Invalid Organization Code",
        });
      }
      req.body.organizationName = org.name;
    }
    const application = new Application(req.body);
    //save new application that has been created
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

const deleteUser = async (req, res) => {
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

const getUsers = async (req, res) => {
  try {
    let users = await User.find().select("-hashed_password -salt");

    res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  getApplications,
  approve,
  deny,
  appByID,
  deleteUser,
  getUsers,
};
