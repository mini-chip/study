import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClickButton = () => {
    setTodoList([...todoList, { todo: todo, checked: false }]);
    setTodo("");
  };

  const handleToggleCheck = (id) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[id].checked = !updatedTodoList[id].checked;
    setTodoList(updatedTodoList);
  };

  const handleDelete = (id) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(id, 1);
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
          {todoList.map((item, id) => (
            <li key={id} style={{ display: item.checked ? "none" : "block" }}>
              <label htmlFor={`checkbox${id}`}>
                <input
                  type="checkbox"
                  id={`checkbox${id}`}
                  checked={item.checked}
                  onChange={() => handleToggleCheck(id)}
                />
                {item.todo}
              </label>
              <button type="button" onClick={() => handleDelete(id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
