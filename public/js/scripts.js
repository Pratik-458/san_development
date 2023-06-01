import { speechData } from "./speechRecognition.js";

var userdata = [];
var userNotes = {};

const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend =
      '<div class="note"><h1>' +
      item.title +
      "</h1><p>" +
      item.description +
      '</p><div class="col s12 center-align"><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="updateButton" data-target="updateNotesButton"><i class="material-icons center">mode_edit</i></a><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="deleteButton" data-target="deleteNotesButton"><i class="material-icons center">delete_forever</i></a><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="generateSummaryButton" data-target="summaryNotesButton"><i class="material-icons center">format_quote</i></a></div></div>';
    $("#card-section").append(itemToAppend);
  });
};

//getting user data from html
const submitUserForm = () => {
  let formData = {};
  formData.firstName = $("#Firstname").val();
  formData.lastName = $("#Lastname").val();
  formData.email = $("#email").val();
  formData.password = $("#password").val();

  if (formData.email != "" && formData.password != "") {
    addUserData(formData);
    location.href = "/login";
  } else {
    alert("Please, fill all values");
  }
};

// need to update from local storage
const submitNotesForm = () => {
  let noteData = {};
  noteData.noteId = Date.now();
  noteData.email = localStorage.getItem("email");
  noteData.title = $("#title").val();
  noteData.description =
    $("#description").val() === "" ? speechData : $("#description").val();
  addNotesData(noteData);
  location.reload();
};

const updateNotesForm = () => {
  let noteData = {};
  let noteID;
  noteData.title = $("#title2").val();
  for (var i = 0; i < userNotes.length; i++) {
    if (userNotes[i].title == noteData.title) {
      noteID = userNotes[i].noteId;
    }
  }
  noteData.noteId = noteID;
  noteData.email = localStorage.getItem("email");
  noteData.description = $("#description2").val();
  updateNotes(noteData);
  location.reload();
};

const deleteNoteTrigger = () => {
  let noteData = {};
  let noteID;
  noteData.title = $("#title3").val();
  for (var i = 0; i < userNotes.length; i++) {
    if (userNotes[i].title == noteData.title) {
      noteID = userNotes[i].noteId;
    }
  }
  noteData.noteId = noteID;
  noteData.email = localStorage.getItem("email");
  deleteNotes(noteData);
  location.reload();
};

//getting partiular data id
const getUserdataid = () => {
  let k = 0;
  let data = {};
  data.email = $("#email").val();
  data.password = $("#password").val();
  if (data.email != "" && data.password != "") {
    for (var i = 0; i < userdata.length; i++) {
      if (data.email == userdata[i].email) {
        k = 1;
        if (data.password == userdata[i].password) {
          localStorage.setItem("email", userdata[i].email);
          location.href = "/home";
        } else {
          window.alert("password wrong");
        }
      }
    }
    if (k == 0) {
      alert("User not registered");
    }
  } else {
    alert("Please, fill all values");
  }
};

const signOutFunction = () => {
  localStorage.clear();
  location.reload();
};

//adding user data to the database.
const addUserData = (data) => {
  let flag = 0;
  for (var i = 0; i < userdata.length; i++) {
    if (data.email == userdata[i].email) {
      alert("User already exists, please login");
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

const genSummary = () => {
  let noteData = {};
  let noteID;
  noteData.title = $("#title4").val();
  for (var i = 0; i < userNotes.length; i++) {
    if (userNotes[i].title == noteData.title) {
      noteID = userNotes[i].noteId;
      noteData.description = userNotes[i].description;
      break;
    }
  }
  noteData.noteId = noteID;
  noteData.email = localStorage.getItem("email");
  generateSummary(noteData);
  location.reload();
};

// Search function
const getsearchfunction = () => {
  let data = $("#search").val;
  $.ajax({
    url: "/notes/search?email="+localStorage.getItem("email"),
    data: data,
    type: "GET",
    success: (result) => {
      let ddata = result;
      alert(result.message);
      console.log(ddata);
      //location.reload();
    },
  });
};

$("#search").change(function(){
  var searchText = this.value;
  if(this.value.length > 2){
      $.get('/notes/search?query='+searchText+"&email="+localStorage.getItem("email"), (res) => {
          if (res.statusCode === 200) {
            $('#card-section').empty()
            addCards(res.data);
          }else{
              console.log("error while getting search results");
          }
      }); 
  }else if(this.value.length == 0){
    getAllUserNotes();
  }
});

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
        userNotes = response.data;
      }
    }
  );
};

const updateNotes = (notes) => {
  $.ajax({
    url: "/api/notes",
    type: "PUT",
    data: notes,
    success: (result) => {
      alert(result.message);
    },
  });
};

const deleteNotes = (notes) => {
  $.ajax({
    url: "/api/notes",
    type: "DELETE",
    data: notes,
    success: (result) => {
      alert(result.message);
    },
  });
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
    type: "PUT",
    data: note,
    success: (result) => {
      alert(result.message);
    },
  });
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

  $("#noteUpdate").click(() => {
    updateNotesForm();
  });

  $("#deleteNote").click(() => {
    deleteNoteTrigger();
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
  $("#summaryId").click(() => {
    genSummary();
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
