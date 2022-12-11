import express from "express";
import appCtrl from "../controllers/application.controller";
import authCtrl from "../controllers/auth.controller";
import userController from "../controllers/user.controller";

const router = express.Router();

router.route("/").get(appCtrl.getApplications);
router.route("/apply").post(appCtrl.create); //handle creating new user
router.route("/users").get(appCtrl.getUsers);
router.route("/approve/:appId").post(appCtrl.approve);
router.route("/deny/:appId").post(appCtrl.deny);
router.route("/deleteUser/:userId").post(appCtrl.deleteUser);

router.param("appId", appCtrl.appByID);
router.param("userId", userController.userByID);

export default router;
