var express = require("express");
var router = express.Router();
let controller = require("../controller/controller");
const path = require('path');


router.get("/api/notes", (req, res) => {
  controller.getAllNotes(req, res);
});

router.get("/api/notesbyuserid/:name", (req, res) => {
  controller.getNotesByUserId(req, res);
});

router.post("/api/notes", (req, res) => {
  controller.addNotes(req, res);
});

router.put("/api/notes/:userid/:noteid", async (req, res) => {
  controller.updateNotes(req, res);
});

router.delete("/api/notes/", (req, res) => {
  controller.deleteNotes(req, res);
});

router.get('/login', function(req, res) { 
  return res.sendFile(path.join(__dirname, '/login.html')); 
});

router.get('/register', function(req, res) { 
  return res.sendFile(path.join(__dirname, '/Signup.html')); 
});

router.post("/Signup", (req, res) => {
  controller.addNotes(req, res);

});

module.exports = router;
