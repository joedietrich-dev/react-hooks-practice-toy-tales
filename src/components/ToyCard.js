import React from "react";

function ToyCard({ id, name, image, likes, handleDelete, handleLike }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={() => handleLike(id)}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => handleDelete(id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
