import React, { useState } from "react";

function Poem({poem, addToFavorites, removePoem}) {
  const {title, content, author, id}= poem

  const [asRead, setAsRead] =useState(false)

  function handleClick() {
    setAsRead(asRead =>asRead = !asRead)
  }
  function handleDelete(e) {
    e.preventDefault()
    const serverOptions = {method: 'DELETE'}
    fetch(`http://localhost:8004/poems/${poem.id}`,serverOptions)
  removePoem(poem)
}
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>
        <strong>- By {author}</strong>
      </p>
      <button onClick={handleClick} >{asRead?"Mark as read" : 'Mark as unread'}</button>
      <button onClick={() => addToFavorites(poem)}>
        {poem.isFavorite ? "Unfavorite" : "♥ Favorite" }
      </button>
      <button onClick={handleDelete}>Delete Poem</button>
    </div>
  );
}

export default Poem;
