// api/index.js (or api/hello.js, etc)

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "../db.js";
import register from "../routes/registration.route.js";
import login from "../routes/login.route.js";
import courseLookLike from "../routes/LookLike.route.js";
import sectionRoutine from "../routes/sectionRoutine.route.js";
import userProfile from "../routes/UserPersonal.route.js";
import room from "../routes/Room.route.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/register", register);
app.use("/login", login);
app.use("/section", sectionRoutine);
app.use("/user", userProfile);
app.use("/lookLike", courseLookLike);
app.use("/room", room);

// Export as a function for Vercel
export default app;
