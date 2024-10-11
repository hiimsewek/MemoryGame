import { IconButton } from "components/IconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Drawer.module.scss";

type DrawerProps = {
  isActive: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Drawer = ({ isActive, onClose, children }: DrawerProps) => {
  return (
    <>
      {isActive && <div onClick={onClose} className={styles.overlay}></div>}
      <div data-active={isActive} className={styles.drawer}>
        <>
          <div className={styles.closeBtnContainer}>
            <IconButton
              icon={faXmark}
              onClick={onClose}
              styleProp={styles.closeBtn}
            />
          </div>
          {children}
        </>
      </div>
    </>
  );
};

export default Drawer;
