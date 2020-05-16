
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var booksRef = db.collection("books");


$(document).ready(function () {
  //get all the data on app startup
  $('#createEmployee').click(function () {
    $('.employeeForm').css("display", "block");
    $('#submit').text('Save Changes')
  });


  $('#submit').click(function (e) {
    e.preventDefault();
    //employee form values
    var uploader = $("#uploader").val();
    var university = $("#university").val();
    var bookName = $("#bookName").val();
    var bookAuthor = $("#bookAuthor").val();
    var faculty = $("#faculty").val();
    var department = $("#department").val();
    var level = $('#level').val();
    var semester = $('#semester').val();
    var book = $('#book').val().split('\\').pop()

    if(uploader == "" )




    var docuName = uploader + "." + book.charAt(0) + '.' + book.slice(-1);
    var sfDocRef = db.collection("books").doc(docuName);
    sfDocRef.set({
      uploader: uploader,
      university: university,
      bookName: bookName,
      bookAuthor: bookAuthor,
      faculty: faculty,
      department: department,
      level: level,
      semester: semester,
      book: book,
    })
      .then(function () {
        // $('#operationStatus').html('<div class="alert alert-success"><strong>Success!</strong> Employee was updated.</div>').delay(2500).fadeOut('slow');
        // $('.employeeForm').css("display", "none");
        // alert("Successful");

        console.log("UPLOAD-FILE called!");
        var storageReference = firebase.storage().ref();
        var file = document.getElementById("book").files[0];


        let uploadTask = storageReference
          .child("books/" + file.name)
          .put(file)

        uploadTask.on('state_changed', function (snapshot) {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          document.getElementById("status").innerHTML = Math.floor(progress) + '% uploaded'

        }, function (error) {
          alert("something went wrong, No vex but abeg reupload")
          console.log(error)
        }, function () {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(result => {
            // console.log("Image uploaded!");
            // alert("File uploaded!");
            $('#uploadModal').modal('hide'); //or  $('#IDModal').modal('hide');
          })
            .catch(error => {
              console.log("Error ==== ", error);
              alert("Something went wrong!");
            });
          LoadData();
        });
      })


  })
  // .catch(function (error) {
  //   console.log(error)
  //   // $('#operationStatus').html('<div class="alert alert-danger"><strong>Failure!</strong> Employee could not be updated.</div>').delay(2500).fadeOut('slow');
});
// }
// });






// $("#searchEmployee").change(function () {
//   console.log('You entered: ', $(this).val());
//   //Get the Employee Data
//   var searchValue = $(this).val()
//   booksRef.where("uploader", "==", searchValue)
//     .onSnapshot(function (querySnapshot) {
//       LoadTableData(querySnapshot)
//     });
// });






function LoadData() {
  booksRef.get().then(function (querySnapshot) {
    LoadTableData(querySnapshot)
  });
}

function LoadTableData(querySnapshot) {
  var tableRow = '';
  querySnapshot.forEach(function (doc) {
    var document = doc.data();
    tableRow += '<tr>';
    tableRow += '<td class="uploader">' + document.uploader + '</td>';
    tableRow += '<td class="university">' + document.university + '</td>';
    tableRow += '<td class="bookName">' + document.bookName + '</td>';
    tableRow += '<td class="bookAuthor">' + document.bookAuthor + '</td>';
    tableRow += '<td class="faculty">' + document.faculty + '</td>';
    tableRow += '<td class="department">' + document.department + '</td>';
    tableRow += '<td class="level">' + document.level + '</td>';
    tableRow += '<td class="semester">' + document.semester + '</td>';
    tableRow += '<td class="book">' + `<a href=${document.book}; download=${document.bookName}><i class="fa fa-arrow-down"  style="color:green"></i> </a>` + '</td>'
    tableRow += '</tr>';
  });
  $('tbody.tbodyData').html(tableRow);
}
