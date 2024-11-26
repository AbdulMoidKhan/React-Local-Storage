import React, { useState } from 'react';

function AddNoteForm({ onAddNote }) {
  const [text, setText] = useState('');  // Form ke text field ka state

  const handleSubmit = (e) => {
    e.preventDefault();  // Form submission ko rokna taki page refresh na ho
    onAddNote(text);     // Parent component ka addNote function call karna
    setText('');         // Text field ko khali kar dena form submit hone ke baad
  };

  return (
    <form onSubmit={handleSubmit} className='mb-3'>
      <input type='text' className='form-control mb-2' placeholder='Enter note here...' value={text} onChange={(e) => setText(e.target.value)} />
      <button type='submit' className='btn btn-primary'>Add Note</button>
    </form>
  );
}

export default AddNoteForm;
