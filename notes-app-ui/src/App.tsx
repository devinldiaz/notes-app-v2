import {useState} from "react";
import "./App.css"

// Define the Note type using typescript
type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  // Create a state to store the notes and set the initial value to an empty array

  const[notes, setNotes] = useState<Note[]>([
    // Add dummy notes to the state
    {
      id: 1,
      title: "Note Title 1",
      content: "Note content 1"
    },
    {
      id: 2,
      title: "Note Title 2",
      content: "Note content 2"
    },
    {
      id: 3,
      title: "Note Title 3",
      content: "Note content 3"
    },
    {
      id: 4,
      title: "Note Title 4",
      content: "Note content 4"
    }
  ]);

  // add functionality to the form that lets us add new notes: add a state value for each form input
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // store the selected note into state
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // add a function that handles when the user clicks on a note
  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }


  // add a function to handle the form submission
  const addNote = (
    event: React.FormEvent) => { 
      event.preventDefault();
      // console.log("Title: ", title);
      // console.log("Content: ", content);


      // Create a new object
      const newNote: Note = {
        id: notes.length + 1,
        title: title,
        content: content
      }

      // Add the new note to the notes state
      setNotes([newNote, ...notes]) // pass in a new array where first item is our new note and the rest of the items are the existing notes
      // clear the form inputs
      setTitle("");
      setContent("");
    };


    const updateNote = (
      event: React.FormEvent
    ) => {
        event.preventDefault();

        if(!selectedNote){
          return;
        }

        const updatedNote: Note = {
          id: selectedNote.id,
          title: title,
          content: content 
        }

        // create new array and update it with new note
        const updatedNotesArray = notes.map((note) => (
          note.id === selectedNote.id ? updatedNote : note )
        )

      setNotes(updatedNotesArray); // update the notes state with the new array
      // reset form
      setTitle("");
      setContent(""); 
      setSelectedNote(null); 
      
  };

    // reset form
    const cancelNote = () => {
      setTitle("");
      setContent("");
      setSelectedNote(null);
    }

    // remove notes
    const removeNote = (event: React.MouseEvent, noteId: number) => {
      event.stopPropagation();
      const updatedNotesArray = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotesArray);
    }

    


  return(
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event)=>
          selectedNote 
            ? updateNote(event) 
            : addNote(event)
        }
      >
        <input
          value={title}
          // on change event to update title state value
          onChange={(event)=> setTitle(event.target.value)}
          placeholder="Title"
          required
        ></input>
        <textarea
          value={content}
          // update the state value with whatever is entered
          onChange={(event)=> setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons" >
            <button type="submit">Save</button>
            <button onClick={cancelNote}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {/* Map over the notes and display them */}
        {notes.map((note)=> (
          <div
            className="notes-item"
            onClick={()=> selectNote(note)}
          >
          <div className="notes-header">
            <button onClick={(event)=>removeNote(event, note.id)}>
                x
            </button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))
        }
      </div>
      </div>
  )
}

export default App


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
