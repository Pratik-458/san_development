var express = require("express");
var router = express.Router();
let controller = require("../controller/controller");
const path = require("path");
const path1 = __dirname + "/public";

router.get("/api/notes", (req, res) => {
  controller.getAllNotes(req, res);
});

//get all the user
router.get("/api/user", (req, res) => {
  controller.getAlluser(req, res);
});

router.get("/api/notesbyuserid", (req, res) => {
  controller.getNotesByUserId(req, res);
});

router.post("/api/notes", (req, res) => {
  controller.addNotes(req, res);
});

router.put("/api/notes", async (req, res) => {
  controller.updateNotes(req, res);
});

router.delete("/api/notes/", (req, res) => {
  controller.deleteNotes(req, res);
});

router.post("/login", function (req, res) {
  controller.getUserDataById(req, res);
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
  controller.addUser(req, res);
});

router.get("/notes/search", (req, res) => {
  controller.performSearch(req, res);
});
module.exports = router;
