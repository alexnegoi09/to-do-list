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
    setItemArray((prev) =>
      prev.filter((item) => id !== item.replace(" ", "").toLowerCase())
    );
  };

  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("itemArray", JSON.stringify(itemArray));

  return (
    <div className="main-container">
      <section className="header-section">
        <h1 className="header">My to do list</h1>
        <Form
          input={inputValue}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <p className="text-danger error">{error}</p>
      </section>
      <ul className="task-list">
        {items.length > 0
          ? items.map((item) => (
              <li key={item.id} className="list-item">
                <Item
                  input={item.body}
                  completed={item.completed}
                  fieldValue={() => setInputValue()}
                  handleComplete={() => handleComplete(item.id)}
                  handleUndo={() => handleUndo(item.id)}
                  handleDelete={() => handleDelete(item.id)}
                />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default App;
