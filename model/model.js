let client = require("../dbconnection");
let dbcollection = client.db("notesdb").collection("notes"); //TODO can be better
let dbusercollection = client.db("notesdb").collection("User");

function getNotesByUserId(req, callBack) {
  return dbcollection.find({ email: req }).toArray(callBack);
}

//get the particular user data
function getUserDataById(req, callBack) {
  return dbusercollection.find({ email: req }).toArray(callBack);
}

function getAllNotes(callBack) {
  //dbcollection.find({ userId: req }).toArray(callBack);
  dbcollection.find({}).toArray(callBack);
}

function addNotes(note, callBack) {
  dbcollection.insertOne(note, callBack);
}

function addUser(user, callBack) {
  dbusercollection.insertOne(user, callBack);
}

function getAllUser(callBack) {
  //dbcollection.find({ userId: req }).toArray(callBack);
  dbusercollection.find({}).toArray(callBack);
}

async function updateNotes(note, userId, noteId, callBack) {
  const options = { upsert: false };
  var query = { email: userId, noteId: noteId };
  await dbcollection.replaceOne(
    query,
    note,
    options,
    callBack
  );
}

const deleteNotes = (note, callback) => {
  var query = { email: note.email, noteId: note.noteId };
  dbcollection.deleteOne(query, callback);
};

module.exports = {
  getNotesByUserId,
  getAllNotes,
  addNotes,
  updateNotes,
  deleteNotes,
  addUser,
  getAllUser,
  getUserDataById,
};
