import express from "express";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/login").post(authCtrl.login); //handle user login attempt

router.route("/logout").get(authCtrl.logout); //log out user

export default router;
