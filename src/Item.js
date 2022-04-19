import React from "react";

const Item = (props) => {
  return (
    <div>
      <span
        style={{ textDecoration: props.completed ? "line-through" : "none" }}
      >
        {props.input}
      </span>
      {props.completed ? (
        <button onClick={props.handleUndo}>Undo</button>
      ) : (
        <button onClick={props.handleComplete}>Complete</button>
      )}
      <button onClick={props.handleDelete}>Delete</button>
    </div>
  );
};

export default Item;
