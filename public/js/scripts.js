import { speechData } from "./speechRecognition.js";

const clickMe = () => {
  console.log("clickMe clicked");
};

const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend =
      '<div class="note"><h1>' +
      item.title +
      "</h1><p>" +
      item.description +
      '</p><div class="col s12 center-align"><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="updateNotesButton" data-target="modal2"><i class="material-icons center">mode_edit</i></a><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="deleteNotesButton"><i class="material-icons center">delete_forever</i></a><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="generateSummaryButton"><i class="material-icons center">format_quote</i></a></div></div>';
    $("#card-section").append(itemToAppend);
  });
};

var userdata = [];

//getting user data from html
const submitUserForm = () => {
  let formData = {};
  formData.firstName = $("#Firstname").val();
  formData.lastName = $("#Lastname").val();
  formData.email = $("#email").val();
  formData.password = $("#password").val();
  addUserData(formData);
};

// need to update from local storage
const submitNotesForm = () => {
  let NoteData = {};
  NoteData.noteId = Date.now();
  NoteData.email = localStorage.getItem("email");
  NoteData.title = $("#title").val();
  NoteData.description =
    $("#description").val() === "" ? speechData : $("#description").val();
  addNotesData(NoteData);
  location.reload();
};

//TO get all the data
const getUserData = () => {
  $.get("/api/user", (res) => {
    if (res.statusCode === 200) {
      userdata = res.data;
    }
  });
};

const getAllUserNotes = () => {
  $.get(
    "/api/notesbyuserid?email=" + localStorage.getItem("email"),
    (response) => {
      if (response.statusCode === 200) {
        addCards(response.data);
      }
    }
  );
};

//getting partiular data id
const getUserdataid = () => {
  let k = 0;
  let data = {};
  data.email = $("#email").val();
  data.password = $("#password").val();
  for (var i = 0; i < userdata.length; i++) {
    if (data.email == userdata[i].email) {
      k = 1;
      if (data.password == userdata[i].password) {
        localStorage.setItem("email", userdata[i].email);
      } else {
        alert("password wrong");
      }
    }
  }

  if (k == 0) {
    alert("User not registered");
  }
};

//adding user data to the database.
const addUserData = (data) => {
  let flag = 0;
  for (var i = 0; i < userdata.length; i++) {
    if (data.email == userdata[i].email) {
      alert("User already existe, please login");
      flag = 1;
      exit;
    }
  }

  if (flag == 0) {
    $.ajax({
      url: "/Signup",
      data: data,
      type: "POST",
      success: (result) => {
        alert(result.message);
        //location.reload();
      },
    });
  }
};

const addNotesData = (notes) => {
  $.ajax({
    url: "/api/notes",
    type: "POST",
    data: notes,
    success: (result) => {
      alert(result.message);
    },
  });
};

const generateSummary = (note) => {
  $.ajax({
    url: "/api/summary",
    type: "POST",
    data: note,
    success: (result) => {
      alert(result.message);
    },
  });
};

const signOutFunction = () => {
  localStorage.clear();
  location.reload();
};

const getlocalvalue = () => {
  $.get("/login");
  console.log(localStorage.getItem("email"));
  localStorage.clear();
};

$(document).ready(function () {
  getUserData();
  getAllUserNotes();

  $(".materialboxed").materialbox();
  $(".modal").modal();

  $("#noteSubmit").click(() => {
    submitNotesForm();
  });

  $("#signupformSubmit").click(() => {
    console.log("submit clicked");
    submitUserForm();
  });
  $("#logOutButton").click(() => {
    signOutFunction();
  });

  //For login
  $("#loginSubmit").click(() => {
    console.log("login clicked ");
    getUserdataid();
  });
  $("#generateSummaryButton").click(() => {
    generateSummary();
  });
});

const displayNotes = function (notes) {
  $("#notesBody").empty();
  if (notes.length > 0) {
    notes.forEach((notes) => {
      if (notes.title) {
        $("#notesBody").append(
          $("<div>", { id: notes._id, class: "note" })
            .append($("<h1>" + notes.title + "</h1>"))
            .append($("<p>" + notes.description + "</p>"))
        );
      }
    });
  } else {
    $("#notesBody").append("<p>No notes to display.</p>");
  }
};
