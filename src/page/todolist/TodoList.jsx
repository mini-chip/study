import { useState, useEffect } from "react";
import "./TodoList.css";
import { v4 as uuidv4 } from "uuid";
import supabase from "../../main";
function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await supabase.from("todo").select("*");
      setTodoList(data);
    };
    fetchTodos();
  }, []);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClickButton = async () => {
    //추가버튼을 클릭했을때
    if (!todo.trim()) return;
    const { data } = await supabase
      .from("todos")
      .insert([{ task: todo.trim(), is_complete: false }])
      .select();
    setTodoList([...todoList, { todo: todo.trim(), checked: false }]);
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
                {todoList}
              </label>
              <div>
                <button
                  type="button"
                  onClick={() => handleToggleCheck(item.id)}
                >
                  ✏️
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

export default TodoList;
