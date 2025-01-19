const readerBackButton = document.getElementById("readerBackButton");
readerBackButton.textContent = "Back to Home";
readerBackButton.addEventListener("click", () => {
    window.location.href = "./index.html";
});

const readerHeader = document.getElementById("ReaderHeader");
readerHeader.textContent = readerTitle;

const LastRetrieved = document.getElementById("LastRetrieved");
LastRetrieved.textContent = lastRetrieved;

function updateLastRetrieved(){
    const now = new Date();
    LastRetrieved.textContent = `${lastRetrieved} ${now.toLocaleString()}`;
}

setInterval(updateLastRetrieved, 2000);

document.addEventListener("DOMContentLoaded", () => {
    const noteManager = new NoteManager("notesContainer");

    noteManager.displayNotes();

    setInterval(() => noteManager.displayNotes(), 2000); // Auto-save every 2 seconds
});

