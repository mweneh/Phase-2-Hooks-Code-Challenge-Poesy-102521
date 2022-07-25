import React, { useState, useEffect } from 'react';
import PoemsContainer from "./PoemsContainer";
import NewPoemForm from "./NewPoemForm";

const poemAPI = "http://localhost:8004/poems";
// id, title, content, author

function App() {
  const [poems, setPoems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFavorite, setShowFavorite] = useState(true);
  const poemsToDisplay = poems.filter((poem) => showFavorite || poem.isFavorite);

  useEffect(() => {
    fetch(poemAPI)
      .then(res => res.json())
      .then(data => setPoems(data))
  }, []);

  function handleShowform(){
    setShowForm(showForm => showForm = !showForm)
  }  
  
  function handleNewPoem(newPoem){
    // post poem to server & update list via state
    const serverOPtions = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newPoem)
    }
  
  fetch('http://localhost:8004/poems', serverOPtions)
  .then(r=>r.json())
  .then(myPoem => setPoems(poems =>[...poems, myPoem]))
  .catch(error=>console.log(error))
  }

  function removePoem(poemToRemove) {
    setPoems(poems.filter(poem => poem.id !== poemToRemove.id))
  }

  function addToFavorites(favPoem) {
    setPoems(poems.map(poem => {
      return poem.id === favPoem.id ? {...favPoem, isFavorite: !favPoem.isFavorite} : poem
      }  
    ))
  }

  function displayFavPoems() {
    if (poemsToDisplay.length === 0 && !showFavorite) {
      return (<h1>No poems yet!</h1>)
    } else {
      return (
        <PoemsContainer 
          poems={poemsToDisplay} 
          removePoem={removePoem} 
          addToFavorites={addToFavorites}
        />
      )
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
      <button onClick={handleShowform}> {showForm ? 'Hide': 'Show'} new poem form</button>
        {showForm ? <NewPoemForm onSubmission={handleNewPoem} /> : null}

        <button onClick={() => setShowFavorite(!showFavorite)} >
          Show/hide Favorite Poems
        </button>
      </div>
      {displayFavPoems()}
    </div>
  );
}

export default App;