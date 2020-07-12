// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var booksRef = db.collection(`books`);
var table = document.querySelector('.tbodyData')


const search = function () {
    const dropDown = $('#dropDown').val();
    $(`#dropDown a`).click(function (e) {
        e.preventDefault(); // cancel the link behaviour
        const selText = $(this).text();
        $(`#searchFilter`).text(selText);

        // console.log(selText)
        $(`#searchArchive`).keyup(function () {
            table.innerHTML = ''
            // console.log('You entered: ', $(this).val());
            //Get the Employee Data
            if (selText == 'Uploader') {
                var searchValue = $(this).val()
                booksRef.orderBy("uploader").startAt(searchValue.toLowerCase()).endAt((searchValue.toLowerCase()) + "\uf8ff")
                    .onSnapshot(function (querySnapshot) {
                        LoadTableData(querySnapshot)
                    });
            } else if (selText == 'University') {
                var searchValue = $(this).val()
                booksRef.orderBy("university").startAt(searchValue.toLowerCase()).endAt((searchValue.toLowerCase()) + "\uf8ff")
                    .onSnapshot(function (querySnapshot) {
                        LoadTableData(querySnapshot)
                    });
            } else if (selText == 'Book Name') {
                var searchValue = $(this).val()
                booksRef.orderBy("bookName").startAt(searchValue.toLowerCase()).endAt((searchValue.toLowerCase()) + "\uf8ff")
                    .onSnapshot(function (querySnapshot) {
                        LoadTableData(querySnapshot)
                    });
            } else if (selText == 'Book Author') {
                var searchValue = $(this).val()
                booksRef.orderBy("bookAuthor").startAt(searchValue.toLowerCase()).endAt((searchValue.toLowerCase()) + "\uf8ff")
                    .onSnapshot(function (querySnapshot) {
                        LoadTableData(querySnapshot)
                    });
            } else if (selText == 'Faculty') {
                var searchValue = $(this).val()
                booksRef.orderBy("faculty").startAt(searchValue.toLowerCase()).endAt((searchValue.toLowerCase()) + "\uf8ff")
                    .onSnapshot(function (querySnapshot) {
                        LoadTableData(querySnapshot)
                    });
            } else if (selText == 'Department') {
                var searchValue = $(this).val()
                booksRef.orderBy("department").startAt(searchValue.toLowerCase()).endAt((searchValue.toLowerCase()) + "\uf8ff")
                    .onSnapshot(function (querySnapshot) {
                        LoadTableData(querySnapshot)
                    });
            };
        });
    });




    function LoadTableData(querySnapshot) {
        var storageReference = firebase.storage().ref();
        querySnapshot.forEach(function (doc) {
            var document = doc.data();
            // console.log(document)
            storageReference
                .child("books/" + `${document.book}`)
                .getDownloadURL()
                .then(url => {
                    // console.log(url)


                    var tableRow = ``;
                    tableRow += `<tr style="height: 1rem;">`;
                    tableRow += `<td class="book"><a href=${url}; download=${document.bookName}><i class="fa fa-arrow-down"  style="color:green"></i> </a></td>`
                    tableRow += `<td class="bookName"> ${document.bookName}</td>`;
                    tableRow += `<td class="bookAuthor"> ${document.bookAuthor}</td>`;
                    tableRow += `<td class="university"> ${document.university}</td>`;
                    tableRow += `<td class="faculty"> ${document.faculty} </td>`;
                    tableRow += `<td class="department"> ${document.department} </td>`;
                    tableRow += `<td class="level"> ${document.level} </td>`;
                    tableRow += `<td class="semester"> ${document.semester} </td>`;
                    tableRow += `<td class="uploader"> ${document.uploader}</td>`;
                    tableRow += `</tr>`;
                    table.innerHTML += tableRow;
                })
        })
    };
}


search()