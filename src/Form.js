import React from "react";

const Form = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          value={props.inputValue}
          onChange={props.onChange}
          placeholder="Start typing.."
          maxLength="100"
        />
        <input type="submit" value="Add task" />
      </form>
    </div>
  );
};

export default Form;
