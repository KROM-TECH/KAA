// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var booksRef = db.collection(`books`);

$(document).ready(function () {
    const dropDown = $('#dropDown').val();
    $(`#dropDown a`).click(function (e) {
        e.preventDefault(); // cancel the link behaviour
        const selText = $(this).text();
        $(`#searchFilter`).text(selText);

        // console.log(selText)
        $(`#searchArchive`).change(function () {
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
        var tableRow = '';
        querySnapshot.forEach(function (doc) {
            var document = doc.data();
            tableRow += '<tr>';
            tableRow += '<td class="uploader">' + escape(document.uploader) + '</td>';
            tableRow += '<td class="university">' + escape(document.university) + '</td>';
            tableRow += '<td class="bookName">' + escape(document.bookName) + '</td>';
            tableRow += '<td class="bookAuthor">' + escape(document.bookAuthor) + '</td>';
            tableRow += '<td class="faculty">' + escape(document.faculty) + '</td>';
            tableRow += '<td class="department">' + escape(document.department) + '</td>';
            tableRow += '<td class="level">' + escape(document.level) + '</td>';
            tableRow += '<td class="semester">' + escape(document.semester) + '</td>';
            tableRow += '<td class="book">' + `<a href=${document.book}; download=${document.bookName}><i class="fa fa-arrow-down"  style="color:green"></i> </a>` + '</td>'
            tableRow += '</tr>';
        });
        $('tbody.tbodyData').html(tableRow.split("%20").join(" ").split("%26").join("&").split("%2C").join(","));
    }
});
