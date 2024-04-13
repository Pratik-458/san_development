import {
  getNotesByUserId,
  getAllNotes,
  addNotes,
  updateNotes,
  deleteNotes,
  addUser,
  getAllUser,
  getUserDataById,
  summarizeNotes,
} from "../model/model.js";

const getAllNotesC = (req, res) => {
  getAllNotes((error, result) => {
    if (!error) {
      res.json({ statusCode: 200, data: result, message: "success!" });
    } else {
      console.log(error);
    }
  });
};

// Getting all the user data.
const getAlluserC = (req, res) => {
  getAllUser((error, result) => {
    if (!error) {
      res.json({ statusCode: 200, data: result, message: "success!" });
    } else {
      console.log(error);
    }
  });
};

const getNotesByUserIdC = (req, res) => {
  let email = req.query.email;
  getNotesByUserId(email, (error, result) => {
    if (!error) {
      res.json({ statusCode: 200, data: result, message: "success!" });
    } else {
      console.log(error);
    }
  });
};

//getting user data by id
const getUserDataByIdC = (req, res) => {
  let email = req.query.email;
  getUserDataById(email, (error, result) => {
    if (!error) {
      res.json({ statusCode: 200, data: result, message: "success!" });
    } else {
      console.log(error);
    }
  });
};

const addNotesC = (req, res) => {
  let note = req.body;
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json({
      statusCode: 400,
      data: {},
      message: "Missing request body.",
    });
  } else {
    addNotes(note, (error, result) => {
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
const addUserC = (req, res) => {
  let note = req.body;
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json({
      statusCode: 400,
      data: {},
      message: "Missing request body.",
    });
  } else {
    addUser(note, (error, result) => {
      if (!error) {
        res.json({ statusCode: 200, data: result, message: "User Added" });
      } else {
        console.log(error);
        res.json({ statusCode: 400, data: error, message: "Failed" });
      }
    });
  }
};

const summarizeNotesC = (req, res) => {
  let note = req.body;
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json({
      statusCode: 400,
      data: {},
      message: "Missing request body.",
    });
  } else {
    summarizeNotes(note, (error, result) => {
      if (!error) {
        res.json({
          statusCode: 200,
          data: result,
          message: "notes summarised",
        });
      } else {
        console.log(error);
        res.json({ statusCode: 400, data: error, message: "Failed" });
      }
    });
  }
};

const updateNotesC = async (req, res) => {
  let note = req.body;
  let userId = req.body.email;
  let noteId = req.body.noteId;
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json({
      statusCode: 400,
      data: {},
      message: "Missing request body.",
    });
  } else {
    await updateNotes(note, userId, noteId, (error, result) => {
      if (!error) {
        res.json({ statusCode: 200, data: result, message: "Updated" });
      } else {
        console.log(error);
        res.json({ statusCode: 400, data: error, message: "Failed" });
      }
    });
  }
};
const deleteNotesC = (req, res) => {
  let requestBody = req.body;
  deleteNotes(requestBody, (error, result) => {
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
const performSearchC = (req, res) => {
  let query= req.query.query;
  let email = req.query.email;
  let resData = [];
  getNotesByUserId(email,(error, result) => {
    if (!error) {
      query = query.replace(/[^a-zA-Z ]/g, "").toLowerCase();
      result.forEach((notes) => {
        if (notes.title) {
          if (notes.title.toLowerCase().includes(query)) {
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

export {
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
};
