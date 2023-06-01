import mongoClient from "../dbconnection.js";
let dbcollection = mongoClient.db("notesdb").collection("notes"); //TODO can be better
let dbusercollection = mongoClient.db("notesdb").collection("User");
import SummaryTool from "node-summary";

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

function summarizeNotes(note, callBack) {
  const options = { upsert: true };
  var query = { userId: note.userId, noteId: note.noteId };
  var obj = {
    noteId: note.noteId,
    email: note.email,
    title: note.title,
    description: note.description,
    summary: "",
  };
  var title = note.title;
  // "Swayy is a beautiful new dashboard for discovering and curating online content [Invites]";
  var content = note.description;

  SummaryTool.summarize(title, content, function (err, summary) {
    if (err) console.log("Something went wrong man!");
    obj.summary = summary;

    console.log(summary);

    console.log("Original Length " + (title.length + content.length));
    console.log("Summary Length " + summary.length);
    console.log(
      "Summary Ratio: " +
        (100 - 100 * (summary.length / (title.length + content.length)))
    );
  });

  dbcollection.replaceOne(query, obj, options, callBack);
}

function getAllUser(callBack) {
  //dbcollection.find({ userId: req }).toArray(callBack);
  dbusercollection.find({}).toArray(callBack);
}

async function updateNotes(note, userId, noteId, callBack) {
  const options = { upsert: false };
  var query = { email: userId, noteId: noteId };
  await dbcollection.replaceOne(query, note, options, callBack);
}

const deleteNotes = (note, callback) => {
  var query = { email: note.email, noteId: note.noteId };
  dbcollection.deleteOne(query, callback);
};

export {
  getNotesByUserId,
  getAllNotes,
  addNotes,
  updateNotes,
  deleteNotes,
  addUser,
  getAllUser,
  getUserDataById,
  summarizeNotes,
};
