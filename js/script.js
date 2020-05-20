
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
    var uploader = $("#uploader").val().toLowerCase();
    var email = $("#email").val();
    var university = $("#university").val().toLowerCase();
    var bookName = $("#bookName").val().toLowerCase();
    var bookAuthor = $("#bookAuthor").val().toLowerCase();
    var faculty = $("#faculty").val().toLowerCase();
    var department = $("#department").val().toLowerCase();
    var level = $('#level').val().toLowerCase();
    var semester = $('#semester').val().toLowerCase();
    var book = $('#book').val().split('\\').pop()

    if(uploader == "" || university == "" || bookAuthor =="" || bookName == "" || faculty == "" || department == "" || level == "" || semester == "" || book == "" || email == "" ){
      alert('All fields are required before upload')
      location.reload()
    }




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
        db.collection("books").doc(docuName).collection('details').doc('detail').set({
          email: email,
        })
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
    tableRow += '<tr style="height: 1rem;">';
    tableRow += '<td class="book">' + `<a href=${document.book}; download=${document.bookName}><i class="fa fa-arrow-down"  style="color:green"></i> </a>` + '</td>'
    tableRow += '<td class="bookName">' + encodeURIComponent(document.bookName) + '</td>';
    tableRow += '<td class="bookAuthor">' + encodeURIComponent(document.bookAuthor) + '</td>';
    tableRow += '<td class="university">' + encodeURIComponent(document.university) + '</td>';
    tableRow += '<td class="faculty">' + encodeURIComponent(document.faculty) + '</td>';
    tableRow += '<td class="department">' + encodeURIComponent(document.department) + '</td>';
    tableRow += '<td class="level">' + encodeURIComponent(document.level) + '</td>';
    tableRow += '<td class="semester">' + encodeURIComponent(document.semester) + '</td>';
    tableRow += '<td class="uploader">' + encodeURIComponent(document.uploader) + '</td>';
    tableRow += '</tr>';
  });
  $('tbody.tbodyData').html(tableRow.split("%20").join(" ").split("%26").join("&").split("%2C").join(","));
}
