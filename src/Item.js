import React from "react";

const Item = (props) => {
  return (
    <div className="item-container">
      <span
        style={{
          textDecoration: props.completed ? "line-through" : "none",
          color: props.completed ? "slategray" : "initial",
        }}
        className="item-text"
      >
        {props.input}
      </span>
      <div className="button-container">
        {props.completed ? (
          <button
            onClick={props.handleUndo}
            className="btn btn-success complete-undo-btn"
          >
            Undo
          </button>
        ) : (
          <button
            onClick={props.handleComplete}
            className="btn btn-success complete-undo-btn"
          >
            Complete
          </button>
        )}
        <button
          onClick={props.handleDelete}
          className="btn btn-danger delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
