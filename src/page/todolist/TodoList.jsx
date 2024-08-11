import { useState, useEffect } from "react";
import "./TodoList.css";
import supabase from "../../main";
import DeleteModal from "../modal/DeleteModal";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTodo, setEditTodo] = useState("");

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
    setIsModalOpen(false);
  };

  const handleToggleDelete = async (selectedId) => {
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
  const handleToggleEdit = async (item) => {
    setEditTodo(item.task);
    setIsModalOpen(true);
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
                <button type="button" onClick={() => handleToggleEdit(item.id)}>
                  수정
                </button>
                {isEditOpen && (
                  <EditModal
                    isModalOpen={isModalOpen}
                    selectedId={item.id}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={handleToggleDelete}
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleToggleCheck(item.id)}
                >
                  완료
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  삭제
                </button>
                {isModalOpen && (
                  <DeleteModal
                    isModalOpen={isModalOpen}
                    selectedId={item.id}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={handleToggleDelete}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
