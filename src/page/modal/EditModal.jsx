import React from "react";
import Modal from "../modal/Modal";

function EditModal({ isOpen, onClose, onSave, editTodo, onTodoChange }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>할 일 수정</h2>
        <input
          type="text"
          value={editTodo}
          onChange={onTodoChange}
          placeholder="수정할 할 일을 입력하세요"
        />
        <div>
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(editTodo);
              onClose();
            }}
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditModal;
