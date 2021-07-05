let addBtn = document.getElementById("add-btn")
let addTitle = document.getElementById("note-title")
let addDisc = document.getElementById("note-disc")
let eMsg = document.getElementById("e-msg")

addBtn.addEventListener("click", (e) => {
    if (addTitle.value == "" || addDisc.value == "") {

        eMsg.style.display = "block"
        eMsg.innerHTML = "Error! Either of the fields are incomplete!"
        return
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }

    let myObj = {
        title: addTitle.value,
        disc: addDisc.value,
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addDisc.value = "";

    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notes0bj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
      <div id="note">
        <span class="note-counter">${index + 1}</span>
        <span class="note-title">${element.title}</span>
        <p class="note-text">${element.disc}</p>
        <br />
        <button id="${index}" onclick="deletenote(this.id)" class="note-btn del-btn"><i class='bx bx-trash'></i></button>
        <button id="${index}" onclick="editnote(this.id)" class="note-btn edit-btn"><i class='bx bx-message-square-edit'></i></button>
      </div>
        `;
    })

    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    } else {
        noteElm.innerHTML = "No notes yet"
    }
}

function deletenote(index) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }

}
function editnote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addDisc = document.getElementById("note-disc");

    if (addTitle.value !== "" || addDisc.value !== "") {
        return alert("Clear the text area before editing another message!")
    }

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
        addTitle.value = element.title;
        addDisc.value = element.disc;
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();