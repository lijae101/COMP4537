/* Disclaimer: Open AI ChatGPT was used to assist in generating this noteManager class, as well as the styling in style.css

*/


class Note {
    constructor(content = ""){
        this.content = content;
        this.id = Date.now();
    }
}

class NoteManager{
    constructor(containerId){
        this.container = document.getElementById(containerId);
        this.notes = this.loadNotes();
        this.renderNotes();
    }

    loadNotes(){
        const notesData = localStorage.getItem("notes");
        return notesData ? JSON.parse(notesData) : [];
    }

    saveNotes(){
        localStorage.setItem("notes", JSON.stringify(this.notes));
        document.getElementById("LastSaved").textContent = `Last Saved: ${new Date().toLocaleString()}`;
    }

    addNote(content = ""){
        const newNote = new Note(content);
        this.notes.push(newNote);
        this.renderNotes();
        this.saveNotes();
        
    }

    removeNote(id){
        this.notes = this.notes.filter(note => note.id !== id);
        this.renderNotes();
        this.saveNotes();
    }

    renderNotes() {
        this.container.innerHTML = ""; // Clear existing notes
        this.notes.forEach(note => this.renderNote(note));
      }

    renderNote(note){
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        const textarea = document.createElement("textarea");
        textarea.value = note.content;
        textarea.addEventListener("input", (e) => {
            note.content = textarea.value;
            this.saveNotes();
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("id", "remove-note");
        removeButton.addEventListener("click", () => {
            this.removeNote(note.id);
        });
        
        noteDiv.appendChild(textarea);
        noteDiv.appendChild(removeButton);
        this.container.appendChild(noteDiv);
    }

    displayNotes() {
        // Reload notes from localStorage every time the display is updated
        this.notes = this.loadNotes();

        this.container.innerHTML = "";

        this.notes.forEach(note => {
            const noteDiv = document.createElement("div");
            noteDiv.className = "note";

            const textarea = document.createElement("textarea");
            textarea.value = note.content;
            textarea.disabled = true;
            noteDiv.appendChild(textarea);

            this.container.appendChild(noteDiv);
        });
    }
}

