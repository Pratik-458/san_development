let model = require("../model/model");

const getAllNotes = (req, res) => {
  model.getAllNotes((error, result) => {
    if (!error) {
      res.json({ statusCode: 200, data: result, message: "success!" });
    } else {
      console.log(error);
    }
  });
};

const getNotesByUserId = (req, res) => {
  let title = req.params.title;
  model.getNotesByUserId(title, (error, result) => {
    if (!error) {
      res.json({ statusCode: 200, data: result, message: "success!" });
    } else {
      console.log(error);
    }
  });
};

const addNotes = (req, res) => {
  let note = req.body;
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json({
      statusCode: 400,
      data: {},
      message: "Missing request body.",
    });
  } else {
    model.addNotes(note, (error, result) => {
      if (!error) {
        res.json({ statusCode: 200, data: result, message: "Added" });
      } else {
        console.log(error);
        res.json({ statusCode: 400, data: error, message: "Failed" });
      }
    });
  }
};

const updateNotes = async (req, res) => {
  let note = req.body;
  let userId = req.params.userId;
  let noteId = req.params.noteId;
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json({
      statusCode: 400,
      data: {},
      message: "Missing request body.",
    });
  } else {
    await model.updateNotes(note, userId, noteId, (error, result) => {
      if (!error) {
        res.json({ statusCode: 200, data: result, message: "Updated" });
      } else {
        console.log(error);
        res.json({ statusCode: 400, data: error, message: "Failed" });
      }
    });
  }
};
const deleteNotes = (req, res) => {
  let requestBody = req.body;
  model.deleteNotes(requestBody, (error, result) => {
    if (error) {
      res.json({ statusCode: 400, message: error });
    } else {
      res.json({
        statusCode: 200,
        data: result,
        message: "Successfully removed",
      });
    }
  });
};
module.exports = {
  getAllNotes,
  getNotesByUserId,
  addNotes,
  updateNotes,
  deleteNotes,
};