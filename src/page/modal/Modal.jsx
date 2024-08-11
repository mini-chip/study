import { createPortal } from "react-dom";
import "./Modal.css";
function ModalPortal({ children }) {
  const el = document.getElementById("portal-root");

  return createPortal(
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalContent">{children}</div>
      </div>
    </div>,
    el
  );
}

export default ModalPortal;
