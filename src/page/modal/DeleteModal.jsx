import "./DeleteModal.css";
import { useState } from "react";
import supabase from "../../main";
function DeleteModal({ selectedId, onDeleteConfirm, onClose }) {
  const [modal, setModal] = useState(false);
  const handleToggleModal = async () => {
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
    setModal(!modal);
  };

  return (
    <div className="modal-container">
      <div className={`modal ${modal ? "show" : ""}`}>
        <div className="modal-content">
          <p>이 작업을 삭제하시겠습니까?</p>
          <div className="modal-buttons">
            <button onClick={() => setModal(false)}>취소</button>
            <button onClick={handleToggleModal}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;
