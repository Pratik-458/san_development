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

// Getting all the user data.
const getAlluser = (req, res) => {
  model.getAllUser((error, result) => {
    if (!error) {
      res.json({ statusCode: 200, data: result, message: "success!" });
    } else {
      console.log(error);
    }
  });
};

const getNotesByUserId = (req, res) => {
  let email = req.query.email;
  model.getNotesByUserId(email, (error, result) => {
    if (!error) {
      res.json({ statusCode: 200, data: result, message: "success!" });
    } else {
      console.log(error);
    }
  });
};

//getting user data by id
const getUserDataById = (req, res) => {
  let email = req.query.email;
  model.getUserDataById(email, (error, result) => {
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

//Adding user to database
const addUser = (req, res) => {
  let note = req.body;
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json({
      statusCode: 400,
      data: {},
      message: "Missing request body.",
    });
  } else {
    model.addUser(note, (error, result) => {
      if (!error) {
        res.json({ statusCode: 200, data: result, message: "User Added" });
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
const performSearch = (req, res) => {
  let queryString = req.query.query;
  let resData = [];
  model.getAllNotes((error, result) => {
    if (!error) {
      queryString = queryString.replace(/[^a-zA-Z ]/g, "").toLowerCase();
      result.forEach((notes) => {
        if (notes.title) {
          if (
            notes.title.toLowerCase().includes(queryString) ||
            notes.description.toLowerCase().includes(queryString)
          ) {
            resData.push(notes);
          }
        }
      });
      res.json({ statusCode: 200, data: resData, message: "success!" });
    } else {
      console.log("Error While processing the search");
      res.status(500).json({ msg: "Internal server error." });
    }
  });
};
module.exports = {
  getAllNotes,
  getNotesByUserId,
  addNotes,
  updateNotes,
  deleteNotes,
  addUser,
  getAlluser,
  getUserDataById,
  performSearch,
};
