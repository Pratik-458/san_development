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
      '</p><div class="col s12 center-align"><a class="waves-effect waves-light btn-small click-me-button modal-trigger deep-purple lighten-2" id="clickMeButton" data-target="modal2"><i class="material-icons left">mode_edit</i>Edit</a></div></div>';
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
  emailUser = $("#email").val();
  addUserData(formData);
};

// need to update from local storage
const submitNotesForm = () => {
  let NoteData = {};
  NoteData.noteId = "";
  NoteData.firstName = "tom";
  NoteData.email = "tom@mail.com";
  NoteData.title = $("#title").val();
  NoteData.description = $("#description").val();
  addNotesData(NoteData);
};
//this gets a array of user data objs
//TO get all the data
const getUserData = () => {
  $.get("/api/user", (res) => {
    if (res.statusCode === 200) {
      userdata = res.data;
      console.log(res.data);
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
      if (data.password == userdata[i].password) {
        localStorage.setItem("email", userdata[i].email);
        location.href = "home";
        k = 1;
      } else {
        alert("password wrong");
      }
    }
  }

  if (k == 1) {
    console.log("user found");
  } else {
    alert("User not registered");
  }
};

//adding user data to the database.
const addUserData = (data) => {
  let flag = 0;
  console.log(userdata.length);
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

const getlocalvalue = () => {
  $.get("/login");
  console.log(localStorage.getItem("email"));
  localStorage.clear();
};

$(document).ready(function () {
  getUserData();

  $(".materialboxed").materialbox();
  $(".modal").modal();

  $("#noteSubmit").click(() => {
    submitNotesForm();
  });

  $("#signupformSubmit").click(() => {
    submitUserForm();
  });

  //For login
  $("#loginSubmit").click(() => {
    getUserdataid();
    getAllUserNotes();
  });

  $("#check").click(() => {
    getlocalvalue();
  });
});
