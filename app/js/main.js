
// let notesContainer = document.getElementById("notes-container");

// create note element
function createNewNote() {
  let div = document.createElement("div");
  div.classList.add("note");
  document.getElementById("notes-container").appendChild(div);
}


// add note element to the page via click button
