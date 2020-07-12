// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var booksRef = db.collection("books");
var table = document.querySelector('.tbodyData')
var spinner = document.querySelector('.spinner')
// var table = document.querySelector('body')

window.addEventListener('scroll', e => {
  // console.log(e)
  // console.log('scrolling')
  console.log(window.scrollY)
  console.log(window.outerHeight)

  if (window.scrollY > window.outerHeight) {
    spinner.style.display= 'block'
  }
})


booksRef.get().then(function (querySnapshot) {

  var storageReference = firebase.storage().ref();
  querySnapshot.forEach(function (doc) {
    var document = doc.data();
  // console.log(document)
  storageReference
    .child("books/" + `${document.book}`)
    .getDownloadURL()
    .then(url => {
      // console.log(url)
      spinner.style.display= 'none'


        var tableRow = ``;
      tableRow += `<tr style="height: 1rem;">`;
      tableRow += `<td class="book"><a href=${url}; download=${document.bookName}><i class="fa fa-arrow-down"  style="color:green"></i> </a></td>`
      tableRow += `<td class="bookName"> ${ document.bookName }</td>`;
      tableRow += `<td class="bookAuthor"> ${document.bookAuthor}</td>`;
      tableRow += `<td class="university"> ${document.university}</td>`;
      tableRow += `<td class="faculty"> ${document.faculty} </td>`;
      tableRow += `<td class="department"> ${document.department} </td>`;
      tableRow += `<td class="level"> ${document.level} </td>`;
      tableRow += `<td class="semester"> ${document.semester} </td>`;
      tableRow += `<td class="uploader"> ${document.uploader}</td>`;
      tableRow += `</tr>`;
       table.innerHTML +=tableRow;

    }).catch(error => {
      console.log(error)
    });
    })



});

