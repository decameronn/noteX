console.log('main.js connected');

let notes = [];

function createNote() {

}

function editNote() {

}

function deleteNote() {

}

function testButtons() {
  let test = document.querySelectorAll(".test");
  test.addEventListener("hover", function () {
    test.classList.add(".event-on-hover");
    console.log("button hover")
  });
  test.addEventListener("click", function () {
    test.classList.add(".event-on-click");
    console.log("button click")
  });
}