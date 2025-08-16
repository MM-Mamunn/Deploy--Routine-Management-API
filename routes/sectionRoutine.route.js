import express from "express";
const router = express.Router();
import { sectionRoutine } from "../controllers/sectionRoutine.controller.js";
router.get('/fullroutine/:section/:session',sectionRoutine);

export default router;
