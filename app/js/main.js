
let notesContainer = document.getElementById("notes-container");

function createNewNote() {
  let div = document.createElement("div");
  div.classList.add("note");
  // document.getElementById("notes-container").appendChild(div);
  notesContainer.appendChild(div);
}

// TODO:
/**
 * - addNote function
 * - createNote function with note content
 * - save new note in browser Storage 
 * ...
 * - connect dropbox account
 * - sync notes
 */

 