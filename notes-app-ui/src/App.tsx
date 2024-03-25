import {useEffect, useState} from "react";
import "./App.css"

// Define the Note type using typescript
type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  // Create a state to store the notes and set the initial value to an empty array

  const[notes, setNotes] = useState<Note[]>([]);

  // add functionality to the form that lets us add new notes: add a state value for each form input
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // store the selected note into state
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);


  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const response = await fetch("http://localhost:3000/api/notes"); // make request to the server
        const notes: Note[] = await response.json(); // convert the response to JSON
        setNotes(notes); // update the notes state with the data from the api
      }
      catch(e) {
        console.log(e);
      }
    };
    fetchNotes();
  }, []);

  // add a function that handles when the user clicks on a note
  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }


  // add a function to handle the form submission
  const addNote = async (event: React.FormEvent) => { 
    event.preventDefault();
      // console.log("Title: ", title);
      // console.log("Content: ", content);

    try{
      const response = await fetch(
        "http://localhost:3000/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({title, content}),
          })
        
        const newNote = await response.json();

        const updatedNotesResponse = await fetch("http://localhost:3000/api/notes");
        const updatedNotes = await updatedNotesResponse.json();

       /*setNotes([newNote, ...notes])*/ // pass in a new array where first item is our new note and the rest of the items are the existing notes
       setNotes(updatedNotes); // update the notes state with the new array
        // clear the form inputs
        setTitle("");
        setContent("");
      }
      catch(e){
        console.log(e);
      }

      // // Create a new object
      // const newNote: Note = {
      //   id: notes.length + 1,
      //   title: title,
      //   content: content
      // }


    };


    const updateNote = async (event: React.FormEvent) => {
        event.preventDefault();

        if(!selectedNote){
          return;
        }

        try{
          const response = await fetch(`http://localhost:3000/api/notes/${selectedNote.id}`,
          {
            method: "PUT", // update note
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({title, content})
          })

          const updatedNote = await response.json(); // convert response to JSON
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note.id === selectedNote.id ? updatedNote : note
              )
          );
          // // create new array and update it with new note
          // const updatedNotesArray = notes.map((note) => (
          //   note.id === selectedNote.id ? updatedNote : note )
          // )

          // setNotes(updatedNotesArray); // update the notes state with the new array

          // reset form
          setTitle("");
          setContent(""); 
          setSelectedNote(null); 
        }catch(e){
          console.log(e);
        }
  };

    // reset form
    const cancelNote = () => {
      setTitle("");
      setContent("");
      setSelectedNote(null);
    }

    // remove notes
    const removeNote = async (event: React.MouseEvent, noteId: number) => {
      event.stopPropagation();

      try{
        // call delete endpoint
        await fetch(`http://localhost:3000/api/notes/${noteId}`,
        {
          method: "DELETE",
        });
        setNotes(notes.filter((note) => note.id !== noteId));
        // const updatedNotesArray = notes.filter((note) => note.id !== noteId);
        // setNotes(updatedNotesArray);
      }
      catch(e){
        console.log(e)
      }
    };


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
