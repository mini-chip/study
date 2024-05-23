import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClickButton = () => {
    if (!todo.trim()) return;
    setTodoList([
      ...todoList,
      { id: uuidv4(), todo: todo.trim(), checked: false }
    ]);
    setTodo("");
  };

  const handleToggleCheck = (id) => {
    const updatedTodoList = todoList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTodoList(updatedTodoList);
  };

  const handleDelete = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <div className="form">
      <h1>TodoList</h1>
      <div className="InputSection">
        <input
          className="todoInput"
          type="text"
          placeholder="할 일을 입력하세요"
          value={todo}
          onChange={handleTodoChange}
        />
        <button type="button" onClick={handleClickButton}>
          추가
        </button>
      </div>
      <div className="todoSection">
        <ul>
          {todoList.map((item) => (
            <li key={item.id} className={item.checked ? "checked" : ""}>
              <label htmlFor={`checkbox${item.id}`}>
                <input
                  type="checkbox"
                  id={`checkbox${item.id}`}
                  checked={item.checked}
                  onChange={() => handleToggleCheck(item.id)}
                />
                {item.todo}
              </label>
              <div>
                <button
                  type="button"
                  onClick={() => handleToggleCheck(item.id)}
                >
                  완료
                </button>
                <button type="button" onClick={() => handleDelete(item.id)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
