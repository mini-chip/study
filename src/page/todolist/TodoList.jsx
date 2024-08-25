import { useState, useEffect } from "react";
import "./TodoList.css";
import supabase from "../../main";
import DeleteModal from "../modal/DeleteModal";
import EditModal from "../modal/EditModal";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todo").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setTodoList(data);
      }
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

  const handleToggleDelete = async () => {
    const { error } = await supabase.from("todo").delete().eq("id", selectedId);
    if (error) {
      console.error("Error deleting data:", error);
    } else {
      setTodoList((prevItems) =>
        prevItems.filter((item) => item.id !== selectedId)
      );
      setIsDeleteModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleOpenEditModal = (item) => {
    setSelectedId(item.id);
    setEditTodo(item.task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const { error } = await supabase
      .from("todo")
      .update({ task: editTodo })
      .eq("id", selectedId);
    if (error) {
      console.error("Error updating data:", error);
    } else {
      const updatedTodoList = todoList.map((item) =>
        item.id === selectedId ? { ...item, task: editTodo } : item
      );
      setTodoList(updatedTodoList);
      setIsEditModalOpen(false);
      setSelectedId(null);
      setEditTodo("");
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
                  onChange={() => handleToggleCheck(item.id, item.checked)}
                />
                {item.task}
              </label>
              <div>
                <button type="button" onClick={() => handleOpenEditModal(item)}>
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedId(null);
          }}
          onDelete={handleToggleDelete}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          editTodo={editTodo}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedId(null);
            setEditTodo("");
          }}
          onSave={handleSaveEdit}
          onTodoChange={(e) => setEditTodo(e.target.value)}
        />
      )}
    </div>
  );
}

export default TodoList;
