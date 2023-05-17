var express = require("express");
var router = express.Router();
let controller = require("../controller/controller");

router.get("/api/notes", (req, res) => {
  controller.getAllNotes(req, res);
});

router.get("/api/notesbyuserid/:name", (req, res) => {
  controller.getNotesByUserId(req, res);
});

router.post("/api/notes", (req, res) => {
  controller.addnotes(req, res);
});

router.put("/api/notes/:userid/:noteid", async (req, res) => {
  controller.updateNotes(req, res);
});

router.delete("/api/notes/", (req, res) => {
  controller.deleteNotes(req, res);
});

module.exports = router;
