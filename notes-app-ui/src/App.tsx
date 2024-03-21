import {useState} from "react";
import "./App.css"

type Note = {
  id: number;
  title: string;
  content: string;

}

const App = () => {
  const[notes, setNotes] = useState<Note[]>([
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
    },
    {
      id: 5,
      title: "Note Title 5",
      content: "Note content 5"
    },
    {
      id: 6,
      title: "Note Title 6",
      content: "Note content 6"
    }
  ]);


  return(
    <div className="app-container">
      <form className="note-form">
        <input placeholder="Title" required></input>
        <textarea placeholder="Content" rows={10} required></textarea>
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note)=> (
          <div className="notes-item">
          <div className="notes-header">
            <button>x</button>
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
