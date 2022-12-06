import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import courseCtrl from "../controllers/course.controller";

const router = express.Router();

router.route("/courses").get(authCtrl.requireLogin, courseCtrl.getFeed);

router.route("/new/:userId").post(authCtrl.requireLogin, courseCtrl.create);

router.route("/user/:userId").get(authCtrl.requireLogin, courseCtrl.listByUser);

router
  .route("/comment/:courseId")
  .put(authCtrl.requireLogin, courseCtrl.comment);

router
  .route("/uncomment/:courseId")
  .put(authCtrl.requireLogin, courseCtrl.uncomment);

router.route("/like/:courseId").put(authCtrl.requireLogin, courseCtrl.like);

router.route("/unlike/:courseId").put(authCtrl.requireLogin, courseCtrl.unlike);

router
  .route("/:courseId")
  .delete(authCtrl.requireLogin, courseCtrl.isPoster, courseCtrl.remove);

router.param("userId", userCtrl.userByID);
router.param("courseId", courseCtrl.courseByID);

export default router;
