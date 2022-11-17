import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/").post(userCtrl.create); //handle creating new user

router.route("/photo/:userId").get(userCtrl.photo, userCtrl.defaultPhoto); //access a user's profile photo or default if they don't have one

router.route("/defaultphoto").get(userCtrl.defaultPhoto); //get default photo for user profile

router.route("/organizations").get(userCtrl.getOrganizations);

router
  .route("/:userId")
  .get(authCtrl.requireLogin, userCtrl.read) //get user information to be viewed in profile
  .put(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.update) //update a user's profile
  .delete(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.remove); //delete a user

router.param("userId", userCtrl.userByID); //check if user exists and populate request with found profile

export default router;
