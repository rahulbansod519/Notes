shownotes();
// if user adds a note , add it to the localstorage.
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        title: addTitle.value,
        text: addtxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addTitle.value = "";
    shownotes();
})
// function to show notes 
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
       <div class="notescard my-2 mx-2 card" style="width: 18rem;">
       <div class="card-body">
           <h5 class="card-title">${index+1}.${element.title}</h5>
           <p class="card-text">${element.text}</p>
           <button id="${index}" class="btn btn-primary" onclick="deleteNotes(this.id)">Delete Note</button>
       </div>
   </div>
       `
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<div class="bg-primary p-2 text-dark bg-opacity-25">Nothing To Show, Add Notes</div>`
    }
}
// delete note function 
function deleteNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();

}
let searchtxt = document.getElementById('searchTxt');
searchtxt.addEventListener("input", function () {
    let inputVal = searchtxt.value.toLowerCase();
    let noteCards = document.getElementsByClassName('notescard');
    Array.from(noteCards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});