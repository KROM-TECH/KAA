 // Initialize Cloud Firestore through Firebase
 var db = firebase.firestore();
 var booksRef = db.collection("books");

 booksRef.doc("1").set({
     uploader: "Harith", 
     university: "university of lagos", 
     bookName: "stuff",
     bookAuthor: "Ben 10", 
     faculty: 'Engineering',
     department: "systems",
     level: 200,
     semester: "first",
 });

 booksRef.doc("2").set({
     uploader: "Heritage", 
     university: "Unversity of Ibadan", 
     bookName: "I hate school",
     bookAuthor: "hard guy", 
     faculty: 'Engineering',
     department: "chemical",
     level: 200,
     semester: "first",
 });

 booksRef.doc("3").set({
     uploader: "Deji", 
     university: "university of abuja", 
     bookName: "Their Daddy",
     bookAuthor: "Naruto uzumaki", 
     faculty: 'Engineering',
     department: "met&mat",
     level: 200,
     semester: "first",
 });

 

 booksRef.get().then(function(querySnapshot) {
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
         tableRow += '<td class="semester">' + document.semester + '</td>';
         tableRow += '<td class="editEmployee"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>'
         tableRow += '<td class="deleteEmployee"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>'
         tableRow += '</tr>';
     });
     $('tbody.tbodyData').append(tableRow);
 });