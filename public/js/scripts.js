document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, []);
});

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
var collapsibleElem = document.querySelector(".collapsible");
var collapsibleInstance = M.Collapsible.init(collapsibleElem, []);

// Or with jQuery

$(document).ready(function () {
  $(".sidenav").sidenav();
});
const addCards = (items) => {
  console.log(items);
};

var userdata= [] ;


//getting user data from html
const submitUserForm = () => {
    let formData = {};
    formData.Firstname = $('#Firstname').val();
    formData.Lastname = $('#Lastname').val();
    formData.email = $('#email').val();
    formData.password = $('#password').val();
    email_user = $('#email').val();
    //console.log('form data: ', formData);
    addUserData(formData);
   
}

const submitNotesForm = () => {
    let NoteData = {};
    NoteData.email = email_user;
    NoteData.description = $('#description').val();

    //console.log('form data: ', formData);
    addData(formData);
   
}


//TO get all the data
const getUserData = () => {
    $.get('/api/user', (res) => {
        if (res.statusCode === 200) {
            userdata = res.data;
            console.log(res.data)
            //addCards(res.data);
        }
    });
}

//getting partiular data id
const getUserdataid = () =>{
    let k = 0;
    let data = {}
     data.email = $('#email').val();
     data.password = $('#password').val(); 
    for(var i=0; i < userdata.length; i++)
    {
        if(data.email == userdata[i].email)
        {
            if(data.password == userdata[i].password){
            localStorage.setItem("email",userdata[i].email);
            console.log("sucess");
            location.href = "\home"
             k = 1;
            }
            else
            {
                alert("password wrong");
            }
        }
    }

   if(k==1)
   {
    console.log("user found");
   }
   else{
    alert("User not registered");
   }
}




//adding user data to the database.
const addUserData = (data) => {
    
    let flag = 0;
    for(var i=0; i < userdata.length; i++)
    {
        if(data.email == userdata[i].email)
        {
            alert("User already existe, please login");
            flag = 1;
            exit;
        }
    }

    if(flag == 0)
    {
        $.ajax({
            url: '/Signup',
            data: data,
            type: 'POST',
            success: (result) => {
                   
            alert(result.message);
            //location.reload();
            }
        });
    }
    
}

const getlocalvalue = () =>{
    $.get('/login');
    console.log(localStorage.getItem('email'))
    localStorage.clear()
}


const loadAllNotes = () =>{
    $.get('/api/notes', (res) => {
        if (res.statusCode === 200) {
            displayNotes(res.data);
        }
    });
}

//function myFunction(){
//  submitForm();
//getdata();
//}


$(document).ready(function(){
    

    getUserData();

    $('.materialboxed').materialbox();
    //$('.modal').modal();
    $('#formSubmit').click(()=>{
        submitUserForm();
    })

    //For login
    $('#LoginSubmit').click(()=>{
        getUserdataid(); 
    })

    $('#check').click(()=>{
        getlocalvalue();
    })
    console.log("load all notes");
    loadAllNotes();

});

$("#search").change(function(){
    var searchText = this.value;
    if(this.value.length > 2){
        $.get('/notes/search?query='+searchText, (res) => {
            if (res.statusCode === 200) {
                displayNotes(res.data);
            }else{
                console.log("error while getting search results");
            }
        }); 
    }else if(this.value.length == 0){
        loadAllNotes();
    }
});

const displayNotes = function(notes){

    $('#notesBody').empty();
    if(notes.length >0){

    notes.forEach(notes=>{
        if(notes.title){
        $("#notesBody").append(

            $("<div>", {id: notes._id, "class": "note"}).append(
                $("<h1>"+notes.title+"</h1>")
            ).append(
                $("<p>"+notes.description+"</p>")
            )


        )}});
            }else{
                $("#notesBody").append("<p>No notes to display.</p>");
            }
}