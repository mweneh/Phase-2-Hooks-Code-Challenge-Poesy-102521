import React, { useState } from "react";

function NewPoemForm({onSubmission}) {
  const [newPoem, setNewPoem] =useState({title:'',author:'',content:''})

  function handleChange(e){
    setNewPoem(newPoem =>({...newPoem,[e.target.name]:e.target.value}))}
     
  
  function handleSubmit(e) {
    e.preventDefault()
    onSubmission(newPoem)
    setNewPoem({title:'',author:'',content:''})
  }

  
  return (
    <form onChange={handleChange} onSubmit={handleSubmit} className="new-poem-form">
      <input onChange={handleChange} name='title' value={newPoem.title} placeholder="Title" />
      <input onChange={handleChange} name='author' value={newPoem.author} placeholder="Author" />
      <textarea onChange={handleChange} name='content'value={newPoem.content} placeholder="Write your masterpiece here..." rows={10} />
      <input   type="submit" value="Share your masterpiece" />
    </form>
  );
}

export default NewPoemForm;
