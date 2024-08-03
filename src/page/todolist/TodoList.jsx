import { useState, useEffect } from "react";
import "./TodoList.css";
import supabase from "../../main";
function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todo").select("*");
      setTodoList(data);
    };
    fetchTodos();
  }, []);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClickButton = async () => {
    if (!todo.trim()) return;
    const { data } = await supabase
      .from("todo")
      .insert([{ task: todo.trim(), checked: false }])
      .select();
    setTodoList([...todoList, ...data]);
    setTodo("");
  };

  const handleToggleCheck = async (id, checked) => {
    const { data } = await supabase
      .from("todo")
      .update({ checked: !checked })
      .eq("id", id)
      .select();
    const updatedTodoList = todoList.map((item) =>
      item.id === id ? data[0] : item
    );
    setTodoList(updatedTodoList);
  };

  const handleDelete = async (selectedId) => {
    const { data, error } = await supabase
      .from("todo")
      .delete()
      .eq("id", selectedId);
    if (error) {
      console.error("Error deleting data:", error);
    } else {
      setTodoList((prevItems) =>
        prevItems.filter((item) => item.id !== selectedId)
      );
    }
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
                {item.task}
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
