console.log("js connected");

let notebookList = [];
let notesList = [];
let createNotebookButton = document.getElementById("create-notebook");

function createNotebookItem() {
  let form = document.createElement("form");
}

function addNotebook() {
  notebookList.forEach(element => {
    // createNotebookItem() on button click
  });

  /*
  while number of notebooks >= 0
  when clicking the create button
    add a new item on the list (array push)
    save the creation date:time for that note
      (this does not automatically add an empty note to the notebook)
  */
}

function delNotebook() {
  /*
  while the number of notebooks > 0
    remove notebook item from list (array pop)
    if the number of notebook == 0
      grey out the del button
  */
}

function addNote() {

}

function delNote() {

}