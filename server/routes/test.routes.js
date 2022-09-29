import express from "express";
import sampleCtrl from "../controllers/sample.controller";

const router = express.Router();

router.route("/test", sampleCtrl);

export default router;
