import React from "react";

const Form = (props) => {
  return (
    <div className="form-container">
      <form onSubmit={props.onSubmit} className="main-form">
        <input
          type="text"
          value={props.inputValue}
          onChange={props.onChange}
          placeholder="Start typing.."
          maxLength="255"
          className="form-control main-input"
        />
        <input
          type="submit"
          value="Add task"
          className="btn btn-dark submit-btn"
        />
      </form>
    </div>
  );
};

export default Form;
