import express from "express";
const router = express.Router();
import { classEntry } from "../controllers/class.controller.js";
import studentAuthorization from "../middlewares/studentAuthorizan.js";

router.post("/new", studentAuthorization, classEntry);

export default router;
