const addCards = (items) => {
    console.log(items);
}

const submitForm = () => {
    let formData = {};
    formData.Firstname = $('#Firstname').val();
    formData.Lastname = $('#Lastname').val();
    formData.email = $('#email').val();
    formData.password = $('#password').val();

    //console.log('form data: ', formData);
    addData(formData);
   
}

const getData = () => {
    $.get('/api/notes', (res) => {
        if (res.statusCode === 200) {
            console.log(res.data)
            //addCards(res.data);
        }
    });
}

//adding data to the database.
const addData = (data) => {
    $.ajax({
        url: '/Signup',
        data: data,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    });
}

//function myFunction(){
  //  submitForm();
    //getdata();
//}


$(document).ready(function(){
    
    $('.materialboxed').materialbox();
    //$('.modal').modal();
    $('#formSubmit').click(()=>{
        submitForm();
    })

    getData();

});