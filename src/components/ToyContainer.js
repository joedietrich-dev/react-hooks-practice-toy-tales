import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, handleDelete, handleLike }) {
  const toyCollection = toys.map(toy => <ToyCard key={toy.id} handleDelete={handleDelete} handleLike={handleLike} {...toy} />)
  return (
    <div id="toy-collection">{toyCollection}</div>
  );
}

export default ToyContainer;
