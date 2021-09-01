import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/toys')
      .then(res => res.json())
      .then(setToys);
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    console.log(name, image);
    fetch('http://localhost:3001/toys', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, image, likes: 0 })
    }).then(res => res.json())
      .then(data => setToys([...toys, data]))
  }
  function handleDelete(id) {
    console.log('Deleted ' + id);
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    }).then(setToys(toys.filter(toy => toy.id !== id)))
  }
  function handleLike(id) {
    const likedToy = toys.find(toy => toy.id === id);
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: likedToy.likes + 1 })
    }).then(res => res.json())
      .then(data => setToys(toys.map(toy => toy.id === id ? data : toy)));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleSubmit={handleSubmit} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={handleDelete} handleLike={handleLike} />
    </>
  );
}

export default App;
