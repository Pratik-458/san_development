import express from "express";
var router = express.Router();
import {
  getAllNotesC,
  getNotesByUserIdC,
  addNotesC,
  updateNotesC,
  deleteNotesC,
  addUserC,
  getAlluserC,
  getUserDataByIdC,
  performSearchC,
  summarizeNotesC,
} from "../controller/controller.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const path1 = __dirname + "/public";

router.get("/api/notes", (req, res) => {
  getAllNotesC(req, res);
});

//get all the user
router.get("/api/user", (req, res) => {
  getAlluserC(req, res);
});

router.get("/api/notesbyuserid", (req, res) => {
  getNotesByUserIdC(req, res);
});

router.post("/api/notes", (req, res) => {
  addNotesC(req, res);
});

router.put("/api/summary", (req, res) => {
  summarizeNotesC(req, res);
});

router.put("/api/notes", async (req, res) => {
  updateNotesC(req, res);
});

router.delete("/api/notes/", (req, res) => {
  deleteNotesC(req, res);
});

router.post("/login", function (req, res) {
  getUserDataByIdC(req, res);
});

router.get("/login", function (req, res) {
  return res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/home", (req, res) => {
  return res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.get("/register", function (req, res) {
  return res.sendFile(path.join(__dirname, "../public/Signup.html"));
});

//Adding user to the database
router.post("/Signup", (req, res) => {
  addUserC(req, res);
});

router.get("/notes/search", (req, res) => {
  performSearchC(req, res);
});
export default router;
