
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
      '</p><div class="col s12 center-align"><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="updateButton" data-target="updateNotesButton"><i class="material-icons center">mode_edit</i></a><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="deleteButton" data-target="deleteNotesButton"><i class="material-icons center">delete_forever</i></a><a class="waves-effect waves-light btn-small click-me-button modal-trigger blue darken-4 lighten-2" id="generateSummaryButton"><i class="material-icons center">format_quote</i></a></div></div>';    $("#card-section").append(itemToAppend);
  });
};

var userdata = [];
var userNotes = {};

//getting user data from html
const submitUserForm = () => {
  let formData = {};
  formData.firstName = $("#Firstname").val();
  formData.lastName = $("#Lastname").val();
  formData.email = $("#email").val();
  formData.password = $("#password").val();
  emailUser = $("#email").val();
  addUserData(formData);
};

// need to update from local storage
const submitNotesForm = () => {
  let NoteData = {};
  NoteData.noteId = Date.now();
  NoteData.email = localStorage.getItem("email");
  NoteData.title = $("#title").val();
  NoteData.description = $("#description").val();
  addNotesData(NoteData);
  location.reload();
};
const updateNotesForm = () => {
  let NoteData = {};
  let noteID;
  NoteData.title = $("#title2").val();
  
  for(var i = 0; i < userNotes.length; i++ )
  {
    
    if(userNotes[i].title == NoteData.title )
    {
        noteID = userNotes[i].noteId;
      
    }
  }
  
  NoteData.noteId = noteID;
  NoteData.email = localStorage.getItem("email");
  NoteData.description = $("#description2").val();
  
  updateNotes(NoteData);
  location.reload();

};

const deleteNoteTrigger = () => {
  let NoteData = {};
  let noteID;
  NoteData.title = $("#title3").val();
  
  for(var i = 0; i < userNotes.length; i++ )
  {
    
    if(userNotes[i].title == NoteData.title )
    {
        noteID = userNotes[i].noteId;
      
    }
  }
  
  NoteData.noteId = noteID;
  NoteData.email = localStorage.getItem("email");
  NoteData.description = $("#description3").val();
  
  deleteNotes(NoteData);
  location.reload();

};

//this gets a array of user data objs
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

