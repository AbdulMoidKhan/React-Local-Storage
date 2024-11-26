import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS ko import karna taki styling use ki ja sake
import Note from './Note';                       // Note component ko import karna
import AddNoteForm from './AddNoteForm';         // AddNoteForm component ko import karna

function App() {
  const [notes, setNotes] = useState(() => {
    // Ye function local storage se notes ko load karta hai
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [error, setError] = useState('');  // Error state jo khali note add karne par show hota hai

  useEffect(() => {
    // useEffect hook jo local storage mein notes ko save karta hai jab bhi notes state change hoti hai
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    // Note add karne ka function. Agar text khali hai, toh error set karega
    if (!text.trim()) {
      setError('Note cannot be empty');  // Error message show karna agar text khali hai
      return;
    }
    setError('');  // Error ko clear karna agar valid text hai
    const newNote = { id: Date.now(), text: text.trim() };  // New note object create karna
    setNotes([...notes, newNote]);  // Existing notes array mein new note ko add karna
  };

  const editNote = (id, text) => {
    // Note ko edit karne ka function
    setNotes(notes.map(note => note.id === id ? { ...note, text: text } : note));
  };

  const deleteNote = (id) => {
    // Note ko delete karne ka function
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className='container mt-3'>
      <h1 className='text-center'>Notes App</h1>
      {error && <div className="alert alert-danger">{error}</div>} 
       {/* // Agar error hai toh show karna */}
      <AddNoteForm onAddNote={addNote} />  
      {/* // AddNoteForm component ko render karna */}
      <div>
        {notes.map((note) => (
          // Har note ke liye Note component ko render karna
          <Note key={note.id} note={note} onEditNote={editNote} onDeleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
}

export default App;
