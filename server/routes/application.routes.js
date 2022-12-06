import express from "express";
import appCtrl from "../controllers/application.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/").get(appCtrl.getApplications);
router.route("/apply").post(appCtrl.create); //handle creating new user
router.route("/approve/:appId").post(appCtrl.approve);
router.route("/deny/:appId").post(appCtrl.deny);

router.param("appId", appCtrl.appByID);

export default router;
