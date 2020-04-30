// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var booksRef = db.collection("books");


$(document ).ready(function() {
    //get all the data on app startup
    $('#createEmployee').click(function(){
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Save Changes')
    });

    $('#dynamicBtn').click(function(){
        //employee form values
        var uploader = $("#uploader").val();
        var university = $("#university").val();
        var bookName = $("#bookName").val();
        var bookAuthor = $("#bookAuthor").val();
        var faculty = $("#faculty").val();
        var department = $("#department").val();
        var level = $('#level').is(":checked")

        //check if you need to create or update an employee
        if($(this).text() == "Save Changes"){
            // Add an employee with document name as (first letter of firstname).(lastname)
            // Example: Ervis Trupja -> E.Trupja
            var docuName = uploader.charAt(0)+"."+university;
            db.collection("books").doc(docuName).set({
                uploader:uploader,
                university: university,
                bookName: bookName,
                bookAuthor: bookAuthor,
                faculty: faculty,
                department: department,
                level: level
            })
            .then(function(docRef) {
                 $('#operationStatus').html('<div class="alert alert-success"><strong>Success!</strong> Employee was created!</div>').delay(2500).fadeOut('slow');
                 $('.employeeForm').css("display", "none");
                 LoadData();
            })
            .catch(function(error) {
                $('#operationStatus').html('<div class="alert alert-danger"><strong>Error!</strong> Employee was not created!</div>').delay(2500).fadeOut('slow');
            });
        }
        else{
            // Create a reference to the document by following the same pattern of the document name.
            // Example: Ervis Trupja -> E.Trupja
            var docuName = uploader.charAt(0)+"."+university;
            var sfDocRef = db.collection("books").doc(docuName);
            sfDocRef.set({ 
                uploader:uploader,
                university: university,
                bookName: bookName,
                bookAuthor: bookAuthor,
                faculty: faculty,
                department: department,
                level: level
            })
            .then(function() {
                $('#operationStatus').html('<div class="alert alert-success"><strong>Success!</strong> Employee was updated.</div>').delay(2500).fadeOut('slow');
                $('.employeeForm').css("display", "none");
                LoadData();
            })
            .catch(function(error) {
                $('#operationStatus').html('<div class="alert alert-danger"><strong>Failure!</strong> Employee could not be updated.</div>').delay(2500).fadeOut('slow');
            });
        }
    });

    // Cancel the Employee form
    $('#cancel').click(function(){
        $('.employeeForm').css("display", "none");
    });

    // Get the data of the employee you want to edit
    $("tbody.tbodyData").on("click","td.editEmployee", function(){
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Update Employee');

        $("#uploader").val($(this).closest('tr').find('.uploader').text());
        $("#university").val($(this).closest('tr').find('.university').text());
        $("#bookName").val($(this).closest('tr').find('.bookName').text());
        $("#bookAuthor").val($(this).closest('tr').find('.bookAuthor').text());
        $("#faculty").val($(this).closest('tr').find('.faculty').text());
        $("#department").val($(this).closest('tr').find('.department').text());
        $("#level").prop('checked', $(this).closest('tr').find('.level').text() === 'true');
    });

    // Delete employee
    $("tbody.tbodyData").on("click","td.deleteEmployee", function(){

        //Get the Employee Data
        var uploader = $(this).closest('tr').find('.uploader').text(); //First Name
        var university = $(this).closest('tr').find('.university').text(); //Last Name

        // Create a reference to the document by following the same pattern of the document name.
        // Example: Ervis Trupja -> E.Trupja
        var docuName = uploader.charAt(0)+"."+university;
        db.collection("books").doc(docuName).delete().then(function() {
            $('#operationStatus').html('<div class="alert alert-success"><strong>Success!</strong> Employee was deleted.</div>').delay(2500).fadeOut('slow');
            LoadData();
        }).catch(function(error) {
            $('#operationStatus').html('<div class="alert alert-danger"><strong>Failure!</strong> Employee was not deleted.</div>').delay(2500).fadeOut('slow');
        });
    });

    $("#searchEmployee" ).change(function() {
        console.log('You entered: ', $(this).val());
        //Get the Employee Data
        var searchValue = $(this).val()
        booksRef.where("uploader", "==", searchValue)
        .onSnapshot(function(querySnapshot) {
            LoadTableData(querySnapshot)
        });
      });



      function LoadData(){
        booksRef.get().then(function(querySnapshot) {
            LoadTableData(querySnapshot)
        });
      }

      function LoadTableData(querySnapshot){
        var tableRow='';
        querySnapshot.forEach(function(doc) {
            var document = doc.data();
            tableRow +='<tr>';
            tableRow += '<td class="uploader">' + document.uploader + '</td>';
            tableRow += '<td class="university">' + document.university + '</td>';
            tableRow += '<td class="bookName">' + document.bookName + '</td>';
            tableRow += '<td class="bookAuthor">' + document.bookAuthor + '</td>';
            tableRow += '<td class="faculty">' + document.faculty + '</td>';
            tableRow += '<td class="department">' + document.department + '</td>';
            tableRow += '<td class="level">' + document.level + '</td>';
            tableRow += '<td class="editEmployee"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>'
            tableRow += '<td class="deleteEmployee"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>'
            tableRow += '</tr>';
        });
        $('tbody.tbodyData').html(tableRow);
      }
});