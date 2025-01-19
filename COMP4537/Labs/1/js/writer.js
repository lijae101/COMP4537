const writerBackButton = document.getElementById("writerBackButton");
writerBackButton.textContent = "Back to Home";
writerBackButton.addEventListener("click", () => {
    window.location.href = "./index.html";
});

const writerHeader = document.getElementById("WriterHeader");
writerHeader.textContent = writerTitle;

const LastSaved = document.getElementById("LastSaved");
LastSaved.textContent = LastSaved; 

const addButton = document.getElementById("add-note");
addButton.textContent = add;

document.addEventListener("DOMContentLoaded", () => {
    const noteManager = new NoteManager("notes-container");
  
    document.getElementById("add-note").addEventListener("click", () => {
      noteManager.addNote();
    });
  
  
    setInterval(() => noteManager.saveNotes(), 2000); // Auto-save every 2 seconds
  });
  