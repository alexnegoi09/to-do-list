import React from "react";
import "./App.css";
import Form from "./Form";
import Item from "./Item";

function App() {
  const initialItems =
    localStorage.length === 0 ? [] : JSON.parse(localStorage.getItem("items"));
  const initialArray =
    localStorage.length === 0
      ? []
      : JSON.parse(localStorage.getItem("itemArray"));

  const [inputValue, setInputValue] = React.useState("");
  const [items, setItems] = React.useState(initialItems);
  const [error, setError] = React.useState("");
  const [itemArray, setItemArray] = React.useState(initialArray);

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue === "") {
      setError("Please enter a task!");
    } else if (items.length === 0) {
      setItems([
        {
          id: inputValue.replace(" ", "").toLowerCase(),
          body: inputValue,
          completed: false,
        },
      ]);
      setError("");
      setItemArray([inputValue]);
    } else if (itemArray.includes(inputValue)) {
      setError("This item is already on the list!");
    } else {
      setItems((prev) => {
        return [
          ...prev,
          {
            id: inputValue.replace(" ", "").toLowerCase(),
            body: inputValue,
            completed: false,
          },
        ];
      });
      setItemArray((prev) => [...prev, inputValue]);
      setError("");
    }

    e.target.elements[0].value = "";
    setInputValue("");
  };

  const handleComplete = (id) => {
    setItems((prev) =>
      prev.map((item) => (id === item.id ? { ...item, completed: true } : item))
    );
  };

  const handleUndo = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        id === item.id ? { ...item, completed: false } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => id !== item.id));
  };

  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("itemArray", JSON.stringify(itemArray));
  console.log(localStorage);

  return (
    <div>
      <Form
        input={inputValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <p>{error}</p>
      {items.length > 0
        ? items.map((item) => (
            <Item
              input={item.body}
              completed={item.completed}
              key={item.id}
              fieldValue={() => setInputValue()}
              handleComplete={() => handleComplete(item.id)}
              handleUndo={() => handleUndo(item.id)}
              handleDelete={() => handleDelete(item.id)}
            />
          ))
        : null}
    </div>
  );
}

export default App;
