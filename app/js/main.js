
// TODO:
/**
 * - addNote function
 * - createNote function with note content
 * - save new note in browser Storage 
 * ...
 * ... after a long time
 * - connect dropbox account
 * - sync notes
 */

 
let notesContainer = document.getElementById("notes-container");

function insertNewNote() {
  let note = document.createElement("div");  
  note.classList.add("note");

  let noteTitle = document.createTextNode("h3");
  noteTitle.classList.add("note-title");
  let noteText = document.createElement("textarea");
  noteText.classList.add("note-body");

  note.appendChild(noteText);
  note.appendChild(noteTitle);

  notesContainer.appendChild(div);
}
