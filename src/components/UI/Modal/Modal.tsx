import { createPortal } from "react-dom";
import { Overlay } from "components";
import styles from "./Modal.module.scss";

type ModalProps = {
  title: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ title, text, onConfirm, onCancel }: ModalProps) => {
  return (
    <>
      <Overlay onClick={onCancel} />
      {createPortal(
        <div className={styles.modal}>
          <span className={styles.title}>{title}</span>
          <span className={styles.text}>{text}</span>
          <div className={styles.btnContainer}>
            <button onClick={onConfirm} className={styles.confirmBtn}>
              Confirm
            </button>
            <button onClick={onCancel} className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Modal;
