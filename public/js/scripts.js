import { speechData } from './speechRecognition.js';

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
      '</p><div class="col s12 center-align"><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="clickMeButton" data-target="modal2"><i class="material-icons left">mode_edit</i>Edit</a></div></div>';
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
  //emailUser = $("#email").val();

  if(formData.email != "" && formData.password != ""){
  addUserData(formData);
  location.href = "/login"
  }
  else{
    alert("Please, fill all values");
  }
};

// need to update from local storage
const submitNotesForm = () => {
  let NoteData = {};
  NoteData.noteId = Date.now();
  NoteData.email = localStorage.getItem("email");
  NoteData.title = $("#title").val();
  NoteData.description = $("#description").val() === '' ? speechData : $("#description").val();
  addNotesData(NoteData);
  location.reload();
};

// Search function
const getsearchfunction = () => {
  let data = $("#search").val
  $.ajax({
    url: "/notes/search",
    data: data,
    type: "GET",
    success: (result) => {
      let ddata = result;
      alert(result.message);
      console.log(ddata)
      //location.reload();
    },
  });
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

  if(data.email != "" && data.password != ""){
  for (var i = 0; i < userdata.length; i++) {
    if (data.email == userdata[i].email) {
      k = 1;
      if (data.password == userdata[i].password) {
        localStorage.setItem("email", userdata[i].email);
        location.href = "/home"
      } else {
        window.alert("password wrong");
      }
    }
  }

  if (k == 0) {
    alert("User not registered");
  }
}
else{
  alert("Please, fill all values");
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
