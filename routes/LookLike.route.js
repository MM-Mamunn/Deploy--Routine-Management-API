import express from "express";
const router = express.Router();
import {
  courseLookLike,
  sectionLookLike,
  facultyLookLike,
  sessionLookLike,
  roomLookLike,
} from "../controllers/LookLike.controller.js";
router.get("/courseLookLike/:slug", courseLookLike);
router.get("/sectionLookLike/:slug", sectionLookLike);
router.get("/facultyLookLike/:slug", facultyLookLike);
router.get("/sessionLookLike/:slug", sessionLookLike);
router.get("/roomLookLike/:slug", roomLookLike);

export default router;
