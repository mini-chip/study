import Modal from "../modal/Modal";

function DeleteModal({ isOpen, onClose, onDelete, selectedId }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <p>삭제하시겠습니까?</p>
        <div>
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete(selectedId);
              onClose();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
