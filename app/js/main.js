let notes = [];
const note = document.querySelector('.nl-note');
const input = document.addEventListener('click', createNote());


function renderNotes() {
  note.innerHTML = notes.map(createNote).join('');
}

function createNote(note) {
  const { title, text } = note;

  return `
    <div class="note">
      <div class="note-title">${title}</div>
      <div class="note-text">${text}</div>
    </div>
  `;
}