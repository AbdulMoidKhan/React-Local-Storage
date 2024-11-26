import React, { useState } from 'react';

function Note({ note, onEditNote, onDeleteNote }) {
  const [isEditing, setIsEditing] = useState(false);  // Edit mode state
  const [text, setText] = useState(note.text);        // Note text ko local state mein store karna

  const handleEdit = () => {
    if (isEditing) {
      onEditNote(note.id, text);  // Agar edit mode hai to edit function ko call karna
    }
    setIsEditing(!isEditing);     // Edit mode ko toggle karna
  };

  return (
    <div className='card mb-2'>
      <div className='card-body'>
        {isEditing ? (
          // Agar edit mode hai to input field show karna
          <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          // Agar edit mode nahi hai to text show karna
          <p className='card-text'>{note.text}</p>
        )}
        <button onClick={handleEdit} className='btn btn-warning me-2'>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => onDeleteNote(note.id)} className='btn btn-danger'>Delete</button>
      </div>
    </div>
  );
}

export default Note;
