import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import blogCtrl from "../controllers/blog.controller";

const router = express.Router();

router.route("/new/:userId").post(authCtrl.requireLogin, blogCtrl.create);

router.route("/user/:userId").get(authCtrl.requireLogin, blogCtrl.listByUser);

router.route("/comment/:blogId").put(authCtrl.requireLogin, blogCtrl.comment);

router
  .route("/uncomment/:blogId")
  .put(authCtrl.requireLogin, blogCtrl.uncomment);

router.route("/like/:blogId").put(authCtrl.requireLogin, blogCtrl.like);

router.route("/unlike/:blogId").put(authCtrl.requireLogin, blogCtrl.unlike);

router
  .route("/:blogId")
  .delete(authCtrl.requireLogin, blogCtrl.isPoster, blogCtrl.remove);

router.route("/").get(authCtrl.requireLogin, blogCtrl.getFeed);

router.param("userId", userCtrl.userByID);
router.param("blogId", blogCtrl.blogByID);

// console.log(router.stack)

export default router;
