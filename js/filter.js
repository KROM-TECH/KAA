  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
  var booksRef = db.collection("books");
  
  $(document).ready(function() {

          $('#onlyMalesFilter').click(function(){
              console.log('onlyMalesFilter Filter executed');
              booksRef.where("faculty", "==", "Male")
              .onSnapshot(function(querySnapshot) {
                  LoadTableData(querySnapshot);
              });
          });

          $('#fullTimeFilter').click(function(){
              booksRef.where("level", "==", true)
                  .onSnapshot(function(querySnapshot) {
                      LoadTableData(querySnapshot);
              });
          });

          $('#olderThenFilter').click(function(){
              //older than 30
              booksRef.where("bookAuthor", ">=", 30)
              .onSnapshot(function(querySnapshot) {
                  LoadTableData(querySnapshot);
              });
          });

          $('#bookAuthorBetweenFilter').click(function(){
              //older than 35, but younger than 50
              booksRef.where("bookAuthor", ">=", 35).where("bookAuthor", "<=", 50)
              .onSnapshot(function(querySnapshot) {
                  LoadTableData(querySnapshot);
              });
          });

          $('#departmentFilter').click(function(){
              //female and 5-10 years of experience
              booksRef.where("faculty", "==", "Female")
              booksRef.where("department", ">=", 5).where("department", "<=", 10)
              .onSnapshot(function(querySnapshot) {
                  LoadTableData(querySnapshot);
              });
          });

          $('#clearFilter').click(function(){
              booksRef.get().then(function(querySnapshot) {
                  LoadTableData(querySnapshot);
              });
          });
          
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